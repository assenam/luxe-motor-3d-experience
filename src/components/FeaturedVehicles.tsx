
import { vehicles } from '@/lib/data';
import VehicleCard from './VehicleCard';
import { Link } from 'react-router-dom';

const FeaturedVehicles = () => {
  if (vehicles.length === 0) {
    return (
      <section id="discover" className="section-padding bg-white">
        <div className="container-luxe">
          <div className="mb-16 text-center">
            <span className="text-sm uppercase tracking-wider text-luxe-lightgray">Notre Sélection</span>
            <h2 className="text-4xl md:text-5xl font-playfair font-semibold mt-2">
              Véhicules d'<span className="gold-accent">Exception</span>
            </h2>
            <div className="w-24 h-px bg-luxe-gold mx-auto mt-6"></div>
          </div>
          
          <div className="text-center py-16">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-playfair font-semibold mb-4">
                Catalogue en Préparation
              </h3>
              <p className="text-lg text-luxe-lightgray mb-8">
                Nous préparons actuellement notre nouvelle sélection de véhicules d'exception. 
                Notre catalogue pourra accueillir jusqu'à 50 véhicules premium avec des galeries photo complètes.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="luxury-card p-6 text-center">
                  <div className="text-3xl font-bold text-luxe-gold mb-2">50</div>
                  <p className="text-sm">Véhicules maximum</p>
                </div>
                <div className="luxury-card p-6 text-center">
                  <div className="text-3xl font-bold text-luxe-gold mb-2">4</div>
                  <p className="text-sm">Catégories de photos</p>
                </div>
                <div className="luxury-card p-6 text-center">
                  <div className="text-3xl font-bold text-luxe-gold mb-2">∞</div>
                  <p className="text-sm">Images par véhicule</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Afficher seulement les 6 premiers véhicules
  const featuredVehicles = vehicles.slice(0, 6);

  return (
    <section id="discover" className="section-padding bg-white">
      <div className="container-luxe">
        <div className="mb-16 text-center">
          <span className="text-sm uppercase tracking-wider text-luxe-lightgray">Notre Sélection</span>
          <h2 className="text-4xl md:text-5xl font-playfair font-semibold mt-2">
            Véhicules d'<span className="gold-accent">Exception</span>
          </h2>
          <div className="w-24 h-px bg-luxe-gold mx-auto mt-6"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {featuredVehicles.map((vehicle, index) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
          ))}
        </div>
        
        {vehicles.length > 6 && (
          <div className="mt-16 text-center">
            <p className="text-luxe-lightgray mb-4">
              {vehicles.length - 6} autres véhicules disponibles
            </p>
            <Link to="/vehicles" className="premium-button">
              Explorer Tous les Véhicules
            </Link>
          </div>
        )}
        
        {vehicles.length <= 6 && (
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
