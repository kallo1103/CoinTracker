# 🦊 MetaMask Integration Guide

## 📋 Tổng Quan

Website đã được tích hợp đăng nhập bằng **MetaMask Wallet**. Người dùng có thể kết nối ví Ethereum của họ để đăng nhập vào hệ thống.

## ✨ Tính Năng

- ✅ Kết nối MetaMask wallet
- ✅ Xác thực bằng chữ ký điện tử (signature)
- ✅ Tự động tạo tài khoản khi đăng nhập lần đầu
- ✅ Lưu wallet address vào database
- ✅ Tạo avatar tự động từ wallet address
- ✅ Session management (30 ngày)
- ✅ UI/UX thân thiện

## 🏗️ Kiến Trúc

### 1. Components

#### `MetaMaskButton.tsx`
Component chính để kết nối với MetaMask wallet.

**Props:**
- `onConnect?: (address: string) => void` - Callback khi kết nối thành công

**Features:**
- Kiểm tra MetaMask có được cài đặt
- Yêu cầu quyền truy cập tài khoản
- Tạo và ký message để xác thực
- Gọi API để verify signature
- Hiển thị wallet address (rút gọn)
- Nút disconnect

#### `AuthButton.tsx`
Component đăng nhập đã được cập nhật để hỗ trợ:
- Google OAuth (existing)
- MetaMask Wallet (new)

### 2. API Endpoint

**`/api/auth/metamask/route.ts`**

**Method:** POST

**Request Body:**
```json
{
  "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "message": "Đăng nhập vào Crypto Tracker\n\nĐịa chỉ: 0x742d35Cc...\nThời gian: 2025-10-01T...",
  "signature": "0x1234567890abcdef..."
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "cuid123",
    "address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    "name": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    "image": "https://api.dicebear.com/7.x/identicon/svg?seed=0x742d35Cc..."
  }
}
```

**Security:**
- Xác thực signature bằng `ethers.verifyMessage()`
- So sánh recovered address với address gửi lên
- Set HTTP-only cookie cho session

### 3. Database Schema

```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  walletAddress String?   @unique @map("wallet_address") // ⭐ NEW
  accounts      Account[]
  sessions      Session[]
}
```

## 🚀 Cách Sử Dụng

### Cho Người Dùng

1. **Cài đặt MetaMask:**
   - Truy cập https://metamask.io/download/
   - Tải extension cho Chrome/Firefox/Brave
   - Tạo hoặc import ví

2. **Đăng nhập vào website:**
   - Click nút "Sign in" trên website
   - Chọn "Connect MetaMask"
   - Approve request trong MetaMask popup
   - Ký message để xác thực
   - Done! Bạn đã đăng nhập

3. **Ngắt kết nối:**
   - Click nút ✕ bên cạnh wallet address
   - Hoặc vào Dashboard → Sign out

### Cho Developers

#### 1. Sử dụng MetaMaskButton Component

```tsx
import MetaMaskButton from '@/components/MetaMaskButton';

function MyComponent() {
  return (
    <MetaMaskButton 
      onConnect={(address) => {
        console.log('Connected wallet:', address);
        // Xử lý logic của bạn
      }}
    />
  );
}
```

#### 2. Kiểm tra User đã kết nối wallet

```tsx
import { useSession } from 'next-auth/react';

function Profile() {
  const { data: session } = useSession();
  
  // Check if logged in via wallet
  const walletAddress = session?.user?.email; // Wallet được lưu trong email field
  const isWalletUser = walletAddress?.startsWith('0x');
  
  return (
    <div>
      {isWalletUser ? (
        <p>Wallet: {walletAddress}</p>
      ) : (
        <p>Email: {session?.user?.email}</p>
      )}
    </div>
  );
}
```

#### 3. Custom Message cho Signature

Trong `MetaMaskButton.tsx`, bạn có thể thay đổi message:

```tsx
const message = `Welcome to My Crypto App!

Address: ${address}
Nonce: ${Date.now()}
Action: Login`;
```

## 🔒 Bảo Mật

### 1. Message Signing
- Mỗi lần đăng nhập yêu cầu ký message mới (có timestamp)
- Không thể replay attack vì message luôn khác nhau

### 2. Signature Verification
- Server verify signature bằng `ethers.verifyMessage()`
- So sánh recovered address với address claim
- Nếu không khớp → reject

### 3. Session Management
- Session token được hash và lưu database
- HTTP-only cookie → không thể đọc từ JavaScript
- Expires sau 30 ngày
- Secure flag khi production (HTTPS)

### 4. Database
- Wallet address được lowercase để tránh duplicate
- Unique constraint trên wallet_address
- Cascade delete khi xóa user

## 🎨 Customization

### 1. Thay đổi màu sắc

In `MetaMaskButton.tsx`:
```tsx
className="bg-gradient-to-r from-orange-500 to-yellow-500"
// Đổi thành:
className="bg-gradient-to-r from-purple-500 to-pink-500"
```

### 2. Thay đổi Avatar Generator

Hiện tại dùng DiceBear:
```tsx
image: `https://api.dicebear.com/7.x/identicon/svg?seed=${address}`
```

Có thể dùng:
- Blockies: `https://api.dicebear.com/7.x/bottts/svg?seed=${address}`
- Jazzicon: Tự implement với library
- Gravatar: Nếu có email

### 3. Thêm Chain Validation

Để chỉ cho phép kết nối với network cụ thể:

```tsx
const provider = new BrowserProvider(window.ethereum);
const network = await provider.getNetwork();

if (network.chainId !== 1n) { // 1 = Ethereum Mainnet
  alert("Vui lòng chuyển sang Ethereum Mainnet");
  return;
}
```

## 🐛 Troubleshooting

### 1. MetaMask không xuất hiện popup

**Nguyên nhân:**
- Extension bị disabled
- User đã từ chối request trước đó
- Website không có HTTPS (trong production)

**Giải pháp:**
- Kiểm tra extension enabled
- Refresh page và thử lại
- Clear browser cache
- Vào MetaMask Settings → Connected Sites → Remove site

### 2. Signature verification failed

**Nguyên nhân:**
- Message format không khớp
- Address case mismatch (uppercase vs lowercase)

**Giải pháp:**
- Đảm bảo message giống hệt giữa client và server
- Luôn lowercase address trước khi compare

### 3. Session không persist

**Nguyên nhân:**
- Cookie bị block
- SameSite policy issue

**Giải pháp:**
- Kiểm tra browser cookie settings
- Thêm domain vào cookie config
- Set SameSite='lax' hoặc 'none'

## 📊 Flow Chart

```
User clicks "Connect MetaMask"
         ↓
Check MetaMask installed?
    No → Open MetaMask download page
    Yes → Continue
         ↓
Request account access (eth_requestAccounts)
         ↓
User approves in MetaMask
         ↓
Get wallet address (accounts[0])
         ↓
Create message to sign
         ↓
Request signature (signMessage)
         ↓
User signs in MetaMask
         ↓
Send {address, message, signature} to API
         ↓
API verifies signature
    Invalid → Return error
    Valid → Continue
         ↓
Find or create User in database
         ↓
Create Session
         ↓
Set HTTP-only cookie
         ↓
Redirect to Dashboard
```

## 📚 Resources

- [MetaMask Documentation](https://docs.metamask.io/)
- [Ethers.js Documentation](https://docs.ethers.org/)
- [NextAuth.js Custom Providers](https://next-auth.js.org/configuration/providers/credentials)
- [Web3 Authentication Best Practices](https://ethereum.org/en/developers/docs/apis/json-rpc/)

## 🎯 Future Improvements

- [ ] Thêm hỗ trợ WalletConnect (cho mobile)
- [ ] Thêm Coinbase Wallet
- [ ] Multi-chain support (Polygon, BSC, etc)
- [ ] ENS name resolution (hiển thị .eth thay vì 0x...)
- [ ] NFT avatar từ user's wallet
- [ ] Transaction history tracking
- [ ] Portfolio integration
- [ ] Sign in with Ethereum (SIWE) standard

## ⚠️ Notes

- MetaMask chỉ hoạt động trên trình duyệt có extension
- Mobile users cần dùng MetaMask mobile browser
- Luôn handle errors gracefully
- Không bao giờ yêu cầu private key!
- Message signing là miễn phí (không tốn gas)

---

**Created:** 2025-10-01  
**Last Updated:** 2025-10-01  
**Version:** 1.0.0

