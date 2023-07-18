-- AlterTable
ALTER TABLE `ArtworkPurchase` MODIFY `paymentStatus` ENUM('PAID', 'PENDING', 'FAILED') NOT NULL DEFAULT 'PENDING';
