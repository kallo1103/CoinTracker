
"use client";

import { useEffect, useState } from "react";
import { Trash2, TrendingUp, TrendingDown } from "lucide-react";
import toast from "react-hot-toast";

interface Alert {
  id: string;
  coinId: string;
  targetPrice: number;
  condition: "ABOVE" | "BELOW";
  isActive: boolean;
}

export default function AlertList({ keyProp }: { keyProp: number }) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/alerts");
      const data = await res.json();
      setAlerts(data.alerts || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, [keyProp]);

  const handleDelete = async (id: string) => {
    try {
       await fetch(`/api/alerts?id=${id}`, { method: "DELETE" });
       setAlerts(prev => prev.filter(a => a.id !== id));
       toast.success("Alert deleted");
    } catch {
       toast.error("Failed to delete");
    }
  };

  if (loading) return <div className="text-center py-8 text-gray-500">Loading alerts...</div>;

  return (
    <div className="space-y-3">
       {alerts.map(alert => (
          <div key={alert.id} className="flex items-center justify-between p-4 bg-gray-800/40 hover:bg-gray-800/60 transition-colors border border-gray-700/50 rounded-xl">
              <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${alert.condition === "ABOVE" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                      {alert.condition === "ABOVE" ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                  </div>
                  <div>
                      <div className="font-bold text-gray-900 dark:text-white capitalize">{alert.coinId}</div>
                      <div className="text-sm text-gray-500">
                          Target: <span className="font-mono text-gray-700 dark:text-gray-300">${alert.targetPrice}</span>
                      </div>
                  </div>
              </div>
              
              <button 
                onClick={() => handleDelete(alert.id)}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
              >
                  <Trash2 size={18} />
              </button>
          </div>
       ))}
       
       {alerts.length === 0 && (
           <div className="text-center py-8 text-gray-500 border border-dashed border-gray-300 dark:border-gray-700 rounded-xl">
               No active alerts
           </div>
       )}
    </div>
  );
}
