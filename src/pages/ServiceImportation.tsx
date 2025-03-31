
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from 'react-router-dom';
import { CheckCircle, FileText, Truck, Globe } from 'lucide-react';

const ServiceImportation = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Importation Allemande</h1>
            <div className="h-1 w-20 bg-age-red mb-10"></div>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                Notre service d'importation de véhicules allemands est conçu pour vous faciliter l'acquisition de véhicules
                de haute qualité en provenance d'Allemagne, réputée pour ses standards exigeants et ses inspections rigoureuses.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
                <div className="bg-white p-6 shadow-md rounded-sm border-l-4 border-age-red">
                  <h3 className="font-semibold text-xl mb-3">Pourquoi importer d'Allemagne?</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle size={20} className="text-age-red mr-2 mt-1 flex-shrink-0" />
                      <span>Entretien rigoureux et documentation complète</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={20} className="text-age-red mr-2 mt-1 flex-shrink-0" />
                      <span>Kilométrages généralement plus bas et vérifiables</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={20} className="text-age-red mr-2 mt-1 flex-shrink-0" />
                      <span>Meilleur rapport qualité-prix</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={20} className="text-age-red mr-2 mt-1 flex-shrink-0" />
                      <span>Options et équipements plus complets</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 shadow-md rounded-sm border-l-4 border-age-red">
                  <h3 className="font-semibold text-xl mb-3">Notre expertise</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle size={20} className="text-age-red mr-2 mt-1 flex-shrink-0" />
                      <span>Plus de 15 ans d'expérience dans l'importation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={20} className="text-age-red mr-2 mt-1 flex-shrink-0" />
                      <span>Partenariat avec les meilleurs concessionnaires allemands</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={20} className="text-age-red mr-2 mt-1 flex-shrink-0" />
                      <span>Connaissance approfondie des procédures administratives</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle size={20} className="text-age-red mr-2 mt-1 flex-shrink-0" />
                      <span>Réseau logistique fiable et sécurisé</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <Tabs defaultValue="process" className="my-8">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="process">Notre processus</TabsTrigger>
                  <TabsTrigger value="documents">Documents nécessaires</TabsTrigger>
                  <TabsTrigger value="timeline">Délais & Coûts</TabsTrigger>
                </TabsList>
                <TabsContent value="process" className="p-6 bg-white shadow-sm mt-2 rounded-sm">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-age-red text-white rounded-full h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">1</div>
                      <div>
                        <h4 className="font-medium text-lg">Recherche personnalisée</h4>
                        <p className="text-gray-600">Nous identifions les véhicules correspondant exactement à vos critères spécifiques.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-age-red text-white rounded-full h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">2</div>
                      <div>
                        <h4 className="font-medium text-lg">Vérification complète</h4>
                        <p className="text-gray-600">Inspection minutieuse de l'historique, de l'état et de l'authenticité du véhicule.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-age-red text-white rounded-full h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">3</div>
                      <div>
                        <h4 className="font-medium text-lg">Formalités administratives</h4>
                        <p className="text-gray-600">Gestion complète des documents d'exportation, douanes et homologation.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-age-red text-white rounded-full h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">4</div>
                      <div>
                        <h4 className="font-medium text-lg">Transport sécurisé</h4>
                        <p className="text-gray-600">Acheminement du véhicule jusqu'à votre domicile avec suivi en temps réel.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-age-red text-white rounded-full h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">5</div>
                      <div>
                        <h4 className="font-medium text-lg">Immatriculation</h4>
                        <p className="text-gray-600">Assistance pour les démarches d'immatriculation dans votre pays.</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="documents" className="p-6 bg-white shadow-sm mt-2 rounded-sm">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <FileText size={24} className="text-age-red mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">Certificat de conformité européen (COC)</h4>
                        <p className="text-sm text-gray-600">Document attestant que le véhicule respecte les normes européennes</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FileText size={24} className="text-age-red mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">Facture d'achat allemande</h4>
                        <p className="text-sm text-gray-600">Facture originale émise par le vendeur allemand</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FileText size={24} className="text-age-red mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">Certificat de cession</h4>
                        <p className="text-sm text-gray-600">Document officiel de transfert de propriété</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FileText size={24} className="text-age-red mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">Carnet d'entretien</h4>
                        <p className="text-sm text-gray-600">Historique complet des entretiens du véhicule</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="timeline" className="p-6 bg-white shadow-sm mt-2 rounded-sm">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-lg mb-2">Délais typiques</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <Truck size={20} className="text-age-red mr-2 flex-shrink-0" />
                          <span>Recherche et vérification: 1 à 2 semaines</span>
                        </li>
                        <li className="flex items-center">
                          <Truck size={20} className="text-age-red mr-2 flex-shrink-0" />
                          <span>Formalités administratives: 1 semaine</span>
                        </li>
                        <li className="flex items-center">
                          <Truck size={20} className="text-age-red mr-2 flex-shrink-0" />
                          <span>Transport: 3 à 10 jours selon destination</span>
                        </li>
                        <li className="flex items-center">
                          <Truck size={20} className="text-age-red mr-2 flex-shrink-0" />
                          <span>Immatriculation: 1 à 2 semaines</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-lg mb-2">Coûts associés</h4>
                      <p>Les frais d'importation comprennent généralement:</p>
                      <ul className="space-y-2 mt-2">
                        <li className="flex items-center">
                          <Globe size={20} className="text-age-red mr-2 flex-shrink-0" />
                          <span>TVA applicable dans votre pays</span>
                        </li>
                        <li className="flex items-center">
                          <Globe size={20} className="text-age-red mr-2 flex-shrink-0" />
                          <span>Frais de transport sécurisé</span>
                        </li>
                        <li className="flex items-center">
                          <Globe size={20} className="text-age-red mr-2 flex-shrink-0" />
                          <span>Frais administratifs et de dédouanement</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="mt-10 pt-6 border-t border-gray-200 flex flex-wrap gap-4">
              <Link to="/contact" className="bg-age-red text-white px-6 py-3 inline-block hover:bg-age-darkgray transition-colors">
                Demander un devis personnalisé
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

export default ServiceImportation;
