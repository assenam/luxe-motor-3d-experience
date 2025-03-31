
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Truck, Shield, Globe, Clock, CheckCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ServiceLivraison = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Livraison Internationale</h1>
            <div className="h-1 w-20 bg-age-red mb-10"></div>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                Auto Germany Export vous offre un service de livraison international fiable et sécurisé pour votre véhicule,
                quelle que soit votre localisation. Notre réseau logistique étendu nous permet de livrer votre véhicule dans les
                meilleures conditions et délais, partout dans le monde.
              </p>
              
              <div className="my-10">
                <img 
                  src="https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Livraison internationale de véhicules" 
                  className="w-full h-64 object-cover rounded-sm mb-4"
                />
                <p className="text-sm text-center text-gray-500">Notre flotte de transport spécialisée pour l'acheminement sécurisé de véhicules de luxe</p>
              </div>
              
              <h2 className="text-2xl font-semibold mt-12 mb-4">Notre processus de livraison</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 my-8">
                <div className="flex items-start">
                  <div className="bg-age-red text-white rounded-full h-10 w-10 flex items-center justify-center mr-4 flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-medium text-lg">Préparation du véhicule</h4>
                    <p className="text-gray-600">Nettoyage complet, inspection finale et protection spécifique adaptée au mode de transport.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-age-red text-white rounded-full h-10 w-10 flex items-center justify-center mr-4 flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-medium text-lg">Documentation complète</h4>
                    <p className="text-gray-600">Préparation de tous les documents d'exportation, d'assurance et de douane nécessaires.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-age-red text-white rounded-full h-10 w-10 flex items-center justify-center mr-4 flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-medium text-lg">Transport sécurisé</h4>
                    <p className="text-gray-600">Acheminement par transporteurs spécialisés (camion, bateau ou avion selon destination).</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-age-red text-white rounded-full h-10 w-10 flex items-center justify-center mr-4 flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-medium text-lg">Suivi en temps réel</h4>
                    <p className="text-gray-600">Système de tracking permettant de suivre l'avancement de votre livraison à tout moment.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-age-red text-white rounded-full h-10 w-10 flex items-center justify-center mr-4 flex-shrink-0">5</div>
                  <div>
                    <h4 className="font-medium text-lg">Dédouanement</h4>
                    <p className="text-gray-600">Gestion des formalités douanières et coordination avec les autorités locales.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-age-red text-white rounded-full h-10 w-10 flex items-center justify-center mr-4 flex-shrink-0">6</div>
                  <div>
                    <h4 className="font-medium text-lg">Livraison finale</h4>
                    <p className="text-gray-600">Remise du véhicule à l'adresse de votre choix et vérification conjointe.</p>
                  </div>
                </div>
              </div>
              
              <Tabs defaultValue="europe" className="my-12">
                <h2 className="text-2xl font-semibold mb-4">Zones de livraison</h2>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="europe">Europe</TabsTrigger>
                  <TabsTrigger value="africa">Afrique</TabsTrigger>
                  <TabsTrigger value="middle-east">Moyen-Orient</TabsTrigger>
                  <TabsTrigger value="others">Autres zones</TabsTrigger>
                </TabsList>
                
                <TabsContent value="europe" className="p-6 bg-white shadow-sm mt-2 rounded-sm">
                  <div className="flex items-start">
                    <Globe size={24} className="text-age-red mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-lg mb-2">Livraison en Europe</h4>
                      <p className="mb-3">Nous livrons dans tous les pays européens, avec des délais très rapides :</p>
                      <ul className="grid grid-cols-2 gap-2">
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-age-red mr-2" />
                          <span>France : 2-4 jours</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-age-red mr-2" />
                          <span>Belgique : 1-3 jours</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-age-red mr-2" />
                          <span>Suisse : 2-4 jours</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-age-red mr-2" />
                          <span>Italie : 3-5 jours</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-age-red mr-2" />
                          <span>Espagne : 4-6 jours</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-age-red mr-2" />
                          <span>Portugal : 5-7 jours</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-age-red mr-2" />
                          <span>Pays-Bas : 1-3 jours</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-age-red mr-2" />
                          <span>Autres pays : 3-10 jours</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="africa" className="p-6 bg-white shadow-sm mt-2 rounded-sm">
                  <div className="flex items-start">
                    <Globe size={24} className="text-age-red mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-lg mb-2">Livraison en Afrique</h4>
                      <p className="mb-3">Notre réseau couvre les principaux pays africains :</p>
                      <ul className="grid grid-cols-2 gap-2">
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-age-red mr-2" />
                          <span>Maroc : 7-14 jours</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-age-red mr-2" />
                          <span>Algérie : 10-18 jours</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-age-red mr-2" />
                          <span>Tunisie : 7-14 jours</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-age-red mr-2" />
                          <span>Sénégal : 12-20 jours</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-age-red mr-2" />
                          <span>Côte d'Ivoire : 14-21 jours</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-age-red mr-2" />
                          <span>Cameroun : 18-25 jours</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-age-red mr-2" />
                          <span>Afrique du Sud : 20-30 jours</span>
                        </li>
                      </ul>
                      <p className="mt-3 text-sm text-gray-600">Les délais peuvent varier selon les formalités douanières locales.</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="middle-east" className="p-6 bg-white shadow-sm mt-2 rounded-sm">
                  <div className="flex items-start">
                    <Globe size={24} className="text-age-red mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-lg mb-2">Livraison au Moyen-Orient</h4>
                      <p className="mb-3">Une expertise particulière pour cette région où les véhicules allemands sont très prisés :</p>
                      <ul className="grid grid-cols-2 gap-2">
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-age-red mr-2" />
                          <span>Émirats Arabes Unis : 14-21 jours</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-age-red mr-2" />
                          <span>Arabie Saoudite : 18-25 jours</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-age-red mr-2" />
                          <span>Qatar : 14-21 jours</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-age-red mr-2" />
                          <span>Koweït : 18-25 jours</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-age-red mr-2" />
                          <span>Bahreïn : 14-21 jours</span>
                        </li>
                      </ul>
                      <p className="mt-3 text-sm text-gray-600">Transport maritime sécurisé avec conteneurs dédiés.</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="others" className="p-6 bg-white shadow-sm mt-2 rounded-sm">
                  <div className="flex items-start">
                    <Globe size={24} className="text-age-red mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-lg mb-2">Autres destinations</h4>
                      <p className="mb-3">Nous livrons également dans de nombreuses autres régions :</p>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-age-red mr-2" />
                          <span>Amérique du Nord (États-Unis, Canada) : 25-40 jours</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-age-red mr-2" />
                          <span>Asie (Chine, Japon, Singapour) : 30-45 jours</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-age-red mr-2" />
                          <span>Amérique du Sud (Brésil, Argentine) : 35-50 jours</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle size={16} className="text-age-red mr-2" />
                          <span>Australie et Nouvelle-Zélande : 40-60 jours</span>
                        </li>
                      </ul>
                      <p className="mt-3 text-sm text-gray-600">Contactez-nous pour obtenir un devis précis pour votre destination.</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="bg-white shadow-sm p-6 rounded-sm border-l-4 border-age-red mb-8">
                <div className="flex items-start">
                  <Shield size={24} className="text-age-red mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-xl mb-2">Sécurité & Assurance</h3>
                    <p>Tous nos transports sont entièrement assurés de bout en bout pour une valeur déclarée complète du véhicule. Nous travaillons uniquement avec des transporteurs certifiés et spécialisés dans l'acheminement de véhicules de prestige.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-10 pt-6 border-t border-gray-200 flex flex-wrap gap-4">
              <Link to="/contact" className="bg-age-red text-white px-6 py-3 inline-block hover:bg-age-darkgray transition-colors">
                Demander un devis de livraison
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

export default ServiceLivraison;
