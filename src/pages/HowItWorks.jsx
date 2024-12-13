import { motion } from 'framer-motion'

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2C3E50] to-[#3498DB] pt-32 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">How FlareCare Works</h1>
          <p className="text-lg lg:text-xl text-white/90 max-w-2xl mx-auto">
            Your journey to better health management starts here
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8">
          {/* Steps */}
          <div className="space-y-8">
            {/* Step 1 */}
            <motion.div 
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 bg-[#4ECDC4] rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
                <h3 className="text-xl font-semibold text-white">Download & Sign Up</h3>
              </div>
              <p className="text-white/80 pl-16">
                Get started by downloading FlareCare from the App Store or Google Play. Create your account and set up your profile with your health information.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 bg-[#4ECDC4] rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
                <h3 className="text-xl font-semibold text-white">Track Your Symptoms</h3>
              </div>
              <p className="text-white/80 pl-16">
                Use our intuitive tracking system to log your symptoms, medications, and diet. The more you track, the more insights you'll gain about your health patterns.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 bg-[#4ECDC4] rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  3
                </div>
                <h3 className="text-xl font-semibold text-white">Get Insights</h3>
              </div>
              <p className="text-white/80 pl-16">
                Our smart analytics will analyze your data to identify patterns and triggers. Receive personalized insights and recommendations for better health management.
              </p>
            </motion.div>

            {/* Step 4 */}
            <motion.div 
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 bg-[#4ECDC4] rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  4
                </div>
                <h3 className="text-xl font-semibold text-white">Share With Your Doctor</h3>
              </div>
              <p className="text-white/80 pl-16">
                Generate comprehensive health reports to share with your healthcare team. Make more informed decisions about your treatment plan together.
              </p>
            </motion.div>
          </div>
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
            Start Your Journey Today
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorks 