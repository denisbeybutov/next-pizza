// import { prisma } from "@/prisma/prisma-client";
// import { getUserSession } from "@/shared/lib/get-user-session";
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const user = await getUserSession();

//     if(!user) {
//       return NextResponse.json({messgae: 'Вы не авторизованы'}, {status: 401})
//     }

//     const data = await prisma.user.findUnique({
//       where: {
//         id: Number(user.id),
//       },
//       select: {
//         fullName: true,
//         email: true,
//         password: false,
//       }
//     })
//   } catch(error){
//     console.log(error);
//     return NextResponse.json({message: '[USER_GET] Server ereor'}, {status: 500})
//   }
// }

import { NextResponse } from 'next/server';
import { getUserSession } from '@/shared/lib/get-user-session';
import { prisma } from '@/prisma/prisma-client';

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