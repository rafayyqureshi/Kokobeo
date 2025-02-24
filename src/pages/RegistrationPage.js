import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import Button from '../components/ui/Button';
import { UserRound, Users, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const RegistrationPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 flex flex-col p-4">
      {/* Navigation Header */}
      <div className="max-w-7xl mx-auto w-full py-6 px-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center"
        >
          <a href="/" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </a>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center p-4">
          {/* Left Side - Information */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden md:block space-y-6"
          >
            <div className="text-2xl font-extrabold text-blue-600 flex items-center gap-3 text-left">
              <img
                src="https://assests.netlify.app/assets/images/logo.png"
                alt="Kokobeo Logo"
                className="w-12 h-12 object-contain"
              />
              <span>Kokobeo</span>
            </div>
            <div className="space-y-4 text-left">
              <h1 className="text-4xl font-bold text-gray-900">
              Join Our Professional Network
              </h1>
              <p className="text-lg text-gray-600">
              Connect with clients and grow your business with Kokobeo's trusted platform.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700">Get matched with quality clients</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-700">Set your own rates and schedule</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <p className="text-gray-700">Secure payments and protection</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Registration Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur">
              <CardHeader className="pb-6">
                <div className="md:hidden mb-6 flex justify-center">
                  <div className="text-2xl font-extrabold text-blue-600 flex items-center gap-3">
                    <img
                      src="https://assests.netlify.app/assets/images/logo.png"
                      alt="Kokobeo Logo"
                      className="w-10 h-10 object-contain"
                    />
                    <span>Kokobeo</span>
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-center text-gray-900">
                  Create an Account
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* User Type Selection */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-700">I want to...</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="relative group cursor-pointer">
                      <input
                        type="radio"
                        name="userType"
                        value="client"
                        className="peer sr-only"
                      />
                      <div className="h-32 flex flex-col items-center justify-center border-2 rounded-xl 
                        hover:border-blue-200 hover:bg-blue-50 peer-checked:border-blue-500 
                        peer-checked:bg-blue-50 transition-all">
                        <UserRound className="w-6 h-6 text-blue-600 mb-3" />
                        <div className="px-4 text-center">
                          <span className="font-medium text-gray-900">Hire</span>
                          <br />
                          <span className="font-medium text-gray-900">Professional</span>
                        </div>
                      </div>
                    </label>
                    <label className="relative group cursor-pointer">
                      <input
                        type="radio"
                        name="userType"
                        value="professional"
                        className="peer sr-only"
                      />
                      <div className="h-32 flex flex-col items-center justify-center border-2 rounded-xl 
                        hover:border-blue-200 hover:bg-blue-50 peer-checked:border-blue-500 
                        peer-checked:bg-blue-50 transition-all">
                        <Users className="w-6 h-6 text-blue-600 mb-3" />
                        <div className="px-4 text-center">
                          <span className="font-medium text-gray-900">Work as</span>
                          <br />
                          <span className="font-medium text-gray-900">Professional</span>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Social Sign-up */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-700">Sign up with</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-2 p-2.5 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <img
                        src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
                        alt="Google"
                        className="w-5 h-5"
                      />
                      <span className="text-sm font-medium">Google</span>
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-2 p-2.5 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <img
                        src="https://img.icons8.com/?size=100&id=30840&format=png&color=000000"
                        alt="Apple"
                        className="w-5 h-5"
                      />
                      <span className="text-sm font-medium">Apple</span>
                    </motion.button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-2 p-2.5 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <img
                        src="https://img.icons8.com/?size=100&id=uLWV5A9vXIPu&format=png&color=000000"
                        alt="Facebook"
                        className="w-5 h-5"
                      />
                      <span className="text-sm font-medium">Facebook</span>
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-2 p-2.5 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <img
                        src="https://img.icons8.com/?size=100&id=32323&format=png&color=000000"
                        alt="Instagram"
                        className="w-5 h-5"
                      />
                      <span className="text-sm font-medium">Instagram</span>
                    </motion.button>
                  </div>
                </div>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 text-gray-500 bg-white">or</span>
                  </div>
                </div>

                {/* Email Button */}
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Continue with Email
                </motion.button>

                {/* Login Link */}
                <p className="text-sm text-center text-gray-600">
                  Already have an account?{' '}
                  <a href="/login" className="text-blue-600 hover:text-blue-700 hover:underline">
                    Log in
                  </a>
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;