import { ExternalLink, RotateCcw } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <div>
        <hr/>
           <footer className="bg-black text-white px-6 py-16 relative overflow-hidden">
     
      <div className="flex flex-col items-center justify-center space-y-4">
        <button className="bg-white text-black font-semibold text-lg px-6 py-3 rounded-xl shadow hover:scale-105 transition-all">
          Join Designer Hut &rarr;
        </button>
        <p className="text-sm text-gray-400 text-center">
          One platform. Showcase your creativity. Connect with clients. Get hired faster.
        </p>
      </div>

    
      <div className="mt-14 flex flex-col items-center space-y-4 text-sm text-gray-400">
        <div className="flex flex-wrap items-center gap-2 justify-center text-xs">
          <span className="flex items-center gap-1">
            <span className="bg-white text-black px-2 py-0.5 rounded-4xl text-xs font-semibold"><img
            src='https://i.pinimg.com/736x/00/5d/0e/005d0e8541a54d345338efe6aa36aa2c.jpg'
            alt='logo image'
            className='w-10 rounded-2xl'
            /></span>
            <span>Designer Hut</span>
          </span>
          <span>Built with  for the creative community</span>
          <span>© 2025 Designer Hut</span>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer