import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Wallet, MessageCircle, User, FileText, Shield, Bell, Search, Bookmark, LogOut, Settings, Lock, AlertCircle, Briefcase, FileCheck, Menu, X, ChevronRight, Globe, Facebook, Twitter, Instagram, Linkedin, UserSearchIcon, User2, Settings2, ChartAreaIcon } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import PolicyModals from './PolicyModals';
import SharedHeader4 from '../../Headers/SharedHeader4';
import SharedFooter2 from '../../Footer/SharedFooter2';
import SharedFooter3 from '../../Footer/SharedFooter3';

import { MdReviews } from 'react-icons/md';
import ProfessionalReviewsSection from '../../components/ui/ProfessionalReviewsSection';

const InfoPopup = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white rounded-xl max-w-lg w-full p-6 relative">
        <button onClick={onClose} className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full"><X className="h-5 w-5" /></button>
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <div className="prose max-w-none">{content}</div>
      </motion.div>
    </motion.div>
  );
};

const FreelancerDashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showHiring, setShowHiring] = useState(false);
  const [showQuotes, setShowQuotes] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const StoreLinks = () => (
    <div className="mt-6 space-y-4 px-4">
      <div className="flex flex-col items-center justify-center gap-4 max-w-xs mx-auto">
        {/* Google Play Button */}
        <a 
          href="#" 
          className="w-48 h-14 flex items-center justify-center bg-black rounded-lg hover:opacity-90 transition-opacity px-4"
          style={{ 
            backgroundImage: 'linear-gradient(to bottom, #000000, #1a1a1a)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <div className="flex items-center space-x-3">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
              <path d="M3.609 1.814L13.792 12 3.61 22.186c-.28.28-.698.342-1.04.155-.342-.187-.554-.544-.554-.929V2.588c0-.385.212-.742.553-.929.342-.187.76-.125 1.04.155zm10.831 8.424l3.099-1.789c.4-.23.4-.8 0-1.03l-3.1-1.79L12.48 7.41l1.96 2.828zm-1.96-4.243l3.098-1.788c.4-.23.4-.8 0-1.03l-3.099-1.79-1.961 2.782 1.962 2.826zM4.001 2.588v18.824L12.48 12 4 2.588z"/>
            </svg>
            <div className="flex flex-col">
              <span className="text-white text-xs">GET IT ON</span>
              <span className="text-white font-medium text-lg leading-tight">Google Play</span>
            </div>
          </div>
        </a>
  
        {/* App Store Button */}
        <a 
          href="#" 
          className="w-48 h-14 flex items-center justify-center bg-black rounded-lg hover:opacity-90 transition-opacity px-4"
          style={{ 
            backgroundImage: 'linear-gradient(to bottom, #000000, #1a1a1a)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <div className="flex items-center space-x-3">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11"/>
            </svg>
            <div className="flex flex-col">
              <span className="text-white text-xs">Download on the</span>
              <span className="text-white font-medium text-lg leading-tight">App Store</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  );

  const SocialIcons = () => (
    <div className="flex justify-center space-x-6 mt-6 px-4 pb-6">
      <a 
        href="https://web.facebook.com/profile.php?id=61567111596784" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-gray-600 hover:text-blue-600 transition-colors"
      >
        <Facebook className="h-6 w-6" />
      </a>
      
      <a 
        href="https://x.com/Alldresskokobeo" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-gray-600 hover:text-blue-400 transition-colors"
      >
        <Twitter className="h-6 w-6" />
      </a>
      
      <a 
        href="https://www.instagram.com/serviceskokobeo/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-gray-600 hover:text-pink-600 transition-colors"
      >
        <Instagram className="h-6 w-6" />
      </a>
      
      <a 
        href="https://www.tiktok.com/@alldresskokobeo" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-gray-600 hover:text-black transition-colors"
      >
        {/* Using CircleDollarSign as a placeholder for TikTok since Lucide doesn't have a TikTok icon */}
        <svg 
          viewBox="0 0 24 24" 
          className="h-6 w-6"
          fill="currentColor"
        >
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1Z"/>
        </svg>
      </a>
    </div>
  );

  const sidebarItems = [
    { icon: <Home className="h-5 w-5" />, label: "Dashboard", href: "/professionals", active: true },
    { icon: <UserSearchIcon className="h-5 w-5" />, label: "Local Customers", href: "/professional" },
    { icon: <Bookmark className="h-5 w-5" />, label: "International Clients", href: "/international-professionals" },
    { icon: <MessageCircle className="h-5 w-5" />, label: "Message or Video Call", href: "/MessageAndVideoCall" },
    { icon: <User2 className="h-5 w-5" />, label: "My Profile", href: "/myprofile" },
    { icon: <Settings2 className="h-5 w-5" />, label: "My Settings", href: "/Settings" },
    // { icon: <User className="h-5 w-5" />, label: "Account Setup", href: "/international_professional_registration" },
    { icon: <ChartAreaIcon className="h-5 w-5" />, label: "Progress", href: "/Progress" },
    { icon: <FileCheck className="h-5 w-5" />, label: "My Orders", href: "/myorders" },
    { icon: <MdReviews className="h-5 w-5" />, label: "Reviews", href: "/professional/reviews" },
    { icon: <Bell className="h-5 w-5" />, label: "My Offers", href: "/myoffers" },
    { icon: <FileText className="h-5 w-5" />, label: "My Proposals", href: "/myproposals" },
    { icon: <Shield className="h-5 w-5" />, label: "Support tickets", href: "/support" },
    { icon: <Wallet className="h-5 w-5" />, label: "Wallet", href: "/wallet" },
    { icon: <FileText className="h-5 w-5" />, label: "Withdraw History", href: "/withdrawalhistroy" },
    { icon: <FileCheck className="h-5 w-5" />, label: "Subscriptions", href: "/credits" },
    // { icon: <Settings className="h-5 w-5" />, label: "Profile Settings", href: "/profilesettings" },
    { icon: <Lock className="h-5 w-5" />, label: "Change Password", href: "/changepassword" },
    { icon: <AlertCircle className="h-5 w-5" />, label: "Account Delete", href: "/DeleteAccount" },
    { icon: <LogOut className="h-5 w-5" />, label: "Log Out", href: "/login" }
  ];

  const stats = [
    { icon: <Wallet className="h-6 w-6 text-blue-600" />, title: "Wallet Balance", value: "$791.50", bgColor: "bg-blue-50" },
    { icon: <Briefcase className="h-6 w-6 text-green-600" />, title: "Total Projects", value: "32", bgColor: "bg-green-50" },
    { icon: <FileCheck className="h-6 w-6 text-yellow-600" />, title: "Complete Order", value: "24", bgColor: "bg-yellow-50" },
    { icon: <AlertCircle className="h-6 w-6 text-purple-600" />, title: "Active Order", value: "30", bgColor: "bg-purple-50" }
  ];

  const orders = [
    { budget: "$100.00", time: "Less than a week", status: "complete", date: "Dec 30, 2024", id: "627" },
    { budget: "$40.00", time: "1 Days", status: "complete", date: "Dec 28, 2024", id: "626" },
    { budget: "$40.00", time: "1 Days", status: "complete", date: "Dec 26, 2024", id: "625" },
    { budget: "$533.00", time: "less than a week", status: "complete", date: "Dec 23, 2024", id: "624" },
    { budget: "$20.00", time: "1 Days", status: "complete", date: "Dec 21, 2024", id: "623" }
  ];

  const projects = ["Project1", "Project2", "Project3", "Project4", "Project5"];

  return (
    <div className="min-h-screen bg-gray-50" style={{ paddingTop: '64px' }}>
      {/* Fixed Header */}
      <div className="fixed top-0 inset-x-0 z-50 bg-white border-b h-16">
        <SharedHeader4 />
      </div>

      <div className="flex min-h-[calc(100vh-64px)]">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block fixed left-0 top-16 bottom-0 w-64 bg-white border-r overflow-y-auto">
          <nav className="p-4 space-y-1">
            {sidebarItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                  item.active ? 'text-blue-600 bg-blue-50 font-medium' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
          <StoreLinks />
          <SocialIcons />
        </aside>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              />
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                className="fixed inset-y-0 left-0 w-full max-w-xs bg-white shadow-xl z-50 lg:hidden overflow-y-auto"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <img src="https://assests.netlify.app/assets/images/logo.png" alt="Logo" className="h-8 w-8" />
                      <span className="text-blue-600 text-lg font-bold">Kokobeo</span>
                    </div>
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  <nav className="space-y-1">
                    {sidebarItems.map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                          item.active ? 'text-blue-600 bg-blue-50 font-medium' : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </a>
                    ))}
                  </nav>
                  <StoreLinks />
                  <SocialIcons />
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 lg:pl-64"  style={{ textAlign: 'left' }}>
          <main className="p-4 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Welcome Section */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Welcome back, John!</h1>
                  <p className="text-gray-600 mt-1">Here's what's happening with your projects today.</p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <Card key={index} className={`${stat.bgColor} p-6 transition-all hover:shadow-lg`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="mt-1 text-sm text-gray-600">{stat.title}</div>
                  </Card>
                ))}
              </div>

              {/* Orders Section */}
              <Card className="overflow-hidden">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 border-b gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Latest Orders</h2>
                    <p className="text-sm text-gray-600 mt-1">Track and manage your recent orders</p>
                  </div>
                  <Button className="w-full sm:w-auto">View All Orders</Button>
                </div>
                <div className="overflow-x-auto">
                  <div className="inline-block min-w-full align-middle">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                          <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                          <th scope="col" className="hidden md:table-cell px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Time</th>
                          <th scope="col" className="hidden sm:table-cell px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th scope="col" className="hidden lg:table-cell px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {orders.map((order, index) => (
                          <tr key={index} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{order.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.budget}</td>
                            <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.time}</td>
                            <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {order.status}
                              </span>
                            </td>
                            <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                              <Button variant="outline" size="sm">View Details</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Card>


              {/* Projects Section */}
              <Card className="overflow-hidden"  style={{ textAlign: 'left' }}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 border-b gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Active Projects</h2>
                    <p className="text-sm text-gray-600 mt-1">Your ongoing project activities</p>
                  </div>
                  <Button className="w-full sm:w-auto">View All Projects</Button>
                </div>
                <div className="overflow-x-auto">
                  <div className="inline-block min-w-full align-middle">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Title</th>
                          <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {projects.map((project, index) => (
                          <tr key={index} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900 line-clamp-1">{project}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <Button variant="outline" size="sm">Edit Project</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Card>
            </div>
          </main>

          {/* Footer */}
          <footer className="bg-white border-t mt-auto">
            <div className="w-full">
              <SharedFooter3 />
            </div>
          </footer>
        </div>
      </div>

      {/* Mobile Menu Button */}
      {/* <button 
        onClick={() => setIsMobileMenuOpen(true)}
        className="fixed bottom-6 right-6 lg:hidden z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        <Menu className="h-6 w-6" />
      </button> */}
    </div>
  );
};

export default FreelancerDashboard;