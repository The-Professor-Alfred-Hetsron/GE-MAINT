-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Intervention" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "etat_initial" TEXT NOT NULL,
    "demander_par" TEXT NOT NULL,
    "statut" TEXT NOT NULL,
    "executant" TEXT,
    "debut_intervention" TEXT,
    "fin_intervention" TEXT,
    "etat_final" TEXT,
    "observation" TEXT,
    "panne_id" INTEGER NOT NULL,
    CONSTRAINT "Intervention_panne_id_fkey" FOREIGN KEY ("panne_id") REFERENCES "Panne" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Intervention" ("debut_intervention", "demander_par", "etat_final", "etat_initial", "executant", "fin_intervention", "id", "observation", "panne_id", "statut") SELECT "debut_intervention", "demander_par", "etat_final", "etat_initial", "executant", "fin_intervention", "id", "observation", "panne_id", "statut" FROM "Intervention";
DROP TABLE "Intervention";
ALTER TABLE "new_Intervention" RENAME TO "Intervention";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
