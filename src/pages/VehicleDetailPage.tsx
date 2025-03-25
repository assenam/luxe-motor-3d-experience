
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getVehicleById } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VehicleShowcase from '@/components/VehicleShowcase';
import VehicleDetail from '@/components/VehicleDetail';
import { ArrowLeft } from 'lucide-react';

const VehicleDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const vehicle = id ? getVehicleById(id) : undefined;
  
  useEffect(() => {
    if (!vehicle) {
      navigate('/vehicles', { replace: true });
    }
    
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, [vehicle, navigate]);
  
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
              className="flex items-center text-luxe-black hover:text-luxe-gold transition-colors"
            >
              <ArrowLeft size={18} className="mr-2" />
              <span>Retour</span>
            </button>
            
            <h1 className="text-3xl md:text-4xl font-playfair font-semibold mt-6">
              {vehicle.brand} <span className="gold-accent">{vehicle.model}</span>
            </h1>
            <p className="text-luxe-lightgray mt-2">{vehicle.year} • {vehicle.exteriorColor}</p>
          </div>
        </div>
        
        <VehicleShowcase vehicle={vehicle} />
        <VehicleDetail vehicle={vehicle} />
        
        <section className="py-20 vehicle-highlight">
          <div className="container-luxe text-center">
            <h2 className="text-3xl font-playfair font-semibold mb-6">
              Intéressé par ce <span className="gold-accent">{vehicle.brand} {vehicle.model}</span>?
            </h2>
            <p className="max-w-2xl mx-auto mb-10 text-white/80">
              Nos conseillers sont disponibles pour répondre à toutes vos questions et organiser un essai personnalisé.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <button className="premium-button bg-luxe-gold hover:bg-luxe-gold/90 text-black">
                Achetez maintenant
              </button>
              <button className="premium-button bg-transparent border border-white hover:bg-white/10">
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
