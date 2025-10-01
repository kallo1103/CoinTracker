# 📖 API Documentation

## Các API Endpoints đã tạo

### 1. `/api/crypto` - Top Cryptocurrencies
Lấy danh sách top cryptocurrencies từ CoinMarketCap.

**Method:** GET

**Parameters:**
- `limit` (optional): Số lượng coins muốn lấy (default: 10)

**Example:**
```
GET /api/crypto?limit=20
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Bitcoin",
      "symbol": "BTC",
      "quote": {
        "USD": {
          "price": 65000.50,
          "percent_change_24h": 2.5,
          "percent_change_7d": 5.3,
          "market_cap": 1200000000000,
          "volume_24h": 35000000000
        }
      }
    }
  ],
  "timestamp": "2025-10-01T12:00:00.000Z"
}
```

---

### 2. `/api/global-metrics` - Global Market Metrics
Lấy dữ liệu thống kê toàn cầu về thị trường crypto, bao gồm Bitcoin Dominance.

**Method:** GET

**Parameters:** Không có

**Example:**
```
GET /api/global-metrics
```

**Response:**
```json
{
  "success": true,
  "data": {
    "btc_dominance": 52.34,
    "eth_dominance": 17.89,
    "total_market_cap": 2500000000000,
    "total_volume_24h": 95000000000,
    "active_cryptocurrencies": 10450,
    "total_market_cap_yesterday_percentage_change": 1.25,
    "last_updated": "2025-10-01T12:00:00.000Z"
  },
  "timestamp": "2025-10-01T12:00:00.000Z"
}
```

**Data Fields:**
- `btc_dominance`: Bitcoin chiếm bao nhiêu % tổng market cap (%)
- `eth_dominance`: Ethereum chiếm bao nhiêu % tổng market cap (%)
- `total_market_cap`: Tổng market cap của toàn bộ thị trường crypto (USD)
- `total_volume_24h`: Tổng volume giao dịch 24h (USD)
- `active_cryptocurrencies`: Số lượng cryptocurrencies đang hoạt động
- `total_market_cap_yesterday_percentage_change`: % thay đổi market cap so với hôm qua (%)

---

### 3. `/api/fear-greed` - Crypto Fear & Greed Index
Lấy chỉ số Fear & Greed của thị trường crypto (từ alternative.me API).

**Method:** GET

**Parameters:**
- `limit` (optional): Số ngày muốn lấy dữ liệu (default: 1)

**Example:**
```
GET /api/fear-greed?limit=7
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "value": 72,
      "value_classification": "Greed",
      "classification": {
        "text": "Greed",
        "color": "lightgreen"
      },
      "timestamp": "1696176000",
      "time_until_update": "43200"
    }
  ],
  "timestamp": "2025-10-01T12:00:00.000Z"
}
```

**Value Ranges:**
- 0-25: Extreme Fear (Sợ hãi cực độ)
- 26-45: Fear (Sợ hãi)
- 46-55: Neutral (Trung lập)
- 56-75: Greed (Tham lam)
- 76-100: Extreme Greed (Tham lam cực độ)

**Ý nghĩa:**
- **Fear (Sợ hãi)**: Thị trường đang quá lo lắng, có thể là cơ hội mua
- **Greed (Tham lam)**: Thị trường đang quá lạc quan, có thể sắp điều chỉnh

---

## Components

### 1. `<CryptoList />`
Hiển thị danh sách top cryptocurrencies dạng bảng.

**Props:**
- `limit` (optional, default: 10): Số lượng coins hiển thị

**Usage:**
```tsx
<CryptoList limit={20} />
```

---

### 2. `<GlobalMetrics />`
Hiển thị các metrics toàn cầu về thị trường crypto, bao gồm:
- Bitcoin Dominance
- Ethereum Dominance
- Total Market Cap
- Total Volume 24h
- Biểu đồ Dominance

**Usage:**
```tsx
<GlobalMetrics />
```

---

### 3. `<FearGreedIndex />`
Hiển thị chỉ số Fear & Greed với gauge meter trực quan.

**Usage:**
```tsx
<FearGreedIndex />
```

---

## Tính năng

### ✅ Bitcoin Dominance
- Hiển thị % Bitcoin chiếm trong tổng market cap
- Cập nhật mỗi 2 phút
- Biểu đồ trực quan so sánh BTC, ETH và Altcoins

### ✅ Fear & Greed Index
- Chỉ số tâm lý thị trường (0-100)
- Gauge meter với màu sắc trực quan
- Giải thích ý nghĩa từng mức độ
- Cập nhật mỗi 1 giờ

### ✅ Global Market Metrics
- Total Market Cap
- Total Volume 24h
- Số lượng cryptocurrencies active
- % thay đổi 24h

### ✅ Caching & Performance
- API routes có cache để giảm số lượng requests
- Auto-refresh ở components
- Loading states đẹp mắt

---

## API Keys Required

### CoinMarketCap API
**Cần thiết cho:**
- `/api/crypto`
- `/api/global-metrics`

**Setup:** Thêm vào `.env.local`
```env
COINMARKETCAP_API_KEY=your-api-key-here
```

### Alternative.me API
**Cần thiết cho:**
- `/api/fear-greed`

**Setup:** Không cần API key (miễn phí)

---

## Rate Limits

### CoinMarketCap (Free Plan)
- **333 calls/day**
- Cache: 60 giây (crypto list), 120 giây (global metrics)

### Alternative.me
- **Không giới hạn** (public API)
- Cache: 3600 giây (1 giờ)

---

## Troubleshooting

### Lỗi: "Không thể lấy dữ liệu"
1. Kiểm tra file `.env.local` có đúng tên và có API key
2. Restart server: `Ctrl+C` rồi `npm run dev`
3. Kiểm tra console log để xem lỗi chi tiết

### Bitcoin Dominance không hiển thị
- Kiểm tra CoinMarketCap API key có hợp lệ
- Xem network tab trong DevTools để kiểm tra response

### Fear & Greed Index lỗi
- API alternative.me có thể bị chặn bởi firewall/proxy
- Thử dùng VPN nếu cần

