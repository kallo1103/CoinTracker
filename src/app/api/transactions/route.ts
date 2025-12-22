
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma"; // Assuming this is where prisma client is
import { authOptions } from "@/lib/auth"; // Verifying this path from watchlist route
import { z } from "zod";

const transactionSchema = z.object({
    type: z.enum(["BUY", "SELL", "TRANSFER_IN", "TRANSFER_OUT"]),
    coinId: z.string(),
    symbol: z.string(),
    amount: z.number().positive(),
    pricePerCoin: z.number().positive(),
    fee: z.number().optional().default(0),
    date: z.string().transform((str) => new Date(str)), // Expect ISO string
    notes: z.string().optional(),
});

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const coinId = searchParams.get("coinId");
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const skip = (page - 1) * limit;

        const portfolio = await prisma.portfolio.findUnique({
            where: { userId: session.user.id },
        });

        if (!portfolio) {
            return NextResponse.json({ transactions: [], total: 0 });
        }

        const where = {
            portfolioId: portfolio.id,
            ...(coinId ? { coinId } : {}),
        };

        const [transactions, total] = await prisma.$transaction([
            prisma.transaction.findMany({
                where,
                orderBy: { date: "desc" },
                skip,
                take: limit,
            }),
            prisma.transaction.count({ where }),
        ]);

        return NextResponse.json({
            transactions,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("[TRANSACTIONS_GET]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const json = await req.json();
        const body = transactionSchema.parse(json);

        // Get or Create Portfolio
        let portfolio = await prisma.portfolio.findUnique({
            where: { userId: session.user.id },
        });

        if (!portfolio) {
            portfolio = await prisma.portfolio.create({
                data: { userId: session.user.id },
            });
        }

        const transaction = await prisma.transaction.create({
            data: {
                portfolioId: portfolio.id,
                type: body.type,
                coinId: body.coinId,
                symbol: body.symbol,
                amount: body.amount,
                pricePerCoin: body.pricePerCoin,
                fee: body.fee,
                date: body.date,
                notes: body.notes,
            },
        });

        // TODO: Update Asset holdings (recalculate average buy price, quantity, etc.)
        // For now, we just log the transaction. 
        // Ideally we should have a separate service to update asset balances.

        return NextResponse.json(transaction);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse(JSON.stringify(error.issues), { status: 422 });
        }
        console.error("[TRANSACTIONS_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
