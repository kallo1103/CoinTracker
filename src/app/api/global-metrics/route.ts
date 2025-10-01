import { NextResponse } from 'next/server';

// API route để fetch Global Metrics từ CoinMarketCap
// Bao gồm: Bitcoin Dominance, Total Market Cap, Volume, etc.
// Endpoint: /api/global-metrics
export async function GET() {
  try {
    // Gọi CoinMarketCap Global Metrics API
    const response = await fetch(
      'https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest',
      {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY || '',
          'Accept': 'application/json',
        },
        // Cache dữ liệu trong 120 giây (2 phút)
        next: { revalidate: 120 }
      }
    );

    if (!response.ok) {
      throw new Error(`CoinMarketCap API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Trả về dữ liệu metrics quan trọng
    return NextResponse.json({
      success: true,
      data: {
        // Bitcoin dominance (%)
        btc_dominance: data.data.btc_dominance,
        // Ethereum dominance (%)
        eth_dominance: data.data.eth_dominance,
        // Tổng market cap (USD)
        total_market_cap: data.data.quote.USD.total_market_cap,
        // Tổng volume 24h (USD)
        total_volume_24h: data.data.quote.USD.total_volume_24h,
        // Số lượng cryptocurrencies active
        active_cryptocurrencies: data.data.active_cryptocurrencies,
        // Thay đổi market cap 24h (%)
        total_market_cap_yesterday_percentage_change: data.data.quote.USD.total_market_cap_yesterday_percentage_change,
        // Thời gian cập nhật
        last_updated: data.data.last_updated,
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error fetching global metrics:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Không thể lấy dữ liệu global metrics' 
      },
      { status: 500 }
    );
  }
}

