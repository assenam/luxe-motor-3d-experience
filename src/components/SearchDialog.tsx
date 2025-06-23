
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { vehicles } from '@/lib/vehicles';
import { formatCurrency } from '@/lib/data';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSelectVehicle = (vehicleId: string) => {
    onOpenChange(false);
    setSearchQuery('');
    navigate(`/vehicles/${vehicleId}`);
  };

  const handleViewAllResults = () => {
    onOpenChange(false);
    setSearchQuery('');
    navigate(`/vehicles?search=${encodeURIComponent(searchQuery)}`);
  };

  // Filtrer les véhicules
  const filteredVehicles = searchQuery.length > 0 
    ? vehicles.filter(vehicle => {
        const query = searchQuery.toLowerCase().trim();
        return (
          vehicle.brand.toLowerCase().includes(query) ||
          vehicle.model.toLowerCase().includes(query) ||
          `${vehicle.brand} ${vehicle.model}`.toLowerCase().includes(query) ||
          vehicle.year.toString().includes(query) ||
          vehicle.exteriorColor.toLowerCase().includes(query)
        );
      }).slice(0, 8)
    : [];

  const totalResults = searchQuery.length > 0 
    ? vehicles.filter(vehicle => {
        const query = searchQuery.toLowerCase().trim();
        return (
          vehicle.brand.toLowerCase().includes(query) ||
          vehicle.model.toLowerCase().includes(query) ||
          `${vehicle.brand} ${vehicle.model}`.toLowerCase().includes(query) ||
          vehicle.year.toString().includes(query) ||
          vehicle.exteriorColor.toLowerCase().includes(query)
        );
      }).length
    : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0">
        <div className="border-b border-gray-200 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher par marque, modèle, année ou couleur..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-10 h-12 text-base"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {searchQuery.length === 0 && (
            <div className="p-6 text-center">
              <p className="text-gray-500">Commencez à taper pour rechercher des véhicules...</p>
            </div>
          )}

          {searchQuery.length > 0 && filteredVehicles.length === 0 && (
            <div className="p-6 text-center">
              <p className="text-gray-500">Aucun véhicule trouvé pour "{searchQuery}"</p>
            </div>
          )}

          {filteredVehicles.length > 0 && (
            <div className="p-2">
              <div className="mb-3 px-3 py-2 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-700">
                  {totalResults} véhicule{totalResults > 1 ? 's' : ''} trouvé{totalResults > 1 ? 's' : ''}
                </p>
              </div>

              <div className="space-y-2">
                {filteredVehicles.map((vehicle) => (
                  <button
                    key={vehicle.id}
                    onClick={() => handleSelectVehicle(vehicle.id)}
                    className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <img 
                      src={vehicle.mainImage} 
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      className="w-16 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        {vehicle.brand} {vehicle.model}
                      </div>
                      <div className="text-sm text-gray-500">
                        {vehicle.year} • {formatCurrency(vehicle.price)} • {vehicle.exteriorColor}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {totalResults > 8 && (
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <button
                    onClick={handleViewAllResults}
                    className="w-full py-3 px-4 bg-age-red text-white rounded-lg font-medium hover:bg-age-darkred transition-colors"
                  >
                    Voir tous les résultats ({totalResults} véhicules)
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
