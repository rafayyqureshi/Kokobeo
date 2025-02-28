import React, { useState } from 'react';
import {
  MessageSquare, Settings, Search, Filter, AlertTriangle, CheckCircle, XCircle,
  User, Clock, Eye, Ban, Flag, Download, Trash2, Shield, MessageCircle, FileText,
  Zap, DollarSign, FileCheck, Briefcase, Tag, Plus, PenTool, RefreshCw, Layers,
  MapPin, BarChart2, Edit, Building2, ArrowUpDown, MoveUp, Video, Copy, Globe,
  Phone, Mail, ChevronDown, ChevronUp, Check
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
      active ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
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
  const [editingChatId, setEditingChatId] = useState(null);
  const [editedChatData, setEditedChatData] = useState({});

  // Mock data for chats with purchase and negotiation details
  const chats = [
    {
      id: 1,
      customer: {
        name: "John Smith",
        type: "Client",
        avatar: null,
        email: "john.smith@example.com",
        phone: "+1 416-555-7890",
        whatsapp: "+1 416-555-7890",
        country: "Canada",
        province: "Ontario"
      },
      professionals: [
        {
          name: "Mike Wilson",
          type: "Local Professional",
          email: "mike.wilson@example.com",
          phone: "+1 647-555-1234",
          whatsapp: "+1 647-555-1234",
          country: "Canada",
          province: "Ontario",
          status: "hired",
          purchased: true,
          chatMessages: [
            { sender: "John Smith", message: "Can you come today?", timestamp: "2024-02-20T14:35:00Z" },
            { sender: "Mike Wilson", message: "Yes, I'll be there in 20 mins.", timestamp: "2024-02-20T14:37:00Z" }
          ]
        },
        {
          name: "Sarah Brown",
          type: "Local Professional",
          email: "sarah.brown@example.com",
          phone: "+1 647-555-5678",
          whatsapp: "+1 647-555-5678",
          country: "Canada",
          province: "Ontario",
          status: "negotiating",
          purchased: false,
          chatMessages: [
            { sender: "John Smith", message: "What's your rate?", timestamp: "2024-02-20T14:40:00Z" },
            { sender: "Sarah Brown", message: "I charge $30/hr.", timestamp: "2024-02-20T14:42:00Z" }
          ]
        }
      ],
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
      isOnline: true,
      purchasedBy: 1, // Number of professionals who purchased the form
      maxPurchases: 5,
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
        { name: "Service Initiation", percentage: 40, status: "completed", completedAt: "2024-02-20T15:00:00Z" },
        { name: "Work Completion", percentage: 50, status: "pending", completedAt: null },
        { name: "Final Payment", percentage: 10, status: "pending", completedAt: null }
      ]
    },
    {
      id: 2,
      customer: {
        name: "Emma Johnson",
        type: "Client",
        avatar: null,
        email: "emma.johnson@example.com",
        phone: "+1 604-555-4321",
        whatsapp: "+1 604-555-4321",
        country: "Canada",
        province: "British Columbia"
      },
      professionals: [
        {
          name: "Peter Lee",
          type: "Local Professional",
          email: "peter.lee@example.com",
          phone: "+1 604-555-9876",
          whatsapp: "+1 604-555-9876",
          country: "Canada",
          province: "British Columbia",
          status: "negotiating",
          purchased: true,
          chatMessages: [
            { sender: "Emma Johnson", message: "Can you quote for this?", timestamp: "2024-02-21T10:00:00Z" },
            { sender: "Peter Lee", message: "I'll send a quote soon.", timestamp: "2024-02-21T10:05:00Z" }
          ]
        },
        {
          name: "Linda Chen",
          type: "Local Professional",
          email: "linda.chen@example.com",
          phone: "+1 604-555-6543",
          whatsapp: "+1 604-555-6543",
          country: "Canada",
          province: "British Columbia",
          status: "negotiating",
          purchased: true,
          chatMessages: [
            { sender: "Emma Johnson", message: "Are you available tomorrow?", timestamp: "2024-02-21T10:10:00Z" },
            { sender: "Linda Chen", message: "Yes, I can be there.", timestamp: "2024-02-21T10:12:00Z" }
          ]
        }
      ],
      service: "Electrical Repair",
      category: "Electrical",
      lastMessage: "I'll send a quote soon.",
      timestamp: "1 hour ago",
      status: "active",
      flagged: false,
      messageCount: 5,
      formType: "standard",
      formStatus: "quoted",
      submittedAt: "2024-02-21T09:00:00Z",
      quotePrice: 20,
      formId: "ST-ELE-2024-002",
      location: "Vancouver, BC",
      isEmergency: false,
      isOnline: true,
      purchasedBy: 2,
      maxPurchases: 5,
      formDetails: {
        problem: "Faulty wiring in living room",
        timeline: "Within 2 days",
        address: "456 Oak St, Vancouver, BC",
        images: [],
        preferredContactMethod: "Email",
        additionalNotes: "Lights flickering intermittently",
        availability: "Tomorrow morning",
        floorLevel: "First Floor",
        hasElevator: false,
        hasStairs: true,
        buildingType: "Residential",
        buildingDetails: "Apartment",
        accessInstructions: "Use front entrance, buzz #301",
        projectScope: "Wiring repair",
        serviceArea: "Living Room",
        propertyType: "Apartment",
        serviceFrequency: "One-time",
        preferredSchedule: "Morning",
        budget: "$200-$300",
        paymentMethod: "Cash",
        serviceRequirements: "Certified electrician",
        healthSafety: "No known hazards",
        propertyAccess: "Tenant present",
        insuranceInfo: "Renter's insurance",
        previousWorkHistory: "Minor repairs last year",
        projectConstraints: "Must finish by noon",
        environmentalConcerns: "None",
        regulatoryRequirements: "Follow local codes",
        warrantyRequirements: "30-day warranty",
        projectTimeline: "1 day",
        communicationPreferences: "Email",
        documentationRequired: "Invoice",
        qualityStandards: "High-quality work",
        postServiceRequirements: "Minimal cleanup",
        equipmentRequirements: "Electrical tools",
        materialPreferences: "Standard materials",
        siteSurveyNeeded: false,
        parkingAvailable: true,
        utilitiesAvailable: true,
        securityRequirements: "None",
        workingHours: "9 AM - 12 PM",
        noiseRestrictions: "Keep noise low",
        wasteDisposal: "Dispose of old wiring",
        cleanupRequirements: "Light cleanup"
      },
      milestones: [
        { name: "Quote Acceptance", percentage: 30, status: "completed", completedAt: "2024-02-21T09:30:00Z" },
        { name: "Service Scheduled", percentage: 60, status: "pending", completedAt: null },
        { name: "Payment", percentage: 10, status: "pending", completedAt: null }
      ]
    }
  ];

  // Form modification handlers
  const handleEditChat = (chat) => {
    setEditingChatId(chat.id);
    setEditedChatData({ ...chat.formDetails });
  };

  const handleSaveChat = (chatId) => {
    const updatedChats = chats.map(chat => 
      chat.id === chatId ? { ...chat, formDetails: editedChatData } : chat
    );
    setEditingChatId(null);
    setEditedChatData({});
    // Here you'd typically update the backend with updatedChats
  };

  const handleToggleOffline = (chatId) => {
    const updatedChats = chats.map(chat => 
      chat.id === chatId ? { ...chat, isOnline: !chat.isOnline } : chat
    );
    // Update backend here
  };

  const handleCopyFormData = (chat) => {
    const formData = JSON.stringify({ ...chat, professionals: undefined }, null, 2);
    navigator.clipboard.writeText(formData);
    alert("Form data copied to clipboard!");
  };

  const FormDetailsModal = ({ chat, isOpen, onClose }) => {
    const [isEditingModal, setIsEditingModal] = useState(false);
    const [modalFormData, setModalFormData] = useState(chat ? { ...chat.formDetails } : {});

    if (!isOpen || !chat) return null;

    const handleModalEdit = () => {
      setIsEditingModal(true);
    };

    const handleModalSave = () => {
      const updatedChats = chats.map(c => 
        c.id === chat.id ? { ...c, formDetails: modalFormData } : c
      );
      setIsEditingModal(false);
      // Update backend here
    };

    const handleModalCopy = () => {
      const formData = JSON.stringify({ ...chat, formDetails: modalFormData, professionals: undefined }, null, 2);
      navigator.clipboard.writeText(formData);
      alert("Form data copied to clipboard!");
    };

    const handleModalToggleOffline = () => {
      const updatedChats = chats.map(c => 
        c.id === chat.id ? { ...c, isOnline: !c.isOnline } : c
      );
      // Update backend here
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" style={{ textAlign: 'left' }}>
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
                      {chat.formStatus === 'pending' && <Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>}
                      {chat.formStatus === 'quoted' && <Badge className="bg-blue-100 text-blue-700">Quote Purchased</Badge>}
                      {chat.formStatus === 'hired' && <Badge className="bg-green-100 text-green-700">Hired</Badge>}
                      {chat.isEmergency && <Badge className="bg-red-100 text-red-700">Emergency</Badge>}
                      <Badge className={chat.isOnline ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                        {chat.isOnline ? 'Online' : 'Offline'}
                      </Badge>
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Purchased</span>
                    <p className="font-medium">{chat.purchasedBy}/{chat.maxPurchases} Professionals</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Details */}
            <div className="pt-4 border-t">
              <h3 className="text-lg font-semibold mb-4">Form Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(modalFormData).map(([key, value]) => (
                  <div key={key}>
                    <span className="text-sm text-gray-500">{key.split(/(?=[A-Z])/).join(" ")}</span>
                    {isEditingModal ? (
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => setModalFormData({ ...modalFormData, [key]: e.target.value })}
                        className="mt-1 w-full p-2 border rounded-lg text-sm"
                      />
                    ) : (
                      <p className="mt-1 text-gray-700">{Array.isArray(value) ? value.join(", ") : value}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Negotiation and Purchase Info */}
            <div className="pt-4 border-t">
              <h3 className="text-lg font-semibold mb-4">Negotiation & Purchase</h3>
              <div className="space-y-4">
                {chat.professionals.map((prof, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{prof.name}</p>
                        <p className="text-sm text-gray-500">{prof.status}</p>
                      </div>
                      <Badge className={prof.purchased ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}>
                        {prof.purchased ? 'Purchased' : 'Not Purchased'}
                      </Badge>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Chat:</p>
                      {prof.chatMessages.map((msg, msgIndex) => (
                        <p key={msgIndex} className="text-sm">
                          {msg.sender}: {msg.message} <span className="text-xs text-gray-400">({new Date(msg.timestamp).toLocaleTimeString()})</span>
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Milestones */}
            {chat.milestones && chat.milestones.length > 0 && (
              <div className="pt-4 border-t">
                <h3 className="text-lg font-semibold mb-4">Payment Milestones</h3>
                <div className="space-y-4">
                  {chat.milestones.map((milestone, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        milestone.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {milestone.status === 'completed' ? <CheckCircle className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
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
            <div className="pt-4 border-t flex flex-wrap justify-end gap-2 sm:gap-3">
              <Button variant="outline" onClick={handleModalCopy} className="w-full sm:w-auto">
                <Copy className="h-4 w-4 mr-2" /> Copy Data
              </Button>
              <Button variant="outline" onClick={handleModalToggleOffline} className="w-full sm:w-auto">
                {chat.isOnline ? <Ban className="h-4 w-4 mr-2" /> : <RefreshCw className="h-4 w-4 mr-2" />}
                {chat.isOnline ? 'Take Offline' : 'Put Online'}
              </Button>
              {isEditingModal ? (
                <Button onClick={handleModalSave} className="w-full sm:w-auto">
                  <Check className="h-4 w-4 mr-2" /> Save
                </Button>
              ) : (
                <Button variant="outline" onClick={handleModalEdit} className="w-full sm:w-auto">
                  <Edit className="h-4 w-4 mr-2" /> Edit
                </Button>
              )}
              <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">Close</Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ChatCard = ({ chat }) => (
    <Card className="p-4 hover:shadow-md transition-shadow" style={{ textAlign: 'left' }}>
      {editingChatId === chat.id ? (
        <div className="space-y-4">
          {Object.entries(editedChatData).map(([key, value]) => (
            <div key={key}>
              <label className="text-sm text-gray-500">{key.split(/(?=[A-Z])/).join(" ")}</label>
              <input
                type="text"
                value={value}
                onChange={(e) => setEditedChatData({ ...editedChatData, [key]: e.target.value })}
                className="w-full mt-1 p-2 border rounded-lg text-sm"
              />
            </div>
          ))}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setEditingChatId(null)}>Cancel</Button>
            <Button onClick={() => handleSaveChat(chat.id)}>Save</Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
              <User className="h-6 w-6 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <h3 className="font-medium truncate">{chat.service}</h3>
                <div className="flex flex-wrap gap-2">
                  {chat.formStatus === 'pending' && <Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>}
                  {chat.formStatus === 'quoted' && <Badge className="bg-blue-100 text-blue-700">Quote Purchased</Badge>}
                  {chat.formStatus === 'hired' && <Badge className="bg-green-100 text-green-700">Hired</Badge>}
                  {chat.isEmergency && <Badge className="bg-red-100 text-red-700">Emergency</Badge>}
                  <Badge className={chat.isOnline ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                    {chat.isOnline ? 'Online' : 'Offline'}
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-700">{chat.purchasedBy}/{chat.maxPurchases} Purchased</Badge>
                </div>
              </div>
              <div className="mt-1 text-sm text-gray-600">
                <span className="block sm:inline">{chat.customer.name} (Client)</span>
                {chat.professionals.length > 0 && (
                  <>
                    <span className="hidden sm:inline"> → </span>
                    <span className="block sm:inline">
                      {chat.professionals.map(prof => prof.name).join(", ")} ({chat.professionals.length} Professionals)
                    </span>
                  </>
                )}
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
              <div className="mt-2 flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-500">
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
            <Button variant="ghost" size="sm" onClick={() => handleCopyFormData(chat)}>
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleEditChat(chat)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleToggleOffline(chat.id)}>
              {chat.isOnline ? <Ban className="h-4 w-4" /> : <RefreshCw className="h-4 w-4" />}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                setSelectedChat(chat);
                setShowFormDetails(true);
              }}
            >
              <FileCheck className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
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
      <div className="space-y-6" style={{ textAlign: 'left' }}>
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

  const ContactManagement = () => {
    const [expandedCountries, setExpandedCountries] = useState({});

    const toggleCountry = (country) => {
      setExpandedCountries(prev => ({
        ...prev,
        [country]: !prev[country]
      }));
    };

    const contactsByCountry = chats.reduce((acc, chat) => {
      const customerCountry = chat.customer.country;
      const customerProvince = chat.customer.province;
      if (!acc[customerCountry]) acc[customerCountry] = {};
      if (!acc[customerCountry][customerProvince]) acc[customerCountry][customerProvince] = { customers: [], professionals: [] };
      acc[customerCountry][customerProvince].customers.push(chat.customer);

      chat.professionals.forEach(prof => {
        const profCountry = prof.country;
        const profProvince = prof.province;
        if (!acc[profCountry]) acc[profCountry] = {};
        if (!acc[profCountry][profProvince]) acc[profCountry][profProvince] = { customers: [], professionals: [] };
        acc[profCountry][profProvince].professionals.push(prof);
      });
      return acc;
    }, {});

    const exportContacts = () => {
      const csvContent = [
        "Type,Name,Email,Phone,WhatsApp,Country,Province",
        ...Object.entries(contactsByCountry).flatMap(([country, provinces]) =>
          Object.entries(provinces).flatMap(([province, { customers, professionals }]) => [
            ...customers.map(c => `Customer,"${c.name}","${c.email}","${c.phone}","${c.whatsapp}","${country}","${province}"`),
            ...professionals.map(p => `Professional,"${p.name}","${p.email}","${p.phone}","${p.whatsapp}","${country}","${province}"`)
          ])
        )
      ].join("\n");

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", "contacts_export.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    return (
      <div className="space-y-6" style={{ textAlign: 'left' }}>
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <h2 className="text-lg font-semibold">Contact Management</h2>
            <p className="text-gray-600 mt-1">View and export customer and professional contacts</p>
          </div>
          <Button onClick={exportContacts} className="flex items-center gap-2 w-full sm:w-auto">
            <Download className="h-4 w-4" />
            Export Contacts
          </Button>
        </div>

        {Object.entries(contactsByCountry).map(([country, provinces]) => (
          <Card key={country} className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{country}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleCountry(country)}
              >
                {expandedCountries[country] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>
            {expandedCountries[country] && (
              <div className="space-y-4">
                {Object.entries(provinces).map(([province, { customers, professionals }]) => (
                  <div key={province}>
                    <h4 className="font-medium mb-2">{province}</h4>
                    <div className="space-y-2">
                      {customers.map((c, i) => (
                        <div key={`c-${i}`} className="flex flex-col sm:flex-row gap-2 text-sm">
                          <span className="font-medium w-24">Customer:</span>
                          <span>{c.name} | {c.email} | {c.phone} | WhatsApp: {c.whatsapp}</span>
                        </div>
                      ))}
                      {professionals.map((p, i) => (
                        <div key={`p-${i}`} className="flex flex-col sm:flex-row gap-2 text-sm">
                          <span className="font-medium w-24">Professional:</span>
                          <span>{p.name} | {p.email} | {p.phone} | WhatsApp: {p.whatsapp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        ))}
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
          <div className="space-y-6" style={{ textAlign: 'left' }}>
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
              {chats.map(chat => <ChatCard key={chat.id} chat={chat} />)}
            </div>
          </div>
        );

      case 'rules':
        return (
          <div className="space-y-6" style={{ textAlign: 'left' }}>
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
          <div className="space-y-6" style={{ textAlign: 'left' }}>
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
          <div className="space-y-6" style={{ textAlign: 'left' }}>
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
              
              <Card className="p-6">
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

      case 'contacts':
        return <ContactManagement />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ textAlign: 'left' }}>
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
              <TabButton
                active={activeTab === 'contacts'}
                label="Contacts"
                icon={Globe}
                onClick={() => setActiveTab('contacts')}
                className="whitespace-nowrap"
              />
            </div>

            {/* Tab Content */}
            <div className="min-h-[300px">
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