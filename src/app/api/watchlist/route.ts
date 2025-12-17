import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const watchlist = await prisma.watchlist.findMany({
            where: { userId: session.user.id },
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(watchlist);
    } catch (error) {
        console.error("Watchlist GET error:", error);
        return NextResponse.json({ error: "Failed to fetch watchlist" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { coinId, symbol, name } = body;

        if (!coinId || !symbol || !name) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Check if already exists
        const existing = await prisma.watchlist.findUnique({
            where: {
                userId_coinId: {
                    userId: session.user.id,
                    coinId,
                },
            },
        });

        if (existing) {
            return NextResponse.json(existing);
        }

        const item = await prisma.watchlist.create({
            data: {
                userId: session.user.id,
                coinId,
                symbol,
                name
            }
        });
        return NextResponse.json(item);
    } catch (error) {
        console.error("Watchlist POST error:", error);
        return NextResponse.json({ error: "Failed to add to watchlist" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const coinId = searchParams.get('coinId');

    if (!coinId) {
        return NextResponse.json({ error: "Missing coinId" }, { status: 400 });
    }

    try {
        await prisma.watchlist.deleteMany({
            where: {
                userId: session.user.id,
                coinId: coinId
            }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Watchlist DELETE error:", error);
        return NextResponse.json({ error: "Failed to remove from watchlist" }, { status: 500 });
    }
}
