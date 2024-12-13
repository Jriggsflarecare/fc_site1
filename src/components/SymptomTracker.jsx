import { useState } from 'react';
import { motion } from 'framer-motion';
import CalendarDay from './CalendarDay';

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
}));

const symptomGroups = {
  digestive: ['Bloating', 'Gas', 'Nausea', 'Vomiting'],
  pain: ['Abdominal Pain', 'Joint Pain', 'Fatigue'],
  bowel: ['Urgency', 'Incomplete Evacuation', 'Mucus']
};

const SymptomTracker = () => {
  const [showLogModal, setShowLogModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [newEntry, setNewEntry] = useState({
    stoolType: 4,
    symptoms: [],
    date: new Date()
  });

  const handleSave = () => {
    // In the demo, just show success and close
    setShowLogModal(false);
    setCurrentStep(1);
    // You could add a download prompt here
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4 p-4">
            <h3 className="text-xl font-semibold mb-6">Select Stool Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stoolTypes.map((stool) => (
                <motion.button
                  key={stool.type}
                  className={`
                    p-4 rounded-xl border-2 text-left
                    ${newEntry.stoolType === stool.type 
                      ? 'border-[#4ECDC4] bg-[#4ECDC4] text-white' 
                      : 'border-gray-200 hover:border-[#4ECDC4]'}
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setNewEntry({...newEntry, stoolType: stool.type})}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{stool.icon}</span>
                    <div>
                      <h4 className="font-semibold">Type {stool.type}</h4>
                      <p className="text-sm opacity-90">{stool.description}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {stool.symptoms.map((symptom, index) => (
                      <span 
                        key={index}
                        className={`
                          text-xs px-2 py-1 rounded-full
                          ${newEntry.stoolType === stool.type 
                            ? 'bg-white/20 text-white' 
                            : 'bg-gray-100 text-gray-600'}
                        `}
                      >
                        {symptom}
                      </span>
                    ))}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4 p-4">
            <h3 className="text-xl font-semibold mb-6">Select Symptoms</h3>
            {Object.entries(symptomGroups).map(([group, symptoms]) => (
              <div key={group} className="mb-6">
                <h4 className="text-lg font-medium mb-3 capitalize">{group}</h4>
                <div className="grid grid-cols-2 gap-2">
                  {symptoms.map((symptom) => (
                    <motion.button
                      key={symptom}
                      className={`
                        p-3 rounded-lg border text-left
                        ${newEntry.symptoms.includes(symptom)
                          ? 'bg-[#4ECDC4] border-[#4ECDC4] text-white'
                          : 'border-gray-200 hover:border-[#4ECDC4]'}
                      `}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        const updatedSymptoms = newEntry.symptoms.includes(symptom)
                          ? newEntry.symptoms.filter(s => s !== symptom)
                          : [...newEntry.symptoms, symptom];
                        setNewEntry({...newEntry, symptoms: updatedSymptoms});
                      }}
                    >
                      {symptom}
                    </motion.button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Quick Action Button */}
      <motion.button
        className="w-full bg-[#4ECDC4] text-white p-4 rounded-xl shadow-lg flex items-center justify-center space-x-2 mb-8"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowLogModal(true)}
      >
        <span className="text-2xl">➕</span>
        <span className="text-lg font-semibold">Log New Entry</span>
      </motion.button>

      {/* Modal */}
      {showLogModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div 
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            {/* Modal Header */}
            <div className="border-b border-gray-200 p-4 flex justify-between items-center">
              <button 
                onClick={() => currentStep > 1 ? setCurrentStep(prev => prev - 1) : setShowLogModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                {currentStep > 1 ? '← Back' : '✕ Close'}
              </button>
              <h2 className="text-xl font-semibold">Log Entry</h2>
              <button 
                onClick={() => currentStep < 2 ? setCurrentStep(prev => prev + 1) : handleSave()}
                className="text-[#4ECDC4] font-medium"
              >
                {currentStep < 2 ? 'Next' : 'Save'}
              </button>
            </div>

            {/* Modal Content */}
            {renderStepContent()}
          </motion.div>
        </div>
      )}

      {/* Download Prompt */}
      <div className="mt-8 bg-gray-50 rounded-xl p-6 text-center">
        <h3 className="text-xl font-semibold mb-2">Want the full experience?</h3>
        <p className="text-gray-600 mb-4">
          Download the mobile app to access all features, including detailed tracking, 
          analytics, and personalized insights.
        </p>
        <motion.button
          className="bg-[#4ECDC4] text-white px-8 py-3 rounded-full font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Download Now
        </motion.button>
      </div>
    </div>
  );
};

export default SymptomTracker; 