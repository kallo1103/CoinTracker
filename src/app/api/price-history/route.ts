import { NextResponse } from 'next/server';

// API route để fetch historical price data từ CoinMarketCap
// Endpoint: /api/price-history
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol') || 'BTC'; // Coin symbol
  const interval = searchParams.get('interval') || '1d'; // 1d, 1h, etc
  const count = searchParams.get('count') || '30'; // Số data points
  
  try {
    // Lấy thông tin coin trước để có ID
    const coinResponse = await fetch(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbol}`,
      {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY || '',
          'Accept': 'application/json',
        },
      }
    );

    if (!coinResponse.ok) {
      throw new Error(`CoinMarketCap API error: ${coinResponse.status}`);
    }

    const coinData = await coinResponse.json();
    const coinId = coinData.data[symbol].id;

    // Gọi CoinMarketCap OHLCV Historical API
    // Note: Endpoint này cần plan cao hơn Basic. Nếu không có, dùng quotes/latest
    const response = await fetch(
      `https://pro-api.coinmarketcap.com/v2/cryptocurrency/ohlcv/historical?id=${coinId}&count=${count}&interval=${interval}`,
      {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY || '',
          'Accept': 'application/json',
        },
        next: { revalidate: 300 } // Cache 5 phút
      }
    );

    if (!response.ok) {
      // Nếu không có quyền truy cập historical data, tạo mock data
      console.warn('Historical API not available, generating mock data');
      return generateMockData(symbol, parseInt(count));
    }

    const data = await response.json();
    
    // Format dữ liệu cho chart
    const formattedData = data.data.quotes.map((quote: any) => ({
      timestamp: new Date(quote.time_open).getTime(),
      date: new Date(quote.time_open).toLocaleDateString('vi-VN'),
      open: quote.quote.USD.open,
      high: quote.quote.USD.high,
      low: quote.quote.USD.low,
      close: quote.quote.USD.close,
      volume: quote.quote.USD.volume,
    }));
    
    return NextResponse.json({
      success: true,
      symbol: symbol,
      data: formattedData,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error fetching price history:', error);
    // Fallback to mock data
    return generateMockData(symbol, parseInt(count));
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

