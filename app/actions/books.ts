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
    // Try to find existing book
    const existingBook = await tx.book.findUnique({
      where: { isbn },
    })

    if (existingBook) {
      // If book exists, increment stock by 1
      await adjustBookStock(existingBook.id, 1, 'Additional copy added')
      return existingBook
    } else {
      // If book doesn't exist, create new with initial stock of 1
      return tx.book.create({
        data: {
          isbn,
          ...bookData,
          currentStock: 1,
        },
      })
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
    await tx.bookStockAction.create({
      data: {
        bookId,
        quantity,
        note,
      },
    })

    // Update the current stock
    return tx.book.update({
      where: { id: bookId },
      data: {
        currentStock: {
          increment: quantity,
        },
      },
    })
  })
}
