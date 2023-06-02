/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Videos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "_CategoryToVideo" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToVideo_AB_unique" ON "_CategoryToVideo"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToVideo_B_index" ON "_CategoryToVideo"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Categories_title_key" ON "Categories"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Videos_title_key" ON "Videos"("title");

-- AddForeignKey
ALTER TABLE "_CategoryToVideo" ADD CONSTRAINT "_CategoryToVideo_A_fkey" FOREIGN KEY ("A") REFERENCES "Categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToVideo" ADD CONSTRAINT "_CategoryToVideo_B_fkey" FOREIGN KEY ("B") REFERENCES "Videos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
