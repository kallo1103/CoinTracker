
import { NextResponse } from "next/server";
import { genAI } from "@/lib/gemini";

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        if (!genAI) {
            return NextResponse.json(
                { error: "Gemini API Key is not configured" },
                { status: 503 }
            );
        }

        if (!message) {
            return NextResponse.json(
                { error: "Message is required" },
                { status: 400 }
            );
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const systemPrompt = `
      You are an expert crypto financial advisor and analyst for the CoinTracker app.
      Your role is to help users understand the crypto market, analyze their potential investment risks, and explain complex concepts simply.
      
      User Question: ${message}
      
      Guidelines:
      1. Be concise, professional, and helpful.
      2. Use emoji to make the conversation engaging 🚀.
      3. For market analysis, mention that crypto is volatile.
      4. Do NOT give specific financial advice (e.g., "Buy BTC now"). Instead say "BTC is showing strong signs..."
      5. Always remind users to DYOR (Do Your Own Research).
      6. Format your response in markdown.
    `;

        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ text });
    } catch (error) {
        console.error("Gemini API Error:", error);
        return NextResponse.json(
            { error: "Failed to process request" },
            { status: 500 }
        );
    }
}
