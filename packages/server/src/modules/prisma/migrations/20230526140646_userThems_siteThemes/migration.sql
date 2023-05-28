-- CreateTable
CREATE TABLE "UserTheme" (
    "id" SERIAL NOT NULL,
    "themeId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserTheme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteThemes" (
    "id" SERIAL NOT NULL,
    "theme" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "SiteThemes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SiteThemes_theme_key" ON "SiteThemes"("theme");

-- AddForeignKey
ALTER TABLE "UserTheme" ADD CONSTRAINT "UserTheme_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "SiteThemes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
