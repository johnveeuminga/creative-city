/*
  Warnings:

  - You are about to alter the column `start_date` on the `Auction` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `end_date` on the `Auction` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Artist` DROP FOREIGN KEY `Artist_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Artwork` DROP FOREIGN KEY `Artwork_artist_id_fkey`;

-- AlterTable
ALTER TABLE `Artist` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Artwork` ADD COLUMN `minimum_bid` DOUBLE NULL,
    MODIFY `artist_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Auction` MODIFY `start_date` DATETIME NOT NULL,
    MODIFY `end_date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `Follow` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `artistId` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bid` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `artwork_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ArtworkHighestBid` (
    `artwork_id` INTEGER NOT NULL,
    `bid_id` INTEGER NULL,
    `version` INTEGER NOT NULL DEFAULT 1,

    UNIQUE INDEX `ArtworkHighestBid_artwork_id_key`(`artwork_id`),
    UNIQUE INDEX `ArtworkHighestBid_bid_id_key`(`bid_id`),
    PRIMARY KEY (`artwork_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_id_key` ON `User`(`id`);

-- AddForeignKey
ALTER TABLE `Artist` ADD CONSTRAINT `Artist_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Follow` ADD CONSTRAINT `Follow_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Follow` ADD CONSTRAINT `Follow_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Artwork` ADD CONSTRAINT `Artwork_artist_id_fkey` FOREIGN KEY (`artist_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bid` ADD CONSTRAINT `Bid_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bid` ADD CONSTRAINT `Bid_artwork_id_fkey` FOREIGN KEY (`artwork_id`) REFERENCES `Artwork`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArtworkHighestBid` ADD CONSTRAINT `ArtworkHighestBid_artwork_id_fkey` FOREIGN KEY (`artwork_id`) REFERENCES `Artwork`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArtworkHighestBid` ADD CONSTRAINT `ArtworkHighestBid_bid_id_fkey` FOREIGN KEY (`bid_id`) REFERENCES `Bid`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
