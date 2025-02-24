import React, { useState, useEffect, useRef } from 'react';
import { Send, User, MessageSquare, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatModal = ({ isOpen, onClose, professional, selectedType }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Send automatic first message based on selectedType
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const autoMessage = selectedType === 'hire' 
        ? "I request information for hiring"
        : "I am interested in a quote from you";
      
      handleSendMessage(autoMessage, true);
    }
  }, [isOpen, selectedType]);

  const handleSendMessage = (text, isAuto = false) => {
    if (!text.trim()) return;
    
    const newMsg = {
      id: Date.now(),
      text: text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
      isAuto: isAuto
    };

    setMessages(prev => [...prev, newMsg]);
    setNewMessage('');
  };

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
        className="bg-white rounded-xl w-full max-w-2xl flex flex-col max-h-[80vh]"
      >
        {/* Chat Header */}
        <div className="p-4 border-b flex items-center justify-between bg-white sticky top-0 rounded-t-xl">
          <div className="flex items-center gap-3">
            {professional.photo ? (
              <img 
                src={professional.photo}
                alt={professional.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
            )}
            <div>
              <h3 className="font-semibold">{professional.name}</h3>
              <p className="text-sm text-gray-500">{professional.service}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className="flex justify-end"
            >
              <div className="max-w-xs md:max-w-md bg-blue-600 text-white rounded-l-lg rounded-br-lg p-3 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <User className="h-4 w-4" />
                  <span className="text-xs opacity-75">{message.timestamp}</span>
                </div>
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 border-t bg-white sticky bottom-0 rounded-b-xl">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(newMessage)}
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={() => handleSendMessage(newMessage)}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ChatModal;