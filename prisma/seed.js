import bcrypt from "bcrypt";
import prisma from "../lib/prismaClient.js";

async function main() {
  const hashedPassword = await bcrypt.hash("rhay", 10);

  await prisma.user.upsert({
    where: { email: "adrian@email.com" },
    update: {},
    create: {
      email: "adrian@email.com",
      password: hashedPassword,
    },
  });

  console.log("Usuário de seed criado com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });