"use client";

import { useState, useEffect, useCallback, Fragment } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, TrendingUp, TrendingDown, Wallet, Loader2, ChevronDown, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CoinImage } from "@/components/OptimizedImage";
import PortfolioHistoryChart from "@/components/PortfolioHistoryChart";

interface Asset {
  id: string;
  coinId: string;
  symbol: string;
  name: string;
  quantity: number;
  buyPrice: number;
  buyDate: string;
}

interface GroupedAsset {
  coinId: string;
  symbol: string;
  name: string;
  totalQuantity: number;
  totalInvestment: number;
  avgBuyPrice: number;
  ids: string[];
}

interface CoinData {
  id: string;
  current_price: number;
  image: string;
  price_change_percentage_24h: number;
}

interface CoinSearchResult {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
}

export default function PortfolioPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [assets, setAssets] = useState<Asset[]>([]);
  const [groupedAssets, setGroupedAssets] = useState<GroupedAsset[]>([]);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  const [marketData, setMarketData] = useState<Record<string, CoinData>>({});
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Tổng quan portfolio
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalInvestment, setTotalInvestment] = useState(0);

  // Form state
  const [formData, setFormData] = useState({
    coinId: "",
    symbol: "",
    name: "",
    quantity: "",
    buyPrice: "",
  });

  // Search state
  const [searchResults, setSearchResults] = useState<CoinSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Redirect nếu chưa login
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  const fetchMarketData = async (ids: string) => {
    try {
      const res = await fetch(`/api/coins/markets?ids=${ids}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        const marketMap: Record<string, CoinData> = {};
        data.data.forEach((coin: CoinData) => {
          marketMap[coin.id] = coin;
        });
        setMarketData(marketMap);
      }
    } catch (error) {
      console.error("Failed to fetch market data", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Assets and Aggregate
  const fetchAssets = useCallback(async () => {
    try {
      const res = await fetch("/api/portfolio/assets");
      const data = await res.json();
      if (Array.isArray(data)) {
        setAssets(data);
        
        // Aggregate Assets
        const groups: Record<string, GroupedAsset> = {};
        data.forEach((asset: Asset) => {
           if (!groups[asset.coinId]) {
             groups[asset.coinId] = {
               coinId: asset.coinId,
               symbol: asset.symbol,
               name: asset.name,
               totalQuantity: 0,
               totalInvestment: 0,
               avgBuyPrice: 0,
               ids: []
             };
           }
           const group = groups[asset.coinId];
           group.totalQuantity += asset.quantity;
           group.totalInvestment += (asset.quantity * asset.buyPrice);
           group.ids.push(asset.id);
        });

        const result = Object.values(groups).map(g => ({
          ...g,
          avgBuyPrice: g.totalQuantity > 0 ? g.totalInvestment / g.totalQuantity : 0
        }));

        setGroupedAssets(result);

        if (data.length > 0) {
          const coinIds = Array.from(new Set(data.map((a: Asset) => a.coinId))).join(",");
          fetchMarketData(coinIds);
        } else {
            setLoading(false);
        }
      }
    } catch (error) {
      console.error("Failed to fetch assets", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (session?.user) {
      fetchAssets();
    }
  }, [session, fetchAssets]);

  // Tính toán tổng quan based on aggregated data
  useEffect(() => {
    let balance = 0;
    let investment = 0;

    groupedAssets.forEach(group => {
      const coin = marketData[group.coinId];
      if (coin) {
        balance += group.totalQuantity * coin.current_price;
      }
      investment += group.totalInvestment;
    });

    setTotalBalance(balance);
    setTotalInvestment(investment);
  }, [groupedAssets, marketData]);

  const searchCoins = async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      setIsSearching(false); // Ensure searching state is reset
      return;
    }
    
    setIsSearching(true);
    try {
      const res = await fetch(`/api/coins/search?query=${query}`);
      const data = await res.json();
      if (data.coins) {
        setSearchResults(data.coins.slice(0, 5));
      }
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setIsSearching(false);
    }
  };

  const selectCoin = (coin: CoinSearchResult) => {
    setFormData({
      ...formData,
      coinId: coin.id,
      name: coin.name,
      symbol: coin.symbol
    });
    setSearchResults([]);
  };

  const handleAddAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/portfolio/assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ coinId: "", symbol: "", name: "", quantity: "", buyPrice: "" });
        fetchAssets(); // Refresh list
      }
    } catch (error) {
      console.error("Error adding asset", error);
    } finally {
      setLoading(false);
    }
  };
  
    const handleDeleteAsset = async (id: string) => {
    if (!confirm("Are you sure you want to delete this asset?")) return;
    
    try {
      const res = await fetch(`/api/portfolio/assets/${id}`, {
        method: "DELETE",
      });
      
      if (res.ok) {
        fetchAssets();
      }
    } catch (error) {
      console.error("Error deleting asset", error);
    }
  };

  const toggleGroup = (coinId: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [coinId]: !prev[coinId]
    }));
  };

  if (status === "loading" || (loading && assets.length === 0)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const totalPnL = totalBalance - totalInvestment;
  const totalPnLPercent = totalInvestment > 0 ? (totalPnL / totalInvestment) * 100 : 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            My Portfolio
          </h1>
          <p className="text-gray-400 mt-1">Track your crypto assets in real-time</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-all shadow-lg shadow-blue-500/20"
        >
          <Plus size={20} />
          Add Asset
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 p-6 rounded-2xl"
        >
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
              <Wallet size={24} />
            </div>
            <span className="text-gray-400 font-medium">Total Balance</span>
          </div>
          <div className="text-3xl font-bold text-white">
            ${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 p-6 rounded-2xl"
        >
          <div className="flex items-center gap-4 mb-2">
            <div className={`p-3 rounded-xl ${totalPnL >= 0 ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
              {totalPnL >= 0 ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
            </div>
            <span className="text-gray-400 font-medium">Total Profit/Loss</span>
          </div>
          <div className={`text-3xl font-bold ${totalPnL >= 0 ? "text-green-400" : "text-red-400"}`}>
            {totalPnL >= 0 ? "+" : ""}${Math.abs(totalPnL).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className={`text-sm mt-1 ${totalPnLPercent >= 0 ? "text-green-500" : "text-red-500"}`}>
            {totalPnLPercent.toFixed(2)}%
          </div>
        </motion.div>
      </div>

      {groupedAssets.length > 0 && (
        <PortfolioHistoryChart assets={groupedAssets} />
      )}

      {/* Assets Table */}
      <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800/50 text-gray-400 text-left text-sm">
                <th className="p-4 font-medium w-8"></th>
                <th className="p-4 font-medium">Asset</th>
                <th className="p-4 font-medium text-right">Price</th>
                <th className="p-4 font-medium text-right">Balance</th>
                <th className="p-4 font-medium text-right">Value</th>
                <th className="p-4 font-medium text-right">Avg. Buy Price</th>
                <th className="p-4 font-medium text-right">Profit/Loss</th>
              </tr>
            </thead>
            <tbody>
              {groupedAssets.map((group) => {
                const coin = marketData[group.coinId];
                const currentPrice = coin?.current_price || 0;
                const value = group.totalQuantity * currentPrice;
                const pnl = value - group.totalInvestment;
                const pnlPercent = group.totalInvestment > 0 ? (pnl / group.totalInvestment) * 100 : 0;
                const isExpanded = expandedGroups[group.coinId];

                return (
                  <Fragment key={group.coinId}>
                  <tr className={`border-t border-gray-800 hover:bg-gray-800/30 transition-colors ${isExpanded ? 'bg-gray-800/20' : ''}`} onClick={() => toggleGroup(group.coinId)}>
                    <td className="p-4 cursor-pointer text-gray-400">
                      {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </td>
                    <td className="p-4 cursor-pointer">
                      <div className="flex items-center gap-3">
                        {coin?.image && <CoinImage src={coin.image} symbol={group.symbol} size={32} className="rounded-full" />}
                        <div>
                          <div className="font-bold text-white">{group.name}</div>
                          <div className="text-sm text-gray-500 uppercase">{group.symbol}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-right text-gray-300">
                      ${currentPrice.toLocaleString()}
                    </td>
                    <td className="p-4 text-right">
                      <div className="text-white font-medium">{group.totalQuantity}</div>
                    </td>
                    <td className="p-4 text-right font-bold text-white">
                      ${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-4 text-right text-gray-400">
                      ${group.avgBuyPrice.toLocaleString()}
                    </td>
                    <td className="p-4 text-right">
                      <div className={`font-medium ${pnl >= 0 ? "text-green-400" : "text-red-400"}`}>
                        {pnl >= 0 ? "+" : ""}${Math.abs(pnl).toLocaleString()}
                      </div>
                      <div className={`text-xs ${pnlPercent >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {pnlPercent.toFixed(2)}%
                      </div>
                    </td>
                  </tr>
                  
                  {/* Expanded Rows */}
                  {isExpanded && assets.filter(a => a.coinId === group.coinId).map((asset) => {
                     const assetPnl = (asset.quantity * currentPrice) - (asset.quantity * asset.buyPrice);
                     const assetPnlPercent = asset.buyPrice > 0 ? (assetPnl / (asset.quantity * asset.buyPrice)) * 100 : 0;
                     
                     return (
                        <tr key={asset.id} className="bg-gray-900/30 border-t border-gray-800/50">
                            <td className="p-4"></td>
                            <td className="p-4 pl-12 text-sm text-gray-400">Lot {new Date(asset.buyDate).toLocaleDateString()}</td>
                            <td className="p-4 text-right">-</td>
                            <td className="p-4 text-right text-gray-400">{asset.quantity}</td>
                            <td className="p-4 text-right text-gray-400">${(asset.quantity * currentPrice).toLocaleString()}</td>
                            <td className="p-4 text-right text-gray-400">${asset.buyPrice.toLocaleString()}</td>
                            <td className="p-4 text-right text-sm">
                                <span className={assetPnl >= 0 ? "text-green-500/80" : "text-red-500/80"}>
                                    {assetPnlPercent.toFixed(2)}%
                                </span>
                            </td>
                            <td className="p-4 text-right">
                                <button 
                                    onClick={(e) => { e.stopPropagation(); handleDeleteAsset(asset.id); }}
                                    className="p-1 hover:bg-red-500/20 text-red-400 rounded transition-colors"
                                    title="Delete this lot"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </td>
                        </tr>
                     );
                  })}
                  </Fragment>
                );
              })}
              {groupedAssets.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500">
                    Your portfolio is empty. Add your first asset!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Asset Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md p-6 shadow-2xl"
            >
              <h2 className="text-2xl font-bold mb-6 text-white">Add Asset</h2>
              <form onSubmit={handleAddAsset} className="space-y-4">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-400 mb-1">Search Coin</label>
                    <input
                      type="text"
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="Type bitcoin, ethereum..."
                      value={formData.name} // Use name for display
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        searchCoins(e.target.value);
                      }}
                    />
                    
                    {/* Search Results Dropdown */}
                    {isSearching && (
                       <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-xl p-3 text-center text-gray-400 shadow-xl">
                          Searching...
                       </div>
                    )}
                    
                    {!isSearching && searchResults.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-xl max-h-60 overflow-y-auto shadow-xl">
                        {searchResults.map((coin) => (
                          <div
                            key={coin.id}
                            className="p-3 hover:bg-gray-700 cursor-pointer flex items-center gap-3 transition-colors"
                            onClick={() => selectCoin(coin)}
                          >
                            <CoinImage src={coin.thumb} symbol={coin.symbol} size={24} className="rounded-full" />
                            <div>
                              <div className="font-medium text-white">{coin.name}</div>
                              <div className="text-xs text-gray-400">{coin.symbol}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Hidden fields but shown for confirmation */}
                  {formData.coinId && (
                    <div className="grid grid-cols-2 gap-4 mt-4 bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                      <div>
                        <span className="block text-xs text-gray-500 mb-1">Selected Coin ID</span>
                        <span className="font-mono text-sm text-blue-400">{formData.coinId}</span>
                      </div>
                      <div>
                         <span className="block text-xs text-gray-500 mb-1">Symbol</span>
                         <span className="font-mono text-sm text-blue-400">{formData.symbol}</span>
                      </div>
                    </div>
                  )}

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Quantity</label>
                  <input
                    type="number"
                    step="any"
                    required
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500"
                    placeholder="0.00"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Buy Price ($)</label>
                  <input
                    type="number"
                    step="any"
                    required
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500"
                    placeholder="0.00"
                    value={formData.buyPrice}
                    onChange={(e) => setFormData({...formData, buyPrice: e.target.value})}
                  />
                </div>

                <div className="flex gap-3 mt-8">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors disabled:opacity-50"
                  >
                    {loading ? "Adding..." : "Add Asset"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
