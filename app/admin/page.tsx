import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import SignInButton from '@/components/SignInButton'
import IsbnLookupForm from '@/components/IsbnLookupForm'
import BookList from '@/components/BookList'

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    redirect('/auth/signin')
  }
  
  return (
    <div className="flex flex-col items-center min-h-screen gap-4 p-4">
      <h1 className="text-2xl font-bold">Library Manager Admin</h1>
      <div>Welcome, {session.user.name}</div>
      <SignInButton />
      <IsbnLookupForm />
      <div className="w-full max-w-7xl">
        <h2 className="text-xl font-bold mb-4">Library Books</h2>
        <BookList />
      </div>
    </div>
  )
}
