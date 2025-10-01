# 📊 Hướng dẫn Charts - Biểu đồ

## Các Charts đã tạo

### 1. 🕯️ **CandlestickChart** - Biểu đồ nến (Candlestick)

Component hiển thị biểu đồ nến Nhật (Japanese Candlestick) - loại biểu đồ phổ biến nhất trong trading.

**Features:**
- Hiển thị OHLC (Open, High, Low, Close) đầy đủ
- Nến xanh (tăng giá) và nến đỏ (giảm giá)
- Đuôi nến (wicks) hiển thị high/low
- Tooltip chi tiết với tất cả thông tin
- Volume bars ở dưới
- Stats bar: Open, High, Low, Close
- Đếm số nến xanh/đỏ
- Responsive design

**Usage:**
```tsx
// Bitcoin 30 ngày
<CandlestickChart symbol="BTC" days={30} />

// Ethereum 7 ngày
<CandlestickChart symbol="ETH" days={7} />

// Bất kỳ coin nào
<CandlestickChart symbol="SOL" days={90} />
```

**Props:**
- `symbol` (string, default: 'BTC'): Symbol của coin (BTC, ETH, SOL, etc.)
- `days` (number, default: 30): Số ngày muốn hiển thị

**Cách đọc nến:**
- **Nến xanh (Green)**: Close > Open = Giá tăng
- **Nến đỏ (Red)**: Close < Open = Giá giảm
- **Thân nến (Body)**: Khoảng giữa Open và Close
- **Đuôi trên (Upper wick)**: High - Max(Open, Close)
- **Đuôi dưới (Lower wick)**: Min(Open, Close) - Low

---

### 2. 📈 **PriceChart** - Biểu đồ giá crypto

Component hiển thị biểu đồ giá theo thời gian cho bất kỳ cryptocurrency nào.

**Features:**
- Area chart hoặc Line chart
- Hiển thị giá Open, High, Low, Close (OHLC)
- Tooltip chi tiết khi hover
- % thay đổi theo thời gian
- Responsive design

**Usage:**
```tsx
// Bitcoin 30 ngày (area chart)
<PriceChart symbol="BTC" days={30} type="area" />

// Ethereum 7 ngày (line chart)
<PriceChart symbol="ETH" days={7} type="line" />

// Bất kỳ coin nào
<PriceChart symbol="SOL" days={90} type="area" />
```

**Props:**
- `symbol` (string, default: 'BTC'): Symbol của coin (BTC, ETH, SOL, etc.)
- `days` (number, default: 30): Số ngày muốn hiển thị
- `type` ('line' | 'area', default: 'area'): Loại biểu đồ

---

### 3. 😱 **FearGreedChart** - Biểu đồ lịch sử Fear & Greed

Hiển thị lịch sử chỉ số Fear & Greed Index trong 30 ngày gần đây.

**Features:**
- Area chart với gradient từ đỏ → vàng → xanh
- Reference lines cho các mức quan trọng (25, 50, 75)
- Tooltip hiển thị phân loại (Extreme Fear, Fear, Neutral, Greed, Extreme Greed)
- Tính % thay đổi so với 7 ngày trước
- Legend giải thích các mức độ

**Usage:**
```tsx
<FearGreedChart />
```

**Data Source:** alternative.me API (miễn phí, không cần API key)

---

### 4. 🥧 **DominancePieChart** - Biểu đồ tròn Market Dominance

Hiển thị phân bổ thị phần (dominance) của Bitcoin, Ethereum và Altcoins khác.

**Features:**
- Pie chart với 3 phần: BTC, ETH, Others
- Màu sắc phân biệt: Orange (BTC), Purple (ETH), Blue (Others)
- Labels hiển thị % trên biểu đồ
- Tooltip chi tiết khi hover
- Stats summary bên dưới

**Usage:**
```tsx
<DominancePieChart />
```

**Data Source:** CoinMarketCap Global Metrics API

---

## API Endpoints

### `/api/price-history` - Lấy dữ liệu giá lịch sử

**Parameters:**
- `symbol` (string): Coin symbol (BTC, ETH, etc.)
- `count` (number): Số data points muốn lấy
- `interval` (string): Interval (1d, 1h, etc.)

**Example:**
```
GET /api/price-history?symbol=BTC&count=30&interval=1d
```

**Response:**
```json
{
  "success": true,
  "symbol": "BTC",
  "data": [
    {
      "timestamp": 1696176000000,
      "date": "1/10/2025",
      "open": 64500.20,
      "high": 65200.50,
      "low": 63800.10,
      "close": 65000.00,
      "volume": 35000000000
    }
  ]
}
```

**Lưu ý:** 
- Historical data endpoint của CoinMarketCap yêu cầu plan cao hơn Basic
- Nếu không có quyền, API sẽ tự động generate mock data để demo
- Để có real data, upgrade CoinMarketCap plan

---

## Thư viện sử dụng

### Recharts
- **Version:** Latest
- **License:** MIT
- **Docs:** https://recharts.org

**Các components đã dùng:**
- `<LineChart>` - Biểu đồ đường
- `<AreaChart>` - Biểu đồ vùng
- `<PieChart>` - Biểu đồ tròn
- `<CartesianGrid>` - Lưới tọa độ
- `<XAxis>`, `<YAxis>` - Trục tọa độ
- `<Tooltip>` - Tooltip tùy chỉnh
- `<Legend>` - Chú thích
- `<ResponsiveContainer>` - Container responsive

---

## Tùy chỉnh Charts

### Thay đổi màu sắc

```tsx
// Trong PriceChart.tsx, tìm dòng:
<Area 
  stroke={isPositive ? "#10b981" : "#ef4444"} // Màu đường
  fill={`url(#color${symbol})`} // Màu fill
/>

// Thay đổi màu gradient:
<linearGradient id={`color${symbol}`} x1="0" y1="0" x2="0" y2="1">
  <stop offset="5%" stopColor="#your-color" stopOpacity={0.3}/>
  <stop offset="95%" stopColor="#your-color" stopOpacity={0}/>
</linearGradient>
```

### Thay đổi kích thước chart

```tsx
// Thay đổi height trong ResponsiveContainer:
<ResponsiveContainer width="100%" height={400}>
  {/* Chart content */}
</ResponsiveContainer>
```

### Thêm nhiều coins vào price chart

```tsx
// Trong page.tsx:
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
  <PriceChart symbol="BTC" days={30} type="area" />
  <PriceChart symbol="ETH" days={30} type="area" />
  <PriceChart symbol="SOL" days={30} type="area" />
</div>
```

---

## Troubleshooting

### Chart không hiển thị
1. Kiểm tra console log có lỗi
2. Đảm bảo API đang hoạt động (`/api/price-history`, `/api/fear-greed`, `/api/global-metrics`)
3. Kiểm tra `.env.local` có CoinMarketCap API key

### Mock data thay vì real data
- Price history endpoint yêu cầu CoinMarketCap plan cao hơn
- Upgrade plan hoặc sử dụng mock data để demo
- Mock data được generate tự động và vẫn trông realistic

### Chart bị lag/chậm
- Giảm số data points (giảm `days` prop)
- Tăng cache time trong API routes
- Optimize rendering với `useMemo` nếu cần

### Responsive không hoạt động
- Đảm bảo parent container có width defined
- Sử dụng `ResponsiveContainer` từ recharts
- Kiểm tra Tailwind breakpoints (`lg:`, `md:`, etc.)

---

## Performance Tips

1. **Caching:** API routes có cache built-in (5 phút cho price, 1 giờ cho fear & greed)
2. **Auto-refresh:** Components tự động refresh data theo interval
3. **Lazy loading:** Có thể dùng `dynamic` import cho charts nếu bundle size lớn
4. **Debounce:** Tooltip và hover effects đã được optimize

---

## Mở rộng

### Thêm loại chart khác

**Candlestick Chart (nến Nhật):**
```tsx
// Sử dụng recharts-more hoặc lightweight-charts
// Example: <CandlestickChart data={ohlcvData} />
```

**Volume Bars:**
```tsx
import { BarChart, Bar } from 'recharts';

<BarChart data={data}>
  <Bar dataKey="volume" fill="#3b82f6" />
</BarChart>
```

**Multiple Line Chart:**
```tsx
<LineChart data={data}>
  <Line dataKey="btc" stroke="#f97316" />
  <Line dataKey="eth" stroke="#8b5cf6" />
  <Line dataKey="sol" stroke="#10b981" />
</LineChart>
```

---

## Screenshots

Sau khi chạy `npm run dev`, bạn sẽ thấy:

1. **Global Metrics Cards** - 4 cards với gradient
2. **Price Charts** - BTC và ETH area charts
3. **Fear & Greed Gauge** - Meter với gradient màu
4. **Dominance Pie Chart** - Biểu đồ tròn 3 phần
5. **Fear & Greed History** - Area chart 30 ngày
6. **Crypto Table** - Bảng top 10 coins

Tất cả responsive và có loading states! 🎉

