import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Logo from './components/Logo'
import Footer from './components/Footer'
import Home from './pages/Home'
import Features from './pages/Features'
import HowItWorks from './pages/HowItWorks'
import About from './pages/About'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'

const Navigation = ({ currentSection, setCurrentSection }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (section, path) => {
    setCurrentSection(section);
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-white/80 backdrop-blur-md h-24 shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto h-full flex items-center justify-between px-4 sm:px-8">
        <div className="flex items-center space-x-4 cursor-pointer" onClick={() => handleNavigation('home', '/')}>
          <div className="w-12 h-12 flex items-center justify-center">
            <Logo width="48" height="48" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-[#2C3E50] to-[#4ECDC4] bg-clip-text text-transparent">
            FlareCare
          </span>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="lg:hidden text-gray-600 hover:text-[#4ECDC4] transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </motion.button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-12">
          <motion.button
            className={`text-lg font-medium transition-colors ${currentSection === 'features' ? 'text-[#4ECDC4]' : 'text-gray-600 hover:text-[#4ECDC4]'}`}
            onClick={() => handleNavigation('features', '/features')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Features
          </motion.button>
          <motion.button
            className={`text-lg font-medium transition-colors ${currentSection === 'how-it-works' ? 'text-[#4ECDC4]' : 'text-gray-600 hover:text-[#4ECDC4]'}`}
            onClick={() => handleNavigation('how-it-works', '/how-it-works')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            How It Works
          </motion.button>
          <motion.button
            className={`text-lg font-medium transition-colors ${currentSection === 'advertise' ? 'text-[#4ECDC4]' : 'text-gray-600 hover:text-[#4ECDC4]'}`}
            onClick={() => handleNavigation('advertise', '/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Advertise
          </motion.button>
          <motion.button 
            className="bg-[#4ECDC4] text-white px-8 py-3 rounded-full hover:bg-[#45b8b0] transition-all text-lg font-medium shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('https://apps.apple.com/us/app', '_blank')}
          >
            Download
          </motion.button>
        </div>

        {/* Mobile Navigation Menu */}
        <motion.div
          className={`lg:hidden fixed inset-x-0 top-24 bg-white/95 backdrop-blur-md shadow-lg ${isMenuOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : -20 }}
          transition={{ duration: 0.2 }}
        >
          <div className="px-4 py-6 space-y-4">
            <motion.button
              className={`w-full text-left px-4 py-2 text-lg font-medium transition-colors rounded-lg ${currentSection === 'features' ? 'bg-[#4ECDC4]/10 text-[#4ECDC4]' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => handleNavigation('features', '/features')}
            >
              Features
            </motion.button>
            <motion.button
              className={`w-full text-left px-4 py-2 text-lg font-medium transition-colors rounded-lg ${currentSection === 'how-it-works' ? 'bg-[#4ECDC4]/10 text-[#4ECDC4]' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => handleNavigation('how-it-works', '/how-it-works')}
            >
              How It Works
            </motion.button>
            <motion.button
              className={`w-full text-left px-4 py-2 text-lg font-medium transition-colors rounded-lg ${currentSection === 'advertise' ? 'bg-[#4ECDC4]/10 text-[#4ECDC4]' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => handleNavigation('advertise', '/')}
            >
              Advertise
            </motion.button>
            <motion.button 
              className="w-full bg-[#4ECDC4] text-white px-4 py-3 rounded-xl font-medium hover:bg-[#45b8b0] transition-all text-lg"
              onClick={() => window.open('https://apps.apple.com/us/app', '_blank')}
            >
              Download
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const App = () => {
  const [currentSection, setCurrentSection] = useState('features');

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navigation bar - Fixed at top */}
        <Navigation currentSection={currentSection} setCurrentSection={setCurrentSection} />

        {/* Main content area - Scrollable */}
        <main className="flex-grow bg-gradient-to-br from-[#4ECDC4] to-[#2C3E50]">
          <div className="pt-32 pb-16">
            <Routes>
              <Route path="/" element={<Home currentSection={currentSection} setCurrentSection={setCurrentSection} />} />
              <Route path="/features" element={<Features />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
            </Routes>
          </div>
        </main>

        {/* Footer - Fixed at bottom */}
        <Footer setCurrentSection={setCurrentSection} />
      </div>
    </Router>
  );
}

export default App
