import { NextResponse } from 'next/server';

// API route để lấy thông tin chi tiết của một coin cụ thể
// Endpoint: /api/coin/bitcoin
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const coinId = params.id;
  
  if (!coinId) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Vui lòng cung cấp ID của coin' 
      },
      { status: 400 }
    );
  }

  try {
    // Gọi CoinGecko API để lấy thông tin chi tiết coin
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=true&sparkline=false`,
      {
        headers: {
          'Accept': 'application/json',
        },
        // Cache dữ liệu trong 60 giây
        next: { revalidate: 60 }
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Không tìm thấy coin với ID này' 
          },
          { status: 404 }
        );
      }
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Trả về dữ liệu chi tiết coin cho client
    return NextResponse.json({
      success: true,
      data: data,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error fetching coin details:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Không thể lấy thông tin chi tiết coin' 
      },
      { status: 500 }
    );
  }
}
