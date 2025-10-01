import { NextResponse } from 'next/server';

// API route để fetch dữ liệu từ CoinMarketCap
// Endpoint: /api/crypto
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit') || '10'; // Số lượng coins muốn lấy
  
  try {
    // Gọi CoinMarketCap API
    const response = await fetch(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=${limit}&convert=USD`,
      {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY || '',
          'Accept': 'application/json',
        },
        // Cache dữ liệu trong 60 giây để tránh quá nhiều requests
        next: { revalidate: 60 }
      }
    );

    if (!response.ok) {
      throw new Error(`CoinMarketCap API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Trả về dữ liệu cho client
    return NextResponse.json({
      success: true,
      data: data.data,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Không thể lấy dữ liệu cryptocurrency' 
      },
      { status: 500 }
    );
  }
}

