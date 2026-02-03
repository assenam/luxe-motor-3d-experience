
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Vehicle } from '@/lib/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VehicleShowcase from '@/components/VehicleShowcase';
import VehicleDetail from '@/components/VehicleDetail';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const VehicleDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchVehicle = async () => {
      if (!id) {
        navigate('/vehicles', { replace: true });
        return;
      }

      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('vehicles')
          .select('*')
          .eq('id', id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching vehicle:', error);
          navigate('/vehicles', { replace: true });
          return;
        }

        if (!data) {
          navigate('/vehicles', { replace: true });
          return;
        }

        // Transform database format to Vehicle type
        const transformedVehicle: Vehicle = {
          id: data.id,
          brand: data.brand,
          model: data.model,
          year: data.year,
          price: data.price,
          mileage: data.mileage,
          engineType: data.engine_type,
          transmission: data.transmission,
          exteriorColor: data.exterior_color || '',
          interiorColor: data.interior_color || '',
          description: data.description || '',
          features: data.features || [],
          images: data.images || [],
          mainImage: data.main_image || '',
          gallery: typeof data.gallery === 'object' && data.gallery !== null ? {
            exterior: (data.gallery as Record<string, string[]>).exterior || [],
            interior: (data.gallery as Record<string, string[]>).interior || [],
            engine: (data.gallery as Record<string, string[]>).engine || [],
            details: (data.gallery as Record<string, string[]>).details || [],
          } : {
            exterior: [],
            interior: [],
            engine: [],
            details: [],
          },
        };

        setVehicle(transformedVehicle);
      } catch (err) {
        console.error('Error:', err);
        navigate('/vehicles', { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicle();
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, [id, navigate]);
  
  const handleBuyNow = () => {
    if (!vehicle) return;
    navigate('/payment', { state: { vehicle: vehicle } });
    toast({
      title: "Redirection vers le formulaire",
      description: "Complétez vos informations pour finaliser votre commande."
    });
  };
  
  const handleContactAdvisor = () => {
    if (!vehicle) return;
    navigate('/contact', { state: { vehicle: vehicle, subject: 'conseil' } });
    toast({
      title: "Demande de conseil",
      description: "Un de nos conseillers vous contactera prochainement."
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-3 text-lg">Chargement du véhicule...</span>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!vehicle) {
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <div className="container-luxe">
          <div className="py-8">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center hover:text-primary transition-colors"
            >
              <ArrowLeft size={18} className="mr-2" />
              <span>Retour</span>
            </button>
            
            <h1 className="text-3xl md:text-4xl font-playfair font-semibold mt-6">
              {vehicle.brand} <span className="gold-accent">{vehicle.model}</span>
            </h1>
            <p className="text-muted-foreground mt-2">{vehicle.year} • {vehicle.exteriorColor}</p>
          </div>
        </div>
        
        <VehicleShowcase vehicle={vehicle} />
        <VehicleDetail vehicle={vehicle} buyNowHandler={handleBuyNow} />
        
        <section className="py-20 vehicle-highlight">
          <div className="container-luxe text-center">
            <h2 className="text-3xl font-playfair font-semibold mb-6">
              Intéressé par ce <span className="gold-accent">{vehicle.brand} {vehicle.model}</span>?
            </h2>
            <p className="max-w-2xl mx-auto mb-10 text-white/80">
              Nos conseillers sont disponibles pour répondre à toutes vos questions et organiser un essai personnalisé.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <button 
                onClick={handleBuyNow} 
                className="premium-button bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Achetez maintenant
              </button>
              <button 
                onClick={handleContactAdvisor}
                className="premium-button bg-transparent border border-white hover:bg-white/10"
              >
                Contacter un Conseiller
              </button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default VehicleDetailPage;
