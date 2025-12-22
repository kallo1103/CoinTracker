
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const noteSchema = z.object({
    title: z.string().min(1, "Title required"),
    content: z.string(),
    coinId: z.string().optional().nullable(),
    isPinned: z.boolean().optional(),
});

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) return new NextResponse("Unauthorized", { status: 401 });

        const { searchParams } = new URL(req.url);
        const coinId = searchParams.get("coinId");

        const notes = await prisma.note.findMany({
            where: {
                userId: session.user.id,
                ...(coinId ? { coinId } : {}),
            },
            orderBy: [
                { isPinned: "desc" },
                { updatedAt: "desc" },
            ],
        });

        return NextResponse.json({ notes });
    } catch (error) {
        console.error("[NOTES_GET]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) return new NextResponse("Unauthorized", { status: 401 });

        const json = await req.json();
        const body = noteSchema.parse(json);

        const note = await prisma.note.create({
            data: {
                userId: session.user.id,
                title: body.title,
                content: body.content,
                coinId: body.coinId,
                isPinned: body.isPinned || false,
            },
        });

        return NextResponse.json(note);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse(JSON.stringify(error.issues), { status: 422 });
        }
        console.error("[NOTES_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
