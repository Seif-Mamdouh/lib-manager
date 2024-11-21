import Link from 'next/link'
import Image from 'next/image'


export default function Hero() {
    const image = '/public/lib.png'
  return (
    <div className="w-full relative">
      <div className="relative h-screen">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${image})`,
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-7xl font-bold mb-6 text-white">
            Hey Stranger! <br/> Welcome to my little library 📚
          </h1>
          <p className="text-2xl mb-12 text-white max-w-3xl">
            Feel free to browse around and borrow a book or two
          </p>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <a 
              href="/admin" 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Admin Login
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}