import React, { useState } from 'react';
import { Search, MapPin, Plus, X } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/input';
import SharedHeader from '../Headers/SharedHeader';
import SharedFooter2 from '../Footer/SharedFooter2';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import SharedHeader11 from '../Headers/SharedHeader11';

const locations = {
  canada: {
    provinces: ["Ontario", "Quebec", "British Columbia", "Alberta"],
    cities: {
      ontario: ["Toronto", "Ottawa", "Hamilton", "London"],
      quebec: ["Montreal", "Quebec City", "Laval", "Gatineau"],
      "british columbia": ["Vancouver", "Victoria", "Surrey", "Burnaby"],
      alberta: ["Calgary", "Edmonton", "Red Deer", "Lethbridge"]
    }
  }
};

const CategoriesAndLocation = () => {
  const [selectedType, setSelectedType] = useState('local-home');
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [newTags, setNewTags] = useState('');
  const [customCategories, setCustomCategories] = useState([]);

  const categories = {
    'local-home': [
      // Home Maintenance & Repair
      "Plumber",
      "Electrician",
      "Carpenter",
      "Gardener",
      "Gardening",
      "Painter",
      "Painting",
      "Handyman",
      "Glazier",
      "Locksmith",
      "System Engineer",
      "Bricklayer",
      "Drywaller",
      "Tiler",
      "Assembler",
      "Furniture Assembly",

      // Cleaning Services
      "Cleaner",
      "Cleaning",
      "Cleaning Company",
      "House Cleaning",
      "Apartment Cleaning",
      "Deep Cleaning",
      "Window Cleaning",
      "Window Glass Cleaning",
      "Carpet Cleaning",
      "Mattress Cleaning",
      "Sofa Cleaning",
      "Home Sofa Cleaning",
      "Floor Cleaning",
      "Post Renovation Cleaning",
      "Office Cleaning",
      "B&B Cleaning",
      "Domestic Cleaning",
      "Environmental Sanitization",
      "Holiday Home Cleaning",
      "Condominium Cleaning",
      "Condominium Stair Cleaning",

      // Installation & Systems
      "Electrical Installer",
      "Air Conditioning Installation",
      "Air Conditioning Assistance",
      "Electrical System Installation",
      "Plumbing Installation",
      "Shower Installation",
      "Sink and Tap Installation",
      "Video Surveillance",
      "Solar Panels",
      "Photovoltaic",
      "Renewable Energy",
      "Gate Automation",
      "Video Intercom Installation",
      "Underfloor Heating Installation",
      "Radiator Installation",

      // Maintenance & Repair
      "Boiler Services",
      "Boiler Repair",
      "Boiler Installation",
      "Boiler Maintenance",
      "Boiler Replacement",
      "Boiler Overhaul",
      "Air Conditioning Maintenance",
      "Water Heater Maintenance",
      "Radiator Maintenance",
      "Air Conditioning Assembly",
      "Air Conditioning Cleaning",
      "Air Conditioning Gas Refill",
      "Appliance Repair",
      "Computer Repair",
      "Air Conditioner Repair",
      "Plumbing Repair",
      "Dishwasher Repair",
      "Washing Machine Repair",
      "Faucet Repair",
      "Electronic Board Repair",
      "Pipe Repair",
      "Data Recovery",
      "PC Assembly",
      "Internet Device Connection Assistance",

      // Renovation & Construction
      "Bathroom Renovation",
      "Kitchen Remodeling",
      "House Renovation",
      "Renovations",
      "Wall Plastering",
      "Wall Repair",
      "Electrical System Renovation",
      "Custom Furniture",
      "Custom Wardrobe",
      "Furniture Restoration",
      "Interior Wall Decoration",
      "Interior Design",
      "Floor Installation",
      "Drywall False Ceiling",
      "Drywall Bookcase",
      "Drywall Partition Walls",
      "Construction Company",

      // Moving & Storage
      "Moving Services",
      "Small Removals",
      "Furniture Transport",
      "Storage Services",
      "Self Storage",
      "Furniture Disposal",
      "Used Furniture Pickup",
      "Clearance",
      "Apartment Clearance",
      "Asbestos Disposal",
      "Waste Disposal",
      "Cellular Clearance",
      "Relocation",
      "Furniture Removal",
    ],
    'local-professional': [
      // Legal & Professional Services
      "Lawyer",
      "Civil Lawyer",
      "Notary",
      
      // Healthcare & Wellness
      "Psychologist",
      "Child Psychologist",
      "Online Psychologist",
      "Psychologist for Adolescents",
      "Psychotherapist",
      "Marriage Counselor",
      "Dietician",
      "Online Dietitian",
      "Physiotherapist",
      "Physiotherapy",
      "Nutritionist",
      "Online Nutritionist",
      "Osteopath",
      "Sexologist",
      
      // Therapy & Counseling
      "Couple Therapy",
      "Online Therapy",
      "Psychotherapy",
      "Cognitive Behavioral Psychotherapy",
      
      // Personal Training & Fitness
      "Personal Trainer",
      "Home Personal Trainer",
      "Online Personal Trainer",
      
      // Massage Therapy
      "Massage",
      "Massage Therapist",
      "Anti-Cellulite Massage",
      "Ayurvedic Massage",
      "Californian Massage",
      "Decontracting Massage",
      "Lymphatic Drainage Massage",
      "Holistic Massage",
      "Relaxing Massage",
      "Shiatsu Massage",
      "Sports Massage",
      "Therapeutic Massage",
      "Massage for Men",
      
      // Transportation Services
      "Airport Transfer",
      "Chauffeur Service",
      
      // Event Services
      "Children's Birthday Entertainment"
    ],
    'international': [
      // Tech & Development
      "Web Development",
      "Mobile Development",
      "Web Developer",
      "Mobile App Developer",
      "IT Support Specialist",
      
      // Marketing & Digital
      "Digital Marketing",
      "Advertising Marketing",
      "Google Specialist",
      "Google Adwords Specialist",
      "Social Marketing Specialist",
      "Social Media Manager",
      
      // Business & Legal
      "Business Consulting",
      "Business Consultant",
      "Legal Services",
      "Financial Advisor",
      "Lawyer",
      
      // Language Services
      "Language Tutor",
      "Translator",
      
      // Creative Services
      "Design",
      "Writing",
      "Content Writer",
      "Graphic Designer",
      
      // Event Services
      "Wedding Planner",
      "Event Organizer"
    ]
  };

  const handleAddCategory = () => {
    if (newCategory.trim() !== '') {
      const tags = newTags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
      const newCustomCategory = {
        name: newCategory.trim(),
        tags,
        type: selectedType
      };
      setCustomCategories([...customCategories, newCustomCategory]);
      setNewCategory('');
      setNewTags('');
      setIsDialogOpen(false);
    }
  };

  const filteredCategories = [
    ...categories[selectedType] || [],
    ...customCategories
      .filter(cat => cat.type === selectedType)
      .map(cat => cat.name)
  ].filter(category => 
    category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white" style={{ textAlign: 'left' }}>
      <SharedHeader11/>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Type Selector */}
        <div className="flex gap-4 justify-center mb-8">
          <button
            onClick={() => setSelectedType('local-home')}
            className={`px-6 py-2 rounded-md ${
              selectedType === 'local-home' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Home Services
          </button>
          <button
            onClick={() => setSelectedType('local-professional')}
            className={`px-6 py-2 rounded-md ${
              selectedType === 'local-professional' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Professional Services
          </button>
          <button
            onClick={() => setSelectedType('international')}
            className={`px-6 py-2 rounded-md ${
              selectedType === 'international' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            International
          </button>
        </div>

        {/* Search Section */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search location..."
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Add Category Button */}
        <button 
          onClick={() => setIsDialogOpen(true)}
          className="mb-8 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Category
        </button>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-12">
          {filteredCategories.map((category, index) => (
            <Card 
              key={index}
              className="p-4 hover:shadow-md transition-shadow cursor-pointer bg-white"
            >
              <p className="text-center text-sm font-medium text-gray-800">{category}</p>
            </Card>
          ))}
        </div>

        {/* Add Category Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader className="flex justify-between items-center">
              <DialogTitle>Add New Category</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded-full"
                onClick={() => setIsDialogOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Category Name</label>
                <Input
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Enter category name"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Tags (comma-separated)</label>
                <Input
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="Enter tags, separated by commas"
                  className="mt-1"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddCategory}>
                  Add Category
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Locations Section */}
        <section>
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            Available Locations
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {locations.canada.provinces.map((province, index) => (
              <Card key={index} className="p-4 bg-white">
                <h3 className="font-medium mb-3">{province}</h3>
                <div className="space-y-2">
                  {locations.canada.cities[province.toLowerCase()].map((city, cityIndex) => (
                    <div 
                      key={cityIndex}
                      className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer"
                    >
                      {city}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <SharedFooter2 />
    </div>
  );
};

export default CategoriesAndLocation;