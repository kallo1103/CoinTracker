import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    // In Next.js 15, params is a Promise so we need to await it
    const { id: assetId } = await context.params;

    try {
        // Tìm asset và include thông tin portfolio để kiểm tra quyền sở hữu
        const asset = await prisma.asset.findUnique({
            where: { id: assetId },
            include: {
                portfolio: true
            }
        });

        if (!asset) {
            return NextResponse.json(
                { error: "Asset not found" },
                { status: 404 }
            );
        }

        // Kiểm tra xem asset này có thuộc về user đang đăng nhập không
        if (asset.portfolio.userId !== session.user.id) {
            return NextResponse.json(
                { error: "Forbidden" },
                { status: 403 }
            );
        }

        // Xóa asset
        await prisma.asset.delete({
            where: { id: assetId }
        });

        return NextResponse.json({ success: true, message: "Asset deleted successfully" });

    } catch (error) {
        console.error("Error deleting asset:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
