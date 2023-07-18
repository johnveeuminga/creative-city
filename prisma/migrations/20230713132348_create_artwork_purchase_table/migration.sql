-- AlterTable
ALTER TABLE `Artwork` ADD COLUMN `inStock` BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE `ArtworkPurchase` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `artworkId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `xendItRefId` VARCHAR(191) NOT NULL,
    `paymentStatus` ENUM('PAID', 'PENDING', 'FAILED') NOT NULL DEFAULT 'PAID',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ArtworkPurchase` ADD CONSTRAINT `ArtworkPurchase_artworkId_fkey` FOREIGN KEY (`artworkId`) REFERENCES `Artwork`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArtworkPurchase` ADD CONSTRAINT `ArtworkPurchase_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
