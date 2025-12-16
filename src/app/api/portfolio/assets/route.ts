import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET: Lấy danh sách assets của user
export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        const portfolio = await prisma.portfolio.findUnique({
            where: { userId: session.user.id },
            include: {
                assets: {
                    orderBy: { createdAt: "desc" }
                }
            }
        });

        if (!portfolio) {
            return NextResponse.json([]);
        }

        return NextResponse.json(portfolio.assets);
    } catch (error) {
        console.error("Error fetching portfolio assets:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

// POST: Thêm asset mới
export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        const body = await request.json();
        const { coinId, symbol, name, quantity, buyPrice, buyDate } = body;

        // Validate dữ liệu cơ bản
        if (!coinId || !symbol || !name || quantity === undefined || buyPrice === undefined) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Tìm hoặc tạo Portfolio cho user
        let portfolio = await prisma.portfolio.findUnique({
            where: { userId: session.user.id }
        });

        if (!portfolio) {
            portfolio = await prisma.portfolio.create({
                data: {
                    userId: session.user.id
                }
            });
        }

        // Tạo Asset mới
        const newAsset = await prisma.asset.create({
            data: {
                portfolioId: portfolio.id,
                coinId,
                symbol,
                name,
                quantity: parseFloat(quantity),
                buyPrice: parseFloat(buyPrice),
                buyDate: buyDate ? new Date(buyDate) : new Date(),
            }
        });

        return NextResponse.json(newAsset);

    } catch (error) {
        console.error("Error creating asset:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
