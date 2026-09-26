import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'generated/prisma/client';

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DIRECT_URL!,
  }),
});

async function main() {
  // await prisma.product.createMany({
  //   data: [
  //     {
  //     name: 'Mechanical Keyboard',
  //     price: 50,
  //     stock: 27,
  //     isActive: true,
  //   },

  // ],
  // });
  const products = [
    {
      name: 'Wireless Mouse',
      price: 25.99,
      stock: 50,
      isActive: true,
    },
    {
      name: 'USB-C Hub',
      price: 39.5,
      stock: 30,
      isActive: true,
    },
    {
      name: 'Laptop Stand',
      price: 32.0,
      stock: 20,
      isActive: true,
    },
    {
      name: 'HD Webcam',
      price: 59.99,
      stock: 15,
      isActive: true,
    },
    {
      name: 'Bluetooth Headphones',
      price: 89.99,
      stock: 35,
      isActive: true,
    },
    {
      name: 'Portable SSD 1TB',
      price: 109.99,
      stock: 12,
      isActive: true,
    },
    {
      name: 'USB-C Charging Cable',
      price: 9.99,
      stock: 100,
      isActive: true,
    },
    {
      name: '27-inch Monitor',
      price: 249.99,
      stock: 10,
      isActive: true,
    },
    {
      name: 'Wireless Keyboard',
      price: 45.0,
      stock: 28,
      isActive: true,
    },
    {
      name: 'Laptop Backpack',
      price: 49.99,
      stock: 40,
      isActive: true,
    },
    {
      name: 'Gaming Mouse Pad',
      price: 14.99,
      stock: 60,
      isActive: true,
    },
    {
      name: 'USB Microphone',
      price: 74.5,
      stock: 18,
      isActive: true,
    },
    {
      name: 'Power Bank 20000mAh',
      price: 39.99,
      stock: 25,
      isActive: true,
    },
    {
      name: 'Laptop Cooling Pad',
      price: 29.99,
      stock: 22,
      isActive: true,
    },
    {
      name: 'Mechanical Keyboard Wrist Rest',
      price: 18.5,
      stock: 45,
      isActive: true,
    },
  ];

  await prisma.product.createMany({
    data: products,
  });
  console.log('Products seeded successfully');
}

main()
  .catch((e) => {
    console.log(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
