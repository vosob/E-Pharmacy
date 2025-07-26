-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Suppliers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "suppliersInfo" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "deliveryDate" DATETIME NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Suppliers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Suppliers" ("address", "amount", "company", "createdAt", "deliveryDate", "id", "status", "suppliersInfo") SELECT "address", "amount", "company", "createdAt", "deliveryDate", "id", "status", "suppliersInfo" FROM "Suppliers";
DROP TABLE "Suppliers";
ALTER TABLE "new_Suppliers" RENAME TO "Suppliers";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
