/*
  Warnings:

  - Changed the type of `id` on the `repositories` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "repositories" DROP COLUMN "id",
ADD COLUMN     "id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "repositories_id_user_id_key" ON "repositories"("id", "user_id");
