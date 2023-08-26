/*
  Warnings:

  - Added the required column `statut` to the `Panne` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statut` to the `Intervention` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Panne" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "garvite" INTEGER NOT NULL,
    "soussysteme_id" INTEGER NOT NULL,
    "statut" TEXT NOT NULL,
    CONSTRAINT "Panne_soussysteme_id_fkey" FOREIGN KEY ("soussysteme_id") REFERENCES "SousSysteme" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Panne" ("description", "garvite", "id", "nom", "soussysteme_id") SELECT "description", "garvite", "id", "nom", "soussysteme_id" FROM "Panne";
DROP TABLE "Panne";
ALTER TABLE "new_Panne" RENAME TO "Panne";
CREATE TABLE "new_Intervention" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "etat_initial" TEXT NOT NULL,
    "etat_final" TEXT NOT NULL,
    "executant" TEXT NOT NULL,
    "statut" TEXT NOT NULL,
    "debut_intervention" DATETIME NOT NULL,
    "fin_intervention" DATETIME NOT NULL,
    "observation" TEXT NOT NULL,
    "panne_id" INTEGER NOT NULL,
    CONSTRAINT "Intervention_panne_id_fkey" FOREIGN KEY ("panne_id") REFERENCES "Panne" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Intervention" ("debut_intervention", "etat_final", "etat_initial", "executant", "fin_intervention", "id", "observation", "panne_id") SELECT "debut_intervention", "etat_final", "etat_initial", "executant", "fin_intervention", "id", "observation", "panne_id" FROM "Intervention";
DROP TABLE "Intervention";
ALTER TABLE "new_Intervention" RENAME TO "Intervention";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
