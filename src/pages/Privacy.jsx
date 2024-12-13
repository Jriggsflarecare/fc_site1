import { motion } from 'framer-motion';

const Privacy = () => {
  const lastUpdated = 'December 6, 2023';

  return (
    <div className="max-w-4xl mx-auto px-8">
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
        <p className="text-white/80">Last Updated: {lastUpdated}</p>
      </motion.div>

      <motion.div
        className="space-y-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Introduction */}
        <section className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
          <p className="text-white/90 leading-relaxed mb-4">
            At FlareCare, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and 
            safeguard your information when you use our mobile application and related services. Please read this privacy policy 
            carefully. By using FlareCare, you consent to the practices described in this policy.
          </p>
        </section>

        {/* Information We Collect */}
        <section className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
          
          <h3 className="text-xl font-semibold text-white mb-3">Personal Information</h3>
          <ul className="list-disc list-inside text-white/90 leading-relaxed mb-6 space-y-2">
            <li>Name and contact information when you create an account</li>
            <li>Email address for account management and communications</li>
            <li>Date of birth and gender for personalized health tracking</li>
            <li>Profile information you choose to provide</li>
          </ul>

          <h3 className="text-xl font-semibold text-white mb-3">Health Information</h3>
          <ul className="list-disc list-inside text-white/90 leading-relaxed mb-6 space-y-2">
            <li>Symptoms and severity tracking</li>
            <li>Medication logs and schedules</li>
            <li>Food diary entries</li>
            <li>Bowel movement tracking</li>
            <li>General wellness information</li>
          </ul>

          <h3 className="text-xl font-semibold text-white mb-3">Usage Information</h3>
          <ul className="list-disc list-inside text-white/90 leading-relaxed mb-4 space-y-2">
            <li>Device information (type, model, operating system)</li>
            <li>App usage statistics</li>
            <li>Feature interaction data</li>
            <li>Error logs and performance data</li>
          </ul>
        </section>

        {/* How We Use Your Information */}
        <section className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
          <ul className="list-disc list-inside text-white/90 leading-relaxed space-y-2">
            <li>Provide and maintain the FlareCare service</li>
            <li>Personalize your experience and improve our features</li>
            <li>Generate insights and patterns about your health</li>
            <li>Send important notifications about your health tracking</li>
            <li>Communicate with you about updates and new features</li>
            <li>Ensure the security and integrity of our service</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        {/* Data Security */}
        <section className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
          <p className="text-white/90 leading-relaxed mb-4">
            We implement appropriate technical and organizational security measures to protect your personal and health 
            information. These measures include:
          </p>
          <ul className="list-disc list-inside text-white/90 leading-relaxed space-y-2">
            <li>End-to-end encryption for sensitive health data</li>
            <li>Secure data storage using industry-standard encryption</li>
            <li>Regular security audits and updates</li>
            <li>Strict access controls and authentication requirements</li>
            <li>Regular backup procedures</li>
          </ul>
        </section>

        {/* Your Rights */}
        <section className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
          <p className="text-white/90 leading-relaxed mb-4">
            You have certain rights regarding your personal information:
          </p>
          <ul className="list-disc list-inside text-white/90 leading-relaxed space-y-2">
            <li>Access your personal information</li>
            <li>Correct inaccurate or incomplete information</li>
            <li>Request deletion of your information</li>
            <li>Export your data in a portable format</li>
            <li>Opt-out of certain data processing activities</li>
            <li>Withdraw consent at any time</li>
          </ul>
        </section>

        {/* Data Retention */}
        <section className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Data Retention</h2>
          <p className="text-white/90 leading-relaxed">
            We retain your personal information for as long as necessary to provide our services and comply with legal 
            obligations. If you delete your account, we will delete or anonymize your information unless required to 
            retain it by law.
          </p>
        </section>

        {/* Children's Privacy */}
        <section className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Children's Privacy</h2>
          <p className="text-white/90 leading-relaxed">
            FlareCare is not intended for children under 13 years of age. We do not knowingly collect personal 
            information from children under 13. If you believe we have collected information from a child under 13, 
            please contact us immediately.
          </p>
        </section>

        {/* Contact Information */}
        <section className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
          <p className="text-white/90 leading-relaxed">
            If you have any questions about this Privacy Policy or our practices, please contact us at:
          </p>
          <div className="mt-4 text-white/90">
            <p>FlareCare</p>
            <p>Fort Worth, Texas</p>
            <p>Email: privacy@flarecare.com</p>
          </div>
        </section>

        {/* Updates to Privacy Policy */}
        <section className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Updates to This Policy</h2>
          <p className="text-white/90 leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
            Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy 
            Policy periodically for any changes.
          </p>
        </section>
      </motion.div>
    </div>
  );
};

export default Privacy; 