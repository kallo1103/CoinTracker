import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyMessage } from "ethers";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

// Mở rộng kiểu User và Session để bao gồm các trường tùy chỉnh
declare module "next-auth" {
  interface User {
    id: string;
    walletAddress?: string | null;
  }
  interface Session {
    user: User & {
      id: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}

// Cấu hình NextAuth
export const authOptions: NextAuthOptions = {
  // Sử dụng Prisma adapter để lưu sessions vào database
  adapter: PrismaAdapter(prisma) as Adapter,

  // Cấu hình các providers (nhà cung cấp xác thực)
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),

    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Vui lòng nhập email và mật khẩu");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.password) {
          throw new Error("Email không tồn tại hoặc chưa thiết lập mật khẩu");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error("Mật khẩu không đúng");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      }
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
            const updates: { walletAddress?: string; image?: string } = {};
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
        } catch (error) {
          console.error("MetaMask auth error:", error);
          const errorMessage = error instanceof Error ? error.message : "Authentication failed";
          throw new Error(errorMessage);
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
    async jwt({ token, user }) {
      // Khi user lần đầu đăng nhập, copy các trường cần thiết vào token
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
      }
      return token;
    },

    // Callback khi tạo session
    async session({ session, token }) {
      if (session.user) {
        // Đảm bảo session chứa id, name, email và image từ token
        session.user.id = token.id;
        session.user.name = token.name || session.user.name;
        session.user.email = token.email || session.user.email;
        session.user.image = token.picture || session.user.image;
      }
      return session;
    },

    // Redirect sau khi đăng nhập thành công
    async redirect({ url, baseUrl }) {
      // Nếu URL là callback URL, redirect về profile
      if (url.startsWith(baseUrl)) {
        return `${baseUrl}/profile`;
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

