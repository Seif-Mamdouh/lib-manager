import { Book, BookStockAction } from '@prisma/client'
import { NeonGradientCard } from './ui/neon-gradient-card'

interface PublicBookCardProps {
  book: Book & { BookStockAction: { quantity: number }[] }
}

export default function PublicBookCard({ book }: PublicBookCardProps) {
  return (
    <NeonGradientCard 
      borderSize={2}
      borderRadius={16}
      neonColors={{ firstColor: '#FF1B6B', secondColor: '#45CAFF' }}
    >
      <div className="flex flex-col h-full">
        <div className="flex gap-3 text-white">
          {book.imageUrl && (
            <img
              src={book.imageUrl}
              alt={book.title}
              className="w-24 h-auto object-cover rounded-md"
            />
          )}
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">{book.title}</h3>
            <p className="text-sm mb-0.5 text-gray-300">
              By: {book.authors?.join(', ') || 'Unknown'}
            </p>
            <p className="text-sm mb-0.5 text-gray-300">
              Published: {book.publishedDate || 'Unknown'}
            </p>
            <p className="text-sm mb-0.5 text-gray-300">
              ISBN: {book.isbn || 'Not available'}
            </p>
            <p className="text-sm font-semibold">
              Available Copies: {book.BookStockAction.reduce((acc, action) => acc + action.quantity, 0)}
            </p>
          </div>
        </div>
        {book.description && (
          <p className="text-sm mt-2 text-gray-300 overflow-hidden text-ellipsis line-clamp-2">
            {book.description}
          </p>
        )}
      </div>
    </NeonGradientCard>
  )
}
