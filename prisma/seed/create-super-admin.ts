import { prisma } from "~/database/connection";
import bcrypt from "bcrypt";

export async function createSuperAdmin() {
  const connection = prisma.user;

  const passwordHash = await bcrypt.hash("123456", 8);

  await connection.create({
    data: {
      name: "Miguel Arthur",
      address: "Rua Qual Quer, 38 - Centro",
      cpf: "675.337.540-69",
      rg: "37.788.111-9",
      dateOfbirth: new Date(),
      email: "admin@academy.com",
      password: passwordHash,
      phone: "9999999999",
      registration: 2303,
      role: "ADMIN",
    },
  });
}
