const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const car1 = await prisma.cars.create({
    data: {
      car_name: 'Toyota Corolla',
      day_rate: 30.00,
      month_rate: 800.00,
      image: 'https://dealermobilhondamagelang.com/wp-content/uploads/2023/02/honda-hr-v-magelang.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const car2 = await prisma.cars.create({
    data: {
      car_name: 'Honda Civic',
      day_rate: 35.00,
      month_rate: 850.00,
      image: 'https://www.hondasamarinda.id/wp-content/uploads/2020/01/honda-civic-type-r-by-kedai-website-2.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  await prisma.orders.create({
    data: {
      carsId: car1.id,
      order_date: new Date(),
      pickup_date: new Date('2024-02-10'),
      dropoff_date: new Date('2024-02-15'),
      pickup_location: 'Location A',
      dropoff_location: 'Location B',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  await prisma.orders.create({
    data: {
      carsId: car2.id,
      order_date: new Date(),
      pickup_date: new Date('2024-03-05'),
      dropoff_date: new Date('2024-03-10'),
      pickup_location: 'Location C',
      dropoff_location: 'Location D',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
}
  console.log("SEED >");
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
