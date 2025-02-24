import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Button from '../components/ui/Button'; // Adjust the import path accordingly
import { CheckCircleIcon } from '@heroicons/react/solid';  // Ensure this import is at the top of your file
import { Users, FileText, ThumbsUp, MessageCircle, Home, Palette, Wrench, Zap, Package, Leaf, Heart, PawPrint, Laptop, Box, HelpCircle } from 'lucide-react';

const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
    return (
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
          {/* Logo Section */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <img 
                src="https://assests.netlify.app/assets/images/logo.png" 
                alt="Kokobeo Logo" 
                className="w-8 h-8 object-contain"
              />
              <span className="text-xl font-bold text-blue-600">Kokobeo</span>
          </div>  
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex gap-6">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Find a Professional</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Find a Job</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Subscriptions</a>
            </div>
          </div>
  
          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-6">
            {/* Sign Up Link */}
            <a
              href="/register" className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium"
            >
              Sign Up
            </a>

            {/* Log In Button */}
            <a
              href="/login" className="bg-blue-600 text-white hover:bg-blue-700 py-2 px-6 rounded-md text-sm font-semibold transition-colors"
            >
              Log In
            </a>
          </div>

  
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleMenu} className="text-gray-600 hover:text-gray-900" aria-label="Toggle menu">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
  
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white py-4 px-6 space-y-4">
            <a href="/" className="text-gray-600 hover:text-gray-900 block">Find a Professional</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 block">Find a Job</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 block">Subscriptions</a>
            <a href="/register" className="text-gray-600 hover:text-gray-900 block">Sign Up</a>
            <Button variant="default" className="bg-black text-white hover:bg-gray-800 py-2 px-6 rounded-md w-full text-center">
            <a href="/login" className="text-gray-600 hover:text-gray-900 block">Login</a>
            </Button>
          </div>
        )}
      </nav>
    );
  };

// Hero Section Component
const HeroSection = () => {
    useEffect(() => {
        // Function to randomize positions for the images
        const randomizePositions = () => {
          const images = document.querySelectorAll('.random-move');
          
          images.forEach((img) => {
            const randomTop = Math.floor(Math.random() * 70) + 10; // Random top position within the top 90% of the section
            const randomLeft = Math.floor(Math.random() * 70) + 10; // Random left position within the left 90% of the section
      
            // Apply random positions
            img.style.top = `${randomTop}%`;
            img.style.left = `${randomLeft}%`;
          });
        };
      
        // Randomize positions every 4 seconds
        const interval = setInterval(randomizePositions, 4000);
        
        // Initialize random positions on load
        randomizePositions();
      
        return () => clearInterval(interval); // Clear the interval when component is unmounted
      }, []);
      
  
    // Array of image URLs to multiply
    const images = [
      "https://assests.netlify.app/assets/images/b94591c8b7dbbc0e8e1c00bb6bdd12248aa3193d.png",
      "https://assests.netlify.app/assets/images/48d8d123b279113ab1bbf2d5e4ab19746c197c58.png",
      "https://assests.netlify.app/assets/images/9a69c65a828764fafb2e846537f7877b61b30a61.png",
      
    ];
  
    return (
      <div className="relative bg-black text-white min-h-[500px] overflow-hidden">
        <div className="absolute w-full h-full overflow-hidden">
          {/* Multiplying images by mapping over the array */}
          {images.map((imageUrl, index) => (
            <div
              key={index}
              className="random-move absolute w-64 h-48 rounded-lg overflow-hidden transition-transform hover:scale-105"
            >
              <img
                src={imageUrl}
                alt={`Professional service ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
  
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-32 text-center">
          <h1 className="text-5xl font-bold mb-4">
            The Best Professionals,<br />
            Always at Your Service
          </h1>
          <p className="text-xl text-gray-300">
            Search for every need, simply and quickly
          </p>
        </div>
      </div>
    );
  };

//   FeatureCard
  
  const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="flex-1 flex flex-col items-center px-8 py-6 border-r last:border-r-0 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg rounded-lg bg-white hover:bg-sky-50">
      <div className="mb-4">
        <Icon className="w-12 h-12 text-sky-500 transition-colors duration-200 hover:text-sky-700" strokeWidth={1} />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 text-center leading-relaxed">{description}</p>
    </div>
  );
  
  const FeaturesSection = () => {
    const features = [
      {
        icon: Users,
        title: "Wide Selection of Professionals",
        description: "Find qualified experts in your area"
      },
      {
        icon: FileText,
        title: "Free and Customized Quotes",
        description: "Request quotes easily and find the perfect offer for you"
      },
      {
        icon: ThumbsUp,
        title: "Verified Reviews",
        description: "Trust professionals with verified feedback and reviews"
      },
      {
        icon: MessageCircle,
        title: "Fast and Simple Support",
        description: "Assistance anytime you need"
      }
    ];
  
    return (
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Our Features</h2>
            <p className="text-lg text-gray-600">Discover the benefits of using Kokobeo to find the right professional for you</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

// Services Grid Section Component
const ServiceCard = ({ title, professionals, imageUrl }) => (
    <div className="relative group rounded-xl overflow-hidden cursor-pointer w-full h-[280px] transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
      <img 
        src={imageUrl} 
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white text-lg font-semibold mb-1">{title}</h3>
          <p className="text-gray-300 text-sm flex items-center gap-2">
            <Users size={14} className="text-sky-300" />
            <span>{professionals} professionals</span>
          </p>
        </div>
      </div>
    </div>
  );
  
  const ServicesGridSection = () => {
    const services = [
      { title: "Cleaning and Sanitization", professionals: "267", imageUrl: "https://assests.netlify.app/assets/images/819dfcd14b10a58a51ba2c103afe6103ceb97e07.png" },
      { title: "Events and Entertainment", professionals: "267", imageUrl: "https://assests.netlify.app/assets/images/a60372a78b3529e3afdd994d5f8b8de82570e8eb.png" },
      { title: "Home Repairs", professionals: "267", imageUrl: "https://assests.netlify.app/assets/images/3eda023e46d94f7384c90eb5bf82911c8901ff6c.png" },
      { title: "Electrical and Installations", professionals: "267", imageUrl: "https://assests.netlify.app/assets/images/7f7f258da870481b790eeb763da80cb5f3bbc7dc.png" },
      { title: "Painting and Decoration", professionals: "267", imageUrl: "https://assests.netlify.app/assets/images/ff1a45fa16e933ded95e1265a9d35b633788acb2.png" },
      { title: "Moving and Logistics", professionals: "267", imageUrl: "https://assests.netlify.app/assets/images/0ff875425a2cb2ad5f7aea02993f7baa83baa310.png" },
      { title: "Gardening and Green Maintenance", professionals: "267", imageUrl: "https://assests.netlify.app/assets/images/157e55b4b9cff2c9933cc9deb672a13d91759e9e.png" },
      { title: "Home Assistance", professionals: "267", imageUrl: "https://assests.netlify.app/assets/images/823fcaeda4b7243ec59d5eff4b7309020b739894.png" },
      { title: "Pet Services", professionals: "267", imageUrl: "https://assests.netlify.app/assets/images/13131ef23e74a2908a430540c47df58ebb376d96.png" },
      { title: "Technology and IT Support", professionals: "267", imageUrl: "https://assests.netlify.app/assets/images/15fc1113e7e77dca01425088afca0efd3c143b8f.png" }
    ];
  
    return (
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-8 text-center text-gray-900">Most Requested Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
            {services.map((service, index) => (
              <ServiceCard 
                key={index}
                title={service.title}
                professionals={service.professionals}
                imageUrl={service.imageUrl}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };
  
//   HowItWorksSection

const StepItem = ({ number, title, description }) => (
    <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left p-4 border border-gray-200 rounded-lg shadow-md transition-all hover:shadow-lg hover:scale-105">
      <div className="mb-4 flex items-center justify-center lg:justify-start">
        <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-semibold">
          {number}
        </span>
        <h4 className="text-xl font-medium text-gray-900 ml-3">{title}</h4>
      </div>
      <p className="text-xs text-gray-600">{description}</p>
    </div>
  );
  
  const HowItWorksSection = () => {
    const steps = [
      {
        title: "Search for the service you need",
        description: "Browse through the available categories and find the most suitable professional for your needs"
      },
      {
        title: "Compare offers",
        description: "Evaluate multiple quotes, read verified reviews from other clients"
      },
      {
        title: "Request a quote",
        description: "Fill out a brief description of your request and receive free, personalized quotes in no time"
      },
      {
        title: "Choose and book",
        description: "Select the ideal professional and complete the booking quickly and easily"
      }
    ];
  
    return (
      <div className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-2/3 flex-1 text-center lg:text-left">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">How Kokobeo Works:</h2>
              <p className="text-blue-500 font-semibold mb-8 text-lg">Simple, fast, and effective!</p>
  
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mb-8">
                {steps.map((step, index) => (
                  <StepItem
                    key={index}
                    number={index + 1}
                    title={step.title}
                    description={step.description}
                  />
                ))}
              </div>
  
              <Button className="bg-black text-white hover:bg-gray-800 py-3 px-6 rounded-md text-lg transition duration-300 ease-in-out transform hover:scale-105">
                Find your professional
              </Button>
            </div>
  
            <div className="lg:w-1/3 flex-shrink-0">
              <img
                src="https://assests.netlify.app/assets/images/4de8493b32bc908596d3c0bc07d562584830de2e.png"
                alt="Professional at work"
                className="rounded-lg w-full h-full object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Footer = () => (
    <footer className="bg-black text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-24">
          {/* Footer Logo & Address */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="text-2xl font-bold text-white flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-sm">
                  <img
                    src="https://assests.netlify.app/assets/images/logo.png"
                    alt="Kokobeo Logo"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                Kokobeo
              </div>
            </div>
            <div className="space-y-1 text-left">
            <p className="text-sm">Via Nazionale, 23 Milan, Italy</p>
            <p className="text-sm">VAT No: IT5028573958</p>
            </div>
          </div>
  
          {/* About Us Section */}
          <div className="text-left">
            <h3 className="text-white font-medium mb-4 tracking-wider text-lg uppercase">
              About Us
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-sm hover:text-white transition-colors duration-200">
                  Who We Are
                </a>
              </li>
              <li>
                <a href="/team" className="text-sm hover:text-white transition-colors duration-200">
                  Meet Our Team
                </a>
              </li>
              <li>
                <a href="/careers" className="text-sm hover:text-white transition-colors duration-200">
                  Careers
                </a>
              </li>
              <li>
                <a href="/blog" className="text-sm hover:text-white transition-colors duration-200">
                  Blog
                </a>
              </li>
            </ul>
          </div>
  
          {/* Services Section */}
          <div className="text-left">
            <h3 className="text-white font-medium mb-4 tracking-wider text-lg uppercase">
              Services
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/services/plumbing"
                  className="text-sm hover:text-white transition-colors duration-200"
                >
                  Plumbing Services
                </a>
              </li>
              <li>
                <a
                  href="/services/electrician"
                  className="text-sm hover:text-white transition-colors duration-200"
                >
                  Electrical Services
                </a>
              </li>
              <li>
                <a
                  href="/services/cleaning"
                  className="text-sm hover:text-white transition-colors duration-200"
                >
                  Cleaning Services
                </a>
              </li>
              <li>
                <a
                  href="/services/all"
                  className="text-sm hover:text-white transition-colors duration-200"
                >
                  View All Services
                </a>
              </li>
            </ul>
          </div>
  
          {/* Contacts Section */}
          <div className="text-left">
            <h3 className="text-white font-medium mb-4 tracking-wider text-lg uppercase">
              Contacts
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:info@kokobeo.com"
                  className="text-sm hover:text-white transition-colors duration-200"
                >
                  Email Us
                </a>
              </li>
              <li>
                <a
                  href="tel:+39 000 000 0000"
                  className="text-sm hover:text-white transition-colors duration-200"
                >
                  Call Us: +39 000 000 0000
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-sm hover:text-white transition-colors duration-200"
                >
                  Contact Form
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="text-sm hover:text-white transition-colors duration-200"
                >
                  FAQs
                </a>
              </li>
            </ul>
          </div>
        </div>
  
        {/* Footer Bottom Section */}
        <div className="mt-16 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-500">
            Copyright © {new Date().getFullYear()} - All Rights Reserved Kokobeo
          </p>
        </div>
      </div>
    </footer>
  );
    
  
  

// Main Homepage Component
const Homepage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <ServicesGridSection />
      <HowItWorksSection />
      <Footer />
    </div>
  );
};
export default Homepage;