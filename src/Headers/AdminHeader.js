import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Bell, User, ChevronDown, Shield, Menu, X, BarChart2, 
  Users, Building2, Globe, Tool, ShoppingBag, Wallet, 
  MessageSquare, Settings, BadgeCheck, HelpCircle, Clock, 
  FileText, DollarSign, ArrowUpRight, AlertCircle, Star, 
  BookOpen, ArrowUp, MapPin, TowerControlIcon, MessageCircle,
  WrenchIcon, CreditCard, PieChart, Database, FormInput,
  WhatsappIcon, BookText, Newspaper, BellRing, LayoutDashboard,
  Languages, DollarSign as Currency, Settings2, Sliders,
  Megaphone, Flag, Send, CheckSquare, UserCog,
  MessageCircleIcon,
  MessageSquareIcon
} from 'lucide-react';
import { LiaWhatsapp } from 'react-icons/lia';

const AdminHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const activeItemRef = useRef(null);
  const desktopSidebarRef = useRef(null);
  const mobileSidebarRef = useRef(null);

  // Function to scroll to active item
  const scrollToActiveItem = (sidebarRef) => {
    if (activeItemRef.current && sidebarRef.current) {
      const sidebar = sidebarRef.current;
      const activeItem = activeItemRef.current;
      
      // Calculate the scroll position
      const itemOffset = activeItem.offsetTop;
      const sidebarHeight = sidebar.clientHeight;
      const itemHeight = activeItem.clientHeight;
      
      // Center the item in the viewport
      const scrollPosition = itemOffset - (sidebarHeight / 2) + (itemHeight / 2);
      
      // Ensure we don't scroll past the top
      sidebar.scrollTo({
        top: Math.max(0, scrollPosition),
        behavior: 'smooth'
      });
    }
  };

  // Handle scroll for both desktop and mobile when location changes
  useEffect(() => {
    // Scroll desktop sidebar
    if (desktopSidebarRef.current) {
      scrollToActiveItem(desktopSidebarRef);
    }
    
    // Scroll mobile sidebar if it's open
    if (mobileSidebarRef.current && isMobileMenuOpen) {
      scrollToActiveItem(mobileSidebarRef);
    }
  }, [location.pathname, isMobileMenuOpen]);

  // Scroll mobile sidebar when it's opened
  useEffect(() => {
    if (isMobileMenuOpen && mobileSidebarRef.current) {
      scrollToActiveItem(mobileSidebarRef);
    }
  }, [isMobileMenuOpen]);

  const menuItems = [
    {
      heading: 'OVERVIEW',
      items: [
        { icon: BarChart2, label: 'Dashboard', href: '/admin/dashboard' }
      ]
    },
    {
      heading: 'USER MANAGEMENT',
      items: [
        { icon: Users, label: 'All Users', href: '/admin/usermanagement/alluser', badge: '1.2k' },
        { icon: Building2, label: 'Local Professionals', href: '/admin/usermanagement/localprofesionals', badge: '450' },
        { icon: Globe, label: 'International Professionals', href: '/admin/usermanagement/internationalprofesionals', badge: '320' },
        { icon: BadgeCheck, label: 'Verification Requests', href: '/admin/usermanagement/verificationrequests', badge: '25' }
      ]
    },
    {
      heading: 'BUSINESS MANAGEMENT',
      items: [
        { icon: Building2, label: 'Business Directory', href: '/admin/businesses' },
        { icon: TowerControlIcon, label: 'Service Categories', href: '/admin/categories' },
        { icon: AlertCircle, label: 'Emergency Services', href: '/admin/emergency-services', badge: '12' },
        { icon: MapPin, label: 'Service Areas', href: '/admin/service-areas' }
      ]
    },
    {
      heading: 'ORDER MANAGEMENT',
      items: [
        { icon: ShoppingBag, label: 'All Orders', href: '/admin/orders', badge: '56' },
        { icon: Clock, label: 'Pending Orders', href: '/admin/orders/pending', badge: '28' },
        { icon: AlertCircle, label: 'Emergency Requests', href: '/admin/orders/emergency', badge: '8' },
        { icon: FileText, label: 'Quotes', href: '/admin/quotes', badge: '34' }
      ]
    },
    {
      heading: 'FINANCIAL MANAGEMENT',
      items: [
        { icon: Wallet, label: 'Transactions', href: '/admin/transactions' },
        { icon: DollarSign, label: 'Revenue', href: '/admin/revenue' },
        { icon: ArrowUpRight, label: 'Payouts', href: '/admin/payouts', badge: '15' },
        { icon: FileText, label: 'Invoices', href: '/admin/invoices' }
      ]
    },
    {
      heading: 'CONTENT MANAGEMENT',
      items: [
        { icon: Star, label: 'Reviews & Ratings', href: '/admin/reviews', badge: '45' },
        { icon: MessageSquare, label: 'Support Tickets', href: '/admin/support', badge: '23' },
        { icon: HelpCircle, label: 'Help Center', href: '/admin/help-center' },
        { icon: Bell, label: 'Announcements', href: '/admin/announcements' }
      ]
    },
    {
      heading: 'ANALYTICS',
      items: [
        { icon: BarChart2, label: 'Business Analytics', href: '/admin/analytics/business' },
        { icon: Users, label: 'User Analytics', href: '/admin/analytics/users' },
        { icon: ArrowUp, label: 'Growth Metrics', href: '/admin/analytics/growth' }
      ]
    },
    {
      heading: 'SETTINGS',
      items: [
        { icon: Settings, label: 'General Settings', href: '/admin/settings' },
        { icon: Shield, label: 'Security', href: '/admin/security' },
        { icon: BookOpen, label: 'Logs', href: '/admin/logs' }
      ]
    },
    {
      heading: 'COMMUNICATION TOOLS',
      items: [
        { icon: MessageSquareIcon, label: 'WhatsApp Integration', href: '/admin/tools/whatsapp' },
        { icon: MessageSquare, label: 'Chat Management', href: '/admin/tools/chat' },
        { icon: BellRing, label: 'Custom Notifications', href: '/admin/tools/notifications' }
      ]
    },
    {
      heading: 'FORM MANAGEMENT',
      items: [
        { icon: FormInput, label: 'Category Forms', href: '/admin/forms/categories' },
        { icon: UserCog, label: 'Professional Forms', href: '/admin/forms/professionals' },
        { icon: FileText, label: 'Quote Forms', href: '/admin/forms/quotes' }
      ]
    },
    {
      heading: 'SUBSCRIPTION & PRICING',
      items: [
        { icon: CreditCard, label: 'Quote Pricing', href: '/admin/pricing/quotes' },
        { icon: Settings2, label: 'Subscription Plans', href: '/admin/pricing/subscriptions' },
        { icon: MapPin, label: 'Regional Pricing', href: '/admin/pricing/regions' }
      ]
    },
    {
      heading: 'PROFESSIONAL SCORING',
      items: [
        { icon: Star, label: 'Performance Metrics', href: '/admin/scoring/metrics' },
        { icon: ArrowUp, label: 'Rankings', href: '/admin/scoring/rankings' },
        { icon: Settings, label: 'Scoring Settings', href: '/admin/scoring/settings' }
      ]
    },
    {
      heading: 'MILESTONE MANAGEMENT',
      items: [
        { icon: CheckSquare, label: 'Payment Milestones', href: '/admin/milestones/payments' },
        { icon: Sliders, label: 'Commission Settings', href: '/admin/milestones/commission' },
        { icon: Shield, label: 'Deposit Rules', href: '/admin/milestones/deposits' }
      ]
    },
    {
      heading: 'CONTENT EDITOR',
      items: [
        { icon: FileText, label: 'Terms & Conditions', href: '/admin/editor/terms' },
        { icon: MessageSquare, label: 'Marketing Popups', href: '/admin/editor/marketing' }
      ]
    },
    {
      heading: 'INTERNATIONAL',
      items: [
        { icon: Globe, label: 'Region Settings', href: '/admin/international/regions' },
        { icon: Languages, label: 'Language Manager', href: '/admin/international/languages' },
        { icon: Currency, label: 'Currency Settings', href: '/admin/international/currencies' }
      ]
    }
  ];

  const NavItem = ({ item, onClick }) => {
    const isActive = location.pathname === item.href;
    
    return (
      <Link
        ref={isActive ? activeItemRef : null}
        to={item.href}
        className="flex items-center justify-between px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded"
        onClick={onClick}
        style={{ textAlign: 'left' }}
      >
        <div className="flex items-center gap-3">
          <item.icon className={`h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
          <span className={isActive ? 'text-blue-600' : ''}>{item.label}</span>
        </div>
        {item.badge && (
          <span className="text-blue-600 text-sm">{item.badge}</span>
        )}
      </Link>
    );
  };

  return (
    <>
      <header className="bg-white border-b fixed top-0 inset-x-0 z-40 h-16" style={{ textAlign: 'left' }}>
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)} 
              className="lg:hidden p-2"
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link to="/admin/dashboard" className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-blue-600">Kokobeo</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)} 
                className="flex items-center gap-2"
              >
                <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5" />
                </div>
                <span className="font-medium">Admin</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg border">
                  <div className="p-4 border-b">
                    <p className="font-medium">Admin Account</p>
                    <p className="text-sm text-gray-500">admin@kokobeo.com</p>
                  </div>
                  <Link to="/admin/settings" className="block px-4 py-2 hover:bg-gray-50">Settings</Link>
                  <Link to="/admin/security" className="block px-4 py-2 hover:bg-gray-50">Security</Link>
                  <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50 border-t">Log Out</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <aside 
        ref={desktopSidebarRef} 
        className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r hidden lg:block overflow-y-auto"
      >
        <nav className="py-4 mb-16">
          {menuItems.map((section, index) => (
            <div key={index} className="mb-6">
              <h3 className="px-4 text-xs font-medium text-gray-500 mb-2">{section.heading}</h3>
              <div className="space-y-1">
                {section.items.map((item, itemIndex) => (
                  <NavItem key={itemIndex} item={item} />
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" style={{ textAlign: 'left' }}>
          <div 
            className="fixed inset-0 bg-black/50" 
            onClick={() => setIsMobileMenuOpen(false)} 
          />
          <aside 
            ref={mobileSidebarRef} 
            className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg overflow-y-auto"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <Shield className="h-8 w-8 text-blue-600" />
                <span className="font-bold text-xl text-blue-600">Kokobeo</span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="p-4 pb-20">
              {menuItems.map((section, index) => (
                <div key={index} className="mb-6">
                  <h3 className="px-4 text-xs font-medium text-gray-500 mb-2">{section.heading}</h3>
                  <div className="space-y-1">
                    {section.items.map((item, itemIndex) => (
                      <NavItem 
                        key={itemIndex} 
                        item={item} 
                        onClick={() => setIsMobileMenuOpen(false)} 
                      />
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
};

export default AdminHeader;