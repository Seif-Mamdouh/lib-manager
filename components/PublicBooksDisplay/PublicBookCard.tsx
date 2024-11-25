import { Book, BookStockAction } from '@prisma/client';
import { BookCover } from 'book-cover-3d';
import { motion } from "framer-motion";

interface PublicBookCardProps {
  book: Book & { BookStockAction: { quantity: number }[] };
}

export default function PublicBookCard({ book }: PublicBookCardProps) {
  const coverImageUrl = book.imageUrl || '/placeholder-cover.jpg';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <div className="flex flex-col items-center gap-6 p-6">
        <div className="w-[200px] h-[300px]">
          <BookCover>
              <img
                src={coverImageUrl}
                alt={book.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </BookCover>
          </div>
          <div className="space-y-2 text-center">
            <p className="text-sm font-medium text-muted-foreground">
              By {book.authors.join(', ')}
            </p>
            <h3 className="font-semibold leading-none tracking-tight">
              {book.title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}
