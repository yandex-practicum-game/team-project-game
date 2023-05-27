/*
  Warnings:

  - You are about to drop the column `emojiId` on the `Comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_emojiId_fkey";

-- DropIndex
DROP INDEX "Comment_emojiId_idx";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "emojiId";

-- CreateTable
CREATE TABLE "_CommentToEmoji" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CommentToEmoji_AB_unique" ON "_CommentToEmoji"("A", "B");

-- CreateIndex
CREATE INDEX "_CommentToEmoji_B_index" ON "_CommentToEmoji"("B");

-- CreateIndex
CREATE INDEX "Emoji_content_idx" ON "Emoji"("content");

-- AddForeignKey
ALTER TABLE "_CommentToEmoji" ADD CONSTRAINT "_CommentToEmoji_A_fkey" FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommentToEmoji" ADD CONSTRAINT "_CommentToEmoji_B_fkey" FOREIGN KEY ("B") REFERENCES "Emoji"("id") ON DELETE CASCADE ON UPDATE CASCADE;
