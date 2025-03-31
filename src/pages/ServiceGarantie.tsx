
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ServiceGarantie = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16">
        <div className="container-age">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Garantie Constructeur</h1>
            <div className="h-1 w-20 bg-age-red mb-10"></div>
            
            <div className="prose prose-lg max-w-none">
              <p>
                Chez Auto Germany Export, nous comprenons l'importance de la tranquillité d'esprit lors de l'achat d'un véhicule.
                C'est pourquoi nous vous proposons des véhicules encore sous garantie constructeur ou avec des extensions de garantie.
              </p>
              
              <h2 className="text-2xl font-semibold mt-10 mb-4">Avantages de nos garanties</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Couverture complète des composants mécaniques et électroniques</li>
                <li>Assistance routière européenne incluse</li>
                <li>Validité dans l'ensemble du réseau de concessionnaires officiels</li>
                <li>Possibilité d'extension jusqu'à 5 ans</li>
                <li>Transfert de garantie en cas de revente</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-10 mb-4">Types de garanties proposées</h2>
              <p>
                Nous proposons différentes options de garantie selon le modèle et l'âge du véhicule :
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Garantie constructeur d'origine restante</li>
                <li>Extension de garantie constructeur officielle</li>
                <li>Garantie Auto Germany Export premium</li>
              </ol>
            </div>
            
            <div className="mt-10 pt-6 border-t border-gray-200">
              <a href="/contact" className="bg-age-red text-white px-6 py-3 inline-block hover:bg-age-darkgray transition-colors">
                Demander plus d'informations
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServiceGarantie;
