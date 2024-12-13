import { motion } from 'framer-motion'

const Features = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2C3E50] to-[#3498DB] pt-32 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">Powerful Features for Better Health Management</h1>
          <p className="text-lg lg:text-xl text-white/90 max-w-2xl mx-auto">
            Discover how FlareCare helps you take control of your IBD journey with these innovative features
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Symptom Tracking */}
          <motion.div 
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="h-12 w-12 bg-[#4ECDC4] rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Symptom Tracking</h3>
            <p className="text-white/80">
              Log and monitor your symptoms with ease. Track severity, frequency, and patterns to better understand your condition.
            </p>
          </motion.div>

          {/* Medication Management */}
          <motion.div 
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="h-12 w-12 bg-[#4ECDC4] rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Medication Management</h3>
            <p className="text-white/80">
              Never miss a dose with our smart medication reminders. Keep track of your prescriptions and refill schedules.
            </p>
          </motion.div>

          {/* Diet Tracking */}
          <motion.div 
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="h-12 w-12 bg-[#4ECDC4] rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Diet Tracking</h3>
            <p className="text-white/80">
              Identify trigger foods and track your diet. Create personalized meal plans that work for your condition.
            </p>
          </motion.div>

          {/* Reports & Analytics */}
          <motion.div 
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="h-12 w-12 bg-[#4ECDC4] rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Reports & Analytics</h3>
            <p className="text-white/80">
              Generate detailed health reports to share with your healthcare team. Visualize trends and patterns in your health data.
            </p>
          </motion.div>

          {/* Community Support */}
          <motion.div 
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="h-12 w-12 bg-[#4ECDC4] rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Community Support</h3>
            <p className="text-white/80">
              Connect with others who understand your journey. Share experiences and find support in our moderated community.
            </p>
          </motion.div>

          {/* Doctor Communication */}
          <motion.div 
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="h-12 w-12 bg-[#4ECDC4] rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Doctor Communication</h3>
            <p className="text-white/80">
              Share detailed health reports with your healthcare providers. Enable better communication and informed decision-making.
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.button 
            className="bg-[#4ECDC4] text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-[#45b8b0] transition-colors shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('https://apps.apple.com/us/app', '_blank')}
          >
            Download FlareCare Today
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Features 