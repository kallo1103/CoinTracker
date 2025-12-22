
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) return new NextResponse("Unauthorized", { status: 401 });

        const { id } = await params;

        const tag = await prisma.tag.findUnique({ where: { id } });
        if (!tag || tag.userId !== session.user.id) {
            return new NextResponse("Not Found", { status: 404 });
        }

        await prisma.tag.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[TAG_DELETE]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
