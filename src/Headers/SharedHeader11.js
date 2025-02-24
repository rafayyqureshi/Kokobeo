import React, { useState } from 'react';
import { DollarSign, ChevronDown, User, LogOut, Globe, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/badge';
import MobileMenu2 from '../components/ui/mobile_menu2';

const SharedHeader11 = ({ mockUserData = { credits: 250 }, menuItems = [] }) => {
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const languages = [
    { code: 'en', name: 'English', short: 'ENG' },
    { code: 'es', name: 'Español', short: 'ESP' },
    { code: 'fr', name: 'Français', short: 'FRA' },
    { code: 'de', name: 'Deutsch', short: 'DEU' },
    { code: 'it', name: 'Italiano', short: 'ITA' },
    { code: 'pt', name: 'Português', short: 'POR' },
    { code: 'nl', name: 'Nederlands', short: 'NLD' },
    { code: 'cs', name: 'Čeština', short: 'CES' }
  ];

  return (
    <>
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <a href="/" className="flex items-center gap-2 mr-8">
                <img 
                  src="https://assests.netlify.app/assets/images/logo.png" 
                  alt="Kokobeo" 
                  className="h-8 w-auto"
                />
                <span className="text-xl font-bold text-blue-600">Kokobeo</span>
              </a>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center bg-blue-50 rounded-xl px-4 py-1.5">
                <DollarSign className="h-4 w-4 mr-1 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">
                  {mockUserData.credits} Credits
                </span>
              </div>

              <div className="relative">
                {/* <button
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  className="flex items-center gap-1 w-[70px] md:w-[120px] px-2 md:px-3 py-1 md:py-2 bg-white border rounded-lg hover:bg-gray-50"
                >
                  <span className="text-gray-700 text-xs md:text-sm truncate">
                    {window.innerWidth < 768 
                      ? languages.find(l => l.name === selectedLanguage)?.short 
                      : selectedLanguage}
                  </span>
                  <ChevronDown className="h-3 w-3 md:h-4 md:w-4 text-gray-500 ml-auto flex-shrink-0" />
                </button> */}

                {/* <AnimatePresence>
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
                        className="absolute right-0 mt-1 w-[70px] md:w-[120px] bg-white border rounded-lg shadow-lg py-1 z-50"
                      >
                        {languages.map((language) => (
                          <button
                            key={language.code}
                            onClick={() => {
                              setSelectedLanguage(language.name);
                              setShowLanguageDropdown(false);
                            }}
                            className="w-full px-2 md:px-3 py-1 md:py-2 text-left hover:bg-gray-50 text-xs md:text-sm text-gray-700 truncate"
                          >
                            {window.innerWidth < 768 ? language.short : language.name}
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence> */}
              </div>

              {/* <Button variant="outline" asChild style={{ fontSize: "12px" }}>
                <a href="/">Client</a>
              </Button> */}

              <button
                onClick={() => setShowMobileMenu(true)}
                className="p-2 hover:bg-gray-100 rounded-lg flex items-center gap-2"
              >
                <span className="w-5 h-5">☰</span>
                <span className="hidden md:inline text-sm">Menu</span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-xl"
                >
                  {/* <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div> */}
                  {/* <ChevronDown className="h-4 w-4 text-gray-500" /> */}
                </button>

                {/*  */}
              </div>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {showMobileMenu
         && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowMobileMenu(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-[280px] sm:w-[320px] bg-white z-50 overflow-y-auto"
            >
              <MobileMenu2 isOpen={showMobileMenu} onClose={() => setShowMobileMenu(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SharedHeader11;