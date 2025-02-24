// PolicyModals.js
import React from 'react';
import { Card } from '../../components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, UserCheck, Database, Eye, Shield,
  FileText, Scale, X
} from 'lucide-react';

// Base Modal Component
const Modal = ({ isOpen, onClose, children }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black z-[60]"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-2 sm:inset-4 md:inset-10 z-[70] bg-white rounded-xl shadow-2xl overflow-hidden"
        >
          {children}
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

// Privacy Policy Content
const PrivacyContent = ({ onClose }) => (
  <div className="h-full flex flex-col bg-gray-50">
    {/* Header - Left aligned */}
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="w-full px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <img
                src="https://assests.netlify.app/assets/images/logo.png"
                alt="Kokobeo Logo"
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-blue-600 text-left">Kokobeo</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex items-center text-gray-500 hover:text-gray-700 p-2 rounded-lg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>

    {/* Scrollable Content */}
    <div className="flex-1 overflow-y-auto">
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Title Section */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center justify-center p-2 bg-blue-100 rounded-full">
                <Lock className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Privacy Policy
                </h1>
                <p className="text-gray-600 mt-1">
                  Last updated: December 27, 2024
                </p>
              </div>
            </div>
          </div>

          {/* Key Points Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 bg-white">
              <UserCheck className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-left">Data Collection</h3>
              <p className="text-gray-600 text-sm text-left">
                We collect only essential information needed to provide our services
              </p>
            </Card>

            <Card className="p-6 bg-white">
              <Database className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Data Storage</h3>
              <p className="text-gray-600 text-sm">
                Secure storage with industry-standard encryption
              </p>
            </Card>

            <Card className="p-6 bg-white">
              <Eye className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Data Usage</h3>
              <p className="text-gray-600 text-sm">
                Transparent about how we use your information
              </p>
            </Card>

            <Card className="p-6 bg-white">
              <Shield className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Your Rights</h3>
              <p className="text-gray-600 text-sm">
                Control over your personal information
              </p>
            </Card>
          </div>

          {/* Privacy Content */}
          <Card className="p-6 sm:p-8 bg-white">
            <div className="prose max-w-none text-left">
              <h2 className="text-xl font-semibold mb-4 text-left">1. Information We Collect</h2>
              <p className="mb-6 text-left">
                We collect various types of information to provide and improve our services:
              </p>
              <ul className="list-disc pl-6 mb-6 text-left">
                <li className="text-left">Personal identification information (Name, email address, phone number)</li>
                <li className="text-left">Professional credentials (VAT numbers, business certificates)</li>
                <li className="text-left">Address and location data</li>
                <li className="text-left">Service request details and communication history</li>
                <li className="text-left">Payment information</li>
              </ul>

              <h2 className="text-xl font-semibold mb-4 text-left">2. How We Use Your Information</h2>
              <p className="mb-6 text-left">Your information is used to:</p>
              <ul className="list-disc pl-6 mb-6 text-left">
                <li className="text-left">Facilitate connections between customers and professionals</li>
                <li className="text-left">Process payments and manage transactions</li>
                <li className="text-left">Verify identities and credentials</li>
                <li className="text-left">Provide emergency services when requested</li>
                <li className="text-left">Improve our platform and services</li>
              </ul>

              <h2 className="text-xl font-semibold mb-4 text-left">3. Information Protection</h2>
              <p className="mb-6 text-left">We implement various security measures:</p>
              <ul className="list-disc pl-6 mb-6 text-left">
                <li className="text-left">Encryption of sensitive data</li>
                <li className="text-left">Secure storage systems</li>
                <li className="text-left">Regular security audits</li>
                <li className="text-left">Access controls and monitoring</li>
              </ul>

              <h2 className="text-xl font-semibold mb-4 text-left">4. Data Sharing</h2>
              <p className="mb-6 text-left">We share information only when necessary:</p>
              <ul className="list-disc pl-6 mb-6 text-left">
                <li className="text-left">Between customers and professionals after quote purchase</li>
                <li className="text-left">With payment processors for transactions</li>
                <li className="text-left">With verification services for identity checks</li>
                <li className="text-left">When required by law</li>
              </ul>

              <h2 className="text-xl font-semibold mb-4 text-left">5. Your Privacy Rights</h2>
              <p className="mb-6 text-left">You have the right to:</p>
              <ul className="list-disc pl-6 mb-6 text-left">
                <li className="text-left">Access your personal data</li>
                <li className="text-left">Request data correction or deletion</li>
                <li className="text-left">Object to data processing</li>
                <li className="text-left">Data portability</li>
              </ul>

              <h2 className="text-xl font-semibold mb-4 text-left">6. Contact Information</h2>
              <p className="mb-6 text-left">
                For privacy-related inquiries, contact our Data Protection Officer at:
                privacy@kokobeo.com
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  </div>
);

// Terms Content Component
const TermsContent = ({ onClose }) => (
  <div className="h-full flex flex-col bg-gray-50">
    {/* Header */}
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="w-full px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <img
                src="https://assests.netlify.app/assets/images/logo.png"
                alt="Kokobeo Logo"
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-blue-600">Kokobeo</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex items-center text-gray-500 hover:text-gray-700 p-2 rounded-lg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>

    {/* Scrollable Content */}
    <div className="flex-1 overflow-y-auto">
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Title Section */}
          <div className="text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 text-left">
              Terms and Conditions
            </h1>
            <p className="text-gray-600 text-left">
              Last updated: December 27, 2024
            </p>
          </div>

          {/* Key Points Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-white text-left">
              <FileText className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-left">Service Terms</h3>
              <p className="text-gray-600 text-sm text-left">
                Clear guidelines on how our platform connects customers with professionals
              </p>
            </Card>

            <Card className="p-6 bg-white text-left">
              <Shield className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-left">Security</h3>
              <p className="text-gray-600 text-sm text-left">
                Robust measures to protect your data and transactions
              </p>
            </Card>

            <Card className="p-6 bg-white text-left">
              <Scale className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-left">Legal Rights</h3>
              <p className="text-gray-600 text-sm text-left">
                Your rights and responsibilities when using our platform
              </p>
            </Card>
          </div>

          {/* Terms Content */}
          <Card className="p-6 sm:p-8 bg-white">
            <div className="prose max-w-none text-left">
              <h2 className="text-xl font-semibold mb-4 text-left">1. Platform Usage</h2>
              <p className="mb-6 text-left">
                The platform is designed to connect customers seeking services with qualified professionals. 
                Customers can receive up to 5 quotes from different professionals and can provide anonymous 
                feedback on quotes to receive better offers.
              </p>

              <h2 className="text-xl font-semibold mb-4 text-left">2. Professional Registration</h2>
              <p className="mb-6 text-left">
                Professionals must register with valid credentials including VAT number or company 
                registration. Documentation requirements include Chamber of Commerce certificate, 
                identity verification, and proof of address.
              </p>

              <h2 className="text-xl font-semibold mb-4 text-left">3. Emergency Services</h2>
              <p className="mb-6 text-left">
                Emergency service providers must maintain specified response times and accept 
                the platform's rate structure for different time slots (day, evening, night) 
                and days (working days, holidays).
              </p>

              <h2 className="text-xl font-semibold mb-4 text-left">4. Payment Terms</h2>
              <p className="mb-6 text-left">
                Professionals can purchase individual quotes or subscribe to credit packages. 
                Platform fees and commission structures apply to all transactions.
              </p>

              <h2 className="text-xl font-semibold mb-4 text-left">5. Communication Guidelines</h2>
              <p className="mb-6 text-left">
                All communication between customers and professionals must occur through the 
                platform's internal chat system. External contact information is hidden until 
                quote purchase.
              </p>

              <h2 className="text-xl font-semibold mb-4 text-left">6. Account Certification</h2>
              <p className="mb-6 text-left">
                Both customers and professionals must complete account verification. Private 
                individuals must provide identification, tax code, and proof of address.
              </p>

              <h2 className="text-xl font-semibold mb-4 text-left">7. Service Quality</h2>
              <p className="mb-6 text-left">
                Professionals must maintain quality standards and respond to customer feedback. 
                Review systems are in place for both customers and professionals.
              </p>

              <h2 className="text-xl font-semibold mb-4 text-left">8. Dispute Resolution</h2>
              <p className="mb-6 text-left">
                Platform provides mediation services for disputes between customers and 
                professionals. Clear process for handling complaints and refunds.
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  </div>
);

// Main PolicyModals Component
const PolicyModals = ({ showPrivacyModal, showTermsModal, onClosePrivacy, onCloseTerms }) => {
  return (
    <>
      <Modal isOpen={showPrivacyModal} onClose={onClosePrivacy}>
        <PrivacyContent onClose={onClosePrivacy} />
      </Modal>

      <Modal isOpen={showTermsModal} onClose={onCloseTerms}>
        <TermsContent onClose={onCloseTerms} />
      </Modal>
    </>
  );
};

export default PolicyModals;