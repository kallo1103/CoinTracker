
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const checkSchema = z.object({
    coinId: z.string().min(1),
    currentPrice: z.number().positive(),
});

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) return new NextResponse("Unauthorized", { status: 401 });

        const json = await req.json();
        const body = checkSchema.parse(json);

        // Find active alerts for this coin and user
        const alerts = await prisma.priceAlert.findMany({
            where: {
                userId: session.user.id,
                coinId: body.coinId,
                isActive: true,
            },
        });

        const triggered = [];

        for (const alert of alerts) {
            let isTriggered = false;
            if (alert.condition === "ABOVE" && body.currentPrice >= alert.targetPrice) {
                isTriggered = true;
            } else if (alert.condition === "BELOW" && body.currentPrice <= alert.targetPrice) {
                isTriggered = true;
            }

            if (isTriggered) {
                triggered.push(alert);
                // Optional: Deactivate alert or logic to prevent spam
                // await prisma.priceAlert.update({ where: { id: alert.id }, data: { isActive: false } })
            }
        }

        return NextResponse.json({ triggered });

    } catch (error) {
        console.error("[ALERTS_CHECK]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
