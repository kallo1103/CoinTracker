# 🚀 Crypto Tracker - Cryptocurrency Dashboard

Real-time cryptocurrency price tracking platform built with **Next.js 15**, **NextAuth**, **Prisma**, and integrated with multiple free crypto APIs.

![Next.js](https://img.shields.io/badge/Next.js-15.5.7-black?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8?style=flat&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-6.18.0-2D3748?style=flat&logo=prisma)

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
- ✅ **Firebase Auth** - Firebase authentication integration
- ✅ **Protected Dashboard** - Personal page after login
- ✅ **Session Management** - JWT-based with Prisma adapter
- ✅ **User Profile Management** - Edit profile, settings, statistics

### 💼 **Portfolio Management**
- ✅ **Asset Tracking** - Track your cryptocurrency holdings
- ✅ **Transaction History** - Record buy/sell transactions
- ✅ **Portfolio Value** - Real-time portfolio valuation
- ✅ **Performance Charts** - Historical portfolio performance
- ✅ **Profit/Loss Tracking** - Track gains and losses
- ✅ **Asset Tags** - Organize assets with custom tags

### 📝 **Notes & Organization**
- ✅ **Personal Notes** - Create notes for research and ideas
- ✅ **Coin-Linked Notes** - Attach notes to specific cryptocurrencies
- ✅ **Pin Important Notes** - Pin frequently accessed notes
- ✅ **Rich Text Content** - Formatted note content
- ✅ **Search & Filter** - Quick note discovery

### ⭐ **Watchlist & Alerts**
- ✅ **Custom Watchlist** - Track favorite cryptocurrencies
- ✅ **Price Alerts** - Set price targets (above/below)
- ✅ **Alert Notifications** - Get notified when targets are hit
- ✅ **Quick Add/Remove** - Easy watchlist management
- ✅ **Watchlist Dashboard** - Dedicated watchlist view

### 👥 **Community Features**
- ✅ **Social Feed** - Community posts and discussions
- ✅ **Create Posts** - Share insights and analysis
- ✅ **Comments** - Engage with community posts
- ✅ **Like System** - React to posts and comments
- ✅ **User Avatars** - Personalized profile pictures
- ✅ **Community Page** - Dedicated social interaction space

### 🤖 **AI Assistant**
- ✅ **Gemini AI Integration** - Google's Gemini AI chatbot
- ✅ **Crypto Insights** - AI-powered market analysis
- ✅ **24/7 Support** - Instant answers to crypto questions
- ✅ **Contextual Help** - Smart, context-aware responses

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
- ✅ Modern header navigation
- ✅ Footer with social links
- ✅ Loading states & Error handling
- ✅ Beautiful charts with Recharts
- ✅ **English Language** - Clean English interface
- ✅ **Theme Toggle** - Dark/Light theme switching
- ✅ Toast notifications for user feedback

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15.5.7 (App Router)
- **React:** 19.1.0
- **TypeScript:** 5.x
- **Styling:** Tailwind CSS 4.x
- **Animations:** Motion (Framer Motion)
- **Charts:** Recharts 3.2.1
- **Icons:** Lucide React 0.546.0
- **State Management:** React Query (TanStack Query) 5.90.12
- **Forms:** React Hook Form 7.68.0 + Zod 4.2.1
- **Notifications:** React Hot Toast 2.6.0
- **Testing:** Vitest 4.0.15

### Backend
- **API Routes:** Next.js API Routes
- **Authentication:** NextAuth 4.24.11 + Prisma Adapter 2.10.0 / Firebase Auth 12.6.0
- **Database:** Prisma 6.18.0 + PostgreSQL
- **Wallet:** Ethers.js 6.15.0
- **AI:** Google Gemini AI 0.24.1

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

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Google Gemini AI
GEMINI_API_KEY=your-gemini-api-key

# Database (PostgreSQL)
DATABASE_URL="postgresql://user:password@host:5432/dbname"
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

### Run Tests
```bash
npm test
# or
yarn test
# or
pnpm test
```

## 🎯 Current Application Features

### 📱 **Pages & Navigation**
- **Home Dashboard** - Main dashboard with charts and metrics
- **Search Page** - Search cryptocurrencies and exchanges
- **Exchange List** - Browse cryptocurrency exchanges
- **Crypto News** - Latest cryptocurrency news
- **Individual Coin Pages** - Detailed coin information with charts
- **Portfolio** - Track and manage your crypto holdings
- **Watchlist** - Monitor favorite cryptocurrencies
- **Price Alerts** - Set and manage price notifications
- **Notes** - Personal note-taking for crypto research
- **Community Feed** - Social interaction and discussions
- **User Profile** - Profile editing, settings, and statistics
- **Documentation** - API and usage documentation

### 🔧 **Advanced Features**
- **Real-time Data** - Live cryptocurrency prices and metrics
- **Interactive Charts** - Candlestick, area, line, and pie charts
- **Portfolio Analytics** - Performance tracking with historical charts
- **Transaction Management** - Record and track buy/sell transactions
- **Asset Tagging** - Organize portfolio with custom tags
- **Social Engagement** - Posts, comments, and likes
- **AI Chat Assistant** - Gemini-powered crypto insights
- **Responsive Design** - Works on all device sizes (mobile, tablet, desktop)
- **Dark/Light Theme** - User preference theme switching
- **English Interface** - Clean, professional English localization
- **News Caching** - Optimized news loading with caching
- **Search Functionality** - Advanced crypto and exchange search
- **Global Metrics Dashboard** - Bitcoin/Ethereum dominance, market cap with 24h changes, trading volume
- **User Authentication** - Multiple auth methods (Google, Firebase, MetaMask)
- **Data Persistence** - PostgreSQL database with Prisma ORM

## 🔑 Getting API Keys

### 1. CoinMarketCap API Key
1. Register at: https://pro.coinmarketcap.com/signup
2. Choose **Basic plan** (free - 333 calls/day)
3. Copy API key to `.env.local`

**API Endpoints:**
- `/api/crypto` - Top cryptocurrencies
- `/api/global-metrics` - Bitcoin dominance, Ethereum dominance, total market cap, volume 24h
- `/api/coin/[id]` - Individual coin details
- `/api/coins/markets` - Coin market data
- `/api/exchange/list` - Exchange listings
- `/api/fear-greed` - Fear & Greed Index
- `/api/price-history` - Historical price data (OHLC)
- `/api/crypto-news` - Crypto news feed
- `/api/search` - Search functionality
- `/api/portfolio` - Portfolio management (GET, POST, PUT, DELETE)
- `/api/watchlist` - Watchlist management
- `/api/notes` - Personal notes CRUD operations
- `/api/alerts` - Price alerts management
- `/api/community/posts` - Social posts (create, read, update, delete)
- `/api/community/comments` - Comment system
- `/api/community/likes` - Like/unlike posts
- `/api/chatbot` - AI chatbot powered by Gemini
- `/api/user/profile` - User profile management
- `/api/user/settings` - User settings and preferences

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

### 3. Firebase Configuration
1. Visit: https://console.firebase.google.com/
2. Create a new project or select existing
3. Go to **Project Settings** → **General**
4. Under **Your apps**, click **Web app** (</>) icon
5. Register your app and copy the config values to `.env.local`
6. Enable **Authentication** → **Sign-in method** → Enable desired providers

### 4. Google Gemini AI API Key
1. Visit: https://makersuite.google.com/app/apikey
2. Create an API key
3. Copy the key to `GEMINI_API_KEY` in `.env.local`
4. Note: Gemini has a generous free tier for development

### 5. NextAuth Secret
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
- [x] Firebase authentication integration
- [x] Protected dashboard page
- [x] Real crypto news API integration (CryptoPanic)
- [x] User profile management (edit, settings, statistics)
- [x] Crypto search functionality
- [x] Individual coin detail pages
- [x] English language interface
- [x] Theme toggle functionality (Dark/Light)
- [x] Modern header and footer navigation
- [x] News caching system
- [x] **Portfolio tracking and management**
- [x] **Transaction history with buy/sell records**
- [x] **Portfolio performance charts**
- [x] **Watchlist functionality**
- [x] **Price alerts system**
- [x] **Personal notes with coin linking**
- [x] **Community features (posts, comments, likes)**
- [x] **AI chatbot integration (Google Gemini)**
- [x] **Asset tagging and organization**
- [x] **User avatars and profiles**
- [x] **Toast notifications**
- [x] **React Query for data management**
- [x] **Form validation with Zod**
- [x] **PostgreSQL database**

### 🚧 In Progress / TODO
- [ ] **Real-time price alert notifications**
- [ ] **Email notifications for alerts**
- [ ] **Push notifications (PWA)**
- [ ] **Advanced portfolio analytics**
- [ ] **Export portfolio data (CSV, PDF)**
- [ ] More chart types (Bar, Scatter, Heatmaps)
- [ ] Performance optimization & caching strategies
- [ ] Comprehensive unit tests & E2E tests
- [ ] PWA support with offline mode
- [ ] Docker deployment configuration
- [ ] Advanced filtering for exchanges
- [ ] User preferences persistence
- [ ] **Follow/Unfollow users**
- [ ] **Direct messaging between users**
- [ ] **Portfolio sharing with privacy controls**
- [ ] **News sentiment analysis**
- [ ] **Automated trading signals**
- [ ] **Multi-currency portfolio support**

## 📁 Project Structure

```
CoinTracker/
├── prisma/
│   └── schema/                # Modular Prisma schemas
│       ├── base.prisma        # Database configuration
│       ├── user.prisma        # User, Account, Session models
│       ├── portfolio.prisma   # Portfolio & Asset models
│       ├── features.prisma    # Watchlist, Alerts, Notes, Tags
│       └── social.prisma      # Posts, Comments, Likes
├── public/
│   └── favicon.svg            # Favicon
├── src/
│   ├── app/
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # NextAuth routes
│   │   │   ├── chatbot/       # AI chatbot endpoint
│   │   │   ├── coin/          # Individual coin details
│   │   │   ├── coins/         # Coin listings
│   │   │   ├── content/       # Content API
│   │   │   ├── crypto/        # Crypto data
│   │   │   ├── crypto-news/   # Crypto news
│   │   │   ├── exchange/      # Exchange listings
│   │   │   ├── fear-greed/    # Fear & Greed Index
│   │   │   ├── global-metrics/# Global market metrics
│   │   │   ├── price-history/ # OHLC historical data
│   │   │   ├── portfolio/     # Portfolio management API
│   │   │   ├── watchlist/     # Watchlist API
│   │   │   ├── notes/         # Notes CRUD API
│   │   │   ├── alerts/        # Price alerts API
│   │   │   ├── community/     # Social features API
│   │   │   │   ├── posts/
│   │   │   │   ├── comments/
│   │   │   │   └── likes/
│   │   │   ├── user/          # User profile & settings
│   │   │   └── search/        # Search functionality
│   │   ├── alerts/            # Price alerts page
│   │   ├── coin/              # Individual coin pages
│   │   ├── community/         # Community feed page
│   │   ├── crypto-news/       # Crypto news page
│   │   ├── dashboard/         # Protected dashboard page
│   │   ├── docs/              # Documentation page
│   │   ├── exchange/          # Exchange list page
│   │   ├── notes/             # Notes management page
│   │   ├── portfolio/         # Portfolio pages
│   │   ├── profile/           # User profile pages
│   │   │   ├── edit/          # Profile editing
│   │   │   ├── settings/      # User settings
│   │   │   └── statistics/    # User statistics
│   │   ├── search/            # Search page
│   │   ├── watchlist/         # Watchlist page
│   │   ├── layout.tsx         # Root layout
│   │   ├── globals.css        # Global styles
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── chatbot/           # AI chatbot components
│   │   ├── community/         # Social components
│   │   │   ├── Feed.tsx
│   │   │   ├── PostCard.tsx
│   │   │   └── CommentModal.tsx
│   │   ├── notes/             # Notes components
│   │   │   └── NoteModal.tsx
│   │   ├── portfolio/         # Portfolio components
│   │   │   ├── PortfolioPieChart.tsx
│   │   │   └── PortfolioHistoryChart.tsx
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
│   │   ├── GlobalMetrics.tsx  # Global crypto metrics
│   │   ├── Header.tsx
│   │   ├── MainContent.tsx
│   │   ├── MetaMaskButton.tsx
│   │   ├── PopularCoins.tsx
│   │   ├── PriceChart.tsx
│   │   ├── QueryProvider.tsx  # React Query provider
│   │   └── Providers.tsx
│   ├── contexts/              # React contexts
│   │   ├── LanguageContext.tsx
│   │   └── NavbarContext.tsx
│   ├── hooks/                 # Custom React hooks
│   │   ├── usePortfolio.ts
│   │   └── useWatchlist.ts
│   └── lib/                   # Utilities
│       ├── auth.ts            # NextAuth config
│       ├── firebase.ts        # Firebase config
│       ├── prisma.ts          # Prisma client
│       └── getCryptoNews.ts   # News fetcher
├── .env.local                 # Environment variables
├── .gitignore
├── env.example                # Environment variables template
├── next.config.ts             # Next.js config
├── tailwind.config.ts         # Tailwind config
├── tsconfig.json              # TypeScript config
├── vitest.config.mts          # Vitest config
└── README.md
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project to Vercel: https://vercel.com/new
3. Add Environment Variables in Vercel dashboard (see `.env.example`)
4. Configure PostgreSQL database (see Database setup below)
5. Deploy!

### Database for Production
The application uses **PostgreSQL** for production. You can use:
- **Vercel Postgres** (recommended for Vercel deployments)
- **Supabase** (free tier available)
- **Railway** (generous free tier)
- **Neon** (serverless Postgres)

1. Set up your PostgreSQL database and get the connection string
2. Update `DATABASE_URL` in environment variables:
```env
DATABASE_URL="postgresql://user:password@host:5432/dbname"
```

3. Run Prisma migrations:
```bash
npx prisma migrate deploy
npx prisma generate
```

### Important Environment Variables for Production
Make sure to set all required environment variables in your deployment platform:
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL` (your production URL)
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`
- `COINMARKETCAP_API_KEY`
- `DATABASE_URL`
- `GEMINI_API_KEY`
- All Firebase config variables (`NEXT_PUBLIC_FIREBASE_*`)

## 🐛 Troubleshooting

### Database Connection Errors
1. Verify `DATABASE_URL` is correctly set in `.env.local`
2. Ensure PostgreSQL server is running
3. Check database credentials and permissions
4. Run Prisma generate and migrate:
```bash
npx prisma generate
npx prisma migrate dev
```

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
4. Ensure React Query is properly configured
5. Clear browser cache and reload

### MetaMask authentication not working
1. Ensure MetaMask is installed and unlocked
2. Check that you're on a supported network
3. Verify the signature message is correct
4. Clear browser cache and reconnect wallet

### Firebase authentication issues
1. Check Firebase config in `.env.local`
2. Verify all `NEXT_PUBLIC_FIREBASE_*` variables are set correctly
3. Ensure Firebase Authentication is enabled in Firebase Console
4. Check browser console for specific Firebase errors
5. Verify Firebase project settings match your configuration

### Gemini AI chatbot not responding
1. Verify `GEMINI_API_KEY` is set correctly in `.env.local`
2. Check API quota/limits at https://makersuite.google.com/
3. Review browser console for API errors
4. Ensure network connectivity to Google AI services
5. Verify the API key has proper permissions

### Community features (posts/comments) not working
1. Check database migrations: `npx prisma migrate dev`
2. Verify user is authenticated (check session)
3. Check browser console for API errors
4. Ensure PostgreSQL database has proper schema
5. Review API endpoint responses in Network tab

### Portfolio/Watchlist data not saving
1. Verify user is logged in with valid session
2. Check database connection and migrations
3. Review API endpoint responses in Network tab
4. Ensure Prisma Client is generated: `npx prisma generate`
5. Check for validation errors in request payload

### News not loading
1. Check if CryptoPanic API is accessible
2. Verify `CRYPTOPANIC_API_KEY` (if using authenticated API)
3. Check browser console for errors
4. Clear cache and reload page
5. Verify API rate limits haven't been exceeded

### Theme not persisting
1. Check browser localStorage for theme data
2. Clear browser cache and try again
3. Verify theme provider is properly configured in layout
4. Check for JavaScript errors in console
5. Ensure next-themes is properly installed

### Build errors
1. Clear `.next` directory: `rm -rf .next`
2. Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
3. Run Prisma generate: `npx prisma generate`
4. Check for TypeScript errors: `npx tsc --noEmit`
5. Try building again: `npm run build`

### Historical data showing "Not Available"
✅ **FIXED** - Now using free CoinGecko API for historical OHLC data

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

For questions, feedback, or contributions, please open an issue on GitHub or submit a pull request.

---

**Built with ❤️ using Next.js 15, TypeScript, PostgreSQL, and Google Gemini AI**

**CoinTracker** - Your comprehensive cryptocurrency tracking and portfolio management platform.

Features: Real-time market data • Portfolio tracking • Community feed • AI assistant • Price alerts • Notes • Watchlist • Charts & Analytics
