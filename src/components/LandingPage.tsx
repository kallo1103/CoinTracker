'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { 
  BarChart3, 
  Search, 
  Building2, 
  Newspaper, 
  TrendingUp, 
  Shield, 
  Zap,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import AuthButton from './AuthButton';

export default function LandingPage() {
  const { t } = useLanguage();

  const features = [
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: t('landing.feature1.title'),
      description: t('landing.feature1.description'),
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: t('landing.feature2.title'),
      description: t('landing.feature2.description'),
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: t('landing.feature3.title'),
      description: t('landing.feature3.description'),
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: t('landing.feature4.title'),
      description: t('landing.feature4.description'),
    },
    {
      icon: <Newspaper className="w-8 h-8" />,
      title: t('landing.feature5.title'),
      description: t('landing.feature5.description'),
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: t('landing.feature6.title'),
      description: t('landing.feature6.description'),
    },
  ];

  const benefits = [
    t('landing.benefit1'),
    t('landing.benefit2'),
    t('landing.benefit3'),
    t('landing.benefit4'),
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-8">
              <Zap className="w-4 h-4" />
              <span>{t('landing.badge')}</span>
            </div>

            {/* Main Heading */}
            <h1 className="py-1 text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {t('landing.hero.title')}
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-4 max-w-2xl mx-auto">
              {t('landing.hero.subtitle')}
            </p>

            <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
              {t('landing.hero.description')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                href="/app"
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
              >
                <span>{t('landing.cta.getStarted')}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <div className="">
                <AuthButton large />
              </div>
            </div>

            {/* Benefits List */}
            <div className="hidden lg:flex flex-row justify-center items-center gap-8 max-w-4xl mx-auto">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center gap-2 text-gray-700"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {t('landing.features.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('landing.features.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              {t('landing.finalCta.title')}
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              {t('landing.finalCta.description')}
            </p>
            <Link
              href="/app"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <span>{t('landing.cta.exploreNow')}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-12">
            {t('landing.faq.title')}
          </h2>
            <div className="space-y-8 text-left">
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-white mb-3">
                  {t('landing.faq.q1.question')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('landing.faq.q1.answer')}
                </p>
              </div>
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-white mb-3">
                  {t('landing.faq.q2.question')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('landing.faq.q2.answer')}
                </p>
              </div>
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-white mb-3">
                  {t('landing.faq.q3.question')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('landing.faq.q3.answer')}
                </p>
              </div>
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-white mb-3">
                  {t('landing.faq.q4.question')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('landing.faq.q4.answer')}
                </p>
              </div>
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-white mb-3">
                  {t('landing.faq.q5.question')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('landing.faq.q5.answer')}
                </p>
              </div>
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-white mb-3">
                  {t('landing.faq.q6.question')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('landing.faq.q6.answer')}
                </p>
              </div>
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-white mb-3">
                  {t('landing.faq.q7.question')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('landing.faq.q7.answer')}
                </p>
              </div>
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-white mb-3">
                  {t('landing.faq.q8.question')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('landing.faq.q8.answer')}
                </p>
              </div>
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-white mb-3">
                  {t('landing.faq.q9.question')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('landing.faq.q9.answer')}
                </p>
              </div>
            </div>
          </div>
      </section>
    </div>
  );
}

