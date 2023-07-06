import { Auction, Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const data: Prisma.AuctionCreateInput[] = [
  {
    name: "Auction 1",
    description: "Auction Sample 1",
    start_date: new Date(2023, 5, 8, 8, 0),
    end_date: new Date(2023, 5, 31, 11, 59),
    artworks: {
      createMany: {
        data: [
          { name: "Artwork 1", description: "Artwork Sample 1" },
          { name: "Artwork 2", description: "Artwork Sample 2" },
        ],
      },
    },
    artist: {
      create: {
        first_name: "John",
        last_name: "Doe",
        email: "john@example.com",
        artworks: {
          create: [
            { name: "John's Artwork 1", description: "John's Artwork Sample 1" },
            { name: "John's Artwork 2", description: "John's Artwork Sample 2" },
          ],
        },
      },
    },
  },
  // Add more auction entries here if needed
];

async function seed() {
  await prisma.auction.createMany({
    data,
  });
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
