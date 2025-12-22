
"use client";

import { useState, useEffect } from "react";
import { User } from "lucide-react";

interface UserAvatarProps {
  src?: string | null;
  name?: string | null;
  size?: number;
  className?: string;
}

export default function UserAvatar({ src, name, size = 40, className = "" }: UserAvatarProps) {
  const [imageError, setImageError] = useState(false);
  const [imgSrc, setImgSrc] = useState<string | null>(src || null);

  useEffect(() => {
    setImgSrc(src || null);
    setImageError(false);
  }, [src]);

  const fallbackInitial = name?.charAt(0).toUpperCase() || "U";
  
  // Use a generated background color based on name length/char code roughly
  const colors = [
    "bg-blue-500", "bg-purple-500", "bg-green-500", "bg-yellow-500", "bg-pink-500", "bg-indigo-500"
  ];
  const colorIndex = (name?.length || 0) % colors.length;
  const bgColor = colors[colorIndex];

  if (!imgSrc || imageError) {
    return (
      <div 
        className={`rounded-full flex items-center justify-center text-white font-bold shadow-sm ${bgColor} ${className}`}
        style={{ width: size, height: size, fontSize: size * 0.4 }}
      >
        {name ? fallbackInitial : <User size={size * 0.6} />}
      </div>
    );
  }

  return (
    <div className={`relative rounded-full overflow-hidden flex-shrink-0 ${className}`} style={{ width: size, height: size }}>
       {/* Use simple img for broader compatibility if domains aren't set up, or next/image if preferred. 
           Using standard img with onError is often simpler for external avatars unless optimized. 
           But let's try next/image with unoptimized prop to allow any source usually. */}
       <img
         src={imgSrc}
         alt={name || "User"}
         className="w-full h-full object-cover"
         onError={() => setImageError(true)}
       />
    </div>
  );
}
