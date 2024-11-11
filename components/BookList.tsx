'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAllBooks, deleteBook, adjustBookStock, removeBookStock, setBookStock } from '@/app/actions/books'
import { useState } from 'react'

export default function BookList() {
  const queryClient = useQueryClient()
  const [adjustments, setAdjustments] = useState<Record<number, string>>({})
  const [deletingBooks, setDeletingBooks] = useState<Set<number>>(new Set())
  
  const { data: books, isLoading, error } = useQuery({
    queryKey: ['books'],
    queryFn: getAllBooks,
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      setDeletingBooks(prev => new Set(prev).add(id))
      try {
        await deleteBook(id)
      } finally {
        setDeletingBooks(prev => {
          const next = new Set(prev)
          next.delete(id)
          return next
        })
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] })
    },
  })

  const setStockMutation = useMutation({
    mutationFn: ({ bookId, newStock }: { bookId: number; newStock: number }) =>
      setBookStock(bookId, newStock, 'Stock manually set'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] })
      setAdjustments({}) // Clear adjustments after success
    },
  })

  const handleAdjustStock = async (bookId: number) => {
    const newStock = parseInt(adjustments[bookId] || '0', 10)
    if (isNaN(newStock)) {
      alert('Please enter a valid number')
      return
    }

    if (newStock < 0) {
      alert('Stock cannot be negative')
      return
    }

    try {
      await setStockMutation.mutateAsync({
        bookId,
        newStock,
      })
    } catch (error) {
      alert('Failed to set stock')
    }
  }

  if (isLoading) return <div className="text-center">Loading books...</div>
  if (error) return <div className="text-red-500 text-center">Error loading books</div>
  if (!books?.length) return <div className="text-center">No books in the library yet</div>

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this book?')) {
      deleteMutation.mutate(id)
    }
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
              <p className="text-sm font-semibold mb-2">
                Current Stock: {book.currentStock}
              </p>
              
              <div className="flex gap-2 items-center mb-2">
                <input
                  type="number"
                  value={adjustments[book.id] || ''}
                  onChange={(e) => setAdjustments({
                    ...adjustments,
                    [book.id]: e.target.value
                  })}
                  placeholder="Set stock"
                  min="0"
                  className="w-24 px-2 py-1 border rounded text-sm"
                />
                <button
                  onClick={() => handleAdjustStock(book.id)}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                  disabled={setStockMutation.isPending}
                >
                  {setStockMutation.isPending ? 'Setting...' : 'Set Stock'}
                </button>
              </div>

              <button
                onClick={() => handleDelete(book.id)}
                className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors disabled:bg-gray-400"
                disabled={deletingBooks.has(book.id)}
              >
                {deletingBooks.has(book.id) ? 'Deleting...' : 'Delete Book'}
              </button>
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
