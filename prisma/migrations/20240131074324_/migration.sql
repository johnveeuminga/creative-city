/*
  Warnings:

  - The primary key for the `ArtworkHighestBid` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `artworkId` on the `ArtworkHighestBid` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[artworkAuctionId]` on the table `ArtworkHighestBid` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `artworkAuctionId` to the `ArtworkHighestBid` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `ArtworkHighestBid_artworkId_key` ON `ArtworkHighestBid`;

-- AlterTable
ALTER TABLE `ArtworkHighestBid` DROP PRIMARY KEY,
    DROP COLUMN `artworkId`,
    ADD COLUMN `artworkAuctionId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`artworkAuctionId`);

-- CreateIndex
CREATE UNIQUE INDEX `ArtworkHighestBid_artworkAuctionId_key` ON `ArtworkHighestBid`(`artworkAuctionId`);

-- AddForeignKey
ALTER TABLE `ArtworkHighestBid` ADD CONSTRAINT `ArtworkHighestBid_artworkAuctionId_fkey` FOREIGN KEY (`artworkAuctionId`) REFERENCES `ArtworkAuction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
