import React, { useState } from 'react';
import { X, Send, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Badge } from '../../components/ui/badge';

const ChatPopup = ({ isOpen, onClose, quote }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([
        ...messages, 
        { 
          text: message, 
          sender: 'user', 
          timestamp: new Date() 
        }
      ]);
      setMessage('');

      // Simulate professional's auto-response after 1 second
      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages,
          {
            text: "Thank you for your message. I'll be assisting you with your service request shortly.",
            sender: 'professional',
            timestamp: new Date()
          }
        ]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
            className="bg-white rounded-xl w-full max-w-2xl flex flex-col"
            style={{ height: '80vh' }}
          >
            {/* Chat Header */}
            <div className="p-4 border-b flex justify-between items-center">
              <div className="space-y-1">
                <h3 className="font-semibold text-lg">Professional Chat</h3>
                <div className="flex gap-2">
                  <Badge 
                    variant={quote?.type === 'emergency' ? 'destructive' : 'default'}
                    className={quote?.type === 'emergency' ? 'bg-red-50' : 'bg-blue-50'}
                  >
                    {quote?.type === 'emergency' ? 'Emergency Service' : 'Regular Service'}
                  </Badge>
                  {quote?.serviceTime && (
                    <Badge variant="outline" className="border-blue-200 text-blue-700">
                      {quote.serviceTime === 'hour' 
                        ? 'Within One Hour'
                        : quote.serviceTime === 'evening'
                          ? 'Evening Service'
                          : quote.serviceTime === 'night'
                            ? 'Night Service'
                            : quote.serviceTime}
                    </Badge>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Emergency Notice */}
            {quote?.type === 'emergency' && (
              <div className="px-4 py-2 bg-red-50">
                <Alert className="border-red-200">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-700 text-sm">
                    Emergency service request - Pre-approved exit cost: ${quote.exitCost?.toFixed(2)}
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {/* Chat Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {/* Welcome Message */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  Welcome! A professional will be with you shortly. 
                  {quote?.type === 'emergency' 
                    ? ' This is an emergency service request and will be prioritized.'
                    : ' Please provide any additional details about your service request.'}
                </p>
              </div>

              {/* Message History */}
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    <p className={`text-xs mt-1 ${
                      msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {msg.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows="2"
                  style={{ minHeight: '50px', maxHeight: '100px' }}
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4"
                  disabled={!message.trim()}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatPopup;