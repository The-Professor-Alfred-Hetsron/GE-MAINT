-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "matricule" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'Responsable'
);

-- CreateTable
CREATE TABLE "Equipement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "marque_fabricant" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "localistation" TEXT NOT NULL,
    "numero_serie" TEXT NOT NULL,
    "modele" TEXT NOT NULL,
    "etat" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SousSysteme" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "numero_serie" TEXT NOT NULL,
    "marque_fabricant" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "modele" TEXT NOT NULL,
    "equipement_id" INTEGER NOT NULL,
    CONSTRAINT "SousSysteme_equipement_id_fkey" FOREIGN KEY ("equipement_id") REFERENCES "Equipement" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Piece" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "numero_serie" TEXT NOT NULL,
    "marque_fabricant" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "modele" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "minimum_stock" INTEGER NOT NULL DEFAULT 0,
    "soussysteme_id" INTEGER NOT NULL,
    CONSTRAINT "Piece_soussysteme_id_fkey" FOREIGN KEY ("soussysteme_id") REFERENCES "SousSysteme" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantite" INTEGER NOT NULL DEFAULT 1,
    "date_transaction" DATETIME NOT NULL,
    "type_transaction" TEXT NOT NULL,
    "piece_id" INTEGER NOT NULL,
    CONSTRAINT "Transaction_piece_id_fkey" FOREIGN KEY ("piece_id") REFERENCES "Piece" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Panne" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "garvite" INTEGER NOT NULL,
    "soussysteme_id" INTEGER NOT NULL,
    CONSTRAINT "Panne_soussysteme_id_fkey" FOREIGN KEY ("soussysteme_id") REFERENCES "SousSysteme" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Intervention" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "etat_initial" TEXT NOT NULL,
    "etat_final" TEXT NOT NULL,
    "executant" TEXT NOT NULL,
    "debut_intervention" DATETIME NOT NULL,
    "fin_intervention" DATETIME NOT NULL,
    "observation" TEXT NOT NULL,
    "panne_id" INTEGER NOT NULL,
    CONSTRAINT "Intervention_panne_id_fkey" FOREIGN KEY ("panne_id") REFERENCES "Panne" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_matricule_key" ON "User"("matricule");

-- CreateIndex
CREATE UNIQUE INDEX "Equipement_code_key" ON "Equipement"("code");
