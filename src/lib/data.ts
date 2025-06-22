
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

// Catalogue avec l'Audi Q2, l'Audi RS3 et la Kia XCeed
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
  },
  {
    id: "audi-rs3-2016-001",
    brand: "Audi",
    model: "RS3",
    year: 2016,
    price: 9000,
    mileage: 103500,
    engineType: "2.5 TFSI 367 ch",
    transmission: "Automatique",
    exteriorColor: "Gris Nardo",
    interiorColor: "Noir avec surpiqûres rouges",
    description: "Audi RS3 Sportback, version haute performance avec moteur 5 cylindres turbo développant 367 ch. Véhicule sportif d'exception avec transmission automatique S tronic. Finition RS avec éléments de carrosserie spécifiques et jantes alliage performance.",
    features: [
      "Moteur 5 cylindres turbo",
      "Transmission S tronic",
      "Suspension RS sport",
      "Freins haute performance",
      "Jantes alliage RS",
      "Sièges sport RS",
      "Différentiel arrière sport",
      "Échappement RS",
      "Système audio B&O",
      "Navigation plus",
      "Climatisation automatique",
      "Feux LED Matrix"
    ],
    mainImage: "/lovable-uploads/2d4fcbb2-74c5-4245-899d-e84caebba370.png",
    images: [
      "/lovable-uploads/98f2656e-9a5b-449b-8151-d864dea70f54.png",
      "/lovable-uploads/8d1a0baf-1e7f-4c80-9f85-f15243bc42a9.png",
      "/lovable-uploads/8a060793-673d-4a33-839f-f60fc778b9ab.png",
      "/lovable-uploads/ce386419-5cf4-42c9-8448-4f96f8e4d877.png"
    ],
    gallery: {
      exterior: [
        "/lovable-uploads/2d4fcbb2-74c5-4245-899d-e84caebba370.png",
        "/lovable-uploads/98f2656e-9a5b-449b-8151-d864dea70f54.png",
        "/lovable-uploads/8d1a0baf-1e7f-4c80-9f85-f15243bc42a9.png",
        "/lovable-uploads/8a060793-673d-4a33-839f-f60fc778b9ab.png"
      ],
      interior: [
        "/lovable-uploads/ce386419-5cf4-42c9-8448-4f96f8e4d877.png",
        "/lovable-uploads/4888d9ed-7115-4020-9164-2141593131a1.png",
        "/lovable-uploads/5b15dbec-834c-47a6-979a-97f970713124.png",
        "/lovable-uploads/e2bcf633-f274-45d3-a754-5bc19055abd8.png"
      ],
      engine: [],
      details: [
        "/lovable-uploads/91a1c47f-59db-4ec7-b4a1-2f15b3ef5b04.png",
        "/lovable-uploads/5e71b3f8-cc36-4ef2-8614-1c63806348d6.png"
      ]
    }
  },
  {
    id: "kia-xceed-2021-001",
    brand: "Kia",
    model: "XCeed",
    year: 2021,
    price: 9000,
    mileage: 10010,
    engineType: "1.6 GDI Plug-in Hybrid 141 ch",
    transmission: "Automatique",
    exteriorColor: "Gris Minéral",
    interiorColor: "Noir",
    description: "Kia XCeed Plug-in Hybrid Platinum en excellent état. Véhicule hybride rechargeable très récent avec seulement 10 010 km au compteur. Motorisation essence-électrique de 141 ch avec transmission automatique. Compatible E-10. Économique et écologique.",
    features: [
      "Moteur hybride rechargeable",
      "Transmission automatique",
      "Compatible E-10",
      "Finition Platinum",
      "Système de navigation",
      "Climatisation automatique",
      "Feux LED",
      "Jantes alliage",
      "Bluetooth",
      "Régulateur de vitesse",
      "Aide au stationnement",
      "Écran tactile"
    ],
    mainImage: "/lovable-uploads/6aa66d65-c305-4616-8986-d9d708ecf27e.png",
    images: [
      "/lovable-uploads/d6cbe1bc-8ff9-4137-b750-432b3126f849.png",
      "/lovable-uploads/e529b439-8679-4cee-935e-057b3e2baea5.png",
      "/lovable-uploads/cec8d4e1-7da5-42e5-b56b-ecfe0e99926e.png",
      "/lovable-uploads/415b312f-d647-4dc2-8d47-da8c91057e44.png"
    ],
    gallery: {
      exterior: [
        "/lovable-uploads/6aa66d65-c305-4616-8986-d9d708ecf27e.png",
        "/lovable-uploads/d6cbe1bc-8ff9-4137-b750-432b3126f849.png",
        "/lovable-uploads/e529b439-8679-4cee-935e-057b3e2baea5.png",
        "/lovable-uploads/cec8d4e1-7da5-42e5-b56b-ecfe0e99926e.png",
        "/lovable-uploads/3af56203-5bd9-42d4-ad32-9786efb81bea.png"
      ],
      interior: [
        "/lovable-uploads/415b312f-d647-4dc2-8d47-da8c91057e44.png",
        "/lovable-uploads/03d31556-4528-4574-aa13-a483fb3f5710.png"
      ],
      engine: [],
      details: []
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
