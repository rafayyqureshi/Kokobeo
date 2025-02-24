// src/components/ui/dialog.js
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Dialog = ({ children, open, onOpenChange }) => {
  return (
    <AnimatePresence>
      {open && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center" 
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onOpenChange?.(false);
            }
          }}
        >
          <motion.div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div 
            className="relative"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const DialogContent = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-xl p-6 min-w-[300px] max-w-md w-full mx-4 ${className}`}>
      {children}
    </div>
  );
};

const DialogHeader = ({ children, className = '' }) => {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
};

const DialogTitle = ({ children, className = '' }) => {
  return (
    <h2 className={`text-lg font-semibold ${className}`}>
      {children}
    </h2>
  );
};

const DialogTrigger = ({ children, onClick }) => {
  return React.cloneElement(children, { onClick });
};

export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger };