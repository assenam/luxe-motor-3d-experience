
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ServiceLivraison = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16">
        <div className="container-age">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Livraison Internationale</h1>
            <div className="h-1 w-20 bg-age-red mb-10"></div>
            
            <div className="prose prose-lg max-w-none">
              <p>
                Auto Germany Export vous offre un service de livraison international fiable et sécurisé pour votre véhicule,
                quelle que soit votre localisation. Notre réseau logistique étendu nous permet de livrer votre véhicule dans les
                meilleures conditions et délais.
              </p>
              
              <h2 className="text-2xl font-semibold mt-10 mb-4">Notre processus de livraison</h2>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Préparation complète du véhicule avant expédition</li>
                <li>Protection et sécurisation adaptées au mode de transport</li>
                <li>Suivi en temps réel pendant tout le trajet</li>
                <li>Coordination avec les services douaniers locaux</li>
                <li>Livraison finale à l'adresse de votre choix</li>
              </ol>
              
              <h2 className="text-2xl font-semibold mt-10 mb-4">Zones de livraison</h2>
              <p>
                Nous livrons dans toute l'Europe, ainsi qu'en Afrique, au Moyen-Orient et dans certains pays d'Asie et d'Amérique.
                Nos partenaires logistiques sont sélectionnés pour leur fiabilité et leur expérience dans le transport de véhicules de valeur.
              </p>
            </div>
            
            <div className="mt-10 pt-6 border-t border-gray-200">
              <a href="/contact" className="bg-age-red text-white px-6 py-3 inline-block hover:bg-age-darkgray transition-colors">
                Demander un devis de livraison
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServiceLivraison;
