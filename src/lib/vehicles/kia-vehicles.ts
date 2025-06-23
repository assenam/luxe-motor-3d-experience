
import { Vehicle } from '../types';

export const kiaVehicles: Vehicle[] = [
  {
    id: 'kia-xceed-1',
    brand: 'Kia',
    model: 'XCeed',
    year: 2021,
    price: 9000,
    mileage: 45000,
    engineType: '1.0 T-GDI',
    transmission: 'Manuelle',
    exteriorColor: 'Blanc',
    interiorColor: 'Noir',
    description: 'Crossover compact élégant avec un design moderne et des technologies avancées.',
    features: ['Climatisation automatique', 'Écran tactile 8"', 'Caméra de recul', 'Régulateur de vitesse', 'Jantes alliage 17"'],
    images: [
      '/lovable-uploads/kia-xceed-1.png',
      '/lovable-uploads/kia-xceed-2.png',
      '/lovable-uploads/kia-xceed-3.png'
    ],
    mainImage: '/lovable-uploads/kia-xceed-1.png',
    gallery: {
      exterior: ['/lovable-uploads/kia-xceed-1.png', '/lovable-uploads/kia-xceed-2.png'],
      interior: ['/lovable-uploads/kia-xceed-3.png'],
      engine: [],
      details: []
    }
  }
];
