/*
  Warnings:

  - You are about to alter the column `questionId` on the `Choice` table. The data in that column could be lost. The data in that column will be cast from `Int` to `DateTime`.
  - You are about to drop the column `text` on the `Question_version` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Choice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "text" TEXT NOT NULL,
    "votes" INTEGER NOT NULL DEFAULT 0,
    "questionId" DATETIME NOT NULL,
    CONSTRAINT "Choice_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question_version" ("effective") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Choice" ("createdAt", "id", "questionId", "text", "updatedAt", "votes") SELECT "createdAt", "id", "questionId", "text", "updatedAt", "votes" FROM "Choice";
DROP TABLE "Choice";
ALTER TABLE "new_Choice" RENAME TO "Choice";
CREATE TABLE "new_Question_version" (
    "questionId" INTEGER NOT NULL,
    "effective" DATETIME NOT NULL PRIMARY KEY DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Question_version_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Question_version" ("effective", "questionId") SELECT "effective", "questionId" FROM "Question_version";
DROP TABLE "Question_version";
ALTER TABLE "new_Question_version" RENAME TO "Question_version";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
