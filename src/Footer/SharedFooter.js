import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe } from 'lucide-react';
import PolicyModals from '../../src/pages/Main/Policy';

// Info Popup Component
const InfoPopup = ({ isOpen, onClose, title, content }) => {
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
        className="bg-white rounded-xl max-w-lg w-full p-6 relative"
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

const SharedFooter = () => {
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showHiring, setShowHiring] = useState(false);
  const [showQuotes, setShowQuotes] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  return (
    <>
      <div className="fixed bottom-0 w-full bg-white border-t z-30">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-3">
          {/* Mobile Footer */}
          <div className="flex flex-col sm:hidden">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <Globe className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-xs text-gray-600">Loading location...</span>
              </div>
              <div className="text-xs text-gray-600">
                Kokobeo Inc.
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button 
                onClick={() => setShowHowItWorks(true)}
                className="text-xs text-gray-600 hover:text-gray-900"
              >
                How it works
              </button>
              <button 
                onClick={() => setShowHiring(true)}
                className="text-xs text-gray-600 hover:text-gray-900"
              >
                Hire Pro
              </button>
              <button 
                onClick={() => setShowQuotes(true)}
                className="text-xs text-gray-600 hover:text-gray-900"
              >
                Get quotes
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-2">
              <button 
                onClick={() => setShowReviews(true)}
                className="text-xs text-gray-600 hover:text-gray-900"
              >
                Reviews
              </button>
              <button 
                onClick={() => setShowPrivacyModal(true)}
                className="text-xs text-gray-600 hover:text-gray-900"
              >
                Privacy
              </button>
              <button 
                onClick={() => setShowTermsModal(true)}
                className="text-xs text-gray-600 hover:text-gray-900"
              >
                Terms
              </button>
            </div>
          </div>

          {/* Desktop Footer */}
          <div className="hidden sm:flex items-center justify-between text-sm">
            {/* Left Side */}
            <div className="flex items-center">
              <Globe className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-gray-600">Loading location...</span>
            </div>
            
            {/* Center */}
            <div className="flex items-center min-w-0">
              <button 
                onClick={() => setShowHowItWorks(true)}
                className="text-gray-600 hover:text-gray-900 whitespace-nowrap ml-4"
              >
                How does it work?
              </button>
              <button 
                onClick={() => setShowHiring(true)}
                className="text-gray-600 hover:text-gray-900 whitespace-nowrap ml-4"
              >
                Hire your professional
              </button>
              <button 
                onClick={() => setShowQuotes(true)}
                className="text-gray-600 hover:text-gray-900 whitespace-nowrap ml-4"
              >
                Get quotes
              </button>
              <button 
                onClick={() => setShowReviews(true)}
                className="text-gray-600 hover:text-gray-900 whitespace-nowrap ml-4"
              >
                Reviews
              </button>
              <button 
                onClick={() => setShowPrivacyModal(true)}
                className="text-gray-600 hover:text-gray-900 whitespace-nowrap ml-4"
              >
                Privacy
              </button>
              <button 
                onClick={() => setShowTermsModal(true)}
                className="text-gray-600 hover:text-gray-900 whitespace-nowrap ml-4"
              >
                Terms
              </button>
            </div>

            {/* Right Side */}
            <div className="flex whitespace-nowrap text-gray-600">
              Kokobeo - Goldman services INC - Register Number 12345
            </div>
          </div>
        </div>
      </div>

      {/* Footer Popups */}
      <InfoPopup
        isOpen={showHowItWorks}
        onClose={() => setShowHowItWorks(false)}
        title="How does it work?"
        content={
          <div className="space-y-4 text-left">
            <p>Find the perfect professional for your needs:</p>
            <ul className="list-disc pl-4">
              <li>Search for professionals in your area</li>
              <li>Compare multiple quotes</li>
              <li>Read verified reviews from other customers</li>
              <li>Choose your preferred professional and get started</li>
            </ul>
          </div>
        }
      />

      <InfoPopup
        isOpen={showHiring}
        onClose={() => setShowHiring(false)}
        title="Hire your professional"
        content={
          <div className="space-y-4 text-left">
            <p>Direct hiring process:</p>
            <ul className="list-disc pl-4">
              <li>Browse professional profiles</li>
              <li>View their experience and certifications</li>
              <li>Contact them directly</li>
              <li>Discuss your project details</li>
              <li>Agree on terms and get started</li>
            </ul>
          </div>
        }
      />

      <InfoPopup
        isOpen={showQuotes}
        onClose={() => setShowQuotes(false)}
        title="Get quotes"
        content={
          <div className="space-y-4 text-left">
            <p>Receive up to 5 quotes from different professionals:</p>
            <ul className="list-disc pl-4">
              <li>Submit your request</li>
              <li>Get multiple quotes</li>
              <li>Compare prices and services</li>
              <li>Choose the best offer</li>
              <li>Provide anonymous feedback to get better offers</li>
            </ul>
          </div>
        }
      />

      <InfoPopup
        isOpen={showReviews}
        onClose={() => setShowReviews(false)}
        title="Reviews"
        content={
          <div className="space-y-4 text-left">
            <p>Once you've completed work with your chosen professional, let other customers know about your experience:</p>
            <ul className="list-disc pl-4">
              <li>Rate your experience</li>
              <li>Share detailed feedback</li>
              <li>Help others make informed decisions</li>
              <li>Build trust in our community</li>
            </ul>
          </div>
        }
      />

{/* Policy Modals */}
<PolicyModals 
        showPrivacyModal={showPrivacyModal}
        showTermsModal={showTermsModal}
        onClosePrivacy={() => setShowPrivacyModal(false)}
        onCloseTerms={() => setShowTermsModal(false)}
            />
    </>
  );
};

export default SharedFooter;