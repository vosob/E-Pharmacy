-- CreateTable
CREATE TABLE "Suppliers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "suppliersInfo" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "deliveryDate" DATETIME NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
