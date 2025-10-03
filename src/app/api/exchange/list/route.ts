import { NextResponse } from 'next/server';

// API route để fetch danh sách exchanges từ CoinGecko (API miễn phí)
// Endpoint: /api/exchange/list
// Trả về danh sách các sàn giao dịch với dữ liệu thị trường mới nhất
// 
// Lưu ý: CoinMarketCap free plan KHÔNG hỗ trợ exchange endpoint
// Nên chúng ta sử dụng CoinGecko API (miễn phí, không cần API key)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const perPage = searchParams.get('limit') || '100'; // Số lượng exchanges muốn lấy
  
  try {
    // Gọi CoinGecko Exchanges API (miễn phí, không cần API key)
    const response = await fetch(
      `https://api.coingecko.com/api/v3/exchanges?per_page=${perPage}`,
      {
        headers: {
          'Accept': 'application/json',
        },
        // Cache dữ liệu trong 300 giây (5 phút) vì dữ liệu exchange ít thay đổi
        next: { revalidate: 300 }
      }
    );

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Format lại dữ liệu để dễ sử dụng ở client
    const formattedData = data.map((exchange: any, index: number) => ({
      id: exchange.id,
      name: exchange.name,
      slug: exchange.id,
      // Thông tin từ CoinGecko
      year_established: exchange.year_established,
      country: exchange.country,
      description: exchange.description,
      url: exchange.url,
      image: exchange.image,
      has_trading_incentive: exchange.has_trading_incentive,
      trust_score: exchange.trust_score,
      trust_score_rank: exchange.trust_score_rank,
      trade_volume_24h_btc: exchange.trade_volume_24h_btc,
      trade_volume_24h_btc_normalized: exchange.trade_volume_24h_btc_normalized,
      // Chuyển đổi sang format tương tự CoinMarketCap
      num_market_pairs: exchange.number_of_markets || 0,
      // Volume tính bằng BTC (CoinGecko không cung cấp USD trực tiếp)
      volume_24h_btc: exchange.trade_volume_24h_btc || 0,
      volume_24h_btc_normalized: exchange.trade_volume_24h_btc_normalized || 0,
      // Thứ hạng
      rank: index + 1,
    }));
    
    // Trả về dữ liệu cho client
    return NextResponse.json({
      success: true,
      data: formattedData,
      total: formattedData.length,
      timestamp: new Date().toISOString(),
      source: 'CoinGecko API (Free)'
    });
    
  } catch (error) {
    console.error('Error fetching exchange data:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Không thể lấy dữ liệu exchanges từ CoinGecko',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

