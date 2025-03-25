
import { useState, useEffect } from 'react';
import { getAllVehicles } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VehicleCard from '@/components/VehicleCard';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Vehicles = () => {
  const vehicles = getAllVehicles();
  const [filteredVehicles, setFilteredVehicles] = useState(vehicles);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    brand: '',
    priceMin: '',
    priceMax: '',
    yearMin: '',
    yearMax: '',
  });
  
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = window.innerHeight * 0.85;
        
        if (elementTop < elementVisible) {
          element.classList.add('animated');
        }
      });
    };
    
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);
  
  useEffect(() => {
    // Apply filters
    let result = [...vehicles];
    
    if (filters.brand) {
      result = result.filter(vehicle => 
        vehicle.brand.toLowerCase().includes(filters.brand.toLowerCase())
      );
    }
    
    if (filters.priceMin) {
      result = result.filter(vehicle => 
        vehicle.price >= parseInt(filters.priceMin)
      );
    }
    
    if (filters.priceMax) {
      result = result.filter(vehicle => 
        vehicle.price <= parseInt(filters.priceMax)
      );
    }
    
    if (filters.yearMin) {
      result = result.filter(vehicle => 
        vehicle.year >= parseInt(filters.yearMin)
      );
    }
    
    if (filters.yearMax) {
      result = result.filter(vehicle => 
        vehicle.year <= parseInt(filters.yearMax)
      );
    }
    
    setFilteredVehicles(result);
  }, [filters, vehicles]);
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const clearFilters = () => {
    setFilters({
      brand: '',
      priceMin: '',
      priceMax: '',
      yearMin: '',
      yearMax: '',
    });
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  // Extract unique brands for filter
  const brands = [...new Set(vehicles.map(vehicle => vehicle.brand))];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <section className="relative py-16 bg-fixed bg-center bg-cover" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000)' }}>
          <div className="container-luxe text-center text-white">
            <h1 className="text-4xl md:text-5xl font-playfair font-semibold mb-6">
              Notre Collection <span className="gold-accent">d'Exception</span>
            </h1>
            <p className="max-w-2xl mx-auto mb-10 text-white/80 text-lg">
              Découvrez notre sélection de véhicules d'exception, soigneusement choisis pour leur qualité, leur histoire et leur caractère unique.
            </p>
          </div>
        </section>
        
        <section className="py-12 bg-secondary">
          <div className="container-luxe">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <div className="mb-4 md:mb-0">
                <h2 className="text-2xl font-playfair font-semibold">
                  {filteredVehicles.length} Véhicules disponibles
                </h2>
              </div>
              
              <div className="flex items-center">
                <Button 
                  onClick={toggleFilters} 
                  variant="outline" 
                  className="flex items-center gap-2"
                >
                  <Filter size={18} />
                  <span>Filtres</span>
                </Button>
              </div>
            </div>
            
            {/* Filters */}
            {showFilters && (
              <div className="glass-panel p-6 mb-8 rounded-sm animate-in fade-in-50 slide-in-from-top-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Affiner votre recherche</h3>
                  <Button 
                    onClick={clearFilters} 
                    variant="ghost" 
                    className="text-sm"
                  >
                    Réinitialiser
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Marque</label>
                    <select 
                      name="brand" 
                      value={filters.brand} 
                      onChange={handleFilterChange}
                      className="w-full px-4 py-2 rounded-sm border border-gray-300 focus:outline-none focus:border-luxe-gold"
                    >
                      <option value="">Toutes les marques</option>
                      {brands.map((brand) => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Prix (€)</label>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="number" 
                        name="priceMin" 
                        placeholder="Min" 
                        value={filters.priceMin} 
                        onChange={handleFilterChange}
                        className="w-full px-4 py-2 rounded-sm border border-gray-300 focus:outline-none focus:border-luxe-gold"
                      />
                      <span>-</span>
                      <input 
                        type="number" 
                        name="priceMax" 
                        placeholder="Max" 
                        value={filters.priceMax} 
                        onChange={handleFilterChange}
                        className="w-full px-4 py-2 rounded-sm border border-gray-300 focus:outline-none focus:border-luxe-gold"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Année</label>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="number" 
                        name="yearMin" 
                        placeholder="Min" 
                        value={filters.yearMin} 
                        onChange={handleFilterChange}
                        className="w-full px-4 py-2 rounded-sm border border-gray-300 focus:outline-none focus:border-luxe-gold"
                      />
                      <span>-</span>
                      <input 
                        type="number" 
                        name="yearMax" 
                        placeholder="Max" 
                        value={filters.yearMax} 
                        onChange={handleFilterChange}
                        className="w-full px-4 py-2 rounded-sm border border-gray-300 focus:outline-none focus:border-luxe-gold"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Vehicle Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVehicles.length > 0 ? filteredVehicles.map((vehicle) => (
                <div key={vehicle.id} className="animate-on-scroll">
                  <VehicleCard vehicle={vehicle} />
                </div>
              )) : (
                <div className="col-span-full text-center py-16">
                  <p className="text-xl text-luxe-lightgray mb-4">Aucun véhicule ne correspond à vos critères.</p>
                  <Button onClick={clearFilters} variant="outline">
                    Réinitialiser les filtres
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Vehicles;
