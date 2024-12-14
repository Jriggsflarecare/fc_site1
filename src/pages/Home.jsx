import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Logo from '../components/Logo'
import Footer from '../components/Footer'

const AppMockup = () => {
  const [currentScreen, setCurrentScreen] = useState('home')
  const [flareScore, setFlareScore] = useState(1.8)
  const [lastBm, setLastBm] = useState({ time: '1d 21h ago', movements: 0 })
  const [showFlareInfo, setShowFlareInfo] = useState(false)
  const [showLogModal, setShowLogModal] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [logs, setLogs] = useState([
    { date: new Date(), type: 4, symptoms: ['Gas'] },
    { date: new Date(Date.now() - 86400000), type: 3, symptoms: [] }, // Yesterday
  ])
  const [selectedType, setSelectedType] = useState(null)
  const [selectedSymptoms, setSelectedSymptoms] = useState([])
  const [currentTip, setCurrentTip] = useState(0)
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [foodLogs, setFoodLogs] = useState([])
  const [showFoodModal, setShowFoodModal] = useState(false)
  const [showFoodSuccess, setShowFoodSuccess] = useState(false)
  const [showFoodDetailModal, setShowFoodDetailModal] = useState(false)
  const [selectedFoodLog, setSelectedFoodLog] = useState(null)

  const renderLogContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Select Stool Type</h3>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5, 6, 7].map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setSelectedType(type)
                    setCurrentStep(2)
                  }}
                  className={`p-4 rounded-lg border ${
                    selectedType === type ? 'border-[#4ECDC4] bg-[#4ECDC4]/10' : 'border-gray-200'
                  } hover:border-[#4ECDC4] transition-colors`}
                >
                  <img
                    src={`/type${type}.png`}
                    alt={`Type ${type}`}
                    className="w-16 h-16 mx-auto mb-2"
                  />
                  <div className="text-sm text-center">Type {type}</div>
                </button>
              ))}
            </div>
          </div>
        )
      case 2:
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Additional Symptoms</h3>
            <div className="grid grid-cols-2 gap-4">
              {['Pain', 'Bloating', 'Gas', 'Urgency'].map((symptom) => (
                <button
                  key={symptom}
                  onClick={() => {
                    if (selectedSymptoms.includes(symptom)) {
                      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom))
                    } else {
                      setSelectedSymptoms([...selectedSymptoms, symptom])
                    }
                  }}
                  className={`p-4 rounded-lg border ${
                    selectedSymptoms.includes(symptom) ? 'border-[#4ECDC4] bg-[#4ECDC4]/10' : 'border-gray-200'
                  } hover:border-[#4ECDC4] transition-colors`}
                >
                  <div className="text-sm text-center">{symptom}</div>
                </button>
              ))}
            </div>
            <button
              onClick={handleSave}
              className="w-full mt-4 bg-[#4ECDC4] text-white py-2 rounded-lg hover:bg-[#45b8b0] transition-colors"
            >
              Save Log
            </button>
          </div>
        )
      default:
        return null
    }
  }

  const handleSave = () => {
    const now = new Date()
    const newLog = {
      date: selectedDate,
      type: selectedType,
      symptoms: selectedSymptoms
    }
    setLogs([...logs, newLog])
    setLastBm({
      time: '1m ago',
      movements: lastBm.movements + 1
    })
    setSelectedType(null)
    setSelectedSymptoms([])
    setShowLogModal(false)
    setCurrentStep(1)
  }

  return (
    <div className="relative bg-white h-screen overflow-hidden">
      <div className="p-4 flex justify-between items-center">
        <Logo />
        <div className="text-sm text-gray-500">Last BM: {lastBm.time}</div>
      </div>
      
      {currentScreen === 'home' ? (
        <div className="h-[calc(100%-4rem)] bg-gray-100 rounded-t-3xl overflow-hidden">
          {renderLogContent()}
        </div>
      ) : null}
      
      <Footer currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
    </div>
  )
}

const Home = ({ currentSection, setCurrentSection }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A1A1A] to-[#2D2D2D] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Track Your IBD Journey</h1>
          <p className="text-xl mb-12">
            Monitor symptoms, identify triggers, and take control of your health with our comprehensive IBD tracking tools.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 p-6 rounded-xl">
              <h2 className="text-2xl font-semibold mb-4">Smart Symptom Tracking</h2>
              <p className="text-gray-300 mb-6">
                Log symptoms with our intuitive interface. Get insights into patterns and potential triggers.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Easy-to-use symptom logger
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Customizable tracking options
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Visual symptom patterns
                </li>
              </ul>
            </div>
            <div className="bg-white/10 p-6 rounded-xl">
              <h2 className="text-2xl font-semibold mb-4">Personalized Insights</h2>
              <p className="text-gray-300 mb-6">
                Get AI-powered insights based on your data. Understand your IBD better than ever before.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  AI-driven analysis
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Trigger identification
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Personalized recommendations
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <AppMockup />
    </div>
  )
}

export default Home
