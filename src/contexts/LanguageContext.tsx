"use client";

import React, { createContext, useContext } from 'react';

interface LanguageContextType {
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data (English only)
const translations: Record<string, string> = {
  // Navigation
  'nav.home': 'Home',
  'nav.dashboard': 'Dashboard',
  'nav.profile': 'Profile',
  'nav.settings': 'Settings',
  'nav.statistics': 'Statistics',
  'nav.search': 'Search',
  'nav.exchange': 'Exchange',
  'nav.news': 'News',
  'nav.docs': 'Documentation',
  
  // Common
  'common.loading': 'Loading...',
  'common.error': 'An error occurred',
  'common.success': 'Success',
  'common.save': 'Save',
  'common.cancel': 'Cancel',
  'common.edit': 'Edit',
  'common.delete': 'Delete',
  'common.back': 'Back',
  'common.next': 'Next',
  'common.previous': 'Previous',
  'common.close': 'Close',
  'common.open': 'Open',
  'common.search': 'Search',
  'common.filter': 'Filter',
  'common.sort': 'Sort',
  'common.refresh': 'Refresh',
  'common.more': 'Show more',
  'common.less': 'Show less',
  'common.tryAgain': 'Try Again',
  'common.cryptocurrencies': 'Cryptocurrencies',
  'common.loadingData': 'Loading data...',
  'common.noData': 'No data available',
  'common.rank': 'Rank',
  'common.name': 'Name',
  'common.price': 'Price',
  'common.change24h': '24h Change',
  'common.volume': 'Volume',
  'common.marketCap': 'Market Cap',
  'common.updated': 'Updated',
  'common.symbol': 'Symbol',
  'common.markets': 'Markets',
  'common.supply': 'Supply',
  
  // Auth
  'auth.signin': 'Sign In',
  'auth.signout': 'Sign Out',
  'auth.signup': 'Sign Up',
  'auth.welcome': 'Welcome',
  'auth.email': 'Email',
  'auth.password': 'Password',
  'auth.confirmPassword': 'Confirm Password',
  'auth.forgotPassword': 'Forgot Password?',
  'auth.rememberMe': 'Remember Me',
  
  // Profile
  'profile.title': 'User Profile',
  'profile.subtitle': 'Manage your account information and preferences',
  'profile.edit': 'Edit Profile',
  'profile.settings': 'Settings',
  'profile.statistics': 'Statistics',
  'profile.manageInfo': 'Manage personal information',
  'profile.customizeAccount': 'Customize account',
  'profile.viewActivity': 'View your activity',
  'profile.accountInfo': 'Account Information',
  'profile.status': 'Status',
  'profile.accountType': 'Account Type',
  'profile.active': 'Active',
  'profile.premium': 'Premium',
  'profile.searchCrypto': 'Search Cryptocurrency',
  'profile.searchCryptoDesc': 'Search for detailed information about cryptocurrencies',
  'profile.backToHome': 'Back to Home',
  
  // Settings
  'settings.title': 'Settings',
  'settings.subtitle': 'Customize your account and application',
  'settings.notifications': 'Notifications',
  'settings.privacy': 'Privacy',
  'settings.appearance': 'Appearance',
  'settings.security': 'Security',
  'settings.priceAlerts': 'Price Alerts',
  'settings.priceAlertsDesc': 'Get notified when prices change',
  'settings.newsUpdates': 'News Updates',
  'settings.newsUpdatesDesc': 'Receive the latest crypto news',
  'settings.marketChanges': 'Market Changes',
  'settings.marketChangesDesc': 'Notifications about market volatility',
  'settings.emailNotifications': 'Email Notifications',
  'settings.emailNotificationsDesc': 'Receive notifications via email',
  'settings.profileVisibility': 'Profile Visibility',
  'settings.public': 'Public',
  'settings.friends': 'Friends',
  'settings.private': 'Private',
  'settings.dataSharing': 'Data Sharing',
  'settings.dataSharingDesc': 'Allow data sharing to improve service',
  'settings.theme': 'Theme',
  'settings.light': 'Light',
  'settings.dark': 'Dark',
  'settings.auto': 'Auto',
  'settings.language': 'Language',
  'settings.currency': 'Currency',
  'settings.twoFactor': 'Two-Factor Authentication',
  'settings.twoFactorDesc': 'Enhance account security',
  'settings.sessionTimeout': 'Session Timeout (minutes)',
  'settings.saveSettings': 'Save Settings',
  'settings.saving': 'Saving...',
  'settings.saved': 'Settings saved successfully!',
  'settings.error': 'Error occurred while saving settings!',
  
  // Statistics
  'statistics.title': 'Statistics',
  'statistics.subtitle': 'Track your activity and achievements',
  'statistics.timeRange': 'Time Range',
  'statistics.totalViews': 'Total Views',
  'statistics.searches': 'Searches',
  'statistics.favorites': 'Favorites',
  'statistics.timeSpent': 'Time Spent (hours)',
  'statistics.mostViewedCoins': 'Most Viewed Coins',
  'statistics.searchHistory': 'Search History',
  'statistics.dailyActivity': 'Daily Activity',
  'statistics.achievements': 'Achievements',
  'statistics.views': 'views',
  'statistics.times': 'times',
  'statistics.newUser': 'New User',
  'statistics.newUserDesc': 'Sign up for account',
  'statistics.investor': 'Investor',
  'statistics.investorDesc': 'View 100 coins',
  'statistics.researcher': 'Researcher',
  'statistics.researcherDesc': 'Search 50 times',
  'statistics.expert': 'Expert',
  'statistics.expertDesc': 'Spend 10 hours on app',
  'statistics.collector': 'Collector',
  'statistics.collectorDesc': 'Favorite 25 coins',
  'statistics.achieved': 'Achieved',
  
  // Profile Edit
  'profileEdit.title': 'Edit Profile',
  'profileEdit.subtitle': 'Update your personal information',
  'profileEdit.avatar': 'Profile Picture',
  'profileEdit.avatarDesc': 'Update your profile picture',
  'profileEdit.upload': 'Upload',
  'profileEdit.remove': 'Remove',
  'profileEdit.basicInfo': 'Basic Information',
  'profileEdit.fullName': 'Full Name',
  'profileEdit.email': 'Email',
  'profileEdit.phone': 'Phone Number',
  'profileEdit.birthDate': 'Birth Date',
  'profileEdit.bio': 'Bio',
  'profileEdit.socialLinks': 'Social Links',
  'profileEdit.website': 'Website',
  'profileEdit.twitter': 'Twitter',
  'profileEdit.linkedin': 'LinkedIn',
  'profileEdit.location': 'Location',
  'profileEdit.interests': 'Interests',
  'profileEdit.add': 'Add',
  'profileEdit.privacySettings': 'Privacy Settings',
  'profileEdit.showEmail': 'Show Email',
  'profileEdit.showEmailDesc': 'Allow others to see your email',
  'profileEdit.showPhone': 'Show Phone',
  'profileEdit.showPhoneDesc': 'Allow others to see your phone number',
  'profileEdit.showLocation': 'Show Location',
  'profileEdit.showLocationDesc': 'Allow others to see your location',
  'profileEdit.editProfile': 'Edit Profile',
  'profileEdit.saveChanges': 'Save Changes',
  'profileEdit.saving': 'Saving...',
  'profileEdit.saved': 'Profile updated successfully!',
  'profileEdit.error': 'Error occurred while updating profile!',
  
  // Theme & Language
  'theme.light': 'Light',
  'theme.dark': 'Dark',
  'theme.auto': 'Auto',
  'language.vietnamese': 'Tiếng Việt',
  'language.english': 'English',
  
  // Dashboard
  'dashboard.welcome': 'Welcome to the Dashboard!',
  'dashboard.loginSuccess': 'You have successfully logged in',
  'dashboard.accountInfo': 'Account Information',
  'dashboard.name': 'Name',
  'dashboard.email': 'Email',
  'dashboard.accountType': 'Account Type',
  'dashboard.premium': 'Premium',
  'dashboard.free': 'Free',
  'dashboard.quickActions': 'Quick Actions',
  'dashboard.profile': 'Profile',
  'dashboard.settings': 'Settings',
  'dashboard.docs': 'Documentation',
  'dashboard.viewProfile': 'View your profile',
  'dashboard.configurePreferences': 'Configure preferences',
  'dashboard.readDocs': 'Read documentation',
  'dashboard.backToDashboard': 'Back to Dashboard',
  
  // Search
  'search.title': 'Search Cryptocurrency',
  'search.subtitle': 'Discover detailed information about popular cryptocurrencies worldwide',
  'search.searchCoin': 'Search coin',
  'search.searchPlaceholder': 'Enter name or symbol of the coin to search',
  'search.popular': 'Popular Coins',
  'search.tips': 'Search Tips',
  'search.tip1': 'Enter full name or symbol of the coin (e.g., "bitcoin" or "BTC")',
  'search.tip2': 'Searching with English name will give more accurate results',
  'search.tip3': 'You need to enter at least 2 characters to start searching',
  'search.tip4': 'Click on the result to view detailed information about the coin',
  
  // Home Page
  'home.title': 'Cryptocurrency Dashboard',
  'home.topCryptos': 'Top 10 Cryptocurrencies',
  
  // Time Ranges
  'time.7d': '7 Days',
  'time.30d': '30 Days',
  'time.90d': '90 Days',
  'time.1y': '1 Year',
  'time.24h': '24 Hours',
  
  // Coin Detail
  'coin.backToDashboard': 'Back to Dashboard',
  'coin.loading': 'Loading coin info...',
  'coin.error': 'Error loading data',
  'coin.marketData': 'Market Statistics',
  'coin.supplyInfo': 'Supply Information',
  'coin.circulating': 'Circulating',
  'coin.totalSupply': 'Total Supply',
  'coin.maxSupply': 'Max Supply',
  'coin.categories': 'Categories',
  'coin.links': 'Links',
  'coin.homepage': 'Homepage',
  'coin.explorer': 'Explorer',
  'coin.sourceCode': 'Source Code',
  'coin.community': 'Community',
  'coin.description': 'Description',
  'coin.priceChange': 'Price Change',
  'coin.high24h': '24h High',
  'coin.low24h': '24h Low',
  'coin.allTimeHigh': 'All Time High',
  'coin.allTimeLow': 'All Time Low',
  
  // Charts & Indicators
  'chart.priceIncrease': 'Price Up',
  'chart.priceDecrease': 'Price Down',
  'chart.candles': 'candles',
  'chart.price': 'Price',
  'chart.volume': 'Volume',
  'chart.date': 'Date',
  'chart.open': 'Open',
  'chart.close': 'Close',
  'chart.high': 'High',
  'chart.low': 'Low',
  'chart.recentDays': 'recent days',
  
  // Fear & Greed Index
  'fearGreed.title': 'Fear & Greed Index',
  'fearGreed.meaning': 'Meaning',
  'fearGreed.extremeFear': 'Extreme Fear',
  'fearGreed.fear': 'Fear',
  'fearGreed.neutral': 'Neutral',
  'fearGreed.greed': 'Greed',
  'fearGreed.extremeGreed': 'Extreme Greed',
  'fearGreed.range': 'Range',
  'fearGreed.now': 'Now',
  
  // Global Metrics
  'metrics.totalMarketCap': 'Total Market Cap',
  'metrics.totalVolume24h': 'Total Volume 24h',
  'metrics.btcDominance': 'BTC Dominance',
  'metrics.ethDominance': 'ETH Dominance',
  'metrics.dominance': 'Dominance',
  'metrics.title': 'Global Metrics',
  
  // Exchange
  'exchange.title': 'Exchanges',
  'exchange.totalExchanges': 'Total Exchanges',
  'exchange.totalVolume': 'Total Volume 24h (BTC)',
  'exchange.totalMarkets': 'Total Market Pairs',
  'exchange.trustScore': 'Trust Score',
  'exchange.name': 'Exchange Name',
  'exchange.volume24h': 'Volume 24h',
  'exchange.established': 'Established',
  'exchange.country': 'Country',
  
  // Crypto List
  'cryptoList.title': 'Cryptocurrency List',
  'cryptoList.noResults': 'No results found',
  'cryptoList.viewMore': 'View More',
  
  // Popular Coins
  'popularCoins.title': 'Popular Coins',
  'popularCoins.trending': 'Trending',
  
  // Crypto News
  'news.title': 'Crypto News',
  'news.latest': 'Latest News',
  'news.readMore': 'Read More',
  'news.source': 'Source',
  'news.publishedAt': 'Published at',
  
  // Search Component
  'cryptoSearch.placeholder': 'Search coins (e.g., bitcoin, ethereum)...',
  'cryptoSearch.noResults': 'No results found',
  'cryptoSearch.searching': 'Searching...',
  
  // MetaMask
  'metamask.connect': 'Connect MetaMask',
  'metamask.connected': 'Connected',
  'metamask.disconnect': 'Disconnect',
  'metamask.notInstalled': 'Please install MetaMask',
  'metamask.address': 'Address',
  
  // Dominance Chart
  'dominance.title': 'Market Dominance',
  'dominance.bitcoin': 'Bitcoin',
  'dominance.ethereum': 'Ethereum',
  'dominance.others': 'Others',
  
  // Footer
  'footer.title': 'Crypto Tracker',
  'footer.description': 'Real-time cryptocurrency price tracking platform',
  'footer.navigation': 'Navigation',
  'footer.resources': 'Resources',
  'footer.support': 'Support',
  'footer.legal': 'Legal',
  'footer.copyright': 'Copyright',
  'footer.allRightsReserved': 'All rights reserved',
  'footer.dashboard': 'Dashboard',
  'footer.search': 'Search',
  'footer.exchange': 'Exchange',
  'footer.news': 'News',
  'footer.docs': 'Documentation',
  'footer.profile': 'Profile',
  'footer.settings': 'Settings',
  'footer.statistics': 'Statistics',
  'footer.help': 'Help Center',
  'footer.faq': 'FAQ',
  'footer.contact': 'Contact',
  'footer.api': 'API Documentation',
  'footer.privacy': 'Privacy Policy',
  'footer.terms': 'Terms of Service',
  'footer.about': 'About Us',
  
  // Landing Page
  'landing.badge': 'Leading Crypto Tracking Platform',
  'landing.hero.title': 'Real-Time Cryptocurrency Tracking',
  'landing.hero.subtitle': 'Comprehensive platform to track, analyze and explore the cryptocurrency market',
  'landing.hero.description': 'Track prices, charts, news and statistics of over 10,000+ cryptocurrencies worldwide',
  'landing.cta.getStarted': 'Get Started',
  'landing.cta.exploreNow': 'Explore Now',
  'landing.benefit1': 'Real-time data',
  'landing.benefit2': 'Professional charts',
  'landing.benefit3': 'Latest news',
  'landing.benefit4': 'Completely free',
  'landing.features.title': 'Key Features',
  'landing.features.subtitle': 'All the tools you need to track and analyze the crypto market',
  'landing.feature1.title': 'Comprehensive Dashboard',
  'landing.feature1.description': 'View market overview with key metrics like market cap, trading volume and dominance ratios',
  'landing.feature2.title': 'Advanced Charts',
  'landing.feature2.description': 'Candlestick charts, price charts and Fear & Greed Index to analyze market trends',
  'landing.feature3.title': 'Smart Search',
  'landing.feature3.description': 'Search and discover detailed information about any cryptocurrency quickly',
  'landing.feature4.title': 'Exchange Listings',
  'landing.feature4.description': 'View top cryptocurrency exchanges with volume and trust score information',
  'landing.feature5.title': 'Crypto News',
  'landing.feature5.description': 'Get the latest news from the cryptocurrency market to stay on top of trends',
  'landing.feature6.title': 'Secure & Safe',
  'landing.feature6.description': 'Secure login with Google OAuth or MetaMask wallet to protect your account',
  'landing.finalCta.title': 'Ready to get started?',
  'landing.finalCta.description': 'Join thousands of users using Crypto Tracker to monitor the market',
  'landing.faq.title': 'Frequently Asked Questions',
  'landing.faq.q1.question': 'What is CoinTracker?',
  'landing.faq.q1.answer': 'CoinTracker is a real-time cryptocurrency price tracking platform, providing detailed information on over 10,000+ cryptocurrencies from exchanges worldwide.',
  'landing.faq.q2.question': "What are CoinTracker's key features?",
  'landing.faq.q2.answer': 'CoinTracker offers a comprehensive dashboard, advanced charts, smart search, exchange listings, up-to-date crypto news, and secure account authentication features.',
  'landing.faq.q3.question': 'What data sources does CoinTracker use?',
  'landing.faq.q3.answer': 'We aggregate real-time data from reputable cryptocurrency APIs such as CoinMarketCap, CoinGecko, Alternative.me, and CryptoPanic to ensure the highest accuracy.',
  'landing.faq.q4.question': 'Is CoinTracker free to use?',
  'landing.faq.q4.answer': 'Yes, CoinTracker is completely free to use. We utilize free APIs and provide all core features without requiring paid subscriptions.',
  'landing.faq.q5.question': 'How accurate is the cryptocurrency data?',
  'landing.faq.q5.answer': 'We aggregate real-time data from multiple reputable cryptocurrency APIs like CoinMarketCap and CoinGecko to ensure the highest accuracy. Data is updated frequently to reflect current market conditions.',
  'landing.faq.q6.question': 'Is my personal data and crypto wallet secure?',
  'landing.faq.q6.answer': 'Yes, we prioritize security. User authentication is handled via secure methods like Google OAuth and MetaMask wallet signature. We use JWT-based session management and do not store your private wallet keys.',
  'landing.faq.q7.question': 'What new features can I expect in the future?',
  'landing.faq.q7.answer': 'We are continuously working to improve CoinTracker. Upcoming features include user portfolio tracking, customizable price alerts and notifications, more advanced chart types, and performance optimizations. We also plan to implement PWA support and Docker deployment.',
  'landing.faq.q8.question': 'How can I change the language or theme?',
  'landing.faq.q8.answer': 'You can easily switch between English and Vietnamese languages, or toggle between light and dark themes through the application settings.',
  'landing.faq.q9.question': 'Where can I find support if I have issues?',
  'landing.faq.q9.answer': 'If you encounter any issues, please visit our Help Center or contact our support team via the contact page.',

  // Note
  'note.editTitle': 'Edit Note',
  'note.newTitle': 'New Note',
  'note.titlePlaceholder': 'Note Title',
  'note.contentPlaceholder': 'Write your thoughts...',
  'note.pin': 'Pin this note',
  'note.linkCoin': 'Link to Coin ID (optional)',
  'note.save': 'Save Note',
  'note.created': 'Note created',
  'note.updated': 'Note updated',
  'note.error': 'Something went wrong',
  'note.titleRequired': 'Title is required',
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const t = (key: string): string => {
    return translations[key] || key;
  };

  const value: LanguageContextType = {
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
