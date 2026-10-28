

import { NextResponse } from 'next/server';
import { getUserSession } from '@/shared/lib/get-user-session';
import { prisma } from '@/prisma/prisma-client';

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await getUserSession();

    if (!session) {
      return NextResponse.json(
        { message: 'Пользователь не авторизован' },
        { status: 401 },
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: Number(session.id),
      },
      select: {
        id: true,
        fullName: true,
        email: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'Пользователь не найден' },
        { status: 404 },
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('[GET_ME] Server error:', error);

    return NextResponse.json(
      { message: 'Внутренняя ошибка сервера' },
      { status: 500 },
    );
  }
}