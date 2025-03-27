
import { vehicles } from '@/lib/data';
import VehicleCard from './VehicleCard';

const FeaturedVehicles = () => {
  return (
    <section id="discover" className="section-padding bg-white">
      <div className="container-luxe">
        <div className="mb-16 text-center">
          <span className="text-sm uppercase tracking-wider text-luxe-lightgray">Notre Sélection</span>
          <h2 className="text-4xl md:text-5xl font-playfair font-semibold mt-2">
            Véhicules d'<span className="gold-accent">Occasion</span>
          </h2>
          <div className="w-24 h-px bg-luxe-gold mx-auto mt-6"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {vehicles.map((vehicle, index) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button className="premium-button">
            Explorer Tous les Véhicules
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedVehicles;
