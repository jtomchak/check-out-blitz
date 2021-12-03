-- CreateTable
CREATE TABLE "Question_version" (
    "questionId" INTEGER NOT NULL,
    "effective" DATETIME NOT NULL PRIMARY KEY DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT NOT NULL,
    CONSTRAINT "Question_version_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
