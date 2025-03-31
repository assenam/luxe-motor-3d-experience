
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { CreditCard, Calculator, FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ServiceFinancement = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Financement Personnalisé</h1>
            <div className="h-1 w-20 bg-age-red mb-10"></div>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                Auto Germany Export vous propose des solutions de financement adaptées à votre situation personnelle
                et professionnelle. Nous travaillons avec plusieurs partenaires financiers pour vous offrir les meilleures 
                conditions et faciliter l'acquisition de votre véhicule de rêve.
              </p>
              
              <div className="bg-white rounded-sm shadow-md p-8 my-10">
                <h2 className="text-2xl font-semibold mb-6 text-center">Des solutions pour tous les profils</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 border border-gray-100 rounded-sm hover:border-age-red transition-colors">
                    <div className="inline-flex items-center justify-center bg-gray-100 rounded-full w-16 h-16 mb-4">
                      <CreditCard size={32} className="text-age-red" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Crédit classique</h3>
                    <p className="text-gray-600 text-sm">Solution traditionnelle avec mensualités fixes et taux avantageux</p>
                  </div>
                  
                  <div className="text-center p-4 border border-gray-100 rounded-sm hover:border-age-red transition-colors">
                    <div className="inline-flex items-center justify-center bg-gray-100 rounded-full w-16 h-16 mb-4">
                      <Calculator size={32} className="text-age-red" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Leasing / LOA</h3>
                    <p className="text-gray-600 text-sm">Location avec option d'achat à terme ou renouvellement</p>
                  </div>
                  
                  <div className="text-center p-4 border border-gray-100 rounded-sm hover:border-age-red transition-colors">
                    <div className="inline-flex items-center justify-center bg-gray-100 rounded-full w-16 h-16 mb-4">
                      <FileText size={32} className="text-age-red" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Solutions pro</h3>
                    <p className="text-gray-600 text-sm">Financement adapté pour les entreprises et indépendants</p>
                  </div>
                </div>
              </div>
              
              <Tabs defaultValue="credit" className="my-12">
                <h2 className="text-2xl font-semibold mb-4">Options de financement</h2>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="credit">Crédit classique</TabsTrigger>
                  <TabsTrigger value="leasing">Leasing / LOA</TabsTrigger>
                  <TabsTrigger value="pro">Solutions pro</TabsTrigger>
                </TabsList>
                
                <TabsContent value="credit" className="p-6 bg-white shadow-sm mt-2 rounded-sm">
                  <div className="space-y-4">
                    <h3 className="font-medium text-xl mb-2">Crédit automobile</h3>
                    <p>
                      Le crédit automobile est la solution la plus traditionnelle pour financer l'achat d'un véhicule.
                      Il vous permet de devenir propriétaire immédiatement tout en échelonnant le paiement.
                    </p>
                    
                    <div className="flex flex-col space-y-3 mt-4">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium">Taux d'intérêt</span>
                        <span>À partir de 3,9%*</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium">Durée</span>
                        <span>De 12 à 84 mois</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium">Apport</span>
                        <span>Dès 0% (selon dossier)</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium">Assurance de prêt</span>
                        <span>Optionnelle</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-500 mt-4">* Taux donnés à titre indicatif, susceptibles de varier selon le profil de l'emprunteur et la durée du financement.</p>
                    
                    <div className="flex items-start mt-6">
                      <CheckCircle size={20} className="text-age-red mt-1 mr-2 flex-shrink-0" />
                      <p><span className="font-medium">Avantage principal:</span> Vous êtes propriétaire du véhicule dès l'achat.</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="leasing" className="p-6 bg-white shadow-sm mt-2 rounded-sm">
                  <div className="space-y-4">
                    <h3 className="font-medium text-xl mb-2">Location avec Option d'Achat (LOA)</h3>
                    <p>
                      La LOA ou leasing est une solution flexible qui vous permet de louer un véhicule neuf ou d'occasion
                      pendant une durée déterminée, avec la possibilité de l'acheter en fin de contrat.
                    </p>
                    
                    <div className="flex flex-col space-y-3 mt-4">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium">Loyers mensuels</span>
                        <span>Généralement inférieurs à un crédit classique</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium">Durée</span>
                        <span>De 24 à 60 mois</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium">Premier loyer</span>
                        <span>De 10% à 35% du prix du véhicule</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium">Valeur résiduelle</span>
                        <span>Fixée à la signature du contrat</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium">Option finale d'achat</span>
                        <span>De 20% à 40% selon le véhicule et la durée</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start mt-6">
                      <CheckCircle size={20} className="text-age-red mt-1 mr-2 flex-shrink-0" />
                      <p><span className="font-medium">Avantage principal:</span> Flexibilité en fin de contrat (achat, restitution ou renouvellement).</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="pro" className="p-6 bg-white shadow-sm mt-2 rounded-sm">
                  <div className="space-y-4">
                    <h3 className="font-medium text-xl mb-2">Solutions pour professionnels</h3>
                    <p>
                      Nous proposons des solutions spécifiques pour les entreprises, indépendants et professions libérales,
                      avec des avantages fiscaux et une gestion optimisée de votre parc automobile.
                    </p>
                    
                    <div className="flex flex-col space-y-3 mt-4">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium">Crédit-bail</span>
                        <span>Optimisation fiscale et comptable</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium">Leasing professionnel</span>
                        <span>Loyers déductibles des charges</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium">Location longue durée</span>
                        <span>Sans option d'achat, tout inclus</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="font-medium">Solution de fleet management</span>
                        <span>Gestion complète de flotte</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start mt-6">
                      <CheckCircle size={20} className="text-age-red mt-1 mr-2 flex-shrink-0" />
                      <p><span className="font-medium">Avantage principal:</span> Optimisation fiscale et préservation de la trésorerie de l'entreprise.</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <h2 className="text-2xl font-semibold mt-12 mb-4">Notre processus</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-8 relative">
                <div className="hidden md:block absolute top-8 left-0 w-full h-1 bg-gray-200 -z-10"></div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="bg-age-red text-white rounded-full h-16 w-16 flex items-center justify-center mb-3">1</div>
                  <h4 className="font-medium text-base">Analyse de vos besoins</h4>
                  <p className="text-sm text-gray-600 mt-1">Étude de votre situation financière</p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="bg-age-red text-white rounded-full h-16 w-16 flex items-center justify-center mb-3">2</div>
                  <h4 className="font-medium text-base">Propositions adaptées</h4>
                  <p className="text-sm text-gray-600 mt-1">Plusieurs scénarios financiers</p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="bg-age-red text-white rounded-full h-16 w-16 flex items-center justify-center mb-3">3</div>
                  <h4 className="font-medium text-base">Montage du dossier</h4>
                  <p className="text-sm text-gray-600 mt-1">Collecte des documents nécessaires</p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="bg-age-red text-white rounded-full h-16 w-16 flex items-center justify-center mb-3">4</div>
                  <h4 className="font-medium text-base">Réponse rapide</h4>
                  <p className="text-sm text-gray-600 mt-1">Sous 48h maximum</p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="bg-age-red text-white rounded-full h-16 w-16 flex items-center justify-center mb-3">5</div>
                  <h4 className="font-medium text-base">Finalisation</h4>
                  <p className="text-sm text-gray-600 mt-1">Signature et déblocage des fonds</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-sm mt-12 border border-gray-200">
                <div className="flex items-start">
                  <AlertCircle size={24} className="text-age-red mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Documents généralement requis</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                      <li className="flex items-center">
                        <CheckCircle size={16} className="text-age-red mr-2 flex-shrink-0" />
                        <span>Pièce d'identité en cours de validité</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle size={16} className="text-age-red mr-2 flex-shrink-0" />
                        <span>Justificatif de domicile récent</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle size={16} className="text-age-red mr-2 flex-shrink-0" />
                        <span>3 derniers bulletins de salaire</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle size={16} className="text-age-red mr-2 flex-shrink-0" />
                        <span>Dernier avis d'imposition</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle size={16} className="text-age-red mr-2 flex-shrink-0" />
                        <span>3 derniers relevés bancaires</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle size={16} className="text-age-red mr-2 flex-shrink-0" />
                        <span>RIB pour le prélèvement</span>
                      </li>
                    </ul>
                    <p className="text-sm text-gray-500 mt-4">
                      Des documents complémentaires peuvent être demandés selon votre situation et le type de financement choisi.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <div className="bg-white shadow-sm p-6 rounded-sm border-l-4 border-age-red">
                  <div className="flex items-start">
                    <Clock size={24} className="text-age-red mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-xl mb-2">Un financement rapide et efficace</h3>
                      <p>
                        Notre réseau de partenaires financiers nous permet d'obtenir des réponses rapides et des conditions 
                        avantageuses pour votre projet. Dans la plupart des cas, nous pouvons finaliser votre dossier en 
                        moins d'une semaine.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-10 pt-6 border-t border-gray-200 flex flex-wrap gap-4">
              <Link to="/contact" className="bg-age-red text-white px-6 py-3 inline-block hover:bg-age-darkgray transition-colors">
                Demander une simulation
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

export default ServiceFinancement;
