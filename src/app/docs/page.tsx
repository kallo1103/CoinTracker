'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { 
  Book, 
  Code, 
  Shield, 
  BarChart2, 
  Globe, 
  HelpCircle, 
  Layers, 
  ChevronRight,
  Menu,
  X,
  CreditCard,
  TrendingUp,
  Activity
} from 'lucide-react';

const SECTIONS = [
  { id: 'introduction', label: 'Introduction', icon: Book },
  { id: 'features', label: 'Key Features', icon: Layers },
  { id: 'profile', label: 'Profile & Charts', icon: BarChart2 },
  { id: 'fear-greed', label: 'Fear & Greed', icon: Activity },
  { id: 'crypto-list', label: 'Crypto List', icon: Globe },
  { id: 'authentication', label: 'Authentication', icon: Shield },
  { id: 'api', label: 'API Reference', icon: Code },
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('introduction');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = SECTIONS.map(s => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 150; // Offset

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Header height offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen text-gray-200 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 lg:py-12 max-w-7xl">
        
        {/* Header Area */}
        <div className="mb-12 text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Documentation
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto lg:mx-0">
            Hướng dẫn chi tiết về cách sử dụng Crypto Tracker để theo dõi thị trường cryptocurrency, tích hợp API và quản lý danh mục đầu tư.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Mobile Menu Toggle */}
          <div className="lg:hidden mb-4 sticky top-20 z-30 bg-black/80 backdrop-blur-md p-4 rounded-lg border border-white/10 shadow-sm">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center justify-between w-full font-semibold text-white"
            >
              <span>{SECTIONS.find(s => s.id === activeSection)?.label || 'Menu'}</span>
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Sidebar Navigation */}
          <aside className={`
            fixed inset-0 z-40 bg-black lg:bg-transparent lg:static lg:z-auto lg:w-64 lg:flex-shrink-0
            transform transition-transform duration-300 ease-in-out lg:transform-none
            ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            p-6 lg:p-0 overflow-y-auto lg:overflow-visible
          `}>
            <div className="lg:sticky lg:top-28 space-y-1">
              <div className="flex items-center justify-between lg:hidden mb-6">
                <span className="font-bold text-xl text-white">Menu</span>
                <button onClick={() => setMobileMenuOpen(false)} className="text-white"><X size={24}/></button>
              </div>
              
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-3">
                Contents
              </p>
              
              {SECTIONS.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                      ${isActive 
                        ? 'bg-white/10 text-white shadow-sm border border-white/5' 
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                      }
                    `}
                  >
                    <Icon size={18} className={isActive ? 'text-blue-400' : 'text-gray-500'} />
                    {section.label}
                    {isActive && <ChevronRight size={16} className="ml-auto opacity-50" />}
                  </button>
                );
              })}

              <div className="mt-8 pt-8 border-t border-white/10 px-3">
                <Link 
                  href="/app"
                  className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <ChevronRight size={16} className="rotate-180" />
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0 space-y-16 lg:pb-24">
            
            {/* Introduction */}
            <section id="introduction" className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20">
                  <Book size={24} />
                </div>
                <h2 className="text-3xl font-bold text-white">Introduction</h2>
              </div>
              
              <div className="prose prose-lg prose-invert max-w-none text-gray-300 leading-relaxed">
                <p>
                  <strong className="text-white">Crypto Tracker</strong> là nền tảng theo dõi giá cryptocurrency thời gian thực hiện đại, 
                  cung cấp thông tin chi tiết và chính xác về hơn 10,000+ loại tiền điện tử từ các sàn giao dịch lớn 
                  trên toàn thế giới. Website được tối ưu hóa cho hiệu suất cao, sử dụng <span className="font-semibold text-blue-400">Next.js 14</span> và 
                  tích hợp dữ liệu trực tiếp từ CoinMarketCap API.
                </p>
                
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 shadow-sm my-6">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-white">
                    <TrendingUp size={20} className="text-green-400" />
                    Mục tiêu chính
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      'Cung cấp dữ liệu thị trường crypto chính xác',
                      'Giao diện trực quan, tối ưu Dark Mode',
                      'Phân tích kỹ thuật qua biểu đồ chuyên sâu',
                      'Hỗ trợ đa nền tảng (Mobile & Desktop)'
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-white/10" />

            {/* Key Features */}
            <section id="features" className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg border border-purple-500/20">
                  <Layers size={24} />
                </div>
                <h2 className="text-3xl font-bold text-white">Key Features</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: 'Real-time Charts', desc: 'Theo dõi biến động giá qua biểu đồ nến, Line & Area charts.', color: 'text-blue-400' },
                  { title: 'Fear & Greed Index', desc: 'Đo lường tâm lý thị trường để đưa ra quyết định đầu tư.', color: 'text-green-400' },
                  { title: 'Global Metrics', desc: 'Tổng quan thị trường, BTC Dominance, và Volume 24h.', color: 'text-indigo-400' },
                  { title: 'Portfolio Watchlist', desc: 'Lưu và theo dõi danh mục đầu tư yêu thích của bạn.', color: 'text-orange-400' },
                ].map((feature, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
                    <h3 className={`text-lg font-bold mb-2 ${feature.color}`}>
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <hr className="border-white/10" />

            {/* Profile & Charts */}
            <section id="profile" className="space-y-6">
               <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg border border-indigo-500/20">
                  <BarChart2 size={24} />
                </div>
                <h2 className="text-3xl font-bold text-white">Profile & Charts</h2>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-white">3.1. Biểu Đồ Nến (Candlestick)</h3>
                  <p className="text-gray-400 mb-4">
                    Biểu đồ nến Nhật là công cụ phân tích kỹ thuật phổ biến nhất. Mỗi nến bao gồm 4 mức giá quan trọng trong khung thời gian:
                  </p>
                  <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div className="bg-black/40 p-3 rounded shadow-sm border border-white/5">
                        <span className="block text-xs uppercase text-gray-500 mb-1">Open</span>
                        <span className="font-bold text-white">Mở Cửa</span>
                      </div>
                      <div className="bg-black/40 p-3 rounded shadow-sm border border-white/5">
                        <span className="block text-xs uppercase text-gray-500 mb-1">High</span>
                        <span className="font-bold text-green-400">Cao Nhất</span>
                      </div>
                      <div className="bg-black/40 p-3 rounded shadow-sm border border-white/5">
                        <span className="block text-xs uppercase text-gray-500 mb-1">Low</span>
                        <span className="font-bold text-red-400">Thấp Nhất</span>
                      </div>
                      <div className="bg-black/40 p-3 rounded shadow-sm border border-white/5">
                        <span className="block text-xs uppercase text-gray-500 mb-1">Close</span>
                        <span className="font-bold text-white">Đóng Cửa</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                   <h3 className="text-xl font-semibold mb-3 text-white">3.2. Công cụ hỗ trợ</h3>
                   <ul className="grid sm:grid-cols-2 gap-3">
                     {[
                       'Zoom & Pan: Kéo thả để xem chi tiết',
                       'Timeframes: 1D, 7D, 30D, 1Y',
                       'Tooltip: Hover để xem giá chi tiết',
                       'Export: Xuất biểu đồ hình ảnh'
                     ].map((item, i) => (
                       <li key={i} className="flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-200">
                         <div className="w-2 h-2 rounded-full bg-blue-500" />
                         {item}
                       </li>
                     ))}
                   </ul>
                </div>
              </div>
            </section>

             <hr className="border-white/10" />

            {/* Fear & Greed */}
            <section id="fear-greed" className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-500/10 text-green-400 rounded-lg border border-green-500/20">
                  <Activity size={24} />
                </div>
                <h2 className="text-3xl font-bold text-white">Fear & Greed Index</h2>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4 text-gray-400">
                  <p>
                    Chỉ số đo lường tâm lý thị trường từ 0-100.
                    Giúp nhận biết khi nào thị trường đang hưng phấn quá mức (có thể điều chỉnh) hoặc sợ hãi quá mức (cơ hội mua).
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-red-500/10 text-red-400 rounded border border-red-500/20">
                      <span className="font-semibold">0-25</span>
                      <span>Extreme Fear (Sợ Hãi Cực Độ)</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-500/10 text-yellow-400 rounded border border-yellow-500/20">
                      <span className="font-semibold">26-55</span>
                      <span>Neutral (Trung Lập)</span>
                    </div>
                     <div className="flex items-center justify-between p-3 bg-green-500/10 text-green-400 rounded border border-green-500/20">
                      <span className="font-semibold">56-100</span>
                      <span>Greed (Tham Lam)</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 bg-white/5 p-6 rounded-xl border border-white/10">
                  <h4 className="font-semibold mb-4 text-white">Các yếu tố cấu thành:</h4>
                  <ul className="space-y-3 text-white">
                    {[
                      { name: 'Volatility (Biến động)', val: '25%' },
                      { name: 'Market Momentum/Volume', val: '25%' },
                      { name: 'Social Media', val: '15%' },
                      { name: 'Dominance', val: '10%' },
                      { name: 'Trends', val: '10%' },
                    ].map((item, i) => (
                      <li key={i} className="flex items-center justify-between text-sm">
                        <span>{item.name}</span>
                        <span className="font-mono bg-white/10 px-2 py-0.5 rounded text-gray-300">{item.val}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

             <hr className="border-white/10" />

            {/* Crypto List */}
            <section id="crypto-list" className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-orange-500/10 text-orange-400 rounded-lg border border-orange-500/20">
                  <Globe size={24} />
                </div>
                <h2 className="text-3xl font-bold text-white">Cryptocurrency List</h2>
              </div>
            
              <div className="overflow-hidden border border-white/10 rounded-xl">
                 <table className="min-w-full divide-y divide-white/10">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Metric</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Description</th>
                      </tr>
                    </thead>
                    <tbody className="bg-transparent divide-y divide-white/10">
                      {[
                        { name: 'Name/Symbol', desc: 'Định danh của đồng coin (VD: Bitcoin - BTC)' },
                        { name: 'Price', desc: 'Giá giao dịch hiện tại (USD)' },
                        { name: '24h %', desc: 'Biến động giá trong vòng 24 giờ qua' },
                        { name: 'Market Cap', desc: 'Tổng giá trị vốn hóa (Price x Circulating Supply)' },
                        { name: 'Volume(24h)', desc: 'Tổng khối lượng giao dịch trong 24h' }
                      ].map((row, i) => (
                        <tr key={i}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{row.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{row.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                 </table>
              </div>
            </section>

             <hr className="border-white/10" />

            {/* Authentication */}
            <section id="authentication" className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-red-500/10 text-red-400 rounded-lg border border-red-500/20">
                  <Shield size={24} />
                </div>
                <h2 className="text-3xl font-bold text-white">Authentication</h2>
              </div>
               
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/5 p-6 rounded-xl border border-white/10 transition-colors">
                  <h3 className="text-xl font-semibold mb-4 text-blue-400">Methods</h3>
                  <ul className="space-y-4">
                     <li className="flex gap-4">
                       <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm">1</span>
                       <div>
                         <p className="font-semibold text-white">Google OAuth</p>
                         <p className="text-sm text-gray-400">Đăng nhập nhanh chóng và bảo mật thông qua tài khoản Google.</p>
                       </div>
                     </li>
                     <li className="flex gap-4">
                       <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm">2</span>
                       <div>
                         <p className="font-semibold text-white">Credentials</p>
                         <p className="text-sm text-gray-400">Đăng ký truyền thống với Email và Password (được mã hóa).</p>
                       </div>
                     </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <CreditCard size={20} />
                    Premium Benefits
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'Watchlist không giới hạn',
                      'Cảnh báo giá (Price Alerts) realtime',
                      'Báo cáo Portfolio nâng cao',
                      'Không quảng cáo'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-white/90">
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

             <hr className="border-white/10" />

            {/* API Reference */}
            <section id="api" className="space-y-6">
               <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-pink-500/10 text-pink-400 rounded-lg border border-pink-500/20">
                  <Code size={24} />
                </div>
                <h2 className="text-3xl font-bold text-white">API Reference</h2>
              </div>

               <p className="text-gray-400">
                 Crypto Tracker cung cấp RESTful API cho phép developers truy cập dữ liệu thị trường.
               </p>

               <div className="space-y-4">
                 <div className="rounded-lg overflow-hidden border border-white/10">
                   <div className="bg-white/10 p-3 flex items-center gap-3 border-b border-white/10" >
                     <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">GET</span>
                     <code className="text-sm font-mono text-white">/api/crypto</code>
                   </div>
                   <div className="p-4 bg-white/5">
                     <p className="text-sm text-gray-400 mb-2">Lấy danh sách tiền điện tử.</p>
                     <div className="bg-black/80 rounded p-3 text-xs font-mono text-green-400 overflow-x-auto">
                       {`{
  "data": [
    { "id": "bitcoin", "symbol": "BTC", "price": 45000.00 }
  ]
}`}
                     </div>
                   </div>
                 </div>

                  <div className="rounded-lg overflow-hidden border border-white/10">
                   <div className="bg-white/10 p-3 flex items-center gap-3 border-b border-white/10" >
                     <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">GET</span>
                     <code className="text-sm font-mono text-white">/api/fear-greed</code>
                   </div>
                   <div className="p-4 bg-white/5">
                     <p className="text-sm text-gray-400 mb-2">Lấy chỉ số Fear & Greed hiện tại.</p>
                   </div>
                 </div>
               </div>
            </section>

             <hr className="border-white/10" />

            {/* FAQ */}
            <section id="faq" className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-yellow-500/10 text-yellow-500 rounded-lg border border-yellow-500/20">
                  <HelpCircle size={24} />
                </div>
                <h2 className="text-3xl font-bold text-white">FAQ</h2>
              </div>
              
              <div className="grid gap-4">
                {[
                  { q: "Dữ liệu được cập nhật bao lâu một lần?", a: "Giá và thông tin được cập nhật mỗi 60 giây từ các nguồn dữ liệu tin cậy." },
                  { q: "Website có hỗ trợ giao dịch không?", a: "Không, đây chỉ là công cụ theo dõi. Bạn cần sử dụng sàn giao dịch (như Binance, Coinbase) để mua bán." },
                  { q: "Làm sao để thêm vào Watchlist?", a: "Nhấn vào biểu tượng ngôi sao bên cạnh tên đồng coin. Bạn cần đăng nhập để sử dụng tính năng này." }
                ].map((item, idx) => (
                  <details key={idx} className="group bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                    <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-white hover:bg-white/10 transition-colors">
                      {item.q}
                      <span className="transition-transform group-open:rotate-180 text-gray-400">
                        <ChevronRight size={16} />
                      </span>
                    </summary>
                    <div className="px-4 pb-4 pt-0 text-gray-400 text-sm">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </section>

          </main>
        </div>
        
        {/* Footer for Docs */}
        <footer className="mt-24 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
          <p>© 2025 Crypto Tracker Documentation. Built with Next.js & Tailwind CSS.</p>
        </footer>
      </div>
    </div>
  );
}
