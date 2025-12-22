
"use client";

import { useState, useRef, useEffect } from "react";
import { Check, Plus } from "lucide-react";

interface Tag {
  id: string;
  name: string;
  color: string;
}

interface TagSelectorProps {
  assetId: string;
  selectedTags: Tag[];
  onUpdate: () => void; // Trigger refetch
}

export default function TagSelector({ assetId, selectedTags, onUpdate }: TagSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
        fetch("/api/tags").then(res => res.json()).then(data => setTags(data.tags || []));
    }
  }, [isOpen]);

  const toggleTag = async (tagId: string) => {
    try {
        await fetch(`/api/portfolio/assets/${assetId}/tags`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tagId })
        });
        onUpdate(); 
    } catch (err) {
        console.error(err);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
        <div className="flex flex-wrap gap-1 items-center">
            {selectedTags.map(tag => (
                <span 
                    key={tag.id} 
                    className="text-[10px] px-1.5 py-0.5 rounded-full flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ backgroundColor: tag.color + '20', color: tag.color }}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {tag.name}
                </span>
            ))}
            <button 
                onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
                className="text-gray-500 hover:text-blue-500 p-0.5 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
                <Plus size={14} />
            </button>
        </div>

        {isOpen && (
            <div className="absolute z-50 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-2 border-b border-gray-100 dark:border-gray-700 text-xs font-semibold text-gray-500 uppercase">
                    Select Tags
                </div>
                <div className="max-h-40 overflow-y-auto p-1">
                    {tags.length === 0 ? (
                        <div className="text-xs text-center p-2 text-gray-400">No tags available</div>
                    ) : (
                        tags.map(tag => {
                            const isSelected = selectedTags.some(t => t.id === tag.id);
                            return (
                                <div 
                                    key={tag.id}
                                    onClick={(e) => { e.stopPropagation(); toggleTag(tag.id); }}
                                    className="flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg cursor-pointer"
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tag.color }} />
                                        <span className="text-gray-700 dark:text-gray-200">{tag.name}</span>
                                    </div>
                                    {isSelected && <Check size={14} className="text-blue-500" />}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        )}
    </div>
  );
}
