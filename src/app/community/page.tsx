
"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Feed from "@/components/community/Feed";
import CreatePost from "@/components/community/CreatePost";
import { Users } from "lucide-react";

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl relative">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 -m-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -z-10 pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
             <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                    Crypto Community
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Connect, share, and discuss with fellow investors.
                </p>
             </div>
             <div className="p-3 bg-gradient-to-br from-pink-500/10 to-indigo-500/10 rounded-2xl text-indigo-500">
                 <Users size={32} />
             </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar (optional profiles/trends) */}
            <div className="hidden lg:block lg:col-span-1">
               <div className="sticky top-24 space-y-4">
                   <div className="bg-gray-100 dark:bg-gray-900 rounded-xl p-4">
                       <h3 className="font-semibold text-sm text-gray-500 uppercase mb-3">Trending Topics</h3>
                       <div className="space-y-2">
                           {['#Bitcoin', '#Ethereum', '#BullRun', '#WAGMI', '#DeFi'].map(tag => (
                               <div key={tag} className="text-sm font-medium hover:text-blue-500 cursor-pointer transition-colors px-2 py-1 hover:bg-white/5 rounded">
                                   {tag}
                               </div>
                           ))}
                       </div>
                   </div>
               </div>
            </div>

            {/* Main Feed Area */}
            <div className="lg:col-span-3 space-y-6">
                <CreatePost />
                <Feed />
            </div>
        </div>

      </main>
      
      <Footer />
    </div>
  );
}
