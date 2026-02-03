import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-age-black text-white">
      <div className="container-age py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/lovable-uploads/247a02f1-6984-4daa-a408-03f1a88c0a4d.png" 
                alt="Auto Germany Export Logo" 
                className="h-12" 
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight text-white">AUTO GERMANY</span>
                <span className="text-sm tracking-widest text-age-red uppercase">EXPORT</span>
              </div>
            </div>
            <p className="text-age-lightgray mb-8 max-w-xs">
              L'excellence automobile allemande accessible. Découvrez notre sélection de véhicules soigneusement inspectés et préparés.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/1FvsvAzw4b/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-white hover:text-age-red transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-age-red transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-age-red transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-6">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-age-lightgray hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/vehicles" className="text-age-lightgray hover:text-white transition-colors">
                  Véhicules
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-age-lightgray hover:text-white transition-colors">
                  À Propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-age-lightgray hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-age-lightgray hover:text-white transition-colors">
                  Services
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-6">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/services/importation" className="text-age-lightgray hover:text-white transition-colors">
                  Importation Allemande
                </Link>
              </li>
              <li>
                <Link to="/services/garantie" className="text-age-lightgray hover:text-white transition-colors">
                  Garantie Constructeur
                </Link>
              </li>
              <li>
                <Link to="/services/livraison" className="text-age-lightgray hover:text-white transition-colors">
                  Livraison Internationale
                </Link>
              </li>
              <li>
                <Link to="/services/service-client" className="text-age-lightgray hover:text-white transition-colors">
                  Service Client Premium
                </Link>
              </li>
              <li>
                <Link to="/services/financement" className="text-age-lightgray hover:text-white transition-colors">
                  Financement Personnalisé
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={18} className="text-age-red mr-3 mt-1 flex-shrink-0" />
                <span className="text-age-lightgray">
                  Paul-Gossen-Straße 116<br />
                  91052 Erlangen, Germania
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-age-red mr-3 flex-shrink-0" />
                <span className="text-age-lightgray">+49 176 25839857</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-age-red mr-3 flex-shrink-0" />
                <span className="text-age-lightgray">contact@autogermanyexport.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="py-6 border-t border-gray-800">
        <div className="container-age flex flex-col md:flex-row justify-between items-center">
          <p className="text-age-lightgray text-sm mb-4 md:mb-0">
            © 2023 Auto Germany Export. Tous droits réservés.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="text-age-lightgray hover:text-white text-sm transition-colors">
              Politique de Confidentialité
            </Link>
            <Link to="/terms-of-service" className="text-age-lightgray hover:text-white text-sm transition-colors">
              Conditions Générales
            </Link>
            <Link to="/legal-notices" className="text-age-lightgray hover:text-white text-sm transition-colors">
              Mentions Légales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
