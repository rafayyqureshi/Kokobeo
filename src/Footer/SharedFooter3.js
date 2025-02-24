import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe } from 'lucide-react';
import PolicyModals from '../../src/pages/Main/Policy';

const InfoPopup = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white rounded-xl max-w-lg w-full p-6 relative">
        <button onClick={onClose} className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full">
          <X className="h-5 w-5" />
        </button>
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <div className="prose max-w-none">{content}</div>
      </motion.div>
    </motion.div>
  );
};

const SharedFooter3 = () => {
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showHiring, setShowHiring] = useState(false);
  const [showQuotes, setShowQuotes] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const navigationLinks = [
    { title: 'How does it work?', onClick: () => setShowHowItWorks(true) },
    { title: 'Hire your professional', onClick: () => setShowHiring(true) },
    { title: 'Get quotes', onClick: () => setShowQuotes(true) },
    { title: 'Reviews', onClick: () => setShowReviews(true) },
    { title: 'Privacy', onClick: () => setShowPrivacyModal(true) },
    { title: 'Terms', onClick: () => setShowTermsModal(true) }
  ];

  return (
    <div className="w-full bg-white">
      {/* Mobile/Tablet Footer (< 1024px) */}
      <div className="lg:hidden w-full px-4 py-3">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <Globe className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-sm text-gray-600">International Services</span>
          </div>
          <div className="text-sm text-gray-600">Kokobeo Inc.</div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4">
          {navigationLinks.map((link, index) => (
            <button key={index} onClick={link.onClick} className="text-sm text-gray-600 hover:text-gray-900 text-left">
              {link.title}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Footer (≥ 1024px) */}
      <div className="hidden lg:block w-full py-2">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-4 lg:px-6 xl:px-8">
          <span className="flex items-center text-sm text-gray-600">
            <Globe className="h-4 w-4 text-gray-500 mr-2" />
            International Services
          </span>

          <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
            {navigationLinks.map((link, index) => (
              <button key={index} onClick={link.onClick} className="text-sm text-gray-600 hover:text-gray-900">
                {link.title}
              </button>
            ))}
          </div>

          <span className="text-sm text-gray-600">
            Kokobeo - Goldman services INC - 12345
          </span>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showHowItWorks && (
          <InfoPopup
            isOpen={showHowItWorks}
            onClose={() => setShowHowItWorks(false)}
            title="How does it work?"
            content={
              <div className="space-y-4">
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
        )}

        {showHiring && (
          <InfoPopup
            isOpen={showHiring}
            onClose={() => setShowHiring(false)}
            title="Hire your professional"
            content={
              <div className="space-y-4">
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
        )}

        {showQuotes && (
          <InfoPopup
            isOpen={showQuotes}
            onClose={() => setShowQuotes(false)}
            title="Get quotes"
            content={
              <div className="space-y-4">
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
        )}

        {showReviews && (
          <InfoPopup
            isOpen={showReviews}
            onClose={() => setShowReviews(false)}
            title="Reviews"
            content={
              <div className="space-y-4">
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
        )}
      </AnimatePresence>

      <PolicyModals 
        showPrivacyModal={showPrivacyModal}
        showTermsModal={showTermsModal}
        onClosePrivacy={() => setShowPrivacyModal(false)}
        onCloseTerms={() => setShowTermsModal(false)}
      />
    </div>
  );
};

export default SharedFooter3;