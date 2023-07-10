import { Prisma, PrismaClient } from "@prisma/client";
import { parseArgs } from 'node:util'
import { seed as artistSeed} from './seeders/artist.seed'


const prisma = new PrismaClient();

const seedData: Prisma.AuctionCreateManyArgs = {
  data: [
    {
      name: "Auction 1",
      description: "Auction Sample 1",
      start_date: new Date(2023, 5, 8, 8, 0),
      end_date: new Date(2023, 6, 1, 3, 59),
    }
  ],
};

type Option = {
  type: 'boolean' | 'string', // required
  short?: string, // optional
  multiple?: boolean, // optional, default `false`
};

type Options = {
  [key: string]: Option 
}

const options: Options = {
  seeder: { 
    type: 'string'
  },
}

async function runSpecificSeeder(seeder: string) {
  try {
    const seed = await import(`./seeders/${seeder}.seed.ts`)

    await seed.seed()
  } catch(e) {
    console.log(e)
  }
}

async function seed() {
  const {
    values: { seeder }
  } = parseArgs({ options });

  if(seeder) {
    runSpecificSeeder(seeder.toString())
  } else {
    await artistSeed()
    await prisma.auction.createMany(seedData)
  }
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) =>     {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
