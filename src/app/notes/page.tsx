
"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NoteList from "@/components/notes/NoteList";
import NoteModal from "@/components/notes/NoteModal";
import { StickyNote, Plus } from "lucide-react";

export default function NotesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
      setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
             <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-500">
                   <StickyNote size={32} />
                </div>
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                        Private Notes
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Securely capture your strategies and thoughts.
                    </p>
                </div>
             </div>
             
             <button 
                 onClick={() => setIsModalOpen(true)}
                 className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
             >
                 <Plus size={20} />
                 New Note
             </button>
        </div>

        <NoteList refreshKey={refreshKey} />

        <NoteModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            onSuccess={handleSuccess} 
        />
      </main>
      
      <Footer />
    </div>
  );
}
