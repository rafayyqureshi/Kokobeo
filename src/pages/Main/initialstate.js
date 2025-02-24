// initialState.js
const initialState = {
    personal: {
      name: "John Smith",
      title: "Master Plumber",
      photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
      coverPhoto: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece",
      location: "Toronto, Canada", 
      bio: "Licensed master plumber with over 15 years of experience in residential and commercial plumbing services.",
      email: "john.smith@example.com",
      phone: "+1 (416) 555-0123",
      whatsapp: "+1 (416) 555-0124",
      emergencyPhone: "+1 (416) 555-0125"
    },
    businessInfo: {
      companyName: "Smith's Professional Plumbing",
      registrationNumber: "PLB123456",
      serviceAreas: ["North York", "Downtown Toronto", "Scarborough", "Etobicoke"],
      operatingHours: {
        regular: {
          weekdays: { start: "08:00", end: "18:00", enabled: true },
          weekends: { start: "09:00", end: "17:00", enabled: true }
        },
        emergency: {
          enabled: true,
          coverage: "24/7"
        }
      }
    },
    services: {
      regular: [
        {
          id: 1,
          name: "Pipe Repair & Installation",
          basePrice: 150,
          description: "Complete pipe services including repair, replacement, and new installations",
          enabled: true
        },
        {
          id: 2,
          name: "Water Heater Services",
          basePrice: 200,
          description: "Installation, repair, and maintenance of water heaters",
          enabled: true
        }
      ],
      emergency: {
        enabled: true,
        responseTime: 30,
        calloutFee: 85,
        hourlyRate: 150,
        services: [
          { id: 1, name: "Burst Pipes", enabled: true },
          { id: 2, name: "Severe Leaks", enabled: true }
        ]
      }
    },
    equipment: {
      items: [
        { id: 1, name: "Advanced Leak Detection Equipment", enabled: true },
        { id: 2, name: "CCTV Drain Camera", enabled: true }
      ]
    },
    safetyProtocols: {
      measures: [
        { id: 1, name: "COVID-19 Safety Protocols", enabled: true },
        { id: 2, name: "Personal Protective Equipment", enabled: true }
      ]
    }
  };
  
  export default initialState;