"use client";

import { useState } from "react";
import TransactionForm from "@/components/transactions/TransactionForm";
import TransactionList from "@/components/transactions/TransactionList";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "motion/react";
import { ArrowLeftRight, History } from "lucide-react";

export default function TransactionsPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-500/10 rounded-full blur-[120px]" />
      </div>

      <Header />
      
      <main className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium mb-4 border border-blue-500/20">
            <History size={12} />
            <span>Transaction History</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 mb-3">
            Ledger
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Record every buy, sell, and transfer to keep your portfolio accurate.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Form */}
          <div className="lg:col-span-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="sticky top-24"
            >
               <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 shadow-xl">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400">
                      <ArrowLeftRight size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-white">Add Transaction</h2>
                 </div>
                 <TransactionForm onSuccess={handleSuccess} />
               </div>
            </motion.div>
          </div>

          {/* Right Column: List */}
          <div className="lg:col-span-8">
             <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
             >
                <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 shadow-xl min-h-[600px]">
                  <h2 className="text-xl font-bold text-white mb-6 px-1">Recent Activity</h2>
                  {/* Force re-render of list when form succeeds */}
                  <TransactionList key={refreshKey} />
                </div>
             </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
