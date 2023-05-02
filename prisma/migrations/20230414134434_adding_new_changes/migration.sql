/*
  Warnings:

  - You are about to drop the column `source` on the `Thread` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Thread` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `Thread` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ThreadType" AS ENUM ('POST_BODY', 'POST_SOURCE');

-- AlterTable
ALTER TABLE "Thread" DROP COLUMN "source",
ADD COLUMN     "categoryId" TEXT NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "ThreadType" NOT NULL;

-- CreateTable
CREATE TABLE "ThreadSource" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "threadId" TEXT NOT NULL,

    CONSTRAINT "ThreadSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_TagsToThread" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ThreadSource_id_key" ON "ThreadSource"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Tags_id_key" ON "Tags"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Category_id_key" ON "Category"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_TagsToThread_AB_unique" ON "_TagsToThread"("A", "B");

-- CreateIndex
CREATE INDEX "_TagsToThread_B_index" ON "_TagsToThread"("B");

-- AddForeignKey
ALTER TABLE "ThreadSource" ADD CONSTRAINT "ThreadSource_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "Thread"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Thread" ADD CONSTRAINT "Thread_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagsToThread" ADD CONSTRAINT "_TagsToThread_A_fkey" FOREIGN KEY ("A") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagsToThread" ADD CONSTRAINT "_TagsToThread_B_fkey" FOREIGN KEY ("B") REFERENCES "Thread"("id") ON DELETE CASCADE ON UPDATE CASCADE;
