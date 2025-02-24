import React, { useState } from 'react';
import { 
  Search, HelpCircle, Mail, MessageCircle, Book,
  ChevronRight, ChevronDown, Phone, Video, FileText,
  ArrowRight, Globe, AlertCircle, CheckCircle, Clock,
  Zap, DollarSign
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/badge';
import SharedHeader from '../Headers/SharedHeader';
import SharedHeader7 from '../Headers/SharedHeader7';

const CategoryCard = ({ icon: Icon, title, description, articles }) => {
  return (
    <Card className="p-6 hover:shadow-md transition-all">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Icon className="h-6 w-6 text-blue-500" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-500 mb-4">{description}</p>
          <div className="space-y-2">
            {articles.map((article, index) => (
              <a
                key={index}
                href={article.link}
                className="flex items-center text-sm text-gray-600 hover:text-blue-600"
              >
                <ChevronRight className="h-4 w-4 mr-2" />
                {article.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left hover:bg-gray-50 px-4 rounded-lg"
      >
        <span className="font-medium text-gray-900">{question}</span>
        <ChevronDown 
          className={`h-5 w-5 text-gray-500 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`} 
        />
      </button>
      {isOpen && (
        <div className="px-4 pb-4">
          <p className="text-gray-600">{answer}</p>
        </div>
      )}
    </div>
  );
};

const HelpCenter02 = () => {
  const categories = [
    {
      icon: DollarSign,
      title: "Quotes & Payments",
      description: "Learn about purchasing quotes and payment processes",
      articles: [
        { title: "How to purchase quotes", link: "#" },
        { title: "Understanding credit system", link: "#" },
        { title: "Payment methods", link: "#" }
      ]
    },
    {
      icon: Zap,
      title: "Emergency Services",
      description: "Information about emergency service features",
      articles: [
        { title: "Emergency service process", link: "#" },
        { title: "Response time guidelines", link: "#" },
        { title: "Emergency pricing", link: "#" }
      ]
    },
    {
      icon: CheckCircle,
      title: "Account Verification",
      description: "Guide to verify your professional account",
      articles: [
        { title: "Required documents", link: "#" },
        { title: "Verification process", link: "#" },
        { title: "Verification status", link: "#" }
      ]
    },
    {
      icon: Book,
      title: "Platform Guide",
      description: "Learn how to use our platform effectively",
      articles: [
        { title: "Getting started", link: "#" },
        { title: "Creating your profile", link: "#" },
        { title: "Finding professionals", link: "#" }
      ]
    }
  ];

  const faqs = [
    {
      question: "How do I purchase quotes?",
      answer: "You can purchase quotes individually or buy credits in bulk through our subscription plans. Each quote costs 1 credit, and you can view full details after purchase."
    },
    {
      question: "What is the emergency service system?",
      answer: "Emergency services provide immediate access to professionals. When you mark a request as emergency, it's instantly sent via WhatsApp to available professionals in your area."
    },
    {
      question: "How does the credit system work?",
      answer: "Credits can be purchased individually or through subscription plans. 1 credit equals 1 quote, and bulk purchases offer better rates. Credits may have validity periods based on your subscription."
    },
    {
      question: "How do I verify my professional account?",
      answer: "Professional verification requires submitting business documentation including VAT number, business registration, and identification. Our team reviews submissions within 24-48 hours."
    }
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      <SharedHeader7/>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header - Keeping it centered */}
        <div className="text-center mb-12">
          <span className="inline-block p-2 bg-blue-100 rounded-full mb-4">
            <HelpCircle className="h-8 w-8 text-blue-600" />
          </span>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">How can we help you?</h1>
          <p className="text-lg text-gray-600 mb-8">
            Search our help center or browse categories below
          </p>

          {/* Search Bar - Keeping it centered */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help..."
              className="w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 text-lg"
            />
          </div>
        </div>

        {/* Quick Actions - Now left aligned */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <MessageCircle className="h-6 w-6 text-blue-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Live Chat</h3>
                <p className="text-sm text-gray-500">Chat with our support team</p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </div>
          </Card>

          <Card className="p-6 hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Mail className="h-6 w-6 text-blue-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Email Support</h3>
                <p className="text-sm text-gray-500">Get help via email</p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </div>
          </Card>

          <Card className="p-6 hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Video className="h-6 w-6 text-blue-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Video Guides</h3>
                <p className="text-sm text-gray-500">Watch tutorial videos</p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </div>
          </Card>
        </div>

        {/* Help Categories - Left aligned */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Browse Help Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category, index) => (
              <CategoryCard key={index} {...category} />
            ))}
          </div>
        </div>

        {/* FAQ Section - Left aligned */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <Card>
            {faqs.map((faq, index) => (
              <FAQItem key={index} {...faq} />
            ))}
          </Card>
        </div>

        {/* Still Need Help - Keeping it centered */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
          <p className="text-gray-600 mb-6">
            Our support team is here to assist you 24/7
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg">
              <MessageCircle className="h-5 w-5 mr-2" />
              Start Live Chat
            </Button>
            <Button variant="outline" size="lg">
              <Mail className="h-5 w-5 mr-2" />
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter02;