// import { prisma } from '@/prisma/prisma-client';
// import {NextRequest, NextResponse} from 'next/server'

// export async function GET() {
//   const users =  await prisma.user.findMany();
//   return NextResponse.json(users);
// }

// export async function POST(req: NextRequest){
//   const data = await req.json();

//   const user = await prisma.user.create({
//     data
//   })

//   return NextResponse.json(user);
// }

import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcrypt';

export async function GET() {
  const users = await prisma.user.findMany();

  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  const hashedPassword = await hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });

  return NextResponse.json({
    id: user.id,
    email: user.email,
    fullName: user.fullName,
  });
}