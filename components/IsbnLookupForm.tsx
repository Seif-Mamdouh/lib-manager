'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { lookupBook, saveBook, BookData} from '@/app/actions/books'

export default function IsbnLookupForm() {
  const [isbn, setIsbn] = useState<string>('')
  const [error, setError] = useState('')

  const queryClient = useQueryClient()

  const { data: bookData, isLoading } = useQuery({
    queryKey: ['book', isbn],
    queryFn: () => lookupBook(isbn),
    enabled: isbn.length === 13 || isbn.length === 10,
    retry: false,
    throwOnError: () => {
      setError('Failed to find book')
      return false
    }
  })

  const saveMutation = useMutation({
    mutationFn: () => saveBook(isbn!, bookData!),
    onSuccess: () => {
      setIsbn('')
      queryClient.invalidateQueries({ queryKey: ['books'] })
      alert('Book saved successfully!')
    },
    onError: () => {
      setError('Failed to save book')
    }, 
  })

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      <div className="mb-6 w-full">
        <input
          type="text"
          value={isbn}
          onChange={(e) => {
            setError('')
            setIsbn(e.target.value)
          }}
          placeholder="Enter ISBN (13 digits or 10 digits)"
          className="w-full px-4 py-2 border rounded-md text-foreground bg-background"
        />
      </div>

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
            onClick={(e) => saveMutation.mutate()}
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
