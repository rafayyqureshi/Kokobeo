import React, { useState } from 'react';
import { Search } from 'lucide-react';

const InternationalHomepage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      {/* Header */}
      <header className="bg-white border-b">
        <nav className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <a href="/" className="flex items-center no-underline">
              <img 
                src="https://assests.netlify.app/assets/images/logo.png" 
                alt="Kokobeo"
                className="h-8 w-auto"
              />
              <span className="ml-2 text-blue-600 text-xl font-bold">Kokobeo</span>
            </a>

            {/* Right side controls */}
            <div className="flex items-center space-x-4">
              {/* Styled Text */}
              <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                International Professionals
              </span>

              {/* Professional Link */}
              <a 
                href="/professional" 
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 no-underline"
              >
                Are you a Professional?
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-3xl mx-auto text-center space-y-8">
          {/* Search Title */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">
              Find International Professionals
            </h1>
            <p className="text-xl text-gray-600">
              Connect with verified professionals worldwide
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search for international services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-12 pr-4 rounded-full border border-gray-200 shadow-sm"
            />
            <Search 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={24}
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {['Legal Services', 'Business Consulting', 'IT Services', 'Digital Marketing', 'Translation'].map((category) => (
              <button
                key={category}
                className="px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-700 hover:bg-gray-50"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">About</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">How it Works</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Our Mission</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Global Network</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">International Services</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Legal Consultation</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Business Advisory</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Global Hiring</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Help Center</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Safety Guidelines</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Trust & Security</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Terms of Service</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Kokobeo - Goldman services INC. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InternationalHomepage;