
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BookOpen, Info } from 'lucide-react';

const LegalNotices = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8 flex items-center">
            <Info className="text-age-red mr-3" size={32} />
            <h1 className="text-3xl font-bold">Mentions Légales</h1>
          </div>
          
          <div className="bg-white p-6 md:p-8 rounded-sm shadow-sm">
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Éditeur du Site</h2>
              <p className="text-gray-700 mb-4">
                Auto Germany Export<br />
                KarolinenstraB 6<br />
                96049 Bamberg, Hamburg, Germany
              </p>
              <p className="text-gray-700 mb-4">
                Téléphone: +39 350 999 4001<br />
                Email: birgittscheslog99@gmail.com
              </p>
              <p className="text-gray-700">
                Numéro d'immatriculation: DE123456789<br />
                Capital social: 100 000€
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Directeur de la Publication</h2>
              <p className="text-gray-700">
                M. John Doe, directeur général d'Auto Germany Export.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Hébergement</h2>
              <p className="text-gray-700">
                Le site www.autogermanyexport.com est hébergé par:<br />
                Hosting Company GmbH<br />
                Hosting Street 123<br />
                10115 Berlin, Germany
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Propriété Intellectuelle</h2>
              <p className="text-gray-700">
                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Données Personnelles</h2>
              <p className="text-gray-700">
                Conformément à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée, vous disposez d'un droit d'accès, de modification, de rectification et de suppression des données qui vous concernent. Pour exercer ce droit, veuillez nous contacter à l'adresse: birgittscheslog99@gmail.com
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

export default LegalNotices;
