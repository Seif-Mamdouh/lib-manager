import PublicBookList from '@/components/PublicBooksDisplay/PublicBookList'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white">
      <Hero />
      <div className="w-full max-w-7xl px-4">
        <div className="mt-24">
          <h2 className="text-4xl font-bold mb-5 text-center">My Library Collection</h2>
          <p className="text-lg font-bold text-center mb-24">Explore my carefully curated collection of books that have shaped my thinking and perspective.</p>
          <PublicBookList />
          <Footer />
        </div>
      </div>
    </div>
  )
}
