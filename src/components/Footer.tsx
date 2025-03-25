
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-luxe-black text-white">
      <div className="container-luxe py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="text-2xl font-playfair font-bold mb-6">
              <span className="text-white">LUXE</span>
              <span className="gold-accent">MOTOR</span>
            </h3>
            <p className="text-luxe-lightgray mb-8 max-w-xs">
              L'excellence automobile accessible. Découvrez notre sélection de véhicules d'exception soigneusement inspectés et préparés.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-luxe-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-luxe-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-luxe-gold transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-6">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-luxe-lightgray hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/vehicles" className="text-luxe-lightgray hover:text-white transition-colors">
                  Véhicules
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-luxe-lightgray hover:text-white transition-colors">
                  À Propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-luxe-lightgray hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-luxe-lightgray hover:text-white transition-colors">
                  Magazine
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-6">Services</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-luxe-lightgray hover:text-white transition-colors">
                  Financement Premium
                </a>
              </li>
              <li>
                <a href="#" className="text-luxe-lightgray hover:text-white transition-colors">
                  Garantie Étendue
                </a>
              </li>
              <li>
                <a href="#" className="text-luxe-lightgray hover:text-white transition-colors">
                  Conciergerie
                </a>
              </li>
              <li>
                <a href="#" className="text-luxe-lightgray hover:text-white transition-colors">
                  Service Client VIP
                </a>
              </li>
              <li>
                <a href="#" className="text-luxe-lightgray hover:text-white transition-colors">
                  Showroom Privé
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={18} className="text-luxe-gold mr-3 mt-1 flex-shrink-0" />
                <span className="text-luxe-lightgray">
                  123 Avenue des Champs-Élysées<br />
                  75008 Paris, France
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-luxe-gold mr-3 flex-shrink-0" />
                <span className="text-luxe-lightgray">+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-luxe-gold mr-3 flex-shrink-0" />
                <span className="text-luxe-lightgray">contact@luxemotor.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="py-6 border-t border-luxe-gray/30">
        <div className="container-luxe flex flex-col md:flex-row justify-between items-center">
          <p className="text-luxe-lightgray text-sm mb-4 md:mb-0">
            © 2023 LuxeMotor. Tous droits réservés.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-luxe-lightgray hover:text-white text-sm transition-colors">
              Politique de Confidentialité
            </a>
            <a href="#" className="text-luxe-lightgray hover:text-white text-sm transition-colors">
              Conditions Générales
            </a>
            <a href="#" className="text-luxe-lightgray hover:text-white text-sm transition-colors">
              Mentions Légales
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
