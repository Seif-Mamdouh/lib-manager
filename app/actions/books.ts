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
  return prisma.book.create({
    data: {
      isbn,
      ...bookData,
    },
  })
}
