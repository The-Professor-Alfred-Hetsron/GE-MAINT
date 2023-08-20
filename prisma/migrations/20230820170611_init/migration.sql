/*
  Warnings:

  - You are about to drop the column `localistation` on the `Equipement` table. All the data in the column will be lost.
  - Added the required column `localisation` to the `Equipement` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Equipement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "marque_fabricant" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL,
    "localisation" TEXT NOT NULL,
    "numero_serie" TEXT NOT NULL,
    "modele" TEXT NOT NULL,
    "etat" TEXT NOT NULL
);
INSERT INTO "new_Equipement" ("code", "description", "etat", "id", "image", "marque_fabricant", "modele", "nom", "numero_serie") SELECT "code", "description", "etat", "id", "image", "marque_fabricant", "modele", "nom", "numero_serie" FROM "Equipement";
DROP TABLE "Equipement";
ALTER TABLE "new_Equipement" RENAME TO "Equipement";
CREATE UNIQUE INDEX "Equipement_code_key" ON "Equipement"("code");
CREATE UNIQUE INDEX "Equipement_numero_serie_key" ON "Equipement"("numero_serie");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
