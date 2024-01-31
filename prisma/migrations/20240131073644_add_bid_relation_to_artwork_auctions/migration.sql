/*
  Warnings:

  - You are about to drop the column `artworkId` on the `Bid` table. All the data in the column will be lost.
  - Added the required column `artworkAuctionId` to the `Bid` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ArtworkHighestBid` DROP FOREIGN KEY `ArtworkHighestBid_bidId_fkey`;

-- DropForeignKey
ALTER TABLE `Bid` DROP FOREIGN KEY `Bid_artworkId_fkey`;

-- AlterTable
ALTER TABLE `Bid` DROP COLUMN `artworkId`,
    ADD COLUMN `artworkAuctionId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Bid` ADD CONSTRAINT `Bid_artworkAuctionId_fkey` FOREIGN KEY (`artworkAuctionId`) REFERENCES `ArtworkAuction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
