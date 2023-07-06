import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const data: Prisma.ArtistCreateInput[] = [
  {
    user: {
      create: {
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
      },
    },
    nickname: "JohnDoe",
    myStory: "I am an artist with a passion for painting.",
    myBio: "I have been painting for over 10 years and love to explore various themes and styles.",
    artworkPickUpAddress: "123 Art Street, City",
    contactNumber: "1234567890",
    gcash: "gcash@example.com",
    paymaya: "paymaya@example.com",
    interests: {
      create: [
        { name: "Abstract" },
        { name: "Landscape" },
        { name: "Portrait" },
      ],
    },
    status: "APPROVED",
  },
  {
    user: {
      create: {
        first_name: "Jane",
        last_name: "Smith",
        email: "jane.smith@example.com",
      },
    },
    nickname: "JaneSmith",
    myStory: "I am a sculptor inspired by nature and organic forms.",
    myBio: "I find beauty in the interplay of materials and love to create sculptures that evoke emotions.",
    artworkPickUpAddress: "456 Sculpture Lane, City",
    contactNumber: "9876543210",
    gcash: "gcash@example.com",
    paymaya: "paymaya@example.com",
    interests: {
      create: [
        { name: "Sculpture" },
        { name: "Nature" },
        { name: "Abstract" },
      ],
    },
    status: "APPROVED",
  },
];

async function seed() {
  for (const artistData of data) {
    await prisma.artist.create({
      data: artistData,
    });
  }
}

seed()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Artist seed completed successfully.");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
