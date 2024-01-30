-- DropForeignKey
ALTER TABLE `ArtworkHighestBid` DROP FOREIGN KEY `ArtworkHighestBid_artworkId_fkey`;

-- DropForeignKey
ALTER TABLE `Bid` DROP FOREIGN KEY `Bid_artworkId_fkey`;

-- AddForeignKey
ALTER TABLE `Bid` ADD CONSTRAINT `Bid_artworkId_fkey` FOREIGN KEY (`artworkId`) REFERENCES `ArtworkAuction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
