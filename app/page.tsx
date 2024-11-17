import PublicBookList from '@/components/PublicBookList'

export default function HomePage() {
  return (
    <div className="flex flex-col items-center min-h-screen gap-4 p-4">
      <h1 className="text-2xl font-bold">Library Manager</h1>
      <div className="text-center mb-4">
        <a 
          href="/admin" 
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Admin Login
        </a>
      </div>
      <div className="w-full max-w-7xl">
        <h2 className="text-xl font-semibold mb-4 text-center">Available Books</h2>
        <PublicBookList />
      </div>
    </div>
  )
}
