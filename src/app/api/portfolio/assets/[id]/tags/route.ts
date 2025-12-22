
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const toggleTagSchema = z.object({
    tagId: z.string().min(1),
});

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) return new NextResponse("Unauthorized", { status: 401 });

        const { id: assetId } = await params;
        const json = await req.json();
        const { tagId } = toggleTagSchema.parse(json);

        // Check asset ownership
        const asset = await prisma.asset.findUnique({
            where: { id: assetId },
            include: { portfolio: true, tags: true }
        });

        if (!asset || asset.portfolio.userId !== session.user.id) {
            return new NextResponse("Not Found", { status: 404 });
        }

        const hasTag = asset.tags.some((t: { id: string }) => t.id === tagId);

        if (hasTag) {
            // Remove tag
            await prisma.asset.update({
                where: { id: assetId },
                data: {
                    tags: {
                        disconnect: { id: tagId }
                    }
                }
            });
            return NextResponse.json({ assigned: false });
        } else {
            // Add tag
            await prisma.asset.update({
                where: { id: assetId },
                data: {
                    tags: {
                        connect: { id: tagId }
                    }
                }
            });
            return NextResponse.json({ assigned: true });
        }

    } catch (error) {
        console.error("[ASSET_TAG_TOGGLE]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
