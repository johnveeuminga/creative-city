import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const data = [
  {
    name: "Auction 1",
    description: "Auction Sample 1",
    start_date: new Date(2023, 5, 8, 8, 0),
    end_date: new Date(2023, 6, 1, 3, 59),
    artist: {
      create: {
        first_name: "John",
        last_name: "Doe",
        email: "john@example.com",
        Artist: {
          create: {
            nickname: "JohnDoe",
            myStory: "I am an artist with a passion for painting.",
            myBio: "I have been painting for over 10 years and love to explore various themes and styles.",
            artworkPickUpAddress: "123 Art Street, City",
            contactNumber: "1234567890",
            gcash: "gcash@example.com",
            paymaya: "paymaya@example.com",
            status: 'APPROVED',
          },
        },
      },
    },
  },
  // Add more auction entries here if needed
];

async function seed() {
  for (const auctionData of data) {
    const auction = await prisma.auction.create({
      data: auctionData,
    });

    console.log(`Created auction with ID: ${auction.id}`);
  }
}

seed()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Auction seed completed successfully.");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
