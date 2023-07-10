export abstract class Seeder {
  static async seed(): Promise<void> {}
}

export interface ISeeder {
  seed: () => Promise<void>
}