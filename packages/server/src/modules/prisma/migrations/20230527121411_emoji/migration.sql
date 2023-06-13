-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_emojiId_fkey";

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "emojiId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_emojiId_fkey" FOREIGN KEY ("emojiId") REFERENCES "Emoji"("id") ON DELETE SET NULL ON UPDATE CASCADE;
