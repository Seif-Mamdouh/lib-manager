import { redirect } from 'next/navigation'

export default function HomePage() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen gap-4">
          <h1 className="text-2xl font-bold">Library Manager</h1>
          <a 
            href="/admin" 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Go to Admin
          </a>
        </div>
      )
}
