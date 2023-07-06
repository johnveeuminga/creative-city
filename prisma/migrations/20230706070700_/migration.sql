/*
  Warnings:

  - The primary key for the `ArtworkHighestBid` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `artwork_id` on the `ArtworkHighestBid` table. All the data in the column will be lost.
  - You are about to drop the column `bid_id` on the `ArtworkHighestBid` table. All the data in the column will be lost.
  - You are about to alter the column `start_date` on the `Auction` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `end_date` on the `Auction` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `artwork_id` on the `Bid` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Bid` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[artworkId]` on the table `ArtworkHighestBid` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bidId]` on the table `ArtworkHighestBid` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `artworkId` to the `ArtworkHighestBid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `artworkId` to the `Bid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Bid` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ArtworkHighestBid` DROP FOREIGN KEY `ArtworkHighestBid_artwork_id_fkey`;

-- DropForeignKey
ALTER TABLE `ArtworkHighestBid` DROP FOREIGN KEY `ArtworkHighestBid_bid_id_fkey`;

-- DropForeignKey
ALTER TABLE `Bid` DROP FOREIGN KEY `Bid_artwork_id_fkey`;

-- DropForeignKey
ALTER TABLE `Bid` DROP FOREIGN KEY `Bid_user_id_fkey`;

-- AlterTable
ALTER TABLE `ArtworkHighestBid` DROP PRIMARY KEY,
    DROP COLUMN `artwork_id`,
    DROP COLUMN `bid_id`,
    ADD COLUMN `artworkId` INTEGER NOT NULL,
    ADD COLUMN `bidId` INTEGER NULL,
    ADD PRIMARY KEY (`artworkId`);

-- AlterTable
ALTER TABLE `Auction` ADD COLUMN `artistId` INTEGER NULL,
    MODIFY `start_date` DATETIME NOT NULL,
    MODIFY `end_date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Bid` DROP COLUMN `artwork_id`,
    DROP COLUMN `user_id`,
    ADD COLUMN `artworkId` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `ArtworkHighestBid_artworkId_key` ON `ArtworkHighestBid`(`artworkId`);

-- CreateIndex
CREATE UNIQUE INDEX `ArtworkHighestBid_bidId_key` ON `ArtworkHighestBid`(`bidId`);

-- AddForeignKey
ALTER TABLE `Auction` ADD CONSTRAINT `Auction_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bid` ADD CONSTRAINT `Bid_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bid` ADD CONSTRAINT `Bid_artworkId_fkey` FOREIGN KEY (`artworkId`) REFERENCES `Artwork`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArtworkHighestBid` ADD CONSTRAINT `ArtworkHighestBid_artworkId_fkey` FOREIGN KEY (`artworkId`) REFERENCES `Artwork`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArtworkHighestBid` ADD CONSTRAINT `ArtworkHighestBid_bidId_fkey` FOREIGN KEY (`bidId`) REFERENCES `Bid`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
