
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Shield, Award, Clock, Users, Gauge, ThumbsUp } from 'lucide-react';
import { useEffect } from 'react';

const About = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
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
    
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <section className="relative py-20 bg-fixed bg-center bg-cover" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2000)' }}>
          <div className="container-luxe text-center text-white">
            <h1 className="text-4xl md:text-5xl font-playfair font-semibold mb-6">
              À Propos de <span className="gold-accent">LuxeMotor</span>
            </h1>
            <p className="max-w-2xl mx-auto mb-10 text-white/80 text-lg">
              Une expérience d'achat automobile d'exception, alliant expertise technique et service personnalisé.
            </p>
          </div>
        </section>
        
        <section className="section-padding bg-white">
          <div className="container-luxe">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="md:w-1/2">
                <div className="animate-on-scroll">
                  <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-6">
                    Notre <span className="gold-accent">Histoire</span>
                  </h2>
                  <p className="text-luxe-lightgray mb-6 leading-relaxed">
                    Fondée en 2015 par Philippe Marchand, ancien directeur d'une concession de prestige, LuxeMotor est née d'une vision simple mais ambitieuse : réinventer l'expérience d'achat automobile d'exception.
                  </p>
                  <p className="text-luxe-lightgray mb-6 leading-relaxed">
                    Face à un marché traditionnel souvent opaque et impersonnel, nous avons créé un service qui place la transparence, l'expertise et la relation client au cœur de notre approche. Notre équipe, composée de passionnés d'automobile ayant évolué dans les plus grandes maisons, partage cette vision de l'excellence et de l'authenticité.
                  </p>
                  <p className="text-luxe-lightgray leading-relaxed">
                    Aujourd'hui, LuxeMotor s'est imposé comme la référence pour les amateurs de véhicules d'exception en quête d'une expérience d'achat à la hauteur de leurs attentes.
                  </p>
                </div>
              </div>
              
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1600361803672-088145fb2906?q=80&w=1000" 
                  alt="Notre showroom" 
                  className="rounded-sm shadow-xl animate-on-scroll"
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-24 bg-secondary">
          <div className="container-luxe text-center">
            <h2 className="text-3xl font-playfair font-semibold mb-16">
              Notre <span className="gold-accent">Philosophie</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="animate-on-scroll luxury-card p-8 flex flex-col items-center">
                <div className="bg-luxe-gold/10 p-4 rounded-full mb-6">
                  <Shield className="text-luxe-gold" size={32} />
                </div>
                <h3 className="text-xl font-playfair font-semibold mb-3">Transparence Totale</h3>
                <p className="text-luxe-lightgray">
                  Nous croyons qu'une relation de confiance se construit sur la transparence. Chaque véhicule proposé est accompagné d'un dossier complet détaillant son historique et sa condition.
                </p>
              </div>
              
              <div className="animate-on-scroll luxury-card p-8 flex flex-col items-center" style={{ animationDelay: '150ms' }}>
                <div className="bg-luxe-gold/10 p-4 rounded-full mb-6">
                  <Award className="text-luxe-gold" size={32} />
                </div>
                <h3 className="text-xl font-playfair font-semibold mb-3">Excellence Technique</h3>
                <p className="text-luxe-lightgray">
                  Notre équipe technique, composée d'anciens chefs d'atelier de marques prestigieuses, inspecte rigoureusement chaque véhicule selon un protocole de 150 points.
                </p>
              </div>
              
              <div className="animate-on-scroll luxury-card p-8 flex flex-col items-center" style={{ animationDelay: '300ms' }}>
                <div className="bg-luxe-gold/10 p-4 rounded-full mb-6">
                  <Clock className="text-luxe-gold" size={32} />
                </div>
                <h3 className="text-xl font-playfair font-semibold mb-3">Service Sur-Mesure</h3>
                <p className="text-luxe-lightgray">
                  Nous accompagnons personnellement chaque client, de la recherche à la livraison, avec une disponibilité et une attention qui définissent l'expérience LuxeMotor.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="section-padding bg-white">
          <div className="container-luxe">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-playfair font-semibold mb-6">
                Notre <span className="gold-accent">Équipe</span>
              </h2>
              <p className="max-w-2xl mx-auto text-luxe-lightgray">
                Des professionnels passionnés, experts dans leur domaine, réunis par une même vision de l'excellence.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="animate-on-scroll luxury-card p-6 text-center">
                <div className="mb-6 overflow-hidden rounded-full w-36 h-36 mx-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=400" 
                    alt="Philippe Marchand" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-playfair font-semibold mb-1">Philippe Marchand</h3>
                <p className="text-luxe-gold mb-3">Fondateur & Directeur</p>
                <p className="text-luxe-lightgray text-sm">
                  Ancien directeur de concession Ferrari, Philippe a fondé LuxeMotor avec la vision de créer un service d'excellence dans le secteur automobile de prestige.
                </p>
              </div>
              
              <div className="animate-on-scroll luxury-card p-6 text-center" style={{ animationDelay: '150ms' }}>
                <div className="mb-6 overflow-hidden rounded-full w-36 h-36 mx-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1506863530036-1efeddceb993?q=80&w=400" 
                    alt="Sophie Lefevre" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-playfair font-semibold mb-1">Sophie Lefevre</h3>
                <p className="text-luxe-gold mb-3">Directrice Relation Client</p>
                <p className="text-luxe-lightgray text-sm">
                  Avec 15 ans d'expérience dans le luxe, Sophie coordonne notre service de conciergerie et veille personnellement à la satisfaction de chaque client.
                </p>
              </div>
              
              <div className="animate-on-scroll luxury-card p-6 text-center" style={{ animationDelay: '300ms' }}>
                <div className="mb-6 overflow-hidden rounded-full w-36 h-36 mx-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400" 
                    alt="Marc Dubois" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-playfair font-semibold mb-1">Marc Dubois</h3>
                <p className="text-luxe-gold mb-3">Directeur Technique</p>
                <p className="text-luxe-lightgray text-sm">
                  Ancien chef d'atelier Porsche, Marc supervise notre équipe technique et les 150 points de contrôle que chaque véhicule doit satisfaire avant d'intégrer notre collection.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="relative py-28 bg-fixed bg-center bg-cover" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.unsplash.com/photo-1606152536277-5aa1fd33e150?q=80&w=2000)' }}>
          <div className="container-luxe text-center text-white">
            <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-6">
              Rejoignez l'<span className="gold-accent">Expérience</span>
            </h2>
            <p className="max-w-2xl mx-auto mb-10 text-white/80 text-lg">
              Découvrez notre collection de véhicules d'exception et vivez une expérience d'achat automobile inédite.
            </p>
            <a href="/vehicles" className="premium-button bg-luxe-gold hover:bg-luxe-gold/90 text-black">
              Découvrir nos Véhicules
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
