import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const main = async () => {
  // check if the admin exists
  const adminExist = await prisma.user.findFirst({
    where: { role: Role.ADMIN },
  });

  const shopMangerExist = await prisma.user.findFirst({
    where: { role: Role.USER },
  });

  if (!adminExist) {
    const hashedPassword = await bcrypt.hash("NbtHub123!@#27", 10);
    await prisma.user.create({
      data: {
        name: "Zafar Iqbal",
        phone_no: "00000000000",
        password: hashedPassword,
        role: Role.ADMIN,
      },
    });
    console.log("Admin User created successfully");
  }

  if (!shopMangerExist) {
    const hashedPassword = await bcrypt.hash("123456789", 10);
    await prisma.user.create({
      data: {
        name: "Shop Manager",
        phone_no: "03278784988",
        password: hashedPassword,
        role: Role.USER,
      },
    });
    console.log("Shop Manager User created successfully");
  }
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
