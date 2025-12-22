
"use client";

import { useEffect, useState } from "react";
import { Pin, Trash2, Edit2, Calendar } from "lucide-react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import NoteModal from "./NoteModal";

interface Note {
  id: string;
  title: string;
  content: string;
  coinId?: string | null;
  isPinned: boolean;
  updatedAt: string;
}

export default function NoteList({ refreshKey }: { refreshKey: number }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/notes");
      const data = await res.json();
      setNotes(data.notes || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [refreshKey]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this note?")) return;
    try {
        await fetch(`/api/notes/${id}`, { method: "DELETE" });
        setNotes(prev => prev.filter(n => n.id !== id));
        toast.success("Note deleted");
    } catch {
        toast.error("Failed to delete");
    }
  };

  if (loading) return <div className="text-center py-10 text-gray-500">Loading notes...</div>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.length === 0 && (
            <div className="col-span-full text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 text-gray-400">
                No notes yet. Create your first one!
            </div>
        )}
        
        {notes.map(note => (
          <div 
             key={note.id} 
             className={`group relative bg-white dark:bg-gray-900 border rounded-xl p-5 shadow-sm transition-all hover:shadow-md ${
                 note.isPinned ? "border-blue-200 dark:border-blue-900 ring-1 ring-blue-100 dark:ring-blue-900/50" : "border-gray-200 dark:border-gray-800"
             }`}
          >
             <div className="flex justify-between items-start mb-3">
                 <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-1 pr-8">
                     {note.title}
                 </h3>
                 {note.isPinned && <Pin size={16} className="text-blue-500 shrink-0" fill="currentColor" />}
             </div>
             
             <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-4 min-h-[5rem] whitespace-pre-wrap">
                 {note.content}
             </p>
             
             <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100 dark:border-gray-800">
                 <div className="flex items-center gap-2 text-xs text-gray-400">
                     <Calendar size={12} />
                     {format(new Date(note.updatedAt), "MMM d, yyyy")}
                 </div>
                 
                 <div className="flex items-center gap-1 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                     <button 
                         onClick={() => setEditingNote(note)}
                         className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                     >
                         <Edit2 size={16} />
                     </button>
                     <button 
                         onClick={() => handleDelete(note.id)}
                         className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                     >
                         <Trash2 size={16} />
                     </button>
                 </div>
             </div>
             
             {note.coinId && (
                 <span className="absolute top-5 right-10 text-[10px] font-mono bg-gray-100 dark:bg-gray-800 text-gray-500 px-2 py-0.5 rounded-full uppercase">
                     {note.coinId}
                 </span>
             )}
          </div>
        ))}
      </div>

      {editingNote && (
        <NoteModal 
            isOpen={true} 
            onClose={() => setEditingNote(null)} 
            onSuccess={() => {
                fetchNotes();
                setEditingNote(null);
            }} 
            editNote={editingNote} 
        />
      )}
    </>
  );
}
