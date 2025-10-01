import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Tạo handler cho NextAuth
const handler = NextAuth(authOptions);

// Export cho cả GET và POST requests
export { handler as GET, handler as POST };

