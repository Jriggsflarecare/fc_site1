import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-8">
      {/* Mission Statement */}
      <motion.div
        className="mb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-white mb-6">Our Mission</h1>
        <p className="text-xl text-white/90 leading-relaxed">
          At FlareCare, we're on a mission to empower individuals living with IBD to take control of their health journey. 
          We understand the challenges because we've lived them.
        </p>
      </motion.div>

      {/* Founder's Story */}
      <motion.div
        className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex items-center gap-6 mb-8">
          <div className="flex-shrink-0">
            <div className="w-24 h-24 rounded-full bg-[#4ECDC4] flex items-center justify-center text-2xl font-bold text-white">
              JR
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Joshua Riggs</h2>
            <p className="text-white/80">Founder & CEO</p>
            <p className="text-white/80">Fort Worth, Texas</p>
          </div>
        </div>

        <div className="space-y-6 text-white/90">
          <p className="leading-relaxed">
            My journey with IBD began when I was diagnosed with Left-sided Colitis, which eventually progressed to severe Pancolitis. 
            For three grueling years, I experienced the full impact of this devastating disease - two hospitalizations, countless ER visits due to dehydration, 
            and the daily struggle that anyone with IBD knows all too well.
          </p>

          <p className="leading-relaxed">
            I tried everything to manage my UC. Each day was a new battle, not just with the physical symptoms, but with the uncertainty 
            and fear that comes with this condition. It wasn't until I found the right biologic medication that I finally began to see 
            the light at the end of the tunnel.
          </p>

          <p className="leading-relaxed">
            After achieving remission and becoming steroid-free, I made a decision: I wanted to help others who were going through 
            the same struggle. I knew firsthand how isolating and overwhelming IBD can be, and I believed there had to be a better 
            way to track, manage, and understand this condition.
          </p>

          <p className="leading-relaxed">
            That's when FlareCare was born. As a father to my amazing 2-year-old son Easton, I'm reminded every day of why this 
            mission is so important. Easton is my 'why' - he shows me the importance of being present, healthy, and able to fully 
            engage in life's precious moments.
          </p>
        </div>
      </motion.div>

      {/* Company Values */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
          <div className="text-3xl mb-4">💪</div>
          <h3 className="text-xl font-semibold text-white mb-3">Empowerment</h3>
          <p className="text-white/80 text-sm">
            We believe in giving people with IBD the tools and knowledge they need to take control of their health journey.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
          <div className="text-3xl mb-4">🤝</div>
          <h3 className="text-xl font-semibold text-white mb-3">Community</h3>
          <p className="text-white/80 text-sm">
            No one should face IBD alone. We're building a supportive community where experiences and insights are shared.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
          <div className="text-3xl mb-4">🎯</div>
          <h3 className="text-xl font-semibold text-white mb-3">Innovation</h3>
          <p className="text-white/80 text-sm">
            We're constantly innovating to provide the best tools for tracking, understanding, and managing IBD.
          </p>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-white mb-4">Join Our Journey</h2>
        <p className="text-white/90 mb-8">
          Together, we can make living with IBD more manageable, more understood, and less isolating.
        </p>
        <motion.button
          className="bg-[#4ECDC4] text-white px-8 py-4 rounded-xl font-medium text-lg shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.open('https://apps.apple.com/us/app', '_blank')}
        >
          Download FlareCare Today
        </motion.button>
      </motion.div>
    </div>
  );
};

export default About; 