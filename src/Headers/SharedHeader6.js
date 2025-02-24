import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, Search, MessageCircle, Bookmark, Bell, User,
  Settings, LogOut, ChevronRight, Home, Users, Globe,
  Phone, FileText, Shield, Wallet, History, Star,
  Lock, X, UserCog, Clock, ChevronDown, User2,
  Settings2, ChartAreaIcon, ArrowLeft
} from 'lucide-react';
import { Button } from '../components/ui/Button';

const SharedHeader6 = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
    { icon: Users, text: "Local Customers", href: "/professional" },
    { icon: Globe, text: "International Clients", href: "/international-professionals" },
    { icon: MessageCircle, text: "Message or Video Call", href: "/MessageAndVideoCall" },
    { icon: User2, text: "My profile", href: "/myprofile" },
    { icon: Settings2, text: " My settings", href: "/Settings" },
    { icon: ChartAreaIcon, text: "Progress", href: "/Progress" },
    { icon: FileText, text: "My Orders", href: "/myorders" },
    { icon: Bell, text: "My Offers", href: "/myoffers" },
    { icon: FileText, text: "My Proposals", href: "/myproposals" },
    { icon: Shield, text: "Support tickets", href: "/support" },
    { icon: Wallet, text: "Wallet", href: "/wallet" },
    { icon: History, text: "Withdraw History", href: "/withdrawalhistroy" },
    { icon: Star, text: "Subscriptions", href: "/credits" },
    { icon: Settings, text: "Profile Settings", href: "/profilesettings" },
    { icon: UserCog, text: "Account Setup", href: "/international_professional_registration" },
    { icon: Settings, text: "Change Password", href: "/changepassword" },
    { icon: Clock, text: "Account Delete", href: "/DeleteAccount" },
    { icon: LogOut, text: "Log Out", href: "/login" }
  ];

  const handleNavigateBack = () => {
    navigate(-1);
  };

  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Left section */}
          <div className="flex items-center gap-4">
            {/* Back Button */}
            {location.pathname !== '/' && (
              <Button
                variant="ghost"
                onClick={handleNavigateBack}
                className="hidden sm:flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 p-2"
                aria-label="Go back"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="hidden sm:inline">Back</span>
              </Button>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <button onClick={handleNavigateBack} className="flex items-center">
              <img 
                src="https://assests.netlify.app/assets/images/logo.png"
                alt="Logo"
                className="h-8 w-8"
              />
              <span className="ml-2 text-blue-600 text-xl font-bold">Kokobeo</span>
            </button>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-4">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg border"
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
                    className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-1 z-50"
                  >
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => {
                          setSelectedLanguage(language);
                          setIsLanguageDropdownOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        {language.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Notification Icon */}
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg relative">
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
              transition={{ type: 'spring', bounce: 0 }}
              className="fixed top-0 left-0 bottom-0 w-64 bg-white z-50 shadow-xl overflow-y-auto"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-6">
                  <button onClick={handleNavigateBack} className="flex items-center gap-2">
                    <img 
                      src="https://assests.netlify.app/assets/images/logo.png"
                      alt="Logo"
                      className="h-8 w-8"
                    />
                    <span className="text-blue-600 text-xl font-bold">Kokobeo</span>
                  </button>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="h-6 w-6 text-gray-600" />
                  </button>
                </div>

                <div className="space-y-1">
                  {menuItems.map((item, index) => (
                    <Link
                      key={index}
                      to={item.href}
                      className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="h-5 w-5 text-gray-400" />
                      <span className="text-sm">{item.text}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default SharedHeader6;