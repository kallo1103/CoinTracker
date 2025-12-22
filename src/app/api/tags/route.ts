
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const tagSchema = z.object({
    name: z.string().min(1, "Name required"),
    color: z.string().optional().default("#3b82f6"),
});

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) return new NextResponse("Unauthorized", { status: 401 });

        const tags = await prisma.tag.findMany({
            where: { userId: session.user.id },
            orderBy: { name: "asc" },
            include: {
                _count: {
                    select: { assets: true }
                }
            }
        });

        return NextResponse.json({ tags });
    } catch (error) {
        console.error("[TAGS_GET]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) return new NextResponse("Unauthorized", { status: 401 });

        const json = await req.json();
        const body = tagSchema.parse(json);

        const tag = await prisma.tag.create({
            data: {
                userId: session.user.id,
                name: body.name,
                color: body.color,
            },
        });

        return NextResponse.json(tag);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse(JSON.stringify(error.issues), { status: 422 });
        }
        console.error("[TAGS_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
