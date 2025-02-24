import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, MessageCircle } from 'lucide-react';

const ServiceOptionsModal = ({ isOpen, onClose, service }) => {
  const [activeTab, setActiveTab] = useState('emergency');

  if (!isOpen) return null;

  const tabs = [
    { id: 'emergency', label: 'Emergency', className: 'text-red-600 bg-red-50' },
    { id: 'hiring', label: 'Available for Hiring', className: 'text-green-600 bg-green-50' },
    { id: 'info', label: 'Customer Choice: Information Only', className: 'text-purple-600 bg-purple-50' }
  ];

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
        className="bg-white rounded-xl w-full max-w-2xl"
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">{service}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-full text-sm ${tab.className} ${
                activeTab === tab.id ? 'ring-2 ring-offset-2' : ''
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Emergency Service Notice */}
        {activeTab === 'emergency' && (
          <div className="mx-4 p-4 bg-red-50 rounded-lg border border-red-100 mb-4">
            <p className="text-red-600">
              Emergency Service: Client agreed to pay $80 outgoing fee
            </p>
          </div>
        )}

        {/* Request Type Section */}
        <div className="p-4">
          <h3 className="text-lg font-medium mb-4">Request Type</h3>
          <div className="flex gap-4 mb-6">
            <button className="flex-1 py-2 px-4 border rounded-lg text-gray-600">
              Request Quote
            </button>
            <button className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg">
              Direct Hiring
            </button>
            <div className="flex items-center bg-orange-100 text-orange-600 px-3 rounded-lg">
              <span className="font-medium">5.0</span>
              <span className="text-sm ml-1">/5</span>
            </div>
          </div>

          {/* Direct Hiring Features */}
          <div className="space-y-4 mb-6">
            <h4 className="font-medium">Direct hiring includes:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-gray-600">
                <MessageCircle className="w-5 h-5" />
                <span>Immediate chat with Customer</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span>Real-time service coordination</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="3" y="4" width="18" height="16" rx="2" strokeWidth="2"/>
                  <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/>
                  <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/>
                  <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/>
                </svg>
                <span>Direct scheduling</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="9" strokeWidth="2"/>
                  <path d="M12 8v4l3 3" strokeWidth="2"/>
                </svg>
                <span>Instant professional assistance</span>
              </div>
            </div>
          </div>

          {/* Service Location */}
          <div className="space-y-4">
            <h4 className="font-medium">Service Location</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm text-gray-500">Floor Level</label>
                  <select className="mt-1 block w-full rounded-md border-gray-300 text-base">
                    <option>Ground Floor</option>
                    <option>First Floor</option>
                    <option>Second Floor</option>
                  </select>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300" id="elevator" />
                    <label htmlFor="elevator" className="text-sm text-gray-600">No Elevator</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300" id="stairs" />
                    <label htmlFor="stairs" className="text-sm text-gray-600">No Stairs</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ServiceOptionsModal;