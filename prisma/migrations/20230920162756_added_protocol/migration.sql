-- CreateTable
CREATE TABLE "Protocol" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "panne_id" INTEGER NOT NULL,
    CONSTRAINT "Protocol_panne_id_fkey" FOREIGN KEY ("panne_id") REFERENCES "Panne" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
