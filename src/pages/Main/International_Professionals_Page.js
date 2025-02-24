import React, { useState } from 'react';
import { 
  Search, Filter, MapPin, Clock, 
  DollarSign, Star, Shield, X, 
  ChevronDown, FileText, MessageCircle,
  Users, Info, Mail, Phone, Calendar,
  BadgeCheck, Globe, Briefcase, Award,
  Sliders, Heart, ExternalLink, Menu,
  List, Grid, Bell, User
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/card';

const InternationalProfessionalsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedExpertise, setSelectedExpertise] = useState([]);
  const [priceRange, setPriceRange] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Mock data
  const jobs = [
    {
      id: 1,
      title: "International Business Contract Review & Negotiation",
      category: "Legal Services",
      type: "Fixed Price",
      description: "We are seeking an experienced international business lawyer to review and negotiate contracts for our European market expansion. The ideal candidate will have extensive experience in EU business law and cross-border transactions.",
      budget: "$2,000 - $5,000",
      deadline: "2 weeks",
      languages: ["English", "French", "German"],
      location: "Remote - European Time Zones",
      postedDate: "2 days ago",
      status: "Featured",
      hasAttachments: true,
      clientRating: 4.8,
      clientReviews: 12,
      expertise: ["Contract Law", "International Business", "Negotiation"],
      requiredSkills: ["EU Law", "Commercial Law", "Contract Drafting"],
      proposals: 8,
      clientLocation: "United Kingdom",
      clientVerified: true,
      paymentVerified: true,
      timeRequirement: "Est. Time: 20-25 hrs/week",
      projectSize: "Large",
      clientHistory: {
        totalSpent: "$50K+",
        projectsPosted: 15,
        hireRate: "85%"
      }
    },
    {
      id: 2,
      title: "Global Tax Strategy Consultation for Tech Startup",
      category: "Tax Services",
      type: "Hourly",
      description: "Tech startup seeking tax expert for international expansion strategy. Need comprehensive guidance on multi-jurisdictional tax implications, transfer pricing, and tax-efficient structure setup.",
      budget: "$150-200/hour",
      deadline: "Long term engagement",
      languages: ["English"],
      location: "Remote - Global",
      postedDate: "1 day ago",
      status: "Urgent",
      hasAttachments: true,
      clientRating: 4.9,
      clientReviews: 24,
      expertise: ["International Tax", "Corporate Tax", "Transfer Pricing"],
      requiredSkills: ["Tax Planning", "Transfer Pricing", "Tech Industry"],
      proposals: 5,
      clientLocation: "United States",
      clientVerified: true,
      paymentVerified: true,
      timeRequirement: "Est. Time: 10-15 hrs/week",
      projectSize: "Medium",
      clientHistory: {
        totalSpent: "$100K+",
        projectsPosted: 28,
        hireRate: "92%"
      }
    }
  ];

  const filters = {
    countries: ["United States", "Canada", "United Kingdom", "Germany", "France", "Italy", "Spain"],
    services: ["Legal Services", "Financial Services", "Business Consulting", "Tax Services", "International Trade"],
    languages: ["English", "French", "German", "Spanish", "Italian", "Mandarin", "Japanese"],
    expertise: ["Contract Law", "International Tax", "Business Strategy", "Corporate Law", "Intellectual Property"],
    priceRanges: ["$0-1,000", "$1,000-5,000", "$5,000-10,000", "$10,000+"],
    projectSizes: ["Small", "Medium", "Large"]
  };

  const JobCard = ({ job, viewMode }) => (
    <Card className={`p-6 hover:shadow-lg transition-shadow border-l-4 ${
      job.status === 'Featured' ? 'border-l-blue-500' : 
      job.status === 'Urgent' ? 'border-l-red-500' : 'border-l-transparent'
    }`}>
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        {/* Left Column - Job Info */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                  {job.title}
                </h3>
                {job.status && (
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    job.status === 'Featured' ? 'bg-blue-100 text-blue-800' :
                    job.status === 'Urgent' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {job.status}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  {job.category}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {job.postedDate}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {job.clientVerified && (
                <span className="flex items-center text-sm text-gray-600">
                  <Shield className="h-4 w-4 text-green-500 mr-1" />
                  Verified
                </span>
              )}
              <Button variant="outline" size="sm" className="gap-2">
                <Heart className="h-4 w-4" />
                Save
              </Button>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-4 line-clamp-3">{job.description}</p>

          {/* Skills & Requirements */}
          <div className="space-y-4 mb-4">
            <div className="flex flex-wrap gap-2">
              {job.requiredSkills.map((skill, index) => (
                <span 
                  key={index}
                  className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="flex flex-wrap gap-2 mb-4">
            {job.languages.map((language, index) => (
              <span 
                key={index}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
              >
                <Globe className="h-3 w-3 mr-1" />
                {language}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column - Project Details */}
        <div className="lg:w-72 flex flex-col gap-4">
          {/* Budget Box */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="mb-3">
              <span className="text-sm text-gray-500">{job.type}</span>
              <div className="text-xl font-semibold text-gray-900">{job.budget}</div>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div>{job.timeRequirement}</div>
              <div>Project Size: {job.projectSize}</div>
              <div>{job.proposals} proposals</div>
            </div>
          </div>

          {/* Client Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="ml-1 font-medium">{job.clientRating}</span>
                <span className="text-gray-500 text-sm ml-1">
                  ({job.clientReviews} reviews)
                </span>
              </div>
              {job.paymentVerified && (
                <span className="flex items-center text-green-600 text-sm">
                  <DollarSign className="h-4 w-4 mr-1" />
                  Verified
                </span>
              )}
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div>Location: {job.clientLocation}</div>
              <div>Total Spent: {job.clientHistory.totalSpent}</div>
              <div>Projects Posted: {job.clientHistory.projectsPosted}</div>
              <div>Hire Rate: {job.clientHistory.hireRate}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2">
            <Button className="w-full">Submit Proposal</Button>
            <Button variant="outline" className="w-full">
              <MessageCircle className="h-4 w-4 mr-2" />
              Contact Client
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto">
          {/* Top Bar */}
          <div className="px-4 py-4 flex items-center justify-between border-b">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setShowMobileFilters(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">Find Work</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search international opportunities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border rounded-lg"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <Sliders className="h-5 w-5" />
                  Filters
                </Button>
                <div className="hidden sm:flex border rounded-lg overflow-hidden">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="mt-4 p-4 border rounded-lg bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Service Category
                    </label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full border rounded-lg p-2"
                    >
                      <option value="">All Categories</option>
                      {filters.services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Expertise Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expertise Level
                    </label>
                    <div className="space-y-2">
                      {filters.expertise.map((exp) => (
                        <label key={exp} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedExpertise.includes(exp)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedExpertise([...selectedExpertise, exp]);
                              } else {
                                setSelectedExpertise(selectedExpertise.filter(item => item !== exp))
                              }
                            }}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-600">{exp}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Budget Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Project Budget
                    </label>
                    <select
                      value={priceRange}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="w-full border rounded-lg p-2"
                    >
                      <option value="">Any Budget</option>
                      {filters.priceRanges.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Languages Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Languages Required
                    </label>
                    <div className="space-y-2">
                      {filters.languages.map((lang) => (
                        <label key={lang} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedLanguages.includes(lang)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedLanguages([...selectedLanguages, lang]);
                              } else {
                                setSelectedLanguages(selectedLanguages.filter(item => item !== lang));
                              }
                            }}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-600">{lang}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-4 pt-4 border-t">
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSelectedService('');
                        setSelectedExpertise([]);
                        setPriceRange('');
                        setSelectedLanguages([]);
                      }}
                    >
                      Clear All
                    </Button>
                    <Button>
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Filters Sidebar */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
          <div className="fixed inset-y-0 left-0 w-[300px] bg-white z-50 overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Filters</h3>
                <Button 
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMobileFilters(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Mobile Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Category
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full border rounded-lg p-2"
                  >
                    <option value="">All Categories</option>
                    {filters.services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Mobile Expertise Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expertise Level
                  </label>
                  <div className="space-y-2">
                    {filters.expertise.map((exp) => (
                      <label key={exp} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedExpertise.includes(exp)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedExpertise([...selectedExpertise, exp]);
                            } else {
                              setSelectedExpertise(selectedExpertise.filter(item => item !== exp));
                            }
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">{exp}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Mobile Budget Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Budget
                  </label>
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full border rounded-lg p-2"
                  >
                    <option value="">Any Budget</option>
                    {filters.priceRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Mobile Languages Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Languages Required
                  </label>
                  <div className="space-y-2">
                    {filters.languages.map((lang) => (
                      <label key={lang} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedLanguages.includes(lang)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedLanguages([...selectedLanguages, lang]);
                            } else {
                              setSelectedLanguages(selectedLanguages.filter(item => item !== lang));
                            }
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">{lang}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t">
                <Button className="w-full" onClick={() => setShowMobileFilters(false)}>
                  Apply Filters
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full mt-2"
                  onClick={() => {
                    setSelectedService('');
                    setSelectedExpertise([]);
                    setPriceRange('');
                    setSelectedLanguages([]);
                  }}
                >
                  Clear All
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Results Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {jobs.length} opportunities found
            </h2>
            <p className="text-sm text-gray-500">
              Showing results for international professionals
            </p>
          </div>
          <div className="flex items-center gap-4">
            <select
              className="border rounded-lg p-2"
              onChange={(e) => console.log(e.target.value)}
            >
              <option value="recent">Most Recent</option>
              <option value="budget-high">Highest Budget</option>
              <option value="budget-low">Lowest Budget</option>
              <option value="client-rating">Client Rating</option>
            </select>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="space-y-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} viewMode={viewMode} />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center gap-2">
            <Button variant="outline" size="sm">Previous</Button>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((page) => (
                <Button
                  key={page}
                  variant={page === 1 ? 'default' : 'ghost'}
                  size="sm"
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button variant="outline" size="sm">Next</Button>
          </nav>
        </div>
      </main>
    </div>
  );
};

export default InternationalProfessionalsPage;