import React from 'react';
import { Card } from '../../components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowLeft, Cookie, Settings, Clock, Shield, ToggleLeft } from 'lucide-react';

const CookiesPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <img
                  src="https://assests.netlify.app/assets/images/logo.png"
                  alt="Kokobeo Logo"
                  className="h-8 w-auto"
                />
                <span className="text-xl font-bold text-blue-600">Kokobeo</span>
              </Link>
            </div>
            <Link
              to="/"
              className="flex items-center text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
<main className="max-w-4xl mx-auto px-4 py-12">
  <div className="space-y-8">
    {/* Title Section */}
    <div className="text-left mb-8">
      <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full mb-6">
        <Cookie className="h-8 w-8 text-blue-600" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Cookies Policy</h1>
      <p className="text-gray-600">Last updated: December 27, 2024</p>
    </div>

    {/* Cookie Types Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6 bg-white text-left">
        <Settings className="h-8 w-8 text-blue-600 mb-4" />
        <h3 className="text-lg font-semibold mb-2">Essential Cookies</h3>
        <p className="text-gray-600 text-sm">Required for basic website functionality</p>
      </Card>

      <Card className="p-6 bg-white text-left">
        <Clock className="h-8 w-8 text-blue-600 mb-4" />
        <h3 className="text-lg font-semibold mb-2">Session Cookies</h3>
        <p className="text-gray-600 text-sm">Temporary cookies that expire when you close your browser</p>
      </Card>

      <Card className="p-6 bg-white text-left">
        <Shield className="h-8 w-8 text-blue-600 mb-4" />
        <h3 className="text-lg font-semibold mb-2">Security Cookies</h3>
        <p className="text-gray-600 text-sm">Help maintain the security of our services</p>
      </Card>

      <Card className="p-6 bg-white text-left">
        <ToggleLeft className="h-8 w-8 text-blue-600 mb-4" />
        <h3 className="text-lg font-semibold mb-2">Preference Cookies</h3>
        <p className="text-gray-600 text-sm">Remember your settings and preferences</p>
      </Card>
    </div>

    {/* Cookie Policy Content */}
    <Card className="p-8 bg-white text-left">
      <div className="prose max-w-none">
        <h2 className="text-xl font-semibold mb-4">What Are Cookies?</h2>
        <p className="mb-6">
          Cookies are small text files that are stored on your computer or mobile device when you visit our website. They help us provide you with the best possible experience and allow certain features to work.
        </p>

        <h2 className="text-xl font-semibold mb-4">How We Use Cookies</h2>
        <p className="mb-6">We use cookies for various purposes:</p>
        <ul className="list-disc pl-6 mb-6">
          <li>Authentication and security</li>
          <li>User preferences and settings</li>
          <li>Performance monitoring</li>
          <li>Analytics and improvements</li>
        </ul>

        <h2 className="text-xl font-semibold mb-4">Types of Cookies We Use</h2>

        <h3 className="text-lg font-medium mb-3">Essential Cookies</h3>
        <p className="mb-4">
          These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.
        </p>

        <h3 className="text-lg font-medium mb-3">Performance Cookies</h3>
        <p className="mb-4">
          Help us understand how visitors interact with our website by collecting and reporting information anonymously.
        </p>

        <h3 className="text-lg font-medium mb-3">Functionality Cookies</h3>
        <p className="mb-4">
          Enable enhanced functionality and personalization, such as language preferences and chat services.
        </p>

        <h3 className="text-lg font-medium mb-3">Targeting Cookies</h3>
        <p className="mb-6">
          These cookies may be set through our site by our advertising partners to build a profile of your interests.
        </p>

        <h2 className="text-xl font-semibold mb-4">Managing Cookies</h2>
        <p className="mb-4">
          You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.
        </p>

        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-medium mb-3">Browser Settings</h3>
          <p className="mb-4">To manage cookies through your browser settings:</p>
          <ul className="list-disc pl-6">
            <li>Chrome: Settings → Privacy and Security → Cookies</li>
            <li>Firefox: Options → Privacy & Security → Cookies</li>
            <li>Safari: Preferences → Privacy → Cookies</li>
            <li>Edge: Settings → Privacy & Security → Cookies</li>
          </ul>
        </div>

        <h2 className="text-xl font-semibold mb-4">Updates to This Policy</h2>
        <p className="mb-6">
          We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our data practices. Any changes will become effective when we post the revised policy.
        </p>

        <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
        <p>
          If you have any questions about our use of cookies, please contact us at cookies@kokobeo.com
        </p>
      </div>
    </Card>
  </div>
</main>


      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Kokobeo - Goldman services INC. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CookiesPolicyPage;