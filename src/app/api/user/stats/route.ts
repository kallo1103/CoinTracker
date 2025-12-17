import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            include: { stats: true }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        if (!user.stats) {
            const newStats = await prisma.userStats.create({
                data: {
                    userId: user.id,
                }
            });
            return NextResponse.json(newStats);
        }

        return NextResponse.json(user.stats);
    } catch (error) {
        console.error("Error fetching stats:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { action, data } = body;

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            include: { stats: true }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Ensure stats exist
        let stats = user.stats;
        if (!stats) {
            stats = await prisma.userStats.create({
                data: { userId: user.id }
            });
        }

        interface DailyActivity { date: string; views: number; searches: number }
        interface SearchHistoryItem { query: string; count: number }
        interface ViewedCoin { name: string; symbol: string; views: number }

        const today = new Date().toISOString().split('T')[0];
        let dailyActivity = (stats.dailyActivity as unknown as DailyActivity[]) || [];
        // Ensure dailyActivity is an array
        if (!Array.isArray(dailyActivity)) dailyActivity = [];

        let todayActivity = dailyActivity.find((d) => d.date === today);
        if (!todayActivity) {
            todayActivity = { date: today, views: 0, searches: 0 };
            dailyActivity.push(todayActivity);
        }

        // Limit daily activity history to 30 days
        if (dailyActivity.length > 30) {
            dailyActivity = dailyActivity.slice(dailyActivity.length - 30);
        }

        if (action === 'search') {
            const { query } = data;

            // Update searches count
            const newSearchesCount = stats.searches + 1;

            // Update search history
            let searchHistory = (stats.searchHistory as unknown as SearchHistoryItem[]) || [];
            if (!Array.isArray(searchHistory)) searchHistory = [];

            const existingSearch = searchHistory.find((s) => s.query.toLowerCase() === query.toLowerCase());
            if (existingSearch) {
                existingSearch.count += 1;
            } else {
                searchHistory.push({ query, count: 1 });
            }
            // Sort by count and limit
            searchHistory.sort((a, b) => b.count - a.count);
            searchHistory = searchHistory.slice(0, 10);

            todayActivity.searches += 1;

            await prisma.userStats.update({
                where: { id: stats.id },
                data: {
                    searches: newSearchesCount,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    searchHistory: searchHistory as any,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    dailyActivity: dailyActivity as any
                }
            });

        } else if (action === 'view_coin') {
            const { name, symbol } = data;

            const newTotalViews = stats.totalViews + 1;

            let mostViewedCoins = (stats.mostViewedCoins as unknown as ViewedCoin[]) || [];
            if (!Array.isArray(mostViewedCoins)) mostViewedCoins = [];

            const existingCoin = mostViewedCoins.find((c) => c.symbol === symbol);
            if (existingCoin) {
                existingCoin.views += 1;
            } else {
                mostViewedCoins.push({ name, symbol, views: 1 });
            }
            mostViewedCoins.sort((a, b) => b.views - a.views);
            mostViewedCoins = mostViewedCoins.slice(0, 10);

            todayActivity.views += 1;

            await prisma.userStats.update({
                where: { id: stats.id },
                data: {
                    totalViews: newTotalViews,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    mostViewedCoins: mostViewedCoins as any,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    dailyActivity: dailyActivity as any
                }
            });

        } else if (action === 'record_time') {
            // Optional: Add logic for time spent
            const { minutes } = data;
            await prisma.userStats.update({
                where: { id: stats.id },
                data: {
                    timeSpent: { increment: minutes }
                }
            });
        }

        // Check for achievements
        // Refetch stats to check thresholds
        const updatedStats = await prisma.userStats.findUnique({ where: { id: stats.id } });
        if (updatedStats) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let achievements = (updatedStats.achievements as any[]) || [];
            if (!Array.isArray(achievements)) achievements = [];

            const newAchievements = [];

            // Check: Researcher (50 searches)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (updatedStats.searches >= 50 && !achievements.find((a: any) => a.title === 'Nhà nghiên cứu')) {
                newAchievements.push({
                    title: 'Nhà nghiên cứu',
                    description: 'Tìm kiếm 50 lần',
                    icon: '🔍',
                    earned: true,
                    date: new Date().toISOString()
                });
            }

            // Check: Investor (100 views)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (updatedStats.totalViews >= 100 && !achievements.find((a: any) => a.title === 'Nhà đầu tư')) {
                newAchievements.push({
                    title: 'Nhà đầu tư',
                    description: 'Xem 100 coin',
                    icon: '💰',
                    earned: true,
                    date: new Date().toISOString()
                });
            }

            if (newAchievements.length > 0) {
                await prisma.userStats.update({
                    where: { id: stats.id },
                    data: {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        achievements: [...achievements, ...newAchievements] as any
                    }
                });
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error updating stats:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
