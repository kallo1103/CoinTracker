
"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, X, Tag as TagIcon, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface Tag {
  id: string;
  name: string;
  color: string;
  _count?: { assets: number };
}

export default function TagManager({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [tagName, setTagName] = useState("");
  const [tagColor, setTagColor] = useState("#3b82f6");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  const fetchTags = async () => {
    try {
      setFetchLoading(true);
      const res = await fetch("/api/tags");
      const data = await res.json();
      setTags(data.tags || []);
    } catch {
      toast.error("Failed to load tags");
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) fetchTags();
  }, [isOpen]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tagName.trim()) return;

    setLoading(true);
    try {
        const res = await fetch("/api/tags", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: tagName, color: tagColor }),
        });

        if (!res.ok) throw new Error("Failed");
        
        const newTag = await res.json();
        setTags(prev => [...prev, { ...newTag, _count: { assets: 0 } }]);
        setTagName("");
        toast.success("Tag created");
    } catch {
        toast.error("Failed to create tag");
    } finally {
        setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
      if (!confirm("Delete this tag?")) return;
      try {
          await fetch(`/api/tags/${id}`, { method: "DELETE" });
          setTags(prev => prev.filter(t => t.id !== id));
          toast.success("Tag deleted");
      } catch {
          toast.error("Failed to delete");
      }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
            <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white">
                <TagIcon size={20} className="text-blue-500" />
                Manage Tags
            </h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500">
                <X size={20} />
            </button>
        </div>

        <div className="p-4">
            <form onSubmit={handleCreate} className="flex gap-2 mb-6">
                <div className="flex-1">
                    <input 
                        value={tagName}
                        onChange={(e) => setTagName(e.target.value)}
                        placeholder="New tag name..."
                        className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <input 
                    type="color" 
                    value={tagColor}
                    onChange={(e) => setTagColor(e.target.value)}
                    className="h-9 w-9 p-0 border-none rounded-lg cursor-pointer bg-transparent"
                />
                <button 
                    type="submit" 
                    disabled={loading || !tagName}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg disabled:opacity-50 transition-colors"
                >
                    {loading ? <Loader2 size={20} className="animate-spin" /> : <Plus size={20} />}
                </button>
            </form>

            <div className="max-h-[300px] overflow-y-auto space-y-2">
                {fetchLoading ? (
                    <div className="text-center py-4 text-gray-500"><Loader2 className="animate-spin inline mr-2" /> Loading...</div>
                ) : tags.length === 0 ? (
                    <div className="text-center py-4 text-gray-500 text-sm">No tags found. Create one!</div>
                ) : (
                    tags.map(tag => (
                        <div key={tag.id} className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg group">
                            <div className="flex items-center gap-3">
                                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: tag.color }} />
                                <span className="text-gray-700 dark:text-gray-200">{tag.name}</span>
                                <span className="text-xs text-gray-400">({tag._count?.assets || 0} assets)</span>
                            </div>
                            <button 
                                onClick={() => handleDelete(tag.id)}
                                className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
      </div>
    </div>
  );
}
