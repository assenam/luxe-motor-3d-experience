
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ServiceImportation = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16">
        <div className="container-age">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Importation Allemande</h1>
            <div className="h-1 w-20 bg-age-red mb-10"></div>
            
            <div className="prose prose-lg max-w-none">
              <p>
                Notre service d'importation de véhicules allemands est conçu pour vous faciliter l'acquisition de véhicules
                de haute qualité en provenance d'Allemagne, réputée pour ses standards exigeants et ses inspections rigoureuses.
              </p>
              
              <h2 className="text-2xl font-semibold mt-10 mb-4">Ce que nous offrons</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Recherche personnalisée selon vos critères spécifiques</li>
                <li>Vérification complète de l'historique et de l'état du véhicule</li>
                <li>Gestion de toutes les formalités administratives</li>
                <li>Organisation du transport sécurisé jusqu'à votre domicile</li>
                <li>Assistance pour l'immatriculation dans votre pays</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-10 mb-4">Pourquoi importer d'Allemagne?</h2>
              <p>
                Les véhicules allemands sont reconnus pour leur entretien minutieux, leurs carnets d'entretien bien tenus, et leurs kilométrages généralement plus bas.
                De plus, le marché allemand offre souvent un meilleur rapport qualité-prix et des options plus complètes.
              </p>
            </div>
            
            <div className="mt-10 pt-6 border-t border-gray-200">
              <a href="/contact" className="bg-age-red text-white px-6 py-3 inline-block hover:bg-age-darkgray transition-colors">
                Demander un devis personnalisé
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServiceImportation;
