
import React from 'react';

const HighlightsSection = () => {
  return (
    <section id="discover" className="py-16 bg-white">
      <div className="container-age">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Nos Véhicules Premium</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="luxury-card p-6 rounded-sm hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">Qualité Allemande</h3>
            <p className="text-gray-600">
              Nos véhicules sont sélectionnés parmi les meilleures marques allemandes, reconnues pour leur fiabilité et leurs performances.
            </p>
          </div>
          
          <div className="luxury-card p-6 rounded-sm hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">Inspection Rigoureuse</h3>
            <p className="text-gray-600">
              Chaque véhicule passe par une inspection technique complète avant d'être proposé à la vente.
            </p>
          </div>
          
          <div className="luxury-card p-6 rounded-sm hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">Service Personnalisé</h3>
            <p className="text-gray-600">
              Notre équipe vous accompagne dans toutes les étapes, de la sélection du véhicule à son importation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;
