/*
  Warnings:

  - Added the required column `userId` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- 1️⃣ adiciona como nullable
ALTER TABLE "categories"
ADD COLUMN "userId" INTEGER;

-- 2️⃣ define um usuário padrão
-- ⚠️ ajuste o ID conforme seu banco
UPDATE "categories"
SET "userId" = 4
WHERE "userId" IS NULL;

-- 3️⃣ agora sim torna obrigatório
ALTER TABLE "categories"
ALTER COLUMN "userId" SET NOT NULL;

-- 4️⃣ cria a foreign key
ALTER TABLE "categories"
ADD CONSTRAINT "categories_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "users"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;
