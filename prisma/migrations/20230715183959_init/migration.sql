/*
  Warnings:

  - A unique constraint covering the columns `[numero_serie]` on the table `Equipement` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[numero_serie]` on the table `Piece` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[numero_serie]` on the table `SousSysteme` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Equipement_numero_serie_key" ON "Equipement"("numero_serie");

-- CreateIndex
CREATE UNIQUE INDEX "Piece_numero_serie_key" ON "Piece"("numero_serie");

-- CreateIndex
CREATE UNIQUE INDEX "SousSysteme_numero_serie_key" ON "SousSysteme"("numero_serie");
