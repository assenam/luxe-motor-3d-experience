

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  engineType: string;
  transmission: string;
  exteriorColor: string;
  interiorColor: string;
  description: string;
  features: string[];
  images: string[];
  mainImage: string;
  gallery: {
    exterior: string[];
    interior: string[];
    engine: string[];
    details: string[];
  };
  modelUrl?: string; // 3D model URL
}

// Catalogue avec l'Audi Q2 ajoutée
export const vehicles: Vehicle[] = [
  {
    id: "audi-q2-2020-001",
    brand: "Audi",
    model: "Q2",
    year: 2020,
    price: 14000,
    mileage: 36800,
    engineType: "1.5 TFSI 150 ch",
    transmission: "Automatique",
    exteriorColor: "Noir Mythos",
    interiorColor: "Noir",
    description: "Audi Q2 en excellent état, véhicule compact et élégant parfait pour la ville. Motorisation essence performante avec transmission automatique pour un confort de conduite optimal. Entretien régulier effectué, carnet d'entretien à jour.",
    features: [
      "Transmission automatique",
      "Climatisation automatique",
      "Système de navigation",
      "Bluetooth",
      "Jantes alliage",
      "Feux LED",
      "Aide au stationnement",
      "Régulateur de vitesse",
      "Volant multifonctions",
      "Sièges sport",
      "Système audio premium",
      "USB/AUX"
    ],
    mainImage: "/lovable-uploads/6ba2b43e-0355-47cc-945a-ebf62c12300d.png",
    images: [
      "/lovable-uploads/8a2f244d-cdc7-47e9-939b-f81369b1732a.png",
      "/lovable-uploads/2eb6fb7b-b157-4052-bd63-189fdf0a3b6e.png",
      "/lovable-uploads/15ba64dc-4501-4dd3-9514-94926ce6e967.png",
      "/lovable-uploads/9c80d789-1482-431e-99a9-beacfbb90250.png"
    ],
    gallery: {
      exterior: [
        "/lovable-uploads/6ba2b43e-0355-47cc-945a-ebf62c12300d.png",
        "/lovable-uploads/8a2f244d-cdc7-47e9-939b-f81369b1732a.png",
        "/lovable-uploads/2eb6fb7b-b157-4052-bd63-189fdf0a3b6e.png",
        "/lovable-uploads/15ba64dc-4501-4dd3-9514-94926ce6e967.png",
        "/lovable-uploads/9c80d789-1482-431e-99a9-beacfbb90250.png"
      ],
      interior: [
        "/lovable-uploads/8ba6d676-9dd8-4796-aad7-6fd737019cd8.png",
        "/lovable-uploads/dc13f147-871f-4c1e-a67e-8e12ede697eb.png",
        "/lovable-uploads/9fa0cf3b-af15-4704-abd9-64023f1635e9.png",
        "/lovable-uploads/e175ca3d-019d-4b6c-a376-9bcac369545b.png"
      ],
      engine: [],
      details: [
        "/lovable-uploads/b7544535-61bd-4c3c-8e39-37ca350030e9.png"
      ]
    }
  }
];

export const getVehicleById = (id: string): Vehicle | undefined => {
  return vehicles.find(vehicle => vehicle.id === id);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('fr-FR', { 
    style: 'currency', 
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatMileage = (mileage: number): string => {
  return new Intl.NumberFormat('fr-FR').format(mileage) + ' km';
};

// Fonction utilitaire pour obtenir toutes les images d'un véhicule
export const getAllVehicleImages = (vehicle: Vehicle): string[] => {
  const allImages = [vehicle.mainImage, ...vehicle.images];
  const galleryImages = [
    ...vehicle.gallery.exterior,
    ...vehicle.gallery.interior,
    ...vehicle.gallery.engine,
    ...vehicle.gallery.details
  ];
  return [...new Set([...allImages, ...galleryImages])].filter(Boolean);
};

// Fonction pour obtenir les images par catégorie
export const getImagesByCategory = (vehicle: Vehicle, category: keyof Vehicle['gallery']): string[] => {
  return vehicle.gallery[category] || [];
};

