/*
  Warnings:

  - You are about to drop the column `commentId` on the `Emoji` table. All the data in the column will be lost.
  - Added the required column `emojiId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `likes` to the `Emoji` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unLikes` to the `Emoji` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Emoji" DROP CONSTRAINT "Emoji_commentId_fkey";

-- DropIndex
DROP INDEX "Emoji_commentId_idx";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "emojiId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Emoji" DROP COLUMN "commentId",
ADD COLUMN     "likes" INTEGER NOT NULL,
ADD COLUMN     "unLikes" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Comment_emojiId_idx" ON "Comment"("emojiId");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_emojiId_fkey" FOREIGN KEY ("emojiId") REFERENCES "Emoji"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
