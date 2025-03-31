
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ShieldCheck, Clock, Wrench, Car, Shield } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const ServiceGarantie = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Garantie Constructeur</h1>
            <div className="h-1 w-20 bg-age-red mb-10"></div>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                Chez Auto Germany Export, nous comprenons l'importance de la tranquillité d'esprit lors de l'achat d'un véhicule.
                C'est pourquoi nous vous proposons des véhicules encore sous garantie constructeur ou avec des extensions de garantie
                pour vous assurer une expérience de propriété sans souci.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
                <div className="bg-white p-6 shadow-md rounded-sm text-center">
                  <div className="inline-flex items-center justify-center bg-gray-100 rounded-full w-16 h-16 mb-4">
                    <ShieldCheck size={32} className="text-age-red" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">Protection Complète</h3>
                  <p className="text-gray-600 text-sm">Couverture des principaux composants mécaniques et électroniques</p>
                </div>
                
                <div className="bg-white p-6 shadow-md rounded-sm text-center">
                  <div className="inline-flex items-center justify-center bg-gray-100 rounded-full w-16 h-16 mb-4">
                    <Clock size={32} className="text-age-red" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">Durée Flexible</h3>
                  <p className="text-gray-600 text-sm">Extensions possibles jusqu'à 5 ans pour une tranquillité prolongée</p>
                </div>
                
                <div className="bg-white p-6 shadow-md rounded-sm text-center">
                  <div className="inline-flex items-center justify-center bg-gray-100 rounded-full w-16 h-16 mb-4">
                    <Wrench size={32} className="text-age-red" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">Assistance Européenne</h3>
                  <p className="text-gray-600 text-sm">Service d'assistance routière inclus dans tous nos contrats</p>
                </div>
              </div>
              
              <h2 className="text-2xl font-semibold mt-12 mb-6">Types de garanties proposées</h2>
              
              <div className="space-y-4 mb-10">
                <Collapsible className="border border-gray-200 rounded-sm">
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-white hover:bg-gray-50 text-left">
                    <div className="flex items-center">
                      <Car size={20} className="text-age-red mr-3" />
                      <h3 className="font-medium text-lg">Garantie constructeur d'origine</h3>
                    </div>
                    <div className="bg-age-red text-white text-xs px-2 py-1 rounded">Recommandé</div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-4 bg-gray-50 border-t border-gray-200">
                    <p className="mb-4">La garantie constructeur d'origine est celle fournie par le fabricant du véhicule. Elle offre une couverture complète sur tous les défauts de fabrication et de matériaux.</p>
                    <ul className="space-y-2 ml-5 list-disc text-gray-700">
                      <li>Généralement valable 2 à 3 ans selon le constructeur</li>
                      <li>Kilométrage limité (généralement entre 60 000 km et 100 000 km)</li>
                      <li>Valable dans tout le réseau officiel du constructeur en Europe</li>
                      <li>Couverture complète des pièces et main d'œuvre</li>
                    </ul>
                  </CollapsibleContent>
                </Collapsible>
                
                <Collapsible className="border border-gray-200 rounded-sm">
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-white hover:bg-gray-50 text-left">
                    <div className="flex items-center">
                      <Shield size={20} className="text-age-red mr-3" />
                      <h3 className="font-medium text-lg">Extension de garantie constructeur</h3>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-4 bg-gray-50 border-t border-gray-200">
                    <p className="mb-4">Cette extension officielle prolonge la garantie d'origine du constructeur, offrant ainsi une protection continue après l'expiration de la garantie initiale.</p>
                    <ul className="space-y-2 ml-5 list-disc text-gray-700">
                      <li>Prolongement jusqu'à 5 ans après la date de première mise en circulation</li>
                      <li>Mêmes conditions que la garantie d'origine</li>
                      <li>Préservation de la valeur de revente du véhicule</li>
                      <li>Transferable au nouveau propriétaire en cas de revente</li>
                    </ul>
                  </CollapsibleContent>
                </Collapsible>
                
                <Collapsible className="border border-gray-200 rounded-sm">
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-white hover:bg-gray-50 text-left">
                    <div className="flex items-center">
                      <ShieldCheck size={20} className="text-age-red mr-3" />
                      <h3 className="font-medium text-lg">Garantie Auto Germany Export premium</h3>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-4 bg-gray-50 border-t border-gray-200">
                    <p className="mb-4">Notre garantie exclusive est conçue pour les véhicules plus anciens ou ayant dépassé les limites de la garantie constructeur. Elle offre une protection adaptée à vos besoins.</p>
                    <ul className="space-y-2 ml-5 list-disc text-gray-700">
                      <li>Différentes formules disponibles selon vos besoins</li>
                      <li>Options de 12, 24 ou 36 mois</li>
                      <li>Couverture des principaux organes mécaniques et électriques</li>
                      <li>Assistance dépannage 24/7 incluse</li>
                      <li>Réseau de réparateurs agréés dans toute l'Europe</li>
                    </ul>
                  </CollapsibleContent>
                </Collapsible>
              </div>
              
              <div className="bg-gray-100 p-6 rounded-sm border-l-4 border-age-red mb-10">
                <h3 className="font-semibold text-xl mb-3">Notre engagement</h3>
                <p>
                  Tous les véhicules proposés par Auto Germany Export bénéficient d'une garantie minimum de 12 mois.
                  Nous sélectionnons rigoureusement nos véhicules pour leur fiabilité et leur historique d'entretien,
                  et nous vous accompagnons en cas de besoin pour toutes les démarches relatives à la garantie.
                </p>
              </div>
            </div>
            
            <div className="mt-10 pt-6 border-t border-gray-200 flex flex-wrap gap-4">
              <Link to="/contact" className="bg-age-red text-white px-6 py-3 inline-block hover:bg-age-darkgray transition-colors">
                Demander plus d'informations
              </Link>
              <Link to="/services" className="bg-gray-200 text-gray-800 px-6 py-3 inline-block hover:bg-gray-300 transition-colors">
                Tous nos services
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServiceGarantie;
