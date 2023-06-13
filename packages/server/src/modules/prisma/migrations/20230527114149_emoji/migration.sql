-- CreateTable
CREATE TABLE "Emoji" (
    "id" SERIAL NOT NULL,
    "commentId" INTEGER NOT NULL,

    CONSTRAINT "Emoji_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Emoji_commentId_idx" ON "Emoji"("commentId");

-- AddForeignKey
ALTER TABLE "Emoji" ADD CONSTRAINT "Emoji_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
