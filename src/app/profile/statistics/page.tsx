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
  Calendar,
  DollarSign,
  Activity,
  Target,
  Award
} from "lucide-react";

export default function StatisticsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [timeRange, setTimeRange] = useState('7d');
  const [stats, setStats] = useState({
    overview: {
      totalViews: 1247,
      searches: 89,
      favorites: 23,
      timeSpent: 12.5
    },
    activity: {
      mostViewedCoins: [
        { name: 'Bitcoin', symbol: 'BTC', views: 45 },
        { name: 'Ethereum', symbol: 'ETH', views: 38 },
        { name: 'Cardano', symbol: 'ADA', views: 29 },
        { name: 'Solana', symbol: 'SOL', views: 22 },
        { name: 'Polkadot', symbol: 'DOT', views: 18 }
      ],
      searchHistory: [
        { query: 'bitcoin price', count: 12 },
        { query: 'ethereum news', count: 8 },
        { query: 'crypto market', count: 6 },
        { query: 'defi tokens', count: 5 },
        { query: 'nft projects', count: 4 }
      ],
      dailyActivity: [
        { date: '2024-01-01', views: 45, searches: 8 },
        { date: '2024-01-02', views: 52, searches: 12 },
        { date: '2024-01-03', views: 38, searches: 6 },
        { date: '2024-01-04', views: 61, searches: 15 },
        { date: '2024-01-05', views: 47, searches: 9 },
        { date: '2024-01-06', views: 55, searches: 11 },
        { date: '2024-01-07', views: 43, searches: 7 }
      ]
    },
    achievements: [
      { title: 'Người dùng mới', description: 'Đăng ký tài khoản', icon: '👋', earned: true },
      { title: 'Nhà đầu tư', description: 'Xem 100 coin', icon: '💰', earned: true },
      { title: 'Nhà nghiên cứu', description: 'Tìm kiếm 50 lần', icon: '🔍', earned: true },
      { title: 'Chuyên gia', description: 'Dành 10 giờ trên app', icon: '🎓', earned: false },
      { title: 'Người sưu tập', description: 'Yêu thích 25 coin', icon: '⭐', earned: false }
    ]
  });

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
      case '7d': return '7 ngày qua';
      case '30d': return '30 ngày qua';
      case '90d': return '90 ngày qua';
      case '1y': return '1 năm qua';
      default: return '7 ngày qua';
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
              Thống kê
            </h1>
            <p className="text-gray-300">Theo dõi hoạt động và thành tích của bạn</p>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="mb-8">
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-700/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Khoảng thời gian</h2>
              <span className="text-gray-300">{getTimeRangeLabel(timeRange)}</span>
            </div>
            <div className="flex gap-2">
              {['7d', '30d', '90d', '1y'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    timeRange === range
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {range === '7d' ? '7 ngày' : 
                   range === '30d' ? '30 ngày' :
                   range === '90d' ? '90 ngày' : '1 năm'}
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
                <p className="text-blue-100 text-sm font-medium">Tổng lượt xem</p>
                <p className="text-3xl font-bold text-white">{stats.overview.totalViews.toLocaleString()}</p>
              </div>
              <Eye className="w-8 h-8 text-blue-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Tìm kiếm</p>
                <p className="text-3xl font-bold text-white">{stats.overview.searches}</p>
              </div>
              <Search className="w-8 h-8 text-green-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Yêu thích</p>
                <p className="text-3xl font-bold text-white">{stats.overview.favorites}</p>
              </div>
              <Star className="w-8 h-8 text-purple-200" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Thời gian (giờ)</p>
                <p className="text-3xl font-bold text-white">{stats.overview.timeSpent}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-200" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Most Viewed Coins */}
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-700/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500/20 rounded-xl">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Coin được xem nhiều nhất</h2>
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
                    <p className="text-gray-300 text-sm">lượt xem</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Search History */}
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-700/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-500/20 rounded-xl">
                <Search className="w-6 h-6 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Lịch sử tìm kiếm</h2>
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
                      <p className="text-gray-300 text-sm">Từ khóa tìm kiếm</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold">{search.count}</p>
                    <p className="text-gray-300 text-sm">lần</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Daily Activity Chart */}
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-700/20 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-500/20 rounded-xl">
              <Activity className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Hoạt động hàng ngày</h2>
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {stats.activity.dailyActivity.map((day, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-700 rounded-lg p-3 mb-2">
                  <div className="text-white text-sm font-medium mb-1">
                    {new Date(day.date).toLocaleDateString('vi-VN', { weekday: 'short' })}
                  </div>
                  <div className="space-y-1">
                    <div className="h-2 bg-blue-500 rounded" style={{ width: `${(day.views / 70) * 100}%` }}></div>
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
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-gray-300 text-sm">Lượt xem</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-gray-300 text-sm">Tìm kiếm</span>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-700/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-yellow-500/20 rounded-xl">
              <Award className="w-6 h-6 text-yellow-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Thành tích</h2>
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
                    <span>Đã đạt được</span>
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
