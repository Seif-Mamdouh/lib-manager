'use client'

import { useState } from 'react'
import { lookupBook, saveBook, BookData } from '@/app/actions/books'

export default function IsbnLookupForm() {
  const [isbn, setIsbn] = useState<string | undefined>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [bookData, setBookData] = useState<BookData | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setBookData(null)
    try {
      if (!isbn) {
        throw new Error('ISBN is required')
      }
      const data = await lookupBook(isbn)
      setBookData(data)
    } catch (err) {
      setError('Failed to find book')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSave() {
    if (!bookData) {
      setError('No book data to save')
      return
    }
    try {
      if (!isbn) throw new Error('ISBN is required')
      await saveBook(isbn, bookData)
      setIsbn('')
      setBookData(null)
      alert('Book saved successfully!')
    } catch (err) {
      setError('Failed to save book')
    }
  }

  return (
    <div className="w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="mb-6">
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
              disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            {isLoading ? 'Loading...' : 'Look up'}
          </button>
        </div>
      </form>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {bookData && !isLoading && (
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
          >
            Save Book
          </button>
        </div>
      )}
    </div>
  )
}
