import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone, 
  Clock,
  MessageSquare,
  Send,
  CheckCircle,
  ArrowLeft,
  Globe,
  MapPin,
  Building
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/alert';

// Contact Card Component
const ContactCard = ({ icon: Icon, title, description, buttonText }) => {
  return (
    <div className="contact1122_card bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start gap-4">
        <div className="contact1122_icon_wrapper p-3 rounded-xl bg-blue-50">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h3 className="contact1122_title font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="contact1122_desc text-gray-600 text-sm mb-4">{description}</p>
          <Button variant="outline" className="contact1122_btn text-sm">
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

// Contact Form Component
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
    company: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Handle form submission here
  };

  return (
    <form onSubmit={handleSubmit} className="contact1122_form space-y-6">
      {isSubmitted && (
        <Alert className="contact1122_alert bg-green-50 p-4 rounded-lg flex items-center">
          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
          <span className="text-green-700">Message sent successfully! We'll get back to you soon.</span>
        </Alert>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="contact1122_label block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            className="contact1122_input w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
            placeholder="John Smith"
          />
        </div>
        <div>
          <label className="contact1122_label block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            className="contact1122_input w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label className="contact1122_label block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            className="contact1122_input w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            placeholder="+1 (555) 000-0000"
          />
        </div>
        <div>
          <label className="contact1122_label block text-sm font-medium text-gray-700 mb-2">
            Company Name
          </label>
          <input
            type="text"
            className="contact1122_input w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            value={formData.company}
            onChange={(e) => setFormData({...formData, company: e.target.value})}
            placeholder="Your Company"
          />
        </div>
      </div>

      <div>
        <label className="contact1122_label block text-sm font-medium text-gray-700 mb-2">
          Subject *
        </label>
        <select 
          className="contact1122_select w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          value={formData.subject}
          onChange={(e) => setFormData({...formData, subject: e.target.value})}
          required
        >
          <option value="">Select a subject</option>
          <option value="general">General Inquiry</option>
          <option value="quote">Request a Quote</option>
          <option value="support">Technical Support</option>
          <option value="billing">Billing Question</option>
          <option value="feedback">Feedback</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="contact1122_label block text-sm font-medium text-gray-700 mb-2">
          Message *
        </label>
        <textarea
          className="contact1122_textarea w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
          rows={6}
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          required
          placeholder="How can we help you?"
        />
      </div>

      <Button 
        type="submit" 
        className="contact1122_submit w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
      >
        <Send className="h-4 w-4 mr-2" />
        Send Message
      </Button>
    </form>
  );
};

// Contact Info Component
const ContactInfo = () => {
  const officeHours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
    { day: 'Sunday', hours: 'Closed' }
  ];

  return (
    <Card className="contact1122_info p-6 space-y-8 bg-white">
      <div className="contact1122_info_section">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Building className="h-5 w-5 text-blue-600" />
          Head Office
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Via Nazionale, 23<br />
          Milan, Italy<br />
          VAT No: IT5028573958
        </p>
      </div>

      <div className="contact1122_info_section">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-600" />
          Business Hours
        </h3>
        <div className="space-y-2">
          {officeHours.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-gray-600">{item.day}</span>
              <span className="font-medium text-gray-900">{item.hours}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="contact1122_info_section">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Globe className="h-5 w-5 text-blue-600" />
          Coverage Area
        </h3>
        <p className="text-gray-600">
          Serving all major cities in Italy with professional services
        </p>
      </div>
    </Card>
  );
};

// Main Contact Component
const Contact = () => {
  return (
    <div className="contact1122_page min-h-screen bg-gray-50">
      {/* Header */}
      <header className="contact1122_header bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="contact1122_logo flex items-center gap-2">
              <img
                src="https://assests.netlify.app/assets/images/logo.png"
                alt="Kokobeo Logo"
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-blue-600">Kokobeo</span>
            </Link>
            
            <Link to="/" className="contact1122_back text-gray-600 hover:text-gray-900 flex items-center gap-2">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="contact1122_content py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Title Section */}
          <div className="contact1122_hero text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions or need assistance? We're here to help. Choose your preferred way to reach us.
            </p>
          </div>

          {/* Contact Options */}
          <div className="contact1122_options grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <ContactCard
              icon={MessageSquare}
              title="Live Chat"
              description="Get instant help from our support team during business hours"
              buttonText="Start Chat"
            />
            <ContactCard
              icon={Mail}
              title="Email Support"
              description="Send us an email and we'll respond within 24 hours"
              buttonText="Send Email"
            />
            <ContactCard
              icon={Phone}
              title="Phone Support"
              description="Call us during business hours for immediate assistance"
              buttonText="Call Now"
            />
          </div>

          {/* Form and Info Section */}
          <div className="contact1122_main grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="contact1122_form_card p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                <ContactForm />
              </Card>
            </div>

            <div className="contact1122_sidebar space-y-6">
              <ContactInfo />
              
              {/* Emergency Support Card */}
              <Card className="contact1122_emergency p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <h3 className="text-lg font-bold mb-4">Emergency Support</h3>
                <p className="text-sm text-blue-100 mb-4">
                  Need urgent assistance? Our emergency support team is available 24/7.
                </p>
                <Button className="w-full bg-white text-blue-600 hover:bg-blue-50">
                  <Phone className="h-4 w-4 mr-2" />
                  Emergency Contact
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="contact1122_footer bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Kokobeo - Goldman services INC. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;