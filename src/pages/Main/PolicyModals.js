// PolicyModals.js
import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const PolicyModal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-white rounded-xl max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="h-5 w-5" />
        </button>
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <div className="prose max-w-none">
          {content}
        </div>
      </motion.div>
    </motion.div>
  );
};

const PolicyModals = ({ 
  showPrivacyModal, 
  showTermsModal, 
  onClosePrivacy, 
  onCloseTerms 
}) => {
  return (
    <>
      <PolicyModal
        isOpen={showPrivacyModal}
        onClose={onClosePrivacy}
        title="Privacy Policy"
        content={
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">1. Information Collection</h4>
            <p>
              We collect information that you provide directly to us, including when you:
            </p>
            <ul className="list-disc pl-4">
              <li>Create an account</li>
              <li>Use our services</li>
              <li>Contact customer support</li>
              <li>Sign up for our newsletters</li>
            </ul>

            <h4 className="text-lg font-semibold">2. Use of Information</h4>
            <p>
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-4">
              <li>Provide and improve our services</li>
              <li>Process your transactions</li>
              <li>Send you technical notices and support messages</li>
              <li>Communicate with you about products, services, and events</li>
            </ul>

            <h4 className="text-lg font-semibold">3. Information Sharing</h4>
            <p>
              We may share your information with:
            </p>
            <ul className="list-disc pl-4">
              <li>Service providers</li>
              <li>Professional advisors</li>
              <li>Law enforcement when required</li>
            </ul>
          </div>
        }
      />

      <PolicyModal
        isOpen={showTermsModal}
        onClose={onCloseTerms}
        title="Terms of Service"
        content={
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">1. Acceptance of Terms</h4>
            <p>
              By accessing and using this platform, you accept and agree to be bound by the terms
              and provision of this agreement.
            </p>

            <h4 className="text-lg font-semibold">2. User Responsibilities</h4>
            <p>
              You agree to:
            </p>
            <ul className="list-disc pl-4">
              <li>Provide accurate information</li>
              <li>Maintain the security of your account</li>
              <li>Comply with all applicable laws</li>
              <li>Not engage in unauthorized activities</li>
            </ul>

            <h4 className="text-lg font-semibold">3. Service Description</h4>
            <p>
              Our platform connects professionals with clients seeking their services. We do not:
            </p>
            <ul className="list-disc pl-4">
              <li>Guarantee service quality</li>
              <li>Directly provide professional services</li>
              <li>Take responsibility for professional-client interactions</li>
            </ul>
          </div>
        }
      />
    </>
  );
};

export default PolicyModals;