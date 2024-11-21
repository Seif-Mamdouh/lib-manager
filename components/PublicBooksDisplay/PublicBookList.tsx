'use client'

import { useQuery } from '@tanstack/react-query'
import { getAllBooks } from '@/app/actions/books'
import PublicBookCard from './PublicBookCard'

export default function PublicBookList() {
  const { data: books, isLoading, isError } = useQuery({
    queryKey: ['books'],
    queryFn: getAllBooks,
  })

  if (isLoading) return <div className="text-center">Loading books...</div>
  if (!books?.length) return <div className="text-center">No books in the library yet</div>

  return (
    <>
      {isError && (
        <div className="text-red-500 text-center mb-4">Error refreshing books</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {books
          .sort((a, b) => b.currentStock - a.currentStock)
          .map((book) => (
            <div key={book.id}>
              <PublicBookCard book={book} />
            </div>
          ))}
      </div>
    </>
  )
}
