import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import Button from '../components/ui/Button';
import { Eye, EyeOff, ArrowLeft, Mail, Lock, UserRound } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
                Welcome Back!
              </h1>
              <p className="text-lg text-gray-600">
                Log in to access your account and continue connecting with trusted professionals.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <UserRound className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-gray-700">Access your personal dashboard</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-gray-700">Manage your communications</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-gray-700">Secure account protection</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Login Form */}
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
                  Log in to your account
                </CardTitle>
                <p className="mt-2 text-sm text-gray-600 text-center">
                  Welcome back! Please enter your details below.
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Social Login Buttons */}
                <div className="space-y-4">
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
                </div>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 text-gray-500 bg-white">or continue with email</span>
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700 block"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 w-full rounded-lg border border-gray-300 pl-11 pr-4 text-sm 
                        text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      href="#"
                      className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      Forgot password?
                    </motion.a>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 w-full rounded-lg border border-gray-300 pl-11 pr-12 text-sm 
                        text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Login Button */}
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full h-12 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                    transition-colors font-medium flex items-center justify-center gap-2"
                >
                  Log in
                </motion.button>

                {/* Registration Link */}
                <p className="text-sm text-center text-gray-600">
                  Don't have an account?{' '}
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    href="/register"
                    className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
                  >
                    Sign up
                  </motion.a>
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;