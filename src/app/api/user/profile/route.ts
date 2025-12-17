import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: {
                name: true,
                email: true,
                phoneNumber: true,
                image: true,
                bio: true,
                location: true,
                website: true,
                twitter: true,
                linkedin: true,
                birthDate: true,
                interests: true,
                settings: true
            }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error("Error fetching profile:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const {
            name,
            phoneNumber,
            bio,
            location,
            website,
            twitter,
            linkedin,
            birthDate,
            interests,
            settings
        } = body;

        const user = await prisma.user.update({
            where: { email: session.user.email },
            data: {
                name,
                phoneNumber,
                bio,
                location,
                website,
                twitter,
                linkedin,
                birthDate: birthDate ? new Date(birthDate) : undefined,
                interests,
                settings: settings ? settings : undefined,
            },
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
