'use server'

import prisma from '@/lib/prisma'

export type BookData = {
  title: string
  authors?: string[]
  publishedDate?: string
  pageCount?: number
  description?: string
  imageUrl?: string
}

export async function lookupBook(isbn: string): Promise<BookData> {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
  )
  const data = await response.json()

  if (!data.items?.length) {
    throw new Error('Book not found')
  }

  const bookInfo = data.items[0].volumeInfo
  return {
    title: bookInfo.title,
    authors: bookInfo.authors || [],
    publishedDate: bookInfo.publishedDate,
    description: bookInfo.description,
    pageCount: bookInfo.pageCount,
    imageUrl: bookInfo.imageLinks?.thumbnail,
  }
}

export async function saveBook(isbn: string, bookData: BookData) {
  return prisma.$transaction(async (tx) => {
    const existingBook = await tx.book.findUnique({
      where: { isbn },
    })

    if (existingBook) {
      await adjustBookStock(existingBook.id, 1, 'Additional copy added')
      return existingBook
    } else {
      const book = await tx.book.create({
        data: {
          isbn,
          ...bookData,
        },
      })
      // Create initial stock action
      await tx.bookStockAction.create({
        data: {
          bookId: book.id,
          quantity: 1,
          note: 'Initial stock',
        },
      })
      return book
    }
  })
}

export async function adjustBookStock(
  bookId: number,
  quantity: number,
  note?: string
) {
  return await prisma.$transaction(async (tx) => {
    // Create the stock action
    return tx.bookStockAction.create({
      data: {
        bookId,
        quantity,
        note,
      },
    })
  })
}

// New helper function to get current stock
export async function getCurrentStock(bookId: number): Promise<number> {
  const stockActions = await prisma.bookStockAction.findMany({
    where: { bookId },
    select: { quantity: true },
  })
  
  return stockActions.reduce((total, action) => total + action.quantity, 0)
}

export async function getAllBooks() {
  const books = await prisma.book.findMany({
    orderBy: {
      title: 'asc',
    },
    include: {
      BookStockAction: {
        select: {
          quantity: true,
        },
      },
    },
  })

  return books.map(book => ({
    ...book,
    currentStock: book.BookStockAction.reduce((total, action) => total + action.quantity, 0)
  }))
}
