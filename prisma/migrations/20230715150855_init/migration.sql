-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Equipement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "marque_fabricant" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL,
    "localistation" TEXT NOT NULL,
    "numero_serie" TEXT NOT NULL,
    "modele" TEXT NOT NULL,
    "etat" TEXT NOT NULL
);
INSERT INTO "new_Equipement" ("code", "description", "etat", "id", "localistation", "marque_fabricant", "modele", "nom", "numero_serie") SELECT "code", "description", "etat", "id", "localistation", "marque_fabricant", "modele", "nom", "numero_serie" FROM "Equipement";
DROP TABLE "Equipement";
ALTER TABLE "new_Equipement" RENAME TO "Equipement";
CREATE UNIQUE INDEX "Equipement_code_key" ON "Equipement"("code");
CREATE TABLE "new_SousSysteme" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "numero_serie" TEXT NOT NULL,
    "marque_fabricant" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL,
    "modele" TEXT NOT NULL,
    "equipement_id" INTEGER NOT NULL,
    CONSTRAINT "SousSysteme_equipement_id_fkey" FOREIGN KEY ("equipement_id") REFERENCES "Equipement" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SousSysteme" ("description", "equipement_id", "id", "marque_fabricant", "modele", "nom", "numero_serie") SELECT "description", "equipement_id", "id", "marque_fabricant", "modele", "nom", "numero_serie" FROM "SousSysteme";
DROP TABLE "SousSysteme";
ALTER TABLE "new_SousSysteme" RENAME TO "SousSysteme";
CREATE TABLE "new_Piece" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "numero_serie" TEXT NOT NULL,
    "marque_fabricant" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL,
    "modele" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "minimum_stock" INTEGER NOT NULL DEFAULT 0,
    "soussysteme_id" INTEGER NOT NULL,
    CONSTRAINT "Piece_soussysteme_id_fkey" FOREIGN KEY ("soussysteme_id") REFERENCES "SousSysteme" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Piece" ("description", "id", "marque_fabricant", "minimum_stock", "modele", "nom", "numero_serie", "soussysteme_id", "stock") SELECT "description", "id", "marque_fabricant", "minimum_stock", "modele", "nom", "numero_serie", "soussysteme_id", "stock" FROM "Piece";
DROP TABLE "Piece";
ALTER TABLE "new_Piece" RENAME TO "Piece";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
