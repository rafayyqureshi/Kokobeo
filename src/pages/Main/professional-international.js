import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, MapPin, User, Mail, Phone, Camera, Video,
  Globe, Shield, FileText, Award, Star, ChevronLeft, ChevronRight,
  Languages, Briefcase, Scale, Check, X, DollarSign, CreditCard,
  AlertCircle, Building, Info, ChevronDown, Lock, LogOut, Bell,
  MessageSquare, HelpCircle, ThumbsUp
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert';
import SettingsModal from './SettingsModal';
import ProfileModal from './ProfileModal';
import Tooltip from '../../components/ui/tooltip';
import SharedFooter2 from '../../Footer/SharedFooter2';
import SharedHeader11 from '../../Headers/SharedHeader11';

// Mock user data
const mockUserData = {
  hasSubscription: false,
  credits: 250,
  name: "John Smith",
  email: "john@example.com",
  profileImage: null,
  company: "Global Legal Services",
  location: "Toronto, ON",
  isVerified: true,
  emergencyAvailable: true
};

// Mock reviews data with quote associations
const mockReviews = [
  // Reviews for Quote 1 (12 reviews)
  {
    id: 1,
    quoteId: 1,
    author: "David H.",
    date: "2024-01-15",
    rating: 5,
    text: "Excellent legal services! Very professional and knowledgeable in international contracts.",
    project: "Contract Review",
    authorCompany: "Global Tech Solutions",
    authorImage: null,
    verified: true,
    helpful: 12
  },
  {
    id: 2,
    quoteId: 1,
    author: "Sarah M.",
    date: "2024-01-14",
    rating: 5,
    text: "Outstanding expertise in contract law. They made the process smooth and efficient.",
    project: "Legal Consultation",
    authorCompany: "Digital Enterprises",
    authorImage: null,
    verified: true,
    helpful: 8
  },
  {
    id: 3,
    quoteId: 1,
    author: "Michael P.",
    date: "2024-01-13",
    rating: 4,
    text: "Very thorough review of our international contracts. Great attention to detail.",
    project: "Contract Review",
    authorCompany: "Tech Innovations Ltd",
    authorImage: null,
    verified: true,
    helpful: 6
  },
  {
    id: 4,
    quoteId: 1,
    author: "Emma R.",
    date: "2024-01-12",
    rating: 5,
    text: "Exceptional service in handling our international legal matters.",
    project: "Legal Services",
    authorCompany: "Future Systems Inc",
    authorImage: null,
    verified: true,
    helpful: 10
  },
  {
    id: 5,
    quoteId: 1,
    author: "James L.",
    date: "2024-01-11",
    rating: 4,
    text: "Professional and efficient service for our contract needs.",
    project: "Contract Review",
    authorCompany: "Global Ventures",
    authorImage: null,
    verified: true,
    helpful: 7
  },
  {
    id: 6,
    quoteId: 1,
    author: "Anna K.",
    date: "2024-01-10",
    rating: 5,
    text: "Highly skilled team that understands international law thoroughly.",
    project: "International Legal Services",
    authorCompany: "Smart Tech Co",
    authorImage: null,
    verified: true,
    helpful: 15
  },
  {
    id: 7,
    quoteId: 1,
    author: "Robert W.",
    date: "2024-01-09",
    rating: 5,
    text: "Their expertise in cross-border contracts is impressive. Saved us from potential issues.",
    project: "Legal Review",
    authorCompany: "Innovation Hub",
    authorImage: null,
    verified: true,
    helpful: 9
  },
  {
    id: 8,
    quoteId: 1,
    author: "Sophie T.",
    date: "2024-01-08",
    rating: 4,
    text: "Great communication throughout the entire process. Very satisfied with the results.",
    project: "Contract Analysis",
    authorCompany: "Digital Solutions Corp",
    authorImage: null,
    verified: true,
    helpful: 11
  },
  {
    id: 9,
    quoteId: 1,
    author: "Daniel M.",
    date: "2024-01-07",
    rating: 5,
    text: "Excellent understanding of international business law. Made complex issues simple.",
    project: "Legal Consultation",
    authorCompany: "Global Trade Ltd",
    authorImage: null,
    verified: true,
    helpful: 14
  },
  {
    id: 10,
    quoteId: 1,
    author: "Linda P.",
    date: "2024-01-06",
    rating: 5,
    text: "The team provided invaluable insights for our international contracts.",
    project: "Contract Review",
    authorCompany: "Future Enterprises",
    authorImage: null,
    verified: true,
    helpful: 8
  },
  {
    id: 11,
    quoteId: 1,
    author: "Thomas G.",
    date: "2024-01-05",
    rating: 4,
    text: "Reliable and detailed legal support for our international dealings.",
    project: "Contract Review",
    authorCompany: "Tech Pioneers",
    authorImage: null,
    verified: true,
    helpful: 9
  },
  {
    id: 12,
    quoteId: 1,
    author: "Julia B.",
    date: "2024-01-04",
    rating: 5,
    text: "Top-notch service, highly recommended for legal expertise.",
    project: "Legal Services",
    authorCompany: "Bright Futures Inc",
    authorImage: null,
    verified: true,
    helpful: 10
  },

  // Reviews for Quote 2 (8 reviews)
  {
    id: 13,
    quoteId: 2,
    author: "Maria R.",
    date: "2024-01-10",
    rating: 4,
    text: "Great business consulting work. Helped us successfully enter the European market.",
    project: "Market Entry Strategy",
    authorCompany: "Innovation Labs Inc.",
    authorImage: null,
    verified: true,
    helpful: 8
  },
  {
    id: 14,
    quoteId: 2,
    author: "John D.",
    date: "2024-01-09",
    rating: 5,
    text: "Excellent market analysis and strategic planning.",
    project: "Business Strategy",
    authorCompany: "Smart Solutions Corp",
    authorImage: null,
    verified: true,
    helpful: 6
  },
  {
    id: 15,
    quoteId: 2,
    author: "Claire S.",
    date: "2024-01-08",
    rating: 4,
    text: "Solid guidance for our market entry plan.",
    project: "Market Entry",
    authorCompany: "Growth Partners",
    authorImage: null,
    verified: true,
    helpful: 5
  },
  {
    id: 16,
    quoteId: 2,
    author: "Peter K.",
    date: "2024-01-07",
    rating: 5,
    text: "Fantastic insights into European markets.",
    project: "Business Consulting",
    authorCompany: "NextGen Solutions",
    authorImage: null,
    verified: true,
    helpful: 9
  },
  {
    id: 17,
    quoteId: 2,
    author: "Elena M.",
    date: "2024-01-06",
    rating: 4,
    text: "Very helpful strategic advice.",
    project: "Market Strategy",
    authorCompany: "EuroTech Inc",
    authorImage: null,
    verified: true,
    helpful: 7
  },
  {
    id: 18,
    quoteId: 2,
    author: "Mark T.",
    date: "2024-01-05",
    rating: 5,
    text: "Their market entry plan was spot on.",
    project: "Business Development",
    authorCompany: "Visionary Corp",
    authorImage: null,
    verified: true,
    helpful: 10
  },
  {
    id: 19,
    quoteId: 2,
    author: "Sophie L.",
    date: "2024-01-04",
    rating: 4,
    text: "Good support for our expansion strategy.",
    project: "Consulting Services",
    authorCompany: "Bright Horizons",
    authorImage: null,
    verified: true,
    helpful: 6
  },
  {
    id: 20,
    quoteId: 2,
    author: "Liam B.",
    date: "2024-01-03",
    rating: 5,
    text: "Expert consulting that delivered results.",
    project: "Market Planning",
    authorCompany: "Global Reach Ltd",
    authorImage: null,
    verified: true,
    helpful: 8
  },

  // Reviews for Quote 3 (15 reviews)
  {
    id: 21,
    quoteId: 3,
    author: "Yuki T.",
    date: "2024-01-05",
    rating: 5,
    text: "Perfect translation work. Technical documents were accurately translated maintaining all specifications.",
    project: "Technical Translation",
    authorCompany: "Japan Motors Corp.",
    authorImage: null,
    verified: true,
    helpful: 15
  },
  {
    id: 22,
    quoteId: 3,
    author: "Lisa K.",
    date: "2024-01-04",
    rating: 5,
    text: "Excellent attention to technical details in translation.",
    project: "Document Translation",
    authorCompany: "Tech Manufacturing Inc",
    authorImage: null,
    verified: true,
    helpful: 12
  },
  {
    id: 23,
    quoteId: 3,
    author: "Hiroshi Y.",
    date: "2024-01-03",
    rating: 4,
    text: "High-quality translation for our manuals.",
    project: "Technical Documentation",
    authorCompany: "Nippon Industries",
    authorImage: null,
    verified: true,
    helpful: 10
  },
  {
    id: 24,
    quoteId: 3,
    author: "Sophie H.",
    date: "2024-01-02",
    rating: 5,
    text: "Accurate and fast translation service.",
    project: "Manual Translation",
    authorCompany: "Global Tech Co",
    authorImage: null,
    verified: true,
    helpful: 11
  },
  {
    id: 25,
    quoteId: 3,
    author: "Kenji M.",
    date: "2024-01-01",
    rating: 5,
    text: "Top-notch technical translation work.",
    project: "Specifications Translation",
    authorCompany: "Tokyo Systems",
    authorImage: null,
    verified: true,
    helpful: 14
  },
  {
    id: 26,
    quoteId: 3,
    author: "Emily W.",
    date: "2023-12-31",
    rating: 4,
    text: "Good quality translations for our documents.",
    project: "Technical Translation",
    authorCompany: "North Tech Inc",
    authorImage: null,
    verified: true,
    helpful: 9
  },
  {
    id: 27,
    quoteId: 3,
    author: "Takeshi N.",
    date: "2023-12-30",
    rating: 5,
    text: "Flawless translation of complex manuals.",
    project: "Manual Translation",
    authorCompany: "Kyoto Innovations",
    authorImage: null,
    verified: true,
    helpful: 13
  },
  {
    id: 28,
    quoteId: 3,
    author: "Rachel G.",
    date: "2023-12-29",
    rating: 5,
    text: "Highly professional translation service.",
    project: "Document Translation",
    authorCompany: "Global Solutions",
    authorImage: null,
    verified: true,
    helpful: 10
  },
  {
    id: 29,
    quoteId: 3,
    author: "Aiko S.",
    date: "2023-12-28",
    rating: 4,
    text: "Reliable translation with quick turnaround.",
    project: "Technical Specs",
    authorCompany: "Osaka Tech Ltd",
    authorImage: null,
    verified: true,
    helpful: 8
  },
  {
    id: 30,
    quoteId: 3,
    author: "Mark R.",
    date: "2023-12-27",
    rating: 5,
    text: "Great attention to detail in translations.",
    project: "Manual Translation",
    authorCompany: "Tech Pioneers",
    authorImage: null,
    verified: true,
    helpful: 12
  },
  {
    id: 31,
    quoteId: 3,
    author: "Naomi L.",
    date: "2023-12-26",
    rating: 5,
    text: "Perfect service for our technical needs.",
    project: "Technical Translation",
    authorCompany: "Future Tech Inc",
    authorImage: null,
    verified: true,
    helpful: 11
  },
  {
    id: 32,
    quoteId: 3,
    author: "Shinji K.",
    date: "2023-12-25",
    rating: 4,
    text: "Solid translation work for our specs.",
    project: "Document Translation",
    authorCompany: "Nippon Systems",
    authorImage: null,
    verified: true,
    helpful: 9
  },
  {
    id: 33,
    quoteId: 3,
    author: "Laura T.",
    date: "2023-12-24",
    rating: 5,
    text: "Exceptional quality in translations.",
    project: "Technical Manuals",
    authorCompany: "Global Innovate",
    authorImage: null,
    verified: true,
    helpful: 13
  },
  {
    id: 34,
    quoteId: 3,
    author: "Taro H.",
    date: "2023-12-23",
    rating: 5,
    text: "Highly accurate technical translations.",
    project: "Specifications",
    authorCompany: "Tokyo Tech Co",
    authorImage: null,
    verified: true,
    helpful: 14
  },
  {
    id: 35,
    quoteId: 3,
    author: "Clara P.",
    date: "2023-12-22",
    rating: 4,
    text: "Good service for our document needs.",
    project: "Translation Services",
    authorCompany: "Bright Futures",
    authorImage: null,
    verified: true,
    helpful: 10
  }
];

// Available service types
const serviceTypes = [
  'Legal Services',
  'Business Consulting',
  'Financial Advisory',
  'Translation Services',
  'International Trade',
  'Immigration Services',
  'Tax Advisory',
  'Regulatory Compliance'
];

// Available languages
const availableLanguages = [
  { code: 'en', name: 'English', short: 'ENG' },
  { code: 'es', name: 'Spanish', short: 'ESP' },
  { code: 'fr', name: 'French', short: 'FRA' },
  { code: 'de', name: 'German', short: 'DEU' },
  { code: 'zh', name: 'Chinese', short: 'CHN' },
  { code: 'ar', name: 'Arabic', short: 'ARB' },
  { code: 'pt', name: 'Portuguese', short: 'POR' },
  { code: 'ja', name: 'Japanese', short: 'JPN' }
];

// Menu items
const menuItems = [
  { icon: Globe, label: 'About Kokobeo', href: '/international/about' },
  { icon: HelpCircle, label: 'How it Works', href: '/how-it-works' },
  { icon: MessageSquare, label: 'Messages', href: '/international/menu/messages', badge: '3' },
  { icon: Bell, label: 'Notifications', href: '/international/notifications', badge: '2' },
  { icon: Mail, label: 'Contact Us', href: '/international/menu/contact' },
  { icon: FileText, label: 'Help Center', href: '/international/help' },
  { icon: User, label: 'My Profile', href: '/client/profile' },
  { icon: Shield, label: 'Verify Account', href: '/international/verify' },
  { icon: Star, label: 'Subscription Plans', href: '/international/plans' },
  { icon: CreditCard, label: 'My Credits', href: '/international/credits', badge: mockUserData.credits },
  { icon: Briefcase, label: 'My Projects', href: '/international/client/myorders', badge: '2 Active' }
];

// Complete mock international opportunities data with isPurchased property
const internationalQuotes = [
  {
    id: 1,
    type: 'international',
    category: 'Legal Services',
    title: 'International Contract Review',
    description: 'Need assistance with reviewing and negotiating an international business contract.',
    country: 'United States',
    region: 'California',
    city: 'San Francisco',
    languages: ['English', 'Spanish', 'Mandarin'],
    timePosted: '10 minutes ago',
    customer: {
      name: 'J*** S***',
      company: 'Global Enterprises Ltd.',
      phone: '+1 4** *** **89',
      email: 'j***@****.com',
      address: '*** Market Street'
    },
    hasPhotos: true,
    hasVideos: true,
    price: 200,
    status: 'New',
    expertise: ['Contract Law', 'International Trade'],
    tags: [
      { text: 'New Opportunity', color: 'green' },
      { text: 'Only Information', color: 'purple' }
    ],
    rating: 4.8,
    reviewCount: 12,
    reviews: mockReviews.filter(review => review.quoteId === 1),
    isPurchased: true // Purchased
  },
  {
    id: 2,
    type: 'international',
    category: 'Business Consulting',
    title: 'Market Entry Strategy',
    description: 'Seeking consultant for European market entry strategy development.',
    country: 'United States',
    region: 'California',
    city: 'San Francisco',
    languages: ['English', 'French', 'German'],
    timePosted: '1 hour ago',
    customer: {
      name: 'M*** R***',
      company: 'Tech Innovations Inc.',
      phone: '+1 5** *** **21',
      email: 'm***@****.com',
      address: '*** Valley Road'
    },
    hasPhotos: true,
    hasVideos: false,
    price: 250,
    status: 'New',
    expertise: ['Market Analysis', 'Business Strategy'],
    tags: [
      { text: 'New Opportunity', color: 'green' },
      { text: 'Hiring-Estimate', color: 'cyan' }
    ],
    rating: 4.6,
    reviewCount: 8,
    reviews: mockReviews.filter(review => review.quoteId === 2),
    isPurchased: false // Not purchased
  },
  {
    id: 3,
    type: 'international',
    category: 'Translation Services',
    title: 'Technical Document Translation',
    description: 'Need professional translation of technical specifications and manuals.',
    country: 'Canada',
    region: 'Ontario',
    city: 'Toronto',
    languages: ['English', 'Japanese', 'Korean'],
    timePosted: '2 hours ago',
    customer: {
      name: 'K*** T***',
      company: 'Global Tech Manufacturing',
      phone: '+1 6** *** **45',
      email: 'k***@****.com',
      address: '*** Bay Street'
    },
    hasPhotos: true,
    hasVideos: true,
    price: 180,
    status: 'New',
    expertise: ['Technical Translation', 'Documentation'],
    tags: [
      { text: 'New Opportunity', color: 'green' },
      { text: 'Only Information', color: 'red' }
    ],
    rating: 4.9,
    reviewCount: 15,
    reviews: mockReviews.filter(review => review.quoteId === 3),
    isPurchased: true // Purchased
  },
  {
    id: 4,
    type: 'international',
    category: 'Financial Advisory',
    title: 'International Tax Planning',
    description: 'Looking for expert advice on international tax optimization strategies.',
    country: 'Canada',
    region: 'British Columbia',
    city: 'Vancouver',
    languages: ['English', 'Mandarin'],
    timePosted: '3 hours ago',
    customer: {
      name: 'L*** W***',
      company: 'Pacific Trading Co.',
      phone: '+1 7** *** **32',
      email: 'l***@****.com',
      address: '*** Pacific Boulevard'
    },
    hasPhotos: false,
    hasVideos: true,
    price: 300,
    status: 'New',
    expertise: ['International Tax', 'Financial Planning'],
    tags: [
      { text: 'New Opportunity', color: 'green' },
      { text: 'Only Information', color: 'yellow' }
    ],
    rating: 4.7,
    reviewCount: 9,
    reviews: [],
    isPurchased: false // Not purchased
  },
  {
    id: 5,
    type: 'international',
    category: 'Immigration Services',
    title: 'Business Immigration Support',
    description: 'Need assistance with business immigration process and documentation.',
    country: 'United States',
    region: 'New York',
    city: 'New York City',
    languages: ['English', 'Spanish'],
    timePosted: '4 hours ago',
    customer: {
      name: 'A*** P***',
      company: 'Global Ventures LLC',
      phone: '+1 8** *** **76',
      email: 'a***@****.com',
      address: '*** Madison Avenue'
    },
    hasPhotos: true,
    hasVideos: false,
    price: 220,
    status: 'New',
    expertise: ['Immigration Law', 'Business Documentation'],
    tags: [
      { text: 'New Opportunity', color: 'green' },
      { text: 'Only Information', color: 'orange' }
    ],
    rating: 4.5,
    reviewCount: 7,
    reviews: [],
    isPurchased: true // Purchased
  },
  {
    id: 6,
    type: 'international',
    category: 'Regulatory Compliance',
    title: 'Compliance Assessment',
    description: 'Seeking expert for international regulatory compliance assessment.',
    country: 'United Kingdom',
    region: 'England',
    city: 'London',
    languages: ['English', 'French'],
    timePosted: '5 hours ago',
    customer: {
      name: 'R*** B***',
      company: 'European Markets Ltd',
      phone: '+44 7** *** **89',
      email: 'r***@****.com',
      address: '*** Canary Wharf'
    },
    hasPhotos: true,
    hasVideos: true,
    price: 275,
    status: 'New',
    expertise: ['Regulatory Compliance', 'Risk Assessment'],
    tags: [
      { text: 'New Opportunity', color: 'green' },
      { text: 'Only Information', color: 'blue' }
    ],
    rating: 4.4,
    reviewCount: 6,
    reviews: [],
    isPurchased: false // Not purchased
  }
];

const InternationalProfessional = () => {
  // State management
  const [searchText, setSearchText] = useState('');
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');
  const [showQuoteDetails, setShowQuoteDetails] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedServiceTypes, setSelectedServiceTypes] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [requestType, setRequestType] = useState('quote');
  const [paymentMethod, setPaymentMethod] = useState('dollars');
  const [currentPage, setCurrentPage] = useState(1);
  const [showChat, setShowChat] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showReviewsList, setShowReviewsList] = useState(false);
  const [selectedQuoteForReview, setSelectedQuoteForReview] = useState(null);

  // Utility function to mask private information
  const maskPrivateInfo = (info, type) => {
    switch(type) {
      case 'name':
        return info.replace(/(?!^.).(?!$)/g, '*');
      case 'email':
        const [localPart, domain] = info.split('@');
        return `${localPart[0]}***@${domain[0]}***.${domain.split('.')[1]}`;
      case 'phone':
        return info.replace(/\d(?=\d{4})/g, '*');
      case 'address':
        return info.replace(/\d+|[a-zA-Z]+(?= )/g, '***');
      default:
        return info;
    }
  };

  // Review Modal Component
  const ReviewModal = ({ isOpen, onClose, quote }) => {
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [projectType, setProjectType] = useState(quote?.category || '');
    const [companyName, setCompanyName] = useState(mockUserData.company || '');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setError('');

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock success
        onClose();
        setRating(0);
        setReviewText('');
        setProjectType('');
      } catch (err) {
        setError('Failed to submit review. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    };

    if (!isOpen) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.95 }}
          className="bg-white rounded-xl max-w-lg w-full"
        >
          <div className="p-6 border-b flex justify-between items-center">
            <h3 className="text-xl font-semibold">Write a Review</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {/* Rating Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="text-2xl focus:outline-none"
                  >
                    <Star 
                      className={`h-8 w-8 ${
                        star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Project Type */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Service Type</label>
              <input
                type="text"
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                placeholder="e.g., Legal Services, Business Consulting"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Company Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Your company name"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Review Text */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Your Review</label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your experience with this service..."
                rows={4}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!rating || !reviewText.trim() || isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </Button>
          </form>
        </motion.div>
      </motion.div>
    );
  };

  // Reviews List Modal Component
  const ReviewsListModal = ({ isOpen, onClose, quote }) => {
    const relevantReviews = quote 
      ? mockReviews.filter(review => review.quoteId === quote.id)
      : mockReviews;

    const averageRating = relevantReviews.length > 0 
      ? relevantReviews.reduce((acc, curr) => acc + curr.rating, 0) / relevantReviews.length 
      : 0;

    const [sortBy, setSortBy] = useState('recent'); // 'recent' or 'rating'
    const [filterRating, setFilterRating] = useState(0); // 0 means all ratings

    const sortedReviews = [...relevantReviews].sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating; // Highest rating first
      return new Date(b.date) - new Date(a.date); // Most recent first
    }).filter(review => filterRating === 0 || review.rating === filterRating);

    if (!isOpen) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.95 }}
          className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        >
          <div className="p-6 border-b sticky top-0 bg-white">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">Reviews</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= Math.floor(averageRating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {averageRating.toFixed(1)} ({relevantReviews.length} reviews)
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Filters and Sort */}
            <div className="flex gap-4 mt-4">
              {/* Rating Filter */}
              <select
                value={filterRating}
                onChange={(e) => setFilterRating(Number(e.target.value))}
                className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value={0}>All Ratings</option>
                <option value={5}>5 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={2}>2 Stars</option>
                <option value={1}>1 Star</option>
              </select>

              {/* Sort Options */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="recent">Most Recent</option>
                <option value="rating">Highest Rating</option>
              </select>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {sortedReviews.map((review) => (
              <div key={review.id} className="border-b last:border-0 pb-6 last:pb-0">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      {review.authorImage ? (
                        <img 
                          src={review.authorImage} 
                          alt={review.author} 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <User className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{review.author}</h4>
                        {review.verified && (
                          <Badge variant="secondary" className="bg-green-50 text-green-700">
                            <Check className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{review.authorCompany}</p>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-gray-700">{review.text}</p>
                  <p className="mt-2 text-sm text-gray-500">Project: {review.project}</p>
                  
                  {/* Helpful Button */}
                  <div className="mt-3 flex items-center gap-4">
                    <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
                      <ThumbsUp className="h-4 w-4" />
                      Helpful ({review.helpful})
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {sortedReviews.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No reviews match your filters.</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  // Chat Modal Component
  const ChatModal = ({ isOpen, onClose }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
      { text: "Hello! I'm interested in your services.", sender: 'client' }
    ]);

    const sendMessage = (e) => {
      e.preventDefault();
      if (message.trim()) {
        setMessages([...messages, { text: message, sender: 'professional' }]);
        setMessage('');
      }
    };

    if (!isOpen) return null;

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="bg-white rounded-xl max-w-2xl w-full h-[600px] flex flex-col shadow-lg"
          >
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Chat with Client</h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`${
                      msg.sender === 'professional'
                        ? 'ml-auto bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    } rounded-lg p-3 max-w-[80%]`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <form onSubmit={sendMessage} className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 border rounded-lg px-4 py-2"
                />
                <Button type="submit">Send</Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  // Quote Details Modal Component
  const QuoteDetailsModal = ({ quote, isOpen, onClose }) => {
    const [requestType, setRequestType] = useState('quote');
    const [paymentMethod, setPaymentMethod] = useState('dollars');
  
    if (!quote) return null;
  
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="p-6 border-b" style={{ textAlign: 'left' }}>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold">{quote.category}</h3>
                    <div className="flex gap-2">
                      <Badge variant="default" className="bg-blue-50 text-blue-700">
                        international
                      </Badge>
                      {quote.tags.map((tag, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className={`border-${tag.color}-200 text-${tag.color}-700`}
                        >
                          {tag.text}
                        </Badge>
                      ))}
                    </div>
                    {/* Rating Display */}
                    <div className="flex items-center mt-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= Math.floor(quote.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">
                        ({quote.reviewCount} reviews)
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
  
              {/* Modal Content */}
              <div className="p-6 space-y-6" style={{ textAlign: 'left' }}>
                {/* Request Details Section */}
                <div className="space-y-4">
                  <h4 className="font-medium">Request Details</h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                    <p className="text-gray-700">{quote.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-gray-500 text-sm">Country</span>
                        <p className="font-medium">{quote.country}</p>
                      </div>
                      <div>
                        <span className="text-gray-500 text-sm">Region</span>
                        <p className="font-medium">{quote.region}</p>
                      </div>
                    </div>
  
                    <div>
                      <span className="text-gray-500 text-sm">City</span>
                      <p className="font-medium">{quote.city}</p>
                    </div>
  
                    <div>
                      <span className="text-gray-500 text-sm">Languages Required</span>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {quote.languages.map((language, index) => (
                          <Badge key={index} variant="secondary" className="bg-gray-100">
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </div>
  
                    <div>
                      <span className="text-gray-500 text-sm">Required Expertise</span>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {quote.expertise.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Request Type Selection */}
                <div className="space-y-4">
                  <h4 className="font-medium">Request Type</h4>
                  <div className="flex gap-4">
                    <Button
                      variant={requestType === 'quote' ? 'default' : 'outline'}
                      onClick={() => setRequestType('quote')}
                      className="flex-1"
                    >
                      Request Quote
                    </Button>
                    <Button
                      variant={requestType === 'hiring' ? 'default' : 'outline'}
                      onClick={() => setRequestType('hiring')}
                      className="flex-1"
                    >
                      Direct Hiring
                    </Button>
                  </div>
                </div>
  
                {requestType === 'quote' && (
                  <div className="space-y-4">
                    <h4 className="font-medium">Payment Method</h4>
                    <div className="flex gap-4">
                      <Button
                        variant={paymentMethod === 'dollars' ? 'default' : 'outline'}
                        onClick={() => setPaymentMethod('dollars')}
                        className="flex-1"
                      >
                        <DollarSign className="h-4 w-4 mr-2" />
                        Pay with Dollars
                      </Button>
                      <Button
                        variant={paymentMethod === 'credits' ? 'default' : 'outline'}
                        onClick={() => setPaymentMethod('credits')}
                        className="flex-1"
                        disabled={!mockUserData.hasSubscription}
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Pay with Credits
                        {!mockUserData.hasSubscription && (
                          <Lock className="h-4 w-4 ml-2 text-gray-400" />
                        )}
                      </Button>
                    </div>
  
                    {paymentMethod === 'credits' && !mockUserData.hasSubscription && (
                      <Alert className="bg-blue-50 border-blue-200">
                        <AlertDescription>
                          Credits are available only with an active subscription.
                          <Button
                            variant="link"
                            className="pl-1 text-blue-600"
                          >
                            Subscribe now
                          </Button>
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}
  
                {/* Price Summary */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="text-2xl font-bold">
                        {requestType === 'hiring' 
                          ? 'Free Chat' 
                          : paymentMethod === 'credits'
                            ? `${quote.price} Credits`
                            : `$${quote.price.toFixed(2)} USD`
                        }
                      </p>
                    </div>
                    <Button 
                      onClick={() => {
                        if (requestType === 'hiring') {
                          setShowChat(true);
                          onClose();
                        }
                      }}
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {requestType === 'hiring' ? 'Start Chat' : 'Purchase Quote'}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  // Quote Card Component with Add Review button
  const renderQuoteCard = (quote) => (
    <Card 
      key={quote.id}
      className="border border-blue-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg"
    >
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge variant="default" className="bg-blue-50 text-blue-700">
              {quote.category}
            </Badge>
            {quote.status === 'New' && (
              <Badge variant="outline" className="border-green-200 text-green-700">
                New Opportunity
              </Badge>
            )}
          </div>
          <div className="flex space-x-2">
            {quote.hasPhotos && 
              <Tooltip content="Documents Available">
                <Camera className="h-5 w-5 text-gray-500" />
              </Tooltip>
            }
            {quote.hasVideos && 
              <Tooltip content="Video Conference Available">
                <Video className="h-5 w-5 text-gray-500" />
              </Tooltip>
            }
          </div>
        </div>

        {/* Content */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {quote.title}
          </h3>
          <p className="text-gray-600 mt-1">
            {quote.description}
          </p>
          {/* Rating Display with Add Review */}
          <div className="flex items-center mt-2 space-x-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= Math.floor(quote.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-1">
              ({quote.reviewCount} reviews)
            </span>
            <Button 
              variant="link" 
              className="text-blue-600 text-sm"
              onClick={() => {
                setSelectedQuoteForReview(quote);
                setShowReviewsList(true);
              }}
            >
              View All
            </Button>
            {/* New Add Review Button */}
            {quote.isPurchased && (
              <Button 
                variant="link" 
                className="text-blue-600 text-sm"
                onClick={() => {
                  setSelectedQuoteForReview(quote);
                  setShowReviewModal(true);
                }}
              >
                Add Review
              </Button>
            )}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {quote.languages.map((language, index) => (
              <Badge key={index} variant="secondary" className="bg-gray-100">
                {language}
              </Badge>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {quote.expertise.map((skill, index) => (
              <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Customer Details */}
        <div className="space-y-3 pt-3 border-t">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-gray-500 text-sm">Client:</span>
              <p className="font-medium">{maskPrivateInfo(quote.customer.name, 'name')}</p>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Company:</span>
              <p className="font-medium">{quote.customer.company}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-gray-500 text-sm">Email:</span>
              <p className="text-blue-600">{maskPrivateInfo(quote.customer.email, 'email')}</p>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Phone:</span>
              <p>{maskPrivateInfo(quote.customer.phone, 'phone')}</p>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-500">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{quote.city}, {quote.region}</span>
            </div>
            <span className="text-gray-400">{quote.timePosted}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t space-y-3">
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => setShowQuoteDetails(quote)}
          >
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );

  // Main render
  return (
    <div className="min-h-screen bg-gray-50" style={{ textAlign: 'left' }}>
      {/* Header */}
      <SharedHeader11 />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <input
                type="text"
                placeholder="Search international opportunities..."
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Search className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
            </div>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Country"
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <Globe className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
            </div>
            
            <div>
              <Button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="w-full py-3 flex items-center justify-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100"
              >
                <Filter className="h-5 w-5" />
                Advanced Filters
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="bg-white p-6 rounded-lg border space-y-6">
              {/* Location Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Region/State"
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                  />
                  <MapPin className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
                </div>
                
                <div className="relative">
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <Building className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
                </div>
              </div>

              {/* Service Types */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Service Types
                </h3>
                <div className="flex flex-wrap gap-2">
                  {serviceTypes.map((type) => (
                    <Badge
                      key={type}
                      variant={selectedServiceTypes.includes(type) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedServiceTypes(prev =>
                        prev.includes(type)
                          ? prev.filter(t => t !== type)
                          : [...prev, type]
                      )}
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <Languages className="h-4 w-4" />
                  Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {availableLanguages.map((language) => (
                    <Badge
                      key={language.code}
                      variant={selectedLanguages.includes(language.code) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedLanguages(prev =>
                        prev.includes(language.code)
                          ? prev.filter(l => l !== language.code)
                          : [...prev, language.code]
                      )}
                    >
                      {language.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {internationalQuotes.map(quote => renderQuoteCard(quote))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center gap-2">
          <button
            className="p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === page 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            className="p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setCurrentPage(Math.min(3, currentPage + 1))}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </main>

      <div className="mt-20">
        <SharedFooter2 />
      </div>

      {/* Modals */}
      <QuoteDetailsModal
        quote={showQuoteDetails}
        isOpen={!!showQuoteDetails}
        onClose={() => setShowQuoteDetails(null)}
      />
      <ChatModal
        isOpen={showChat}
        onClose={() => setShowChat(false)}
      />
      <SettingsModal 
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
      <ProfileModal 
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
      />
      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        quote={selectedQuoteForReview}
      />
      <ReviewsListModal
        isOpen={showReviewsList}
        onClose={() => setShowReviewsList(false)}
        quote={selectedQuoteForReview}
      />
    </div>
  );
};

export default InternationalProfessional;