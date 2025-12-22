
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const commentSchema = z.object({
    content: z.string().min(1, "Comment cannot be empty"),
});

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: postId } = await params;
        // Simple get all for now, or add pagination if needed
        const comments = await prisma.comment.findMany({
            where: { postId },
            orderBy: { createdAt: "asc" },
            include: {
                user: { select: { id: true, name: true, image: true } },
            },
        });

        return NextResponse.json({ comments });
    } catch (error) {
        console.error("[COMMENTS_GET]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { id: postId } = await params;
        const json = await req.json();
        const body = commentSchema.parse(json);

        const comment = await prisma.comment.create({
            data: {
                content: body.content,
                postId,
                userId: session.user.id,
            },
            include: {
                user: { select: { id: true, name: true, image: true } },
            },
        });

        return NextResponse.json(comment);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse(JSON.stringify(error.issues), { status: 422 });
        }
        console.error("[COMMENTS_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
