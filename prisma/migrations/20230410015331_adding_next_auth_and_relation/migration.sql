/*
  Warnings:

  - Added the required column `userId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Thread` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Thread" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_vote_up_thread" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_vote_down_thread" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_likes_thread" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_saved_thread" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_vote_up_comment" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_vote_down_comment" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_likes_comment" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_vote_up_thread_AB_unique" ON "_vote_up_thread"("A", "B");

-- CreateIndex
CREATE INDEX "_vote_up_thread_B_index" ON "_vote_up_thread"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_vote_down_thread_AB_unique" ON "_vote_down_thread"("A", "B");

-- CreateIndex
CREATE INDEX "_vote_down_thread_B_index" ON "_vote_down_thread"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_likes_thread_AB_unique" ON "_likes_thread"("A", "B");

-- CreateIndex
CREATE INDEX "_likes_thread_B_index" ON "_likes_thread"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_saved_thread_AB_unique" ON "_saved_thread"("A", "B");

-- CreateIndex
CREATE INDEX "_saved_thread_B_index" ON "_saved_thread"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_vote_up_comment_AB_unique" ON "_vote_up_comment"("A", "B");

-- CreateIndex
CREATE INDEX "_vote_up_comment_B_index" ON "_vote_up_comment"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_vote_down_comment_AB_unique" ON "_vote_down_comment"("A", "B");

-- CreateIndex
CREATE INDEX "_vote_down_comment_B_index" ON "_vote_down_comment"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_likes_comment_AB_unique" ON "_likes_comment"("A", "B");

-- CreateIndex
CREATE INDEX "_likes_comment_B_index" ON "_likes_comment"("B");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Thread" ADD CONSTRAINT "Thread_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_vote_up_thread" ADD CONSTRAINT "_vote_up_thread_A_fkey" FOREIGN KEY ("A") REFERENCES "Thread"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_vote_up_thread" ADD CONSTRAINT "_vote_up_thread_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_vote_down_thread" ADD CONSTRAINT "_vote_down_thread_A_fkey" FOREIGN KEY ("A") REFERENCES "Thread"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_vote_down_thread" ADD CONSTRAINT "_vote_down_thread_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likes_thread" ADD CONSTRAINT "_likes_thread_A_fkey" FOREIGN KEY ("A") REFERENCES "Thread"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likes_thread" ADD CONSTRAINT "_likes_thread_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_saved_thread" ADD CONSTRAINT "_saved_thread_A_fkey" FOREIGN KEY ("A") REFERENCES "Thread"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_saved_thread" ADD CONSTRAINT "_saved_thread_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_vote_up_comment" ADD CONSTRAINT "_vote_up_comment_A_fkey" FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_vote_up_comment" ADD CONSTRAINT "_vote_up_comment_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_vote_down_comment" ADD CONSTRAINT "_vote_down_comment_A_fkey" FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_vote_down_comment" ADD CONSTRAINT "_vote_down_comment_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likes_comment" ADD CONSTRAINT "_likes_comment_A_fkey" FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likes_comment" ADD CONSTRAINT "_likes_comment_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
