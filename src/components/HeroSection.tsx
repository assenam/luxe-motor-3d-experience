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
      description: "Découvrez une nouvelle façon d'acheter votre véhicule de luxe avec une expérience immersive en 3D."
    },
    {
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000",
      title: "Collection",
      subtitle: "Exclusive",
      description: "Explorez notre sélection de véhicules d'exception soigneusement inspectés et préparés."
    },
    {
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2000",
      title: "Service",
      subtitle: "Conciergerie",
      description: "Bénéficiez d'un accompagnement personnalisé tout au long de votre parcours d'achat."
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
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Images with darker overlay for better text readability */}
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
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 sm:px-6">
        <div className="text-center max-w-4xl mx-auto">
          {/* Title container with increased height */}
          <div className="overflow-hidden h-32 md:h-48">
            {backgrounds.map((bg, idx) => (
              <h1 
                key={idx} 
                className={`text-4xl sm:text-5xl md:text-7xl font-playfair font-bold transition-transform duration-1000 text-shadow-lg ${
                  idx === activeIndex ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                }`}
              >
                {bg.title} <span className="gold-accent">{bg.subtitle}</span>
              </h1>
            ))}
          </div>
          
          {/* Description text with improved visibility */}
          <div className="overflow-hidden h-28 sm:h-32 mt-4 md:mt-6">
            {backgrounds.map((bg, idx) => (
              <p 
                key={idx} 
                className={`text-base sm:text-lg md:text-xl max-w-xl mx-auto transition-transform duration-1000 delay-300 
                  bg-black/60 backdrop-blur-md p-4 rounded shadow-xl text-white font-semibold ${
                  idx === activeIndex ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                }`}
              >
                {bg.description}
              </p>
            ))}
          </div>
          
          {/* Buttons with improved visibility */}
          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <Link 
              to="/vehicles" 
              className="premium-button bg-white/20 backdrop-blur-md border-2 border-white hover:bg-white/30 text-white font-bold shadow-lg"
            >
              Découvrir la Collection
            </Link>
            <Link 
              to="/contact" 
              className="premium-button bg-luxe-gold hover:bg-luxe-gold/90 text-black font-bold shadow-lg"
            >
              Rendez-vous Privé
            </Link>
          </div>
        </div>
        
        {/* Slide Indicators */}
        <div className="absolute bottom-28 sm:bottom-32 left-0 right-0 flex justify-center">
          <div className="flex space-x-2">
            {backgrounds.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === activeIndex ? 'bg-luxe-gold w-8' : 'bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* Scroll Down Indicator with improved visibility */}
        <button 
          onClick={scrollToDiscover}
          className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white hover:text-luxe-gold transition-colors bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full"
        >
          <span className="text-sm font-medium mb-1">Découvrir</span>
          <ChevronDown size={24} className="animate-soft-bounce" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
