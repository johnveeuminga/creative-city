/*
  Warnings:

  - Added the required column `dimensions` to the `Artwork` table without a default value. This is not possible if the table is not empty.
  - Added the required column `material` to the `Artwork` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortDescription` to the `Artwork` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `Artwork` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Artwork` ADD COLUMN `dimensions` VARCHAR(191) NOT NULL,
    ADD COLUMN `material` VARCHAR(191) NOT NULL,
    ADD COLUMN `shortDescription` LONGTEXT NOT NULL,
    ADD COLUMN `weight` DOUBLE NOT NULL;
