import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { prisma } from "~/database/connection";

export async function POST(request: Request) {
  const connection = prisma.user;

  const userData = (await request.json()) as Omit<User, "id">;

  const passwordHash = await bcrypt.hash("123456", 8);

  const account = await connection.create({
    data: {
      ...userData,
      dateOfbirth: new Date(userData.dateOfbirth),
      registration: Number(userData.registration),
      password: passwordHash,
    },
  });

  return NextResponse.json(account);
}

export async function GET(request: Request) {
  const connection = prisma.user;

  const accounts = await connection.findMany();

  return NextResponse.json(accounts);
}
