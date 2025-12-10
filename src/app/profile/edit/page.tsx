"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Save,
  Check,
  X,
  Camera,
  Upload,
  Edit3,
  UserCheck,
  Shield,
  Bell
} from "lucide-react";

export default function ProfileEditPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [profileData, setProfileData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    bio: 'Nhà đầu tư cryptocurrency với 3 năm kinh nghiệm',
    location: 'Hồ Chí Minh, Việt Nam',
    website: 'https://example.com',
    twitter: '@username',
    linkedin: 'linkedin.com/in/username',
    phone: '+84 123 456 789',
    birthDate: '1990-01-01',
    interests: ['Bitcoin', 'Ethereum', 'DeFi', 'NFT'],
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    privacy: {
      showEmail: false,
      showPhone: false,
      showLocation: true
    }
  });

  // Redirect to home if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  // Update profile data when session loads
  useEffect(() => {
    if (session?.user) {
      setProfileData(prev => ({
        ...prev,
        name: session.user?.name || '',
        email: session.user?.email || ''
      }));
    }
  }, [session]);

  // Show loading while checking session
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Do not render if not authenticated
  if (!session) {
    return null;
  }

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSaveStatus('success');
      setIsEditing(false);
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSaveStatus('idle');
    // Reset to original data
    setProfileData(prev => ({
      ...prev,
      name: session.user?.name || '',
      email: session.user?.email || ''
    }));
  };

  const updateProfileData = (field: string, value: string | string[] | boolean) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateNestedData = (category: string, field: string, value: string | boolean) => {
    setProfileData(prev => ({
      ...prev,
      [category]: {
        ...(prev[category as keyof typeof prev] as Record<string, unknown>),
        [field]: value
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.push("/profile")}
            className="p-2 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <User className="w-10 h-10" />
              Chỉnh sửa hồ sơ
            </h1>
            <p className="text-gray-300">Cập nhật thông tin cá nhân của bạn</p>
          </div>
        </div>

        {/* Save Status */}
        {saveStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-900/20 border border-green-500/30 rounded-xl flex items-center gap-3">
            <Check className="w-5 h-5 text-green-400" />
            <span className="text-green-300">Đã cập nhật hồ sơ thành công!</span>
          </div>
        )}
        
        {saveStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-xl flex items-center gap-3">
            <X className="w-5 h-5 text-red-400" />
            <span className="text-red-300">Có lỗi xảy ra khi cập nhật hồ sơ!</span>
          </div>
        )}

        {/* Profile Picture Section */}
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center gap-6">
            <div className="relative">
              {session.user?.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User avatar"}
                  width={120}
                  height={120}
                  className="rounded-full ring-4 ring-indigo-100"
                  unoptimized
                />
              ) : (
                <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-4xl font-bold ring-4 ring-indigo-100">
                  {session.user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
              {isEditing && (
                <button className="absolute -bottom-2 -right-2 bg-gray-800 hover:bg-gray-700 dark:bg-white dark:hover:bg-gray-200 dark:text-white text-white p-2 rounded-full shadow-lg transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Ảnh đại diện</h2>
              <p className="text-gray-300 mb-4">Cập nhật ảnh đại diện của bạn</p>
              {isEditing && (
                <div className="flex gap-3">
                  <button className="px-4 py-2 btn-primary rounded-xl transition-colors flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Tải lên
                  </button>
                  <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-xl transition-colors">
                    Xóa
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gray-700/50 dark:bg-gray-600/50 rounded-xl">
              <UserCheck className="w-6 h-6 text-gray-300 dark:text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Thông tin cơ bản</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-medium mb-2">Họ và tên</label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => updateProfileData('name', e.target.value)}
                disabled={!isEditing}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-gray-500 dark:focus:ring-white focus:border-transparent disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Email</label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => updateProfileData('email', e.target.value)}
                disabled={!isEditing}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-gray-500 dark:focus:ring-white focus:border-transparent disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Số điện thoại</label>
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) => updateProfileData('phone', e.target.value)}
                disabled={!isEditing}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-gray-500 dark:focus:ring-white focus:border-transparent disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Ngày sinh</label>
              <input
                type="date"
                value={profileData.birthDate}
                onChange={(e) => updateProfileData('birthDate', e.target.value)}
                disabled={!isEditing}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-gray-500 dark:focus:ring-white focus:border-transparent disabled:opacity-50"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-white font-medium mb-2">Giới thiệu</label>
              <textarea
                value={profileData.bio}
                onChange={(e) => updateProfileData('bio', e.target.value)}
                disabled={!isEditing}
                rows={3}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-500/20 rounded-xl">
              <Mail className="w-6 h-6 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Liên kết xã hội</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-medium mb-2">Website</label>
              <input
                type="url"
                value={profileData.website}
                onChange={(e) => updateProfileData('website', e.target.value)}
                disabled={!isEditing}
                placeholder="https://example.com"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-gray-500 dark:focus:ring-white focus:border-transparent disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Twitter</label>
              <input
                type="text"
                value={profileData.twitter}
                onChange={(e) => updateProfileData('twitter', e.target.value)}
                disabled={!isEditing}
                placeholder="@username"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-gray-500 dark:focus:ring-white focus:border-transparent disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">LinkedIn</label>
              <input
                type="url"
                value={profileData.linkedin}
                onChange={(e) => updateProfileData('linkedin', e.target.value)}
                disabled={!isEditing}
                placeholder="linkedin.com/in/username"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-gray-500 dark:focus:ring-white focus:border-transparent disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Vị trí</label>
              <input
                type="text"
                value={profileData.location}
                onChange={(e) => updateProfileData('location', e.target.value)}
                disabled={!isEditing}
                placeholder="Thành phố, Quốc gia"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-gray-500 dark:focus:ring-white focus:border-transparent disabled:opacity-50"
              />
            </div>
          </div>
        </div>

        {/* Interests */}
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-500/20 rounded-xl">
              <Shield className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Sở thích</h2>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {profileData.interests.map((interest, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-gray-700/50 dark:bg-gray-600/50 border border-gray-600/30 rounded-xl px-4 py-2"
              >
                <span className="text-gray-300 dark:text-white">{interest}</span>
                {isEditing && (
                  <button
                    onClick={() => {
                      const newInterests = profileData.interests.filter((_, i) => i !== index);
                      updateProfileData('interests', newInterests);
                    }}
                    className="text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            {isEditing && (
              <button className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white rounded-xl px-4 py-2 transition-colors">
                <Edit3 className="w-4 h-4" />
                Thêm
              </button>
            )}
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-500/20 rounded-xl">
              <Bell className="w-6 h-6 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Cài đặt quyền riêng tư</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Hiển thị email</h3>
                <p className="text-sm text-gray-300">Cho phép người khác xem email của bạn</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={profileData.privacy.showEmail}
                  onChange={(e) => updateNestedData('privacy', 'showEmail', e.target.checked)}
                  disabled={!isEditing}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-800 dark:peer-checked:bg-white"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Hiển thị số điện thoại</h3>
                <p className="text-sm text-gray-300">Cho phép người khác xem số điện thoại của bạn</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={profileData.privacy.showPhone}
                  onChange={(e) => updateNestedData('privacy', 'showPhone', e.target.checked)}
                  disabled={!isEditing}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-800 dark:peer-checked:bg-white"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Hiển thị vị trí</h3>
                <p className="text-sm text-gray-300">Cho phép người khác xem vị trí của bạn</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={profileData.privacy.showLocation}
                  onChange={(e) => updateNestedData('privacy', 'showLocation', e.target.checked)}
                  disabled={!isEditing}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-800 dark:peer-checked:bg-white"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center gap-3"
            >
              <Edit3 className="w-5 h-5" />
              Chỉnh sửa hồ sơ
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
              >
                {isSaving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Đang lưu...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Lưu thay đổi
                  </>
                )}
              </button>
              
              <button
                onClick={handleCancel}
                disabled={isSaving}
                className="px-8 py-4 bg-gray-600 hover:bg-gray-700 text-white rounded-2xl font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
              >
                <X className="w-5 h-5" />
                Hủy
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
