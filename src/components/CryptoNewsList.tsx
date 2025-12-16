"use client";

import React from 'react';
import { logger } from '@/utils/logger';

type NewsItem = {
  id: string;
  title: string;
  url?: string;
  source?: string;
  published_at?: string;
  summary?: string;
};

// Component hiển thị danh sách tin crypto
export default function CryptoNewsList({ items }: { items: NewsItem[] }) {
  if (!items || items.length === 0) {
    return <div className="p-4 text-gray-400">Không có tin tức.</div>;
  }

  // Hàm xử lý click vào link tin tức
  const handleNewsClick = (e: React.MouseEvent<HTMLAnchorElement>, url?: string) => {
    // Nếu không có URL hoặc URL không hợp lệ, chặn hành động mặc định
    if (!url || url === '#' || url === '') {
      e.preventDefault();
      logger.warn('⚠️ Link tin tức không hợp lệ');
      return;
    }
    
    // Link hợp lệ sẽ mở trong tab mới (target="_blank")
    logger.debug('🔗 Mở tin tức:', url);
  };

  return (
    <ul className="space-y-4 p-4">
      {items.map((item) => {
        const hasValidUrl = item.url && item.url !== '#' && item.url !== '';
        
        return (
          <li 
            key={item.id} 
            className="bg-gray-800 p-4 rounded-lg hover:bg-gray-750 transition-colors duration-200"
          >
            {/* Tiêu đề tin tức */}
            {hasValidUrl ? (
              <a 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => handleNewsClick(e, item.url)}
                className="text-white font-medium hover:text-gray-300 hover:underline transition-colors duration-200 flex items-center gap-2 group"
              >
                <span>{item.title}</span>
                <span className="text-gray-500 group-hover:text-gray-300 transition-colors">
                  ↗
                </span>
              </a>
            ) : (
              <span className="text-white font-medium">{item.title}</span>
            )}

            {/* Nguồn tin */}
            {item.source && (
              <div className="text-sm text-gray-400 mt-1 flex items-center gap-2">
                <span>📰</span>
                <span>{item.source}</span>
              </div>
            )}

            {/* Thời gian xuất bản */}
            {item.published_at && (
              <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                <span>🕐</span>
                <span>{new Date(item.published_at).toLocaleString('vi-VN')}</span>
              </div>
            )}

            {/* Tóm tắt */}
            {item.summary && (
              <p className="mt-2 text-gray-300 text-sm leading-relaxed">
                {item.summary}
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
}
