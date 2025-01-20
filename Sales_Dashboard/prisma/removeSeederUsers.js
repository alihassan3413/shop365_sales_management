import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  try {
    await prisma.user.deleteMany({
      where: {
        OR: [{ name: "Zafar Iqbal" }, { name: "Shop Manager" }],
      },
    });
  } catch (error) {
    console.error("Error removing seeded users:", error);
  } finally {
    await prisma.$disconnect();
  }
};

main();
