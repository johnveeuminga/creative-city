/*
  Warnings:

  - Made the column `bidId` on table `ArtworkHighestBid` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `ArtworkHighestBid` DROP FOREIGN KEY `ArtworkHighestBid_bidId_fkey`;

-- AlterTable
ALTER TABLE `ArtworkHighestBid` MODIFY `bidId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `ArtworkHighestBid` ADD CONSTRAINT `ArtworkHighestBid_bidId_fkey` FOREIGN KEY (`bidId`) REFERENCES `Bid`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
