
import { useEffect, useState } from 'react';
import HeroSection from '@/components/HeroSection';
import FeaturedVehicles from '@/components/FeaturedVehicles';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/components/ui/use-toast';

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
    
    animateOnScroll(); // Check on initial load
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
    
    // Here you would typically send this to your backend or email service
    console.log('Email submitted:', email);
    
    toast({
      title: "Inscription réussie!",
      description: "Merci pour votre inscription. Vous recevrez bientôt nos dernières nouvelles."
    });
    
    setEmail(''); // Clear the input
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        
        <FeaturedVehicles />
        
        <section className="py-20 bg-secondary">
          <div className="container-luxe text-center">
            <h2 className="text-3xl font-playfair font-semibold mb-8">
              Rejoignez l'Expérience <span className="gold-accent">Auto Germany Export</span>
            </h2>
            <div className="max-w-xl mx-auto">
              <form onSubmit={handleSubscribe}>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <input 
                    type="email" 
                    placeholder="Votre adresse email" 
                    className="flex-grow px-5 py-3 rounded-sm border border-gray-300 focus:outline-none focus:border-luxe-gold"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button 
                    type="submit" 
                    className="premium-button whitespace-nowrap"
                  >
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
