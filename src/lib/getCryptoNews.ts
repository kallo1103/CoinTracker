// ============================================
// 📰 Thư viện lấy dữ liệu tin tức crypto
// ============================================
// Sử dụng CryptoPanic API để lấy tin tức crypto thời gian thực
// Hàm này được dùng chung cho API route và Server Component

type NewsItem = {
  id: string;
  title: string;
  url?: string;
  source?: string;
  published_at?: string;
  summary?: string;
};

// ============================================
// In-memory cache để tránh rate limit
// ============================================
let cachedNews: NewsItem[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 10 * 60 * 1000; // 10 phút (trong milliseconds)

/**
 * Lấy tin tức crypto từ CryptoPanic API
 * @param limit - Số lượng tin tức muốn lấy (mặc định: 20)
 * @returns Mảng các bài tin tức crypto
 */
export async function getCryptoNews(limit: number = 20): Promise<NewsItem[]> {
  // Kiểm tra cache trước
  const now = Date.now();
  if (cachedNews && (now - cacheTimestamp) < CACHE_DURATION) {
    console.log('✅ [CryptoPanic] Sử dụng dữ liệu từ cache (còn', Math.round((CACHE_DURATION - (now - cacheTimestamp)) / 1000), 'giây)');
    return cachedNews.slice(0, limit);
  }
  try {
    // Lấy API key từ env (optional - free tier không cần)
    const authToken = process.env.CRYPTOPANIC_API_KEY || '';
    
    // Build URL với hoặc không có auth_token
    const baseUrl = 'https://cryptopanic.com/api/v1/posts/';
    const params = new URLSearchParams({
      public: 'true',
      ...(authToken && { auth_token: authToken }),
    });
    
    const url = `${baseUrl}?${params.toString()}`;
    
    console.log('🔍 [CryptoPanic] Đang lấy tin tức crypto...');
    
    const response = await fetch(url, {
      next: { revalidate: 300 }, // Cache 5 phút
    });

    if (!response.ok) {
      console.error('❌ [CryptoPanic] Lỗi API:', response.status, response.statusText);
      throw new Error(`CryptoPanic API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform CryptoPanic data sang format đơn giản
    const news: NewsItem[] = (data.results || []).map((item: any) => ({
      id: item.id?.toString() || Math.random().toString(),
      title: item.title || 'Không có tiêu đề',
      url: item.url || '#',
      source: item.source?.title || 'CryptoPanic',
      published_at: item.published_at || item.created_at || new Date().toISOString(),
      summary: item.metadata?.description || '',
    }));

    // Lưu vào cache
    cachedNews = news;
    cacheTimestamp = Date.now();

    console.log(`✅ [CryptoPanic] Đã lấy ${news.length} tin tức và lưu vào cache`);
    
    return news.slice(0, limit);
  } catch (error) {
    console.error('❌ [CryptoPanic] Lỗi khi lấy tin tức:', error);
    
    // Nếu có cache cũ, trả về cache đó (kể cả đã hết hạn)
    if (cachedNews && cachedNews.length > 0) {
      console.log('⚠️ [CryptoPanic] API lỗi, sử dụng cache cũ (', cachedNews.length, 'tin)');
      return cachedNews.slice(0, limit);
    }
    
    // Fallback cuối cùng: Trả về dữ liệu mẫu nếu không có cache
    console.log('⚠️ [CryptoPanic] Không có cache, trả về dữ liệu mẫu');
    return [
      {
        id: '1',
        title: '⚠️ Không thể tải tin tức từ CryptoPanic',
        url: 'https://cryptopanic.com',
        source: 'Thông báo lỗi',
        published_at: new Date().toISOString(),
        summary: 'Đã vượt quá giới hạn API (Rate Limit 429). CryptoPanic free tier: 1000 requests/day. Vui lòng đợi một lúc hoặc nâng cấp lên Pro tier để có 10,000 requests/day.'
      },
      {
        id: '2',
        title: '💡 Giải pháp: Thêm API key để tăng rate limit',
        url: 'https://cryptopanic.com/developers/api/',
        source: 'Hướng dẫn',
        published_at: new Date().toISOString(),
        summary: 'Đăng ký tài khoản Pro tại CryptoPanic để nhận auth_token, sau đó thêm vào file .env.local: CRYPTOPANIC_API_KEY=your-token-here'
      }
    ];
  }
}


