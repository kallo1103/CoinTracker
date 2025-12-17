'use client';

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import MetaMaskButton from "./MetaMaskButton";
import { useState, useEffect } from "react";
import { useNavbar } from "@/contexts/NavbarContext";
import { LogIn, X } from "lucide-react";
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { createPortal } from "react-dom";

type AuthMode = 'LOGIN' | 'REGISTER' | 'FORGOT_PASSWORD';

export default function AuthButton({ large, className = '' }: { large?: boolean; className?: string }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const { isCollapsed } = useNavbar();
  
  const [mode, setMode] = useState<AuthMode>('LOGIN');
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    email: '', password: '', name: '', phoneNumber: '', otp: '', newPassword: ''
  });
  
  // OTP State
  const [confirmResult, setConfirmResult] = useState<ConfirmationResult | null>(null);
  const [otpSent, setOtpSent] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showModal) setShowModal(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [showModal]);

  // Prevent body scroll & Reset State
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      // Reset state on close
      setMode('LOGIN');
      setOtpSent(false);
      setConfirmResult(null);
      setFormData({ email: '', password: '', name: '', phoneNumber: '', otp: '', newPassword: '' });
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [showModal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- ACTIONS ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });
      if (res?.error) alert(res.error);
      else window.location.reload();
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          phoneNumber: formData.phoneNumber
        }),
      });
      
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }
      
      await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });
      window.location.reload();
    } catch (err) { 
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An unknown error occurred");
      }
    } 
    finally { setLoading(false); }
  };

  const onCaptchVerify = () => {
    if (!auth) {
      alert("Firebase chưa được cấu hình. Không thể gửi OTP.");
      return;
    }
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': () => {},
      });
    }
  };

  const handleSendOtp = async () => {
    if (!auth) {
      alert("Firebase chưa được cấu hình. Vui lòng liên hệ quản trị viên.");
      return;
    }
    if (!formData.phoneNumber) {
      alert("Vui lòng nhập số điện thoại");
      return;
    }
    setLoading(true);
    onCaptchVerify();
    const appVerifier = window.recaptchaVerifier;
    // Format basic VN phone
    const formatPh = formData.phoneNumber.startsWith('+')
      ? formData.phoneNumber
      : "+84" + formData.phoneNumber.replace(/^0/, '');

    try {
      const confirmationResult = await signInWithPhoneNumber(auth, formatPh, appVerifier);
      setConfirmResult(confirmationResult);
      setOtpSent(true);
      alert("Mã OTP đã được gửi!");
    } catch (error) {
      console.error(error);
      alert("Lỗi gửi OTP. Hãy kiểm tra số điện thoại hoặc cấu hình Firebase.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtpAndReset = async () => {
    if (!confirmResult) return;
    setLoading(true);
    try {
      await confirmResult.confirm(formData.otp);
      const res = await fetch("/api/user/reset-password", {
        method: "POST",
        body: JSON.stringify({ 
          phoneNumber: formData.phoneNumber,
          newPassword: formData.newPassword 
        })
      });

      if (res.ok) {
        alert("Đổi mật khẩu thành công! Vui lòng đăng nhập lại.");
        setMode('LOGIN');
      } else {
        alert("Lỗi cập nhật mật khẩu.");
      }
    } catch {
      alert("Mã OTP không đúng.");
    } finally {
      setLoading(false);
    }
  };

  // Loading UI
  if (status === "loading") {
    return (
      <div className={`flex items-center gap-2 bg-white/5 rounded-xl animate-pulse border border-white/10 ${
        isCollapsed ? 'p-2 justify-center' : 'px-4 py-2 w-full'
      }`}>
        <div className="w-8 h-8 bg-white/10 rounded-full"></div>
        {!isCollapsed && <div className="w-20 h-4 bg-white/10 rounded"></div>}
      </div>
    );
  }

  // Logged In UI
  if (session) {
    return (
      <button
        onClick={() => router.push("/profile")}
        className={`
          flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/30 
          rounded-xl transition-all duration-300 group
          ${isCollapsed ? 'p-2 justify-center' : 'w-full px-4 py-3'}
        `}
        title={isCollapsed ? `Profile - ${session.user?.name}` : ''}
      >
        {session.user?.image ? (
          <Image
            src={session.user.image}
            alt={session.user.name || "User"}
            width={32}
            height={32}
            className="rounded-full ring-2 ring-transparent group-hover:ring-blue-500/50 transition-all"
            unoptimized
          />
        ) : (
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/20">
            {session.user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
        )}
        
        {!isCollapsed && (
          <div className="flex flex-col items-start overflow-hidden">
            <span className="text-sm font-medium text-slate-200 truncate max-w-[120px] group-hover:text-white transition-colors">
              {session.user?.name || 'User'}
            </span>
          </div>
        )}
      </button>
    );
  }

  // Not Logged In UI
  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={`
          flex items-center justify-center transition-all duration-300
          ${isCollapsed 
            ? 'w-12 h-12 p-0 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-900/20 hover:shadow-blue-500/30' 
            : large
              ? 'group relative px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:shadow-[0_0_40px_-10px_var(--primary)] overflow-hidden'
              : 'w-full px-6 py-3 gap-2 font-medium rounded-xl hover:-translate-y-0.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-900/20 hover:shadow-blue-500/30'
          } ${className}
        `}
        title={isCollapsed ? "Sign in" : ''}
      >
        {large ? (
          <>
            <span className="relative z-10 flex items-center justify-center gap-2">
              <LogIn size={20} />
              Sign In
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </>
        ) : (
          <>
            <LogIn size={20} />
            {!isCollapsed && "Sign In"}
          </>
        )}
      </button>

      {/* Modal Overlay - Rendered via Portal to ensure it's centered on screen, not sidebar */}
      {showModal && typeof window !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          {/* Modal Content */}
          <div
            className="relative w-full max-w-md animate-in zoom-in-95 fade-in duration-200 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-4 sm:p-6 overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-white font-bold text-lg sm:text-xl">
                  {mode === 'LOGIN' && 'Sign In'}
                  {mode === 'REGISTER' && 'Create Account'}
                  {mode === 'FORGOT_PASSWORD' && 'Reset Password'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-slate-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg flex-shrink-0"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Main Content */}
              <div className="flex flex-col gap-3 sm:gap-4">
                
                {mode === 'LOGIN' && (
                  <form onSubmit={handleLogin} className="flex flex-col gap-3">
                    <input 
                      name="email" 
                      placeholder="Email" 
                      onChange={handleChange} 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none" 
                      required 
                    />
                    <input 
                      type="password" 
                      name="password" 
                      placeholder="Password" 
                      onChange={handleChange} 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none" 
                      required 
                    />
                    <button 
                      type="submit" 
                      disabled={loading} 
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {loading ? "Loading..." : "Login"}
                    </button>
                    {auth && (
                      <button
                        type="button"
                        onClick={() => setMode('FORGOT_PASSWORD')}
                        className="text-sm text-blue-400 hover:text-blue-300 text-left"
                      >
                        Forgot password?
                      </button>
                    )}
                  </form>
                )}

                {mode === 'REGISTER' && (
                  <form onSubmit={handleRegister} className="flex flex-col gap-3">
                    <input 
                      name="name" 
                      placeholder="Full Name" 
                      onChange={handleChange} 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none" 
                      required 
                    />
                    <input 
                      name="email" 
                      placeholder="Email" 
                      onChange={handleChange} 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none" 
                      required 
                    />
                    <input 
                      name="phoneNumber" 
                      placeholder="Phone Number (for password reset)" 
                      onChange={handleChange} 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none" 
                    />
                    <input 
                      type="password" 
                      name="password" 
                      placeholder="Password" 
                      onChange={handleChange} 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none" 
                      required 
                    />
                    <button 
                      type="submit" 
                      disabled={loading} 
                      className="w-full bg-green-600 hover:bg-green-500 text-white font-medium py-2 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {loading ? "Creating..." : "Register"}
                    </button>
                  </form>
                )}

                {mode === 'FORGOT_PASSWORD' && auth && (
                  <div className="flex flex-col gap-3">
                    {!otpSent ? (
                      <>
                        <input
                          name="phoneNumber"
                          placeholder="Enter Phone Number"
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none"
                        />
                        <div id="recaptcha-container"></div>
                        <button
                          onClick={handleSendOtp}
                          disabled={loading}
                          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-lg transition-colors disabled:opacity-50"
                        >
                          {loading ? "Sending OTP..." : "Send OTP"}
                        </button>
                      </>
                    ) : (
                      <>
                        <input
                          name="otp"
                          placeholder="Enter OTP Code"
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none"
                        />
                        <input
                          type="password"
                          name="newPassword"
                          placeholder="New Password"
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none"
                        />
                        <button
                          onClick={handleVerifyOtpAndReset}
                          disabled={loading}
                          className="w-full bg-purple-600 hover:bg-purple-500 text-white font-medium py-2 rounded-lg transition-colors disabled:opacity-50"
                        >
                          {loading ? "Verifying..." : "Confirm Reset"}
                        </button>
                      </>
                    )}
                  </div>
                )}

                {mode === 'FORGOT_PASSWORD' && !auth && (
                  <div className="text-center text-sm text-slate-400 p-4">
                    Password reset via phone is not available. Please contact support for password recovery.
                  </div>
                )}

                <div className="text-center text-sm mt-2 text-slate-400">
                  {mode === 'LOGIN' ? (
                    <p>Don&apos;t have an account? <button onClick={() => setMode('REGISTER')} className="text-blue-400 hover:text-blue-300 ml-1">Register</button></p>
                  ) : (
                    <p>Already have an account? <button onClick={() => setMode('LOGIN')} className="text-blue-400 hover:text-blue-300 ml-1">Login</button></p>
                  )}
                </div>

                <div className="relative my-2">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10"></span></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-slate-900 px-2 text-slate-500">Or continue with</span></div>
                </div>
                
                <button
                  onClick={() => signIn("google", { callbackUrl: "/profile" })}
                  className="flex items-center justify-center gap-3 w-full bg-white hover:bg-gray-50 text-slate-900 font-medium px-4 py-2.5 sm:py-3 rounded-xl transition-all hover:scale-[1.02] shadow-lg text-sm sm:text-base"
                >
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  <span className="truncate">Continue with Google</span>
                </button>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <div className="h-px bg-white/10 flex-1"></div>
                  <span>OR</span>
                  <div className="h-px bg-white/10 flex-1"></div>
                </div>

                <MetaMaskButton onConnect={(address) => {
                  console.log("Connected:", address);
                  setShowModal(false);
                }} />
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}