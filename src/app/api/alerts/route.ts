
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const alertSchema = z.object({
    coinId: z.string().min(1),
    targetPrice: z.number().positive(),
    condition: z.enum(["ABOVE", "BELOW"]),
});

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const alerts = await prisma.priceAlert.findMany({
            where: { userId: session.user.id },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ alerts });
    } catch (error) {
        console.error("[ALERTS_GET]", error);
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
        const body = alertSchema.parse(json);

        const alert = await prisma.priceAlert.create({
            data: {
                userId: session.user.id,
                coinId: body.coinId,
                targetPrice: body.targetPrice,
                condition: body.condition,
            },
        });

        return NextResponse.json(alert);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse(JSON.stringify(error.issues), { status: 422 });
        }
        console.error("[ALERTS_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) return new NextResponse("Unauthorized", { status: 401 });

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) return new NextResponse("Missing ID", { status: 400 });

        const alert = await prisma.priceAlert.findUnique({ where: { id } });
        if (!alert || alert.userId !== session.user.id) return new NextResponse("Not Found", { status: 404 });

        await prisma.priceAlert.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[ALERTS_DELETE]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
