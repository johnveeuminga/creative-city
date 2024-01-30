import ArtistSeeder from "./artist.seeder";
import AuctionArtworkSeeder from "./auction-artwork.seeder";
import AuctionSeeder from "./auction.seeder";
import { Seeder } from "./seeder.interface";

export default class DatabaseSeeder extends Seeder {
  static async seed() {
    await ArtistSeeder.seed();
    await AuctionSeeder.seed();
    // await AuctionArtworkSeeder.seed();
  }
}