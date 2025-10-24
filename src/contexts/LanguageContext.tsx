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
