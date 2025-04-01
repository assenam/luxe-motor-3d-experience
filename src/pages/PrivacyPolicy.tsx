
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FileText, Shield, Info } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8 flex items-center">
            <Shield className="text-age-red mr-3" size={32} />
            <h1 className="text-3xl font-bold">Politique de Confidentialité</h1>
          </div>
          
          <div className="bg-white p-6 md:p-8 rounded-sm shadow-sm">
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">1. Collecte des Informations</h2>
              <p className="text-gray-700 mb-4">
                Auto Germany Export collecte des informations lorsque vous vous inscrivez sur notre site, passez une commande ou remplissez un formulaire. Les informations collectées incluent votre nom, adresse e-mail, numéro de téléphone et adresse postale.
              </p>
              <p className="text-gray-700">
                Nous collectons également des informations automatiquement concernant votre ordinateur, y compris votre adresse IP, votre type de navigateur et les pages que vous consultez.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">2. Utilisation des Informations</h2>
              <p className="text-gray-700 mb-4">
                Auto Germany Export utilise les informations que nous collectons pour:
              </p>
              <ul className="list-disc pl-5 mb-4 text-gray-700">
                <li className="mb-1">Personnaliser votre expérience et répondre à vos besoins individuels</li>
                <li className="mb-1">Améliorer notre site web</li>
                <li className="mb-1">Améliorer notre service client</li>
                <li className="mb-1">Vous contacter par e-mail</li>
                <li>Traiter vos transactions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">3. Protection des Informations</h2>
              <p className="text-gray-700 mb-4">
                Nous mettons en œuvre diverses mesures de sécurité pour protéger vos informations personnelles. Nous utilisons un cryptage avancé pour protéger les informations sensibles transmises en ligne. Auto Germany Export protège également vos informations hors ligne.
              </p>
              <p className="text-gray-700">
                Seuls les employés qui ont besoin d'effectuer un travail spécifique (par exemple, la facturation ou le service client) ont accès aux informations personnellement identifiables.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">4. Divulgation à des Tiers</h2>
              <p className="text-gray-700">
                Nous ne vendons, n'échangeons ni ne transférons de quelque autre façon que ce soit vos informations personnellement identifiables à des tiers. Cela ne comprend pas les tiers de confiance qui nous aident à exploiter notre site web ou à mener nos activités, tant que ces parties conviennent de garder ces informations confidentielles.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">5. Consentement</h2>
              <p className="text-gray-700">
                En utilisant notre site, vous consentez à notre politique de confidentialité.
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

export default PrivacyPolicy;
