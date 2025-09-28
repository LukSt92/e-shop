/*
  Warnings:

  - You are about to alter the column `addedPrice` on the `CartItem` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE "public"."CartItem" ALTER COLUMN "addedPrice" SET DATA TYPE DECIMAL(65,30);
