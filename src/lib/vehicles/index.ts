
import { Vehicle } from '../types';
import { audiVehicles } from './audi-vehicles';
import { mercedesVehicles } from './mercedes-vehicles';
import { kiaVehicles } from './kia-vehicles';
import { renaultVehicles } from './renault-vehicles';
import { bmwVehicles } from './bmw-vehicles';
import { skodaVehicles } from './skoda-vehicles';
import { peugeotVehicles } from './peugeot-vehicles';
import { volkswagenVehicles } from './volkswagen-vehicles';
import { opelVehicles } from './opel-vehicles';
import { fordVehicles } from './ford-vehicles';
import { volvoVehicles } from './volvo-vehicles';
import { landRoverVehicles } from './land-rover-vehicles';
import { lexusVehicles } from './lexus-vehicles';

// Catalogue complet avec tous les véhicules organisés par marque
export const vehicles: Vehicle[] = [
  ...audiVehicles,
  ...kiaVehicles,
  ...mercedesVehicles,
  ...renaultVehicles,
  ...bmwVehicles,
  ...skodaVehicles,
  ...peugeotVehicles,
  ...volkswagenVehicles,
  ...opelVehicles,
  ...fordVehicles,
  ...volvoVehicles,
  ...landRoverVehicles,
  ...lexusVehicles
];

// Export des véhicules par marque pour un accès direct si nécessaire
export {
  audiVehicles,
  mercedesVehicles,
  kiaVehicles,
  renaultVehicles,
  bmwVehicles,
  skodaVehicles,
  peugeotVehicles,
  volkswagenVehicles,
  opelVehicles,
  fordVehicles,
  volvoVehicles,
  landRoverVehicles,
  lexusVehicles
};
