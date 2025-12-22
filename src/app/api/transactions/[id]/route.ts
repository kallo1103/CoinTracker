
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const transactionUpdateSchema = z.object({
    type: z.enum(["BUY", "SELL", "TRANSFER_IN", "TRANSFER_OUT"]).optional(),
    amount: z.number().positive().optional(),
    pricePerCoin: z.number().positive().optional(),
    fee: z.number().optional(),
    date: z.string().transform((str) => new Date(str)).optional(),
    notes: z.string().optional(),
});

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const paramsUnwrapped = await params;

        // Verify ownership
        const transaction = await prisma.transaction.findUnique({
            where: { id: paramsUnwrapped.id },
            include: { portfolio: true },
        });

        if (!transaction || transaction.portfolio.userId !== session.user.id) {
            return new NextResponse("Not Found", { status: 404 });
        }

        await prisma.transaction.delete({
            where: { id: paramsUnwrapped.id },
        });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error("[TRANSACTION_DELETE]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const paramsUnwrapped = await params;

        const json = await req.json();
        const body = transactionUpdateSchema.parse(json);

        // Verify ownership
        const existingTransaction = await prisma.transaction.findUnique({
            where: { id: paramsUnwrapped.id },
            include: { portfolio: true },
        });

        if (!existingTransaction || existingTransaction.portfolio.userId !== session.user.id) {
            return new NextResponse("Not Found", { status: 404 });
        }

        const updatedTransaction = await prisma.transaction.update({
            where: { id: paramsUnwrapped.id },
            data: body,
        });

        return NextResponse.json(updatedTransaction);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse(JSON.stringify(error.issues), { status: 422 });
        }
        console.error("[TRANSACTION_UPDATE]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
