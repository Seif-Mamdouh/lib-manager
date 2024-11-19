import { Book, BookStockAction } from '@prisma/client'

interface PublicBookCardProps {
  book: Book & { BookStockAction: { quantity: number }[] }
}


export default function PublicBookCard({ book }: PublicBookCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
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
            Available Copies: {book.BookStockAction.reduce((acc, action) => acc + action.quantity, 0)}
          </p>
        </div>
      </div>
      {book.description && (
        <p className="text-sm mt-2 line-clamp-3">{book.description}</p>
      )}
    </div>
  )
}
