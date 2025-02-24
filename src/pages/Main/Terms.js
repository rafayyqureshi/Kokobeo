import React from 'react';
import { Card } from '../../components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Shield, Scale } from 'lucide-react';

const TermsPage = () => {
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
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Terms and Conditions
      </h1>
      <p className="text-gray-600">
        Last updated: December 27, 2024
      </p>
    </div>

    {/* Key Points Section */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="p-6 bg-white text-left">
        <FileText className="h-8 w-8 text-blue-600 mb-4" />
        <h3 className="text-lg font-semibold mb-2">Service Terms</h3>
        <p className="text-gray-600 text-sm">
          Clear guidelines on how our platform connects customers with professionals
        </p>
      </Card>

      <Card className="p-6 bg-white text-left">
        <Shield className="h-8 w-8 text-blue-600 mb-4" />
        <h3 className="text-lg font-semibold mb-2">Security</h3>
        <p className="text-gray-600 text-sm">
          Robust measures to protect your data and transactions
        </p>
      </Card>

      <Card className="p-6 bg-white text-left">
        <Scale className="h-8 w-8 text-blue-600 mb-4" />
        <h3 className="text-lg font-semibold mb-2">Legal Rights</h3>
        <p className="text-gray-600 text-sm">
          Your rights and responsibilities when using our platform
        </p>
      </Card>
    </div>

    {/* Terms Content */}
    <Card className="p-8 bg-white text-left">
      <div className="prose max-w-none text-left">
        <h2 className="text-xl font-semibold mb-4">1. Platform Usage</h2>
        <p className="mb-6">
          The platform is designed to connect customers seeking services with qualified professionals. 
          Customers can receive up to 5 quotes from different professionals and can provide anonymous 
          feedback on quotes to receive better offers.
        </p>

        <h2 className="text-xl font-semibold mb-4">2. Professional Registration</h2>
        <p className="mb-6">
          Professionals must register with valid credentials including VAT number or company 
          registration. Documentation requirements include Chamber of Commerce certificate, 
          identity verification, and proof of address.
        </p>

        <h2 className="text-xl font-semibold mb-4">3. Emergency Services</h2>
        <p className="mb-6">
          Emergency service providers must maintain specified response times and accept 
          the platform's rate structure for different time slots (day, evening, night) 
          and days (working days, holidays).
        </p>

        <h2 className="text-xl font-semibold mb-4">4. Payment Terms</h2>
        <p className="mb-6">
          Professionals can purchase individual quotes or subscribe to credit packages. 
          Platform fees and commission structures apply to all transactions.
        </p>

        <h2 className="text-xl font-semibold mb-4">5. Communication Guidelines</h2>
        <p className="mb-6">
          All communication between customers and professionals must occur through the 
          platform's internal chat system. External contact information is hidden until 
          quote purchase.
        </p>

        <h2 className="text-xl font-semibold mb-4">6. Account Certification</h2>
        <p className="mb-6">
          Both customers and professionals must complete account verification. Private 
          individuals must provide identification, tax code, and proof of address.
        </p>

        <h2 className="text-xl font-semibold mb-4">7. Service Quality</h2>
        <p className="mb-6">
          Professionals must maintain quality standards and respond to customer feedback. 
          Review systems are in place for both customers and professionals.
        </p>

        <h2 className="text-xl font-semibold mb-4">8. Dispute Resolution</h2>
        <p className="mb-6">
          Platform provides mediation services for disputes between customers and 
          professionals. Clear process for handling complaints and refunds.
        </p>
      </div>
    </Card>
  </div>
</main>


      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Kokobeo - Goldman services INC. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TermsPage;