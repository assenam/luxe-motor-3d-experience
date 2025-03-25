
import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
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
      {/* Background Images with Fade Transition */}
      {backgrounds.map((bg, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 bg-center bg-cover transition-opacity duration-1000 ease-in-out ${
            idx === activeIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${bg.image})`,
          }}
        />
      ))}
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-6">
        <div className="text-center max-w-4xl mx-auto">
          <div className="overflow-hidden h-32 md:h-40">
            {backgrounds.map((bg, idx) => (
              <h1 
                key={idx} 
                className={`text-5xl md:text-7xl font-playfair font-bold transition-transform duration-1000 ${
                  idx === activeIndex ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                }`}
              >
                {bg.title} <span className="gold-accent">{bg.subtitle}</span>
              </h1>
            ))}
          </div>
          
          <div className="overflow-hidden h-24 mt-6">
            {backgrounds.map((bg, idx) => (
              <p 
                key={idx} 
                className={`text-lg md:text-xl max-w-xl mx-auto transition-transform duration-1000 delay-300 ${
                  idx === activeIndex ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                }`}
              >
                {bg.description}
              </p>
            ))}
          </div>
          
          <div className="mt-10">
            <Link 
              to="/vehicles" 
              className="premium-button bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white mx-2"
            >
              Découvrir la Collection
            </Link>
            <Link 
              to="/contact" 
              className="premium-button bg-luxe-gold hover:bg-luxe-gold/90 text-black mx-2"
            >
              Rendez-vous Privé
            </Link>
          </div>
        </div>
        
        {/* Slide Indicators */}
        <div className="absolute bottom-32 left-0 right-0 flex justify-center">
          <div className="flex space-x-2">
            {backgrounds.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === activeIndex ? 'bg-luxe-gold w-8' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* Scroll Down Indicator */}
        <button 
          onClick={scrollToDiscover}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/80 hover:text-white transition-colors"
        >
          <span className="text-sm font-light mb-2">Découvrir</span>
          <ChevronDown size={24} className="animate-soft-bounce" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
