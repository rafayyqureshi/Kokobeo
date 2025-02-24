import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/Button';

const PreviousPage = ({ className = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show back button on home page
  if (location.pathname === '/') {
    return null;
  }

  return (
    <div className={`max-w-7xl mx-auto px-4 py-4 ${className}`}>
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
        aria-label="Go back to previous page"
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="hidden sm:inline">Back</span>
      </Button>
    </div>
  );
};

export default PreviousPage;