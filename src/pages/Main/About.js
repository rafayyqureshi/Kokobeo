import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users, Globe, Shield, Award, ChevronDown, ChevronRight,
  Building, Tool, Heart, Star, Check, ArrowRight, 
  MessageCircle, Search, MapPin, Clock, Zap, Languages
} from 'lucide-react';

const AboutPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const languages = [
    { code: 'en', name: 'English', short: 'ENG' },
    { code: 'es', name: 'Español', short: 'ESP' },
    { code: 'fr', name: 'Français', short: 'FRA' },
    { code: 'de', name: 'Deutsch', short: 'DEU' },
    { code: 'it', name: 'Italiano', short: 'ITA' },
    { code: 'nl', name: 'Nederlands', short: 'NLD' },
    { code: 'cs', name: 'Čeština', short: 'CES' }
  ];

  const stats = [
    { number: '50K+', label: 'Active Professionals' },
    { number: '100K+', label: 'Happy Customers' },
    { number: '500K+', label: 'Projects Completed' },
    { number: '30+', label: 'Service Categories' }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Verified Professionals',
      description: 'Every professional undergoes thorough verification of credentials and background checks.'
    },
    {
      icon: Clock,
      title: 'Quick Response Time',
      description: 'Get responses from professionals within minutes, not hours.'
    },
    {
      icon: Star,
      title: 'Quality Assurance',
      description: 'All services backed by our satisfaction guarantee.'
    },
    {
      icon: Heart,
      title: 'Customer-First Approach',
      description: 'Dedicated support team available 24/7 to assist you.'
    }
  ];

  const values = [
    {
      title: 'Trust & Transparency',
      description: 'We believe in complete transparency in pricing and service quality.',
      icon: Shield
    },
    {
      title: 'Excellence in Service',
      description: 'Committed to delivering the highest quality services to our customers.',
      icon: Award
    },
    {
      title: 'Community Focus',
      description: 'Building strong relationships between professionals and customers.',
      icon: Users
    },
    {
      title: 'Global Reach',
      description: 'Connecting professionals and customers across borders.',
      icon: Globe
    }
  ];

  // Parallax effect for hero section
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <a 
                href="/"
                className="flex items-center gap-2 transition-transform hover:scale-105"
              >
                <img 
                  src="https://assests.netlify.app/assets/images/logo.png" 
                  alt="Kokobeo" 
                  className="h-8 w-auto"
                />
                <span className="text-xl font-bold text-blue-600">Kokobeo</span>
              </a>
            </div>

            {/* Language Selector & Navigation */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <button
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  <Languages className="h-4 w-4" />
                  <span>{selectedLanguage}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {showLanguageDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setSelectedLanguage(lang.name);
                          setShowLanguageDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <a 
                href="/professional"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                For Professionals
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20 sm:py-32">
        <motion.div
          style={{ y: scrollY * 0.5 }}
          className="absolute inset-0 opacity-50"
        >
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-200 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-200 rounded-full blur-3xl" />
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Connecting Excellence <br />with Every Service
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto"
          >
            Kokobeo is revolutionizing how professionals and customers connect, 
            making quality services accessible to everyone, everywhere.
          </motion.p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base text-gray-600">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Kokobeo?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best platform for connecting professionals 
              with customers, ensuring quality and trust in every interaction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-white border hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do at Kokobeo
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex-shrink-0 flex items-center justify-center">
                  <value.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and professionals on Kokobeo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Find a Professional
            </a>
            <a 
              href="/professional"
              className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors"
            >
              Become a Professional
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <img 
                src="https://assests.netlify.app/assets/images/logo.png" 
                alt="Kokobeo" 
                className="h-8 w-auto mb-4"
              />
              <p className="text-sm text-gray-400">
                Connecting quality professionals with customers worldwide.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="/careers" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="/help" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="/safety" className="hover:text-white transition-colors">Safety</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="/cookies" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} Kokobeo - Goldman Services INC. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Facebook
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Twitter
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  LinkedIn
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;