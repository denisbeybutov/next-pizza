import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import  CredentialsProvider  from "next-auth/providers/credentials";
import { prisma } from "@/prisma/prisma-client";
import { compare } from "bcrypt";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {label: 'Email', type: 'text'},
        password: { label: 'Password', type: 'password'},
      },
      
async authorize(credentials) {
  if (!credentials?.email || !credentials?.password) {
    console.log('[AUTH] Email или пароль не переданы');
    return null;
  }

  const findUser = await prisma.user.findFirst({
    where: {
      email: credentials.email,
    },
  });

  if (!findUser) {
    console.log('[AUTH] Пользователь не найден');
    return null;
  }

  const isPasswordValid = await compare(
    credentials.password,
    findUser.password
  );

  if (!isPasswordValid) {
    console.log('[AUTH] Неверный пароль');
    return null;
  }

  if (!findUser.verified) {
    console.log('[AUTH] Email не подтверждён');
    return null;
  }

  console.log('[AUTH] Авторизация успешна');

  return {
    id: String(findUser.id),
    email: findUser.email,
    name: findUser.fullName,
    role: findUser.role,
  };
}

    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({token}){
      const findUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if(findUser) {
        token.id = String(findUser.id);
        token.email = findUser.email;
        token.fullName = findUser.fullName;
        token.role = findUser.role;
      }

      return token;
    },
    session({session, token}) {
      if(session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }

      return session;
    }
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };