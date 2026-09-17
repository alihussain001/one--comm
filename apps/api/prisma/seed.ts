import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'generated/prisma/client';

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DIRECT_URL!,
  }),
});

async function main() {
    
  await prisma.product.create({
    data: {
      name: 'Mechanical Keyboard',
      price: 50,
      stock: 27,
      isActive: true,
    },
  });
}

main()
  .catch((e) => {
    console.log(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
