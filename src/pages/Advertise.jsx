import { motion } from 'framer-motion';

const Advertise = () => {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-white mb-6">Advertise on FlareCare</h1>
        <p className="text-white/90 mb-8">
          Reach thousands of IBD patients and healthcare providers. Partner with us to showcase your
          products and services to our engaged community.
        </p>
        
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white mb-2">Business Name *</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded bg-white/10 text-white border border-white/20"
                placeholder="Your company name"
                required
              />
            </div>
            <div>
              <label className="block text-white mb-2">Email *</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded bg-white/10 text-white border border-white/20"
                placeholder="contact@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-white mb-2">Website</label>
              <input
                type="url"
                className="w-full px-4 py-2 rounded bg-white/10 text-white border border-white/20"
                placeholder="https://www.example.com"
              />
            </div>
            <div>
              <label className="block text-white mb-2">Phone Number</label>
              <input
                type="tel"
                className="w-full px-4 py-2 rounded bg-white/10 text-white border border-white/20"
                placeholder="(123) 456-7890"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-white mb-2">Business Type *</label>
            <select 
              className="w-full px-4 py-2 rounded bg-white/10 text-white border border-white/20"
              required
            >
              <option value="">Select type</option>
              <option value="healthcare">Healthcare Provider</option>
              <option value="pharma">Pharmaceutical</option>
              <option value="medical_device">Medical Device</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-white mb-2">Product/Service Description *</label>
            <textarea
              className="w-full px-4 py-2 rounded bg-white/10 text-white border border-white/20"
              rows="4"
              placeholder="Describe your product or service and its relevance to IBD patients"
              required
            ></textarea>
          </div>
          
          <motion.button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-[#4ECDC4] text-white rounded-lg font-semibold"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Submit Application
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Advertise;
