import { NextResponse } from 'next/server';
import { getCryptoNews } from '@/lib/getCryptoNews';

// ============================================
// 📰 API Route: Crypto News từ CryptoPanic
// ============================================
// Endpoint: GET /api/crypto-news
// Mô tả: Lấy tin tức crypto thời gian thực từ CryptoPanic API
// 
// CryptoPanic API:
// - Free tier: 1000 requests/day (không cần auth_token)
// - Pro tier: 10000 requests/day (cần auth_token)
// - Docs: https://cryptopanic.com/developers/api/
//
// Sử dụng hàm getCryptoNews() từ lib để có cache tốt hơn

export async function GET(request: Request) {
  try {
    // Lấy parameters từ URL
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    
    // Gọi hàm getCryptoNews (có in-memory cache 10 phút)
    const news = await getCryptoNews(limit);
    
    return NextResponse.json({
      success: true,
      data: news,
      total: news.length,
      source: 'CryptoPanic API (với cache 10 phút)',
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('❌ [API Route] Exception:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Lỗi server khi xử lý request',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

