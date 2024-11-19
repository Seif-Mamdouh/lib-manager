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
      <div className="flex flex-col h-full p-1 gap-4">
        {/* Image Container - Fixed height */}
        <div className="w-full h-48 bg-gray-800 rounded-xl overflow-hidden">
          {book.imageUrl ? (
            <img
              src={book.imageUrl}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image Available
            </div>
          )}
        </div>

        <div className="flex flex-col flex-1 text-white">
          <h3 className="font-bold text-nm line-clamp-2 h-14">{book.title}</h3>
          <p className="text-sm line-clamp-1">By: {book.authors?.join(', ') || 'Unknown'}</p>
          <p className="text-sm">Published: {book.publishedDate || 'Unknown'}</p>
          <p className="text-sm">ISBN: {book.isbn || 'Not available'}</p>
          <p className="text-sm text-white font-semibold">
            Available Copies: {book.BookStockAction.reduce((acc, action) => acc + action.quantity, 0)}
          </p>
        </div>
      </div>
    </NeonGradientCard>
  )
}
