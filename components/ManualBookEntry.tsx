'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { saveBook, BookData } from '@/app/actions/books'

export default function ManualBookEntry() {
  const queryClient = useQueryClient()
  const [bookData, setBookData] = useState<BookData>({
    title: '',
    authors: [''],
    publishedDate: '',
    pageCount: undefined,
    description: '',
    imageUrl: '',
  })
  const [isFormVisible, setIsFormVisible] = useState(false)

  const saveMutation = useMutation({
    mutationFn: () => saveBook('', bookData),
    onSuccess: () => {
      setBookData({
        title: '',
        authors: [''],
        publishedDate: '',
        pageCount: undefined,
        description: '',
        imageUrl: '',
      })
      queryClient.invalidateQueries({ queryKey: ['books'] })
      alert('Book saved successfully!')
    },
    onError: () => {
      alert('Failed to save book')
    },
  })
  const handleAuthorChange = (index: number, value: string) => {
    if (!bookData.authors) return
    const newAuthors = [...bookData.authors]
    newAuthors[index] = value
    setBookData({ ...bookData, authors: newAuthors })
  }
  const addAuthorField = () => {
    if (!bookData.authors) return
    setBookData({ ...bookData, authors: [...bookData.authors, ''] })
  }

  const removeAuthorField = (index: number) => {
    if (!bookData.authors) return
    const newAuthors = bookData.authors.filter((_, i) => i !== index)
    setBookData({ ...bookData, authors: newAuthors })
  }

  if (!isFormVisible) {
    return (
      <button
        onClick={() => setIsFormVisible(true)}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        + Add Book Manually
      </button>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 border rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Add Book Manually</h2>
        <button
          onClick={() => setIsFormVisible(false)}
          className="px-3 py-1 text-sm text-white hover:bg-red-400 bg-red-600 rounded"
        >
          × Close
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input
            type="text"
            value={bookData.title}
            onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
            className="w-full px-3 py-2 border rounded-md text-black"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Authors</label>
          {bookData.authors?.map((author, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={author}
                onChange={(e) => handleAuthorChange(index, e.target.value)}
                className="flex-1 px-3 py-2 border rounded-md text-black"
              />
              {bookData.authors && bookData.authors.length > 1 && (
                <button
                  onClick={() => removeAuthorField(index)}
                  className="px-3 py-2 bg-red-600 text-white rounded-md"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addAuthorField}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            + Add another author
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Published Date</label>
          <input
            type="text"
            value={bookData.publishedDate || ''}
            onChange={(e) => setBookData({ ...bookData, publishedDate: e.target.value })}
            placeholder="YYYY-MM-DD"
            className="w-full px-3 py-2 border rounded-md text-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Page Count</label>
          <input
            type="number"
            value={bookData.pageCount || ''}
            onChange={(e) => setBookData({ ...bookData, pageCount: parseInt(e.target.value) || undefined })}
            className="w-full px-3 py-2 border rounded-md text-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input
            type="url"
            value={bookData.imageUrl || ''}
            onChange={(e) => setBookData({ ...bookData, imageUrl: e.target.value })}
            className="w-full px-3 py-2 border rounded-md text-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={bookData.description || ''}
            onChange={(e) => setBookData({ ...bookData, description: e.target.value })}
            className="w-full px-3 py-2 border rounded-md text-black"
            rows={4}
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => saveMutation.mutate()}
            disabled={!bookData.title || saveMutation.isPending}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400"
          >
            {saveMutation.isPending ? 'Saving...' : 'Save Book'}
          </button>
          <button
            onClick={() => setIsFormVisible(false)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
