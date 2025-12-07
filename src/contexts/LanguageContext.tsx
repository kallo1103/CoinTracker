"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'vi' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data
const translations = {
  vi: {
    // Navigation
    'nav.home': 'Trang chủ',
    'nav.dashboard': 'Dashboard',
    'nav.profile': 'Hồ sơ',
    'nav.settings': 'Cài đặt',
    'nav.statistics': 'Thống kê',
    'nav.search': 'Tìm kiếm',
    'nav.exchange': 'Sàn giao dịch',
    'nav.news': 'Tin tức',
    'nav.docs': 'Tài liệu',
    
    // Common
    'common.loading': 'Đang tải...',
    'common.error': 'Có lỗi xảy ra',
    'common.success': 'Thành công',
    'common.save': 'Lưu',
    'common.cancel': 'Hủy',
    'common.edit': 'Chỉnh sửa',
    'common.delete': 'Xóa',
    'common.back': 'Quay lại',
    'common.next': 'Tiếp theo',
    'common.previous': 'Trước đó',
    'common.close': 'Đóng',
    'common.open': 'Mở',
    'common.search': 'Tìm kiếm',
    'common.filter': 'Lọc',
    'common.sort': 'Sắp xếp',
    'common.refresh': 'Làm mới',
    'common.more': 'Xem thêm',
    'common.less': 'Thu gọn',
    
    // Auth
    'auth.signin': 'Đăng nhập',
    'auth.signout': 'Đăng xuất',
    'auth.signup': 'Đăng ký',
    'auth.welcome': 'Chào mừng',
    'auth.email': 'Email',
    'auth.password': 'Mật khẩu',
    'auth.confirmPassword': 'Xác nhận mật khẩu',
    'auth.forgotPassword': 'Quên mật khẩu?',
    'auth.rememberMe': 'Ghi nhớ đăng nhập',
    
    // Profile
    'profile.title': 'Hồ sơ người dùng',
    'profile.subtitle': 'Quản lý thông tin tài khoản và tùy chọn',
    'profile.edit': 'Chỉnh sửa hồ sơ',
    'profile.settings': 'Cài đặt',
    'profile.statistics': 'Thống kê',
    'profile.manageInfo': 'Quản lý thông tin cá nhân',
    'profile.customizeAccount': 'Tùy chỉnh tài khoản',
    'profile.viewActivity': 'Xem hoạt động của bạn',
    'profile.accountInfo': 'Thông tin tài khoản',
    'profile.status': 'Trạng thái',
    'profile.accountType': 'Loại tài khoản',
    'profile.active': 'Hoạt động',
    'profile.premium': 'Premium',
    'profile.searchCrypto': 'Tìm kiếm Cryptocurrency',
    'profile.searchCryptoDesc': 'Tìm kiếm thông tin chi tiết về các loại tiền điện tử',
    'profile.backToHome': 'Về trang chủ',
    
    // Settings
    'settings.title': 'Cài đặt',
    'settings.subtitle': 'Tùy chỉnh tài khoản và ứng dụng',
    'settings.notifications': 'Thông báo',
    'settings.privacy': 'Quyền riêng tư',
    'settings.appearance': 'Giao diện',
    'settings.security': 'Bảo mật',
    'settings.priceAlerts': 'Cảnh báo giá',
    'settings.priceAlertsDesc': 'Nhận thông báo khi giá thay đổi',
    'settings.newsUpdates': 'Cập nhật tin tức',
    'settings.newsUpdatesDesc': 'Nhận tin tức crypto mới nhất',
    'settings.marketChanges': 'Thay đổi thị trường',
    'settings.marketChangesDesc': 'Thông báo về biến động thị trường',
    'settings.emailNotifications': 'Thông báo email',
    'settings.emailNotificationsDesc': 'Nhận thông báo qua email',
    'settings.profileVisibility': 'Hiển thị hồ sơ',
    'settings.public': 'Công khai',
    'settings.friends': 'Bạn bè',
    'settings.private': 'Riêng tư',
    'settings.dataSharing': 'Chia sẻ dữ liệu',
    'settings.dataSharingDesc': 'Cho phép chia sẻ dữ liệu để cải thiện dịch vụ',
    'settings.theme': 'Chủ đề',
    'settings.light': 'Sáng',
    'settings.dark': 'Tối',
    'settings.auto': 'Tự động',
    'settings.language': 'Ngôn ngữ',
    'settings.currency': 'Tiền tệ',
    'settings.twoFactor': 'Xác thực 2 yếu tố',
    'settings.twoFactorDesc': 'Tăng cường bảo mật tài khoản',
    'settings.sessionTimeout': 'Thời gian hết phiên (phút)',
    'settings.saveSettings': 'Lưu cài đặt',
    'settings.saving': 'Đang lưu...',
    'settings.saved': 'Đã lưu cài đặt thành công!',
    'settings.error': 'Có lỗi xảy ra khi lưu cài đặt!',
    
    // Statistics
    'statistics.title': 'Thống kê',
    'statistics.subtitle': 'Theo dõi hoạt động và thành tích của bạn',
    'statistics.timeRange': 'Khoảng thời gian',
    'statistics.totalViews': 'Tổng lượt xem',
    'statistics.searches': 'Tìm kiếm',
    'statistics.favorites': 'Yêu thích',
    'statistics.timeSpent': 'Thời gian (giờ)',
    'statistics.mostViewedCoins': 'Coin được xem nhiều nhất',
    'statistics.searchHistory': 'Lịch sử tìm kiếm',
    'statistics.dailyActivity': 'Hoạt động hàng ngày',
    'statistics.achievements': 'Thành tích',
    'statistics.views': 'lượt xem',
    'statistics.times': 'lần',
    'statistics.newUser': 'Người dùng mới',
    'statistics.newUserDesc': 'Đăng ký tài khoản',
    'statistics.investor': 'Nhà đầu tư',
    'statistics.investorDesc': 'Xem 100 coin',
    'statistics.researcher': 'Nhà nghiên cứu',
    'statistics.researcherDesc': 'Tìm kiếm 50 lần',
    'statistics.expert': 'Chuyên gia',
    'statistics.expertDesc': 'Dành 10 giờ trên app',
    'statistics.collector': 'Người sưu tập',
    'statistics.collectorDesc': 'Yêu thích 25 coin',
    'statistics.achieved': 'Đã đạt được',
    
    // Profile Edit
    'profileEdit.title': 'Chỉnh sửa hồ sơ',
    'profileEdit.subtitle': 'Cập nhật thông tin cá nhân của bạn',
    'profileEdit.avatar': 'Ảnh đại diện',
    'profileEdit.avatarDesc': 'Cập nhật ảnh đại diện của bạn',
    'profileEdit.upload': 'Tải lên',
    'profileEdit.remove': 'Xóa',
    'profileEdit.basicInfo': 'Thông tin cơ bản',
    'profileEdit.fullName': 'Họ và tên',
    'profileEdit.email': 'Email',
    'profileEdit.phone': 'Số điện thoại',
    'profileEdit.birthDate': 'Ngày sinh',
    'profileEdit.bio': 'Giới thiệu',
    'profileEdit.socialLinks': 'Liên kết xã hội',
    'profileEdit.website': 'Website',
    'profileEdit.twitter': 'Twitter',
    'profileEdit.linkedin': 'LinkedIn',
    'profileEdit.location': 'Vị trí',
    'profileEdit.interests': 'Sở thích',
    'profileEdit.add': 'Thêm',
    'profileEdit.privacySettings': 'Cài đặt quyền riêng tư',
    'profileEdit.showEmail': 'Hiển thị email',
    'profileEdit.showEmailDesc': 'Cho phép người khác xem email của bạn',
    'profileEdit.showPhone': 'Hiển thị số điện thoại',
    'profileEdit.showPhoneDesc': 'Cho phép người khác xem số điện thoại của bạn',
    'profileEdit.showLocation': 'Hiển thị vị trí',
    'profileEdit.showLocationDesc': 'Cho phép người khác xem vị trí của bạn',
    'profileEdit.editProfile': 'Chỉnh sửa hồ sơ',
    'profileEdit.saveChanges': 'Lưu thay đổi',
    'profileEdit.saving': 'Đang lưu...',
    'profileEdit.saved': 'Đã cập nhật hồ sơ thành công!',
    'profileEdit.error': 'Có lỗi xảy ra khi cập nhật hồ sơ!',
    
    // Theme & Language
    'theme.light': 'Sáng',
    'theme.dark': 'Tối',
    'theme.auto': 'Tự động',
    'language.vietnamese': 'Tiếng Việt',
    'language.english': 'English',
    
    // Dashboard
    'dashboard.welcome': 'Chào mừng đến Dashboard!',
    'dashboard.loginSuccess': 'Bạn đã đăng nhập thành công',
    'dashboard.accountInfo': 'Thông tin tài khoản',
    'dashboard.name': 'Tên',
    'dashboard.email': 'Email',
    'dashboard.accountType': 'Loại tài khoản',
    'dashboard.premium': 'Premium',
    'dashboard.free': 'Miễn phí',
    'dashboard.quickActions': 'Hành động nhanh',
    'dashboard.profile': 'Hồ sơ',
    'dashboard.settings': 'Cài đặt',
    'dashboard.docs': 'Tài liệu',
    'dashboard.viewProfile': 'Xem hồ sơ của bạn',
    'dashboard.configurePreferences': 'Cấu hình tùy chọn',
    'dashboard.readDocs': 'Đọc tài liệu',
    'dashboard.backToDashboard': 'Về Dashboard',
    
    // Search
    'search.title': 'Tìm kiếm Cryptocurrency',
    'search.subtitle': 'Khám phá thông tin chi tiết về các loại tiền điện tử phổ biến trên thế giới',
    'search.searchCoin': 'Tìm kiếm coin',
    'search.searchPlaceholder': 'Nhập tên hoặc ký hiệu của coin để tìm kiếm',
    'search.popular': 'Coin phổ biến',
    'search.tips': 'Mẹo tìm kiếm',
    'search.tip1': 'Nhập tên đầy đủ hoặc ký hiệu của coin (ví dụ: "bitcoin" hoặc "BTC")',
    'search.tip2': 'Tìm kiếm bằng tên tiếng Anh sẽ cho kết quả chính xác hơn',
    'search.tip3': 'Bạn cần nhập ít nhất 2 ký tự để bắt đầu tìm kiếm',
    'search.tip4': 'Click vào kết quả để xem thông tin chi tiết của coin',
    
    // Home Page
    'home.title': 'Dashboard Cryptocurrency',
    'home.topCryptos': 'Top 10 Cryptocurrencies',
    
    // Common - Extended
    'common.loadingData': 'Đang tải dữ liệu...',
    'common.noData': 'Không có dữ liệu',
    'common.rank': 'Xếp hạng',
    'common.name': 'Tên',
    'common.price': 'Giá',
    'common.change24h': 'Thay đổi 24h',
    'common.volume': 'Khối lượng',
    'common.marketCap': 'Vốn hóa',
    'common.updated': 'Cập nhật',
    'common.symbol': 'Ký hiệu',
    'common.markets': 'Thị trường',
    'common.supply': 'Nguồn cung',
    
    // Time Ranges
    'time.7d': '7 ngày',
    'time.30d': '30 ngày',
    'time.90d': '90 ngày',
    'time.1y': '1 năm',
    'time.24h': '24 giờ',
    
    // Coin Detail
    'coin.backToDashboard': 'Quay lại Dashboard',
    'coin.loading': 'Đang tải thông tin coin...',
    'coin.error': 'Lỗi tải dữ liệu',
    'coin.marketData': 'Thống kê thị trường',
    'coin.supplyInfo': 'Thông tin nguồn cung',
    'coin.circulating': 'Đang lưu hành',
    'coin.totalSupply': 'Tổng cung',
    'coin.maxSupply': 'Cung tối đa',
    'coin.categories': 'Danh mục',
    'coin.links': 'Liên kết',
    'coin.homepage': 'Trang chủ',
    'coin.explorer': 'Trình khám phá',
    'coin.sourceCode': 'Mã nguồn',
    'coin.community': 'Cộng đồng',
    'coin.description': 'Mô tả',
    'coin.priceChange': 'Thay đổi giá',
    'coin.high24h': 'Cao nhất 24h',
    'coin.low24h': 'Thấp nhất 24h',
    'coin.allTimeHigh': 'Cao nhất mọi thời đại',
    'coin.allTimeLow': 'Thấp nhất mọi thời đại',
    
    // Charts & Indicators
    'chart.priceIncrease': 'Tăng giá',
    'chart.priceDecrease': 'Giảm giá',
    'chart.candles': 'nến',
    'chart.price': 'Giá',
    'chart.volume': 'Khối lượng',
    'chart.date': 'Ngày',
    'chart.open': 'Mở cửa',
    'chart.close': 'Đóng cửa',
    'chart.high': 'Cao',
    'chart.low': 'Thấp',
    'chart.recentDays': 'ngày gần đây',
    
    // Fear & Greed Index
    'fearGreed.title': 'Chỉ số Sợ hãi & Tham lam',
    'fearGreed.meaning': 'Ý nghĩa',
    'fearGreed.extremeFear': 'Sợ hãi cực độ',
    'fearGreed.fear': 'Sợ hãi',
    'fearGreed.neutral': 'Trung lập',
    'fearGreed.greed': 'Tham lam',
    'fearGreed.extremeGreed': 'Tham lam cực độ',
    'fearGreed.range': 'Khoảng',
    'fearGreed.now': 'Hiện tại',
    
    // Global Metrics
    'metrics.totalMarketCap': 'Tổng vốn hóa thị trường',
    'metrics.totalVolume24h': 'Tổng khối lượng 24h',
    'metrics.btcDominance': 'Thống trị BTC',
    'metrics.ethDominance': 'Thống trị ETH',
    'metrics.dominance': 'Thống trị',
    
    // Exchange
    'exchange.title': 'Sàn giao dịch',
    'exchange.totalExchanges': 'Tổng số sàn',
    'exchange.totalVolume': 'Tổng volume 24h (BTC)',
    'exchange.totalMarkets': 'Tổng market pairs',
    'exchange.trustScore': 'Điểm tin cậy',
    'exchange.name': 'Tên sàn',
    'exchange.volume24h': 'Khối lượng 24h',
    'exchange.established': 'Thành lập',
    'exchange.country': 'Quốc gia',
    
    // Crypto List
    'cryptoList.title': 'Danh sách Cryptocurrency',
    'cryptoList.noResults': 'Không tìm thấy kết quả',
    'cryptoList.viewMore': 'Xem thêm',
    
    // Popular Coins
    'popularCoins.title': 'Coin phổ biến',
    'popularCoins.trending': 'Đang xu hướng',
    
    // Crypto News
    'news.title': 'Tin tức Crypto',
    'news.latest': 'Tin mới nhất',
    'news.readMore': 'Đọc thêm',
    'news.source': 'Nguồn',
    'news.publishedAt': 'Xuất bản lúc',
    
    // Search Component
    'cryptoSearch.placeholder': 'Tìm kiếm coin (ví dụ: bitcoin, ethereum)...',
    'cryptoSearch.noResults': 'Không tìm thấy kết quả',
    'cryptoSearch.searching': 'Đang tìm kiếm...',
    
    // MetaMask
    'metamask.connect': 'Kết nối MetaMask',
    'metamask.connected': 'Đã kết nối',
    'metamask.disconnect': 'Ngắt kết nối',
    'metamask.notInstalled': 'Vui lòng cài đặt MetaMask',
    'metamask.address': 'Địa chỉ',
    
    // Dominance Chart
    'dominance.title': 'Thống trị thị trường',
    'dominance.bitcoin': 'Bitcoin',
    'dominance.ethereum': 'Ethereum',
    'dominance.others': 'Khác',
    
    // Footer
    'footer.title': 'Crypto Tracker',
    'footer.description': 'Nền tảng theo dõi giá cryptocurrency thời gian thực',
    'footer.navigation': 'Điều hướng',
    'footer.resources': 'Tài nguyên',
    'footer.support': 'Hỗ trợ',
    'footer.legal': 'Pháp lý',
    'footer.copyright': 'Bản quyền',
    'footer.allRightsReserved': 'Tất cả quyền được bảo lưu',
    'footer.dashboard': 'Dashboard',
    'footer.search': 'Tìm kiếm',
    'footer.exchange': 'Sàn giao dịch',
    'footer.news': 'Tin tức',
    'footer.docs': 'Tài liệu',
    'footer.profile': 'Hồ sơ',
    'footer.settings': 'Cài đặt',
    'footer.statistics': 'Thống kê',
    'footer.help': 'Trung tâm trợ giúp',
    'footer.faq': 'Câu hỏi thường gặp',
    'footer.contact': 'Liên hệ',
    'footer.api': 'Tài liệu API',
    'footer.privacy': 'Chính sách bảo mật',
    'footer.terms': 'Điều khoản sử dụng',
    'footer.about': 'Về chúng tôi',
    
    // Landing Page
    'landing.badge': 'Nền tảng theo dõi Crypto hàng đầu',
    'landing.hero.title': 'Theo dõi Cryptocurrency Thời Gian Thực',
    'landing.hero.subtitle': 'Nền tảng toàn diện để theo dõi, phân tích và khám phá thị trường tiền điện tử',
    'landing.hero.description': 'Theo dõi giá cả, biểu đồ, tin tức và thống kê của hơn 10,000+ loại tiền điện tử trên toàn thế giới',
    'landing.cta.getStarted': 'Bắt đầu ngay',
    'landing.cta.exploreNow': 'Khám phá ngay',
    'landing.benefit1': 'Dữ liệu thời gian thực',
    'landing.benefit2': 'Biểu đồ chuyên nghiệp',
    'landing.benefit3': 'Tin tức cập nhật',
    'landing.benefit4': 'Hoàn toàn miễn phí',
    'landing.features.title': 'Tính năng nổi bật',
    'landing.features.subtitle': 'Tất cả công cụ bạn cần để theo dõi và phân tích thị trường crypto',
    'landing.feature1.title': 'Dashboard Toàn Diện',
    'landing.feature1.description': 'Xem tổng quan thị trường với các chỉ số quan trọng như vốn hóa, khối lượng giao dịch và tỷ lệ thống trị',
    'landing.feature2.title': 'Biểu Đồ Nâng Cao',
    'landing.feature2.description': 'Biểu đồ nến, biểu đồ giá và biểu đồ Fear & Greed Index để phân tích xu hướng thị trường',
    'landing.feature3.title': 'Tìm Kiếm Thông Minh',
    'landing.feature3.description': 'Tìm kiếm và khám phá thông tin chi tiết về bất kỳ loại tiền điện tử nào một cách nhanh chóng',
    'landing.feature4.title': 'Danh Sách Sàn Giao Dịch',
    'landing.feature4.description': 'Xem danh sách các sàn giao dịch hàng đầu với thông tin về khối lượng và độ tin cậy',
    'landing.feature5.title': 'Tin Tức Crypto',
    'landing.feature5.description': 'Cập nhật tin tức mới nhất từ thị trường cryptocurrency để luôn nắm bắt xu hướng',
    'landing.feature6.title': 'Bảo Mật & An Toàn',
    'landing.feature6.description': 'Đăng nhập an toàn với Google OAuth hoặc MetaMask wallet để bảo vệ tài khoản của bạn',
    'landing.finalCta.title': 'Sẵn sàng bắt đầu?',
    'landing.finalCta.description': 'Tham gia cùng hàng ngàn người dùng đang sử dụng Crypto Tracker để theo dõi thị trường',
  },
  en: {
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
    
    // Common - Extended
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
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('vi');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['vi', 'en'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'vi') {
        setLanguage('vi');
      } else {
        setLanguage('en');
      }
    }
  }, []);

  // Save language to localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
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
