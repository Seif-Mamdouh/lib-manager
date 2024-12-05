'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <div className="w-full relative">
      <div className="relative h-screen">
        {/* Background Image with Overlay */}
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
          <motion.h1 
            className="text-7xl font-bold mb-6 text-white"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hey Stranger! <br/> Welcome to my little library 📚
          </motion.h1>
          <motion.p 
            className="text-2xl mb-12 text-white max-w-3xl"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Feel free to browse around and borrow a book or two
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            className="flex gap-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <a 
              href="/admin" 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Admin Login
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  )
}