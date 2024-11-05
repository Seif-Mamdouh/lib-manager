'use client'

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { lookupBook, saveBook, BookData, adjustBookStock } from '@/app/actions/books'

export default function IsbnLookupForm() {
  const [isbn, setIsbn] = useState<string | undefined>()
  const [error, setError] = useState('')
  const [bookData, setBookData] = useState<BookData | null>(null)

  const lookupMutation = useMutation({
    mutationFn: lookupBook,
    onMutate: () => {
      setError('')
      setBookData(null)
    },
    onSuccess: (data) => {
      setBookData(data)
    },
    onError: () => {
      setError('Failed to find book')
    },
  })

  const saveMutation = useMutation({
    mutationFn: () => saveBook(isbn!, bookData!),
    onSuccess: (savedBook) => {
      setIsbn('')
      setBookData(null)
      alert(
        savedBook.currentStock > 1
          ? `Book stock increased! Current stock: ${savedBook.currentStock}`
          : 'Book saved successfully!'
      )
    },
    onError: () => {
      setError('Failed to save book')
    },
  })

  const lookUpISBN = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isbn) {
      setError('ISBN is required')
      return
    }
    lookupMutation.mutate(isbn)
  }

  const handleSave = () => {
    if (!bookData) {
      setError('No book data to save')
      return
    }
    saveMutation.mutate()
  }

  return (
    <div className="w-full max-w-2xl">
      <form onSubmit={lookUpISBN} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={isbn ?? ''}
            onChange={(e) => setIsbn(e.target.value)}
            placeholder="Enter ISBN"
            className="flex-1 px-4 py-2 border rounded-md text-foreground bg-background"
          />
          <button
            type="submit"
            disabled={lookupMutation.isPending}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            {lookupMutation.isPending ? 'Loading...' : 'Look up'}
          </button>
        </div>
      </form>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {bookData && !lookupMutation.isPending && (
        <div className="border rounded-md p-4">
          <h3 className="text-xl font-bold mb-2">{bookData.title}</h3>
          <p className="mb-2">Authors: {bookData.authors?.join(', ')}</p>
          <p className="mb-2">Published: {bookData.publishedDate}</p>
          <p className="mb-2">Pages: {bookData.pageCount}</p>
          {bookData.imageUrl && (
            <img
              src={bookData.imageUrl}
              alt={bookData.title}
              className="w-32 h-auto mb-2"
            />
          )}
          <p className="text-sm mb-4">{bookData.description}</p>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            disabled={saveMutation.isPending}
          >
            {saveMutation.isPending ? 'Saving...' : 'Save Book'}
          </button>
        </div>
      )}
    </div>
  )
}
