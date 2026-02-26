"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
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
  { title: 'New User', description: 'Account registered', icon: '👋', earned: true },
  { title: 'Investor', description: 'Viewed 100 coins', icon: '💰', earned: false },
  { title: 'Researcher', description: 'Searched 50 times', icon: '🔍', earned: false },
  { title: 'Expert', description: 'Spent 10 hours on app', icon: '🎓', earned: false },
  { title: 'Collector', description: 'Favorited 25 coins', icon: '⭐', earned: false }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

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
    overview: { totalViews: 0, searches: 0, favorites: 0, timeSpent: 0 },
    activity: { mostViewedCoins: [], searchHistory: [], dailyActivity: [] },
    achievements: ALL_ACHIEVEMENTS
  });

  useEffect(() => {
    const fetchStats = async () => {
      if (session) {
        try {
          const res = await fetch('/api/user/stats');
          if (res.ok) {
            const data = await res.json();

            const earnedAchievements = Array.isArray(data.achievements) ? data.achievements : [];
            const processedAchievements = ALL_ACHIEVEMENTS.map(ach => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const isEarned = earnedAchievements.some((ea: any) => ea.title === ach.title);
              return { ...ach, earned: ach.title === 'New User' ? true : isEarned };
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

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-2 border-indigo-500/30 border-t-indigo-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  const timeRangeLabels: Record<string, string> = {
    '7d': 'Last 7 days',
    '30d': 'Last 30 days',
    '90d': 'Last 90 days',
    '1y': 'Last 1 year',
  };

  const overviewCards = [
    {
      label: 'Total Views',
      value: stats.overview.totalViews.toLocaleString(),
      icon: <Eye className="w-5 h-5" />,
      gradient: 'from-indigo-500/20 to-blue-500/20',
      iconBg: 'bg-indigo-500/15 text-indigo-400',
      accentColor: 'text-indigo-400',
    },
    {
      label: 'Searches',
      value: stats.overview.searches.toString(),
      icon: <Search className="w-5 h-5" />,
      gradient: 'from-emerald-500/20 to-green-500/20',
      iconBg: 'bg-emerald-500/15 text-emerald-400',
      accentColor: 'text-emerald-400',
    },
    {
      label: 'Favorites',
      value: stats.overview.favorites.toString(),
      icon: <Star className="w-5 h-5" />,
      gradient: 'from-purple-500/20 to-fuchsia-500/20',
      iconBg: 'bg-purple-500/15 text-purple-400',
      accentColor: 'text-purple-400',
    },
    {
      label: 'Time (hours)',
      value: stats.overview.timeSpent.toString(),
      icon: <Clock className="w-5 h-5" />,
      gradient: 'from-amber-500/20 to-orange-500/20',
      iconBg: 'bg-amber-500/15 text-amber-400',
      accentColor: 'text-amber-400',
    },
  ];

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="flex items-center gap-4"
        >
          <button
            onClick={() => router.push("/profile")}
            className="p-2.5 web3-card hover:border-white/[0.12] transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-gray-300" />
          </button>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-indigo-400" />
              Statistics
            </h1>
            <p className="text-gray-400 mt-1">Track your activities and achievements</p>
          </div>
        </motion.div>

        {/* Time Range Selector */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.1 }}
          className="web3-card p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Time Range</h2>
            <span className="text-sm text-gray-400">{timeRangeLabels[timeRange]}</span>
          </div>
          <div className="flex gap-2">
            {Object.entries(timeRangeLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setTimeRange(key)}
                className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 ${
                  timeRange === key
                    ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/20'
                    : 'bg-white/[0.03] text-gray-400 hover:bg-white/[0.06] hover:text-gray-300 border border-transparent'
                }`}
              >
                {label.split(' ').pop()}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {overviewCards.map((card, index) => (
            <motion.div
              key={card.label}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: 0.15 + index * 0.05 }}
              className={`metric-card bg-gradient-to-br ${card.gradient}`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-400">{card.label}</span>
                <div className={`p-2 rounded-xl ${card.iconBg}`}>
                  {card.icon}
                </div>
              </div>
              <p className="text-3xl font-bold text-white">{card.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Two-column: Most Viewed + Search History */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Most Viewed Coins */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="web3-card p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-white">Most Viewed Coins</h2>
            </div>

            <div className="space-y-3">
              {stats.activity.mostViewedCoins.length === 0 && (
                <p className="text-gray-500 text-sm text-center py-4">No data yet</p>
              )}
              {stats.activity.mostViewedCoins.map((coin, index) => (
                <div key={coin.symbol} className="flex items-center justify-between p-3.5 bg-white/[0.03] rounded-xl border border-white/[0.04] hover:border-white/[0.08] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-amber-500/20">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-sm">{coin.name}</h3>
                      <p className="text-gray-500 text-xs uppercase">{coin.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold text-sm">{coin.views}</p>
                    <p className="text-gray-500 text-xs">views</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Search History */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="web3-card p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                <Search className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-white">Search History</h2>
            </div>

            <div className="space-y-3">
              {stats.activity.searchHistory.length === 0 && (
                <p className="text-gray-500 text-sm text-center py-4">No searches yet</p>
              )}
              {stats.activity.searchHistory.map((search, index) => (
                <div key={index} className="flex items-center justify-between p-3.5 bg-white/[0.03] rounded-xl border border-white/[0.04] hover:border-white/[0.08] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-indigo-500/20">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-sm">{search.query}</h3>
                      <p className="text-gray-500 text-xs">Keyword</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold text-sm">{search.count}</p>
                    <p className="text-gray-500 text-xs">times</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Daily Activity Chart */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="web3-card p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
              <Activity className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-white">Daily Activity</h2>
          </div>

          {stats.activity.dailyActivity.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-8">No activity data yet</p>
          ) : (
            <>
              <div className="grid grid-cols-7 gap-2">
                {stats.activity.dailyActivity.map((day, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.04]">
                      <div className="text-white text-xs font-medium mb-2">
                        {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className="space-y-1">
                        <div className="h-1.5 bg-indigo-500/80 rounded" style={{ width: `${Math.min((day.views / 70) * 100, 100)}%` }} />
                        <div className="h-1.5 bg-emerald-500/80 rounded" style={{ width: `${Math.min((day.searches / 20) * 100, 100)}%` }} />
                      </div>
                      <div className="text-[10px] text-gray-500 mt-1.5">
                        {day.views}v · {day.searches}s
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-6 mt-5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-indigo-500 rounded-sm" />
                  <span className="text-gray-400 text-xs">Views</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-sm" />
                  <span className="text-gray-400 text-xs">Searches</span>
                </div>
              </div>
            </>
          )}
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="web3-card p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-white">Achievements</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {stats.achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  achievement.earned
                    ? 'bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20 hover:border-amber-500/30'
                    : 'bg-white/[0.02] border-white/[0.04] opacity-50'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div>
                    <h3 className={`font-bold text-sm ${achievement.earned ? 'text-amber-300' : 'text-gray-500'}`}>
                      {achievement.title}
                    </h3>
                    <p className={`text-xs ${achievement.earned ? 'text-amber-200/70' : 'text-gray-600'}`}>
                      {achievement.description}
                    </p>
                  </div>
                </div>
                {achievement.earned && (
                  <div className="flex items-center gap-1.5 text-amber-400/80 text-xs mt-1">
                    <Target className="w-3 h-3" />
                    <span>Unlocked</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
