
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const postSchema = z.object({
    content: z.string().min(1, "Content cannot be empty"),
    imageUrl: z.string().optional(),
});

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "20");
        const skip = (page - 1) * limit;

        const [posts, total] = await prisma.$transaction([
            prisma.post.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                        },
                    },
                    likes: {
                        where: { userId: session?.user?.id }, // Check if current user liked
                        select: { id: true },
                    },
                    _count: {
                        select: { likes: true, comments: true },
                    },
                },
            }),
            prisma.post.count(),
        ]);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const formattedPosts = posts.map((post: any) => ({
            ...post,
            isLiked: post.likes.length > 0,
            likes: undefined, // simplify response
        }));

        return NextResponse.json({
            posts: formattedPosts,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });

    } catch (error) {
        console.error("[POSTS_GET]", error);
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
        const body = postSchema.parse(json);

        const post = await prisma.post.create({
            data: {
                userId: session.user.id,
                content: body.content,
                imageUrl: body.imageUrl,
            },
            include: {
                user: { select: { id: true, name: true, image: true } },
                _count: { select: { likes: true, comments: true } },
            },
        });

        return NextResponse.json({ ...post, isLiked: false });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse(JSON.stringify(error.issues), { status: 422 });
        }
        console.error("[POSTS_POST]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
