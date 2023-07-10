import { Prisma, PrismaClient } from "@prisma/client";
import { Seeder } from "./seeder.interface";
import { faker } from "@faker-js/faker";
import { startCase } from "lodash";

const prisma = new PrismaClient()

export default class AuctionArtworkSeeder extends Seeder {
  static async seed(): Promise<void> {
    const data: Prisma.ArtworkCreateInput[] = new Array(30).fill("_").map(() => {
      const minBid = faker.number.int({ min: 1000, max: 2000 })
      return {
        name: startCase(faker.lorem.words(3)),
        description: faker.lorem.paragraph(),
        artist: {
          connect: {
            id: faker.number.int({ min: 1, max: 10})
          }
        },
        auction: {
          connect: {
            id: faker.number.int({ min: 1, max: 10})
          }
        },
        minimum_bid: minBid,
        bids: {
          create: {
            amount: minBid + 20,
            user: {
              connect: {
                id: faker.number.int({ min: 1, max: 10 })
              }
            }
          }
        }
      }
    })

    let promises: Promise<any>[] = [];

    data.forEach(artwork => {
      promises.push(prisma.artwork.create({
        data: artwork,
      }))
    });

    await Promise.all(promises);
  }

}