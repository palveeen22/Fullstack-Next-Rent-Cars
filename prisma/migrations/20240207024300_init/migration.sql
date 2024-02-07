-- CreateTable
CREATE TABLE "Cars" (
    "id" SERIAL NOT NULL,
    "car_name" VARCHAR(50) NOT NULL,
    "day_rate" DECIMAL(65,30) NOT NULL,
    "month_rate" DECIMAL(65,30) NOT NULL,
    "image" VARCHAR(256) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" SERIAL NOT NULL,
    "carsId" INTEGER,
    "order_date" TIMESTAMP(3) NOT NULL,
    "pickup_date" TIMESTAMP(3) NOT NULL,
    "dropoff_date" TIMESTAMP(3) NOT NULL,
    "pickup_location" VARCHAR(50) NOT NULL,
    "dropoff_location" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_carsId_fkey" FOREIGN KEY ("carsId") REFERENCES "Cars"("id") ON DELETE SET NULL ON UPDATE CASCADE;
