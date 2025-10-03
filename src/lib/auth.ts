import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyMessage } from "ethers";
import { prisma } from "./prisma";

// Cấu hình NextAuth
export const authOptions: NextAuthOptions = {
  // Sử dụng Prisma adapter để lưu sessions vào database
  adapter: PrismaAdapter(prisma) as any,
  
  // Cấu hình các providers (nhà cung cấp xác thực)
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    
    // MetaMask Provider - Xác thực bằng wallet signature
    CredentialsProvider({
      id: "metamask",
      name: "MetaMask",
      credentials: {
        address: { label: "Wallet Address", type: "text" },
        message: { label: "Message", type: "text" },
        signature: { label: "Signature", type: "text" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.address || !credentials?.message || !credentials?.signature) {
            throw new Error("Missing authentication information");
          }

          // Xác thực chữ ký
          const recoveredAddress = verifyMessage(credentials.message, credentials.signature);

          if (recoveredAddress.toLowerCase() !== credentials.address.toLowerCase()) {
            throw new Error("Invalid signature");
          }

          // Tìm hoặc tạo user
          let user = await prisma.user.findFirst({
            where: {
              OR: [
                { email: credentials.address.toLowerCase() },
                { walletAddress: credentials.address.toLowerCase() },
              ],
            },
          });

          if (!user) {
            // Tạo user mới với avatar DiceBear
            user = await prisma.user.create({
              data: {
                email: credentials.address.toLowerCase(),
                name: `${credentials.address.slice(0, 6)}...${credentials.address.slice(-4)}`,
                walletAddress: credentials.address.toLowerCase(),
                image: `https://api.dicebear.com/9.x/identicon/svg?seed=${credentials.address}`,
              },
            });
          } else {
            // Nếu user tồn tại, ensure walletAddress và image được set
            const updates: any = {};
            if (!user.walletAddress) updates.walletAddress = credentials.address.toLowerCase();
            if (!user.image) updates.image = `https://api.dicebear.com/9.x/identicon/svg?seed=${credentials.address}`;

            if (Object.keys(updates).length) {
              user = await prisma.user.update({
                where: { id: user.id },
                data: updates,
              });
            }
          }

          // Trả về user object cho NextAuth
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          };
        } catch (error: any) {
          console.error("MetaMask auth error:", error);
          throw new Error(error.message || "Authentication failed");
        }
      },
    }),
  ],
  
  // Cấu hình session
  session: {
    strategy: "jwt", // Sử dụng JWT thay vì database sessions
  },
  
  // Callbacks để tùy chỉnh behavior
  callbacks: {
    // Callback khi tạo JWT token
    async jwt({ token, user, account }) {
      // Khi user lần đầu đăng nhập, copy các trường cần thiết vào token
      if (user) {
        (token as any).id = user.id;
        (token as any).name = user.name;
        (token as any).email = user.email;
        (token as any).image = user.image;
      }
      return token;
    },
    
    // Callback khi tạo session
    async session({ session, token }) {
      if (session.user) {
        // Đảm bảo session chứa id, name, email và image từ token
        (session.user as any).id = (token as any).id;
        (session.user as any).name = (token as any).name || session.user.name;
        (session.user as any).email = (token as any).email || session.user.email;
        (session.user as any).image = (token as any).image || session.user.image;
      }
      return session;
    },
    
    // Redirect sau khi đăng nhập thành công
    async redirect({ url, baseUrl }) {
      // Nếu URL là callback URL, redirect về dashboard
      if (url.startsWith(baseUrl)) {
        return `${baseUrl}/dashboard`;
      }
      // Nếu là relative URL, thêm baseUrl
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      return baseUrl;
    },
  },
  
  // Cấu hình pages tùy chỉnh
  pages: {
    signIn: '/',
    error: '/', // Error page
  },
  
  // Secret key để mã hóa tokens
  secret: process.env.NEXTAUTH_SECRET,
  
  // Debug mode (chỉ bật trong development)
  debug: process.env.NODE_ENV === 'development',
};

