
import { Vehicle } from './types';

// Catalogue avec l'Audi Q2, l'Audi RS3, la Kia XCeed, les Mercedes, la Renault Captur et la BMW Série 1
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
  },
  {
    id: "mercedes-cla-2013-001",
    brand: "Mercedes-Benz",
    model: "CLA",
    year: 2013,
    price: 7000,
    mileage: 163000,
    engineType: "220 CDI 170 ch",
    transmission: "Automatique",
    exteriorColor: "Noir Cosmos",
    interiorColor: "Noir",
    description: "Mercedes-Benz CLA 220 CDI en excellent état, véhicule élégant et sportif avec finition AMG. Moteur diesel performant et économique avec transmission automatique 7G-DCT. Design coupé 4 portes unique alliant style et praticité.",
    features: [
      "Transmission automatique 7G-DCT",
      "Finition AMG",
      "Moteur diesel CDI",
      "Climatisation automatique",
      "Système de navigation",
      "Bluetooth",
      "Jantes alliage AMG",
      "Feux LED",
      "Aide au stationnement",
      "Régulateur de vitesse",
      "Volant multifonctions",
      "Sièges sport",
      "Système audio COMAND"
    ],
    mainImage: "/lovable-uploads/a4f312cb-abcc-491b-bfa8-1f730269406b.png",
    images: [
      "/lovable-uploads/178e1ae6-81d5-4f08-9420-cf6f01557229.png",
      "/lovable-uploads/90fb92e8-74f5-4cef-924b-87336a0c7ef1.png",
      "/lovable-uploads/91a9d441-92bd-41fb-92a3-ab86cec59935.png",
      "/lovable-uploads/9e4211b5-9ef7-47c3-b9ee-ba5251d9dff6.png"
    ],
    gallery: {
      exterior: [
        "/lovable-uploads/a4f312cb-abcc-491b-bfa8-1f730269406b.png",
        "/lovable-uploads/178e1ae6-81d5-4f08-9420-cf6f01557229.png",
        "/lovable-uploads/90fb92e8-74f5-4cef-924b-87336a0c7ef1.png"
      ],
      interior: [
        "/lovable-uploads/91a9d441-92bd-41fb-92a3-ab86cec59935.png",
        "/lovable-uploads/d45e1c01-b17f-437c-a965-7f030b70e79d.png"
      ],
      engine: [],
      details: [
        "/lovable-uploads/9e4211b5-9ef7-47c3-b9ee-ba5251d9dff6.png"
      ]
    }
  },
  {
    id: "mercedes-a-class-2018-001",
    brand: "Mercedes-Benz",
    model: "Classe A",
    year: 2018,
    price: 8000,
    mileage: 99950,
    engineType: "AMG 163 ch",
    transmission: "Automatique",
    exteriorColor: "Blanc Polaire",
    interiorColor: "Noir avec éclairage d'ambiance",
    description: "Mercedes-Benz Classe A AMG avec toit panoramique en excellent état. Véhicule moderne et sportif avec finition AMG et éclairage d'ambiance. Motorisation essence performante de 163 ch avec transmission automatique. Design dynamique et technologie avancée.",
    features: [
      "Finition AMG",
      "Toit panoramique",
      "Transmission automatique",
      "Éclairage d'ambiance",
      "Écran tactile MBUX",
      "Système de navigation",
      "Climatisation automatique",
      "Jantes alliage AMG",
      "Feux LED",
      "Aide au stationnement",
      "Régulateur de vitesse",
      "Volant multifonctions",
      "Sièges sport",
      "Bluetooth"
    ],
    mainImage: "/lovable-uploads/6fc903bf-cd33-4ba9-be59-2880d6485c64.png",
    images: [
      "/lovable-uploads/5645abe2-4bbc-4f35-bf14-9cba59643546.png",
      "/lovable-uploads/a7e3eb0e-2278-47b6-81da-9740cf8762c6.png",
      "/lovable-uploads/65194684-5b8b-4121-8033-ec31f6b1251e.png",
      "/lovable-uploads/89388b03-116e-4d95-b253-19a621508b2e.png",
      "/lovable-uploads/fcf5eeb0-bf73-43a5-8696-0b70295b5a0e.png"
    ],
    gallery: {
      exterior: [
        "/lovable-uploads/6fc903bf-cd33-4ba9-be59-2880d6485c64.png",
        "/lovable-uploads/5645abe2-4bbc-4f35-bf14-9cba59643546.png",
        "/lovable-uploads/a7e3eb0e-2278-47b6-81da-9740cf8762c6.png"
      ],
      interior: [
        "/lovable-uploads/65194684-5b8b-4121-8033-ec31f6b1251e.png",
        "/lovable-uploads/89388b03-116e-4d95-b253-19a621508b2e.png"
      ],
      engine: [],
      details: [
        "/lovable-uploads/fcf5eeb0-bf73-43a5-8696-0b70295b5a0e.png"
      ]
    }
  },
  {
    id: "mercedes-c-class-2015-001",
    brand: "Mercedes-Benz",
    model: "Classe C",
    year: 2015,
    price: 8500,
    mileage: 87500,
    engineType: "180 156 ch",
    transmission: "Automatique",
    exteriorColor: "Gris Iridium",
    interiorColor: "Rouge Bengal",
    description: "Mercedes-Benz Classe C 180 en excellent état avec intérieur cuir rouge premium. Véhicule élégant et confortable avec motorisation diesel performante de 156 ch et transmission automatique. Finition soignée avec équipements de série complets.",
    features: [
      "Transmission automatique",
      "Intérieur cuir rouge",
      "Climatisation automatique",
      "Système de navigation",
      "Bluetooth",
      "Jantes alliage",
      "Feux LED",
      "Aide au stationnement",
      "Régulateur de vitesse",
      "Volant multifonctions",
      "Sièges électriques",
      "Système audio premium",
      "Ordinateur de bord",
      "Direction assistée"
    ],
    mainImage: "/lovable-uploads/7ab52a17-5aa2-4592-ae3f-9835371aa680.png",
    images: [
      "/lovable-uploads/b7fdbc6c-e422-42ed-bb30-cfc347b183ce.png",
      "/lovable-uploads/d3f13caa-8b30-45dc-b133-4bf51cb1137e.png",
      "/lovable-uploads/51881034-e694-44f4-8404-e7da17a53952.png",
      "/lovable-uploads/3ac3ab3f-3036-4ccf-8086-20cd570dc68f.png",
      "/lovable-uploads/120dcd34-70a3-41b4-8c26-87fdb6c285ce.png",
      "/lovable-uploads/0feafde7-f727-4087-9126-fde310714790.png",
      "/lovable-uploads/f93f717c-f54d-43b9-bff8-f113e4560fed.png",
      "/lovable-uploads/ac414bce-4bd7-4a04-98ca-35c0bccb55b8.png"
    ],
    gallery: {
      exterior: [
        "/lovable-uploads/7ab52a17-5aa2-4592-ae3f-9835371aa680.png",
        "/lovable-uploads/b7fdbc6c-e422-42ed-bb30-cfc347b183ce.png",
        "/lovable-uploads/d3f13caa-8b30-45dc-b133-4bf51cb1137e.png"
      ],
      interior: [
        "/lovable-uploads/51881034-e694-44f4-8404-e7da17a53952.png",
        "/lovable-uploads/120dcd34-70a3-41b4-8c26-87fdb6c285ce.png",
        "/lovable-uploads/f93f717c-f54d-43b9-bff8-f113e4560fed.png",
        "/lovable-uploads/ac414bce-4bd7-4a04-98ca-35c0bccb55b8.png"
      ],
      engine: [],
      details: [
        "/lovable-uploads/3ac3ab3f-3036-4ccf-8086-20cd570dc68f.png",
        "/lovable-uploads/0feafde7-f727-4087-9126-fde310714790.png"
      ]
    }
  },
  {
    id: "renault-captur-2017-001",
    brand: "Renault",
    model: "Captur",
    year: 2017,
    price: 3000,
    mileage: 115000,
    engineType: "0.9 TCe 90 ch",
    transmission: "Manuelle",
    exteriorColor: "Beige Dune",
    interiorColor: "Noir",
    description: "Renault Captur 0.9 TCe en bon état, véhicule compact et polyvalent parfait pour la ville et les escapades. Motorisation essence turbo économique de 90 ch avec transmission manuelle. SUV urbain moderne avec design distinctif bi-ton et habitacle spacieux.",
    features: [
      "Moteur turbo essence",
      "Transmission manuelle",
      "Climatisation automatique",
      "Système multimédia tactile",
      "Bluetooth",
      "Jantes alliage",
      "Feux antibrouillard",
      "Aide au stationnement",
      "Régulateur de vitesse",
      "Volant multifonctions",
      "USB/AUX",
      "Direction assistée",
      "Ordinateur de bord",
      "Start & Stop"
    ],
    mainImage: "/lovable-uploads/5ca956a8-e367-458c-a796-198234c37a23.png",
    images: [
      "/lovable-uploads/34b1e606-736c-4a50-afd5-9fbd85ce9a5e.png",
      "/lovable-uploads/40accb98-978a-4164-bb5d-783484f7bf6d.png",
      "/lovable-uploads/f5d37e23-a096-49bc-a8d4-162cc99b3a8c.png",
      "/lovable-uploads/0ae07cb9-8f83-4d21-be04-7b386b99be11.png",
      "/lovable-uploads/bef64545-b0e8-427a-afaa-06d136e86cf3.png"
    ],
    gallery: {
      exterior: [
        "/lovable-uploads/5ca956a8-e367-458c-a796-198234c37a23.png",
        "/lovable-uploads/34b1e606-736c-4a50-afd5-9fbd85ce9a5e.png",
        "/lovable-uploads/40accb98-978a-4164-bb5d-783484f7bf6d.png",
        "/lovable-uploads/f5d37e23-a096-49bc-a8d4-162cc99b3a8c.png",
        "/lovable-uploads/0ae07cb9-8f83-4d21-be04-7b386b99be11.png",
        "/lovable-uploads/bef64545-b0e8-427a-afaa-06d136e86cf3.png"
      ],
      interior: [
        "/lovable-uploads/a4f2e5be-eb22-43c9-9e52-e190fb26eea9.png",
        "/lovable-uploads/4d746195-cc4c-4808-895e-7a5c29b167f0.png",
        "/lovable-uploads/445df651-d71b-41c4-8e18-a253fc4c3c3d.png"
      ],
      engine: [],
      details: [
        "/lovable-uploads/d98d53af-8e34-4414-848d-a541637d47d8.png"
      ]
    }
  },
  {
    id: "bmw-serie1-2015-001",
    brand: "BMW",
    model: "Série 1",
    year: 2015,
    price: 3800,
    mileage: 89000,
    engineType: "1.6 essence 136 CV",
    transmission: "Manuelle",
    exteriorColor: "Noir Saphir",
    interiorColor: "Noir",
    description: "BMW Série 1 en excellent état, véhicule compact et sportif parfait pour la conduite urbaine. Motorisation essence performante de 136 CV avec transmission manuelle pour une conduite dynamique. Design BMW distinctif avec finition soignée et équipements premium.",
    features: [
      "Moteur essence 1.6L",
      "Transmission manuelle",
      "Climatisation automatique",
      "Système de navigation",
      "Bluetooth",
      "Jantes alliage BMW",
      "Feux LED",
      "Aide au stationnement",
      "Régulateur de vitesse",
      "Volant multifonctions",
      "Système audio premium",
      "USB/AUX",
      "Direction assistée",
      "Ordinateur de bord",
      "Sièges sport"
    ],
    mainImage: "/lovable-uploads/924ea3b3-6cc0-41e8-a300-3dad78b72382.png",
    images: [
      "/lovable-uploads/db684556-6e95-42b7-877f-8eb877889180.png",
      "/lovable-uploads/aae83367-1d33-4c35-990d-e5be58c96f67.png",
      "/lovable-uploads/2344404b-c30a-4fda-aa04-ac36682e2169.png",
      "/lovable-uploads/41cec8c7-cf34-4b0f-8f21-8fd5e7d2a9d6.png",
      "/lovable-uploads/995ac5ca-b517-4655-ab12-ca385db24564.png",
      "/lovable-uploads/b41c8e25-1906-4beb-8973-0cca50913213.png",
      "/lovable-uploads/36e8064d-db7e-47e9-b81c-2ee99447b904.png",
      "/lovable-uploads/8db9f425-59d2-4085-a375-7c66c06c2876.png",
      "/lovable-uploads/60b04bb2-f445-4273-82f6-2e753a8f798c.png"
    ],
    gallery: {
      exterior: [
        "/lovable-uploads/924ea3b3-6cc0-41e8-a300-3dad78b72382.png",
        "/lovable-uploads/db684556-6e95-42b7-877f-8eb877889180.png",
        "/lovable-uploads/aae83367-1d33-4c35-990d-e5be58c96f67.png",
        "/lovable-uploads/2344404b-c30a-4fda-aa04-ac36682e2169.png",
        "/lovable-uploads/41cec8c7-cf34-4b0f-8f21-8fd5e7d2a9d6.png"
      ],
      interior: [
        "/lovable-uploads/995ac5ca-b517-4655-ab12-ca385db24564.png",
        "/lovable-uploads/b41c8e25-1906-4beb-8973-0cca50913213.png",
        "/lovable-uploads/36e8064d-db7e-47e9-b81c-2ee99447b904.png",
        "/lovable-uploads/60b04bb2-f445-4273-82f6-2e753a8f798c.png"
      ],
      engine: [],
      details: [
        "/lovable-uploads/8db9f425-59d2-4085-a375-7c66c06c2876.png"
      ]
    }
  }
];
