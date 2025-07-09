
import { useEffect, useState } from 'react';
import HeroSection from '@/components/HeroSection';
import FeaturedVehicles from '@/components/FeaturedVehicles';
import ClientTestimonials from '@/components/ClientTestimonials';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/components/ui/use-toast';
import { CheckCircle, Users, Award, Globe } from 'lucide-react';

const Index = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

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
    
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer une adresse email valide.",
        variant: "destructive"
      });
      return;
    }
    
    console.log('Email submitted:', email);
    
    toast({
      title: "Inscription réussie!",
      description: "Merci pour votre inscription. Vous recevrez bientôt nos dernières nouvelles."
    });
    
    setEmail('');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        
        {/* Section Pourquoi nous choisir */}
        <section className="py-20 bg-white">
          <div className="container-age">
            <div className="text-center mb-16 animate-on-scroll">
              <h2 className="text-4xl font-bold mb-6">Pourquoi choisir Auto Germany Export ?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Nous sommes votre partenaire de confiance pour l'importation de véhicules allemands de qualité exceptionnelle.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center animate-on-scroll">
                <div className="bg-age-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-age-red" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Qualité Garantie</h3>
                <p className="text-gray-600">Tous nos véhicules sont soigneusement inspectés et certifiés avant l'export.</p>
              </div>
              
              <div className="text-center animate-on-scroll">
                <div className="bg-age-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-age-red" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Service Personnel</h3>
                <p className="text-gray-600">Un conseiller dédié vous accompagne du début à la fin de votre projet.</p>
              </div>
              
              <div className="text-center animate-on-scroll">
                <div className="bg-age-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-age-red" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Expertise</h3>
                <p className="text-gray-600">Plus de 10 ans d'expérience dans l'importation automobile allemande.</p>
              </div>
              
              <div className="text-center animate-on-scroll">
                <div className="bg-age-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-age-red" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Livraison Mondiale</h3>
                <p className="text-gray-600">Nous livrons dans le monde entier avec un service de transport sécurisé.</p>
              </div>
            </div>
          </div>
        </section>
        
        <FeaturedVehicles />
        
        <ClientTestimonials />
        
        {/* Section Statistiques */}
        <section className="py-20 bg-age-black text-white">
          <div className="container-age">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="animate-on-scroll">
                <div className="text-4xl font-bold text-age-red mb-2">500+</div>
                <p className="text-lg">Véhicules exportés</p>
              </div>
              <div className="animate-on-scroll">
                <div className="text-4xl font-bold text-age-red mb-2">98%</div>
                <p className="text-lg">Clients satisfaits</p>
              </div>
              <div className="animate-on-scroll">
                <div className="text-4xl font-bold text-age-red mb-2">25+</div>
                <p className="text-lg">Pays desservis</p>
              </div>
              <div className="animate-on-scroll">
                <div className="text-4xl font-bold text-age-red mb-2">10</div>
                <p className="text-lg">Années d'expérience</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Section Newsletter améliorée */}
        <section className="py-20 bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="container-age text-center">
            <div className="max-w-2xl mx-auto animate-on-scroll">
              <h2 className="text-3xl font-bold mb-6">
                Restez informé de nos dernières opportunités
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Recevez en avant-première nos nouveaux véhicules disponibles et nos offres exclusives.
              </p>
              
              <form onSubmit={handleSubscribe} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <input 
                    type="email" 
                    placeholder="Votre adresse email" 
                    className="flex-grow px-5 py-3 rounded-sm border border-gray-300 focus:outline-none focus:border-age-red focus:ring-1 focus:ring-age-red"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button 
                    type="submit" 
                    className="premium-button whitespace-nowrap px-8"
                  >
                    S'inscrire gratuitement
                  </button>
                </div>
                <p className="text-gray-500 text-sm">
                  Aucun spam. Désabonnement possible à tout moment.
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
