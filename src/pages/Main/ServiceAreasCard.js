import React, { useState } from 'react';
import { MapPin, Plus } from 'lucide-react';

const ServiceAreasCard = () => {
  const [formData, setFormData] = useState({
    serviceAreas: []
  });
  
  const [customArea, setCustomArea] = useState({
    area: '',
    province: '',
    district: ''
  });

  // Sample data - in production this would come from an API
  const provinces = [
    'Ontario',
    'Quebec',
    'British Columbia',
    'Alberta',
    'Manitoba'
  ];

  const districts = {
    'Ontario': ['Toronto', 'Mississauga', 'Ottawa', 'Hamilton', 'Brampton'],
    'Quebec': ['Montreal', 'Quebec City', 'Laval', 'Gatineau'],
    'British Columbia': ['Vancouver', 'Victoria', 'Surrey', 'Burnaby']
  };

  const handleAddCustomArea = () => {
    if (customArea.province) {
      const newArea = {
        name: customArea.area.trim(),
        province: customArea.province,
        district: customArea.district || ''
      };
      
      // Add the new area to the list
      setFormData(prevState => ({
        ...prevState,
        serviceAreas: [...prevState.serviceAreas, newArea]
      }));
      
      // Reset the input fields
      setCustomArea({
        area: '',
        province: '',
        district: ''
      });
    }
  };

  const handleRemoveArea = (index) => {
    setFormData(prevState => ({
      ...prevState,
      serviceAreas: prevState.serviceAreas.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm" style={{ textAlign: 'left' }}>
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl font-semibold">Service Areas</h2>
      </div>
      
      {/* Add Service Area Section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Add Service Area</h3>
        <div className="flex gap-4 items-start">
          <select
            className="flex-1 p-3 border rounded-lg bg-white text-left"
            value={customArea.province}
            onChange={(e) => setCustomArea({
              ...customArea,
              province: e.target.value,
              district: ''
            })}
          >
            <option value="">Select Province</option>
            {provinces.map((province) => (
              <option key={province} value={province} className="text-left">
                {province}
              </option>
            ))}
          </select>

          <select
            className="flex-1 p-3 border rounded-lg bg-white text-left"
            value={customArea.district}
            onChange={(e) => setCustomArea({
              ...customArea,
              district: e.target.value
            })}
            disabled={!customArea.province}
          >
            <option value="">Select District/Municipality</option>
            {customArea.province &&
              districts[customArea.province]?.map((district) => (
                <option key={district} value={district} className="text-left">
                  {district}
                </option>
              ))}
          </select>

          <input
            type="text"
            className="flex-1 p-3 border rounded-lg text-left"
            placeholder="Custom area name (optional)"
            value={customArea.area}
            onChange={(e) => setCustomArea({
              ...customArea,
              area: e.target.value
            })}
          />

          <button
            onClick={handleAddCustomArea}
            disabled={!customArea.province}
            className="p-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-300 flex items-center justify-center min-w-[48px]"
            type="button"
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Your Service Areas Section */}
      <div>
        <h3 className="text-lg font-medium mb-4">Your Service Areas</h3>
        <div className="flex flex-wrap gap-2">
          {formData.serviceAreas.map((area, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-left"
            >
              <span>
                {area.name ? `${area.name}, ` : ''}
                {area.district ? `${area.district}, ` : ''}
                {area.province}
              </span>
              <button
                onClick={() => handleRemoveArea(index)}
                className="text-gray-500 hover:text-gray-700"
                type="button"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceAreasCard;