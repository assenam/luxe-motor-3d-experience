
import { useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import FeaturedVehicles from '@/components/FeaturedVehicles';
import PartnerBrands from '@/components/PartnerBrands';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Shield, Gauge, ThumbsUp } from 'lucide-react';

const Index = () => {
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = window.innerHeight * 0.85;
        
        if (elementTop < elementVisible) {
          element.classList.add('animated');
        }
      });
    };
    
    animateOnScroll(); // Check on initial load
    window.addEventListener('scroll', animateOnScroll);
    
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        
        <section className="section-padding bg-white">
          <div className="container-luxe">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="animate-on-scroll luxury-card p-8 text-center flex flex-col items-center">
                <div className="bg-luxe-gold/10 p-4 rounded-full mb-6">
                  <Shield className="text-luxe-gold" size={32} />
                </div>
                <h3 className="text-xl font-playfair font-semibold mb-3">Qualité Certifiée</h3>
                <p className="text-luxe-lightgray">
                  Chaque véhicule est inspecté sur 150 points et certifié par nos experts pour garantir une qualité irréprochable.
                </p>
              </div>
              
              <div className="animate-on-scroll luxury-card p-8 text-center flex flex-col items-center" style={{ animationDelay: '150ms' }}>
                <div className="bg-luxe-gold/10 p-4 rounded-full mb-6">
                  <Gauge className="text-luxe-gold" size={32} />
                </div>
                <h3 className="text-xl font-playfair font-semibold mb-3">Performance Garantie</h3>
                <p className="text-luxe-lightgray">
                  Des véhicules d'exception sélectionnés pour leur performance, leur fiabilité et leur historique impeccable.
                </p>
              </div>
              
              <div className="animate-on-scroll luxury-card p-8 text-center flex flex-col items-center" style={{ animationDelay: '300ms' }}>
                <div className="bg-luxe-gold/10 p-4 rounded-full mb-6">
                  <ThumbsUp className="text-luxe-gold" size={32} />
                </div>
                <h3 className="text-xl font-playfair font-semibold mb-3">Expérience Premium</h3>
                <p className="text-luxe-lightgray">
                  Un accompagnement personnalisé de la sélection à la livraison, pour une expérience d'achat sans compromis.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <PartnerBrands />
        
        <FeaturedVehicles />
        
        <section className="py-20 bg-secondary">
          <div className="container-luxe text-center">
            <h2 className="text-3xl font-playfair font-semibold mb-8">
              Rejoignez l'Expérience <span className="gold-accent">LuxeMotor</span>
            </h2>
            <div className="max-w-xl mx-auto">
              <form>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <input 
                    type="email" 
                    placeholder="Votre adresse email" 
                    className="flex-grow px-5 py-3 rounded-sm border border-gray-300 focus:outline-none focus:border-luxe-gold"
                  />
                  <button className="premium-button whitespace-nowrap">
                    S'inscrire
                  </button>
                </div>
                <p className="text-luxe-lightgray text-sm">
                  Recevez en avant-première nos nouveaux véhicules et nos événements exclusifs.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
