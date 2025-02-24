// VAT number validation utilities and components
import React, { useState, useEffect } from 'react';
import { Check, AlertCircle } from 'lucide-react';

// VAT number format validation for different countries
const vatFormats = {
  IT: /^IT[0-9]{11}$/, // Italian VAT format
  GB: /^GB[0-9]{9}$/, // UK VAT format
  DE: /^DE[0-9]{9}$/, // German VAT format
  FR: /^FR[A-Z0-9]{2}[0-9]{9}$/, // French VAT format
  ES: /^ES[A-Z0-9][0-9]{7}[A-Z0-9]$/, // Spanish VAT format
  // Add more country formats as needed
};

// Validate VAT number format
export const validateVatNumber = (vatNumber, country) => {
  const format = vatFormats[country];
  if (!format) return false;
  return format.test(vatNumber);
};

// Simulated API call to validate VAT number (replace with actual API)
const checkVatNumberWithApi = async (vatNumber) => {
  // In production, replace with actual VAT validation API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simple validation for demo purposes
      const isValid = Object.values(vatFormats).some(format => format.test(vatNumber));
      resolve({ isValid });
    }, 1000);
  });
};

// VAT Input Component
export const VatNumberInput = ({ value, onChange, country = 'IT', required = true }) => {
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!value) {
      setIsValid(false);
      setError('');
      return;
    }

    const validateVat = async () => {
      setIsValidating(true);
      setError('');

      // First check format
      if (!validateVatNumber(value, country)) {
        setIsValid(false);
        setError(`Invalid ${country} VAT number format`);
        setIsValidating(false);
        return;
      }

      try {
        // Check with API
        const { isValid: apiValid } = await checkVatNumberWithApi(value);
        setIsValid(apiValid);
        if (!apiValid) {
          setError('Invalid VAT number');
        }
      } catch (err) {
        setError('Error validating VAT number');
        setIsValid(false);
      } finally {
        setIsValidating(false);
      }
    };

    // Debounce validation
    const timeoutId = setTimeout(validateVat, 500);
    return () => clearTimeout(timeoutId);
  }, [value, country]);

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        VAT Number {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type="text"
          value={value || ''}
          onChange={(e) => {
            const newValue = e.target.value.toUpperCase();
            onChange(newValue);
          }}
          className={`w-full p-3 pr-10 border rounded-lg focus:ring-2 ${
            isValid ? 'border-green-300 focus:ring-green-200' :
            error ? 'border-red-300 focus:ring-red-200' :
            'border-gray-300 focus:ring-blue-200'
          }`}
          placeholder={`${country}XXXXXXXXX`}
          required={required}
        />
        <div className="absolute right-3 top-3">
          {isValidating ? (
            <div className="h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          ) : isValid ? (
            <Check className="h-5 w-5 text-green-500" />
          ) : error ? (
            <AlertCircle className="h-5 w-5 text-red-500" />
          ) : null}
        </div>
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      {isValid && (
        <p className="text-sm text-green-600">VAT number verified</p>
      )}
    </div>
  );
};

// Usage example in form:
export const VatNumberField = ({ formData, setFormData }) => {
  return (
    <VatNumberInput
      value={formData.vatNumber}
      onChange={(value) => setFormData({
        ...formData,
        vatNumber: value,
        vatVerified: false // Reset verification when number changes
      })}
      country="IT"
      required={true}
    />
  );
};