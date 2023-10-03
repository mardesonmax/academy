import { compare } from "bcrypt";
import { NextResponse } from "next/server";
import { prisma } from "~/database/connection";

interface Props {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  const connection = prisma.user;

  const { email, password } = (await request.json()) as Props;

  const responseError = new Response(
    JSON.stringify({
      message: "E-mail or password is invalid",
    }),
    {
      status: 400,
    }
  );

  if (!email || !password) {
    return responseError;
  }

  const accountExists = await connection.findFirst({
    where: {
      email: email,
    },
  });

  if (!accountExists) {
    return responseError;
  }

  const passwordIsValid = await compare(password, accountExists.password);

  if (!passwordIsValid) return responseError;

  return NextResponse.json(accountExists);
}
