/*
  Warnings:

  - You are about to drop the column `title` on the `Categories` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Categories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Categories` table without a default value. This is not possible if the table is not empty.

-- DropIndex
DROP INDEX "Categories_title_key";

-- AlterTable
ALTER TABLE "Categories" DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Categories_name_key" ON "Categories"("name");
*/

-- AlterTable
ALTER TABLE "Categories" RENAME COLUMN "title" TO "name";

-- AlterIndex
ALTER INDEX "Categories_title_key" RENAME TO "Categories_name_key";
