/*
  Warnings:

  - You are about to drop the column `likes` on the `Emoji` table. All the data in the column will be lost.
  - You are about to drop the column `unLikes` on the `Emoji` table. All the data in the column will be lost.
  - Added the required column `content` to the `Emoji` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Emoji" DROP COLUMN "likes",
DROP COLUMN "unLikes",
ADD COLUMN     "content" TEXT NOT NULL;
