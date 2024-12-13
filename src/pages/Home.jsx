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
  const [currentTip, setCurrentTip] = useState(0);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [foodLogs, setFoodLogs] = useState([]);
  const [showFoodModal, setShowFoodModal] = useState(false);
  const [showFoodSuccess, setShowFoodSuccess] = useState(false);
  const [showFoodDetailModal, setShowFoodDetailModal] = useState(false);
  const [selectedFoodLog, setSelectedFoodLog] = useState(null);
  const [symptoms, setSymptoms] = useState([
    { date: new Date(), painLevel: 2, symptoms: ['Gas'], bowelMovements: 1 },
    { date: new Date(Date.now() - 86400000), painLevel: 4, symptoms: ['Bloating', 'Gas', 'Urgency'], bowelMovements: 2 }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeReportTab, setActiveReportTab] = useState('summary');
  const [mockSymptoms] = useState([
    { date: new Date(), painLevel: 3, symptoms: ['Gas', 'Bloating'], bowelMovements: 2 },
    { date: new Date(Date.now() - 86400000), painLevel: 4, symptoms: ['Urgency', 'Pain'], bowelMovements: 3 },
    { date: new Date(Date.now() - 86400000 * 2), painLevel: 2, symptoms: ['Gas'], bowelMovements: 1 },
    { date: new Date(Date.now() - 86400000 * 3), painLevel: 5, symptoms: ['Pain', 'Bloating', 'Urgency'], bowelMovements: 4 }
  ]);
  const [mockProblemFoods] = useState([
    { name: 'Dairy', riskScore: 85, totalConsumptions: 8, flareIncidents: 6 },
    { name: 'Spicy Foods', riskScore: 75, totalConsumptions: 5, flareIncidents: 4 },
    { name: 'Coffee', riskScore: 60, totalConsumptions: 10, flareIncidents: 5 }
  ]);
  const [mockSafeFoods] = useState([
    { name: 'Bananas', safetyScore: 95, totalConsumptions: 12, flareIncidents: 0 },
    { name: 'Rice', safetyScore: 90, totalConsumptions: 15, flareIncidents: 1 },
    { name: 'Chicken', safetyScore: 85, totalConsumptions: 10, flareIncidents: 1 }
  ]);
  const [mockInsights] = useState({
    patterns: [
      "Higher symptom activity in the mornings",
      "Stress appears to correlate with flare-ups",
      "Better tolerance for small, frequent meals"
    ],
    recommendations: [
      "Consider keeping a stress diary",
      "Try eating smaller portions more frequently",
      "Stay well hydrated throughout the day"
    ]
  });
  const [showDoctorSummary, setShowDoctorSummary] = useState(false);
  const [doctorSummaryText, setDoctorSummaryText] = useState('');
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

  const calculateWeeklyStats = () => {
    const weekAgo = new Date(Date.now() - 7 * 86400000);
    const weekSymptoms = mockSymptoms.filter(s => new Date(s.date) >= weekAgo);
    
    const avgPain = (weekSymptoms.reduce((sum, s) => sum + s.painLevel, 0) / weekSymptoms.length).toFixed(1);
    const avgBM = (weekSymptoms.reduce((sum, s) => sum + s.bowelMovements, 0) / weekSymptoms.length).toFixed(1);
    
    return {
      avgPain: avgPain || "0.0",
      avgBM: avgBM || "0.0",
      totalEntries: weekSymptoms.length.toString()
    };
  };

  const mockDoctorSummary = `Patient has shown moderate IBD activity over the past week with an average pain level of ${calculateWeeklyStats().avgPain}. Bowel movements are averaging ${calculateWeeklyStats().avgBM} per day. Notable triggers include dairy products and spicy foods. Sleep patterns appear to affect symptom severity. Recommend continued monitoring of diet and stress levels. Consider scheduling follow-up if symptoms persist.`;

  const generateDoctorSummary = () => {
    setIsGeneratingSummary(true);
    setShowDoctorSummary(true);
    setDoctorSummaryText('');
    let index = 0;
    
    const typeNextChar = () => {
      if (index < mockDoctorSummary.length) {
        setDoctorSummaryText(mockDoctorSummary.substring(0, index + 1));
        index++;
        setTimeout(typeNextChar, 20);
      } else {
        setIsGeneratingSummary(false);
      }
    };

    typeNextChar();
  };

  // Load food logs from localStorage
  useEffect(() => {
    const loadFoodLogs = () => {
      try {
        const logs = localStorage.getItem('food_logs');
        if (logs) {
          const parsedLogs = JSON.parse(logs);
          const formattedLogs = parsedLogs.map(log => ({
            ...log,
            foods: log.foods || [log.productName],
            date: log.date || log.timestamp
          }));
          setFoodLogs(formattedLogs);
        }
      } catch (error) {
        console.error('Error loading food logs:', error);
        setFoodLogs([]);
      }
    };
    loadFoodLogs();
  }, []);

  // Auto-type effect when modal opens
  useEffect(() => {
    if (showFoodModal) {
      setIsTyping(true);
      setInputText('');
      const text = "greek yogurt";
      let index = 0;
      
      const typeNextChar = () => {
        if (index < text.length) {
          setInputText(text.slice(0, index + 1));
          index++;
          setTimeout(typeNextChar, 100); // Adjust speed here (100ms per character)
        } else {
          setIsTyping(false);
          handleFoodInput(text);
        }
      };

      typeNextChar();
    }
  }, [showFoodModal]);

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  const handleFoodInput = (text) => {
    if (!isTyping) {
      setInputText(text);
      debouncedSearch(text);
    }
  };

  const debouncedSearch = debounce(async (text) => {
    if (text.length > 2) {
      setIsLoading(true);
      try {
        // Mock food recognition for now
        const mockResults = [
          {
            productName: "Greek Yogurt",
            brandName: "Fage",
            nutrition: "High in protein, calcium, and probiotics",
            ibdConsiderations: "Generally well-tolerated, good for gut health"
          },
          {
            productName: "Banana",
            brandName: "Organic",
            nutrition: "Rich in potassium and fiber",
            ibdConsiderations: "Easy to digest, good for IBD"
          }
        ];
        setSuggestions(mockResults);
      } catch (error) {
        console.error('Error:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  }, 500);

  const saveFood = async (food) => {
    try {
      const newLog = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        date: new Date().toISOString(),
        foods: [food.productName],
        productName: food.productName,
        brandName: food.brandName,
        nutrition: food.nutrition,
        ibdConsiderations: food.ibdConsiderations
      };
      
      const updatedLogs = [newLog, ...foodLogs];
      localStorage.setItem('food_logs', JSON.stringify(updatedLogs));
      setFoodLogs(updatedLogs);
      setShowFoodModal(false);
      setShowFoodSuccess(true);
      setTimeout(() => setShowFoodSuccess(false), 2000);
    } catch (error) {
      console.error('Error saving food:', error);
      alert('Unable to save food log');
    }
  };

  const deleteFood = async (id) => {
    try {
      const updatedLogs = foodLogs.filter(log => log.id !== id);
      localStorage.setItem('food_logs', JSON.stringify(updatedLogs));
      setFoodLogs(updatedLogs);
      setShowFoodDetailModal(false);
    } catch (error) {
      console.error('Error deleting log:', error);
      alert('Unable to delete food log');
    }
  };

  // Bristol Scale types
  const stoolTypes = [1,2,3,4,5,6,7].map(type => ({
    type,
    description: [
      "Separate hard lumps",
      "Lumpy and sausage-like", 
      "Sausage with cracks",
      "Smooth, soft sausage",
      "Soft blobs with clear edges",
      "Mushy with ragged edges",
      "Entirely liquid"
    ][type-1],
    symptoms: [
      ["Hard to pass", "Painful", "Constipation"],
      ["Slightly hard", "Constipated"],
      ["Normal", "Healthy"],
      ["Perfect", "Ideal"],
      ["Lacking fiber", "Soft"],
      ["Inflammation", "Diarrhea"],
      ["Severe diarrhea", "Dehydration risk"]
    ][type-1],
    icon: '💩'
  }))

  // Symptom groups
  const symptomGroups = {
    digestive: ['Bloating', 'Gas', 'Nausea', 'Vomiting'],
    pain: ['Abdominal Pain', 'Joint Pain', 'Fatigue'],
    bowel: ['Urgency', 'Incomplete Evacuation', 'Mucus']
  }

  const dailyTips = [
    {
      title: "Stay Hydrated",
      tip: "Drinking enough water helps maintain regular bowel movements and supports digestive health.",
      icon: "💧"
    },
    {
      title: "Stress Management",
      tip: "Practice deep breathing or meditation to reduce stress, which can trigger IBD symptoms.",
      icon: "🧘‍♀️"
    },
    {
      title: "Diet Tip",
      tip: "Keep a food diary to identify trigger foods. What you eat today can affect how you feel tomorrow.",
      icon: "🍎"
    },
    {
      title: "Exercise",
      tip: "Light exercise like walking can help stimulate healthy bowel movements.",
      icon: "🚶‍♂️"
    },
    {
      title: "Sleep Well",
      tip: "Quality sleep is essential for gut health and reducing inflammation.",
      icon: "😴"
    }
  ];

  const calculateFlareScore = () => {
    if (!symptoms.length) return 1.0;

    // Look at last 48 hours of symptoms
    const recentSymptoms = symptoms.filter(symptom => {
      const symptomDate = new Date(symptom.date);
      const fortyEightHoursAgo = new Date(Date.now() - (48 * 60 * 60 * 1000));
      return symptomDate >= fortyEightHoursAgo;
    });

    if (!recentSymptoms.length) return 1.0;

    // Calculate average pain level
    const totalPain = recentSymptoms.reduce((sum, symptom) => sum + (parseInt(symptom.painLevel) || 0), 0);
    const avgPain = totalPain / recentSymptoms.length;

    // Factor in number of symptoms
    const maxSymptoms = recentSymptoms.reduce((max, symptom) => 
      Math.max(max, symptom.symptoms?.length || 0), 0);
    
    // Factor in bowel movements
    const totalBMs = recentSymptoms.reduce((sum, symptom) => 
      sum + (parseInt(symptom.bowelMovements) || 0), 0);
    const avgBMs = totalBMs / recentSymptoms.length;

    // Combine factors (weighted)
    const painWeight = 0.5;
    const symptomsWeight = 0.3;
    const bmWeight = 0.2;

    const score = (
      (avgPain / 10 * painWeight) + 
      (maxSymptoms / 5 * symptomsWeight) + 
      (Math.min(avgBMs / 5, 1) * bmWeight)
    ) * 5;

    return Math.min(Math.max(score, 0), 5).toFixed(1);
  };

  const getFlareDescription = (score) => {
    if (score <= 2) return "You're doing well! Keep tracking your symptoms.";
    if (score <= 4) return "Mild symptoms detected. Monitor closely.";
    return "Possible flare detected. Consider contacting your doctor.";
  };

  useEffect(() => {
    const score = calculateFlareScore();
    setFlareScore(parseFloat(score));
  }, [symptoms]);

  const handleFlareScoreChange = (newScore) => {
    // In the demo, we'll still allow manual changes
    setFlareScore(parseFloat(newScore.toFixed(1)));
  };

  const getFlareColor = (score) => {
    if (score <= 2) return '#4ECDC4';  // Good - Teal
    if (score <= 4) return '#FFD93D';  // Warning - Yellow
    return '#FF6B6B';                  // Danger - Red
  };

  const calculateStats = (logs) => {
    // Calculate weekly total
    const weeklyTotal = logs.length;

    // Calculate daily average
    const dailyAverage = (weeklyTotal / 7).toFixed(1);

    // Find most common type
    const typeCounts = logs.reduce((acc, log) => {
      acc[log.type] = (acc[log.type] || 0) + 1;
      return acc;
    }, {});
    const mostCommonType = Object.entries(typeCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 4;

    // Calculate average pain level (mock data for now)
    const averagePainLevel = 2.5;

    return {
      weeklyTotal,
      dailyAverage,
      mostCommonType,
      averagePainLevel
    };
  };

  const calculateTimePatterns = (logs) => {
    const timePatterns = {
      Morning: 0,
      Afternoon: 0,
      Evening: 0
    };

    logs.forEach(log => {
      const hour = log.date.getHours();
      if (hour >= 5 && hour < 12) timePatterns.Morning++;
      else if (hour >= 12 && hour < 17) timePatterns.Afternoon++;
      else timePatterns.Evening++;
    });

    return timePatterns;
  };

  const handleSave = () => {
    const now = new Date();
    // Add new log entry with the correct date
    const newLog = {
      date: new Date(selectedDate), // Create new Date object to avoid reference issues
      type: selectedType,
      symptoms: selectedSymptoms,
      time: now.getHours() // Store hour for time patterns
    };
    const updatedLogs = [...logs, newLog];
    setLogs(updatedLogs);

    // Update last BM time
    setLastBm({ 
      time: 'Just now', 
      movements: lastBm.movements + 1 
    });
    
    // Reset form and close modal
    setSelectedType(null);
    setSelectedSymptoms([]);
    setShowLogModal(false);
    setCurrentStep(1);
  };

  const stats = calculateStats(logs);
  const timePatterns = calculateTimePatterns(logs);

  // Update the Flare Factor card render
  const renderFlareCard = () => (
    <motion.div 
      className="bg-white rounded-xl p-3 shadow-sm"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-1">
          <h3 className="font-medium text-gray-900 text-sm">Flare Factor</h3>
          <motion.button
            onClick={() => setShowFlareInfo(!showFlareInfo)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-gray-600 text-sm"
          >
            ⓘ
          </motion.button>
        </div>
      </div>
      
      {showFlareInfo && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-2 p-2 bg-gray-50 rounded-lg text-xs text-gray-600"
        >
          {getFlareDescription(flareScore)}
        </motion.div>
      )}

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <motion.div 
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: getFlareColor(flareScore) }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-lg font-bold text-white">{flareScore}</span>
          </motion.div>
          <div className="space-y-0.5">
            <div className="flex items-center space-x-1">
              <span className="text-xs text-gray-500">Last BM</span>
              <span className="text-xs font-medium">{lastBm.time}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-xs text-gray-500">Today</span>
              <span className="text-xs font-medium">{lastBm.movements} movements</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-xs font-medium" style={{ color: getFlareColor(flareScore) }}>
            {flareScore <= 2 ? 'Stable' : flareScore <= 4 ? 'Caution' : 'Alert'}
          </span>
          <span className="text-[10px] text-gray-500">
            Based on recent symptoms
          </span>
        </div>
      </div>
    </motion.div>
  );

  const renderHomeScreen = () => (
    <div className="h-[calc(100%-7rem)] bg-gray-100 rounded-t-3xl overflow-auto">
      <div className="p-4 space-y-3">
        {renderFlareCard()}

        {/* Action Buttons */}
        <motion.button
          className="w-full p-3 bg-[#FF6B6B] rounded-xl text-white flex items-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setCurrentScreen('log')}
        >
          <span className="text-lg mr-3">📝</span>
          <div>
            <h3 className="font-semibold text-base">Log Symptoms</h3>
            <p className="text-xs opacity-90">Track your daily symptoms</p>
          </div>
          <span className="ml-auto">→</span>
        </motion.button>

        <motion.button
          className="w-full p-3 bg-[#4ECDC4] rounded-xl text-white flex items-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setCurrentScreen('food')}
        >
          <span className="text-lg mr-3">🍽️</span>
          <div>
            <h3 className="font-semibold text-base">Food Log</h3>
            <p className="text-xs opacity-90">Record meals & triggers</p>
          </div>
          <span className="ml-auto">→</span>
        </motion.button>

        <motion.button
          className="w-full p-3 bg-[#FFD93D] rounded-xl text-gray-800 flex items-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setCurrentScreen('reports')}
        >
          <span className="text-lg mr-3">📊</span>
          <div>
            <h3 className="font-semibold text-base">View Reports</h3>
            <p className="text-xs opacity-75">Track your progress</p>
          </div>
          <span className="ml-auto">→</span>
        </motion.button>

        {/* Daily Tips & Motivation */}
        <motion.div 
          className="bg-white rounded-xl p-2.5 shadow-sm"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center justify-between mb-1.5">
            <h3 className="font-medium text-gray-900 text-sm">Daily Tips & Motivation</h3>
            <motion.button
              onClick={() => setCurrentTip((prev) => (prev + 1) % dailyTips.length)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-400 hover:text-gray-600 text-sm"
            >
              ↻
            </motion.button>
          </div>
          
          <motion.div 
            key={currentTip}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-2 items-start"
          >
            <div className="text-lg">{dailyTips[currentTip].icon}</div>
            <div>
              <h4 className="font-medium text-gray-800 text-xs leading-snug">
                {dailyTips[currentTip].title}
              </h4>
              <p className="text-xs text-gray-600 leading-snug">
                {dailyTips[currentTip].tip}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )

  const renderLogScreen = () => (
    <div className="h-full bg-gray-100 overflow-auto">
      {/* Header with Back Button */}
      <div className="bg-white p-4 flex items-center">
        <motion.button
          className="text-gray-600 font-medium flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentScreen('home')}
        >
          <span className="mr-1">←</span>
          <span>Back</span>
        </motion.button>
      </div>

      {/* Add New Button */}
      <div className="p-4 pt-2">
        <motion.button
          className="w-full bg-[#4ECDC4] text-white p-4 rounded-xl shadow-lg flex items-center justify-center space-x-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowLogModal(true)}
        >
          <span className="text-xl">➕</span>
          <span className="text-lg font-semibold">Add New Poop</span>
        </motion.button>
      </div>

      {/* Calendar Section */}
      <div className="bg-white p-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Poop Calendar</h3>
        <div className="grid grid-cols-7 gap-1 mb-4">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
            <div key={day} className="text-center text-sm text-gray-500">
              {day}
            </div>
          ))}
          {Array.from({ length: 35 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - 15 + i);
            const isToday = date.toDateString() === new Date().toDateString();
            const dayLogs = logs.filter(log => 
              log.date.toDateString() === date.toDateString()
            );
            const poopCount = dayLogs.length;
            const isSelected = selectedDate.toDateString() === date.toDateString();
            const isDisabled = date > new Date();
            
            return (
              <motion.button
                key={i}
                className={`
                  w-10 h-10 rounded-lg flex flex-col justify-between items-center p-[3px]
                  ${isDisabled ? 'opacity-30' : ''}
                  ${isSelected ? 'bg-[#4ECDC4]' : 'bg-white'}
                  shadow-sm border border-[#E5E5E5]
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => !isDisabled && setSelectedDate(date)}
              >
                <span className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-[#2d4150]'}`}>
                  {date.getDate()}
                </span>
                {poopCount > 0 && (
                  <div className="flex items-center gap-[2px]">
                    <span className="text-xs">💩</span>
                    <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-[#2d4150]'}`}>
                      {poopCount}
                    </span>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white mt-2 p-4">
        <h3 className="text-lg font-semibold mb-3">Weekly Summary</h3>
        <div className="grid grid-cols-2 gap-2 mb-5">
          <div className="bg-[#f5f5f5] p-3 rounded-lg">
            <div className="text-[#4ECDC4] text-xl font-bold">
              {stats.weeklyTotal}
            </div>
            <div className="text-xs text-gray-600 mt-1">Total Logs</div>
          </div>
          <div className="bg-[#f5f5f5] p-3 rounded-lg">
            <div className="text-[#4ECDC4] text-xl font-bold">
              {stats.dailyAverage}
            </div>
            <div className="text-xs text-gray-600 mt-1">Daily Average</div>
          </div>
          <div className="bg-[#f5f5f5] p-3 rounded-lg">
            <div className="text-[#4ECDC4] text-xl font-bold">
              Type {stats.mostCommonType}
            </div>
            <div className="text-xs text-gray-600 mt-1">Most Common</div>
          </div>
          <div className="bg-[#f5f5f5] p-3 rounded-lg">
            <div className="text-[#4ECDC4] text-xl font-bold">
              {stats.averagePainLevel}
            </div>
            <div className="text-xs text-gray-600 mt-1">Avg Pain</div>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-3">Time Patterns</h3>
        <div className="flex justify-between">
          {Object.entries(timePatterns).map(([time, count]) => (
            <div key={time} className="bg-[#f5f5f5] p-2 rounded-lg w-[30%] text-center">
              <div className="text-xs text-gray-600">{time}</div>
              <div className="text-[#4ECDC4] text-base font-bold">
                {count} {count === 1 ? 'log' : 'logs'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderLogContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Select Stool Type</h3>
            <div className="grid grid-cols-1 gap-3">
              {stoolTypes.map((type) => (
                <motion.button
                  key={type.type}
                  className={`
                    p-4 rounded-xl border flex items-start gap-3
                    ${selectedType === type.type 
                      ? 'border-[#4ECDC4] bg-[#4ECDC4]/5' 
                      : 'border-gray-200'
                    }
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedType(type.type)}
                >
                  <span className="text-2xl">{type.icon}</span>
                  <div className="text-left">
                    <div className="font-medium">Type {type.type}</div>
                    <div className="text-sm text-gray-600">{type.description}</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {type.symptoms.map((symptom, i) => (
                        <span 
                          key={i}
                          className="text-xs px-2 py-1 bg-gray-100 rounded-full"
                        >
                          {symptom}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Additional Symptoms</h3>
            <div className="space-y-4">
              {Object.entries(symptomGroups).map(([group, symptoms]) => (
                <div key={group}>
                  <h4 className="text-sm font-medium text-gray-500 mb-2 capitalize">
                    {group}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {symptoms.map((symptom) => {
                      const isSelected = selectedSymptoms.includes(symptom);
                      return (
                        <motion.button
                          key={symptom}
                          className={`
                            px-3 py-2 rounded-full text-sm
                            ${isSelected 
                              ? 'bg-[#4ECDC4] text-white' 
                              : 'bg-gray-100 text-gray-700'
                            }
                          `}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            if (isSelected) {
                              setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom))
                            } else {
                              setSelectedSymptoms([...selectedSymptoms, symptom])
                            }
                          }}
                        >
                          {symptom}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  }

  const renderFoodScreen = () => (
    <div className="h-full bg-white overflow-auto">
      {showFoodModal ? (
        <div className="h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800">What did you eat?</h3>
            <motion.button 
              onClick={() => setShowFoodModal(false)}
              className="text-gray-400 hover:text-gray-600 text-2xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ×
            </motion.button>
          </div>
          <div className="p-4">
            <input
              type="text"
              value={inputText}
              onChange={(e) => handleFoodInput(e.target.value)}
              placeholder="Type any food item..."
              className="w-full p-4 bg-gray-50 rounded-xl text-base border border-gray-200 mb-2 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] focus:border-transparent"
              disabled={isTyping}
            />
            
            <div className="flex items-center gap-2 mb-4 text-xs text-gray-500 px-1">
              <span className="text-base">✨</span>
              <span>The full app uses AI to instantly recognize and analyze foods for IBD compatibility</span>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4ECDC4]"></div>
              </div>
            ) : (
              <div className="max-h-[400px] overflow-auto">
                {suggestions.map((item, index) => (
                  <motion.div
                    key={index}
                    className="p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50"
                    whileHover={{ scale: 1.01 }}
                    onClick={() => saveFood(item)}
                  >
                    <div className="font-semibold text-gray-800 text-base mb-1">
                      {item.productName}
                    </div>
                    <div className="text-sm text-gray-600 mb-1">
                      {item.brandName}
                    </div>
                    <div className="text-sm text-gray-600">
                      {item.nutrition}
                    </div>
                    <div className="text-sm text-[#4ECDC4] mt-1">
                      {item.ibdConsiderations}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Header with Back Button */}
          <div className="bg-white p-4 flex items-center">
            <motion.button
              className="text-gray-600 font-medium flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentScreen('home')}
            >
              <span className="mr-1">←</span>
              <span>Back</span>
            </motion.button>
          </div>

          {/* Add Food Button */}
          <div className="p-4 pt-2">
            <motion.button
              className="w-full bg-[#4ECDC4] text-white p-4 rounded-xl shadow-lg flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowFoodModal(true)}
            >
              <span className="text-xl">➕</span>
              <span className="text-lg font-semibold">Log Food</span>
            </motion.button>
          </div>

          {/* Food Logs */}
          <div className="px-4">
            {Object.entries(
              foodLogs.reduce((groups, log) => {
                const date = new Date(log.timestamp);
                const dateStr = date.toLocaleDateString('en-US', { 
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                });
                if (!groups[dateStr]) groups[dateStr] = [];
                groups[dateStr].push(log);
                return groups;
              }, {})
            ).map(([date, logs]) => (
              <div key={date} className="mb-4">
                <div className="text-base font-semibold text-gray-800 bg-[#E8F6F5] p-3 rounded-lg mb-2">
                  {date}
                </div>
                {logs.map((log) => (
                  <motion.div
                    key={log.id}
                    className="bg-white rounded-xl p-4 mb-2 shadow-sm"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => {
                      setSelectedFoodLog(log);
                      setShowFoodDetailModal(true);
                    }}
                  >
                    <div className="flex items-center">
                      <span className="text-[#4ECDC4] text-xl mr-3">🍽️</span>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800">{log.productName}</div>
                        <div className="text-sm text-gray-600">{log.brandName}</div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(log.timestamp).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Success Toast */}
      {showFoodSuccess && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl p-6 shadow-lg flex flex-col items-center">
          <div className="text-[#4ECDC4] text-4xl mb-2">✓</div>
          <div className="text-lg font-semibold text-gray-800">Food Logged!</div>
        </div>
      )}

      {/* Food Detail Modal */}
      {showFoodDetailModal && selectedFoodLog && (
        <div className="absolute inset-0 bg-white">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <motion.button 
              onClick={() => setShowFoodDetailModal(false)}
              className="text-gray-500 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-1">←</span>
              <span>Back</span>
            </motion.button>
            <h3 className="font-medium">Food Details</h3>
            <div className="w-12"></div>
          </div>
          <div className="p-4">
            <h4 className="text-xl font-bold text-gray-800 mb-2">{selectedFoodLog.productName}</h4>
            <div className="text-lg text-gray-600 mb-4">{selectedFoodLog.brandName}</div>
            <div className="text-base text-gray-800 mb-3">{selectedFoodLog.nutrition}</div>
            <div className="text-base text-[#4ECDC4] italic mb-4">{selectedFoodLog.ibdConsiderations}</div>
            <div className="text-sm text-gray-500 mb-6">
              Logged: {new Date(selectedFoodLog.timestamp).toLocaleString()}
            </div>
            <motion.button
              className="w-full bg-red-500 text-white p-4 rounded-xl flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (confirm('Are you sure you want to delete this food log?')) {
                  deleteFood(selectedFoodLog.id);
                }
              }}
            >
              <span className="text-lg">🗑️</span>
              <span>Delete Log</span>
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );

  const renderReportsScreen = () => (
    <div className="h-full bg-[#F5F7FA] overflow-auto">
      {/* Header with Back Button */}
      <div className="bg-white p-4 flex items-center">
        <motion.button
          className="text-gray-600 font-medium flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentScreen('home')}
        >
          <span className="mr-1">←</span>
          <span>Back</span>
        </motion.button>
      </div>

      {/* Tabs */}
      <div className="px-4 py-4 overflow-x-auto">
        <div className="flex space-x-3">
          {[
            { id: 'summary', title: 'Summary', icon: '📊' },
            { id: 'problemFoods', title: 'Problem Foods', icon: '⚠️' },
            { id: 'safeFoods', title: 'Safe Foods', icon: '✅' },
            { id: 'insights', title: 'AI Insights', icon: '💡' }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              className={`
                flex items-center px-4 py-3 rounded-xl shadow-sm min-w-[120px]
                ${activeReportTab === tab.id 
                  ? 'bg-[#4ECDC4] text-white' 
                  : 'bg-white text-gray-600'
                }
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveReportTab(tab.id)}
            >
              <span className="mr-2">{tab.icon}</span>
              <span className="text-sm font-medium">{tab.title}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-4">
        {activeReportTab === 'summary' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Health Overview</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-50 p-4 rounded-xl relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#4ECDC4] rounded-l-xl"></div>
                  <div className="text-2xl font-bold text-gray-800">{calculateWeeklyStats().avgPain}</div>
                  <div className="text-sm text-gray-600">Avg Pain Level</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#FFB74D] rounded-l-xl"></div>
                  <div className="text-2xl font-bold text-gray-800">{calculateWeeklyStats().avgBM}</div>
                  <div className="text-sm text-gray-600">Avg Daily BMs</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#FF6B6B] rounded-l-xl"></div>
                  <div className="text-2xl font-bold text-gray-800">{calculateWeeklyStats().totalEntries}</div>
                  <div className="text-sm text-gray-600">This Week</div>
                </div>
              </div>

              <div className="mt-6">
                <motion.button
                  className="w-full bg-[#4ECDC4] text-white p-4 rounded-xl flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={generateDoctorSummary}
                  disabled={isGeneratingSummary}
                >
                  <span className="text-lg">🤖</span>
                  <span className="font-semibold">
                    {isGeneratingSummary ? 'Generating Summary...' : 'Generate AI Doctor Summary'}
                  </span>
                </motion.button>

                {showDoctorSummary && (
                  <motion.div 
                    className="mt-4 p-4 bg-gray-50 rounded-xl text-gray-700 text-sm leading-relaxed overflow-visible"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-[#4ECDC4] text-lg mt-1">👨‍⚕️</span>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 mb-2">Doctor Summary</div>
                        <div className="whitespace-pre-line">{doctorSummaryText}</div>
                        {isGeneratingSummary && (
                          <span className="inline-block w-1 h-4 bg-[#4ECDC4] ml-1 animate-pulse"/>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeReportTab === 'problemFoods' && (
          <div className="space-y-4">
            {mockProblemFoods.map((food, index) => (
              <div key={index} className="bg-white rounded-2xl p-5 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-800">{food.name}</h3>
                  <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
                    {food.riskScore}% Risk
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  Triggered symptoms in {food.flareIncidents} out of {food.totalConsumptions} times consumed
                </div>
              </div>
            ))}
          </div>
        )}

        {activeReportTab === 'safeFoods' && (
          <div className="space-y-4">
            {mockSafeFoods.map((food, index) => (
              <div key={index} className="bg-white rounded-2xl p-5 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-800">{food.name}</h3>
                  <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                    {food.safetyScore}% Safe
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  Safe in {food.totalConsumptions - food.flareIncidents} out of {food.totalConsumptions} times consumed
                </div>
              </div>
            ))}
          </div>
        )}

        {activeReportTab === 'insights' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Identified Patterns</h3>
              <div className="space-y-3">
                {mockInsights.patterns.map((pattern, index) => (
                  <div key={index} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="text-[#4ECDC4]">•</span>
                    <span>{pattern}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recommendations</h3>
              <div className="space-y-3">
                {mockInsights.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="text-[#4ECDC4]">•</span>
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderScreen = () => {
    if (showLogModal) {
      return (
        <div className="h-full bg-white">
          <div className="border-b border-gray-200 p-4 flex justify-between items-center">
            <motion.button 
              onClick={() => {
                if (currentStep > 1) {
                  setCurrentStep(prev => prev - 1);
                } else {
                  setShowLogModal(false);
                }
              }}
              className="text-gray-500 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {currentStep > 1 ? (
                <>
                  <span className="mr-1">←</span>
                  <span>Back</span>
                </>
              ) : (
                <span>✕</span>
              )}
            </motion.button>
            <span className="font-medium">Log Entry</span>
            <button 
              onClick={() => {
                if (currentStep < 2) {
                  setCurrentStep(prev => prev + 1);
                } else {
                  handleSave();
                }
              }}
              className="text-[#4ECDC4] font-medium"
            >
              {currentStep < 2 ? 'Next' : 'Save'}
            </button>
          </div>
          {renderLogContent()}
        </div>
      );
    }

    switch (currentScreen) {
      case 'log':
        return renderLogScreen();
      case 'food':
        return renderFoodScreen();
      case 'reports':
        return renderReportsScreen();
      case 'home':
      default:
        return (
          <>
            {/* Welcome header */}
            <div className="p-3 bg-[#1E2937] text-white flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold leading-tight">FlareCare</h2>
                <p className="text-sm text-gray-400">Track. Monitor. Thrive.</p>
              </div>
              <div className="text-base text-gray-400">
                {new Date().toLocaleDateString()}
              </div>
            </div>
            {renderHomeScreen()}
          </>
        );
    }
  };

  return (
    <div className="relative w-[300px] h-[650px] bg-[#1E2937] rounded-[48px] border-[12px] border-gray-900 overflow-hidden shadow-2xl">
      {/* Status bar */}
      <div className="h-3 bg-[#1E2937] flex items-center justify-between px-4 text-[8px] text-gray-400">
        <span>5:41</span>
        <div className="flex items-center space-x-1">
          <span></span>
          <span>🔋</span>
        </div>
      </div>
      
      {renderScreen()}

      {/* Bottom nav */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white">
        <div className="flex items-center justify-around h-full px-4">
          {[
            { id: 'home', icon: '🏠', label: 'Home' },
            { id: 'log', icon: '📝', label: 'Log' },
            { id: 'food', icon: '🍽️', label: 'Food' },
            { id: 'reports', icon: '📊', label: 'Reports' }
          ].map((item) => (
            <motion.button
              key={item.id}
              className={`
                flex flex-col items-center space-y-0.5
                ${currentScreen === item.id ? 'text-[#4ECDC4]' : 'text-gray-600'}
              `}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentScreen(item.id)}
            >
              <span className="text-base">{item.icon}</span>
              <span className="text-[10px]">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <motion.div 
        className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 w-[300px]"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center">
          <p className="text-white/90 text-xs leading-relaxed">
            ✨ This is a demo version. The full app includes medication tracking, detailed analytics, personalized AI insights, and healthcare provider integration.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

const Home = ({ currentSection, setCurrentSection }) => {
  const [formData, setFormData] = useState({
    businessName: '',
    website: '',
    contactName: '',
    email: '',
    phone: '',
    businessType: '',
    productDescription: '',
    targetAudience: '',
    adBudget: '',
    preferredPlacement: '',
    additionalInfo: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real implementation, this would send the data to a server
    alert('Thank you for your interest! We will contact you soon.');
    setFormData({
      businessName: '',
      website: '',
      contactName: '',
      email: '',
      phone: '',
      businessType: '',
      productDescription: '',
      targetAudience: '',
      adBudget: '',
      preferredPlacement: '',
      additionalInfo: ''
    });
  };

  const scrollToSection = (section) => {
    setCurrentSection(section);
    // You would typically add smooth scrolling here in a full implementation
  };

  const renderAdvertiseForm = () => (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-lg"
      >
        <h2 className="text-3xl font-bold text-white mb-2">Advertise on FlareCare</h2>
        <p className="text-white/80 mb-8">
          Reach thousands of IBD patients and healthcare providers. Partner with us to showcase your products and services to our engaged community.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Business Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Business Name *</label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]"
                  placeholder="Your company name"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]"
                  placeholder="https://www.example.com"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Contact Name *</label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]"
                  placeholder="Your full name"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]"
                  placeholder="contact@example.com"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]"
                  placeholder="(123) 456-7890"
                />
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Business Type *</label>
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]"
                >
                  <option value="" className="text-gray-800">Select type</option>
                  <option value="healthcare" className="text-gray-800">Healthcare Provider</option>
                  <option value="pharmaceutical" className="text-gray-800">Pharmaceutical Company</option>
                  <option value="medical_device" className="text-gray-800">Medical Device Company</option>
                  <option value="nutrition" className="text-gray-800">Nutrition/Supplement Company</option>
                  <option value="other" className="text-gray-800">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Product/Service Description *</label>
              <textarea
                name="productDescription"
                value={formData.productDescription}
                onChange={handleInputChange}
                required
                rows="3"
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]"
                placeholder="Describe your product or service and its relevance to IBD patients"
              ></textarea>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">Target Audience *</label>
              <textarea
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleInputChange}
                required
                rows="2"
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]"
                placeholder="Describe your ideal customer within our user base"
              ></textarea>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">Monthly Advertising Budget *</label>
              <select
                name="adBudget"
                value={formData.adBudget}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]"
              >
                <option value="" className="text-gray-800">Select budget range</option>
                <option value="1000-2500" className="text-gray-800">$1,000 - $2,500</option>
                <option value="2500-5000" className="text-gray-800">$2,500 - $5,000</option>
                <option value="5000-10000" className="text-gray-800">$5,000 - $10,000</option>
                <option value="10000+" className="text-gray-800">$10,000+</option>
              </select>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">Preferred Ad Placement</label>
              <select
                name="preferredPlacement"
                value={formData.preferredPlacement}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]"
              >
                <option value="" className="text-gray-800">Select placement</option>
                <option value="in_app" className="text-gray-800">In-App Ads</option>
                <option value="sponsored_content" className="text-gray-800">Sponsored Content</option>
                <option value="push_notifications" className="text-gray-800">Push Notifications</option>
                <option value="email" className="text-gray-800">Email Newsletter</option>
                <option value="multiple" className="text-gray-800">Multiple Channels</option>
              </select>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">Additional Information</label>
              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4]"
                placeholder="Any additional details or specific requirements"
              ></textarea>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4">
            <motion.button
              type="submit"
              className="bg-[#4ECDC4] text-white px-8 py-3 rounded-xl font-medium shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Submit Request
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );

  return (
    <>
      {currentSection === 'advertise' ? (
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          {renderAdvertiseForm()}
        </div>
      ) : (
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between px-4 sm:px-8">
          {/* Left side content */}
          <motion.div 
            className="w-full lg:w-[45%] text-white pt-8 lg:pt-16 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6 lg:mb-8 text-sm font-medium text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Your IBD Health Companion
            </motion.div>
            <motion.h1 
              className="text-4xl lg:text-6xl font-bold mb-4 lg:mb-6 text-white drop-shadow-lg leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Take Control of Your <br/>
              <span className="text-[#4ECDC4]">IBD Journey</span>
            </motion.h1>
            <motion.p 
              className="text-lg lg:text-xl text-white/90 mb-6 lg:mb-8 drop-shadow leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Track symptoms, monitor medications, and discover patterns with FlareCare - your comprehensive IBD management companion.
            </motion.p>

            {/* Feature Cards */}
            <div className="space-y-4 lg:space-y-6">
              <motion.div 
                className="flex items-center space-x-4 bg-white/10 backdrop-blur-lg rounded-xl p-4 hover:bg-white/20 transition-all border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <div className="w-12 h-12 rounded-full bg-[#4ECDC4]/30 flex items-center justify-center backdrop-blur-lg">
                  📊
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Smart Tracking</h3>
                  <p className="text-white/80">Log symptoms, meals, and medications with ease</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center space-x-4 bg-white/10 backdrop-blur-lg rounded-xl p-4 hover:bg-white/20 transition-all border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
              >
                <div className="w-12 h-12 rounded-full bg-[#4ECDC4]/30 flex items-center justify-center backdrop-blur-lg">
                  🔍
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Pattern Recognition</h3>
                  <p className="text-white/80">Identify triggers and track your progress over time</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center space-x-4 bg-white/10 backdrop-blur-lg rounded-xl p-4 hover:bg-white/20 transition-all border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.5 }}
              >
                <div className="w-12 h-12 rounded-full bg-[#4ECDC4]/30 flex items-center justify-center backdrop-blur-lg">
                  ⏰
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Medication Reminders</h3>
                  <p className="text-white/80">Never miss a dose with smart notifications</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Phone mockup */}
          <motion.div 
            className="w-full lg:w-[45%] flex flex-col items-center pt-12 lg:pt-8"
            initial={{ opacity: 0, x: 100, y: 100, rotate: 10 }}
            animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
            transition={{ 
              duration: 1,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
          >
            <div className="relative w-[280px] lg:w-[300px]">
              {/* Phone frame shadow and highlights */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-[#4ECDC4]/20 to-white/30 rounded-[48px] transform -z-10"
                initial={{ scale: 0.8, rotate: 15 }}
                animate={{ scale: 1.02, rotate: 6 }}
                transition={{
                  duration: 1.2,
                  delay: 0.2,
                  type: "spring",
                  stiffness: 100
                }}
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-bl from-[#4ECDC4]/20 to-white/30 rounded-[48px] transform -z-10"
                initial={{ scale: 0.8, rotate: -15 }}
                animate={{ scale: 1.02, rotate: -6 }}
                transition={{
                  duration: 1.2,
                  delay: 0.2,
                  type: "spring",
                  stiffness: 100
                }}
              />
              
              {/* The actual phone mockup */}
              <AppMockup />

              {/* Decorative elements */}
              <motion.div 
                className="absolute top-20 -left-16 w-24 h-24 bg-[#4ECDC4]/40 rounded-full blur-2xl -z-20"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              <motion.div 
                className="absolute bottom-20 -right-16 w-24 h-24 bg-[#4ECDC4]/40 rounded-full blur-2xl -z-20"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
              />
            </div>

            {/* Disclaimer */}
            <motion.div 
              className="mt-8 text-center max-w-[250px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <div className="flex items-center justify-center gap-2 text-white/90 text-sm mb-1">
                  <span>✨</span>
                  <span className="font-medium">Demo Version</span>
                </div>
                <p className="text-white/80 text-xs leading-relaxed">
                  This demo showcases core features. Full app includes medication tracking, detailed analytics, AI insights, and healthcare integration.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </>
  )
}

export default Home 