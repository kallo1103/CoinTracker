import { NextResponse } from 'next/server';

// API route để lấy danh sách coins từ CoinGecko
// Endpoint: /api/coins/markets?limit=10
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit') || '10';
  const page = searchParams.get('page') || '1';
  
  try {
    // Gọi CoinGecko API
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=${page}&sparkline=false`,
      {
        headers: {
          'Accept': 'application/json',
        },
        // Cache dữ liệu trong 60 giây
        next: { revalidate: 60 }
      }
    );

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Trả về dữ liệu cho client
    return NextResponse.json({
      success: true,
      data: data,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error fetching coins data:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Không thể lấy dữ liệu cryptocurrency' 
      },
      { status: 500 }
    );
  }
}
