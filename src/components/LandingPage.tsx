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
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import AuthButton from './AuthButton';
import DarkVeil from './DarkVeil';
import { motion } from 'motion/react';
import { useState } from 'react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function LandingPage() {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const features = [
    { icon: <BarChart3 className="w-5 h-5" />, title: t('landing.feature1.title'), description: t('landing.feature1.description') },
    { icon: <TrendingUp className="w-5 h-5" />, title: t('landing.feature2.title'), description: t('landing.feature2.description') },
    { icon: <Search className="w-5 h-5" />, title: t('landing.feature3.title'), description: t('landing.feature3.description') },
    { icon: <Building2 className="w-5 h-5" />, title: t('landing.feature4.title'), description: t('landing.feature4.description') },
    { icon: <Newspaper className="w-5 h-5" />, title: t('landing.feature5.title'), description: t('landing.feature5.description') },
    { icon: <Shield className="w-5 h-5" />, title: t('landing.feature6.title'), description: t('landing.feature6.description') },
  ];

  const benefits = [
    t('landing.benefit1'),
    t('landing.benefit2'),
    t('landing.benefit3'),
    t('landing.benefit4'),
  ];

  const faqs = [
    { q: t('landing.faq.q1.question'), a: t('landing.faq.q1.answer') },
    { q: t('landing.faq.q2.question'), a: t('landing.faq.q2.answer') },
    { q: t('landing.faq.q3.question'), a: t('landing.faq.q3.answer') },
    { q: t('landing.faq.q4.question'), a: t('landing.faq.q4.answer') },
    { q: t('landing.faq.q5.question'), a: t('landing.faq.q5.answer') },
    { q: t('landing.faq.q6.question'), a: t('landing.faq.q6.answer') },
    { q: t('landing.faq.q7.question'), a: t('landing.faq.q7.answer') },
    { q: t('landing.faq.q8.question'), a: t('landing.faq.q8.answer') },
    { q: t('landing.faq.q9.question'), a: t('landing.faq.q9.answer') },
  ];

  return (
    <div className="dark min-h-screen bg-[#060010] text-white overflow-hidden selection:bg-indigo-500/30 grain-overlay">
      <DarkVeil />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/40 backdrop-blur-2xl border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">
            Crypto{' '}<span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Tracker</span>
          </span>
        </div>
        <AuthButton />
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-36 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-center"
          >
            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-8 backdrop-blur-md"
            >
              <Zap className="w-3.5 h-3.5 fill-indigo-400" />
              <span>{t('landing.badge')}</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-7xl lg:text-8xl font-black mb-6 tracking-tight leading-[0.95]"
            >
              <span className="bg-gradient-to-b from-white via-white/90 to-gray-400 bg-clip-text text-transparent">
                {t('landing.hero.title')}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl text-gray-300/80 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              {t('landing.hero.subtitle')}
              <br className="hidden sm:block" />
              <span className="text-sm mt-3 block text-gray-500">{t('landing.hero.description')}</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href="/app"
                className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-lg hover:shadow-[0_0_50px_-12px_rgba(99,102,241,0.6)] transition-all duration-300 overflow-hidden min-w-[200px] text-center flex justify-center"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {t('landing.cta.getStarted')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>

              <AuthButton large className="min-w-[200px]" />
            </motion.div>

            {/* Benefits */}
            <motion.div variants={fadeInUp} className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-medium">{benefit}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Separator */}
      <div className="neon-line max-w-5xl mx-auto opacity-40" />

      {/* Features Section */}
      <section className="relative z-10 py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold mb-5">
              <span className="text-glow-sm text-white">{t('landing.features.title')}</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              {t('landing.features.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group web3-card p-7 hover:border-indigo-500/20 transition-all duration-300"
              >
                <div className="w-11 h-11 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 mb-5 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-indigo-500/25">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 text-white group-hover:text-indigo-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">{t('landing.faq.title')}</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="web3-card overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.03] transition-colors"
                >
                  <span className="font-semibold text-[15px] pr-8 text-gray-200">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 flex-shrink-0 ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>

                <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${openFaq === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <p className="p-5 pt-0 text-sm text-gray-400 leading-relaxed border-t border-white/[0.04]">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden p-12 sm:p-20 text-center">
            {/* Multi-layered gradient background */}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(147, 51, 234, 0.15) 50%, rgba(99, 102, 241, 0.1) 100%)' }}
            />
            <div
              className="absolute inset-0"
              style={{ background: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.12) 0%, transparent 70%)' }}
            />
            <div className="absolute inset-0 web3-card backdrop-blur-3xl -z-10" />

            <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl font-black mb-8 text-white text-glow-sm">
                {t('landing.finalCta.title')}
              </h2>
              <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
                {t('landing.finalCta.description')}
              </p>

              <Link
                href="/app"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-[0_0_40px_-8px_rgba(139,92,246,0.4)] hover:shadow-[0_0_60px_-8px_rgba(139,92,246,0.6)] hover:scale-105 transition-all duration-300"
              >
                <span>{t('landing.cta.exploreNow')}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
