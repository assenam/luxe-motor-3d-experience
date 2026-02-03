
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Loader2 } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { formatCurrency } from '@/lib/data';

interface SearchVehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  exterior_color: string | null;
  main_image: string | null;
}

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [vehicles, setVehicles] = useState<SearchVehicle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch vehicles when search query changes
  useEffect(() => {
    const searchVehicles = async () => {
      if (searchQuery.length === 0) {
        setVehicles([]);
        return;
      }

      setIsLoading(true);
      try {
        const query = searchQuery.toLowerCase().trim();
        
        const { data, error } = await supabase
          .from('vehicles')
          .select('id, brand, model, year, price, exterior_color, main_image')
          .eq('is_available', true)
          .or(`brand.ilike.%${query}%,model.ilike.%${query}%,exterior_color.ilike.%${query}%`)
          .order('created_at', { ascending: false })
          .limit(20);

        if (error) {
          console.error('Error searching vehicles:', error);
          return;
        }

        // Also filter by year if the query is numeric
        let filteredData = data || [];
        if (/^\d+$/.test(query)) {
          const { data: yearData } = await supabase
            .from('vehicles')
            .select('id, brand, model, year, price, exterior_color, main_image')
            .eq('is_available', true)
            .eq('year', parseInt(query))
            .limit(10);
          
          if (yearData) {
            // Merge and deduplicate
            const existingIds = new Set(filteredData.map(v => v.id));
            yearData.forEach(v => {
              if (!existingIds.has(v.id)) {
                filteredData.push(v);
              }
            });
          }
        }

        setVehicles(filteredData);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchVehicles, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

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

  const displayedVehicles = vehicles.slice(0, 8);
  const totalResults = vehicles.length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0">
        <div className="border-b border-border p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {searchQuery.length === 0 && (
            <div className="p-6 text-center">
              <p className="text-muted-foreground">Commencez à taper pour rechercher des véhicules...</p>
            </div>
          )}

          {searchQuery.length > 0 && isLoading && (
            <div className="p-6 flex items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-primary mr-2" />
              <span className="text-muted-foreground">Recherche en cours...</span>
            </div>
          )}

          {searchQuery.length > 0 && !isLoading && vehicles.length === 0 && (
            <div className="p-6 text-center">
              <p className="text-muted-foreground">Aucun véhicule trouvé pour "{searchQuery}"</p>
            </div>
          )}

          {!isLoading && displayedVehicles.length > 0 && (
            <div className="p-2">
              <div className="mb-3 px-3 py-2 bg-secondary rounded-lg">
                <p className="text-sm font-medium">
                  {totalResults} véhicule{totalResults > 1 ? 's' : ''} trouvé{totalResults > 1 ? 's' : ''}
                </p>
              </div>

              <div className="space-y-2">
                {displayedVehicles.map((vehicle) => (
                  <button
                    key={vehicle.id}
                    onClick={() => handleSelectVehicle(vehicle.id)}
                    className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-secondary transition-colors text-left"
                  >
                    <img 
                      src={vehicle.main_image || '/placeholder.svg'} 
                      alt={`${vehicle.brand} ${vehicle.model}`}
                      className="w-16 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="font-medium">
                        {vehicle.brand} {vehicle.model}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {vehicle.year} • {formatCurrency(vehicle.price)} • {vehicle.exterior_color || 'N/A'}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {totalResults > 8 && (
                <div className="mt-4 pt-3 border-t border-border">
                  <button
                    onClick={handleViewAllResults}
                    className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
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
