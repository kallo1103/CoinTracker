# Hướng dẫn cài đặt NextAuth và Prisma

## ✅ Đã cài đặt

Các package sau đã được cài đặt:
- `next-auth` - Thư viện xác thực cho Next.js
- `@prisma/client` - Prisma ORM client
- `@auth/prisma-adapter` - Adapter kết nối NextAuth với Prisma
- `prisma` - Prisma CLI (dev dependency)

## 📁 Files đã tạo

1. **`prisma/schema.prisma`** - Schema database với models cho NextAuth (User, Account, Session, VerificationToken)
2. **`src/lib/auth.ts`** - Cấu hình NextAuth với Prisma adapter
3. **`src/lib/prisma.ts`** - Prisma client instance (singleton pattern)
4. **`src/app/api/auth/[...nextauth]/route.ts`** - NextAuth API route handler

## ⚙️ Cấu hình môi trường

Tạo file `.env` trong thư mục root với nội dung sau:

```env
# Database
# Prisma hỗ trợ: postgresql, mysql, sqlite, sqlserver, mongodb
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# NextAuth
# Tạo secret key bằng lệnh: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Google OAuth (tùy chọn)
# Lấy credentials từ: https://console.cloud.google.com/
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

### Tạo NEXTAUTH_SECRET

Chạy lệnh sau để tạo secret key an toàn:

```bash
openssl rand -base64 32
```

## 🗄️ Thiết lập Database

### 1. Tạo và chạy migration

```bash
npx prisma migrate dev --name init
```

Lệnh này sẽ:
- Tạo database (nếu chưa có)
- Tạo các bảng theo schema
- Generate Prisma Client

### 2. Mở Prisma Studio (UI quản lý database)

```bash
npx prisma studio
```

## 🔐 Thiết lập OAuth Providers

### Google OAuth

1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo project mới hoặc chọn project hiện có
3. Vào "APIs & Services" → "Credentials"
4. Tạo "OAuth 2.0 Client ID"
5. Thêm Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://yourdomain.com/api/auth/callback/google`
6. Copy Client ID và Client Secret vào `.env`

## 📝 Sử dụng NextAuth trong components

### Server Component

```tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return <div>Bạn chưa đăng nhập</div>;
  }
  
  return <div>Xin chào, {session.user?.name}!</div>;
}
```

### Client Component

```tsx
"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();
  
  if (session) {
    return (
      <>
        Đã đăng nhập với email: {session.user?.email} <br />
        <button onClick={() => signOut()}>Đăng xuất</button>
      </>
    );
  }
  
  return (
    <>
      Chưa đăng nhập <br />
      <button onClick={() => signIn()}>Đăng nhập</button>
    </>
  );
}
```

### Wrap layout với SessionProvider (cho Client Components)

Cập nhật `src/app/layout.tsx`:

```tsx
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
```

## 🔒 Bảo vệ routes

### API Routes

```tsx
// src/app/api/protected/route.ts
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  return NextResponse.json({ data: "Protected data" });
}
```

### Middleware (bảo vệ nhiều routes)

Tạo `src/middleware.ts`:

```tsx
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
```

## 📚 Tài liệu tham khảo

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth Prisma Adapter](https://authjs.dev/reference/adapter/prisma)

## 🚀 Các bước tiếp theo

1. ✅ Cấu hình `.env` với database URL và secrets
2. ✅ Chạy `npx prisma migrate dev --name init`
3. ✅ Thiết lập OAuth providers (Google, GitHub)
4. ✅ Tạo trang đăng nhập tùy chỉnh (nếu cần)
5. ✅ Test authentication flow

## ⚠️ Lưu ý

- **Không commit file `.env`** vào Git (đã có trong `.gitignore`)
- Sử dụng biến môi trường khác nhau cho development và production
- Backup database thường xuyên
- Trong production, nhớ thay đổi `NEXTAUTH_URL` thành domain thực

