import React, { useState } from 'react';
import {
  MessageSquare, Settings, Search, Filter,
  AlertTriangle, CheckCircle, XCircle, User, Clock,
  Eye, Ban, Flag, Download, Trash2,
  Shield, MessageCircle, FileText,
  Zap, DollarSign, FileCheck,
  Briefcase, Tag, Plus,
  PenTool, RefreshCw, Layers,
  MapPin, BarChart2, Edit,
  Building2, ArrowUpDown, MoveUp,
  Video
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import { Alert, AlertDescription } from '../../components/ui/alert';
import AdminHeader from '../../Headers/AdminHeader';

const TabButton = ({ active, label, icon: Icon, onClick, className }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
      active 
        ? 'bg-blue-100 text-blue-700' 
        : 'text-gray-600 hover:bg-gray-100'
    } ${className || ''}`}
  >
    <Icon className="h-4 w-4" />
    <span>{label}</span>
  </button>
);

const ChatManagement = () => {
  // State management
  const [activeTab, setActiveTab] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showFormDetails, setShowFormDetails] = useState(false);
  const [formAnalyticsView, setFormAnalyticsView] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);

  // Expanded mock data for chats that includes all form fields
  const chats = [
    {
      id: 1,
      customer: {
        name: "John Smith",
        type: "Client",
        avatar: null,
        email: "john.smith@example.com",
        phone: "+1 416-555-7890"
      },
      professional: {
        name: "Mike Wilson",
        type: "Local Professional",
        avatar: null,
        email: "mike.wilson@example.com",
        phone: "+1 647-555-1234"
      },
      service: "Emergency Plumbing",
      category: "Plumbing",
      lastMessage: "I will be there in about 20 minutes.",
      timestamp: "2 minutes ago",
      status: "active",
      flagged: false,
      messageCount: 15,
      formType: "emergency",
      formStatus: "hired",
      submittedAt: "2024-02-20T14:30:00Z",
      quotePrice: 25,
      formId: "EM-PLB-2024-001",
      location: "Toronto, ON",
      isEmergency: true,
      formDetails: {
        problem: "Burst pipe with water leaking into kitchen",
        timeline: "Emergency (ASAP)",
        address: "123 Main St, Toronto, ON",
        images: ["image1.jpg", "image2.jpg"],
        preferredContactMethod: "Phone",
        additionalNotes: "Water is spreading quickly, need urgent help!",
        availability: "Available now",
        floorLevel: "Ground Floor",
        hasElevator: false,
        hasStairs: false,
        buildingType: "Residential",
        buildingDetails: "Single family home",
        accessInstructions: "Park in driveway, front door access",
        projectScope: "Emergency repair needed",
        serviceArea: "Kitchen",
        propertyType: "House",
        serviceFrequency: "One-time",
        preferredSchedule: "Immediate",
        budget: "Flexible for emergency",
        paymentMethod: "Credit Card",
        serviceRequirements: "Emergency plumbing expertise required",
        healthSafety: "Water damage risk",
        propertyAccess: "Owner present",
        insuranceInfo: "Property insurance available",
        previousWorkHistory: "No previous plumbing issues",
        projectConstraints: "Need immediate response",
        environmentalConcerns: "Water damage mitigation needed",
        regulatoryRequirements: "Standard plumbing codes",
        warrantyRequirements: "Standard service warranty",
        projectTimeline: "Emergency response",
        communicationPreferences: "Phone and email",
        documentationRequired: "Service report needed",
        qualityStandards: "Professional grade work required",
        postServiceRequirements: "Cleanup needed",
        equipmentRequirements: "Standard plumbing tools",
        materialPreferences: "Professional grade materials",
        siteSurveyNeeded: true,
        parkingAvailable: true,
        utilitiesAvailable: true,
        securityRequirements: "None specific",
        workingHours: "Emergency - any time",
        noiseRestrictions: "None for emergency",
        wasteDisposal: "Professional removal required",
        cleanupRequirements: "Full cleanup needed"
      },
      milestones: [
        {
          name: "Service Initiation",
          percentage: 40,
          status: "completed",
          completedAt: "2024-02-20T15:00:00Z"
        },
        {
          name: "Work Completion",
          percentage: 50,
          status: "pending",
          completedAt: null
        },
        {
          name: "Final Payment",
          percentage: 10,
          status: "pending",
          completedAt: null
        }
      ]
    },
    // Additional chat entries would follow the same expanded structure
  ];

  const FormDetailsModal = ({ chat, isOpen, onClose }) => {
    if (!isOpen || !chat) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"  style={{ textAlign: 'left' }}>
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Service Request Details
              </h2>
              <p className="text-sm text-gray-500">Form ID: {chat.formId}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <XCircle className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-6 space-y-6">
            {/* Service Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Service Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-gray-500">Service Type</span>
                    <p className="font-medium">{chat.service}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Category</span>
                    <p className="font-medium">{chat.category}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Location</span>
                    <p className="font-medium">{chat.location}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-gray-500">Submitted</span>
                    <p className="font-medium">{new Date(chat.submittedAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Status</span>
                    <p className="font-medium flex items-center gap-2">
                      {chat.formStatus === 'pending' && (
                        <Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>
                      )}
                      {chat.formStatus === 'quoted' && (
                        <Badge className="bg-blue-100 text-blue-700">Quote Purchased</Badge>
                      )}
                      {chat.formStatus === 'hired' && (
                        <Badge className="bg-green-100 text-green-700">Hired</Badge>
                      )}
                      {chat.isEmergency && (
                        <Badge className="bg-red-100 text-red-700">Emergency</Badge>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Details */}
            <div className="pt-4 border-t">
              <h3 className="text-lg font-semibold mb-4">Location Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <MoveUp className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">Floor Level</span>
                    </div>
                    <p className="mt-1 text-gray-600">{chat.formDetails.floorLevel}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">Building Type</span>
                    </div>
                    <p className="mt-1 text-gray-600">{chat.formDetails.buildingType}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-gray-500" />
                      <span className="text-sm text-gray-700">
                        {chat.formDetails.hasElevator ? 'Has Elevator' : 'No Elevator'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowUpDown className="h-5 w-5 text-gray-500" />
                      <span className="text-sm text-gray-700">
                        {chat.formDetails.hasStairs ? 'Has Stairs' : 'No Stairs'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="pt-4 border-t">
              <h3 className="text-lg font-semibold mb-4">Project Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <span className="text-sm text-gray-500">Project Scope</span>
                  <p className="mt-1 text-gray-700">{chat.formDetails.projectScope}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Service Area</span>
                  <p className="mt-1 text-gray-700">{chat.formDetails.serviceArea}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Timeline</span>
                  <p className="mt-1 text-gray-700">{chat.formDetails.timeline}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Budget</span>
                  <p className="mt-1 text-gray-700">{chat.formDetails.budget}</p>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="pt-4 border-t">
              <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-sm text-gray-500">Special Requirements</span>
                  <p className="mt-1 text-gray-700">{chat.formDetails.serviceRequirements}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Access Instructions</span>
                  <p className="mt-1 text-gray-700">{chat.formDetails.accessInstructions}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Additional Notes</span>
                  <p className="mt-1 text-gray-700">{chat.formDetails.additionalNotes}</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="pt-4 border-t">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium">Customer</h4>
                  <div className="mt-2 space-y-2">
                    <p className="text-sm">Name: {chat.customer.name}</p>
                    <p className="text-sm">Email: {chat.customer.email}</p>
                    <p className="text-sm">Phone: {chat.customer.phone}</p>
                  </div>
                </div>
                {chat.professional && (
                  <div>
                    <h4 className="font-medium">Professional</h4>
                    <div className="mt-2 space-y-2">
                      <p className="text-sm">Name: {chat.professional.name}</p>
                      <p className="text-sm">Email: {chat.professional.email}</p>
                      <p className="text-sm">Phone: {chat.professional.phone}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Attachments */}
            {chat.formDetails.images && chat.formDetails.images.length > 0 && (
              <div className="pt-4 border-t">
                <h3 className="text-lg font-semibold mb-4">Attachments</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {chat.formDetails.images.map((image, index) => (
                    <div key={index} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                      <img src={image} alt={`Attachment ${index + 1}`} className="object-cover rounded-lg" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Milestones */}
            {chat.milestones && chat.milestones.length > 0 && (
              <div className="pt-4 border-t">
                <h3 className="text-lg font-semibold mb-4">Payment Milestones</h3>
                <div className="space-y-4">
                  {chat.milestones.map((milestone, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        milestone.status === 'completed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {milestone.status === 'completed' ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <Clock className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{milestone.name}</span>
                          <Badge variant="outline">{milestone.percentage}%</Badge>
                        </div>
                        {milestone.status === 'completed' && milestone.completedAt && (
                          <p className="text-xs text-gray-500">
                            Completed on {new Date(milestone.completedAt).toLocaleString()}
                          </p>
                        )}
                      </div>
                      {milestone.status === 'pending' && (
                        <Button size="sm" variant="outline">Mark Complete</Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-4 border-t flex justify-end gap-3">
              <Button variant="outline" onClick={onClose}>Close</Button>
              <Button>Process Request</Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ChatCard = ({ chat }) => (
    <Card className="p-4 hover:shadow-md transition-shadow"  style={{ textAlign: 'left' }}>
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4"  style={{ textAlign: 'left' }}>
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
            <User className="h-6 w-6 text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h3 className="font-medium truncate">{chat.service}</h3>
              {chat.formStatus === 'pending' && (
                <Badge className="bg-yellow-100 text-yellow-700 w-fit">Pending</Badge>
              )}
              {chat.formStatus === 'quoted' && (
                <Badge className="bg-blue-100 text-blue-700 w-fit">Quote Purchased</Badge>
              )}
              {chat.formStatus === 'hired' && (
                <Badge className="bg-green-100 text-green-700 w-fit">Hired</Badge>
              )}
              {chat.isEmergency && (
                <Badge className="bg-red-100 text-red-700 w-fit">Emergency</Badge>
              )}
              {chat.flagged && (
                <Badge className="bg-red-100 text-red-700 w-fit">Flagged</Badge>
              )}
            </div>
            <div className="mt-1 text-sm text-gray-600">
              <span className="block sm:inline">{chat.customer.name} (Client)</span>
              <span className="hidden sm:inline"> → </span>
              <span className="block sm:inline">{chat.professional ? chat.professional.name + ' (Professional)' : 'No Professional Assigned'}</span>
            </div>
            <div className="mt-1 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Tag className="h-4 w-4" />
                {chat.category}
              </span>
            </div>
            <div className="mt-1 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {chat.location}
              </span>
            </div>
            {chat.lastMessage && <p className="mt-2 text-sm">{chat.lastMessage}</p>}
            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {chat.timestamp}
              </span>
              <span className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                Form ID: {chat.formId}
              </span>
              {chat.messageCount > 0 && (
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  {chat.messageCount} messages
                </span>
              )}
              {chat.quotePrice && (
                <span className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  Quote: ${chat.quotePrice}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-2 sm:ml-4 w-full sm:w-auto justify-end">
          <Button 
            variant="ghost" 
            size="sm" 
            className="sm:px-2"
            onClick={() => {
              setSelectedChat(chat);
              setShowFormDetails(true);
            }}
          >
            <FileCheck className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="sm:px-2">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="sm:px-2">
            <Ban className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="sm:px-2">
            <Flag className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );

  const FormAnalytics = () => {
    const formAnalytics = {
      totalSubmissions: 245,
      completionRate: 87,
      conversionToQuote: 65,
      conversionToHire: 42,
      averageResponseTime: "2.5 hours",
      topCategories: [
        { name: "Plumbing", count: 78 },
        { name: "Electrical", count: 56 },
        { name: "HVAC", count: 42 }
      ],
      byRegion: [
        { name: "Toronto", count: 112 },
        { name: "Vancouver", count: 68 },
        { name: "Montreal", count: 39 }
      ],
      byType: [
        { name: "Standard", count: 156 },
        { name: "Emergency", count: 89 }
      ],
      monthlySubmissions: [
        { month: "Jan", count: 35 },
        { month: "Feb", count: 42 },
        { month: "Mar", count: 38 },
        { month: "Apr", count: 45 },
        { month: "May", count: 51 },
        { month: "Jun", count: 34 }
      ]
    };

    return (
      <div className="space-y-6"  style={{ textAlign: 'left' }}>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Form Submission Overview</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">Total Submissions</div>
              <div className="text-2xl font-semibold mt-1">{formAnalytics.totalSubmissions}</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">Completion Rate</div>
              <div className="text-2xl font-semibold mt-1">{formAnalytics.completionRate}%</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">Quote Conversion</div>
              <div className="text-2xl font-semibold mt-1">{formAnalytics.conversionToQuote}%</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">Hire Conversion</div>
              <div className="text-2xl font-semibold mt-1">{formAnalytics.conversionToHire}%</div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">By Category</h3>
            <div className="space-y-3">
              {formAnalytics.topCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span>{category.name}</span>
                  <div className="flex items-center gap-2">
                    <span>{category.count}</span>
                    <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full" 
                        style={{ width: `${(category.count / formAnalytics.totalSubmissions) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">By Region</h3>
            <div className="space-y-3">
              {formAnalytics.byRegion.map((region, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span>{region.name}</span>
                  <div className="flex items-center gap-2">
                    <span>{region.count}</span>
                    <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full" 
                        style={{ width: `${(region.count / formAnalytics.totalSubmissions) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">By Type</h3>
            <div className="space-y-3">
              {formAnalytics.byType.map((type, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span>{type.name}</span>
                  <div className="flex items-center gap-2">
                    <span>{type.count}</span>
                    <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-purple-500 rounded-full" 
                        style={{ width: `${(type.count / formAnalytics.totalSubmissions) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Average Response Time</h3>
            <div className="flex flex-col items-center justify-center h-32">
              <div className="text-3xl font-bold text-blue-600">{formAnalytics.averageResponseTime}</div>
              <p className="text-gray-500 mt-2">Average time for professionals to respond</p>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Monthly Submissions</h3>
          <div className="h-64 flex items-end space-x-2">
            {formAnalytics.monthlySubmissions.map((item, index) => {
              const maxValue = Math.max(...formAnalytics.monthlySubmissions.map(item => item.count));
              const height = `${(item.count / maxValue) * 100}%`;
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-blue-500 rounded-t-md" 
                    style={{ height }}
                  >
                    <div className="h-full w-full hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center">
                      <span className="text-white font-medium">{item.count}</span>
                    </div>
                  </div>
                  <div className="mt-2 text-xs">{item.month}</div>
                </div>
              );
            })}
          </div>
        </Card>

        <div className="flex justify-end">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'active':
        if (formAnalyticsView) {
          return <FormAnalytics />;
        }
        
        return (
          <div className="space-y-6"  style={{ textAlign: 'left' }}>
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search forms and chats..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 w-full sm:w-auto"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-4 py-2 border rounded-lg w-full sm:w-auto"
                >
                  <option value="all">All Forms</option>
                  <option value="pending">Pending</option>
                  <option value="quoted">Quoted</option>
                  <option value="hired">Hired</option>
                  <option value="flagged">Flagged</option>
                </select>
                <Button
                  variant={formAnalyticsView ? "default" : "outline"}
                  onClick={() => setFormAnalyticsView(!formAnalyticsView)}
                  className="flex items-center gap-2 w-full sm:w-auto"
                >
                  <BarChart2 className="h-4 w-4" />
                  Analytics
                </Button>
              </div>
            </div>

            {showFilters && (
              <Card className="p-4">
                <h3 className="text-sm font-medium mb-3">Advanced Filters</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Service Category</label>
                    <select className="w-full px-3 py-2 border rounded-lg text-sm">
                      <option value="">All Categories</option>
                      <option value="plumbing">Plumbing</option>
                      <option value="electrical">Electrical</option>
                      <option value="hvac">HVAC</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Region</label>
                    <select className="w-full px-3 py-2 border rounded-lg text-sm">
                      <option value="">All Regions</option>
                      <option value="toronto">Toronto</option>
                      <option value="vancouver">Vancouver</option>
                      <option value="montreal">Montreal</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Form Type</label>
                    <select className="w-full px-3 py-2 border rounded-lg text-sm">
                      <option value="">All Types</option>
                      <option value="standard">Standard</option>
                      <option value="emergency">Emergency</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button size="sm">Apply Filters</Button>
                </div>
              </Card>
            )}

            <div className="space-y-4">
              {chats.map(chat => (
                <ChatCard key={chat.id} chat={chat} />
              ))}
            </div>
          </div>
        );

      case 'rules':
        return (
          <div className="space-y-6"  style={{ textAlign: 'left' }}>
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <h2 className="text-lg font-semibold">Chat Rules</h2>
                <p className="text-gray-600 mt-1">Configure automated chat monitoring rules</p>
              </div>
              <Button className="flex items-center gap-2 w-full sm:w-auto">
                <Shield className="h-4 w-4" />
                Add New Rule
              </Button>
            </div>

            <div className="space-y-4">
              {[
                {
                  id: 1,
                  name: 'No Contact Information',
                  description: 'Block messages containing phone numbers, email addresses, or external contact info',
                  enabled: true
                },
                {
                  id: 2,
                  name: 'Professional Language',
                  description: 'Flag messages containing inappropriate or unprofessional language',
                  enabled: true
                },
                {
                  id: 3,
                  name: 'External Platform Links',
                  description: 'Block messages containing links to external platforms or services',
                  enabled: true
                }
              ].map(rule => (
                <Card key={rule.id} className="p-4">
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                        <h3 className="font-medium">{rule.name}</h3>
                        <Badge className={rule.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                          {rule.enabled ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">{rule.description}</p>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className={rule.enabled ? 'text-red-600' : 'text-green-600'}
                      >
                        {rule.enabled ? 'Disable' : 'Enable'}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'reports':
        return (
          <div className="space-y-6"  style={{ textAlign: 'left' }}>
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <h2 className="text-lg font-semibold">Chat Reports</h2>
                <p className="text-gray-600 mt-1">View chat analytics and violation reports</p>
              </div>
              <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
                <Download className="h-4 w-4" />
                Export Report
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="p-4 sm:p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Active Chats</p>
                    <p className="text-xl sm:text-2xl font-semibold">245</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <MessageCircle className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Rule Violations</p>
                    <p className="text-xl sm:text-2xl font-semibold">12</p>
                  </div>
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Messages Today</p>
                    <p className="text-xl sm:text-2xl font-semibold">1,245</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="font-medium mb-4">Recent Rule Violations</h3>
              <div className="space-y-3">
                {[1, 2, 3].map(index => (
                  <div key={index} className="p-3 border rounded-lg flex flex-col sm:flex-row justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        <span className="font-medium">External Contact Information</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Message contained a phone number: "Call me at 555-123-4567"
                      </p>
                    </div>
                    <div className="text-sm text-gray-500 flex items-center sm:flex-col sm:items-end whitespace-nowrap">
                      <span>2 hours ago</span>
                      <div className="flex items-center ml-4 sm:ml-0 sm:mt-1">
                        <User className="h-3 w-3 mr-1" />
                        <span>John Smith</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        );

        
        case 'forms':
        return (
          <div className="space-y-6"  style={{ textAlign: 'left' }}>
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <h2 className="text-lg font-semibold">Form Management</h2>
                <p className="text-gray-600 mt-1">Manage customer quote request forms</p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button variant="outline" className="flex items-center gap-2 flex-1 sm:flex-auto">
                  <Settings className="h-4 w-4" />
                  Form Settings
                </Button>
                <Button className="flex items-center gap-2 flex-1 sm:flex-auto">
                  <Plus className="h-4 w-4" />
                  New Form
                </Button>
              </div>
            </div>
            
            <Card className="p-6">
              <h3 className="font-medium mb-4">Active Form Templates</h3>
              <div className="space-y-4">
                {[
                  { name: "Emergency Plumbing Request", category: "Plumbing", type: "emergency" },
                  { name: "Electrical Service Request", category: "Electrical", type: "standard" },
                  { name: "HVAC Installation Quote", category: "HVAC", type: "standard" }
                ].map((form, index) => (
                  <div key={index} className="p-4 border rounded-lg flex flex-col sm:flex-row items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-medium">{form.name}</h4>
                        <Badge className={form.type === 'emergency' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}>
                          {form.type.charAt(0).toUpperCase() + form.type.slice(1)}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">Category: {form.category}</div>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Button variant="ghost" size="sm" className="flex-1 sm:flex-auto">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="flex-1 sm:flex-auto">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 flex-1 sm:flex-auto">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-medium mb-4">Form Fields</h3>
                <div className="space-y-3">
                  {[
                    "Service Type",
                    "Problem Description",
                    "Location",
                    "Timeline",
                    "Contact Information",
                    "Attachments"
                  ].map((field, index) => (
                    <div key={index} className="p-3 border rounded-lg flex justify-between items-center">
                      <span>{field}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Required</Badge>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              
              <Card className="p-6"  style={{ textAlign: 'left' }}>
                <h3 className="font-medium mb-4">Form Settings</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Require Address Verification</div>
                      <p className="text-sm text-gray-500">Validate customer address during form submission</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Emergency Service Priority</div>
                      <p className="text-sm text-gray-500">Prioritize emergency service requests in the queue</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Automatic Professional Assignment</div>
                      <p className="text-sm text-gray-500">Automatically assign quote requests to available professionals</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );

      case 'video':
        return (
          <div className="space-y-6" style={{ textAlign: 'left' }}>
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <h2 className="text-lg font-semibold">Video Call Management</h2>
                <p className="text-gray-600 mt-1">Configure and monitor video call settings</p>
              </div>
              <Button className="flex items-center gap-2 w-full sm:w-auto">
                <Settings className="h-4 w-4" />
                Configure Settings
              </Button>
            </div>

            {/* Video Call Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4 sm:p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Active Calls</p>
                    <p className="text-xl sm:text-2xl font-semibold">12</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Video className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Bandwidth Usage</p>
                    <p className="text-xl sm:text-2xl font-semibold">2.4 GB</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BarChart2 className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Failed Calls</p>
                    <p className="text-xl sm:text-2xl font-semibold">2</p>
                  </div>
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Avg Call Duration</p>
                    <p className="text-xl sm:text-2xl font-semibold">15m</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Clock className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Video Call Settings */}
            <Card className="p-6">
              <h3 className="font-medium mb-4">Video Call Settings</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Enable Video Calls</div>
                    <p className="text-sm text-gray-500">Allow video calls between professionals and customers</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">HD Quality</div>
                    <p className="text-sm text-gray-500">Enable HD video quality when bandwidth permits</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Call Recording</div>
                    <p className="text-sm text-gray-500">Record video calls for quality and training purposes</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Bandwidth Optimization</div>
                    <p className="text-sm text-gray-500">Automatically adjust quality based on network conditions</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </Card>

            {/* Advanced Settings */}
            <Card className="p-6">
              <h3 className="font-medium mb-4">Advanced Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Maximum Call Duration</label>
                  <select className="mt-1 block w-full px-3 py-2 border rounded-lg">
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                    <option value="unlimited">Unlimited</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Video Quality Preset</label>
                  <select className="mt-1 block w-full px-3 py-2 border rounded-lg">
                    <option value="low">Low (480p)</option>
                    <option value="medium">Medium (720p)</option>
                    <option value="high">High (1080p)</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Server Region</label>
                  <select className="mt-1 block w-full px-3 py-2 border rounded-lg">
                    <option value="na">North America</option>
                    <option value="eu">Europe</option>
                    <option value="asia">Asia</option>
                    <option value="auto">Auto Select</option>
                  </select>
                </div>
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50"  style={{ textAlign: 'left' }}>
      <AdminHeader />
      
      <main className="lg:pl-64 pt-16">
        <div className="p-4 sm:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="py-4">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Chat & Form Management</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Monitor and manage customer form submissions, conversations, and service requests
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4 sm:p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Active Chats</p>
                    <p className="text-xl sm:text-2xl font-semibold">245</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg shrink-0">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Pending Forms</p>
                    <p className="text-xl sm:text-2xl font-semibold">15</p>
                  </div>
                  <div className="p-2 bg-yellow-100 rounded-lg shrink-0">
                    <FileText className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Emergency Requests</p>
                    <p className="text-xl sm:text-2xl font-semibold">3</p>
                  </div>
                  <div className="p-2 bg-red-100 rounded-lg shrink-0">
                    <Zap className="h-5 w-5 text-red-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Total Revenue</p>
                    <p className="text-xl sm:text-2xl font-semibold">$15.2k</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg shrink-0">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 border-b overflow-x-auto pb-1">
              
            <TabButton
              active={activeTab === 'active'}
              label="Form Submissions"
              icon={MessageSquare}
              onClick={() => {
                setActiveTab('active');
                setFormAnalyticsView(false);
              }}
              className="whitespace-nowrap"
            />
            <TabButton
              active={activeTab === 'video'}
              label="Video Calls"
              icon={Video}
              onClick={() => setActiveTab('video')}
              className="whitespace-nowrap"
            />
            <TabButton
              active={activeTab === 'forms'}
              label="Form Templates"
              icon={Layers}
              onClick={() => setActiveTab('forms')}
              className="whitespace-nowrap"
            />
              
              {/* <TabButton
                active={activeTab === 'active'}
                label="Form Submissions"
                icon={MessageSquare}
                onClick={() => {
                  setActiveTab('active');
                  setFormAnalyticsView(false);
                }}
                className="whitespace-nowrap"
              /> */}
              {/* <TabButton
                active={activeTab === 'forms'}
                label="Form Templates"
                icon={Layers}
                onClick={() => setActiveTab('forms')}
                className="whitespace-nowrap"
              /> */}
              <TabButton
                active={activeTab === 'rules'}
                label="Chat Rules"
                icon={Shield}
                onClick={() => setActiveTab('rules')}
                className="whitespace-nowrap"
              />
              <TabButton
                active={activeTab === 'reports'}
                label="Reports"
                icon={FileText}
                onClick={() => setActiveTab('reports')}
                className="whitespace-nowrap"
              />
            </div>

            {/* Tab Content */}
            <div className="min-h-[300px]">
              {renderContent()}
            </div>
            
            {/* Form Details Modal */}
            <FormDetailsModal 
              isOpen={showFormDetails} 
              onClose={() => setShowFormDetails(false)} 
              chat={selectedChat}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatManagement;