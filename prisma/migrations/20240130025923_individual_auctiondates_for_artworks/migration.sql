/*
  Warnings:

  - You are about to drop the column `auctionApproved` on the `Artwork` table. All the data in the column will be lost.
  - You are about to drop the column `auction_id` on the `Artwork` table. All the data in the column will be lost.
  - You are about to drop the column `isAuction` on the `Artwork` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Artwork` DROP FOREIGN KEY `Artwork_auction_id_fkey`;

-- AlterTable
ALTER TABLE `Artwork` DROP COLUMN `auctionApproved`,
    DROP COLUMN `auction_id`,
    DROP COLUMN `isAuction`;

-- CreateTable
CREATE TABLE `ArtworkAuction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `artwork_id` INTEGER NOT NULL,
    `auction_id` INTEGER NOT NULL,
    `approvedAt` DATETIME(3) NOT NULL,
    `startDateTime` DATETIME(3) NOT NULL,
    `endDateTime` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ArtworkAuction` ADD CONSTRAINT `ArtworkAuction_artwork_id_fkey` FOREIGN KEY (`artwork_id`) REFERENCES `Artwork`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArtworkAuction` ADD CONSTRAINT `ArtworkAuction_auction_id_fkey` FOREIGN KEY (`auction_id`) REFERENCES `Auction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
