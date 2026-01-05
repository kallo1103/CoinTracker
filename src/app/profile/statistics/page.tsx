"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { 
  ArrowLeft, 
  BarChart3, 
  TrendingUp, 
  Eye, 
  Search, 
  Clock, 
  Star,
  Activity,
  Target,
  Award
} from "lucide-react";

interface CoinStat {
  name: string;
  symbol: string;
  views: number;
}

interface SearchStat {
  query: string;
  count: number;
}

interface DailyStat {
  date: string;
  views: number;
  searches: number;
}

interface Achievement {
  title: string;
  description: string;
  icon: string;
  earned: boolean;
}

const ALL_ACHIEVEMENTS: Achievement[] = [
  { title: 'New User', description: 'Account registered', icon: '👋', earned: true }, // Always true if viewing profile
  { title: 'Investor', description: 'Viewed 100 coins', icon: '💰', earned: false },
  { title: 'Researcher', description: 'Searched 50 times', icon: '🔍', earned: false },
  { title: 'Expert', description: 'Spent 10 hours on app', icon: '🎓', earned: false },
  { title: 'Collector', description: 'Favorited 25 coins', icon: '⭐', earned: false }
];

export default function StatisticsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [timeRange, setTimeRange] = useState('7d');
  const [stats, setStats] = useState<{
    overview: {
      totalViews: number;
      searches: number;
      favorites: number;
      timeSpent: number;
    };
    activity: {
      mostViewedCoins: CoinStat[];
      searchHistory: SearchStat[];
      dailyActivity: DailyStat[];
    };
    achievements: Achievement[];
  }>({
    overview: {
      totalViews: 0,
      searches: 0,
      favorites: 0,
      timeSpent: 0
    },
    activity: {
      mostViewedCoins: [],
      searchHistory: [],
      dailyActivity: [],
    },
    achievements: ALL_ACHIEVEMENTS
  });

  useEffect(() => {
    const fetchStats = async () => {
      if (session) {
        try {
          const res = await fetch('/api/user/stats');
          if (res.ok) {
            const data = await res.json();
            
            // Process achievements
            const earnedAchievements = Array.isArray(data.achievements) ? data.achievements : [];
            const processedAchievements = ALL_ACHIEVEMENTS.map(ach => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const isEarned = earnedAchievements.some((ea: any) => ea.title === ach.title);
                return {
                    ...ach,
                    earned: ach.title === 'New User' ? true : isEarned
                };
            });

            setStats(prev => ({
              ...prev,
              overview: {
                totalViews: data.totalViews || 0,
                searches: data.searches || 0,
                favorites: data.favorites || 0,
                timeSpent: data.timeSpent || 0
              },
              activity: {
                mostViewedCoins: Array.isArray(data.mostViewedCoins) ? data.mostViewedCoins : [],
                searchHistory: Array.isArray(data.searchHistory) ? data.searchHistory : [],
                dailyActivity: Array.isArray(data.dailyActivity) ? data.dailyActivity : []
              },
              achievements: processedAchievements
            }));
          }
        } catch (error) {
          console.error("Failed to fetch stats", error);
        }
      }
    };
    fetchStats();
  }, [session]);

  // Redirect to home if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  // Show loading while checking session
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Do not render if not authenticated
  if (!session) {
    return null;
  }

  const getTimeRangeLabel = (range: string) => {
    switch (range) {
      case '7d': return 'Last 7 days';
      case '30d': return 'Last 30 days';
      case '90d': return 'Last 90 days';
      case '1y': return 'Last 1 year';
      default: return 'Last 7 days';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.push("/profile")}
            className="p-2 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <BarChart3 className="w-10 h-10" />
              Statistics
            </h1>
            <p className="text-gray-300">Track your activities and achievements</p>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="mb-8">
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Time Range</h2>
              <span className="text-gray-300">{getTimeRangeLabel(timeRange)}</span>
            </div>
            <div className="flex gap-2">
              {['7d', '30d', '90d', '1y'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    timeRange === range
                      ? 'bg-gray-800 dark:bg-white text-white dark:text-gray-900'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {range === '7d' ? '7 days' : 
                   range === '30d' ? '30 days' :
                   range === '90d' ? '90 days' : '1 year'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm font-medium">Total Views</p>
                <p className="text-3xl font-bold text-white">{stats.overview.totalViews.toLocaleString()}</p>
              </div>
              <Eye className="w-8 h-8 text-gray-400 dark:text-gray-300" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Searches</p>
                <p className="text-3xl font-bold text-white">{stats.overview.searches}</p>
              </div>
              <Search className="w-8 h-8 text-green-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Favorites</p>
                <p className="text-3xl font-bold text-white">{stats.overview.favorites}</p>
              </div>
              <Star className="w-8 h-8 text-purple-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Time (hours)</p>
                <p className="text-3xl font-bold text-white">{stats.overview.timeSpent}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-200" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Most Viewed Coins */}
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gray-700/50 dark:bg-gray-600/50 rounded-xl">
                <TrendingUp className="w-6 h-6 text-gray-300 dark:text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Most Viewed Coins</h2>
            </div>
            
            <div className="space-y-4">
              {stats.activity.mostViewedCoins.map((coin, index) => (
                <div key={coin.symbol} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{coin.name}</h3>
                      <p className="text-gray-300 text-sm">{coin.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">{coin.views}</p>
                    <p className="text-gray-300 text-sm">views</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Search History */}
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-500/20 rounded-xl">
                <Search className="w-6 h-6 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Search History</h2>
            </div>
            
            <div className="space-y-4">
              {stats.activity.searchHistory.map((search, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{search.query}</h3>
                      <p className="text-gray-300 text-sm">Keyword</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">{search.count}</p>
                    <p className="text-gray-300 text-sm">times</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Daily Activity Chart */}
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-500/20 rounded-xl">
              <Activity className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Daily Activity</h2>
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {stats.activity.dailyActivity.map((day, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-700 rounded-lg p-3 mb-2">
                  <div className="text-white text-sm font-medium mb-1">
                    {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div className="space-y-1">
                    <div className="h-2 bg-gray-700 dark:bg-white rounded" style={{ width: `${(day.views / 70) * 100}%` }}></div>
                    <div className="h-2 bg-green-500 rounded" style={{ width: `${(day.searches / 20) * 100}%` }}></div>
                  </div>
                  <div className="text-xs text-gray-300 mt-1">
                    {day.views}v, {day.searches}s
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-700 dark:bg-white rounded"></div>
              <span className="text-gray-300 text-sm">Views</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-gray-300 text-sm">Searches</span>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-yellow-500/20 rounded-xl">
              <Award className="w-6 h-6 text-yellow-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Achievements</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border-2 transition-all ${
                  achievement.earned
                    ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/50'
                    : 'bg-gray-700/50 border-gray-600/50 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div>
                    <h3 className={`font-bold ${achievement.earned ? 'text-yellow-300' : 'text-gray-400'}`}>
                      {achievement.title}
                    </h3>
                    <p className={`text-sm ${achievement.earned ? 'text-yellow-200' : 'text-gray-500'}`}>
                      {achievement.description}
                    </p>
                  </div>
                </div>
                {achievement.earned && (
                  <div className="flex items-center gap-2 text-yellow-300 text-sm">
                    <Target className="w-4 h-4" />
                    <span>Unlocked</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
