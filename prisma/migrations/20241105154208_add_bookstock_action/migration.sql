-- CreateTable
CREATE TABLE "BookStockAction" (
    "id" SERIAL NOT NULL,
    "bookId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookStockAction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BookStockAction" ADD CONSTRAINT "BookStockAction_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
