
"use client";

import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";
import UserAvatar from "@/components/common/UserAvatar";
import CommentModal from "@/components/community/CommentModal";

interface User {
  id: string;
  name: string | null;
  image: string | null;
}

interface Post {
  id: string;
  content: string;
  imageUrl?: string | null;
  createdAt: string;
  user: User;
  _count: {
    likes: number;
    comments: number;
  };
  isLiked: boolean;
}

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (error) {
       console.error(error);
       toast.error("Failed to load feed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = async (postId: string) => {
    // Optimistic update
    setPosts(prev => prev.map(p => {
        if (p.id === postId) {
            return {
                ...p,
                isLiked: !p.isLiked,
                _count: { ...p._count, likes: p.isLiked ? p._count.likes - 1 : p._count.likes + 1 }
            };
        }
        return p;
    }));

    try {
        await fetch(`/api/posts/${postId}/like`, { method: "POST" });
    } catch (error) {
        console.error("Like failed", error);
        toast.error("Action failed");
        // Revert (could simplify by refetching)
        fetchPosts(); 
    }
  };

  if (loading) return <div className="text-center py-10 text-gray-500">Loading community...</div>;

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div key={post.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm transition-all hover:border-gray-300 dark:hover:border-gray-700">
          <div className="flex items-start gap-4">
             <div className="flex-shrink-0">
               <UserAvatar src={post.user.image} name={post.user.name} size={40} />
             </div>

             <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900 dark:text-white truncate">
                        {post.user.name || "Anonymous User"}
                    </span>
                    <span className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                    </span>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap mb-3">
                    {post.content}
                </p>
                
                {post.imageUrl && (
                    <div className="mb-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
                         <img src={post.imageUrl} alt="Post content" className="w-full h-auto max-h-96 object-cover" />
                    </div>
                )}

                <div className="flex items-center gap-6 pt-2">
                    <button 
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                            post.isLiked 
                                ? "text-red-500" 
                                : "text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                        }`}
                    >
                        <Heart size={18} fill={post.isLiked ? "currentColor" : "none"} />
                        {post._count.likes}
                    </button>

                    <button 
                        onClick={() => setSelectedPostId(post.id)}
                        className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                    >
                        <MessageCircle size={18} />
                        {post._count.comments}
                    </button>
                </div>
             </div>
          </div>
        </div>
      ))}
      {posts.length === 0 && (
          <div className="text-center py-10 text-gray-500">
              Be the first to post!
          </div>
      )}
      
      {/* Comment Modal */}
      {selectedPostId && (
        <CommentModal
          postId={selectedPostId}
          isOpen={!!selectedPostId}
          onClose={() => {
            setSelectedPostId(null);
            // Refresh posts to update comment count
            fetchPosts();
          }}
        />
      )}
    </div>
  );
}
