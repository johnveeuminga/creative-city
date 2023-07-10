import { PrismaClient } from "@prisma/client";
import { parseArgs } from 'node:util'

const prisma = new PrismaClient();

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
    const seed = await import(`./seeders/${seeder}.seeder.ts`)

    await seed.default.seed()
  } catch(e) {
    console.log(e)
  }
}

async function seed() {
  const {
    values: { seeder }
  } = parseArgs({ options });

  if(seeder) {
    await runSpecificSeeder(seeder.toString())
  } else {
    const defaultSeeder = await import('./seeders/database.seeder')
    defaultSeeder.default.seed();
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
