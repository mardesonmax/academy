import { Course } from "@prisma/client";
import { NextResponse } from "next/server";
import { prisma } from "~/database/connection";

export async function POST(request: Request) {
  const connection = prisma.course;

  const data = (await request.json()) as Omit<Course, "id">;

  const account = await connection.create({
    data,
  });

  return NextResponse.json(account);
}

export async function GET(request: Request) {
  const connection = prisma.course;

  const courses = await connection.findMany();

  return NextResponse.json(courses);
}
