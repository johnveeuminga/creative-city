import { Auction, Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const data: Prisma.AuctionCreateInput[] = [
  {
    name: "Auction 1",
    description: "Auction Sample 1",
    start_date: new Date(2023, 5, 8, 8, 0),
    end_date: new Date(2023, 5, 31, 11, 59)
  },
  {
    name: "Auction 2",
    description: "Auction Sample 2",
    start_date: new Date(2023, 6, 1, 8, 0),
    end_date: new Date(2023, 6, 31, 11, 59),

  },
  {
    name: "Auction 6",
    description: "Auction Sample 6",
    start_date: new Date(2023, 5, 8, 8, 0),
    end_date: new Date(2023, 5, 31, 11, 59)
  },
  {
    name: "Auction 5",
    description: "Auction Sample 5",
    start_date: new Date(2023, 6, 1, 8, 0),
    end_date: new Date(2023, 6, 31, 11, 59),
  },
  {
    name: "Auction 3",
    description: "Auction Sample 3",
    start_date: new Date(2023, 6, 1, 8, 0),
    end_date: new Date(2023, 6, 31, 11, 59),
  },
  {
    name: "Auction 4",
    description: "Auction Sample 4",
    start_date: new Date(2023, 6, 1, 8, 0),
    end_date: new Date(2023, 6, 31, 11, 59),
  },
]

async function seed() {
  await prisma.auction.createMany({
    data,
  });
}

seed()
  .then(async () => {
    await prisma.$disconnect()
  }).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

  // start_date: new Date(2023, 5, 8, 8, 0),
  // end_date: new Date(2023, 5, 31, 11, 59)