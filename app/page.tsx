import PublicBookList from '@/components/PublicBooksDisplay/PublicBookList'

export default function HomePage() {
  return (
    <div className="flex flex-col items-center min-h-screen gap-4 p-4">
      <div className="absolute top-4 right-4 w-full max-w-7xl flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold text-white mx-auto">My Library</h1>
        <a 
          href="/admin" 
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Admin Login
        </a>
      </div>
      <div className="w-full max-w-7xl mt-20 mb-8">
        <h1 className="text-4xl font-semibold mb-6 text-white">Available Books</h1>
        <p className="text-xl mb-6 text-white/90">
          Welcome to my library of all the books I have!
        </p>
        <PublicBookList />
      </div>
    </div>
  )
}
