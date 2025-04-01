
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FileText, BookOpen, GavelIcon } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8 flex items-center">
            <BookOpen className="text-age-red mr-3" size={32} />
            <h1 className="text-3xl font-bold">Conditions Générales</h1>
          </div>
          
          <div className="bg-white p-6 md:p-8 rounded-sm shadow-sm">
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                Bienvenue sur le site Auto Germany Export. En accédant à ce site, vous acceptez d'être lié par ces conditions de service, toutes les lois et réglementations applicables, et acceptez que vous êtes responsable du respect des lois locales applicables.
              </p>
              <p className="text-gray-700">
                Si vous n'acceptez pas ces conditions, vous n'êtes pas autorisé à utiliser ou à accéder à ce site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">2. Contrat de Vente</h2>
              <p className="text-gray-700 mb-4">
                Les présentes conditions générales de vente régissent les relations contractuelles entre Auto Germany Export et ses clients. Tout achat effectué auprès d'Auto Germany Export implique l'acceptation préalable des présentes conditions.
              </p>
              <p className="text-gray-700">
                La vente n'est réputée conclue qu'après acceptation expresse de la commande du client par Auto Germany Export et après versement de l'acompte prévu.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">3. Prix et Paiement</h2>
              <p className="text-gray-700 mb-4">
                Les prix indiqués sur notre site sont en euros, toutes taxes comprises. Auto Germany Export se réserve le droit de modifier ses prix à tout moment, mais les véhicules seront facturés sur la base des tarifs en vigueur au moment de l'enregistrement des commandes.
              </p>
              <p className="text-gray-700">
                Le paiement s'effectue par virement bancaire ou tout autre moyen indiqué au moment de l'achat. Un acompte peut être demandé à la commande, le solde étant payable à la livraison.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">4. Livraison</h2>
              <p className="text-gray-700 mb-4">
                Les délais de livraison sont donnés à titre indicatif. Auto Germany Export s'efforce de respecter les délais de livraison qu'elle indique à l'acceptation de la commande, et à exécuter les commandes, sauf cas de force majeure.
              </p>
              <p className="text-gray-700">
                Tout retard raisonnable dans la livraison des produits ne pourra pas donner lieu à l'allocation de dommages et intérêts au profit de l'acheteur.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">5. Garantie</h2>
              <p className="text-gray-700 mb-4">
                Tous nos véhicules bénéficient de la garantie légale de conformité et de la garantie légale contre les vices cachés. Dans le cas d'un défaut de conformité, Auto Germany Export s'engage à réparer ou à remplacer le véhicule.
              </p>
              <p className="text-gray-700">
                La garantie ne couvre pas l'usure normale, les défauts causés par une utilisation inappropriée ou le non-respect des instructions d'entretien.
              </p>
            </section>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-500">
              Dernière mise à jour: Juin 2023
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;
