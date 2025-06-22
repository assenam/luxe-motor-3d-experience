
import { Vehicle } from './types';
import { vehicles } from './vehicles-data';

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
