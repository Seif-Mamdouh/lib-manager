'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteBook, setBookStock } from '@/app/actions/books'
import { useState } from 'react'
import { Book } from '@prisma/client'

type BookWithStock = Book & {
  currentStock: number
}

type BookCardProps = {
  book: BookWithStock
}

export default function BookCard({ book }: BookCardProps) {
  const queryClient = useQueryClient()
  const [stockInput, setStockInput] = useState<string>('')
  
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteBook(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] })
    },
  })

  const setStockMutation = useMutation({
    mutationFn: ({ bookId, newStock }: { bookId: number; newStock: number }) => 
      setBookStock(bookId, newStock, 'Stock manually set'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] })
      setStockInput('')
    },
  })

  const handleAdjustStock = async () => {
    const newStock = parseInt(stockInput, 10)
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
        bookId: book.id,
        newStock,
      })
    } catch (error) {
      alert('Failed to set stock')
    }
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this book?')) {
      deleteMutation.mutate(book.id)
    }
  }

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
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
              value={stockInput}
              onChange={(e) => setStockInput(e.target.value)}
              placeholder="Set stock"
              min="0"
              className="text-black w-24 px-2 py-1 border rounded text-sm"
            />
            <button
              onClick={handleAdjustStock}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400"
              disabled={setStockMutation.isPending}
            >
              {setStockMutation.isPending ? 'Setting...' : 'Set Stock'}
            </button>
          </div>

          <button
            onClick={handleDelete}
            className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors disabled:bg-gray-400"
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? 'Deleting...' : 'Delete Book'}
          </button>
        </div>
      </div>
      {book.description && (
        <p className="text-sm mt-2 line-clamp-3">{book.description}</p>
      )}
    </div>
  )
}
