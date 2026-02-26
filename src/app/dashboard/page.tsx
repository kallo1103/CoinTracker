"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import CryptoSearch from "@/components/CryptoSearch";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "motion/react";
import {
  Check,
  Mail,
  Search,
  User,
  Settings,
  BarChart2,
  ChevronLeft,
  LogOut
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (!session) return null;

  const quickActions = [
    {
      icon: <User className="w-5 h-5" />,
      title: t('dashboard.profile'),
      description: t('profile.manageInfo'),
      iconBg: 'bg-indigo-500/15 text-indigo-400',
      href: '/profile',
    },
    {
      icon: <Settings className="w-5 h-5" />,
      title: t('dashboard.settings'),
      description: t('profile.customizeAccount'),
      iconBg: 'bg-purple-500/15 text-purple-400',
      href: '/profile/settings',
    },
    {
      icon: <BarChart2 className="w-5 h-5" />,
      title: t('profile.statistics'),
      description: t('profile.viewActivity'),
      iconBg: 'bg-emerald-500/15 text-emerald-400',
      href: '/profile/statistics',
    },
  ];

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Welcome */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            🎉 {t('dashboard.welcome')}
          </h1>
          <p className="text-gray-400">{t('dashboard.loginSuccess')}</p>
        </motion.div>

        {/* User Card */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.1 }}
          className="web3-card overflow-hidden"
        >
          {/* Card header gradient */}
          <div className="bg-gradient-to-r from-indigo-600/30 to-purple-600/30 px-8 py-5 border-b border-white/[0.06]">
            <h2 className="text-xl font-bold text-white">{t('dashboard.accountInfo')}</h2>
          </div>

          {/* Card body */}
          <div className="p-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || "User avatar"}
                    width={100}
                    height={100}
                    className="rounded-full ring-2 ring-indigo-500/30"
                    unoptimized
                  />
                ) : (
                  <div className="w-[100px] h-[100px] rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold ring-2 ring-indigo-500/30">
                    {session.user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-7 h-7 rounded-full border-3 border-black flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-white" />
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-2xl font-bold text-white mb-1">
                  {session.user?.name || "User"}
                </h3>
                <p className="text-gray-400 mb-4 flex items-center justify-center sm:justify-start gap-2 text-sm">
                  <Mail className="w-4 h-4" />
                  {session.user?.email}
                </p>

                <div className="flex gap-3 justify-center sm:justify-start">
                  <div className="bg-indigo-500/10 px-3.5 py-2 rounded-xl border border-indigo-500/10">
                    <p className="text-[10px] text-indigo-400 font-medium uppercase tracking-wider">{t('profile.status')}</p>
                    <p className="text-sm font-bold text-indigo-300">{t('profile.active')}</p>
                  </div>
                  <div className="bg-purple-500/10 px-3.5 py-2 rounded-xl border border-purple-500/10">
                    <p className="text-[10px] text-purple-400 font-medium uppercase tracking-wider">{t('dashboard.accountType')}</p>
                    <p className="text-sm font-bold text-purple-300">{t('dashboard.premium')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
          className="web3-card p-8 relative z-50"
        >
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl mb-3 border border-indigo-500/10">
              <Search className="h-6 w-6 text-indigo-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">
              {t('profile.searchCrypto')}
            </h2>
            <p className="text-gray-400 text-sm">{t('profile.searchCryptoDesc')}</p>
          </div>
          <div className="flex justify-center">
            <CryptoSearch />
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <motion.button
              key={action.title}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: 0.3 + index * 0.05 }}
              onClick={() => router.push(action.href)}
              className="metric-card text-left group cursor-pointer"
            >
              <div className={`inline-flex p-2.5 rounded-xl ${action.iconBg} mb-4 group-hover:scale-110 transition-transform duration-200`}>
                {action.icon}
              </div>
              <h3 className="font-bold text-white mb-1 text-sm">{action.title}</h3>
              <p className="text-xs text-gray-500">{action.description}</p>
            </motion.button>
          ))}
        </div>

        {/* Action Buttons */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <button
            onClick={() => router.push("/app")}
            className="group px-6 py-3 web3-card hover:border-indigo-500/20 font-medium text-indigo-400 transition-all duration-200"
          >
            <span className="flex items-center justify-center gap-2">
              <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              {t('dashboard.backToDashboard')}
            </span>
          </button>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="group px-6 py-3 bg-red-500/10 border border-red-500/20 rounded-2xl font-medium text-red-400 hover:bg-red-500/15 hover:border-red-500/30 transition-all duration-200"
          >
            <span className="flex items-center justify-center gap-2">
              {t('auth.signout')}
              <LogOut className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
