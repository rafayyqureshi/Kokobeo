import React, { useState } from 'react';
import {
  FileText, Clock, Calendar, DollarSign,
  Search, X, Shield, MessageCircle,
  CheckCircle, AlertCircle, Filter,
  List, Grid, Star, User, Package,
  MoreHorizontal, ChevronDown, ThumbsUp,
  ThumbsDown, Timer, Briefcase, MapPin,
  Mail, Phone, Send, Heart
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/badge';
import SharedHeader5 from '../Headers/SharedHeader5';
import SharedFooter2 from '../Footer/SharedFooter2';

// Cover Letter Modal Component
const CoverLetterModal = ({ isOpen, onClose, coverLetter, professional }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="flex justify-between items-start p-6 border-b">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Cover Letter</h3>
            <p className="text-sm text-gray-600">From {professional.name}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                <User className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <div className="font-medium">{professional.name}</div>
                <div className="text-sm text-gray-600">
                  <span>{professional.completedJobs} jobs completed</span>
                  <span className="mx-2">•</span>
                  <span>{professional.rating} rating</span>
                </div>
              </div>
            </div>
          </div>

          <div className="prose max-w-none">
            {coverLetter.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button>
            <MessageCircle className="h-4 w-4 mr-2" />
            Message Professional
          </Button>
        </div>
      </div>
    </div>
  );
};

const MyOffersPage = () => {
  // State management
  const [selectedTab, setSelectedTab] = useState('received');
  const [viewMode, setViewMode] = useState('list');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    offerType: 'all',
    status: 'all',
    timeframe: 'all',
  });

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  // Mock data for received offers
  const receivedOffers = [
    {
      id: 'OFF-2024-001',
      type: 'local',
      jobTitle: 'Kitchen Plumbing Repair',
      description: 'Complete repair of kitchen sink and pipes',
      professional: {
        id: 'PRO123',
        name: 'Mike Wilson',
        rating: 4.9,
        reviews: 89,
        completedJobs: 156,
        verified: true,
        location: 'Toronto, Canada',
        responseRate: '98%',
        avgResponseTime: '< 30 min'
      },
      offer: {
        amount: 350,
        currency: 'USD',
        timeline: '3-4 hours',
        availability: [
          { date: '2024-01-22', slots: ['09:00-12:00', '14:00-17:00'] },
          { date: '2024-01-23', slots: ['09:00-12:00', '14:00-17:00'] }
        ],
        includesPartsAndMaterials: true,
        warranty: '30 days',
        status: 'pending',
        receivedAt: '2024-01-20T10:30:00Z',
        validUntil: '2024-01-22T10:30:00Z'
      },
      coverLetter: "I've reviewed your plumbing issue and I'm confident I can fix it effectively. I have extensive experience with similar kitchen plumbing repairs. Over the past 10 years, I've successfully completed hundreds of similar projects.\n\nBased on your description, I believe the issue might be related to the sink's drainage system or possibly the water supply lines. I'll bring all necessary tools and replacement parts to ensure we can complete the repair in one visit.\n\nI specialize in efficient, long-lasting repairs and always clean up thoroughly after completing the work. I also provide a 30-day warranty on all my repairs for your peace of mind.\n\nI've proposed several convenient time slots and can be flexible if needed. Looking forward to helping you resolve this issue!",
      attachments: [
        { name: 'Service_Details.pdf', size: '245 KB' },
        { name: 'Previous_Work_Samples.pdf', size: '1.2 MB' }
      ]
    },
    {
      id: 'OFF-2024-002',
      type: 'international',
      jobTitle: 'E-commerce Website Development',
      description: 'Full-stack development of an e-commerce platform',
      professional: {
        id: 'PRO456',
        name: 'Sarah Chen',
        rating: 4.95,
        reviews: 178,
        completedJobs: 234,
        verified: true,
        location: 'Singapore',
        responseRate: '100%',
        avgResponseTime: '< 1 hour'
      },
      offer: {
        amount: 4500,
        currency: 'USD',
        timeline: '6 weeks',
        milestones: [
          { title: 'Design and Planning', amount: 1000, duration: '1 week' },
          { title: 'Frontend Development', amount: 1500, duration: '2 weeks' },
          { title: 'Backend Development', amount: 1500, duration: '2 weeks' },
          { title: 'Testing and Deployment', amount: 500, duration: '1 week' }
        ],
        status: 'pending',
        receivedAt: '2024-01-19T15:45:00Z',
        validUntil: '2024-01-26T15:45:00Z'
      },
      coverLetter: "I'm excited about your e-commerce project and believe I can deliver an exceptional solution. With over 8 years of experience in full-stack development and a special focus on e-commerce platforms, I have the expertise needed to bring your vision to life.\n\nI've worked with various payment gateways, inventory management systems, and have experience optimizing e-commerce platforms for high traffic and conversion rates. My recent projects include developing scalable solutions for businesses similar to yours.\n\nI've carefully structured the project into manageable milestones to ensure steady progress and regular feedback. Each phase includes thorough testing and documentation.\n\nI'm confident we can create a robust, user-friendly platform that will help grow your business. Looking forward to discussing this further!",
      attachments: [
        { name: 'Portfolio.pdf', size: '3.5 MB' },
        { name: 'Project_Timeline.pdf', size: '450 KB' }
      ],
      portfolio: [
        { title: 'Fashion E-commerce Site', link: 'https://example.com/project1' },
        { title: 'Electronics Store', link: 'https://example.com/project2' }
      ]
    }
  ];

  // Mock data for sent offers
  const sentOffers = [
    {
      id: 'OFF-2024-003',
      type: 'local',
      jobTitle: 'Home Theater Installation',
      client: {
        name: 'John Smith',
        location: 'Toronto, Canada',
        memberSince: '2023'
      },
      offer: {
        amount: 600,
        currency: 'USD',
        timeline: '1 day',
        status: 'accepted',
        sentAt: '2024-01-18T09:15:00Z'
      }
    }
  ];

  // Offer Card Component
  const OfferCard = ({ offer, isSentOffer = false }) => {
    const isInternational = offer.type === 'international';
    const isPending = offer.offer?.status === 'pending';

    const handleReadMore = () => {
      setSelectedOffer(offer);
      setModalOpen(true);
    };

    // Sent offer card
    if (isSentOffer) {
      return (
        <Card className="p-4 md:p-6 hover:shadow-lg transition-shadow">
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base md:text-lg font-semibold text-gray-900">
                    {offer.jobTitle}
                  </h3>
                  <Badge className={`
                    ${offer.type === 'international' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}
                  `}>
                    {offer.type === 'international' ? 'International' : 'Local'}
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                  <span>For: {offer.client.name}</span>
                  <span className="hidden md:inline">•</span>
                  <span>{offer.client.location}</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="shrink-0">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600">Offered Amount</div>
                <div className="text-lg font-semibold">
                  {offer.offer.currency} {offer.offer.amount.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Timeline</div>
                <div className="font-medium">{offer.offer.timeline}</div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <Badge className={`
                w-fit ${offer.offer.status === 'accepted' ? 'bg-green-100 text-green-800' : 
                  offer.offer.status === 'declined' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'}
              `}>
                {offer.offer.status.charAt(0).toUpperCase() + offer.offer.status.slice(1)}
              </Badge>
              <div className="text-sm text-gray-500">
                Sent {new Date(offer.offer.sentAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </Card>
      );
    }

    // Received offer card
    return (
      <Card className="p-4 md:p-6 hover:shadow-lg transition-shadow" style={{ textAlign: 'left' }}>
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base md:text-lg font-semibold text-gray-900">
                  {offer.jobTitle}
                </h3>
                <Badge className={`
                  ${offer.type === 'international' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}
                `}>
                  {offer.type === 'international' ? 'International' : 'Local'}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">
                {offer.description}
              </p>
            </div>
            <Button variant="ghost" size="sm" className="shrink-0">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>

          {/* Professional Info */}
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
              <User className="h-6 w-6 text-gray-600" />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium">{offer.professional.name}</span>
                {offer.professional.verified && (
                  <Badge className="bg-green-50 text-green-700">Verified</Badge>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span>{offer.professional.rating}</span>
                </div>
                <span>({offer.professional.reviews} reviews)</span>
                <span className="hidden md:inline">•</span>
                <span>{offer.professional.completedJobs} jobs completed</span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Timer className="h-4 w-4" />
                  <span>{offer.professional.avgResponseTime} response</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{offer.professional.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Offer Details */}
<div className="space-y-6">
  {/* Price and Timeline */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <div className="text-sm text-gray-600">Budget</div>
      <div className="text-lg font-semibold">
        {offer.offer.currency} {offer.offer.amount.toLocaleString()}
      </div>
    </div>
    <div>
      <div className="text-sm text-gray-600">Timeline</div>
      <div className="font-medium">{offer.offer.timeline}</div>
    </div>
  </div>

  {/* Milestones for International Projects */}
  {isInternational && offer.offer.milestones && (
    <div className="space-y-2">
      <h4 className="font-medium">Proposed Milestones</h4>
      <div className="space-y-2 overflow-x-auto">
        <div className="min-w-[600px]">
          {offer.offer.milestones.map((milestone, index) => (
            <div key={index} className="flex justify-between items-center text-sm border-b pb-2">
              <div>
                <span className="font-medium">{milestone.title}</span>
                <span className="text-gray-600 ml-2">({milestone.duration})</span>
              </div>
              <span className="font-medium">
                {offer.offer.currency} {milestone.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )}

  {/* Availability for Local Services */}
  {!isInternational && offer.offer.availability && (
    <div className="space-y-2">
      <h4 className="font-medium">Available Time Slots</h4>
      <div className="space-y-2">
        {offer.offer.availability.map((slot, index) => (
          <div key={index} className="flex flex-wrap items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-gray-400 shrink-0" />
            <span>{new Date(slot.date).toLocaleDateString()}: </span>
            <span className="text-gray-600">
              {slot.slots.join(', ')}
            </span>
          </div>
        ))}
      </div>
    </div>
  )}

  {/* Additional Details */}
  {!isInternational && (
    <div className="flex flex-wrap gap-4 text-sm">
      {offer.offer.includesPartsAndMaterials && (
        <div className="flex items-center gap-1 text-green-600">
          <CheckCircle className="h-4 w-4 shrink-0" />
          <span>Parts & Materials Included</span>
        </div>
      )}
      {offer.offer.warranty && (
        <div className="flex items-center gap-1 text-blue-600">
          <Shield className="h-4 w-4 shrink-0" />
          <span>{offer.offer.warranty} Warranty</span>
        </div>
      )}
    </div>
  )}
</div>

{/* Cover Letter Preview */}
<div>
  <p className="text-gray-600 text-sm line-clamp-3">
    {offer.coverLetter}
  </p>
  <button 
    className="text-blue-600 text-sm hover:text-blue-700 mt-1"
    onClick={handleReadMore}
  >
    Read More
  </button>
</div>

{/* Attachments */}
{offer.attachments?.length > 0 && (
  <div className="flex flex-wrap gap-2">
    {offer.attachments.map((file, index) => (
      <div key={index} className="flex items-center gap-2 text-sm bg-gray-50 px-3 py-1.5 rounded-lg">
        <FileText className="h-4 w-4 text-gray-400 shrink-0" />
        <span>{file.name}</span>
        <span className="text-gray-500">({file.size})</span>
      </div>
    ))}
  </div>
)}

{/* Action Buttons */}
<div className="flex flex-col md:flex-row items-start md:items-center gap-3">
  <div className="flex flex-wrap items-center gap-2">
    {isPending ? (
      <>
        <Button className="flex items-center gap-2">
          <ThumbsUp className="h-4 w-4" />
          Accept Offer
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <ThumbsDown className="h-4 w-4" />
          Decline
        </Button>
      </>
    ) : (
      <Badge className={`
        ${offer.offer.status === 'accepted' ? 'bg-green-100 text-green-800' : 
          offer.offer.status === 'declined' ? 'bg-red-100 text-red-800' :
          'bg-gray-100 text-gray-800'}
      `}>
        {offer.offer.status.charAt(0).toUpperCase() + offer.offer.status.slice(1)}
      </Badge>
    )}
    
    <Button variant="outline" className="flex items-center gap-2">
      <MessageCircle className="h-4 w-4" />
      Message
    </Button>
  </div>

  {isPending && (
    <div className="md:flex-1 md:text-right w-full md:w-auto">
      <div className="text-sm text-gray-500">
        Offer expires in {/* Calculate time remaining */}
      </div>
    </div>
  )}
</div>
</div>
</Card>
);
};

return (
<div className="min-h-screen bg-gray-50" style={{ textAlign: 'left' }}>
  <SharedHeader5 />
  
  <main className="max-w-7xl mx-auto px-4 py-6 md:py-8">
    {/* Header Section */}
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">My Offers</h1>
        <p className="text-gray-600">
          Review and manage offers from professionals
        </p>
      </div>
    </div>

            {/* Filters and Views */}
            <div className="bg-white border rounded-lg p-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Left side - Tabs */}
            <div className="flex items-center gap-2 md:gap-4 w-full sm:w-auto">
              <button
                onClick={() => setSelectedTab('received')}
                className={`flex-1 sm:flex-none px-3 md:px-4 py-2 rounded-lg text-sm font-medium ${
                  selectedTab === 'received'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Received ({receivedOffers.length})
              </button>
              <button
                onClick={() => setSelectedTab('sent')}
                className={`flex-1 sm:flex-none px-3 md:px-4 py-2 rounded-lg text-sm font-medium ${
                  selectedTab === 'sent'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Sent ({sentOffers.length})
              </button>
            </div>

            {/* Right side - Actions */}
            <div className="flex flex-wrap items-center gap-2 md:gap-3 w-full sm:w-auto">
              {/* Search */}
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search offers..."
                  className="w-full sm:w-auto pl-9 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Filter Button */}
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <Filter className="h-4 w-4" />
                <span className="hidden md:inline">Filters</span>
                <ChevronDown className="h-4 w-4" />
              </Button>

              {/* View Toggle */}
              <div className="flex border rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${
                    viewMode === 'list'
                      ? 'bg-blue-50 text-blue-700'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${
                    viewMode === 'grid'
                      ? 'bg-blue-50 text-blue-700'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          {filterOpen && (
            <div className="mt-4 pt-4 border-t">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Offer Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Offer Type
                  </label>
                  <select
                    value={filters.offerType}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      offerType: e.target.value
                    }))}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="all">All Types</option>
                    <option value="local">Local Services</option>
                    <option value="international">International Services</option>
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      status: e.target.value
                    }))}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="declined">Declined</option>
                  </select>
                </div>

                {/* Timeframe Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Timeframe
                  </label>
                  <select
                    value={filters.timeframe}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      timeframe: e.target.value
                    }))}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="this-week">This Week</option>
                    <option value="this-month">This Month</option>
                    <option value="last-3-months">Last 3 Months</option>
                  </select>
                </div>
              </div>

              {/* Filter Actions */}
              <div className="flex flex-col sm:flex-row sm:justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={() => {
                    setFilters({
                      offerType: 'all',
                      status: 'all',
                      timeframe: 'all'
                    });
                  }}
                >
                  Clear Filters
                </Button>
                <Button className="w-full sm:w-auto">
                  Apply Filters
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Offers Grid/List */}
        <div className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6'
            : 'space-y-4 md:space-y-6'
        }>
          {selectedTab === 'received' ? (
            receivedOffers.length > 0 ? (
              receivedOffers.map(offer => (
                <OfferCard key={offer.id} offer={offer} />
              ))
            ) : (
              <div className="text-center py-8 md:py-12">
                <div className="mb-4">
                  <Package className="h-12 w-12 text-gray-400 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Offers Received
                </h3>
                <p className="text-gray-600 mb-4">
                  You haven't received any offers yet.
                </p>
              </div>
            )
          ) : (
            sentOffers.length > 0 ? (
              sentOffers.map(offer => (
                <OfferCard key={offer.id} offer={offer} isSentOffer={true} />
              ))
            ) : (
              <div className="text-center py-8 md:py-12">
                <div className="mb-4">
                  <Send className="h-12 w-12 text-gray-400 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Offers Sent
                </h3>
                <p className="text-gray-600">
                  You haven't sent any offers yet.
                </p>
              </div>
            )
          )}
        </div>

{/* Pagination */}
{(selectedTab === 'received' ? receivedOffers : sentOffers).length > 0 && (
  <div className="mt-6 md:mt-8">
    <nav className="flex flex-col sm:flex-row justify-center items-center gap-2">
      <Button variant="outline" className="w-full sm:w-24">Previous</Button>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((page) => (
          <Button
            key={page}
            variant={page === 1 ? 'default' : 'ghost'}
            className="w-8 h-8 md:w-10 md:h-10"
          >
            {page}
          </Button>
        ))}
      </div>
      <Button variant="outline" className="w-full sm:w-24">Next</Button>
    </nav>
  </div>
)}

{/* Modal */}
{selectedOffer && (
  <CoverLetterModal
    isOpen={modalOpen}
    onClose={() => {
      setModalOpen(false);
      setSelectedOffer(null);
    }}
    coverLetter={selectedOffer.coverLetter}
    professional={selectedOffer.professional}
  />
)}
      </main>
      <br></br>
      <br></br>

      <br></br>
      <br></br>
      <br></br>

      <SharedFooter2 />
    </div>
  );
};

export default MyOffersPage;