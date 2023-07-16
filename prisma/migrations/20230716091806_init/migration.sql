-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantite" INTEGER NOT NULL DEFAULT 1,
    "date_transaction" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type_transaction" TEXT NOT NULL,
    "piece_id" INTEGER NOT NULL,
    CONSTRAINT "Transaction_piece_id_fkey" FOREIGN KEY ("piece_id") REFERENCES "Piece" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("date_transaction", "id", "piece_id", "quantite", "type_transaction") SELECT "date_transaction", "id", "piece_id", "quantite", "type_transaction" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
