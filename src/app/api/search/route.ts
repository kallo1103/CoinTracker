import { NextResponse } from 'next/server';

// API route để tìm kiếm coin sử dụng CoinGecko API
// Endpoint: /api/search?q=bitcoin
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q'); // Từ khóa tìm kiếm
  
  if (!query) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Vui lòng nhập từ khóa tìm kiếm' 
      },
      { status: 400 }
    );
  }

  try {
    // Gọi CoinGecko Search API
    const response = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(query)}`,
      {
        headers: {
          'Accept': 'application/json',
        },
        // Cache dữ liệu trong 300 giây (5 phút) để tránh quá nhiều requests
        next: { revalidate: 300 }
      }
    );

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Trả về dữ liệu tìm kiếm cho client
    return NextResponse.json({
      success: true,
      data: {
        coins: data.coins || [],
        exchanges: data.exchanges || [],
        categories: data.categories || []
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error searching crypto:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Không thể tìm kiếm cryptocurrency' 
      },
      { status: 500 }
    );
  }
}
