// Trang Tài Liệu - Documentation Page
import Link from 'next/link';

export default function DocsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-4">Documentation</h1>
        <p className="text-xl text-gray-600">
          Hướng dẫn chi tiết về cách sử dụng Crypto Tracker để theo dõi thị trường cryptocurrency
        </p>
      </div>

      {/* Navigation */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Table of Contents</h2>
        <ul className="space-y-2">
          <li><a href="#gioi-thieu" className="text-gray-700 dark:text-gray-300 hover:underline">1. Introduction</a></li>
          <li><a href="#tinh-nang" className="text-blue-600 hover:underline">2. Key Features</a></li>
          <li><a href="#profile" className="text-blue-600 hover:underline">3. Profile & Charts</a></li>
          <li><a href="#fear-greed" className="text-blue-600 hover:underline">4. Fear & Greed Index</a></li>
          <li><a href="#crypto-list" className="text-blue-600 hover:underline">5. Cryptocurrency List</a></li>
          <li><a href="#authentication" className="text-blue-600 hover:underline">6. Authentication & Account</a></li>
          <li><a href="#api" className="text-blue-600 hover:underline">7. API Reference</a></li>
          <li><a href="#faq" className="text-blue-600 hover:underline">8. FAQ</a></li>
        </ul>
      </div>

      {/* Nội dung chính */}
      <div className="space-y-12">
        
        {/* 1. Introduction */}
        <section id="gioi-thieu">
          <h2 className="text-3xl font-bold mb-4 border-b-2 border-gray-300 pb-2">1. Introduction</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong>Crypto Tracker</strong> là nền tảng theo dõi giá cryptocurrency thời gian thực, 
              cung cấp thông tin chi tiết về hơn 10,000+ loại tiền điện tử từ các sàn giao dịch 
              trên toàn thế giới. Website được xây dựng bằng <span className="font-semibold">Next.js 14</span>, 
              tích hợp dữ liệu từ CoinMarketCap API.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 my-4">
              <p className="font-semibold mb-2">Objectives:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Cung cấp dữ liệu thị trường crypto chính xác, cập nhật liên tục</li>
                <li>Giao diện thân thiện, dễ sử dụng cho mọi đối tượng</li>
                <li>Phân tích xu hướng thị trường qua biểu đồ trực quan</li>
                <li>Hỗ trợ đa thiết bị (desktop, tablet, mobile)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 2. Key Features */}
        <section id="tinh-nang">
          <h2 className="text-3xl font-bold mb-4 border-b-2 border-gray-300 pb-2">2. Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-blue-600">Real-time Charts</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Theo dõi biến động giá qua các loại biểu đồ: Area Chart, Line Chart, 
                và Candlestick Chart. Hỗ trợ nhiều khung thời gian từ 24h đến 1 năm.
              </p>
            </div>

            <div className="border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-green-600">Fear & Greed Index</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Đo lường tâm lý thị trường từ &quot;Extreme Fear&quot; đến &quot;Extreme Greed&quot;. 
                Giúp nhà đầu tư đưa ra quyết định thông minh hơn.
              </p>
            </div>

            <div className="border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-purple-600">Global Metrics</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Tổng giá trị thị trường, khối lượng giao dịch 24h, Bitcoin Dominance, 
                và số lượng cryptocurrency đang hoạt động.
              </p>
            </div>

            <div className="border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-orange-600">Xác Thực Người Dùng</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Đăng nhập bằng Google OAuth hoặc tài khoản Credentials. 
                Lưu danh sách yêu thích và nhận thông báo giá.
              </p>
            </div>

            <div className="border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-red-600">Top Cryptocurrencies</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Xem danh sách top crypto theo vốn hóa thị trường, thay đổi giá 24h, 
                khối lượng giao dịch với tính năng sắp xếp và tìm kiếm.
              </p>
            </div>

            <div className="border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-indigo-600">Biểu Đồ Dominance</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Pie Chart hiển thị tỷ lệ thống trị của Bitcoin, Ethereum và 
                các altcoin khác trong tổng vốn hóa thị trường.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Dashboard & Charts */}
        <section id="profile">
          <h2 className="text-3xl font-bold mb-4 border-b-2 border-gray-300 pb-2">3. Profile & Charts</h2>
          
          <h3 className="text-2xl font-semibold mb-3 mt-6">3.1. Biểu Đồ Nến (Candlestick Chart)</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Biểu đồ nến Nhật là công cụ phân tích kỹ thuật phổ biến nhất trong giao dịch cryptocurrency. 
            Mỗi cây nến đại diện cho một khung thời gian (1 giờ, 4 giờ, 1 ngày) với 4 thông số:
          </p>
          <ul className="list-disc ml-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Open (Giá Mở Cửa):</strong> Giá bắt đầu của khung thời gian</li>
            <li><strong>High (Giá Cao Nhất):</strong> Giá cao nhất đạt được trong khung</li>
            <li><strong>Low (Giá Thấp Nhất):</strong> Giá thấp nhất trong khung thời gian</li>
            <li><strong>Close (Giá Đóng Cửa):</strong> Giá kết thúc khung thời gian</li>
          </ul>
          <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-500 p-4 my-4">
            <p className="font-semibold mb-2">Mẹo Đọc Biểu Đồ Nến:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li><span className="text-green-600 font-semibold">Nến xanh (tăng):</span> Giá đóng cửa cao hơn giá mở cửa</li>
              <li><span className="text-red-600 font-semibold">Nến đỏ (giảm):</span> Giá đóng cửa thấp hơn giá mở cửa</li>
              <li><strong>Bóng (wick):</strong> Độ dài bóng trên/dưới cho biết mức độ biến động</li>
            </ul>
          </div>

          <h3 className="text-2xl font-semibold mb-3 mt-6">3.2. Biểu Đồ Đường & Area</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Biểu đồ đường (Line Chart) và diện tích (Area Chart) hiển thị xu hướng giá 
            theo thời gian một cách đơn giản, dễ nhìn. Phù hợp để:
          </p>
          <ul className="list-disc ml-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Xem xu hướng tổng thể (uptrend, downtrend, sideways)</li>
            <li>So sánh giá giữa nhiều cryptocurrency</li>
            <li>Phát hiện mức hỗ trợ (support) và kháng cự (resistance)</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-3 mt-6">3.3. Tùy Chỉnh Biểu Đồ</h3>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>Chọn khung thời gian:</strong> 1 ngày, 7 ngày, 30 ngày, 90 ngày, 1 năm</li>
              <li><strong>Zoom & Pan:</strong> Phóng to/thu nhỏ bằng cách kéo trên biểu đồ</li>
              <li><strong>Tooltip:</strong> Di chuột qua biểu đồ để xem chi tiết giá tại từng điểm</li>
              <li><strong>Export:</strong> Xuất biểu đồ dưới dạng PNG hoặc SVG (hover vào góc phải biểu đồ)</li>
            </ul>
          </div>
        </section>

        {/* 4. Fear & Greed Index */}
        <section id="fear-greed">
          <h2 className="text-3xl font-bold mb-4 border-b-2 border-gray-300 pb-2">4. Fear & Greed Index</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Chỉ số Fear & Greed (Sợ hãi & Tham lam) đo lường tâm lý chung của thị trường crypto 
            trên thang điểm từ 0 đến 100. Chỉ số được tính toán dựa trên 5 yếu tố:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-bold mb-2">Biến động giá (Volatility)</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Biến động cao → Sợ hãi; Biến động thấp → Tham lam
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-bold mb-2">Momentum thị trường</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                So sánh khối lượng giao dịch hiện tại với trung bình
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-bold mb-2">Google Trends</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Lượng tìm kiếm các từ khóa liên quan đến crypto
              </p>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <h4 className="font-bold mb-2">Mạng xã hội</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Phân tích sentiment trên Twitter, Reddit, Telegram
              </p>
            </div>
            <div className="border-l-4 border-red-500 pl-4">
              <h4 className="font-bold mb-2">Bitcoin Dominance</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Tỷ lệ vốn hóa Bitcoin so với tổng thị trường
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3">Cách Đọc Chỉ Số:</h3>
          <div className="space-y-3">
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-300 rounded-lg p-4">
              <strong className="text-red-700 dark:text-red-400">0-25: Extreme Fear (Sợ Hãi Cực Độ)</strong>
              <p className="text-sm mt-1">Nhà đầu tư lo lắng. Có thể là cơ hội mua vào tốt.</p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/30 border border-orange-300 rounded-lg p-4">
              <strong className="text-orange-700 dark:text-orange-400">26-45: Fear (Sợ Hãi)</strong>
              <p className="text-sm mt-1">Thị trường bi quan, giá có thể giảm nhẹ.</p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-300 rounded-lg p-4">
              <strong className="text-yellow-700 dark:text-yellow-400">46-55: Neutral (Trung Lập)</strong>
              <p className="text-sm mt-1">Thị trường cân bằng, chưa có xu hướng rõ ràng.</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/30 border border-green-300 rounded-lg p-4">
              <strong className="text-green-700 dark:text-green-400">56-75: Greed (Tham Lam)</strong>
              <p className="text-sm mt-1">Nhà đầu tư lạc quan, giá có thể tăng tiếp.</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/30 border border-purple-300 rounded-lg p-4">
              <strong className="text-purple-700 dark:text-purple-400">76-100: Extreme Greed (Tham Lam Cực Độ)</strong>
              <p className="text-sm mt-1">Thị trường quá nóng, cảnh báo bong bóng. Cân nhắc chốt lời.</p>
            </div>
          </div>
        </section>

        {/* 5. Danh Sách Crypto */}
        <section id="crypto-list">
          <h2 className="text-3xl font-bold mb-4 border-b-2 border-gray-300 pb-2">5. Cryptocurrency List</h2>
          
          <h3 className="text-2xl font-semibold mb-3">5.1. Thông Tin Hiển Thị</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Bảng danh sách cryptocurrency hiển thị các thông tin quan trọng:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border border-gray-300 dark:border-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Cột</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Mô Tả</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">#</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Xếp hạng theo vốn hóa thị trường</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Name</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Tên và ký hiệu (symbol) của cryptocurrency</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Price</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Giá hiện tại (USD)</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">24h %</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Thay đổi giá trong 24h (màu xanh = tăng, đỏ = giảm)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">7d %</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Thay đổi giá trong 7 ngày</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-900">
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Market Cap</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Vốn hóa thị trường (Price × Circulating Supply)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold">Volume(24h)</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Khối lượng giao dịch trong 24 giờ</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-semibold mb-3">5.2. Sắp Xếp & Lọc</h3>
          <ul className="list-disc ml-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Click vào tiêu đề cột để sắp xếp (tăng dần/giảm dần)</li>
            <li>Sử dụng ô tìm kiếm để lọc theo tên hoặc ký hiệu</li>
            <li>Lọc theo thay đổi giá: chỉ hiện coin tăng hoặc giảm</li>
            <li>Lọc theo vốn hóa: Large Cap, Mid Cap, Small Cap</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-3">5.3. Phân Loại Theo Market Cap</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-green-300 bg-green-50 dark:bg-green-900/30 rounded-lg p-4">
              <h4 className="font-bold text-green-700 dark:text-green-400 mb-2">Large Cap</h4>
              <p className="text-sm">Vốn hóa &gt; $10 tỷ. Ít rủi ro, biến động thấp (BTC, ETH, BNB)</p>
            </div>
            <div className="border border-yellow-300 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg p-4">
              <h4 className="font-bold text-yellow-700 dark:text-yellow-400 mb-2">Mid Cap</h4>
              <p className="text-sm">Vốn hóa $1-10 tỷ. Cân bằng rủi ro/lợi nhuận (ADA, DOT, LINK)</p>
            </div>
            <div className="border border-red-300 bg-red-50 dark:bg-red-900/30 rounded-lg p-4">
              <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">Small Cap</h4>
              <p className="text-sm">Vốn hóa &lt; $1 tỷ. Tiềm năng cao nhưng rủi ro lớn</p>
            </div>
          </div>
        </section>

        {/* 6. Authentication */}
        <section id="authentication">
          <h2 className="text-3xl font-bold mb-4 border-b-2 border-gray-300 pb-2">6. Authentication & Account</h2>
          
          <h3 className="text-2xl font-semibold mb-3">6.1. Đăng Ký Tài Khoản</h3>
          <ol className="list-decimal ml-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Click nút <strong>&quot;Sign In&quot;</strong> ở góc trên cùng</li>
            <li>Chọn phương thức đăng nhập:
              <ul className="list-disc ml-6 mt-2">
                <li><strong>Google OAuth:</strong> Đăng nhập nhanh bằng tài khoản Google</li>
                <li><strong>Email & Password:</strong> Tạo tài khoản với email và mật khẩu</li>
              </ul>
            </li>
            <li>Xác nhận email (nếu đăng ký bằng email)</li>
            <li>Hoàn tất! Bạn đã có thể sử dụng các tính năng đặc biệt</li>
          </ol>

          <h3 className="text-2xl font-semibold mb-3">6.2. Tính Năng Dành Cho Thành Viên</h3>
          <div className="space-y-3">
            <div className="bg-indigo-50 dark:bg-indigo-900/30 border-l-4 border-indigo-500 p-4">
              <strong className="text-indigo-700 dark:text-indigo-400">Danh Sách Yêu Thích (Watchlist)</strong>
              <p className="text-sm mt-1">Lưu các cryptocurrency yêu thích để theo dõi nhanh chóng</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/30 border-l-4 border-purple-500 p-4">
              <strong className="text-purple-700 dark:text-purple-400">Cảnh Báo Giá (Price Alerts)</strong>
              <p className="text-sm mt-1">Đặt thông báo khi giá đạt mức mong muốn</p>
            </div>
            <div className="bg-pink-50 dark:bg-pink-900/30 border-l-4 border-pink-500 p-4">
              <strong className="text-pink-700 dark:text-pink-400">Portfolio Tracking</strong>
              <p className="text-sm mt-1">Quản lý danh mục đầu tư và theo dõi lãi/lỗ</p>
            </div>
            <div className="bg-teal-50 dark:bg-teal-900/30 border-l-4 border-teal-500 p-4">
              <strong className="text-teal-700 dark:text-teal-400">Email Reports</strong>
              <p className="text-sm mt-1">Nhận báo cáo thị trường hàng ngày/tuần qua email</p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold mb-3 mt-6">6.3. Bảo Mật</h3>
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-300 rounded-lg p-4">
            <p className="font-semibold mb-2">Chúng tôi cam kết:</p>
            <ul className="list-disc ml-6 space-y-1 text-sm">
              <li>Mật khẩu được mã hóa bằng bcrypt (không lưu plain text)</li>
              <li>Session được bảo vệ bằng JWT token</li>
              <li>HTTPS cho mọi request (SSL/TLS encryption)</li>
              <li>Không chia sẻ thông tin cá nhân với bên thứ ba</li>
              <li>Two-Factor Authentication (2FA) sẽ sớm được tích hợp</li>
            </ul>
          </div>
        </section>

        {/* 7. API Reference */}
        <section id="api">
          <h2 className="text-3xl font-bold mb-4 border-b-2 border-gray-300 pb-2">7. API Reference</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Crypto Tracker cung cấp REST API để developers tích hợp dữ liệu vào ứng dụng của mình.
          </p>

          <h3 className="text-2xl font-semibold mb-3">7.1. Endpoints</h3>
          
          <div className="space-y-4">
            {/* API 1 */}
            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-green-500 text-white px-2 py-1 rounded text-sm font-bold">GET</span>
                <code className="text-blue-600">/api/crypto</code>
              </div>
              <p className="text-sm mb-2">Lấy danh sách top cryptocurrencies</p>
              <details className="mt-2">
                <summary className="cursor-pointer font-semibold text-sm">Xem chi tiết</summary>
                <div className="mt-2 ml-4 text-sm">
                  <p><strong>Query Parameters:</strong></p>
                  <ul className="list-disc ml-6">
                    <li><code>limit</code>: Số lượng kết quả (default: 100, max: 5000)</li>
                    <li><code>sort</code>: Sắp xếp theo (market_cap, price, volume_24h)</li>
                  </ul>
                  <p className="mt-2"><strong>Response Example:</strong></p>
                  <pre className="bg-gray-800 text-gray-100 p-3 rounded mt-1 overflow-x-auto text-xs">
{`{
  "data": [
    {
      "id": 1,
      "name": "Bitcoin",
      "symbol": "BTC",
      "price": 45000.50,
      "market_cap": 850000000000,
      "volume_24h": 25000000000,
      "percent_change_24h": 2.5
    }
  ]
}`}
                  </pre>
                </div>
              </details>
            </div>

            {/* API 2 */}
            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-green-500 text-white px-2 py-1 rounded text-sm font-bold">GET</span>
                <code className="text-blue-600">/api/fear-greed</code>
              </div>
              <p className="text-sm mb-2">Lấy chỉ số Fear & Greed hiện tại và lịch sử</p>
              <details className="mt-2">
                <summary className="cursor-pointer font-semibold text-sm">Xem chi tiết</summary>
                <div className="mt-2 ml-4 text-sm">
                  <p><strong>Query Parameters:</strong></p>
                  <ul className="list-disc ml-6">
                    <li><code>limit</code>: Số ngày lịch sử (default: 30)</li>
                  </ul>
                  <p className="mt-2"><strong>Response Example:</strong></p>
                  <pre className="bg-gray-800 text-gray-100 p-3 rounded mt-1 overflow-x-auto text-xs">
{`{
  "name": "Fear and Greed Index",
  "data": [
    {
      "value": "65",
      "value_classification": "Greed",
      "timestamp": "1696118400"
    }
  ]
}`}
                  </pre>
                </div>
              </details>
            </div>

            {/* API 3 */}
            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-green-500 text-white px-2 py-1 rounded text-sm font-bold">GET</span>
                <code className="text-blue-600">/api/price-history</code>
              </div>
              <p className="text-sm mb-2">Lấy lịch sử giá của một cryptocurrency</p>
              <details className="mt-2">
                <summary className="cursor-pointer font-semibold text-sm">Xem chi tiết</summary>
                <div className="mt-2 ml-4 text-sm">
                  <p><strong>Query Parameters:</strong></p>
                  <ul className="list-disc ml-6">
                    <li><code>symbol</code>: Ký hiệu coin (BTC, ETH, ...)</li>
                    <li><code>days</code>: Số ngày lịch sử (1, 7, 30, 90, 365)</li>
                  </ul>
                </div>
              </details>
            </div>

            {/* API 4 */}
            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-green-500 text-white px-2 py-1 rounded text-sm font-bold">GET</span>
                <code className="text-blue-600">/api/global-metrics</code>
              </div>
              <p className="text-sm mb-2">Lấy thống kê toàn cầu về thị trường crypto</p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold mb-3 mt-6">7.2. Authentication cho API</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            Để sử dụng API, bạn cần đăng ký API key miễn phí:
          </p>
          <ol className="list-decimal ml-6 mb-4 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Đăng nhập vào tài khoản</li>
            <li>Vào <strong>Settings → API Keys</strong></li>
            <li>Click <strong>&quot;Generate New Key&quot;</strong></li>
            <li>Copy API key và sử dụng trong header:</li>
          </ol>
          <pre className="bg-gray-800 text-gray-100 p-4 rounded overflow-x-auto text-sm mb-4">
{`curl -H "Authorization: Bearer YOUR_API_KEY" \\
     https://crypto-tracker.com/api/crypto?limit=10`}
          </pre>

          <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-500 p-4">
            <p className="font-semibold mb-2">Rate Limits:</p>
            <ul className="list-disc ml-6 space-y-1 text-sm">
              <li><strong>Free tier:</strong> 100 requests/hour</li>
              <li><strong>Pro tier:</strong> 1,000 requests/hour</li>
              <li><strong>Enterprise:</strong> Không giới hạn</li>
            </ul>
          </div>
        </section>

        {/* 8. FAQ */}
        <section id="faq">
          <h2 className="text-3xl font-bold mb-4 border-b-2 border-gray-300 pb-2">8. FAQ</h2>
          
          <div className="space-y-4">
            <details className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
              <summary className="cursor-pointer font-semibold">Dữ liệu được cập nhật bao lâu một lần?</summary>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                Giá và thông tin cryptocurrency được cập nhật <strong>mỗi 60 giây</strong> từ CoinMarketCap API. 
                Biểu đồ thời gian thực được làm mới tự động khi bạn ở trên trang.
              </p>
            </details>

            <details className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
              <summary className="cursor-pointer font-semibold">Website có hỗ trợ mobile không?</summary>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                Có! Website được thiết kế responsive, hoạt động mượt mà trên mọi thiết bị 
                (desktop, tablet, smartphone). Chúng tôi cũng đang phát triển Progressive Web App (PWA) 
                để bạn có thể cài đặt như ứng dụng native.
              </p>
            </details>

            <details className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
              <summary className="cursor-pointer font-semibold">Tôi có thể mua/bán crypto trực tiếp trên website không?</summary>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                Hiện tại, Crypto Tracker chỉ là nền tảng <strong>theo dõi và phân tích</strong>. 
                Chúng tôi không cung cấp dịch vụ mua bán. Bạn cần sử dụng các sàn giao dịch như 
                Binance, Coinbase, Kraken để thực hiện giao dịch.
              </p>
            </details>

            <details className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
              <summary className="cursor-pointer font-semibold">Website có tính phí không?</summary>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                Phần lớn tính năng là <strong>miễn phí hoàn toàn</strong>. Chúng tôi có gói 
                <strong> Premium</strong> ($9.99/tháng) với các tính năng nâng cao:
              </p>
              <ul className="list-disc ml-6 mt-2 text-sm text-gray-700 dark:text-gray-300">
                <li>Portfolio tracking không giới hạn</li>
                <li>Price alerts không giới hạn</li>
                <li>Xuất báo cáo PDF</li>
                <li>API rate limit cao hơn</li>
                <li>Loại bỏ quảng cáo</li>
              </ul>
            </details>

            <details className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
              <summary className="cursor-pointer font-semibold">Làm sao để thêm coin vào Watchlist?</summary>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                1. Đăng nhập vào tài khoản<br/>
                2. Tìm cryptocurrency muốn theo dõi<br/>
                3. Click vào biểu tượng <strong>ngôi sao</strong> bên cạnh tên coin<br/>
                4. Coin sẽ được lưu vào <strong>My Watchlist</strong> trong Dashboard
              </p>
            </details>

            <details className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
              <summary className="cursor-pointer font-semibold">Tại sao giá trên website khác với sàn giao dịch?</summary>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                Chúng tôi hiển thị <strong>giá trung bình</strong> từ nhiều sàn giao dịch khác nhau. 
                Giá trên mỗi sàn có thể chênh lệch nhẹ do supply/demand, phí giao dịch, và thanh khoản. 
                Đây là hiện tượng bình thường trong thị trường crypto.
              </p>
            </details>

            <details className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
              <summary className="cursor-pointer font-semibold">Làm sao để đặt Price Alert?</summary>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                1. Đăng nhập vào tài khoản<br/>
                2. Vào chi tiết coin muốn theo dõi<br/>
                3. Click <strong>&quot;Set Alert&quot;</strong><br/>
                4. Nhập giá mục tiêu và chọn điều kiện (above/below)<br/>
                5. Chọn kênh thông báo (email, push notification)<br/>
                6. Save!
              </p>
            </details>

            <details className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
              <summary className="cursor-pointer font-semibold">Website có hỗ trợ Dark Mode không?</summary>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                Có! Click vào icon <strong>mặt trăng</strong> ở góc trên cùng để chuyển đổi giữa 
                Light Mode và Dark Mode. Lựa chọn của bạn sẽ được lưu tự động.
              </p>
            </details>
          </div>
        </section>

        {/* Footer Section */}
        <section className="border-t-2 border-gray-300 pt-8 mt-12">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-4">Cần Hỗ Trợ Thêm?</h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Nếu bạn có câu hỏi chưa được giải đáp, vui lòng liên hệ với chúng tôi:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">Email</span>
                <div>
                  <p className="font-semibold">Email</p>
                  <a href="mailto:support@crypto-tracker.com" className="text-blue-600 hover:underline text-sm">
                    support@crypto-tracker.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">Chat</span>
                <div>
                  <p className="font-semibold">Live Chat</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">24/7 Support</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">Twitter</span>
                <div>
                  <p className="font-semibold">Twitter</p>
                  <a href="https://twitter.com/cryptotracker" className="text-blue-600 hover:underline text-sm">
                    @cryptotracker
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 text-gray-600 dark:text-gray-400">
            <p>Cập nhật lần cuối: 01/10/2025</p>
            <p className="mt-2">
              <Link href="/" className="text-blue-600 hover:underline">← ← Back to Home</Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

