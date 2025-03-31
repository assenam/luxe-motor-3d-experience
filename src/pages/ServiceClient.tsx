
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ServiceClient = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16">
        <div className="container-age">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Service Client Premium</h1>
            <div className="h-1 w-20 bg-age-red mb-10"></div>
            
            <div className="prose prose-lg max-w-none">
              <p>
                Chez Auto Germany Export, nous nous distinguons par notre service client d'exception.
                Votre satisfaction est notre priorité absolue, et nous mettons tout en œuvre pour vous offrir
                une expérience personnalisée et sans stress.
              </p>
              
              <h2 className="text-2xl font-semibold mt-10 mb-4">Notre engagement</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Un conseiller personnel dédié à votre projet</li>
                <li>Disponibilité 7j/7 pour répondre à vos questions</li>
                <li>Communication transparente à chaque étape du processus</li>
                <li>Service après-vente réactif</li>
                <li>Suivi régulier après la livraison de votre véhicule</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-10 mb-4">Services personnalisés</h2>
              <p>
                Notre équipe peut vous accompagner dans toutes vos démarches : recherche spécifique,
                configuration personnalisée, financement, assurance, formalités d'importation et plus encore.
                Nous adaptons notre approche à vos besoins spécifiques.
              </p>
            </div>
            
            <div className="mt-10 pt-6 border-t border-gray-200">
              <a href="/contact" className="bg-age-red text-white px-6 py-3 inline-block hover:bg-age-darkgray transition-colors">
                Contacter notre service client
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServiceClient;
