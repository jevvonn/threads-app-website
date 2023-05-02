/*
  Warnings:

  - You are about to drop the `Tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TagsToThread` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_TagsToThread" DROP CONSTRAINT "_TagsToThread_A_fkey";

-- DropForeignKey
ALTER TABLE "_TagsToThread" DROP CONSTRAINT "_TagsToThread_B_fkey";

-- DropTable
DROP TABLE "Tags";

-- DropTable
DROP TABLE "_TagsToThread";

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TagToThread" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_id_key" ON "Tag"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_TagToThread_AB_unique" ON "_TagToThread"("A", "B");

-- CreateIndex
CREATE INDEX "_TagToThread_B_index" ON "_TagToThread"("B");

-- AddForeignKey
ALTER TABLE "_TagToThread" ADD CONSTRAINT "_TagToThread_A_fkey" FOREIGN KEY ("A") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToThread" ADD CONSTRAINT "_TagToThread_B_fkey" FOREIGN KEY ("B") REFERENCES "Thread"("id") ON DELETE CASCADE ON UPDATE CASCADE;
