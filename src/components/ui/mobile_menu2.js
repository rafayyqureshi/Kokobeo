import React from 'react';
import { 
  Globe, 
  Mail, 
  Users, 
  X, 
  Home,
  MapPin,
  World,
  MessageSquare,
  UserPlus,
  Grid,
  Facebook,
  Instagram,
  Twitter,
  Music
} from 'lucide-react';
import { GiWorld } from 'react-icons/gi';

const MobileMenu2 = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-50" 
        onClick={onClose} 
      />

      {/* Mobile Menu */}
      <div 
        className="fixed right-0 top-0 w-[280px] sm:w-[320px] h-full bg-white z-50 overflow-y-auto border-l border-gray-200 shadow-lg"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white p-4 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <nav className="space-y-6">
            {/* Main Navigation */}
            <div className="space-y-1">
              <a 
                href="/client/profile" 
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <Home className="h-5 w-5" />
                <span className="font-medium">My Account</span>
              </a>

              <a 
                href="/professional" 
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <MapPin className="h-5 w-5" />
                <span className="font-medium">Local Clients</span>
              </a>

              <a 
                href="/international-professionals" 
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <GiWorld className="h-5 w-5" />
                <span className="font-medium">International Clients</span>
              </a>

              <a 
                href="/menu/contact" 
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <MessageSquare className="h-5 w-5" />
                <span className="font-medium">Contact Us</span>
              </a>

              <a 
                href="/invite" 
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <UserPlus className="h-5 w-5" />
                <span className="font-medium">Invite Friends</span>
              </a>

              <a 
                href="/categories" 
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <Grid className="h-5 w-5" />
                <span className="font-medium">Categories and Locations</span>
              </a>
            </div>

            {/* Auth Buttons */}
            <div className="flex space-x-3 pt-4 border-t border-gray-100">
              <a 
                href="/register" 
                className="flex-1 px-4 py-2.5 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Register
              </a>
              <a 
                href="/login" 
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 text-center rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Login
              </a>
            </div>

            {/* App Store Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              <a href="https://play.google.com/store/apps/details?id=com.kokobeo">
                <img 
                  src="https://texttofloss.com/wp-content/uploads/2021/01/Google-Play-Store-Button.png" 
                  alt="Get it on Google Play" 
                  className="w-full h-auto rounded-lg hover:opacity-90 transition-opacity"
                />
              </a>
              <a href="https://apps.apple.com/app/kokobeo">
                <img 
                  src="https://e7.pngegg.com/pngimages/422/842/png-clipart-apple-store-logo-app-store-android-google-play-get-started-now-button-text-logo.png" 
                  alt="Download on App Store" 
                  className="w-full h-auto rounded-lg hover:opacity-90 transition-opacity"
                />
              </a>
            </div>

            {/* Social Media Icons */}
            <div className="flex justify-center space-x-4 pt-4 border-t border-gray-100">
              <a 
                href="https://web.facebook.com/profile.php?id=61567111596784" 
                className="w-10 h-10 flex items-center justify-center bg-blue-600 rounded-full hover:opacity-90 transition-opacity"
              >
                <Facebook className="h-5 w-5 text-white" />
              </a>
              <a 
                href="https://www.instagram.com/serviceskokobeo/" 
                className="w-10 h-10 flex items-center justify-center bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-full hover:opacity-90 transition-opacity"
              >
                <Instagram className="h-5 w-5 text-white" />
              </a>
              <a 
                href="https://x.com/Alldresskokobeo" 
                className="w-10 h-10 flex items-center justify-center bg-blue-400 rounded-full hover:opacity-90 transition-opacity"
              >
                <Twitter className="h-5 w-5 text-white" />
              </a>
              <a 
                href="https://www.tiktok.com/@alldresskokobeo" 
                className="w-10 h-10 flex items-center justify-center bg-black rounded-full hover:opacity-90 transition-opacity"
              >
                <Music className="h-5 w-5 text-white" />
              </a>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default MobileMenu2;