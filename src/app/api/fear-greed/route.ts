import { NextResponse } from 'next/server';

// Định nghĩa kiểu cho dữ liệu Fear & Greed Index
interface FearGreedItem {
  value: string;
  value_classification: string;
  timestamp: string;
  time_until_update?: string;
  [key: string]: unknown;
}

// API route để fetch Crypto Fear & Greed Index
// Sử dụng alternative.me API (miễn phí, không cần API key)
// Endpoint: /api/fear-greed
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit') || '1'; // Số ngày muốn lấy (default: 1 = hôm nay)
  
  try {
    // Gọi alternative.me Fear & Greed Index API
    const response = await fetch(
      `https://api.alternative.me/fng/?limit=${limit}`,
      {
        // Cache dữ liệu trong 3600 giây (1 giờ)
        next: { revalidate: 3600 }
      }
    );

    if (!response.ok) {
      throw new Error(`Fear & Greed API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Xác định classification dựa trên giá trị
    const getClassification = (value: number) => {
      if (value <= 25) return { text: 'Extreme Fear', color: 'red' };
      if (value <= 45) return { text: 'Fear', color: 'orange' };
      if (value <= 55) return { text: 'Neutral', color: 'yellow' };
      if (value <= 75) return { text: 'Greed', color: 'lightgreen' };
      return { text: 'Extreme Greed', color: 'green' };
    };

    // Format dữ liệu
    const formattedData = data.data.map((item: FearGreedItem) => ({
      value: parseInt(item.value),
      value_classification: item.value_classification,
      classification: getClassification(parseInt(item.value)),
      timestamp: item.timestamp,
      time_until_update: item.time_until_update,
    }));
    
    return NextResponse.json({
      success: true,
      data: formattedData,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error fetching fear & greed index:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Không thể lấy dữ liệu Fear & Greed Index' 
      },
      { status: 500 }
    );
  }
}

