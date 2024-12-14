import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Logo from './components/Logo'
import Footer from './components/Footer'
import Home from './pages/Home.jsx'
import Features from './pages/Features.jsx'
import HowItWorks from './pages/HowItWorks.jsx'
import About from './pages/About.jsx'
import Privacy from './pages/Privacy.jsx'
import Terms from './pages/Terms.jsx'

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<string>('features');
  
  return (
    <Router>
      <div>
        <Logo />
        <Routes>
          <Route path="/" element={<Home currentSection={currentSection} setCurrentSection={setCurrentSection} />} />
          <Route path="/features" element={<Features />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App