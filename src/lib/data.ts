
// Re-export everything from the refactored files
export type { Vehicle } from './types';
export { vehicles } from './vehicles-data';
export { 
  getVehicleById, 
  formatCurrency, 
  formatMileage, 
  getAllVehicleImages, 
  getImagesByCategory 
} from './vehicle-utils';
