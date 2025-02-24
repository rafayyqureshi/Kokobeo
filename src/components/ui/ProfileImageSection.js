// ProfileImageSection.jsx
import React, { useState, useRef } from 'react';
import { Camera, Shield } from 'lucide-react';

const ProfileImageSection = ({ profileData, onImageChange }) => {
  const [isHovering, setIsHovering] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      onImageChange(imageUrl, file);
    }
  };

  return (
    <div 
      className="absolute left-1/2 sm:left-4 top-0 sm:relative transform -translate-x-1/2 sm:translate-x-0 sm:top-auto"
    >
      <div 
        className="relative w-28 h-28 sm:w-32 sm:h-32 group"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        
        {/* Profile Image Container */}
        <div className="w-full h-full rounded-full border-4 border-white shadow-lg overflow-hidden">
          <img 
            src={profileData.personal.photo}
            alt={profileData.personal.name}
            className="w-full h-full object-cover"
          />
          
          {/* Overlay on hover */}
          <div 
            className={`absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center cursor-pointer transition-opacity duration-200 ${
              isHovering ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={handleImageClick}
          >
            <Camera className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Verified Badge */}
        {profileData.personal.verified && (
          <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1.5 rounded-full">
            <Shield className="w-4 h-4" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileImageSection;