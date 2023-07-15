/*
  Warnings:

  - Added the required column `nom` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "matricule" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'Responsable'
);
INSERT INTO "new_User" ("email", "id", "matricule", "role") SELECT "email", "id", "matricule", "role" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_matricule_key" ON "User"("matricule");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
