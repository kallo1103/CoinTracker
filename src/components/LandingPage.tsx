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
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function LandingPage() {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const features = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: t('landing.feature1.title'),
      description: t('landing.feature1.description'),
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: t('landing.feature2.title'),
      description: t('landing.feature2.description'),
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: t('landing.feature3.title'),
      description: t('landing.feature3.description'),
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: t('landing.feature4.title'),
      description: t('landing.feature4.description'),
    },
    {
      icon: <Newspaper className="w-6 h-6" />,
      title: t('landing.feature5.title'),
      description: t('landing.feature5.description'),
    },
    {
      icon: <Shield className="w-6 h-6" />,
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
    <div className="dark min-h-screen bg-black text-white overflow-hidden selection:bg-primary/30">
      
      {/* Dark Veil Animated Background */}
      <DarkVeil />

      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">Crypto<span className="text-primary">Tracker</span></span>
        </div>
        <div>
           <AuthButton />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-center"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border-primary/20 text-primary text-sm font-medium mb-8 backdrop-blur-md">
              <Zap className="w-4 h-4 fill-primary" />
              <span>{t('landing.badge')}</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-7xl lg:text-8xl font-black mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-gray-400 bg-clip-text text-transparent">
                {t('landing.hero.title')}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p variants={fadeInUp} className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              {t('landing.hero.subtitle')}
              <br className="hidden sm:block" />
              <span className="text-sm mt-4 block text-gray-400">{t('landing.hero.description')}</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link 
                href="/app"
                className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:shadow-[0_0_40px_-10px_var(--primary)] transition-all duration-300 overflow-hidden min-w-[200px] text-center flex justify-center"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {t('landing.cta.getStarted')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
              
              <AuthButton large className="min-w-[200px]" />
            </motion.div>

            {/* Benefits List */}
            <motion.div variants={fadeInUp} className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span className="text-sm font-medium">{benefit}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-glow">
              {t('landing.features.title')}
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {t('landing.features.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group glass-card p-8 hover:border-primary/50 transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t('landing.faq.title')}</h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-semibold text-lg pr-8">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                
                <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${openFaq === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                     <p className="p-6 pt-0 text-gray-300 leading-relaxed border-t border-white/5">
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
          <div className="relative rounded-3xl overflow-hidden p-12 sm:p-20 text-center border border-white/10">
            {/* Subtle gradient overlay matching Dark Veil theme */}
            <div 
              className="absolute inset-0" 
              style={{
                background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.2) 0%, rgba(147, 51, 234, 0.2) 50%, rgba(99, 102, 241, 0.15) 100%)'
              }}
            />
            
            {/* Additional radial gradient for depth */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 70%)'
              }}
            />
            
            {/* Glassmorphism background */}
            <div className="absolute inset-0 glass-card backdrop-blur-3xl -z-10" />
            
            {/* Content */}
            <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl font-black mb-8 text-white text-glow">
                {t('landing.finalCta.title')}
              </h2>
              <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
                {t('landing.finalCta.description')}
              </p>
              
              <Link
                href="/app"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold text-lg shadow-[0_0_30px_-5px_rgba(139,92,246,0.5)] hover:shadow-[0_0_50px_-5px_rgba(139,92,246,0.8)] hover:scale-105 transition-all duration-300"
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
