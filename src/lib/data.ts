
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
  modelUrl?: string; // 3D model URL
}

export const vehicles: Vehicle[] = [
  {
    id: "v001",
    brand: "Porsche",
    model: "911 Carrera S",
    year: 2021,
    price: 129500,
    mileage: 8765,
    engineType: "3.0L Flat-6 Twin-Turbo",
    transmission: "8-Speed PDK",
    exteriorColor: "GT Silver Metallic",
    interiorColor: "Black/Bordeaux Red",
    description: "Impeccably maintained Porsche 911 Carrera S with Sport Chrono Package and Premium Package. Single owner, maintained exclusively at Porsche service centers with complete service history.",
    features: [
      "Sport Chrono Package", 
      "Premium Package", 
      "Bose Surround Sound", 
      "14-way Power Sport Seats", 
      "Lane Change Assist",
      "Adaptive Cruise Control",
      "Porsche Ceramic Composite Brakes",
      "Rear-Axle Steering"
    ],
    images: [
      "https://images.unsplash.com/photo-1580274437636-1c384e617543?q=80&w=2000",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000",
      "https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?q=80&w=2000"
    ],
    mainImage: "https://images.unsplash.com/photo-1580274437636-1c384e617543?q=80&w=2000"
  },
  {
    id: "v002",
    brand: "Mercedes-Benz",
    model: "S 580 4MATIC",
    year: 2022,
    price: 145000,
    mileage: 12450,
    engineType: "4.0L V8 Biturbo",
    transmission: "9-Speed Automatic",
    exteriorColor: "Obsidian Black Metallic",
    interiorColor: "Macchiato Beige/Magma Grey",
    description: "Exceptional Mercedes-Benz S 580 with Executive Rear Seat Package and Warmth & Comfort Package. This vehicle represents the pinnacle of automotive luxury with its handcrafted materials and state-of-the-art technology.",
    features: [
      "Executive Rear Seat Package", 
      "Warmth & Comfort Package", 
      "Burmester® High-End 4D Surround Sound", 
      "MBUX Augmented Reality Navigation", 
      "Head-Up Display",
      "Energizing Comfort Control",
      "Active Ambient Lighting",
      "Digital Light with Projection Function"
    ],
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2000",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2000",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2000"
    ],
    mainImage: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2000"
  },
  {
    id: "v003",
    brand: "Audi",
    model: "RS e-tron GT",
    year: 2022,
    price: 139900,
    mileage: 9320,
    engineType: "Dual Electric Motors",
    transmission: "2-Speed Automatic",
    exteriorColor: "Daytona Gray Pearl",
    interiorColor: "Black with Red Stitching",
    description: "Audi RS e-tron GT offering breathtaking performance with zero emissions. This all-electric grand tourer combines cutting-edge technology with traditional Audi craftsmanship for an unparalleled driving experience.",
    features: [
      "Performance Battery Plus", 
      "Carbon Fiber Roof", 
      "Matrix LED Headlights", 
      "Bang & Olufsen Sound System", 
      "Carbon Ceramic Brakes",
      "Rear Wheel Steering",
      "Adaptive Air Suspension",
      "Night Vision Assistant"
    ],
    images: [
      "https://images.unsplash.com/photo-1656468014942-63ea32fb79be?q=80&w=2000",
      "https://images.unsplash.com/photo-1656468014942-63ea32fb79be?q=80&w=2000",
      "https://images.unsplash.com/photo-1656468014942-63ea32fb79be?q=80&w=2000"
    ],
    mainImage: "https://images.unsplash.com/photo-1656468014942-63ea32fb79be?q=80&w=2000"
  },
  {
    id: "v004",
    brand: "Tesla",
    model: "Model S Plaid",
    year: 2023,
    price: 119000,
    mileage: 5630,
    engineType: "Tri-Motor Electric",
    transmission: "Single-Speed",
    exteriorColor: "Midnight Silver Metallic",
    interiorColor: "Cream Premium Interior",
    description: "Revolutionary Tesla Model S Plaid with unmatched acceleration and range. This vehicle represents the future of sustainable transportation without compromising on performance or luxury.",
    features: [
      "Tri-Motor AWD", 
      "Full Self-Driving Capability", 
      "Premium Interior", 
      "Ultra White Seats", 
      "21\" Arachnid Wheels",
      "Glass Roof",
      "Premium Connectivity",
      "Active Air Suspension"
    ],
    images: [
      "https://images.unsplash.com/photo-1669905175195-7257767890ae?q=80&w=2000",
      "https://images.unsplash.com/photo-1669905175195-7257767890ae?q=80&w=2000",
      "https://images.unsplash.com/photo-1669905175195-7257767890ae?q=80&w=2000"
    ],
    mainImage: "https://images.unsplash.com/photo-1669905175195-7257767890ae?q=80&w=2000"
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
