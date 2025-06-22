
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Building, Mail, Phone, MapPin, FileText, Scale } from 'lucide-react';

const LegalNotices = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-age-black to-gray-800 text-white py-20">
          <div className="container-age text-center">
            <Scale className="mx-auto mb-6 text-age-red" size={64} />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Mentions Légales</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Informations légales et réglementaires concernant Auto Germany Export
            </p>
          </div>
        </section>

        {/* Contenu principal */}
        <section className="py-16">
          <div className="container-age max-w-4xl">
            
            {/* Éditeur du site */}
            <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
              <div className="flex items-center mb-6">
                <Building className="text-age-red mr-4" size={28} />
                <h2 className="text-2xl font-bold">Éditeur du Site</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Raison sociale</h3>
                  <p className="text-gray-700 mb-4">
                    <strong>Auto Germany Export</strong><br />
                    Société spécialisée dans l'importation et l'export de véhicules allemands
                  </p>
                  
                  <h3 className="font-semibold text-lg mb-3">Siège social</h3>
                  <div className="flex items-start text-gray-700 mb-4">
                    <MapPin className="text-age-red mr-2 mt-1 flex-shrink-0" size={16} />
                    <div>
                      KarolinenstraB 6<br />
                      96049 Bamberg, Hamburg<br />
                      Germany
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-3">Contact</h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-700">
                      <Phone className="text-age-red mr-3" size={16} />
                      <span>+39 350 999 4001</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Mail className="text-age-red mr-3" size={16} />
                      <span>birgittscheslog99@gmail.com</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-semibold text-lg mb-3">Informations légales</h3>
                    <p className="text-gray-700">
                      <strong>Numéro d'immatriculation :</strong> DE123456789<br />
                      <strong>Capital social :</strong> 100 000€
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Directeur de publication */}
            <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
              <div className="flex items-center mb-6">
                <FileText className="text-age-red mr-4" size={28} />
                <h2 className="text-2xl font-bold">Directeur de la Publication</h2>
              </div>
              <p className="text-gray-700">
                M. John Doe, directeur général d'Auto Germany Export, est responsable de la publication du contenu éditorial de ce site web.
              </p>
            </div>

            {/* Hébergement */}
            <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Hébergement du Site</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">Prestataire d'hébergement</h3>
                <p className="text-gray-700">
                  Le site www.autogermanyexport.com est hébergé par :<br />
                  <strong>Hosting Company GmbH</strong><br />
                  Hosting Street 123<br />
                  10115 Berlin, Germany
                </p>
              </div>
            </div>

            {/* Propriété intellectuelle */}
            <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Propriété Intellectuelle</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  L'ensemble de ce site web relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. 
                  Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                </p>
                <p className="text-gray-700">
                  La reproduction de tout ou partie de ce site sur un support quelconque quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
                </p>
              </div>
            </div>

            {/* Données personnelles */}
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <h2 className="text-2xl font-bold mb-6">Protection des Données Personnelles</h2>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded">
                <p className="text-gray-700 mb-4">
                  Conformément à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD), 
                  vous disposez d'un droit d'accès, de modification, de rectification et de suppression des données qui vous concernent.
                </p>
                <p className="text-gray-700">
                  Pour exercer ces droits, veuillez nous contacter à l'adresse : 
                  <strong className="text-age-red"> birgittscheslog99@gmail.com</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer de page */}
        <section className="bg-gray-100 py-8">
          <div className="container-age text-center">
            <p className="text-gray-600">
              <strong>Dernière mise à jour :</strong> Juin 2023
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default LegalNotices;
