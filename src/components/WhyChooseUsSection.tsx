
import React from 'react';

const WhyChooseUsSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-age">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Pourquoi Nous Choisir</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 shadow-md rounded-sm">
            <h3 className="text-xl font-semibold mb-4">Expertise Allemande</h3>
            <p className="text-gray-600">
              Notre équipe basée en Allemagne possède une connaissance approfondie du marché automobile premium allemand.
            </p>
          </div>
          
          <div className="bg-white p-8 shadow-md rounded-sm">
            <h3 className="text-xl font-semibold mb-4">Transparence Totale</h3>
            <p className="text-gray-600">
              Nous vous fournissons l'historique complet de chaque véhicule, y compris son entretien et ses antécédents.
            </p>
          </div>
          
          <div className="bg-white p-8 shadow-md rounded-sm">
            <h3 className="text-xl font-semibold mb-4">Livraison Internationale</h3>
            <p className="text-gray-600">
              Nous assurons la livraison de votre véhicule partout dans le monde, avec un suivi personnalisé.
            </p>
          </div>
          
          <div className="bg-white p-8 shadow-md rounded-sm">
            <h3 className="text-xl font-semibold mb-4">Service Après-Vente</h3>
            <p className="text-gray-600">
              Notre engagement ne s'arrête pas à la vente. Nous restons à votre disposition pour tout besoin après l'achat.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
