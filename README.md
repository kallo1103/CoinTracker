# 🚀 Crypto Tracker - Cryptocurrency Dashboard

Nền tảng theo dõi giá cryptocurrency thời gian thực được xây dựng với **Next.js 15**, **NextAuth**, **Prisma**, và tích hợp nhiều API crypto miễn phí.

![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8?style=flat&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-6.16.3-2D3748?style=flat&logo=prisma)

## ✨ Tính năng chính

### 📊 **Dashboard & Charts**
- ✅ **Top Cryptocurrencies** - Danh sách top coins với giá real-time
- ✅ **Global Metrics** - Bitcoin Dominance, Total Market Cap, Volume 24h
- ✅ **Candlestick Charts** - Biểu đồ nến Nhật (OHLC) với dữ liệu thực
- ✅ **Price Charts** - Area & Line charts cho BTC, ETH và các coins khác
- ✅ **Dominance Pie Chart** - Phân bổ thị phần BTC vs ETH vs Altcoins
- ✅ **Fear & Greed Index** - Chỉ số tâm lý thị trường với gauge meter

### 🏦 **Exchange Listings**
- ✅ Danh sách các sàn giao dịch hàng đầu
- ✅ Volume 24h, Trust Score, Market Pairs
- ✅ Thông tin chi tiết: Quốc gia, Năm thành lập
- ✅ Auto-refresh mỗi 5 phút

### 🔐 **Authentication**
- ✅ **Google OAuth** - Đăng nhập bằng Google account
- ✅ **MetaMask Wallet** - Xác thực bằng wallet signature
- ✅ **Protected Dashboard** - Trang cá nhân sau khi đăng nhập
- ✅ **Session Management** - JWT-based với Prisma adapter

### 📰 **Crypto News**
- ✅ Tin tức cryptocurrency (mẫu)
- ⚠️ TODO: Tích hợp API tin tức thực

### 🎨 **UI/UX**
- ✅ Responsive design - Mobile, Tablet, Desktop
- ✅ Dark theme với gradient backgrounds
- ✅ Collapsible sidebar navigation
- ✅ Loading states & Error handling
- ✅ Beautiful charts với Recharts

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15.5.4 (App Router)
- **React:** 19.1.0
- **TypeScript:** 5.x
- **Styling:** Tailwind CSS 4.x
- **Charts:** Recharts 3.2.1

### Backend
- **API Routes:** Next.js API Routes
- **Authentication:** NextAuth 4.24.11
- **Database:** Prisma 6.16.3 + SQLite (dev) / PostgreSQL (prod)
- **Wallet:** Ethers.js 6.15.0

### APIs
- **CoinMarketCap** - Top coins, Global metrics
- **CoinGecko** - OHLC historical data, Exchange listings (FREE)
- **Alternative.me** - Fear & Greed Index (FREE)

## 📦 Installation

### Prerequisites
- Node.js 20+ hoặc cao hơn
- npm, yarn, hoặc pnpm
- Git

### Clone Repository
```bash
git clone <repository-url>
cd my-next-app
```

### Install Dependencies
```bash
npm install
# hoặc
yarn install
# hoặc
pnpm install
```

### Environment Variables
1. Copy file `env.example` thành `.env.local`:
```bash
cp env.example .env.local
```

2. Điền các API keys vào `.env.local`:

```env
# NextAuth Secret (tạo bằng: openssl rand -base64 32)
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (lấy từ Google Console)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# CoinMarketCap API (đăng ký miễn phí)
COINMARKETCAP_API_KEY=your-coinmarketcap-api-key

# Database
DATABASE_URL="file:./dev.db"
```

### Setup Database
```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Open Prisma Studio để xem database
npx prisma studio
```

### Run Development Server
```bash
npm run dev
# hoặc
yarn dev
# hoặc
pnpm dev
```

Mở [http://localhost:3000](http://localhost:3000) trong browser.

## 🔑 Lấy API Keys

### 1. CoinMarketCap API Key
1. Đăng ký tại: https://pro.coinmarketcap.com/signup
2. Chọn **Basic plan** (miễn phí - 333 calls/day)
3. Copy API key vào `.env.local`

**Endpoints sử dụng:**
- `/api/crypto` - Top cryptocurrencies
- `/api/global-metrics` - Bitcoin dominance, market cap

### 2. Google OAuth Credentials
1. Truy cập: https://console.cloud.google.com/
2. Tạo project mới hoặc chọn project hiện có
3. Enable **Google+ API**
4. Vào **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Thêm Authorized redirect URIs:
   ```
   http://localhost:3000/api/auth/callback/google
   https://yourdomain.com/api/auth/callback/google
   ```
6. Copy Client ID và Client Secret vào `.env.local`

Chi tiết: Xem file `NEXTAUTH_SETUP.md` và `METAMASK_SETUP.md`

### 3. NextAuth Secret
Generate random secret:
```bash
openssl rand -base64 32
```
Copy kết quả vào `NEXTAUTH_SECRET` trong `.env.local`

## 📚 Documentation

- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Chi tiết tất cả API endpoints
- **[CHARTS_GUIDE.md](./CHARTS_GUIDE.md)** - Hướng dẫn sử dụng charts
- **[CANDLESTICK_GUIDE.md](./CANDLESTICK_GUIDE.md)** - Hướng dẫn biểu đồ nến
- **[NEXTAUTH_SETUP.md](./NEXTAUTH_SETUP.md)** - Setup NextAuth với Google OAuth
- **[METAMASK_SETUP.md](./METAMASK_SETUP.md)** - Setup MetaMask authentication
- **[COINMARKETCAP_SETUP.md](./COINMARKETCAP_SETUP.md)** - Setup CoinMarketCap API

## 🎯 Roadmap

### ✅ Completed
- [x] Basic UI/UX với responsive design
- [x] CoinMarketCap API integration
- [x] CoinGecko API integration (historical data)
- [x] Candlestick charts với OHLC data thực
- [x] Fear & Greed Index
- [x] Global metrics & Bitcoin dominance
- [x] Exchange listings
- [x] NextAuth với Google OAuth
- [x] MetaMask wallet authentication
- [x] Protected dashboard page

### 🚧 In Progress / TODO
- [ ] Real crypto news API integration
- [ ] User portfolio tracking
- [ ] Price alerts & notifications
- [ ] More chart types (Bar, Scatter, etc.)
- [ ] Dark/Light theme toggle
- [ ] Multi-language support (EN, VI)
- [ ] Performance optimization
- [ ] Unit tests & E2E tests
- [ ] PWA support
- [ ] Docker deployment

## 📁 Project Structure

```
my-next-app/
├── prisma/
│   ├── schema.prisma          # Prisma schema (User, Session, Account)
│   └── dev.db                 # SQLite database (dev only)
├── public/
│   └── favicon.svg            # Favicon
├── src/
│   ├── app/
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # NextAuth routes
│   │   │   ├── crypto/        # Crypto listings
│   │   │   ├── exchange/      # Exchange listings
│   │   │   ├── fear-greed/    # Fear & Greed Index
│   │   │   ├── global-metrics/# Global market metrics
│   │   │   └── price-history/ # OHLC historical data
│   │   ├── dashboard/         # Protected dashboard page
│   │   ├── exchange/          # Exchange list page
│   │   ├── crypto-news/       # Crypto news page
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── CandlestickChart.tsx
│   │   ├── PriceChart.tsx
│   │   ├── FearGreedIndex.tsx
│   │   ├── GlobalMetrics.tsx
│   │   ├── CryptoList.tsx
│   │   ├── ExchangeList.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   ├── contexts/              # React contexts
│   │   └── NavbarContext.tsx
│   └── lib/                   # Utilities
│       ├── auth.ts            # NextAuth config
│       ├── prisma.ts          # Prisma client
│       └── getCryptoNews.ts   # News fetcher
├── .gitignore
├── env.example                # Environment variables template
├── next.config.ts             # Next.js config
├── tailwind.config.ts         # Tailwind config
├── tsconfig.json              # TypeScript config
└── README.md
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push code lên GitHub
2. Import project vào Vercel: https://vercel.com/new
3. Thêm Environment Variables trong Vercel dashboard
4. Deploy!

### Database cho Production
Đổi từ SQLite sang PostgreSQL hoặc MySQL:

1. Update `DATABASE_URL` trong Vercel Environment Variables:
```env
DATABASE_URL="postgresql://user:password@host:5432/dbname"
```

2. Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"  // hoặc "mysql"
  url      = env("DATABASE_URL")
}
```

3. Run migrations:
```bash
npx prisma migrate deploy
```

## 🐛 Troubleshooting

### Lỗi: "Historical API not available, generating mock data"
✅ **ĐÃ SỬA** - Giờ sử dụng CoinGecko API miễn phí cho historical data.

### Lỗi: "Cannot find module '@prisma/client'"
```bash
npx prisma generate
```

### Lỗi: "NEXTAUTH_SECRET is missing"
Tạo secret key mới:
```bash
openssl rand -base64 32
```
Thêm vào `.env.local`

### Charts không hiển thị
1. Kiểm tra console log để xem lỗi API
2. Verify API keys trong `.env.local`
3. Check network tab trong DevTools

## 📄 License

MIT License - Xem file LICENSE để biết thêm chi tiết.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

- **Email:** info@cryptotracker.com
- **GitHub:** [Your GitHub Profile]
- **Website:** [Your Website]

---

**Made with ❤️ using Next.js 15 and TypeScript**
