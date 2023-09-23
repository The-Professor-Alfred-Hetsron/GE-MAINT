/*
  Warnings:

  - Added the required column `demander_par` to the `Intervention` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Intervention" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "etat_initial" TEXT NOT NULL,
    "etat_final" TEXT NOT NULL,
    "demander_par" TEXT NOT NULL,
    "executant" TEXT NOT NULL,
    "statut" TEXT NOT NULL,
    "debut_intervention" TEXT NOT NULL,
    "fin_intervention" TEXT NOT NULL,
    "observation" TEXT NOT NULL,
    "panne_id" INTEGER NOT NULL,
    CONSTRAINT "Intervention_panne_id_fkey" FOREIGN KEY ("panne_id") REFERENCES "Panne" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Intervention" ("debut_intervention", "etat_final", "etat_initial", "executant", "fin_intervention", "id", "observation", "panne_id", "statut") SELECT "debut_intervention", "etat_final", "etat_initial", "executant", "fin_intervention", "id", "observation", "panne_id", "statut" FROM "Intervention";
DROP TABLE "Intervention";
ALTER TABLE "new_Intervention" RENAME TO "Intervention";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
