import { PrismaClient, ArtistStatus, Prisma, User } from "@prisma/client";
import { faker } from '@faker-js/faker';
import { Seeder } from "./seeder.interface";


const prisma = new PrismaClient();

const userData = (): Prisma.UserCreateInput[] => {
  return new Array(20).fill('').map((_, i) => {
    return {
      name: faker.person.fullName(), 
      email: faker.internet.email(),
      cognitoId: `cognito_user_${i}`
    }
  });
}

export default class ArtistSeeder extends Seeder {
  static async seed() {
    const users = userData()
  
    const artists: Prisma.ArtistCreateInput[] = users.map((user) => {
      return {
        nickname: '@' + faker.internet.userName(),
        status: ArtistStatus.APPROVED,
        avatar_path: faker.internet.avatar(),
        myBio: faker.lorem.paragraph(),
        artworkPickUpAddress: faker.location.streetAddress(),
        myStory: faker.lorem.paragraph(),
        contactNumber: faker.phone.number(),
        gcash: faker.internet.email(),
        paymaya: faker.internet.email(),
        user: {
          create: {
            ...user,
          }
        }
      } 
    })

    let promises: Promise<any>[] = []

    artists.forEach(artist => {
      promises.push(prisma.artist.create({
        data: artist,
      }));
    })

    await Promise.all(promises)
  }
}
