-- AddForeignKey
ALTER TABLE `ArtworkHighestBid` ADD CONSTRAINT `ArtworkHighestBid_bidId_fkey` FOREIGN KEY (`bidId`) REFERENCES `Bid`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
