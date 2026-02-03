
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Vehicle } from '@/lib/types';
import VehicleCard from './VehicleCard';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const FeaturedVehicles = () => {
  const [featuredVehicles, setFeaturedVehicles] = useState<Vehicle[]>([]);
  const [totalVehicles, setTotalVehicles] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedVehicles = async () => {
      setIsLoading(true);
      try {
        // Fetch featured vehicles (is_featured = true)
        const { data: featuredData, error: featuredError } = await supabase
          .from('vehicles')
          .select('*')
          .eq('is_available', true)
          .eq('is_featured', true)
          .order('created_at', { ascending: false })
          .limit(6);

        if (featuredError) {
          console.error('Error fetching featured vehicles:', featuredError);
          return;
        }

        // Get total count of available vehicles
        const { count, error: countError } = await supabase
          .from('vehicles')
          .select('*', { count: 'exact', head: true })
          .eq('is_available', true);

        if (countError) {
          console.error('Error fetching vehicle count:', countError);
        }

        // Transform database format to Vehicle type
        const transformedVehicles: Vehicle[] = (featuredData || []).map((v) => ({
          id: v.id,
          brand: v.brand,
          model: v.model,
          year: v.year,
          price: v.price,
          mileage: v.mileage,
          engineType: v.engine_type,
          transmission: v.transmission,
          exteriorColor: v.exterior_color || '',
          interiorColor: v.interior_color || '',
          description: v.description || '',
          features: v.features || [],
          images: v.images || [],
          mainImage: v.main_image || '',
          gallery: typeof v.gallery === 'object' && v.gallery !== null ? {
            exterior: (v.gallery as Record<string, string[]>).exterior || [],
            interior: (v.gallery as Record<string, string[]>).interior || [],
            engine: (v.gallery as Record<string, string[]>).engine || [],
            details: (v.gallery as Record<string, string[]>).details || [],
          } : {
            exterior: [],
            interior: [],
            engine: [],
            details: [],
          },
        }));

        setFeaturedVehicles(transformedVehicles);
        setTotalVehicles(count || 0);
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedVehicles();
  }, []);

  if (isLoading) {
    return (
      <section id="discover" className="section-padding bg-white">
        <div className="container-luxe">
          <div className="mb-16 text-center">
            <span className="text-sm uppercase tracking-wider text-muted-foreground">Notre Sélection</span>
            <h2 className="text-4xl md:text-5xl font-playfair font-semibold mt-2">
              Véhicules d'<span className="gold-accent">Exception</span>
            </h2>
            <div className="w-24 h-px bg-primary mx-auto mt-6"></div>
          </div>
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-3 text-lg">Chargement des véhicules...</span>
          </div>
        </div>
      </section>
    );
  }

  if (featuredVehicles.length === 0) {
    return (
      <section id="discover" className="section-padding bg-white">
        <div className="container-luxe">
          <div className="mb-16 text-center">
            <span className="text-sm uppercase tracking-wider text-muted-foreground">Notre Sélection</span>
            <h2 className="text-4xl md:text-5xl font-playfair font-semibold mt-2">
              Véhicules d'<span className="gold-accent">Exception</span>
            </h2>
            <div className="w-24 h-px bg-primary mx-auto mt-6"></div>
          </div>
          
          <div className="text-center py-16">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-playfair font-semibold mb-4">
                Catalogue en Préparation
              </h3>
              <p className="text-lg text-muted-foreground mb-8">
                Nous préparons actuellement notre nouvelle sélection de véhicules d'exception. 
                Notre catalogue pourra accueillir jusqu'à 50 véhicules premium avec des galeries photo complètes.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="luxury-card p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">50</div>
                  <p className="text-sm">Véhicules maximum</p>
                </div>
                <div className="luxury-card p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">4</div>
                  <p className="text-sm">Catégories de photos</p>
                </div>
                <div className="luxury-card p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">∞</div>
                  <p className="text-sm">Images par véhicule</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="discover" className="section-padding bg-white">
      <div className="container-luxe">
        <div className="mb-16 text-center">
          <span className="text-sm uppercase tracking-wider text-muted-foreground">Notre Sélection</span>
          <h2 className="text-4xl md:text-5xl font-playfair font-semibold mt-2">
            Véhicules d'<span className="gold-accent">Exception</span>
          </h2>
          <div className="w-24 h-px bg-primary mx-auto mt-6"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {featuredVehicles.map((vehicle, index) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
          ))}
        </div>
        
        {totalVehicles > featuredVehicles.length && (
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-4">
              {totalVehicles - featuredVehicles.length} autres véhicules disponibles
            </p>
            <Link to="/vehicles" className="premium-button">
              Explorer Tous les Véhicules
            </Link>
          </div>
        )}
        
        {totalVehicles <= featuredVehicles.length && (
          <div className="mt-16 text-center">
            <Link to="/vehicles" className="premium-button">
              Explorer Tous les Véhicules
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedVehicles;
