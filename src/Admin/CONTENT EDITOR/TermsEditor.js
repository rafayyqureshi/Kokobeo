import React, { useState, useEffect } from 'react';
import { FileText, Clock, Save, Eye, ArrowUpRight, History, Globe, Edit, Trash2, Plus, Search, Filter, RefreshCw, CheckCircle, AlertCircle, Calendar, Users, FileCheck, BookOpen, FileEdit, Send, MessagesSquare, Check, X, Shield, ChevronDown, User, Building2, Landmark, Briefcase, Flag, Mail, Phone, MessageCircle, MapPin, Menu, Link, Settings2, Building, FileInput, Layout, PenTool } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import AdminHeader from '../../Headers/AdminHeader';

const TermsEditor = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('terms');
  const [activeDocument, setActiveDocument] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [contentTab, setContentTab] = useState('content');
  const [expandedSection, setExpandedSection] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedContactInfo, setSelectedContactInfo] = useState(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [showPageEditor, setShowPageEditor] = useState(false);
  const [selectedPage, setSelectedPage] = useState(null);

  const [pages, setPages] = useState({
    customerInfo: {
      'tax-deductions': { title: "Tax Deductions for Customers", url: "/customer/tax-deductions", content: "", status: "draft", layout: "default", metadata: { description: "", keywords: "" } }
    },
    professionalInfo: {
      'tax-guidelines': { title: "Professional Tax Guidelines", url: "/professional/tax-guidelines", content: "", status: "draft", layout: "default", metadata: { description: "", keywords: "" } }
    }
  });

  const layouts = [
    { id: 'default', name: 'Default Layout', description: 'Standard page layout with sidebar' },
    { id: 'full', name: 'Full Width', description: 'Full width layout without sidebar' },
    { id: 'landing', name: 'Landing Page', description: 'Special layout for landing pages' }
  ];

  const [documentContent, setDocumentContent] = useState({
    terms: { introduction: { title: "Introduction", content: "Welcome to our platform..." }, definitions: { title: "Definitions", content: "In these Terms and Conditions..." }, serviceTerms: { title: "Service Terms", content: "By accessing and using..." }, userObligations: { title: "User Obligations", content: "Users must maintain..." } },
    privacy: { dataCollection: { title: "Data Collection", content: "We collect various types..." }, dataSecurity: { title: "Data Security", content: "We implement appropriate..." } },
    professional: { qualifications: { title: "Professional Qualifications", content: "Service providers must..." }, serviceStandards: { title: "Service Standards", content: "Professionals must maintain..." } },
    emergency: { responseTime: { title: "Response Time", content: "Emergency service providers..." }, protocols: { title: "Emergency Protocols", content: "Specific protocols must be..." } },
    customerInfo: { taxDeductions: { title: "Tax Deductions", content: "As a customer, you may be..." }, taxBonuses: { title: "National Tax Bonuses", content: "Your country offers several..." } },
    professionalInfo: { taxDeductions: { title: "Professional Tax Deductions", content: "As a service provider..." }, taxBonuses: { title: "Professional Tax Incentives", content: "Your country offers tax..." }, regulations: { title: "Professional Regulations", content: "Professional service providers..." } }
  });

  const [contactInfo, setContactInfo] = useState({
    canada: { email: "canada@kokobeo.com", phone: "+1 (647) 562 3640", whatsapp: "+1 (647) 562 3640", address: "175 West Beaver Creek Rd Unit 10", city: "Richmond Hill", region: "ON", postalCode: "L4B 3M1", country: "Canada", companyName: "Goldman Services", vatNumber: "1344525525", businessHours: { weekday: "8:00-12:00, 14:00-18:00", weekend: "Closed" } },
    italy: { email: "italy@kokobeo.com", phone: "", whatsapp: "+39 3713361123", address: "Korunní 810/104, Vinohrady", city: "Prague 10", region: "", postalCode: "101 00", country: "Czech Republic", companyName: "Europe Services SE", vatNumber: "345678990987", businessHours: { weekday: "8:00-12:00, 14:00-18:00", weekend: "Closed" } }
  });

  const [menuItems, setMenuItems] = useState([
    { id: 1, title: "Terms & Conditions", location: "footer", visibility: "all", url: "/terms", order: 1 },
    { id: 2, title: "Privacy Policy", location: "footer", visibility: "all", url: "/privacy", order: 2 }
  ]);

  const versions = [
    { id: 1, version: "3.0", type: "terms", status: "published", publishDate: "2024-02-01", effectiveDate: "2024-02-15", language: "English", lastModified: "2024-01-28", modifiedBy: "Admin", sections: [{ id: 1, title: "Introduction", content: "These Terms and Conditions govern your use of Kokobeo's services..." }, { id: 2, title: "Service Terms", content: "By using our services, you agree to the following terms..." }, { id: 3, title: "Quote Services", content: "Our quote service allows professionals to purchase quote requests..." }, { id: 4, title: "Emergency Services", content: "Emergency services have special terms and conditions..." }], changelog: [{ date: "2024-01-28", author: "Admin", changes: ["Updated service terms", "Added emergency services section", "Revised quote purchase terms", "Added milestone payment terms"] }], translations: ["French", "Spanish"], reviewStatus: { legal: "approved", compliance: "approved" } },
    { id: 2, version: "2.0", type: "privacy", status: "draft", publishDate: null, effectiveDate: null, language: "English", lastModified: "2024-02-10", modifiedBy: "Admin", sections: [{ id: 1, title: "Privacy Policy", content: "This Privacy Policy explains how we collect and use your data..." }], changelog: [{ date: "2024-02-10", author: "Admin", changes: ["Updated data collection policy", "Added GDPR compliance section"] }], translations: [], reviewStatus: { legal: "pending", compliance: "pending" } },
    { id: 3, version: "1.0", type: "customerInfo", status: "published", publishDate: "2024-02-05", effectiveDate: "2024-02-05", language: "English", country: "Canada", lastModified: "2024-02-05", modifiedBy: "Admin", sections: [{ id: 1, title: "Canadian Tax Deductions", content: "As a Canadian resident, you may be eligible for the following home renovation tax credits..." }, { id: 2, title: "Provincial Incentives", content: "Various provincial programs offer additional incentives for home services..." }], changelog: [{ date: "2024-02-05", author: "Admin", changes: ["Created initial document", "Added tax deduction information", "Added provincial incentives section"] }], translations: ["French"], reviewStatus: { legal: "approved", compliance: "approved" }, menuPlacement: "both", userAccess: "all" },
    { id: 4, version: "1.0", type: "professionalInfo", status: "published", publishDate: "2024-02-05", effectiveDate: "2024-02-05", language: "English", country: "Canada", lastModified: "2024-02-05", modifiedBy: "Admin", sections: [{ id: 1, title: "Tax Deductions for Service Providers", content: "As a service professional in Canada, you can deduct certain business expenses..." }, { id: 2, title: "GST/HST Requirements", content: "Service providers must understand their obligations regarding GST/HST collection..." }], changelog: [{ date: "2024-02-05", author: "Admin", changes: ["Created initial document", "Added professional tax information", "Added GST/HST requirements section"] }], translations: ["French"], reviewStatus: { legal: "approved", compliance: "approved" }, menuPlacement: "registered", userAccess: "professional" }
  ];

  const documentTypes = [
    { id: 'terms', name: 'Terms & Conditions', icon: BookOpen, description: 'General terms of service' },
    { id: 'privacy', name: 'Privacy Policy', icon: Shield, description: 'Data privacy and protection' },
    { id: 'professional', name: 'Professional Terms', icon: FileCheck, description: 'Terms for service providers' },
    { id: 'emergency', name: 'Emergency Services', icon: AlertCircle, description: 'Emergency service terms' },
    { id: 'customerInfo', name: 'Customer Information', icon: User, description: 'Tax and other information for customers' },
    { id: 'professionalInfo', name: 'Professional Information', icon: Briefcase, description: 'Tax and other information for professionals' }
  ];

  const countries = [
    { id: 'all', name: 'All Countries' },
    { id: 'ca', name: 'Canada' },
    { id: 'us', name: 'United States' },
    { id: 'uk', name: 'United Kingdom' },
    { id: 'au', name: 'Australia' },
    { id: 'fr', name: 'France' },
    { id: 'de', name: 'Germany' },
    { id: 'it', name: 'Italy' },
    { id: 'es', name: 'Spain' }
  ];

  const menuOptions = [
    { id: 'none', name: 'No Menu Display' },
    { id: 'guest', name: 'Non-Registered Users Only' },
    { id: 'registered', name: 'Registered Users Only' },
    { id: 'both', name: 'Both User Types' }
  ];

  const userAccessOptions = [
    { id: 'all', name: 'All Users' },
    { id: 'customer', name: 'Customers Only' },
    { id: 'professional', name: 'Professionals Only' }
  ];

  const additionalTabs = [
    { id: 'contact', label: 'Contact Information', icon: Phone },
    { id: 'menu', label: 'Menu & Footer', icon: Menu }
  ];

  const DocumentModal = ({ version, isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"  style={{ textAlign: 'left' }}>
        <div className="bg-white rounded-xl w-full max-w-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">{version ? 'Edit Document' : 'New Document'}</h2>
            <button onClick={onClose}><X className="h-5 w-5" /></button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Document Type</label>
              <select className="w-full px-3 py-2 border rounded-lg">
                {documentTypes.map(type => <option key={type.id} value={type.id}>{type.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Version</label>
              <input type="text" className="w-full px-3 py-2 border rounded-lg" defaultValue={version?.version} />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button>Save</Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PageEditor = ({ page, onSave, onClose }) => {
    const [pageData, setPageData] = useState(page || { title: "", url: "", content: "", status: "draft", layout: "default", metadata: { description: "", keywords: "" } });
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"  style={{ textAlign: 'left' }}>
        <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{page ? 'Edit Page' : 'Create New Page'}</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><X className="h-5 w-5" /></button>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Page Title</label><input type="text" value={pageData.title} onChange={(e) => setPageData({...pageData, title: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Enter page title" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">URL Path</label><div className="flex items-center space-x-2"><span className="text-gray-500 text-sm">https://kokobeo.com</span><input type="text" value={pageData.url} onChange={(e) => setPageData({...pageData, url: e.target.value})} className="flex-1 px-3 py-2 border rounded-lg text-sm" placeholder="/path-to-page" /></div></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Layout</label><select value={pageData.layout} onChange={(e) => setPageData({...pageData, layout: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm">{layouts.map(layout => <option key={layout.id} value={layout.id}>{layout.name}</option>)}</select></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Content</label><textarea value={pageData.content} onChange={(e) => setPageData({...pageData, content: e.target.value})} rows={10} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Enter page content" /></div>
              <div><h3 className="text-sm font-medium text-gray-700 mb-2">SEO Metadata</h3><div className="space-y-3"><div><label className="block text-sm text-gray-600 mb-1">Meta Description</label><textarea value={pageData.metadata.description} onChange={(e) => setPageData({...pageData, metadata: {...pageData.metadata, description: e.target.value}})} rows={2} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Enter meta description" /></div><div><label className="block text-sm text-gray-600 mb-1">Keywords</label><input type="text" value={pageData.metadata.keywords} onChange={(e) => setPageData({...pageData, metadata: {...pageData.metadata, keywords: e.target.value}})} className="w-full px-3 py-2 border rounded-lg text-sm" placeholder="Enter keywords, separated by commas" /></div></div></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Status</label><select value={pageData.status} onChange={(e) => setPageData({...pageData, status: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm"><option value="draft">Draft</option><option value="published">Published</option></select></div>
            </div>
            <div className="pt-6 border-t flex justify-end space-x-3"><Button variant="outline" onClick={onClose}>Cancel</Button><Button onClick={() => onSave(pageData)}>Save Page</Button></div>
          </div>
        </div>
      </div>
    );
  };

  const ContentEditor = ({ documentType }) => {
    const content = documentContent[documentType];
    const [localContent, setLocalContent] = useState(content);
    const [selectedCountryContent, setSelectedCountryContent] = useState('all');

    const handleContentChange = (section, field, value) => {
      setLocalContent(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
    };

    const addNewSection = () => {
      const newSectionKey = `section${Object.keys(localContent).length + 1}`;
      setLocalContent(prev => ({ ...prev, [newSectionKey]: { title: "New Section", content: "Enter content here..." } }));
    };

    const renderPageManager = () => {
      const currentPages = pages[documentType] || {};
      return (
        <div className="mt-8 space-y-6"  style={{ textAlign: 'left' }}>
          <div className="flex justify-between items-center"><h3 className="text-lg font-medium">Page Management</h3><Button onClick={() => setShowPageEditor(true)}><Plus className="h-4 w-4 mr-2" />Create New Page</Button></div>
          <div className="grid gap-4">{Object.entries(currentPages).map(([key, page]) => (
            <Card key={key} className="p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1"><h4 className="font-medium">{page.title}</h4><div className="text-sm text-gray-500 flex items-center gap-2"><Link className="h-4 w-4" />{page.url}</div></div>
                <div className="flex gap-2"><Button variant="ghost" size="sm" onClick={() => {setSelectedPage(page); setShowPageEditor(true);}}><Edit className="h-4 w-4" /></Button><Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button><Button variant="ghost" size="sm" className="text-red-600"><Trash2 className="h-4 w-4" /></Button></div>
              </div>
              <div className="mt-4 flex gap-2"><Badge variant="outline" className="text-sm">{page.layout} layout</Badge><Badge className={`text-sm ${page.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{page.status}</Badge></div>
            </Card>
          ))}
          </div>
        </div>
      );
    };

    const renderTabContent = () => {
      switch (contentTab) {
        case 'content':
          return (
            <Card className="p-4 sm:p-6"  style={{ textAlign: 'left' }}>
              <div className="space-y-4">
                {(documentType === 'customerInfo' || documentType === 'professionalInfo') && (
                  <div className="mb-4"><label className="block text-sm font-medium text-gray-700 mb-1">Select Country</label><select className="w-full px-2 py-1 sm:px-3 sm:py-2 border rounded-lg text-sm" value={selectedCountryContent} onChange={(e) => setSelectedCountryContent(e.target.value)}>{countries.map(country => <option key={country.id} value={country.id}>{country.name}</option>)}</select></div>
                )}
                {Object.entries(localContent).map(([key, section]) => (
                  <div key={key} className="border rounded-lg overflow-hidden">
                    <button onClick={() => setExpandedSection(expandedSection === key ? null : key)} className="w-full flex items-center justify-between p-3 sm:p-4 bg-gray-50 hover:bg-gray-100"><div className="flex items-center gap-2"><FileText className="h-4 w-4" /><span className="font-medium text-sm sm:text-base">{section.title}</span></div><ChevronDown className={`h-4 w-4 transform transition-transform ${expandedSection === key ? 'rotate-180' : ''}`} /></button>
                    {expandedSection === key && (
                      <div className="p-3 sm:p-4 space-y-4">
                        <div><label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label><input type="text" value={section.title} onChange={(e) => handleContentChange(key, 'title', e.target.value)} className="w-full px-2 py-1 sm:px-3 sm:py-2 border rounded-lg text-sm" /></div>
                        <div><label className="block text-sm font-medium text-gray-700 mb-1">Content</label><textarea value={section.content} onChange={(e) => handleContentChange(key, 'content', e.target.value)} rows={4} className="w-full px-2 py-1 sm:px-3 sm:py-2 border rounded-lg resize-none text-sm" /></div>
                        <div className="flex flex-col sm:flex-row justify-end gap-2"><Button variant="outline" size="sm" className="w-full sm:w-auto"><Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />Delete</Button><Button size="sm" className="w-full sm:w-auto"><Save className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />Save</Button></div>
                      </div>
                    )}
                  </div>
                ))}
                <Button variant="outline" onClick={addNewSection} className="w-full mt-4 text-sm sm:text-base"><Plus className="h-4 w-4 mr-2" />Add New Section</Button>
              </div>
            </Card>
          );
        case 'settings':
          return (
            <Card className="p-4 sm:p-6">
              <div className="space-y-6">
                <div><h3 className="text-base sm:text-lg font-medium mb-4">Document Settings</h3><div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label className="block text-sm font-medium text-gray-700 mb-1">Default Language</label><select className="w-full px-2 py-1 sm:px-3 sm:py-2 border rounded-lg text-sm"><option value="en">English</option><option value="fr">French</option><option value="es">Spanish</option></select></div><div><label className="block text-sm font-medium text-gray-700 mb-1">Review Cycle</label><select className="w-full px-2 py-1 sm:px-3 sm:py-2 border rounded-lg text-sm"><option value="30">30 days</option><option value="60">60 days</option><option value="90">90 days</option></select></div></div></div>
                {(documentType === 'customerInfo' || documentType === 'professionalInfo') && (
                  <div><h3 className="text-base sm:text-lg font-medium mb-4">Page Display Settings</h3><div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label className="block text-sm font-medium text-gray-700 mb-1">Menu Placement</label><select className="w-full px-2 py-1 sm:px-3 sm:py-2 border rounded-lg text-sm">{menuOptions.map(option => <option key={option.id} value={option.id}>{option.name}</option>)}</select></div><div><label className="block text-sm font-medium text-gray-700 mb-1">User Access</label><select className="w-full px-2 py-1 sm:px-3 sm:py-2 border rounded-lg text-sm">{userAccessOptions.map(option => <option key={option.id} value={option.id}>{option.name}</option>)}</select></div><div><label className="block text-sm font-medium text-gray-700 mb-1">Country</label><select className="w-full px-2 py-1 sm:px-3 sm:py-2 border rounded-lg text-sm">{countries.map(country => <option key={country.id} value={country.id}>{country.name}</option>)}</select></div><div><label className="block text-sm font-medium text-gray-700 mb-1">Menu Order</label><input type="number" className="w-full px-2 py-1 sm:px-3 sm:py-2 border rounded-lg text-sm" placeholder="1" min="1" /></div></div></div>
                )}
                <div><h3 className="text-base sm:text-lg font-medium mb-4">Access Control</h3><div className="space-y-3"><div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-gray-50 rounded-lg"><div className="flex items-center gap-2"><Users className="h-4 w-4 text-gray-500" /><span className="text-sm">Editor Access</span></div><Button variant="outline" size="sm" className="mt-2 sm:mt-0">Manage</Button></div><div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-gray-50 rounded-lg"><div className="flex items-center gap-2"><Shield className="h-4 w-4 text-gray-500" /><span className="text-sm">Review Permissions</span></div><Button variant="outline" size="sm" className="mt-2 sm:mt-0">Configure</Button></div></div></div>
                <div><h3 className="text-base sm:text-lg font-medium mb-4">Version Control</h3><div className="space-y-3"><div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-gray-50 rounded-lg"><div className="flex items-center gap-2"><History className="h-4 w-4 text-gray-500" /><span className="text-sm">Version History</span></div><Button variant="outline" size="sm" className="mt-2 sm:mt-0">View History</Button></div><div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-gray-50 rounded-lg"><div className="flex items-center gap-2"><RefreshCw className="h-4 w-4 text-gray-500" /><span className="text-sm">Auto-save</span></div><div className="flex items-center mt-2 sm:mt-0"><span className="text-sm text-gray-500 mr-2">Every 5 minutes</span><Button variant="outline" size="sm">Change</Button></div></div></div></div>
              </div>
            </Card>
          );
        case 'translations':
          return (
            <Card className="p-4 sm:p-6">
              <div className="space-y-6"><div className="flex flex-col sm:flex-row items-start sm:items-center justify-between"><h3 className="text-base sm:text-lg font-medium mb-2 sm:mb-0">Available Translations</h3><Button className="w-full sm:w-auto text-sm"><Plus className="h-4 w-4 mr-2" />Add Translation</Button></div><div className="space-y-3">{['French', 'Spanish', 'German'].map((language, index) => (<div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg"><div className="flex items-center gap-2 sm:gap-3"><Globe className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" /><div><div className="font-medium text-sm sm:text-base">{language}</div><div className="text-xs sm:text-sm text-gray-500">Last updated: 2 days ago</div></div></div><div className="flex items-center gap-2 mt-2 sm:mt-0"><Button variant="outline" size="sm" className="text-xs sm:text-sm"><Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />Edit</Button><Button variant="outline" size="sm" className="text-xs sm:text-sm"><Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />Preview</Button></div></div>))}</div></div>
            </Card>
          );
        default:
          return null;
      }
    };

    return (
      <div className="space-y-6"  style={{ textAlign: 'left' }}>
        <div className="flex gap-2"><Button onClick={() => setContentTab('content')} variant={contentTab === 'content' ? 'default' : 'outline'}>Content</Button><Button onClick={() => setContentTab('settings')} variant={contentTab === 'settings' ? 'default' : 'outline'}>Settings</Button><Button onClick={() => setContentTab('translations')} variant={contentTab === 'translations' ? 'default' : 'outline'}>Translations</Button></div>
        {renderTabContent()}
        {(documentType === 'customerInfo' || documentType === 'professionalInfo') && renderPageManager()}
      </div>
    );
  };

  const VersionCard = ({ version }) => (
    <Card className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start"><div className="mb-4 sm:mb-0"><div className="flex flex-wrap items-center gap-2"><h3 className="text-base sm:text-lg font-semibold">Version {version.version}</h3><Badge className={`text-xs sm:text-sm ${version.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{version.status.charAt(0).toUpperCase() + version.status.slice(1)}</Badge><Badge variant="outline" className="text-xs sm:text-sm">{documentTypes.find(t => t.id === version.type)?.name || version.type.toUpperCase()}</Badge>{version.country && <Badge className="text-xs sm:text-sm bg-purple-100 text-purple-700">{version.country}</Badge>}</div><div className="flex flex-wrap items-center gap-2 mt-2 text-xs sm:text-sm text-gray-600"><Clock className="h-3 w-3 sm:h-4 sm:w-4" />Last modified: {version.lastModified}<span className="text-gray-400 hidden sm:inline">|</span><Users className="h-3 w-3 sm:h-4 sm:w-4" />By: {version.modifiedBy}</div></div><div className="flex gap-2"><Button variant="ghost" size="sm" onClick={() => setSelectedVersion(version)}><Edit className="h-3 w-3 sm:h-4 sm:w-4" /></Button><Button variant="ghost" size="sm" onClick={() => setShowPreview(true)}><Eye className="h-3 w-3 sm:h-4 sm:w-4" /></Button></div></div>
      {version.status === 'published' && (<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4"><div className="p-3 bg-gray-50 rounded-lg"><div className="text-xs sm:text-sm text-gray-500">Publish Date</div><div className="font-medium text-sm sm:text-base">{version.publishDate}</div></div><div className="p-3 bg-gray-50 rounded-lg"><div className="text-xs sm:text-sm text-gray-500">Effective Date</div><div className="font-medium text-sm sm:text-base">{version.effectiveDate}</div></div></div>)}
      {(version.type === 'customerInfo' || version.type === 'professionalInfo') && (<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4"><div className="p-3 bg-gray-50 rounded-lg"><div className="text-xs sm:text-sm text-gray-500">Menu Placement</div><div className="font-medium text-sm sm:text-base">{menuOptions.find(m => m.id === version.menuPlacement)?.name || 'Not Set'}</div></div><div className="p-3 bg-gray-50 rounded-lg"><div className="text-xs sm:text-sm text-gray-500">User Access</div><div className="font-medium text-sm sm:text-base">{userAccessOptions.find(u => u.id === version.userAccess)?.name || 'Not Set'}</div></div></div>)}
      <div className="mt-4 sm:mt-6"><h4 className="font-medium mb-3 text-sm sm:text-base">Content Sections</h4><div className="space-y-3">{version.sections.map(section => (<div key={section.id} className="p-3 bg-gray-50 rounded-lg"><h5 className="font-medium text-sm sm:text-base">{section.title}</h5><p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">{section.content}</p></div>))}</div></div>
      <div className="mt-4 sm:mt-6"><h4 className="font-medium mb-3 text-sm sm:text-base">Review Status</h4><div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"><div className="text-xs sm:text-sm">Legal Review</div><Badge className={`text-xs sm:text-sm ${version.reviewStatus.legal === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{version.reviewStatus.legal.charAt(0).toUpperCase() + version.reviewStatus.legal.slice(1)}</Badge></div><div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"><div className="text-xs sm:text-sm">Compliance Review</div><Badge className={`text-xs sm:text-sm ${version.reviewStatus.compliance === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{version.reviewStatus.compliance.charAt(0).toUpperCase() + version.reviewStatus.compliance.slice(1)}</Badge></div></div></div>
      <div className="mt-4 sm:mt-6"><h4 className="font-medium mb-3 text-sm sm:text-base">Available Translations</h4><div className="flex flex-wrap gap-2">{version.translations.length > 0 ? (version.translations.map((lang, index) => (<Badge key={index} variant="outline" className="text-xs sm:text-sm">{lang}</Badge>))) : (<span className="text-xs sm:text-sm text-gray-500">No translations available</span>)}</div></div>
      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t"><h4 className="font-medium mb-3 text-sm sm:text-base">Recent Changes</h4><div className="space-y-3">{version.changelog.map((log, index) => (<div key={index} className="text-xs sm:text-sm"><div className="flex flex-wrap items-center gap-2 text-gray-600"><Calendar className="h-3 w-3 sm:h-4 sm:w-4" />{log.date}<span className="text-gray-400 hidden sm:inline">|</span><Users className="h-3 w-3 sm:h-4 sm:w-4" />{log.author}</div><ul className="mt-1 space-y-1 ml-4 sm:ml-6 list-disc text-gray-600">{log.changes.map((change, changeIndex) => (<li key={changeIndex}>{change}</li>))}</ul></div>))}</div></div>
    </Card>
  );

  const ContactEditModal = ({ info, isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"  style={{ textAlign: 'left' }}>
        <div className="bg-white rounded-xl w-full max-w-4xl">
          <div className="p-4 sm:p-6 border-b"><div className="flex items-center justify-between"><h2 className="text-lg sm:text-xl font-semibold">Edit Contact Information - {info?.country || 'New Country'}</h2><button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><X className="h-4 w-4 sm:h-5 sm:w-5" /></button></div></div>
          <div className="p-4 sm:p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label><input type="text" className="w-full px-2 py-1 sm:px-3 sm:py-2 border rounded-lg text-sm" defaultValue={info?.companyName} /></div><div><label className="block text-sm font-medium text-gray-700 mb-1">VAT Number</label><input type="text" className="w-full px-2 py-1 sm:px-3 sm:py-2 border rounded-lg text-sm" defaultValue={info?.vatNumber} /></div></div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4"><div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" className="w-full px-2 py-1 sm:px-3 sm:py-2 border rounded-lg text-sm" defaultValue={info?.email} /></div><div><label className="block text-sm font-medium text-gray-700 mb-1">Phone</label><input type="tel" className="w-full px-2 py-1 sm:px-3 sm:py-2 border rounded-lg text-sm" defaultValue={info?.phone} /></div><div><label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label><input type="tel" className="w-full px-2 py-1 sm:px-3 sm:py-2 border rounded-lg text-sm" defaultValue={info?.whatsapp} /></div></div>
            <div><h3 className="text-base font-medium mb-3">Address</h3><div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label><input type="text" className="w-full px-2 py-1 sm:px-3 sm:py-2 border rounded-lg text-sm" defaultValue={info?.address} /></div><div><label className="block text-sm font-medium text-gray-700 mb-1">City</label><input type="text" className="w-full px-2 py-1 sm:px-3 sm:py-2 border rounded-lg text-sm" defaultValue={info?.city} /></div><div><label className="block text-sm font-medium text-gray-700 mb-1">Region/State</label><input type="text" className="w-full px-2 py-1 sm:px-3 sm:py-2 border rounded-lg text-sm" defaultValue={info?.region} /></div><div><label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label><input type="text" className="w-full px-2 py-1 sm:px-3 sm:py-2 border rounded-lg text-sm" defaultValue={info?.postalCode} /></div></div></div>
            <div><h3 className="text-base font-medium mb-3">Business Hours</h3><div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label className="block text-sm font-medium text-gray-700 mb-1">Weekday Hours</label><input type="text" className="w-full px-2 py-1 sm:px-3 sm:py-2 border rounded-lg text-sm" defaultValue={info?.businessHours?.weekday} /></div><div><label className="block text-sm font-medium text-gray-700 mb-1">Weekend Hours</label><input type="text" className="w-full px-2 py-1 sm:px-3 sm:py-2 border rounded-lg text-sm" defaultValue={info?.businessHours?.weekend} /></div></div></div>
            <div className="pt-4 border-t flex justify-end gap-3"><Button variant="outline" onClick={onClose}>Cancel</Button><Button>Save Changes</Button></div>
          </div>
        </div>
      </div>
    );
  };

  const MenuItemModal = ({ item, isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"  style={{ textAlign: 'left' }}>
        <div className="bg-white rounded-xl w-full max-w-2xl">
          <div className="p-4 sm:p-6 border-b"><div className="flex items-center justify-between"><h2 className="text-lg sm:text-xl font-semibold">{item ? 'Edit Menu Item' : 'Add Menu Item'}</h2><button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><X className="h-4 w-4 sm:h-5 sm:w-5" /></button></div></div>
          <div className="p-4 sm:p-6 space-y-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Title</label><input type="text" className="w-full px-2 py-1 sm:px-3 sm:py-2 border rounded-lg text-sm" defaultValue={item?.title} /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">URL</label><input type="text" className="w-full px-2 py-1 sm:px-3 sm:py-2 border rounded-lg text-sm" defaultValue={item?.url} /></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label className="block text-sm font-medium text-gray-700 mb-1">Location</label><select className="w-full px-2 py-1 sm:px-3 sm:py-2 border rounded-lg text-sm" defaultValue={item?.location}><option value="header">Header Menu</option><option value="footer">Footer</option><option value="sidebar">Sidebar Menu</option></select></div><div><label className="block text-sm font-medium text-gray-700 mb-1">Visibility</label><select className="w-full px-2 py-1 sm:px-3 sm:py-2 border rounded-lg text-sm" defaultValue={item?.visibility}><option value="all">All Users</option><option value="guest">Guest Only</option><option value="registered">Registered Users</option><option value="professional">Professionals Only</option><option value="customer">Customers Only</option></select></div></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label><input type="number" className="w-full px-2 py-1 sm:px-3 sm:py-2 border rounded-lg text-sm" defaultValue={item?.order} min="1" /></div>
            <div className="pt-4 border-t flex justify-end gap-3"><Button variant="outline" onClick={onClose}>Cancel</Button><Button>Save Changes</Button></div>
          </div>
        </div>
      </div>
    );
  };

  const renderContactEditor = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"><h2 className="text-lg sm:text-xl font-semibold">Contact Information Management</h2><Button onClick={() => setShowAddModal(true)} className="w-full sm:w-auto text-sm"><Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />Add Country</Button></div>
      <div className="grid grid-cols-1 gap-4 sm:gap-6">{Object.entries(contactInfo).map(([country, info]) => (
        <Card key={country} className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start"><div className="mb-4 sm:mb-0"><div className="flex items-center gap-2"><Flag className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" /><h3 className="text-base sm:text-lg font-semibold capitalize">{country}</h3></div><div className="mt-2 text-xs sm:text-sm text-gray-600">{info.companyName} - VAT: {info.vatNumber}</div></div><div className="flex gap-2"><Button variant="ghost" size="sm" onClick={() => setSelectedContactInfo({ country, ...info })}><Edit className="h-3 w-3 sm:h-4 sm:w-4" /></Button><Button variant="ghost" size="sm" className="text-red-600"><Trash2 className="h-3 w-3 sm:h-4 sm:w-4" /></Button></div></div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4"><div><h4 className="font-medium mb-2 text-sm sm:text-base">Contact Details</h4><div className="space-y-2 text-xs sm:text-sm"><div className="flex items-center gap-2"><Mail className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" /><span>{info.email}</span></div>{info.phone && info.phone.trim() !== "" && (<div className="flex items-center gap-2"><Phone className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" /><span>{info.phone}</span></div>)}<div className="flex items-center gap-2"><MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" /><span>{info.whatsapp}</span></div></div></div><div><h4 className="font-medium mb-2 text-sm sm:text-base">Business Hours</h4><div className="space-y-2 text-xs sm:text-sm"><div className="flex items-center gap-2"><Clock className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" /><span>Weekday: {info.businessHours.weekday}</span></div><div className="flex items-center gap-2"><Clock className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" /><span>Weekend: {info.businessHours.weekend}</span></div></div></div></div>
          <div className="mt-4"><h4 className="font-medium mb-2 text-sm sm:text-base">Address</h4><div className="flex items-start gap-2 text-xs sm:text-sm"><MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 mt-1" /><div><div>{info.address}</div><div>{info.city}, {info.region} {info.postalCode}</div><div>{info.country}</div></div></div></div>
        </Card>
      ))}
      </div>
    </div>
  );

  const renderMenuEditor = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"><h2 className="text-lg sm:text-xl font-semibold">Menu & Footer Management</h2><Button onClick={() => setShowAddModal(true)} className="w-full sm:w-auto text-sm"><Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />Add Menu Item</Button></div>
      <div className="grid grid-cols-1 gap-4 sm:gap-6">{menuItems.map((item) => (
        <Card key={item.id} className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start"><div className="mb-4 sm:mb-0"><div className="flex items-center gap-2"><Link className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" /><h3 className="text-base sm:text-lg font-semibold">{item.title}</h3></div><div className="mt-2 flex flex-wrap gap-2"><Badge variant="outline" className="text-xs sm:text-sm capitalize">{item.location}</Badge><Badge variant="outline" className="text-xs sm:text-sm capitalize">{item.visibility}</Badge></div></div><div className="flex gap-2"><Button variant="ghost" size="sm" onClick={() => setSelectedMenuItem(item)}><Edit className="h-3 w-3 sm:h-4 sm:w-4" /></Button><Button variant="ghost" size="sm" className="text-red-600"><Trash2 className="h-3 w-3 sm:h-4 sm:w-4" /></Button></div></div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4"><div><h4 className="font-medium mb-2 text-sm sm:text-base">URL</h4><div className="text-xs sm:text-sm text-gray-600">{item.url}</div></div><div><h4 className="font-medium mb-2 text-sm sm:text-base">Display Order</h4><div className="text-xs sm:text-sm text-gray-600">{item.order}</div></div></div>
        </Card>
      ))}
      </div>
    </div>
  );

  const renderMainContent = () => {
    switch (activeTab) {
      case 'contact': return renderContactEditor();
      case 'menu': return renderMenuEditor();
      default: return <ContentEditor documentType={activeTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50"  style={{ textAlign: 'left' }}>
      <AdminHeader />
      <main className="lg:pl-64 pt-16">
        <div className="p-4 sm:p-6">
          <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"><div><h1 className="text-xl sm:text-2xl font-bold text-gray-900">Content Management</h1><p className="text-sm sm:text-base text-gray-600 mt-1">Manage legal documents, contact information, and menu items</p></div>{(activeTab !== 'contact' && activeTab !== 'menu') && (<Button onClick={() => setShowAddModal(true)} className="w-full sm:w-auto flex items-center gap-2 text-sm sm:text-base"><Plus className="h-3 w-3 sm:h-4 sm:w-4" />New Document</Button>)}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"><Card className="p-4 sm:p-6"><div className="flex justify-between items-start"><div><p className="text-xs sm:text-sm text-gray-500">Active Documents</p><p className="text-lg sm:text-2xl font-semibold mt-1">6</p></div><div className="p-2 bg-blue-100 rounded-lg"><FileText className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" /></div></div></Card><Card className="p-4 sm:p-6"><div className="flex justify-between items-start"><div><p className="text-xs sm:text-sm text-gray-500">Total Versions</p><p className="text-lg sm:text-2xl font-semibold mt-1">12</p></div><div className="p-2 bg-green-100 rounded-lg"><History className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" /></div></div></Card><Card className="p-4 sm:p-6"><div className="flex justify-between items-start"><div><p className="text-xs sm:text-sm text-gray-500">Languages</p><p className="text-lg sm:text-2xl font-semibold mt-1">3</p></div><div className="p-2 bg-purple-100 rounded-lg"><Globe className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" /></div></div></Card><Card className="p-4 sm:p-6"><div className="flex justify-between items-start"><div><p className="text-xs sm:text-sm text-gray-500">Last Updated</p><p className="text-lg sm:text-2xl font-semibold mt-1">2d ago</p></div><div className="p-2 bg-yellow-100 rounded-lg"><Clock className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" /></div></div></Card></div>
            <div className="flex overflow-x-auto gap-2 pb-2 snap-x">{documentTypes.map(type => (<button key={type.id} onClick={() => setActiveTab(type.id)} className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap snap-start text-sm sm:text-base ${activeTab === type.id ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}><type.icon className="h-3 w-3 sm:h-4 sm:w-4" /><span>{type.name}</span></button>))}{additionalTabs.map(tab => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap snap-start text-sm sm:text-base ${activeTab === tab.id ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}><tab.icon className="h-3 w-3 sm:h-4 sm:w-4" /><span>{tab.label}</span></button>))}</div>
            <Card className="p-4"><div className="flex flex-col gap-4"><div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4"><div className="relative w-full sm:min-w-[200px] md:min-w-[300px]"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" /><input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-8 pr-4 py-1 sm:pl-10 sm:py-2 border rounded-lg text-sm" /></div><Button variant="outline" className="w-full sm:w-auto flex items-center gap-2 text-sm"><Filter className="h-4 w-4 sm:h-5 sm:w-5" />Filters</Button></div><div className="flex flex-col sm:flex-row gap-2"><select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)} className="w-full sm:w-auto px-2 py-1 sm:px-4 sm:py-2 border rounded-lg text-sm"><option value="all">All Languages</option><option value="en">English</option><option value="fr">French</option><option value="es">Spanish</option></select>{(activeTab === 'customerInfo' || activeTab === 'professionalInfo') && (<select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="w-full sm:w-auto px-2 py-1 sm:px-4 sm:py-2 border rounded-lg text-sm">{countries.map(country => (<option key={country.id} value={country.id}>{country.name}</option>))}</select>)}</div></div></Card>
            <div className="mt-4 sm:mt-6">{renderMainContent()}</div>
            {(activeTab !== 'contact' && activeTab !== 'menu') && (<div className="grid grid-cols-1 gap-4 sm:gap-6">{versions.filter(version => (activeTab === 'all' || version.type === activeTab)).filter(version => (selectedLanguage === 'all' || version.language.toLowerCase() === selectedLanguage)).filter(version => (selectedCountry === 'all' || !version.country || version.country === countries.find(c => c.id === selectedCountry)?.name)).map(version => (<VersionCard key={version.id} version={version} />))}</div>)}
          </div>
        </div>
      </main>
      {(showAddModal && activeTab !== 'contact' && activeTab !== 'menu') && (<DocumentModal version={selectedVersion} isOpen={true} onClose={() => {setShowAddModal(false); setSelectedVersion(null);}} />)}
      {(showAddModal && activeTab === 'contact') && !selectedContactInfo && (<ContactEditModal info={null} isOpen={true} onClose={() => setShowAddModal(false)} />)}
      {selectedContactInfo && (<ContactEditModal info={selectedContactInfo} isOpen={true} onClose={() => setSelectedContactInfo(null)} />)}
      {(showAddModal && activeTab === 'menu') && !selectedMenuItem && (<MenuItemModal item={null} isOpen={true} onClose={() => setShowAddModal(false)} />)}
      {selectedMenuItem && (<MenuItemModal item={selectedMenuItem} isOpen={true} onClose={() => setSelectedMenuItem(null)} />)}
      {showPageEditor && (<PageEditor page={selectedPage} onSave={(pageData) => {setPages(prev => ({...prev, [activeTab]: {...prev[activeTab], [pageData.url.split('/').pop()]: pageData}})); setShowPageEditor(false); setSelectedPage(null);}} onClose={() => {setShowPageEditor(false); setSelectedPage(null);}} />)}
    </div>
  );
};

export default TermsEditor;