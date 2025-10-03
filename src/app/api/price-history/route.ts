import { NextResponse } from 'next/server';

// API route để fetch historical price data từ CoinGecko (miễn phí)
// CoinMarketCap free plan không hỗ trợ historical data
// Endpoint: /api/price-history
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol') || 'BTC'; // Coin symbol
  const count = searchParams.get('count') || '30'; // Số ngày
  
  try {
    // Map symbol sang CoinGecko ID
    const coinMap: { [key: string]: string } = {
      'BTC': 'bitcoin',
      'ETH': 'ethereum',
      'BNB': 'binancecoin',
      'SOL': 'solana',
      'ADA': 'cardano',
      'XRP': 'ripple',
      'DOT': 'polkadot',
      'DOGE': 'dogecoin',
      'MATIC': 'matic-network',
      'LTC': 'litecoin',
    };
    
    const coinId = coinMap[symbol.toUpperCase()] || 'bitcoin';
    const days = count;

    // Gọi CoinGecko API - hoàn toàn miễn phí, không cần API key
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=${days}`,
      {
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 300 } // Cache 5 phút
      }
    );

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Format dữ liệu từ CoinGecko
    // Data format: [timestamp, open, high, low, close]
    const formattedData = data.map((item: number[]) => ({
      timestamp: item[0],
      date: new Date(item[0]).toLocaleDateString('vi-VN'),
      open: item[1],
      high: item[2],
      low: item[3],
      close: item[4],
      volume: 0, // CoinGecko OHLC không bao gồm volume trong free tier
    }));
    
    return NextResponse.json({
      success: true,
      symbol: symbol,
      data: formattedData,
      source: 'CoinGecko API (Free)',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error fetching price history:', error);
    // Fallback to mock data nếu CoinGecko cũng lỗi
    return generateMockData(symbol, parseInt(count || '30'));
  }
}

// Hàm tạo mock data nếu không có quyền truy cập API
function generateMockData(symbol: string, count: number) {
  const basePrice = symbol === 'BTC' ? 65000 : symbol === 'ETH' ? 3500 : 100;
  const data = [];
  const now = Date.now();
  
  for (let i = count - 1; i >= 0; i--) {
    const timestamp = now - (i * 24 * 60 * 60 * 1000); // Mỗi ngày
    const randomChange = (Math.random() - 0.5) * 0.05; // ±5% change
    const price = basePrice * (1 + randomChange);
    const open = price * (1 + (Math.random() - 0.5) * 0.02);
    const close = price * (1 + (Math.random() - 0.5) * 0.02);
    const high = Math.max(open, close) * (1 + Math.random() * 0.02);
    const low = Math.min(open, close) * (1 - Math.random() * 0.02);
    
    data.push({
      timestamp,
      date: new Date(timestamp).toLocaleDateString('vi-VN'),
      open,
      high,
      low,
      close,
      volume: Math.random() * 1000000000,
    });
  }
  
  return NextResponse.json({
    success: true,
    symbol: symbol,
    data,
    note: 'Mock data - upgrade CMC plan for real historical data',
    timestamp: new Date().toISOString()
  });
}

