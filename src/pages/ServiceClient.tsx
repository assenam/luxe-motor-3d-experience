
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { UserCheck, MessageCircle, Clock, Star, Users, HeartHandshake } from 'lucide-react';

const ServiceClient = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Service Client Premium</h1>
            <div className="h-1 w-20 bg-age-red mb-10"></div>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                Chez Auto Germany Export, nous nous distinguons par notre service client d'exception.
                Votre satisfaction est notre priorité absolue, et nous mettons tout en œuvre pour vous offrir
                une expérience personnalisée et sans stress du début à la fin de votre projet d'acquisition.
              </p>
              
              <div className="bg-white shadow-md rounded-sm p-6 my-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 -translate-y-1/2 translate-x-1/2 bg-age-red/10 rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-60 h-60 translate-y-1/2 -translate-x-1/2 bg-age-red/5 rounded-full"></div>
                
                <div className="relative z-10">
                  <h2 className="text-2xl font-semibold mb-6 text-center">Notre approche du service client</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex items-start">
                      <div className="bg-gray-100 p-3 rounded-full mr-4">
                        <UserCheck className="h-6 w-6 text-age-red" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg mb-2">Conseiller personnel dédié</h3>
                        <p className="text-gray-600">Un interlocuteur unique vous accompagne tout au long de votre projet, connaissant parfaitement vos préférences et vos attentes.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-gray-100 p-3 rounded-full mr-4">
                        <MessageCircle className="h-6 w-6 text-age-red" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg mb-2">Communication constante</h3>
                        <p className="text-gray-600">Nous vous tenons informé à chaque étape du processus, avec des mises à jour régulières et des réponses rapides à vos questions.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-gray-100 p-3 rounded-full mr-4">
                        <Clock className="h-6 w-6 text-age-red" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg mb-2">Disponibilité étendue</h3>
                        <p className="text-gray-600">Notre équipe est disponible 7j/7 de 8h à 21h pour répondre à vos interrogations et vous assister dans vos démarches.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-gray-100 p-3 rounded-full mr-4">
                        <Star className="h-6 w-6 text-age-red" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg mb-2">Suivi après-vente</h3>
                        <p className="text-gray-600">Notre relation ne s'arrête pas à la livraison. Nous restons à votre disposition pour toute question ou besoin après l'achat.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <h2 className="text-2xl font-semibold mt-14 mb-6">Services personnalisés</h2>
              <p className="mb-6">
                Notre approche est entièrement personnalisée selon vos besoins spécifiques. Voici quelques exemples
                des services que nous pouvons vous proposer :
              </p>
              
              <div className="grid grid-cols-1 gap-4 my-8">
                <div className="bg-white p-5 shadow-sm rounded-sm border-l-4 border-age-red flex items-start">
                  <Users size={24} className="text-age-red mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-lg mb-1">Recherche sur mesure</h4>
                    <p className="text-gray-600">
                      Vous avez un modèle précis en tête avec des spécifications particulières ? Notre équipe 
                      mettra tout en œuvre pour trouver exactement le véhicule que vous recherchez, même les 
                      configurations les plus rares.
                    </p>
                  </div>
                </div>
                
                <div className="bg-white p-5 shadow-sm rounded-sm border-l-4 border-age-red flex items-start">
                  <HeartHandshake size={24} className="text-age-red mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-lg mb-1">Accompagnement administratif complet</h4>
                    <p className="text-gray-600">
                      Nous prenons en charge l'ensemble des démarches administratives liées à votre achat : 
                      documents d'importation, formalités douanières, immatriculation dans votre pays, 
                      carte grise, et plus encore.
                    </p>
                  </div>
                </div>
                
                <div className="bg-white p-5 shadow-sm rounded-sm border-l-4 border-age-red flex items-start">
                  <Star size={24} className="text-age-red mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-lg mb-1">Personnalisation de votre véhicule</h4>
                    <p className="text-gray-600">
                      Nous pouvons organiser des modifications ou améliorations spécifiques avant la livraison : 
                      jantes, systèmes multimédia, traitement céramique, films de protection, et autres 
                      personnalisations.
                    </p>
                  </div>
                </div>
                
                <div className="bg-white p-5 shadow-sm rounded-sm border-l-4 border-age-red flex items-start">
                  <MessageCircle size={24} className="text-age-red mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-lg mb-1">Service multilingue</h4>
                    <p className="text-gray-600">
                      Notre équipe parle plusieurs langues (français, anglais, allemand, italien, arabe) pour faciliter 
                      la communication et vous servir dans la langue qui vous convient le mieux.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-100 p-6 rounded-sm my-10">
                <h3 className="text-xl font-semibold mb-4">Témoignages clients</h3>
                
                <div className="space-y-4">
                  <blockquote className="border-l-4 border-age-red pl-4 italic">
                    "L'équipe d'Auto Germany Export a été exceptionnelle du début à la fin. Ils ont trouvé la Mercedes que je cherchais depuis des mois et ont géré toute l'importation sans aucun souci pour moi. Je recommande vivement leurs services."
                    <footer className="text-sm text-gray-600 mt-2">— Thomas D., Paris</footer>
                  </blockquote>
                  
                  <blockquote className="border-l-4 border-age-red pl-4 italic">
                    "J'hésitais à importer une voiture d'Allemagne, mais leur service client m'a rassuré tout au long du processus. Mon conseiller était disponible même le week-end pour répondre à mes questions. Très professionnel."
                    <footer className="text-sm text-gray-600 mt-2">— Sophie M., Bruxelles</footer>
                  </blockquote>
                </div>
              </div>
            </div>
            
            <div className="mt-10 pt-6 border-t border-gray-200 flex flex-wrap gap-4">
              <Link to="/contact" className="bg-age-red text-white px-6 py-3 inline-block hover:bg-age-darkgray transition-colors">
                Contacter notre service client
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

export default ServiceClient;
