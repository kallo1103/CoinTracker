import CryptoNewsList from '@/components/CryptoNewsList';
import React from 'react';
import { getCryptoNews } from '@/lib/getCryptoNews';

// Server component: gọi trực tiếp hàm lấy dữ liệu thay vì fetch nội bộ
async function fetchCryptoNews() {
  try {
    const data = await getCryptoNews();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('Error fetching crypto news', err);
    return [];
  }
}

export default async function CryptoNewsPage() {
  const items = await fetchCryptoNews();

  return (
    <main className="p-5">
      <h1 className="text-2xl font-bold text-white mb-4">Tin tức Crypto</h1>
      <CryptoNewsList items={items} />
    </main>
  );
}


