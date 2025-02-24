import React, { useState } from 'react';
import { Star, Shield, Check, X, MessageCircle, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Review Modal Component
const ReviewModal = ({ isOpen, onClose, reviews }) => {
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
        className="bg-white rounded-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h3 className="text-xl font-semibold">Reviews</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-4 last:border-b-0">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">{review.author}</div>
                    <div className="text-sm text-gray-500">{review.date}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 font-medium">{review.rating}</span>
                </div>
              </div>
              <div className="text-gray-700">{review.comment}</div>
              <div className="mt-2 text-sm text-gray-500">Project: {review.project}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const ServiceCard = ({ professional, selectedType, onMessage, onContact }) => {
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      author: "Alex M.",
      rating: 5,
      date: "2024-01-15",
      comment: "Excellent service! Very professional and thorough.",
      project: "Pipe Repair"
    },
    {
      id: 2,
      author: "Sarah K.",
      rating: 4,
      date: "2024-01-10",
      comment: "Great work, arrived on time and fixed the issue quickly.",
      project: "Boiler Installation"
    },
    {
      id: 3,
      author: "Mike R.",
      rating: 5,
      date: "2024-01-05",
      comment: "Very knowledgeable and professional. Would hire again.",
      project: "Emergency Plumbing"
    }
  ];

  return (
    <div className="border rounded-xl p-4 sm:p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4 mb-4">
        <img 
          src={professional.avatar || "/default-avatar.png"}
          alt={professional.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{professional.name}</h3>
              <p className="text-blue-600">{professional.service}</p>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="ml-1 font-medium">{professional.rating}</span>
                <span className="text-gray-500 text-sm ml-1">
                  ({professional.reviews})
                </span>
              </div>
              <button
                onClick={() => setShowReviewModal(true)}
                className="mt-1 px-3 py-1 bg-blue-100 text-blue-600 rounded-md text-sm hover:bg-blue-200"
              >
                Work Done Options
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Badges */}
      <div className="flex gap-3 mb-4">
        {professional.backgroundChecked && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Shield className="w-3 h-3 mr-1" />
            Background Checked
          </span>
        )}
        {professional.insuranceVerified && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Check className="w-3 h-3 mr-1" />
            Insurance Verified
          </span>
        )}
      </div>

      {/* Professional Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center text-gray-600">
          <span className="text-gray-500">Location:</span>
          <span className="ml-2">{professional.location}</span>
        </div>
        <p className="text-gray-600">{professional.description}</p>

        {/* Specializations */}
        {professional.specializations && (
          <div className="flex flex-wrap gap-2">
            {professional.specializations.map((spec, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
              >
                {spec}
              </span>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Price:</span>
            <span className="ml-2 font-medium">{professional.price}</span>
          </div>
          <div>
            <span className="text-gray-500">Available:</span>
            <span className="ml-2 font-medium">{professional.availability}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button 
          onClick={() => onContact(professional)}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Contact Now
        </button>
        <button 
          onClick={() => onMessage(professional)}
          className="flex items-center justify-center p-2 border rounded-lg hover:bg-gray-50"
        >
          <MessageCircle className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Review Modal */}
      <AnimatePresence>
        <ReviewModal
          isOpen={showReviewModal}
          onClose={() => setShowReviewModal(false)}
          reviews={reviews}
        />
      </AnimatePresence>
    </div>
  );
};

export default ServiceCard;