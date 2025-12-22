"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CreateAlert from "@/components/alerts/CreateAlert";
import AlertList from "@/components/alerts/AlertList";
import { BellRing, Zap } from "lucide-react";
import { motion } from "motion/react";

export default function AlertsPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-yellow-500/30">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-yellow-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-orange-500/10 rounded-full blur-[120px]" />
      </div>

      <Header />
      
      <main className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-xs font-medium mb-4 border border-yellow-500/20">
                <Zap size={12} />
                <span>Real-time Monitoring</span>
             </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 mb-3">
                Price Alerts
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl">
                Set custom price targets and get notified instantly when the market moves.
            </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="sticky top-24"
                >
                    <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 shadow-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 bg-yellow-500/10 rounded-xl text-yellow-500">
                                <BellRing size={20} />
                            </div>
                            <h2 className="text-xl font-bold text-white">Create Alert</h2>
                        </div>
                        <CreateAlert onSuccess={() => setRefreshKey(prev => prev + 1)} />
                    </div>
                </motion.div>
            </div>
            
            <div className="md:col-span-8">
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                    <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 shadow-xl min-h-[400px]">
                        <h2 className="text-xl font-bold text-white mb-6 px-1">Active Alerts</h2>
                        <AlertList keyProp={refreshKey} />
                    </div>
                </motion.div>
            </div>
        </div>

      </main>
      
      <Footer />
    </div>
  );
}
