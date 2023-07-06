import { PrismaClient, ArtistStatus } from "@prisma/client";

const prisma = new PrismaClient();

const data = [
  {
    user: {
      create: {
        id: 1,
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
      },
    },
    nickname: "@john_doe",
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
    status: ArtistStatus.APPROVED,
  },
  {
    user: {
      create: {
        id: 2,
        first_name: "Jane",
        last_name: "Smith",
        email: "jane.smith@example.com",
      },
    },
    nickname: "@jane_smith",
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
    status: ArtistStatus.APPROVED,
  },
  {
    user: {
      create: {
        id: 3,
        first_name: "Sarah",
        last_name: "Johnson",
        email: "sarah.johnson@example.com",
      },
    },
    nickname: "@sarah_johnson",
    myStory: "I am a digital artist exploring the intersection of technology and art.",
    myBio: "I create digital artworks using various software and techniques to convey my vision.",
    artworkPickUpAddress: "789 Digital Avenue, City",
    contactNumber: "4567890123",
    gcash: "gcash@example.com",
    paymaya: "paymaya@example.com",
    interests: {
      create: [
        { name: "Digital Art" },
        { name: "Technology" },
        { name: "Abstract" },
      ],
    },
    status: ArtistStatus.APPROVED,
  },
  {
    user: {
      create: {
        id: 4,
        first_name: "Michael",
        last_name: "Brown",
        email: "michael.brown@example.com",
      },
    },
    nickname: "@michael_brown",
    myStory: "I am a photographer capturing the beauty of the world through my lens.",
    myBio: "I specialize in landscape and nature photography, showcasing the wonders of our planet.",
    artworkPickUpAddress: "123 Photography Street, City",
    contactNumber: "7890123456",
    gcash: "gcash@example.com",
    paymaya: "paymaya@example.com",
    interests: {
      create: [
        { name: "Photography" },
        { name:"Landscapes" },
        { name: "Nature" },
      ],
    },
    status: ArtistStatus.APPROVED,
  },
  {
    user: {
      create: {
        id: 5,
        first_name: "Emily",
        last_name: "Davis",
        email: "emily.davis@example.com",
      },
    },
    nickname: "@emily_davis",
    myStory: "I am a mixed media artist exploring textures and layers in my artworks.",
    myBio: "I combine various materials and techniques to create visually intriguing and tactile pieces.",
    artworkPickUpAddress: "456 Mixed Media Lane, City",
    contactNumber: "0123456789",
    gcash: "gcash@example.com",
    paymaya: "paymaya@example.com",
    interests: {
      create: [
        { name: "Mixed Media" },
        { name: "Texture" },
        { name: "Abstract" },
      ],
    },
    status: ArtistStatus.APPROVED,
  },
  {
    user: {
      create: {
        id: 6,
        first_name: "David",
        last_name: "Wilson",
        email: "david.wilson@example.com",
      },
    },
    nickname: "@david_wilson",
    myStory: "I am a street artist bringing color and creativity to urban spaces.",
    myBio: "I use graffiti and street art techniques to express my thoughts and engage with the community.",
    artworkPickUpAddress: "789 Street Art Avenue, City",
    contactNumber: "6789012345",
    gcash: "gcash@example.com",
    paymaya: "paymaya@example.com",
    interests: {
      create: [
        { name: "Street Art" },
        { name: "Graffiti" },
        { name: "Urban Art" },
      ],
    },
    status: ArtistStatus.APPROVED,
  },
  {
    user: {
      create: {
        id: 7,
        first_name: "Sophia",
        last_name: "Martin",
        email: "sophia.martin@example.com",
      },
    },
    nickname: "@sophia_martin",
    myStory: "I am a ceramic artist inspired by organic forms and the beauty of imperfections.",
    myBio: "I create unique ceramic sculptures and vessels that celebrate the tactile nature of clay.",
    artworkPickUpAddress: "123 Ceramic Lane, City",
    contactNumber: "9012345678",
    gcash: "gcash@example.com",
    paymaya: "paymaya@example.com",
    interests: {
      create: [
        { name: "Ceramics" },
        { name: "Sculpture" },
        { name: "Organic Forms" },
      ],
    },
    status: ArtistStatus.APPROVED,
  },
  {
    user: {
      create: {
        id: 8,
        first_name: "Oliver",
        last_name: "Robinson",
        email: "oliver.robinson@example.com",
      },
    },
    nickname: "@oliver_robinson",
    myStory: "I am a graphic designer with a minimalist approach to visual communication.",
    myBio: "I create clean and impactful designs that effectively convey the intended message.",
    artworkPickUpAddress: "456 Design Street, City",
    contactNumber: "7890123456",
    gcash: "gcash@example.com",
    paymaya: "paymaya@example.com",
    interests: {
      create: [
        { name: "Graphic Design" },
        { name: "Nature" },
        { name: "Abstract" },
      ],
    },
    status: ArtistStatus.APPROVED,
  },
  {
    user: {
      create: {
        id: 9,
        first_name: "Mia",
        last_name: "Anderson",
        email: "mia.anderson@example.com",
      },
    },
    nickname: "@mia_anderson",
    myStory: "I am a jewelry artist crafting unique pieces inspired by nature and symbolism.",
    myBio: "I use precious metals and gemstones to create meaningful and wearable works of art.",
    artworkPickUpAddress: "123 Jewelry Lane, City",
    contactNumber: "5678901234",
    gcash: "gcash@example.com",
    paymaya: "paymaya@example.com",
    interests: {
      create: [
        { name: "Jewelry Design" },
        { name: "Nature" },
        { name: "Symbolism" },
      ],
    },
    status: ArtistStatus.APPROVED,
  },
  {
    user: {
      create: {
        id: 10,
        first_name: "William",
        last_name: "Taylor",
        email: "william.taylor@example.com",
      },
    },
    nickname: "@william_taylor",
    myStory: "I am an illustrator creating whimsical and imaginative artworks for children's books.",
    myBio: "I bring stories to life through colorful illustrations that spark imagination and wonder.",
    artworkPickUpAddress: "456 Illustration Lane, City",
    contactNumber: "3456789012",
    gcash: "gcash@example.com",
    paymaya: "paymaya@example.com",
    interests: {
      create: [
        { name: "Illustration" },
        { name: "Children's Books" },
        { name: "Whimsical Art" },
      ],
    },
    status: ArtistStatus.APPROVED,
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
