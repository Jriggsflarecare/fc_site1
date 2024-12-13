import Logo from './Logo';
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 flex items-center justify-center bg-white">
              <Logo width="40" height="40" />
            </div>
            <span className="text-2xl font-semibold bg-gradient-to-r from-[#40CEB4] to-[#2A9B86] bg-clip-text text-transparent">
              FlareCare
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/features" className="nav-link">Features</Link>
            <Link to="/how-it-works" className="nav-link">How It Works</Link>
            <Link to="/testimonials" className="nav-link">Testimonials</Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary ml-4"
            >
              Download
            </motion.button>
          </div>
          
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div 
            className="md:hidden py-4 border-t"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="flex flex-col space-y-2 px-2">
              <Link to="/features" className="nav-link">Features</Link>
              <Link to="/how-it-works" className="nav-link">How It Works</Link>
              <Link to="/testimonials" className="nav-link">Testimonials</Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary mt-2"
              >
                Download
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Navbar 