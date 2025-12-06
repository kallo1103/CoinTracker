# 🚀 Crypto Tracker - Cryptocurrency Dashboard

Real-time cryptocurrency price tracking platform built with **Next.js 15**, **NextAuth**, **Prisma**, and integrated with multiple free crypto APIs.

![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8?style=flat&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-6.16.3-2D3748?style=flat&logo=prisma)

## ✨ Key Features

### 📊 **Dashboard & Charts**
- ✅ **Top Cryptocurrencies** - List of top coins with real-time prices
- ✅ **Global Metrics** - Bitcoin Dominance, Ethereum Dominance, Total Market Cap, Volume 24h with percentage changes
- ✅ **Candlestick Charts** - Japanese candlestick charts (OHLC) with real data
- ✅ **Price Charts** - Area & Line charts for BTC, ETH and other coins
- ✅ **Dominance Pie Chart** - Market share distribution BTC vs ETH vs Altcoins
- ✅ **Fear & Greed Index** - Market sentiment index with gauge meter

### 🏦 **Exchange Listings**
- ✅ List of top cryptocurrency exchanges
- ✅ Volume 24h, Trust Score, Market Pairs
- ✅ Detailed information: Country, Year established
- ✅ Auto-refresh every 5 minutes

### 🔐 **Authentication**
- ✅ **Google OAuth** - Login with Google account
- ✅ **MetaMask Wallet** - Authentication with wallet signature
- ✅ **Protected Dashboard** - Personal page after login
- ✅ **Session Management** - JWT-based with Prisma adapter
- ✅ **User Profile Management** - Edit profile, settings, statistics

### 📰 **Crypto News**
- ✅ **Real-time Crypto News** - Integration with CryptoPanic API
- ✅ **News Caching** - 10-minute cache for better performance
- ✅ **News Categories** - Filtered crypto news

### 🔍 **Search & Discovery**
- ✅ **Crypto Search** - Search cryptocurrencies by name/symbol
- ✅ **Individual Coin Pages** - Detailed coin information
- ✅ **Exchange Search** - Find and compare exchanges

### 🎨 **UI/UX**
- ✅ Responsive design - Mobile, Tablet, Desktop
- ✅ Dark theme with gradient backgrounds
- ✅ Collapsible sidebar navigation
- ✅ Loading states & Error handling
- ✅ Beautiful charts with Recharts
- ✅ **Multi-language Support** - English and Vietnamese
- ✅ **Theme Toggle** - Dark/Light theme switching
- ✅ **Language Selector** - Dynamic language switching

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15.5.4 (App Router)
- **React:** 19.1.0
- **TypeScript:** 5.x
- **Styling:** Tailwind CSS 4.x
- **Charts:** Recharts 3.2.1
- **Icons:** Lucide React 0.546.0

### Backend
- **API Routes:** Next.js API Routes
- **Authentication:** NextAuth 4.24.11 + Prisma Adapter 2.10.0
- **Database:** Prisma 6.16.3 + SQLite (dev) / PostgreSQL (prod)
- **Wallet:** Ethers.js 6.15.0

### APIs
- **CoinMarketCap** - Top coins, Global metrics
- **CoinGecko** - OHLC historical data, Exchange listings, Individual coin details (FREE)
- **Alternative.me** - Fear & Greed Index (FREE)
- **CryptoPanic** - Crypto news (FREE)

## 📦 Installation

### Prerequisites
- Node.js 20+ or higher
- npm, yarn, or pnpm
- Git

### Clone Repository
```bash
git clone <repository-url>
cd CoinTracker
```

### Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### Environment Variables
1. Copy `env.example` file to `.env.local`:
```bash
cp env.example .env.local
```

2. Fill in the API keys in `.env.local`:

```env
# NextAuth Secret (generate with: openssl rand -base64 32)
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (get from Google Console)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# CoinMarketCap API (free registration)
COINMARKETCAP_API_KEY=your-coinmarketcap-api-key

# CryptoPanic API (optional - for news)
CRYPTOPANIC_API_KEY=your-cryptopanic-api-key

# Database
DATABASE_URL="file:./dev.db"
```

### Setup Database
```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Open Prisma Studio to view database
npx prisma studio
```

### Run Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 Current Application Features

### 📱 **Pages & Navigation**
- **Home Dashboard** - Main dashboard with charts and metrics
- **Search Page** - Search cryptocurrencies and exchanges
- **Exchange List** - Browse cryptocurrency exchanges
- **Crypto News** - Latest cryptocurrency news
- **Individual Coin Pages** - Detailed coin information
- **User Profile** - Profile editing, settings, and statistics
- **Documentation** - API and usage documentation

### 🔧 **Advanced Features**
- **Real-time Data** - Live cryptocurrency prices and metrics
- **Interactive Charts** - Candlestick, area, and line charts
- **Responsive Design** - Works on all device sizes
- **Dark/Light Theme** - User preference theme switching
- **Multi-language** - English and Vietnamese support
- **News Caching** - Optimized news loading with caching
- **Search Functionality** - Advanced crypto and exchange search
- **Global Metrics Dashboard** - Bitcoin/Ethereum dominance, market cap with 24h changes, trading volume

## 🔑 Getting API Keys

### 1. CoinMarketCap API Key
1. Register at: https://pro.coinmarketcap.com/signup
2. Choose **Basic plan** (free - 333 calls/day)
3. Copy API key to `.env.local`

**API Endpoints:**
- `/api/crypto` - Top cryptocurrencies
- `/api/global-metrics` - Bitcoin dominance, Ethereum dominance, total market cap, volume 24h, active cryptocurrencies
- `/api/coin/[id]` - Individual coin details
- `/api/coins/markets` - Coin market data
- `/api/exchange/list` - Exchange listings
- `/api/fear-greed` - Fear & Greed Index
- `/api/price-history` - Historical price data
- `/api/crypto-news` - Crypto news
- `/api/search` - Search functionality

### 2. Google OAuth Credentials
1. Visit: https://console.cloud.google.com/
2. Create new project or select existing project
3. Enable **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Add Authorized redirect URIs:
   ```
   http://localhost:3000/api/auth/callback/google
   https://yourdomain.com/api/auth/callback/google
   ```
6. Copy Client ID and Client Secret to `.env.local`

Details: See `NEXTAUTH_SETUP.md` and `METAMASK_SETUP.md` files

### 3. NextAuth Secret
Generate random secret:
```bash
openssl rand -base64 32
```
Copy the result to `NEXTAUTH_SECRET` in `.env.local`

## 📚 Documentation

- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Details of all API endpoints
- **[CHARTS_GUIDE.md](./CHARTS_GUIDE.md)** - Charts usage guide
- **[CANDLESTICK_GUIDE.md](./CANDLESTICK_GUIDE.md)** - Candlestick charts guide
- **[NEXTAUTH_SETUP.md](./NEXTAUTH_SETUP.md)** - Setup NextAuth with Google OAuth
- **[METAMASK_SETUP.md](./METAMASK_SETUP.md)** - Setup MetaMask authentication
- **[COINMARKETCAP_SETUP.md](./COINMARKETCAP_SETUP.md)** - Setup CoinMarketCap API

## 🎯 Roadmap

### ✅ Completed
- [x] Basic UI/UX with responsive design
- [x] CoinMarketCap API integration
- [x] CoinGecko API integration (historical data)
- [x] Candlestick charts with real OHLC data
- [x] Fear & Greed Index
- [x] Global metrics & Bitcoin dominance with Ethereum dominance, market cap, volume 24h
- [x] Exchange listings
- [x] NextAuth with Google OAuth
- [x] MetaMask wallet authentication
- [x] Protected dashboard page
- [x] Real crypto news API integration (CryptoPanic)
- [x] User profile management (edit, settings, statistics)
- [x] Crypto search functionality
- [x] Individual coin detail pages
- [x] Multi-language support (EN, VI)
- [x] Theme toggle functionality
- [x] Language selector
- [x] Collapsible navigation
- [x] News caching system

### 🚧 In Progress / TODO
- [ ] User portfolio tracking
- [ ] Price alerts & notifications
- [ ] More chart types (Bar, Scatter, etc.)
- [ ] Performance optimization
- [ ] Unit tests & E2E tests
- [ ] PWA support
- [ ] Docker deployment
- [ ] Advanced filtering for exchanges
- [ ] User preferences persistence
- [ ] Social features (sharing, comments)

## 📁 Project Structure

```
CoinTracker/
├── prisma/
│   ├── schema.prisma          # Prisma schema (User, Session, Account)
│   └── dev.db                 # SQLite database (dev only)
├── public/
│   └── favicon.svg            # Favicon
├── src/
│   ├── app/
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # NextAuth routes
│   │   │   ├── coin/          # Individual coin details
│   │   │   ├── coins/         # Coin listings
│   │   │   ├── content/       # Content API
│   │   │   ├── crypto/        # Crypto data
│   │   │   ├── crypto-news/   # Crypto news
│   │   │   ├── exchange/       # Exchange listings
│   │   │   ├── fear-greed/    # Fear & Greed Index
│   │   │   ├── global-metrics/# Global market metrics
│   │   │   ├── price-history/ # OHLC historical data
│   │   │   └── search/         # Search functionality
│   │   ├── coin/              # Individual coin pages
│   │   ├── dashboard/         # Protected dashboard page
│   │   ├── docs/              # Documentation page
│   │   ├── exchange/          # Exchange list page
│   │   ├── crypto-news/       # Crypto news page
│   │   ├── profile/           # User profile pages
│   │   │   ├── edit/          # Profile editing
│   │   │   ├── settings/      # User settings
│   │   │   └── statistics/     # User statistics
│   │   ├── search/            # Search page
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── AuthButton.tsx
│   │   ├── CandlestickChart.tsx
│   │   ├── CryptoList.tsx
│   │   ├── CryptoNewsList.tsx
│   │   ├── CryptoSearch.tsx
│   │   ├── DominancePieChart.tsx
│   │   ├── ExchangeList.tsx
│   │   ├── FearGreedChart.tsx
│   │   ├── FearGreedIndex.tsx
│   │   ├── Footer.tsx
│   │   ├── GlobalMetrics.tsx  # Global crypto metrics with Bitcoin/Ethereum dominance, market cap, volume
│   │   ├── Header.tsx
│   │   ├── LanguageSelector.tsx
│   │   ├── MainContent.tsx
│   │   ├── MetaMaskButton.tsx
│   │   ├── PopularCoins.tsx
│   │   ├── PriceChart.tsx
│   │   └── Providers.tsx
│   ├── contexts/              # React contexts
│   │   ├── LanguageContext.tsx
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
1. Push code to GitHub
2. Import project to Vercel: https://vercel.com/new
3. Add Environment Variables in Vercel dashboard
4. Deploy!

### Database for Production
Switch from SQLite to PostgreSQL or MySQL:

1. Update `DATABASE_URL` in Vercel Environment Variables:
```env
DATABASE_URL="postgresql://user:password@host:5432/dbname"
```

2. Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"  // or "mysql"
  url      = env("DATABASE_URL")
}
```

3. Run migrations:
```bash
npx prisma migrate deploy
```

## 🐛 Troubleshooting

### Error: "Historical API not available, generating mock data"
✅ **FIXED** - Now using free CoinGecko API for historical data.

### Error: "Cannot find module '@prisma/client'"
```bash
npx prisma generate
```

### Error: "NEXTAUTH_SECRET is missing"
Generate new secret key:
```bash
openssl rand -base64 32
```
Add to `.env.local`

### Charts not displaying
1. Check console log for API errors
2. Verify API keys in `.env.local`
3. Check network tab in DevTools

### MetaMask authentication not working
1. Ensure MetaMask is installed and unlocked
2. Check that you're on a supported network
3. Verify the signature message is correct

### News not loading
1. Check if CryptoPanic API is accessible
2. Verify network connection
3. Check browser console for errors

### Language/Theme not persisting
1. Check browser localStorage
2. Clear browser cache and try again
3. Verify context providers are properly configured

## 📄 License

MIT License - See LICENSE file for more details.

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
