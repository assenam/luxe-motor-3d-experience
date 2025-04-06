
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-10 text-center">Nos Services</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <ServiceCard 
              title="Importation Allemande" 
              description="Nous nous chargeons de toutes les démarches d'importation de votre véhicule depuis l'Allemagne, incluant les formalités administratives et le transport." 
              link="/services/importation"
            />
            <ServiceCard 
              title="Garantie Constructeur" 
              description="Tous nos véhicules sont couverts par la garantie constructeur d'origine ou par notre garantie étendue, pour une tranquillité d'esprit totale." 
              link="/services/garantie"
            />
            <ServiceCard 
              title="Livraison Internationale" 
              description="Nous livrons votre véhicule partout dans le monde, avec un service de suivi personnalisé et des options d'expédition adaptées à vos besoins." 
              link="/services/livraison"
            />
            <ServiceCard 
              title="Service Client Premium" 
              description="Notre équipe dédiée vous accompagne tout au long de votre projet, de la recherche du véhicule parfait jusqu'à sa livraison et au-delà." 
              link="/services/service-client"
            />
            <ServiceCard 
              title="Financement Personnalisé" 
              description="Des solutions de financement sur mesure adaptées à votre situation, avec des taux compétitifs et des options flexibles pour faciliter votre acquisition." 
              link="/services/financement"
            />
          </div>
          
          <div className="text-center mt-10">
            <Link to="/contact">
              <Button variant="default" className="bg-age-red hover:bg-age-darkred text-white px-8 py-6 text-lg">
                Contactez-nous pour plus d'informations
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

const ServiceCard = ({ title, description, link }: { title: string, description: string, link: string }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(link);
  };

  return (
    <div 
      className="bg-white p-8 rounded-sm shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <div className="mt-auto">
        <Link to={link} className="inline-block bg-age-red text-white px-4 py-2 text-sm font-medium hover:bg-age-darkred transition-colors">
          En savoir plus
        </Link>
      </div>
    </div>
  );
};

export default Services;
