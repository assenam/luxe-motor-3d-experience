
import { Vehicle } from '../types';
import { audiVehicles } from './audi-vehicles';
import { mercedesVehicles } from './mercedes-vehicles';
import { kiaVehicles } from './kia-vehicles';
import { renaultVehicles } from './renault-vehicles';
import { bmwVehicles } from './bmw-vehicles';
import { skodaVehicles } from './skoda-vehicles';
import { peugeotVehicles } from './peugeot-vehicles';

// Catalogue complet avec tous les véhicules organisés par marque
export const vehicles: Vehicle[] = [
  ...audiVehicles,
  ...kiaVehicles,
  ...mercedesVehicles,
  ...renaultVehicles,
  ...bmwVehicles,
  ...skodaVehicles,
  ...peugeotVehicles
];

// Export des véhicules par marque pour un accès direct si nécessaire
export {
  audiVehicles,
  mercedesVehicles,
  kiaVehicles,
  renaultVehicles,
  bmwVehicles,
  skodaVehicles,
  peugeotVehicles
};
