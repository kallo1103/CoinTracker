import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { address } = await req.json();
    if (!address) {
      return NextResponse.json({ error: "Missing wallet address" }, { status: 400 });
    }

    const normalizedAddress = address.toLowerCase();
    const nonce = crypto.randomBytes(16).toString("hex");
    const expires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Store nonce in VerificationToken table (reuse existing model)
    await prisma.verificationToken.create({
      data: {
        identifier: normalizedAddress,
        token: nonce,
        expires,
      },
    });

    const message = `Sign in to Crypto Tracker\n\nNonce: ${nonce}\nAddress: ${normalizedAddress}\nExpires: ${expires.toISOString()}`;

    return NextResponse.json({ message });
  } catch (error) {
    console.error("Nonce generation error:", error);
    return NextResponse.json({ error: "Unable to generate nonce" }, { status: 500 });
  }
}


