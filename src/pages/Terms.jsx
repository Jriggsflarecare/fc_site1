import { motion } from 'framer-motion';

const Terms = () => {
  const lastUpdated = 'December 6, 2023';

  return (
    <div className="max-w-4xl mx-auto px-8">
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
        <p className="text-white/80">Last Updated: {lastUpdated}</p>
      </motion.div>

      <motion.div
        className="space-y-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Agreement to Terms */}
        <section className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
          <p className="text-white/90 leading-relaxed mb-4">
            By accessing or using FlareCare, you agree to be bound by these Terms of Service. If you disagree with any 
            part of these terms, you may not access the service. These Terms of Service apply to all users and others 
            who access or use FlareCare.
          </p>
        </section>

        {/* Account Terms */}
        <section className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">2. Account Terms</h2>
          <ul className="list-disc list-inside text-white/90 leading-relaxed space-y-2">
            <li>You must be 13 years or older to use this service</li>
            <li>You must provide accurate and complete information when creating an account</li>
            <li>You are responsible for maintaining the security of your account</li>
            <li>You must notify us immediately of any unauthorized access to your account</li>
            <li>You may not use the service for any illegal purposes</li>
            <li>Your login may only be used by one person - sharing is not permitted</li>
          </ul>
        </section>

        {/* User Responsibilities */}
        <section className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">3. User Responsibilities</h2>
          <p className="text-white/90 leading-relaxed mb-4">
            When using FlareCare, you agree to:
          </p>
          <ul className="list-disc list-inside text-white/90 leading-relaxed space-y-2">
            <li>Provide accurate health information</li>
            <li>Not share personal medical information of others without consent</li>
            <li>Use the app as intended for personal health tracking</li>
            <li>Not attempt to manipulate or abuse app features</li>
            <li>Not use the app as a substitute for professional medical advice</li>
            <li>Keep your account credentials secure</li>
          </ul>
        </section>

        {/* Medical Disclaimer */}
        <section className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">4. Medical Disclaimer</h2>
          <p className="text-white/90 leading-relaxed">
            FlareCare is a health tracking tool and does not provide medical advice. The content provided through our 
            service is for informational purposes only. Always consult with qualified healthcare providers regarding 
            medical conditions and treatment. Never disregard professional medical advice or delay seeking it because 
            of information provided through FlareCare.
          </p>
        </section>

        {/* Intellectual Property */}
        <section className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">5. Intellectual Property</h2>
          <p className="text-white/90 leading-relaxed mb-4">
            The service and its original content, features, and functionality are owned by FlareCare and are protected by:
          </p>
          <ul className="list-disc list-inside text-white/90 leading-relaxed space-y-2">
            <li>International copyright laws</li>
            <li>Trademark laws</li>
            <li>Other intellectual property rights</li>
          </ul>
        </section>

        {/* Termination */}
        <section className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">6. Termination</h2>
          <p className="text-white/90 leading-relaxed">
            We may terminate or suspend your account immediately, without prior notice or liability, for any reason, 
            including breach of these Terms. Upon termination, your right to use the service will immediately cease. 
            You may also delete your account at any time through the app settings.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">7. Limitation of Liability</h2>
          <p className="text-white/90 leading-relaxed">
            In no event shall FlareCare, nor its directors, employees, partners, agents, suppliers, or affiliates, be 
            liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, 
            loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of 
            or inability to access or use the service.
          </p>
        </section>

        {/* Changes to Terms */}
        <section className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">8. Changes to Terms</h2>
          <p className="text-white/90 leading-relaxed">
            We reserve the right to modify or replace these Terms at any time. If a revision is material, we will 
            provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change 
            will be determined at our sole discretion.
          </p>
        </section>

        {/* Contact Information */}
        <section className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">9. Contact Us</h2>
          <p className="text-white/90 leading-relaxed">
            If you have any questions about these Terms, please contact us at:
          </p>
          <div className="mt-4 text-white/90">
            <p>FlareCare</p>
            <p>Fort Worth, Texas</p>
            <p>Email: terms@flarecare.com</p>
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default Terms; 