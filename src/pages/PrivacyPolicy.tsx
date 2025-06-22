
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Shield, Lock, Eye, UserCheck, AlertTriangle, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="container-age text-center">
            <Shield className="mx-auto mb-6 text-blue-200" size={64} />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Politique de Confidentialité</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Votre vie privée est importante pour nous. Découvrez comment nous protégeons vos données personnelles.
            </p>
          </div>
        </section>

        {/* Contenu principal */}
        <section className="py-16">
          <div className="container-age max-w-4xl">
            
            {/* Introduction */}
            <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
              <div className="flex items-center mb-6">
                <FileText className="text-blue-600 mr-4" size={28} />
                <h2 className="text-2xl font-bold">Engagement de Confidentialité</h2>
              </div>
              <p className="text-gray-700 text-lg">
                Auto Germany Export s'engage à protéger la confidentialité de vos informations personnelles. 
                Cette politique explique comment nous collectons, utilisons et protégeons vos données.
              </p>
            </div>

            {/* Collecte des informations */}
            <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
              <div className="flex items-center mb-6">
                <Eye className="text-blue-600 mr-4" size={28} />
                <h2 className="text-2xl font-bold">1. Collecte des Informations</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Informations que nous collectons</h3>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span><strong>Informations d'identification :</strong> nom, prénom, adresse e-mail</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span><strong>Coordonnées :</strong> numéro de téléphone, adresse postale</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span><strong>Données techniques :</strong> adresse IP, type de navigateur, pages consultées</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Comment nous collectons ces informations</h3>
                  <p className="text-gray-700">
                    Nous collectons des informations lorsque vous vous inscrivez sur notre site, passez une commande, 
                    remplissez un formulaire de contact ou naviguez sur notre site web.
                  </p>
                </div>
              </div>
            </div>

            {/* Utilisation des informations */}
            <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
              <div className="flex items-center mb-6">
                <UserCheck className="text-blue-600 mr-4" size={28} />
                <h2 className="text-2xl font-bold">2. Utilisation des Informations</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-4">Finalités principales</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Traitement de vos commandes</li>
                    <li>• Service client personnalisé</li>
                    <li>• Communication sur nos services</li>
                    <li>• Amélioration de votre expérience</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-4">Finalités secondaires</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Analyses statistiques</li>
                    <li>• Amélioration du site web</li>
                    <li>• Newsletter (avec consentement)</li>
                    <li>• Conformité réglementaire</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Protection des informations */}
            <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
              <div className="flex items-center mb-6">
                <Lock className="text-blue-600 mr-4" size={28} />
                <h2 className="text-2xl font-bold">3. Protection des Informations</h2>
              </div>
              
              <div className="space-y-6">
                <div className="border-l-4 border-green-400 bg-green-50 p-6 rounded">
                  <h3 className="font-semibold text-lg mb-3 text-green-800">Mesures de sécurité techniques</h3>
                  <ul className="space-y-2 text-green-700">
                    <li>• Cryptage SSL/TLS pour toutes les transmissions</li>
                    <li>• Serveurs sécurisés avec accès restreint</li>
                    <li>• Sauvegardes régulières et chiffrées</li>
                    <li>• Mise à jour constante des systèmes de sécurité</li>
                  </ul>
                </div>
                
                <div className="border-l-4 border-blue-400 bg-blue-50 p-6 rounded">
                  <h3 className="font-semibold text-lg mb-3 text-blue-800">Mesures organisationnelles</h3>
                  <p className="text-blue-700">
                    Seuls les employés autorisés qui ont besoin d'effectuer un travail spécifique 
                    (facturation, service client) ont accès aux informations personnellement identifiables.
                  </p>
                </div>
              </div>
            </div>

            {/* Partage avec des tiers */}
            <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
              <div className="flex items-center mb-6">
                <AlertTriangle className="text-orange-500 mr-4" size={28} />
                <h2 className="text-2xl font-bold">4. Partage avec des Tiers</h2>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-3 text-orange-800">Notre engagement</h3>
                <p className="text-orange-700 mb-4">
                  <strong>Nous ne vendons, n'échangeons ni ne transférons vos informations personnelles à des tiers</strong> 
                  sans votre consentement explicite.
                </p>
                <p className="text-orange-700">
                  <strong>Exception :</strong> Nous pouvons partager vos informations avec des partenaires de confiance 
                  qui nous aident à exploiter notre site web, à condition qu'ils s'engagent à maintenir la confidentialité.
                </p>
              </div>
            </div>

            {/* Vos droits */}
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <h2 className="text-2xl font-bold mb-6">5. Vos Droits</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-4">Droits RGPD</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-age-red rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Droit d'accès :</strong> consulter vos données</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-age-red rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Droit de rectification :</strong> corriger vos données</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-age-red rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Droit à l'effacement :</strong> supprimer vos données</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-3">Comment exercer vos droits</h3>
                  <p className="text-gray-700 mb-3">
                    Contactez-nous à tout moment pour exercer vos droits :
                  </p>
                  <p className="text-age-red font-semibold">
                    birgittscheslog99@gmail.com
                  </p>
                </div>
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

export default PrivacyPolicy;
