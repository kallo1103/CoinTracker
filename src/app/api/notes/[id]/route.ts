
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) return new NextResponse("Unauthorized", { status: 401 });

        const { id } = await params;
        const json = await req.json();

        // Check ownership
        const existing = await prisma.note.findUnique({ where: { id } });
        if (!existing || existing.userId !== session.user.id) {
            return new NextResponse("Not Found", { status: 404 });
        }

        const note = await prisma.note.update({
            where: { id },
            data: json,
        });

        return NextResponse.json(note);
    } catch (error) {
        console.error("[NOTE_UPDATE]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) return new NextResponse("Unauthorized", { status: 401 });

        const { id } = await params;

        // Check ownership
        const existing = await prisma.note.findUnique({ where: { id } });
        if (!existing || existing.userId !== session.user.id) {
            return new NextResponse("Not Found", { status: 404 });
        }

        await prisma.note.delete({ where: { id } });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[NOTE_DELETE]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
