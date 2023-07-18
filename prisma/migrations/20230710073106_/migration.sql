/*
  Warnings:

  - You are about to alter the column `start_date` on the `Auction` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `end_date` on the `Auction` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `Auction` MODIFY `start_date` DATETIME NOT NULL,
    MODIFY `end_date` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Artist` DROP FOREIGN KEY `Artist_userId_fkey`;
ALTER TABLE `Follow` DROP FOREIGN KEY `Follow_userId_fkey`;
ALTER TABLE `Bid` DROP FOREIGN KEY `Bid_userId_fkey`;
ALTER TABLE `Artwork` DROP FOREIGN KEY `Artwork_artist_id_fkey`;

-- AlterTable
ALTER TABLE `User` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT;

-- Add Foreign Keys
ALTER TABLE `Artist` ADD CONSTRAINT `Artist_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `Follow` ADD CONSTRAINT `Follow_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `Bid` ADD CONSTRAINT `Bid_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `Artwork` ADD CONSTRAINT `Artwork_artist_id_fkey` FOREIGN KEY (`artist_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;