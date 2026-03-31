const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      role: "SUPER_ADMIN",
      name: "Super Admin",
      email: "super@demo.com",
      password: "123456",
    },
    {
      role: "ADMIN",
      name: "Admin",
      email: "admin@demo.com",
      password: "123456",
    },
    {
      role: "STAFF",
      name: "Staff",
      email: "staff@demo.com",
      password: "123456",
    },
    {
      role: "CLIENT",
      name: "Client",
      email: "client@demo.com",
      password: "123456",
    },
  ];

  for (const u of users) {
    const hashedPassword = await bcrypt.hash(u.password, 10);
    const existing = await prisma.user.findUnique({
      where: { email: u.email },
    });

    if (!existing) {
      await prisma.user.create({
        data: {
          email: u.email,
          name: u.name,
          password: hashedPassword,
          role: u.role,
        },
      });
      console.log(`Created user: ${u.email}`);
    } else {
      console.log(`User already exists: ${u.email}`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
