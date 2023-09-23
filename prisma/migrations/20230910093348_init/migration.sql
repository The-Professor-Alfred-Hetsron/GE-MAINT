-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tache" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "notes" TEXT NOT NULL DEFAULT '',
    "objetDeTache" INTEGER NOT NULL DEFAULT 1,
    "allDay" BOOLEAN NOT NULL DEFAULT false,
    "startDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exDate" DATETIME,
    "rRule" TEXT DEFAULT ''
);
INSERT INTO "new_Tache" ("allDay", "endDate", "id", "notes", "objetDeTache", "rRule", "startDate", "title") SELECT "allDay", "endDate", "id", "notes", "objetDeTache", "rRule", "startDate", "title" FROM "Tache";
DROP TABLE "Tache";
ALTER TABLE "new_Tache" RENAME TO "Tache";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
