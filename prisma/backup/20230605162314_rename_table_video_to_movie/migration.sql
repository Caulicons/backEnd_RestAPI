/*
  Warnings:

  - You are about to drop the `Videos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToVideo` table. If the table is not empty, all the data it contains will be lost.

*/

-- AlterForeignKey
ALTER TABLE "_CategoryToVideo" RENAME CONSTRAINT "_CategoryToVideo_A_fkey" TO "_CategoryToMovie_A_fkey";

-- AlterForeignKey
ALTER TABLE "_CategoryToVideo" RENAME CONSTRAINT "_CategoryToVideo_B_fkey" TO "_CategoryToMovie_B_fkey";

-- AlterRelationTable
ALTER TABLE "_CategoryToVideo" RENAME TO "_CategoryToMovie";

-- AlterTable
ALTER TABLE "Videos" RENAME TO "Movies";

-- AlterTable
ALTER TABLE "Movies" RENAME CONSTRAINT "Videos_pkey" TO "Movies_pkey";

-- RenameIndex
ALTER INDEX "Videos_title_key" RENAME TO "Movies_title_key";

-- RenameIndex
ALTER INDEX "_CategoryToVideo_AB_unique" RENAME TO "_CategoryToMovie_AB_unique";

-- RenameIndex
ALTER INDEX "_CategoryToVideo_B_index" RENAME TO "_CategoryToMovie_B_index";
/*  */

