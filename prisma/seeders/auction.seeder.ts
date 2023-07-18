import { Prisma, PrismaClient } from "@prisma/client";
import { Seeder } from "./seeder.interface";
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";

const prisma = new PrismaClient()

export default class AuctionSeeder extends Seeder {
  static async seed(): Promise<void> {
    const data: Prisma.AuctionCreateManyInput[] = new Array(10).fill("_").map((val, index) => {
      const startDate = faker.date.between({
        from: DateTime.now().toJSDate(),
        to: DateTime.now().plus({ days: 30 }).toJSDate(),
      })

      const endDate = DateTime.fromJSDate(startDate).plus({ days: 7 }).toJSDate()

      return {
        name: `Creative City Auction ${index}`,
        description: faker.lorem.paragraph(),
        start_date: startDate,
        end_date: endDate,
      }
    });

    await prisma.auction.createMany({
      data
    })
  }
}