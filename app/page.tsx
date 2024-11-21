import PublicBookList from '@/components/PublicBooksDisplay/PublicBookList'
import Hero from '@/components/Hero'

export default function HomePage() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white">
      <Hero />
      {/* Featured Works Section */}
      <div className="w-full max-w-7xl px-4">
        <div className="mt-24">
          <h2 className="text-4xl font-serif mb-12">Featured Works</h2>
          <PublicBookList />
        </div>
      </div>
    </div>
  )
}
