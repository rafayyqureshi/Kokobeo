import React, { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Send,
  HelpCircle,
  Globe,
  Building,
  Clock,
  ChevronDown,
  Flag
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/Button';
import SharedHeader4 from '../Headers/SharedHeader4';
import SharedFooter2 from '../Footer/SharedFooter2';
import SharedHeader from '../Headers/SharedHeader';
import SharedHeader11 from '../Headers/SharedHeader11';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('default');

  // Country-specific contact information
  const countryContactInfo = {
    default: {
      email: 'support@kokobeo.com',
      emailDescription: '24/7 email support',
      phone: '+1 (555) 123-4567',
      phoneDescription: 'Mon-Fri, 9AM-6PM EST',
      whatsapp: '+1 (555) 987-6543',
      whatsappDescription: 'Available for quick chat support',
      address: '123 Business Avenue, Suite 100',
      addressDescription: 'New York, NY 10001',
      businessHours: [
        { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM EST' },
        { day: 'Saturday', hours: '10:00 AM - 4:00 PM EST' },
        { day: 'Sunday', hours: 'Closed' }
      ],
      emergencySupport: '+1 (555) 999-8888'
    },
    canada: {
      email: 'canada-support@kokobeo.com',
      emailDescription: 'Email support for Canadian customers',
      phone: '+1 (555) 222-3333',
      phoneDescription: 'Mon-Fri, 9AM-5PM EST',
      whatsapp: '+1 (555) 444-5555',
      whatsappDescription: 'Canadian WhatsApp support',
      address: '456 Maple Street, Suite 200',
      addressDescription: 'Toronto, ON M5V 2H1',
      businessHours: [
        { day: 'Monday - Friday', hours: '9:00 AM - 5:00 PM EST' },
        { day: 'Saturday', hours: '10:00 AM - 2:00 PM EST' },
        { day: 'Sunday', hours: 'Closed' }
      ],
      emergencySupport: '+1 (555) 777-9999'
    },
    uk: {
      email: 'uk-support@kokobeo.com',
      emailDescription: 'Email support for UK customers',
      phone: '+44 20 1234 5678',
      phoneDescription: 'Mon-Fri, 9AM-5PM GMT',
      whatsapp: '+44 20 9876 5432',
      whatsappDescription: 'UK WhatsApp support',
      address: '10 Oxford Street',
      addressDescription: 'London, W1D 1BS',
      businessHours: [
        { day: 'Monday - Friday', hours: '9:00 AM - 5:00 PM GMT' },
        { day: 'Saturday', hours: '10:00 AM - 2:00 PM GMT' },
        { day: 'Sunday', hours: 'Closed' }
      ],
      emergencySupport: '+44 20 5555 9999'
    },
    australia: {
      email: 'au-support@kokobeo.com',
      emailDescription: 'Email support for Australian customers',
      phone: '+61 2 1234 5678',
      phoneDescription: 'Mon-Fri, 9AM-5PM AEST',
      whatsapp: '+61 2 9876 5432',
      whatsappDescription: 'Australian WhatsApp support',
      address: '42 George Street',
      addressDescription: 'Sydney, NSW 2000',
      businessHours: [
        { day: 'Monday - Friday', hours: '9:00 AM - 5:00 PM AEST' },
        { day: 'Saturday', hours: '10:00 AM - 2:00 PM AEST' },
        { day: 'Sunday', hours: 'Closed' }
      ],
      emergencySupport: '+61 2 5555 9999'
    },
    germany: {
      email: 'de-support@kokobeo.com',
      emailDescription: 'Email support for German customers',
      phone: '+49 30 1234 5678',
      phoneDescription: 'Mo-Fr, 9:00-17:00 MEZ',
      whatsapp: '+49 30 9876 5432',
      whatsappDescription: 'Deutsche WhatsApp-Unterstützung',
      address: 'Berliner Straße 123',
      addressDescription: '10117 Berlin',
      businessHours: [
        { day: 'Montag - Freitag', hours: '9:00 Uhr - 17:00 Uhr MEZ' },
        { day: 'Samstag', hours: '10:00 Uhr - 14:00 Uhr MEZ' },
        { day: 'Sonntag', hours: 'Geschlossen' }
      ],
      emergencySupport: '+49 30 5555 9999'
    }
  };

  const countries = [
    { id: 'default', name: 'United States' },
    { id: 'canada', name: 'Canada' },
    { id: 'uk', name: 'United Kingdom' },
    { id: 'australia', name: 'Australia' },
    { id: 'germany', name: 'Germany' }
  ];

  const currentCountryInfo = countryContactInfo[selectedCountry];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({ name: '', email: '', subject: '', message: '', type: 'general' });
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />,
      title: 'Email Us',
      content: currentCountryInfo.email,
      description: currentCountryInfo.emailDescription
    },
    {
      icon: <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />,
      title: 'Call Us',
      content: currentCountryInfo.phone,
      description: currentCountryInfo.phoneDescription
    },
    {
      icon: <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />,
      title: 'WhatsApp',
      content: currentCountryInfo.whatsapp,
      description: currentCountryInfo.whatsappDescription
    },
    {
      icon: <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />,
      title: 'Visit Us',
      content: currentCountryInfo.address,
      description: currentCountryInfo.addressDescription
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50" style={{ textAlign: 'left' }}>
      <SharedHeader11 />

      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">Get in Touch</h1>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            We're here to help! Reach out to us for any questions, concerns, or feedback.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        {/* Country Selection */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-center mb-4">
            <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mr-2" />
            <h2 className="text-lg sm:text-xl font-semibold">Select Your Location</h2>
          </div>
          <div className="max-w-xs mx-auto">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full px-2 py-1 sm:p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            >
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {contactInfo.map((item, index) => (
            <Card key={index} className="p-4 sm:p-6 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-3 sm:mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm sm:text-base text-gray-900 mb-1">{item.content}</p>
              <p className="text-xs sm:text-sm text-gray-600">{item.description}</p>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12">
          {/* Contact Form */}
          <Card className="p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-2 py-1 sm:p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-2 py-1 sm:p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Inquiry Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-2 py-1 sm:p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Billing Question</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-2 py-1 sm:p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-2 py-1 sm:p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  {isSubmitting ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> Send Message
                    </>
                  )}
                </Button>
              </div>
              {submitSuccess && (
                <div className="p-3 sm:p-4 bg-green-50 text-green-700 rounded-lg text-sm">
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}
            </form>
          </Card>

          {/* FAQ & Additional Info */}
          <div className="space-y-4 sm:space-y-6">
            <Card className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2">
                <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" /> Quick Help
              </h2>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <h3 className="font-medium text-sm sm:text-base mb-2">Business Hours</h3>
                  <div className="space-y-2 text-xs sm:text-sm">
                    {currentCountryInfo.businessHours.map((schedule, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                        <span>{schedule.day}: {schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-sm sm:text-base mb-2">Emergency Support</h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    For urgent matters outside business hours, please use our 24/7 emergency support line: {currentCountryInfo.emergencySupport}
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Common Questions</h2>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <h3 className="font-medium text-sm sm:text-base mb-1">How quickly can I expect a response?</h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    We aim to respond to all inquiries within 24 hours during business days.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-sm sm:text-base mb-1">Where can I find more resources?</h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Visit our Help Center for guides, tutorials, and FAQs.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-sm sm:text-base mb-1">Need immediate assistance?</h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Try our live chat support for quick answers to common questions.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Spacer for footer */}
      <div className="h-16 sm:h-20 md:h-24" />

      <SharedFooter2 />
    </div>
  );
};

export default ContactPage;