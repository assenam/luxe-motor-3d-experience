import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();
  
  const backgrounds = [
    {
      image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?q=80&w=2000",
      title: "Expérience d'achat",
      subtitle: "Premium",
      description: "Découvrez une nouvelle façon d'acheter votre véhicule allemand de qualité avec une expérience personnalisée."
    },
    {
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000",
      title: "Collection",
      subtitle: "Exclusive",
      description: "Explorez notre sélection de véhicules allemands d'exception soigneusement inspectés et préparés."
    },
    {
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2000",
      title: "Service",
      subtitle: "International",
      description: "Bénéficiez d'un accompagnement personnalisé tout au long de votre parcours d'achat et d'exportation."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % backgrounds.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [backgrounds.length]);

  const scrollToDiscover = () => {
    const discoverSection = document.getElementById('discover');
    if (discoverSection) {
      discoverSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {backgrounds.map((bg, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 bg-center bg-cover transition-opacity duration-1000 ease-in-out ${
            idx === activeIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url(${bg.image})`,
          }}
        />
      ))}
      
      {/* Main content container with centered position and added pt-16 to push content down */}
      <div className="relative z-10 text-white px-4 sm:px-6 w-full flex flex-col items-center justify-center pt-16">
        {/* Title container */}
        <div className="w-full text-center mb-4">
          {backgrounds.map((bg, idx) => (
            <div 
              key={idx} 
              className={`transition-opacity duration-1000 ${
                idx === activeIndex ? 'opacity-100' : 'opacity-0 hidden'
              }`}
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-2">
                {bg.title} <span className="text-age-red">{bg.subtitle}</span>
              </h1>
            </div>
          ))}
        </div>
        
        {/* Description text */}
        <div className="w-full max-w-2xl mx-auto mb-12">
          {backgrounds.map((bg, idx) => (
            <div 
              key={idx} 
              className={`transition-opacity duration-1000 delay-300 ${
                idx === activeIndex ? 'opacity-100' : 'opacity-0 hidden'
              }`}
            >
              <p className="text-base sm:text-lg md:text-xl text-center p-5 bg-black/70 backdrop-blur-md rounded-md shadow-xl">
                {bg.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-8">
          <Link 
            to="/vehicles" 
            className="premium-button bg-white/20 backdrop-blur-md border-2 border-white hover:bg-white/30 text-white font-bold shadow-lg whitespace-nowrap"
          >
            Découvrir la Collection
          </Link>
          <Link 
            to="/contact" 
            className="premium-button bg-age-red hover:bg-age-red/90 text-white font-bold shadow-lg"
          >
            Rendez-vous Privé
          </Link>
        </div>
        
        {/* Slide Indicators */}
        <div className="absolute bottom-28 sm:bottom-32 left-0 right-0 flex justify-center">
          <div className="flex space-x-2">
            {backgrounds.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === activeIndex ? 'bg-age-red w-8' : 'bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* Scroll Down Indicator */}
        <button 
          onClick={scrollToDiscover}
          className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white hover:text-age-red transition-colors bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full"
        >
          <span className="text-sm font-medium mb-1">Découvrir</span>
          <ChevronDown size={24} className="animate-soft-bounce" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
