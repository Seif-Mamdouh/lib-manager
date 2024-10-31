import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import SignInButton from '@/components/SignInButton'

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }
  console.log(session)
  
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">Library Manager Admin</h1>
      <div>Welcome, {session.user?.name}</div>
    </div>
  )
}
