
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ServiceFinancement = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16">
        <div className="container-age">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Financement Personnalisé</h1>
            <div className="h-1 w-20 bg-age-red mb-10"></div>
            
            <div className="prose prose-lg max-w-none">
              <p>
                Auto Germany Export vous propose des solutions de financement adaptées à votre situation personnelle
                et professionnelle. Nous travaillons avec plusieurs partenaires financiers pour vous offrir les meilleures conditions.
              </p>
              
              <h2 className="text-2xl font-semibold mt-10 mb-4">Options de financement</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Crédit classique avec taux compétitifs</li>
                <li>Leasing et LOA pour les particuliers et professionnels</li>
                <li>Solutions avec ou sans apport</li>
                <li>Durées flexibles de 12 à 84 mois</li>
                <li>Assurance de prêt à tarifs négociés</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-10 mb-4">Notre processus</h2>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Analyse de votre situation et de vos besoins</li>
                <li>Proposition de solutions adaptées</li>
                <li>Montage rapide du dossier</li>
                <li>Réponse sous 48 heures maximum</li>
                <li>Finalisation simple et rapide</li>
              </ol>
            </div>
            
            <div className="mt-10 pt-6 border-t border-gray-200">
              <a href="/contact" className="bg-age-red text-white px-6 py-3 inline-block hover:bg-age-darkgray transition-colors">
                Demander une simulation
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServiceFinancement;
