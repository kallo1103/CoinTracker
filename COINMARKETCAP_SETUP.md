# Hướng dẫn thiết lập CoinMarketCap API

## Bước 1: Thêm API Key

Mở file `.env.local` và thay thế `YOUR_API_KEY_HERE` bằng API key thật của bạn từ CoinMarketCap:

```env
COINMARKETCAP_API_KEY=your-actual-api-key-here
```

## Bước 2: Chạy ứng dụng

```bash
npm run dev
```

## Bước 3: Xem kết quả

Mở trình duyệt và truy cập: `http://localhost:3000`

## Cấu trúc đã tạo:

### 1. **API Route** (`src/app/api/crypto/route.ts`)
- Xử lý việc gọi API đến CoinMarketCap
- Giữ API key an toàn (không lộ ra client)
- Cache dữ liệu trong 60 giây để tiết kiệm API calls

### 2. **Component** (`src/components/CryptoList.tsx`)
- Hiển thị danh sách cryptocurrency
- Auto-refresh dữ liệu
- Hiển thị: Tên, Giá, % thay đổi 24h/7d, Market Cap

### 3. **Trang chủ** (`src/app/page.tsx`)
- Tích hợp component CryptoList
- Hiển thị top 10 cryptocurrencies

## Tính năng:

✅ Hiển thị real-time giá cryptocurrency
✅ % thay đổi 24h và 7d với màu sắc (xanh/đỏ)
✅ Market cap được format dễ đọc (B/M/T)
✅ Loading state và error handling
✅ Responsive design
✅ API key được bảo mật

## Mở rộng:

### Thay đổi số lượng coins hiển thị:
```tsx
<CryptoList limit={20} />
```

### Tùy chỉnh API endpoint:
Chỉnh sửa file `src/app/api/crypto/route.ts` để thay đổi endpoint hoặc parameters.

## Lưu ý:

- ⚠️ **KHÔNG commit** file `.env.local` lên Git
- 📊 Free tier CoinMarketCap có giới hạn 333 calls/day
- 🔄 Dữ liệu được cache 60 giây để tiết kiệm API calls

