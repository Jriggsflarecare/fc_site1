import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Footer = ({ setCurrentSection }) => {
  const navigate = useNavigate();

  const handleHowItWorks = () => {
    navigate('/how-it-works');
  };

  return (
    <footer className="bg-[#1E2937] text-white py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <Link 
              to="/" 
              className="flex items-center gap-2 justify-center sm:justify-start"
              onClick={() => setCurrentSection('home')}
            >
              <img src="/flarecare-logo-export.svg" alt="FlareCare" className="h-8 w-8" />
              <span className="text-xl font-semibold text-[#4ECDC4]">FlareCare</span>
            </Link>
            <p className="mt-2 text-gray-400 text-sm text-center sm:text-left">Track. Monitor. Thrive.</p>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-lg font-medium mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/features" 
                  className="text-gray-400 hover:text-[#4ECDC4] text-sm"
                  onClick={() => setCurrentSection('features')}
                >
                  Features
                </Link>
              </li>
              <li>
                <button 
                  onClick={handleHowItWorks}
                  className="text-gray-400 hover:text-[#4ECDC4] text-sm"
                >
                  How It Works
                </button>
              </li>
              <li>
                <Link 
                  to="/advertise"
                  className="text-gray-400 hover:text-[#4ECDC4] text-sm"
                  onClick={() => setCurrentSection('advertise')}
                >
                  Advertise
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-lg font-medium mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-400 hover:text-[#4ECDC4] text-sm"
                  onClick={() => setCurrentSection('about')}
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy" 
                  className="text-gray-400 hover:text-[#4ECDC4] text-sm"
                  onClick={() => setCurrentSection('privacy')}
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="text-gray-400 hover:text-[#4ECDC4] text-sm"
                  onClick={() => setCurrentSection('terms')}
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-lg font-medium mb-4">Download</h3>
            <div className="space-y-3">
              <motion.button
                className="w-full bg-[#4ECDC4] text-white px-4 py-3 rounded-xl font-medium hover:bg-[#45b8b0] transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open('https://apps.apple.com/us/app', '_blank')}
              >
                App Store
              </motion.button>
              <motion.button
                className="w-full bg-[#4ECDC4] text-white px-4 py-3 rounded-xl font-medium hover:bg-[#45b8b0] transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open('https://play.google.com/store/apps', '_blank')}
              >
                Google Play
              </motion.button>
            </div>
          </div>
        </div>

        <div className="mt-10 lg:mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} FlareCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 