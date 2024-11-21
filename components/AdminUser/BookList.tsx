'use client'

import { useQuery } from '@tanstack/react-query'
import { getAllBooks } from '@/app/actions/books'
import BookCard from './AdminUser/BookCard'

export default function BookList() {
  const { data: books, isLoading, error } = useQuery({
    queryKey: ['books'],
    queryFn: getAllBooks,
  })

  if (isLoading) return <div className="text-center">Loading books...</div>
  if (error) return <div className="text-red-500 text-center">Error loading books</div>
  if (!books?.length) return <div className="text-center">No books in the library yet</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}
