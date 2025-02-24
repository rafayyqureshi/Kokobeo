import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, Search, MessageCircle, Bookmark, Bell, User, Settings, LogOut,
  ChevronRight, Home, Users, Globe, Phone, FileText, Shield, Wallet,
  History, Star, Lock, X, UserCog, Clock, ChevronDown, User2, Settings2,
  AlertCircle, Briefcase, FileCheck, ChartAreaIcon, Facebook, Twitter, 
  Instagram
} from 'lucide-react';
import { MdReviews } from 'react-icons/md';

const SharedHeader4 = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' }
  ];

  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const menuItems = [
    { icon: Home, text: "Dashboard", href: "/professionals" },
    { icon: User, text: "Local Customers", href: "/professional" },
    { icon: Bookmark, text: "International Clients", href: "/international-professionals" },
    { icon: MessageCircle, text: "Message or Video Call", href: "/MessageAndVideoCall" },
    { icon: User2, text: "My Profile", href: "/myprofile" },
    { icon: Settings2, text: "My Settings", href: "/Settings" },
    { icon: ChartAreaIcon, text: "Progress", href: "/Progress" },
    { icon: FileCheck, text: "My Orders", href: "/myorders" },
    { icon: MdReviews, text: "Reviews", href: "/professional/reviews" },
    { icon: Bell, text: "My Offers", href: "/myoffers" },
    { icon: FileText, text: "My Proposals", href: "/myproposals" },
    { icon: Shield, text: "Support tickets", href: "/support" },
    { icon: Wallet, text: "Wallet", href: "/wallet" },
    { icon: FileText, text: "Withdraw History", href: "/withdrawalhistroy" },
    { icon: FileCheck, text: "Subscriptions", href: "/credits" },
    { icon: Lock, text: "Change Password", href: "/changepassword" },
    { icon: AlertCircle, text: "Account Delete", href: "/DeleteAccount" },
    { icon: LogOut, text: "Log Out", href: "/login" }
  ];

  // Store Links Component
  const StoreLinks = () => (
    <div className="mt-6 space-y-4 px-4">
      <div className="flex flex-col items-center justify-center gap-4 max-w-xs mx-auto">
        <a 
          href="#" 
          className="w-48 h-14 flex items-center justify-center bg-black rounded-lg hover:opacity-90 transition-opacity px-4"
          style={{ 
            backgroundImage: 'linear-gradient(to bottom, #000000, #1a1a1a)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <div className="flex items-center space-x-3">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
              <path d="M3.609 1.814L13.792 12 3.61 22.186c-.28.28-.698.342-1.04.155-.342-.187-.554-.544-.554-.929V2.588c0-.385.212-.742.553-.929.342-.187.76-.125 1.04.155zm10.831 8.424l3.099-1.789c.4-.23.4-.8 0-1.03l-3.1-1.79L12.48 7.41l1.96 2.828zm-1.96-4.243l3.098-1.788c.4-.23.4-.8 0-1.03l-3.099-1.79-1.961 2.782 1.962 2.826zM4.001 2.588v18.824L12.48 12 4 2.588z"/>
            </svg>
            <div className="flex flex-col">
              <span className="text-white text-xs">GET IT ON</span>
              <span className="text-white font-medium text-lg leading-tight">Google Play</span>
            </div>
          </div>
        </a>

        <a 
          href="#" 
          className="w-48 h-14 flex items-center justify-center bg-black rounded-lg hover:opacity-90 transition-opacity px-4"
          style={{ 
            backgroundImage: 'linear-gradient(to bottom, #000000, #1a1a1a)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <div className="flex items-center space-x-3">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11"/>
            </svg>
            <div className="flex flex-col">
              <span className="text-white text-xs">Download on the</span>
              <span className="text-white font-medium text-lg leading-tight">App Store</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  );

  // Social Icons Component
  const SocialIcons = () => (
    <div className="flex justify-center space-x-6 mt-6 px-4 pb-6">
      <a 
        href="https://web.facebook.com/profile.php?id=61567111596784" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-gray-600 hover:text-blue-600 transition-colors"
      >
        <Facebook className="h-6 w-6" />
      </a>
      
      <a 
        href="https://x.com/Alldresskokobeo" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-gray-600 hover:text-blue-400 transition-colors"
      >
        <Twitter className="h-6 w-6" />
      </a>
      
      <a 
        href="https://www.instagram.com/serviceskokobeo/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-gray-600 hover:text-pink-600 transition-colors"
      >
        <Instagram className="h-6 w-6" />
      </a>
      
      <a 
        href="https://www.tiktok.com/@alldresskokobeo" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-gray-600 hover:text-black transition-colors"
      >
        <svg 
          viewBox="0 0 24 24" 
          className="h-6 w-6"
          fill="currentColor"
        >
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1Z"/>
        </svg>
      </a>
    </div>
  );

  return ( 
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Left section */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <Link to="https://kokobeo.com/professionals" className="flex items-center">
              <img 
                src="https://assests.netlify.app/assets/images/logo.png"
                alt="Logo"
                className="h-8 w-8"
              />
              <span className="ml-2 text-blue-600 text-xl font-bold">Kokobeo</span>
            </Link>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-4">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg border transition-colors"
              >
                {selectedLanguage.name}
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>

              <AnimatePresence>
                {isLanguageDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-1 z-50 border"
                  >
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => {
                          setSelectedLanguage(language);
                          setIsLanguageDropdownOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        {language.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Notification Icon */}
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg relative transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Modal */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-64 bg-white z-50 shadow-xl overflow-y-auto"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <img 
                      src="https://assests.netlify.app/assets/images/logo.png"
                      alt="Logo"
                      className="h-8 w-8"
                    />
                    <span className="text-blue-600 text-xl font-bold">Kokobeo</span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="h-6 w-6 text-gray-600" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {menuItems.map((item, index) => (
                    <Link
                      key={index}
                      to={item.href}
                      className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="text-sm font-medium">{item.text}</span>
                    </Link>
                  ))}
                </nav>

                {/* Store Links */}
                <StoreLinks />

                {/* Social Icons */}
                <SocialIcons />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default SharedHeader4;