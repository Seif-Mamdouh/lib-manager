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
      <div className="flex flex-wrap gap-6 p-6 justify-center mx-auto">
        {books
          .sort((a, b) => b.currentStock - a.currentStock)
          .map((book) => (
            <div key={book.id} className="w-[280px] flex-grow-0 flex-shrink-0">
              <PublicBookCard book={book} />
            </div>
          ))}
      </div>
    </>
  )
}
