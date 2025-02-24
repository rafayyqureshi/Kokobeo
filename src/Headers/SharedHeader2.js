import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell, ChevronDown, Globe, Languages, MessageSquare,
  User, Bookmark, LogOut, Settings, Shield, Star,
  CreditCard, Heart, Mail, HelpCircle, FileText, Info
} from 'lucide-react';
import { Button } from '../components/ui/Button';

// Mock user data - in a real app, this would come from props or context
const mockUserData = {
  hasSubscription: false,
  credits: 250,
  name: "John Smith",
  email: "john@example.com",
  profileImage: null,
  company: "Smith Services",
  location: "Toronto, ON",
  isVerified: true,
  emergencyAvailable: true
};

const languages = [
  { code: 'en', name: 'English', short: 'ENG' },
  { code: 'es', name: 'Español', short: 'ESP' },
  { code: 'fr', name: 'Français', short: 'FRA' },
  { code: 'de', name: 'Deutsch', short: 'DEU' },
  { code: 'it', name: 'Italiano', short: 'ITA' },
  { code: 'nl', name: 'Nederlands', short: 'NLD' },
  { code: 'cs', name: 'Čeština', short: 'CES' }
];

const menuItems = [
  { icon: Globe, label: 'About Kokobeo', href: '/about' },
  { icon: HelpCircle, label: 'How it Works', href: '/how-it-works' },
  { icon: MessageSquare, label: 'Messages', href: '/messages', badge: '3' },
  { icon: Bell, label: 'Notifications', href: '/notifications', badge: '2' },
  { icon: Mail, label: 'Contact Us', href: '/contact' },
  { icon: FileText, label: 'Help Center', href: '/help' },
  { icon: User, label: 'My Profile', href: '/profile' },
  { icon: Shield, label: 'Verify Account', href: '/verify' },
  { icon: Star, label: 'Subscription Plans', href: '/plans' },
  { icon: CreditCard, label: 'My Credits', href: '/credits' }
];

const SharedHeader2 = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-2">
              <img 
                src="https://assests.netlify.app/assets/images/logo.png"
                alt="Kokobeo"
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-blue-600">Kokobeo</span>
            </a>
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex items-center gap-1 px-3 py-2 bg-white border rounded-lg hover:bg-gray-50"
              >
                <Languages className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">
                  {selectedLanguage}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-500 ml-2" />
              </button>

              <AnimatePresence>
                {showLanguageDropdown && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-40"
                      onClick={() => setShowLanguageDropdown(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-1 w-48 bg-white border rounded-lg shadow-lg py-1 z-50"
                    >
                      {languages.map((language) => (
                        <button
                          key={language.code}
                          onClick={() => {
                            setSelectedLanguage(language.name);
                            setShowLanguageDropdown(false);
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm"
                        >
                          {language.name}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-xl"
              >
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>

              <AnimatePresence>
                {showUserMenu && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-40"
                      onClick={() => setShowUserMenu(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg py-2 z-50"
                    >
                      <div className="px-4 py-2 border-b">
                        <p className="font-medium text-gray-900">{mockUserData.name}</p>
                        <p className="text-sm text-gray-500">{mockUserData.email}</p>
                      </div>

                      <div className="py-2">
                        {menuItems.map((item, index) => (
                          <a
                            key={index}
                            href={item.href}
                            className="flex items-center justify-between px-4 py-2 hover:bg-gray-50"
                          >
                            <div className="flex items-center gap-3">
                              <item.icon className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-700">{item.label}</span>
                            </div>
                            {item.badge && (
                              <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs">
                                {item.badge}
                              </span>
                            )}
                          </a>
                        ))}
                      </div>

                      <div className="border-t pt-2">
                        <button 
                          onClick={() => {/* Handle logout */}}
                          className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 w-full"
                        >
                          <LogOut className="h-4 w-4" />
                          <span className="text-sm">Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SharedHeader2;