
"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import toast from "react-hot-toast";

export default function CreatePost({ onSuccess }: { onSuccess?: () => void }) {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (!res.ok) throw new Error("Failed to post");

      setContent("");
      toast.success("Post created!");
      // Force reload or trigger callback
      if (onSuccess) {
          onSuccess();
          // Brute force reload for now to refresh the sibling Feed component
          // In a real app we'd use SWR mutate or React Query invalidate
          window.location.reload(); 
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm mb-6">
      <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Create Post</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind? Talk about crypto..."
          className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-lg p-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 min-h-[100px] resize-none mb-3"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!content.trim() || isLoading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send size={16} />}
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
