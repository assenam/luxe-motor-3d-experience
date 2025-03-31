
import { Car, CarFront } from 'lucide-react';

type CarBrand = {
  name: string;
  logo: string | null;
  icon?: JSX.Element;
};

const PartnerBrands = () => {
  const carBrands: CarBrand[] = [
    {
      name: "Mercedes-Benz",
      logo: "https://images.unsplash.com/photo-1669134135362-41bd5b0dd472?auto=format&fit=crop&q=80&w=250&ixlib=rb-4.0.3",
      icon: <CarFront size={32} />
    },
    {
      name: "BMW",
      logo: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&q=80&w=250&ixlib=rb-4.0.3",
      icon: <Car size={32} />
    },
    {
      name: "Audi",
      logo: "https://images.unsplash.com/photo-1612825173281-9a193378527e?auto=format&fit=crop&q=80&w=250&ixlib=rb-4.0.3",
      icon: <Car size={32} />
    },
    {
      name: "Volkswagen",
      logo: "https://images.unsplash.com/photo-1609520505218-7421548a6859?auto=format&fit=crop&q=80&w=250&ixlib=rb-4.0.3",
      icon: <Car size={32} />
    },
    {
      name: "Porsche",
      logo: "https://images.unsplash.com/photo-1611596188649-87f1fddb4204?auto=format&fit=crop&q=80&w=250&ixlib=rb-4.0.3",
      icon: <CarFront size={32} />
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-age mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">Nos Marques Partenaires</h2>
          <p className="text-age-lightgray max-w-2xl mx-auto">
            Nous collaborons avec les marques automobiles allemandes les plus prestigieuses pour vous offrir les meilleurs véhicules d'occasion.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {carBrands.map((brand, index) => (
            <div 
              key={index} 
              className="animate-on-scroll flex flex-col items-center justify-center p-4 rounded-md hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {brand.logo ? (
                <div className="h-24 w-24 mb-4 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                  <img 
                    src={brand.logo} 
                    alt={`Logo ${brand.name}`} 
                    className="object-contain h-16 w-16"
                  />
                </div>
              ) : (
                <div className="h-24 w-24 mb-4 rounded-full bg-secondary flex items-center justify-center">
                  {brand.icon}
                </div>
              )}
              <span className="font-medium text-lg">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerBrands;
