'use client'

import { useQuery } from '@tanstack/react-query'
import { getAllBooks } from '@/app/actions/books'

export default function BookList() {
  const { data: books, isLoading, error } = useQuery({
    queryKey: ['books'],
    queryFn: getAllBooks,
  })

  if (isLoading) {
    return <div className="text-center">Loading books...</div>
  }

  if (error) {
    return <div className="text-red-500 text-center">Error loading books</div>
  }

  if (!books?.length) {
    return <div className="text-center">No books in the library yet</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {books.map((book) => (
        <div
          key={book.id}
          className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex gap-4">
            {book.imageUrl && (
              <img
                src={book.imageUrl}
                alt={book.title}
                className="w-24 h-auto object-cover"
              />
            )}
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2">{book.title}</h3>
              <p className="text-sm mb-1">
                By: {book.authors?.join(', ') || 'Unknown'}
              </p>
              <p className="text-sm mb-1">
                Published: {book.publishedDate || 'Unknown'}
              </p>
              <p className="text-sm mb-1">
                ISBN: {book.isbn || 'Not available'}
              </p>
              <p className="text-sm font-semibold">
                Current Stock: {book.currentStock}
              </p>
            </div>
          </div>
          {book.description && (
            <p className="text-sm mt-2 line-clamp-3">{book.description}</p>
          )}
        </div>
      ))}
    </div>
  )
}
