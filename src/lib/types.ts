
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
