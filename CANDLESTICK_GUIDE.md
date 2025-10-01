# 🕯️ Hướng dẫn Candlestick Chart - Biểu đồ nến

## Giới thiệu

**Candlestick Chart (Biểu đồ nến)** là loại biểu đồ phổ biến nhất trong phân tích kỹ thuật và trading cryptocurrency. Mỗi "nến" thể hiện thông tin về giá trong một khoảng thời gian nhất định.

## Cấu trúc một cây nến

```
        │  ← Đuôi trên (Upper Wick/Shadow)
        │     Hiển thị giá cao nhất (High)
    ┌───┐
    │   │  ← Thân nến (Body)
    │   │     Khoảng giữa Open và Close
    └───┘
        │  ← Đuôi dưới (Lower Wick/Shadow)
        │     Hiển thị giá thấp nhất (Low)
```

### Các thành phần:

1. **Open (Mở cửa)**: Giá khi bắt đầu khoảng thời gian
2. **High (Cao nhất)**: Giá cao nhất trong khoảng thời gian
3. **Low (Thấp nhất)**: Giá thấp nhất trong khoảng thời gian
4. **Close (Đóng cửa)**: Giá khi kết thúc khoảng thời gian

## Nến xanh vs Nến đỏ

### 🟢 Nến xanh (Bullish/Tăng giá)
```
Close > Open = Giá tăng

        │
    ┌───┐  ← Close (đóng cửa)
    │ ░ │  
    │ ░ │  ← Thân xanh
    └───┘  ← Open (mở cửa)
        │
```
- Thân nến màu **xanh lá** (#10b981)
- Close > Open
- Giá đã **tăng** trong khoảng thời gian
- Tâm lý thị trường: **Lạc quan**

### 🔴 Nến đỏ (Bearish/Giảm giá)
```
Close < Open = Giá giảm

        │
    ┌───┐  ← Open (mở cửa)
    │ █ │  
    │ █ │  ← Thân đỏ
    └───┘  ← Close (đóng cửa)
        │
```
- Thân nến màu **đỏ** (#ef4444)
- Close < Open
- Giá đã **giảm** trong khoảng thời gian
- Tâm lý thị trường: **Bi quan**

## Cách đọc nến

### 1. Thân nến dài
- **Nến xanh dài**: Áp lực mua mạnh, xu hướng tăng rõ ràng
- **Nến đỏ dài**: Áp lực bán mạnh, xu hướng giảm rõ ràng

### 2. Thân nến ngắn
- Cho thấy sự **do dự** của thị trường
- Giá mở và đóng cửa gần nhau
- Có thể là tín hiệu đảo chiều

### 3. Đuôi nến dài

#### Đuôi dưới dài:
```
        │
    ┌───┐
    └───┘
        │
        │  ← Đuôi dưới dài
        │
```
- Giá từng giảm xuống rất thấp
- Nhưng đã phục hồi trở lại
- **Tín hiệu tích cực**: Người mua đã bảo vệ mức giá

#### Đuôi trên dài:
```
        │
        │  ← Đuôi trên dài
        │
    ┌───┐
    └───┘
        │
```
- Giá từng tăng lên rất cao
- Nhưng đã bị đẩy xuống
- **Tín hiệu tiêu cực**: Người bán đã từ chối mức giá cao

## Các mẫu nến quan trọng

### 1. Doji ⊹
```
    ─┼─
```
- Open ≈ Close (thân nến rất ngắn)
- Đuôi trên và dưới dài
- **Ý nghĩa**: Thị trường **do dự**, có thể đảo chiều

### 2. Hammer (Búa) 🔨
```
    ┌┐
    └┘
     │
     │
```
- Thân nến nhỏ ở trên
- Đuôi dưới rất dài (2-3 lần thân)
- Không có đuôi trên (hoặc rất ngắn)
- **Ý nghĩa**: **Đảo chiều tăng** sau xu hướng giảm

### 3. Shooting Star (Sao băng) ⭐
```
     │
     │
    ┌┐
    └┘
```
- Thân nến nhỏ ở dưới
- Đuôi trên rất dài
- Không có đuôi dưới
- **Ý nghĩa**: **Đảo chiều giảm** sau xu hướng tăng

### 4. Engulfing Pattern (Mô hình nuốt)

#### Bullish Engulfing (Nuốt tăng):
```
 ▐█▌ ░░░
 ▐█▌ ░░░
     ░░░
```
- Nến đỏ nhỏ → Nến xanh lớn
- Nến xanh "nuốt" nến đỏ
- **Ý nghĩa**: **Đảo chiều tăng mạnh**

#### Bearish Engulfing (Nuốt giảm):
```
 ░░░ ▐█▌
 ░░░ ▐█▌
 ░░░
```
- Nến xanh nhỏ → Nến đỏ lớn
- Nến đỏ "nuốt" nến xanh
- **Ý nghĩa**: **Đảo chiều giảm mạnh**

## Sử dụng trong Component

### Basic Usage:
```tsx
import CandlestickChart from '@/components/CandlestickChart';

// Bitcoin 30 ngày
<CandlestickChart symbol="BTC" days={30} />
```

### Multiple Charts:
```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <CandlestickChart symbol="BTC" days={30} />
  <CandlestickChart symbol="ETH" days={30} />
</div>
```

### Timeframes khác nhau:
```tsx
// 7 ngày (short-term)
<CandlestickChart symbol="BTC" days={7} />

// 30 ngày (medium-term)
<CandlestickChart symbol="BTC" days={30} />

// 90 ngày (long-term)
<CandlestickChart symbol="BTC" days={90} />
```

## Features của Component

### 1. Tooltip chi tiết
Khi hover vào nến, hiển thị:
- 📅 Ngày
- 📊 Open, High, Low, Close
- 📈 Change ($ và %)
- 💰 Volume

### 2. Stats Bar
Hiển thị thống kê tổng quan:
- **Open**: Giá mở cửa period đầu tiên
- **High**: Giá cao nhất trong toàn bộ period
- **Low**: Giá thấp nhất trong toàn bộ period
- **Close**: Giá đóng cửa period cuối cùng

### 3. Legend
- 🟢 Số nến xanh (tăng giá)
- 🔴 Số nến đỏ (giảm giá)

### 4. Volume Bars
- Hiển thị volume giao dịch ở dưới
- Màu tương ứng với nến (xanh/đỏ)

## Tips phân tích

### 1. Xem trend tổng thể
- Nhiều nến xanh liên tiếp → **Uptrend** (xu hướng tăng)
- Nhiều nến đỏ liên tiếp → **Downtrend** (xu hướng giảm)

### 2. Tìm support/resistance
- **Support**: Mức giá mà đuôi dưới thường chạm
- **Resistance**: Mức giá mà đuôi trên thường chạm

### 3. Volume confirmation
- Nến xanh + Volume cao = **Tăng mạnh có xác nhận**
- Nến đỏ + Volume cao = **Giảm mạnh có xác nhận**
- Volume thấp = Chuyển động **không đáng tin**

### 4. Patterns combination
- Kết hợp nhiều nến để tìm pattern
- Xem xét context (trend hiện tại)
- Đợi confirmation (nến tiếp theo)

## Data Source

Component sử dụng API endpoint `/api/price-history` để lấy dữ liệu OHLCV:

```typescript
fetch('/api/price-history?symbol=BTC&count=30&interval=1d')
```

**Lưu ý:**
- CoinMarketCap historical data endpoint yêu cầu plan cao hơn Basic
- Nếu không có quyền, API tự động generate **mock data** để demo
- Mock data vẫn realistic và useful cho việc học UI/UX

## Customization

### Thay đổi màu nến:

Trong `CandlestickChart.tsx`, tìm dòng:
```tsx
const color = isGreen ? '#10b981' : '#ef4444';
```

Thay đổi thành:
```tsx
const color = isGreen ? '#00ff00' : '#ff0000'; // Màu khác
```

### Thay đổi độ rộng nến:

Tìm dòng:
```tsx
const bodyWidth = width * 0.7; // 70% của khoảng trống
```

Thay đổi `0.7` thành giá trị khác (0.5 - 0.9)

### Thêm indicators:

Có thể thêm các indicator như:
- **MA (Moving Average)**: Đường trung bình động
- **RSI**: Relative Strength Index
- **MACD**: Moving Average Convergence Divergence
- **Bollinger Bands**: Dải bollinger

## Performance

- **Caching**: Dữ liệu được cache 5 phút
- **Responsive**: Chart tự động resize theo màn hình
- **Optimized rendering**: Sử dụng `isAnimationActive={false}` cho performance tốt

## Tài liệu tham khảo

- 📚 [Investopedia - Candlestick Patterns](https://www.investopedia.com/trading/candlestick-charting-what-is-it/)
- 📖 [BabyPips - Japanese Candlesticks](https://www.babypips.com/learn/forex/japanese-candlesticks)
- 🎓 [TradingView - Candlestick Education](https://www.tradingview.com/education/candlesticks/)

---

**Happy Trading! 🚀📈**

