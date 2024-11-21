import { Book, BookStockAction } from '@prisma/client';
import { BookCover } from 'book-cover-3d';

interface PublicBookCardProps {
  book: Book & { BookStockAction: { quantity: number }[] };
}

export default function PublicBookCard({ book }: PublicBookCardProps) {
  const coverImageUrl = book.imageUrl || '/placeholder-cover.jpg';

  return (
    <div className="flex justify-center items-center h-[300px]">
      <BookCover
        width={180}
        height={250}
        thickness={20}
        shadowColor="transparent"
      >
        <img src={coverImageUrl} alt={book.title} className="w-full h-full object-cover" />
      </BookCover>
    </div>
  );
}
