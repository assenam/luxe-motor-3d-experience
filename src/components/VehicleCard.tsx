
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Info, ShoppingCart, Check } from 'lucide-react';
import { Vehicle, formatCurrency, formatMileage } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

interface VehicleCardProps {
  vehicle: Vehicle;
  index: number;
}

const VehicleCard = ({ vehicle, index }: VehicleCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { addToCart, isInCart } = useCart();
  const alreadyInCart = isInCart(vehicle.id);

  useEffect(() => {
    const card = cardRef.current;
    
    if (!card) return;
    
    const animateOnScroll = () => {
      const rect = card.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.85;
      
      if (isVisible) {
        card.classList.add('animated');
      }
    };
    
    animateOnScroll(); // Check on initial load
    window.addEventListener('scroll', animateOnScroll);
    
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(vehicle);
  };
  
  return (
    <div 
      ref={cardRef} 
      className={`animate-on-scroll luxury-card rounded-sm overflow-hidden group hover:shadow-xl`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="relative overflow-hidden h-60">
        <img 
          src={vehicle.mainImage} 
          alt={`${vehicle.brand} ${vehicle.model}`} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-4">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-xl font-playfair font-semibold">
                {vehicle.brand} <span className="gold-accent">{vehicle.model}</span>
              </h3>
              <p className="text-sm text-gray-200">{vehicle.year} &middot; {formatMileage(vehicle.mileage)}</p>
            </div>
            <span className="text-luxe-gold font-playfair text-xl font-medium">
              {formatCurrency(vehicle.price)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-sm">
            <span className="text-luxe-lightgray">Moteur</span>
            <p className="font-medium text-luxe-black">{vehicle.engineType}</p>
          </div>
          <div className="text-sm">
            <span className="text-luxe-lightgray">Transmission</span>
            <p className="font-medium text-luxe-black">{vehicle.transmission}</p>
          </div>
          <div className="text-sm">
            <span className="text-luxe-lightgray">Extérieur</span>
            <p className="font-medium text-luxe-black">{vehicle.exteriorColor}</p>
          </div>
          <div className="text-sm">
            <span className="text-luxe-lightgray">Intérieur</span>
            <p className="font-medium text-luxe-black">{vehicle.interiorColor}</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-5">
          <div className="flex gap-2">
            <Link 
              to={`/vehicles/${vehicle.id}`}
              className="flex items-center text-luxe-black font-medium hover:text-luxe-gold transition-colors"
            >
              <span>Détails</span>
              <ChevronRight size={18} className="ml-1" />
            </Link>
            
            <Button
              onClick={handleAddToCart}
              variant="outline"
              size="sm"
              className={`ml-2 ${alreadyInCart ? 'bg-green-100 text-green-700 border-green-200' : ''}`}
              disabled={alreadyInCart}
            >
              {alreadyInCart ? (
                <Check size={16} className="mr-1" />
              ) : (
                <ShoppingCart size={16} className="mr-1" />
              )}
              {alreadyInCart ? 'Ajouté' : 'Ajouter'}
            </Button>
          </div>
          
          <Link
            to={`/vehicles/${vehicle.id}#details`}
            className="text-luxe-black hover:text-luxe-gold transition-colors"
          >
            <Info size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
