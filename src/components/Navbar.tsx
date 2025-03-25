
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, Search, ShoppingCart } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'glass-panel py-3' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container-luxe flex items-center justify-between">
        <Link 
          to="/" 
          className="text-2xl md:text-3xl font-playfair font-bold tracking-tight"
        >
          <span className="text-luxe-black">LUXE</span>
          <span className="gold-accent">MOTOR</span>
        </Link>
        
        {!isMobile ? (
          <nav className="hidden md:flex items-center space-x-12">
            <Link to="/" className="text-luxe-black hover:text-luxe-gold transition-colors duration-300">
              Accueil
            </Link>
            <Link to="/vehicles" className="text-luxe-black hover:text-luxe-gold transition-colors duration-300">
              Véhicules
            </Link>
            <Link to="/about" className="text-luxe-black hover:text-luxe-gold transition-colors duration-300">
              À Propos
            </Link>
            <Link to="/contact" className="text-luxe-black hover:text-luxe-gold transition-colors duration-300">
              Contact
            </Link>
          </nav>
        ) : null}
        
        <div className="flex items-center space-x-4">
          <button className="text-luxe-black hover:text-luxe-gold transition-colors">
            <Search size={20} />
          </button>
          <button className="text-luxe-black hover:text-luxe-gold transition-colors hidden md:block">
            <User size={20} />
          </button>
          <button className="text-luxe-black hover:text-luxe-gold transition-colors hidden md:block">
            <ShoppingCart size={20} />
          </button>
          
          {isMobile && (
            <button 
              onClick={toggleMobileMenu} 
              className="text-luxe-black hover:text-luxe-gold transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobile && mobileMenuOpen && (
        <div className="glass-panel px-4 py-8 shadow-lg animate-fade-in">
          <nav className="flex flex-col space-y-6">
            <Link 
              to="/" 
              className="text-luxe-black hover:text-luxe-gold transition-colors font-medium text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link 
              to="/vehicles" 
              className="text-luxe-black hover:text-luxe-gold transition-colors font-medium text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Véhicules
            </Link>
            <Link 
              to="/about" 
              className="text-luxe-black hover:text-luxe-gold transition-colors font-medium text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              À Propos
            </Link>
            <Link 
              to="/contact" 
              className="text-luxe-black hover:text-luxe-gold transition-colors font-medium text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex space-x-6 pt-4">
              <button className="text-luxe-black hover:text-luxe-gold transition-colors">
                <User size={20} />
              </button>
              <button className="text-luxe-black hover:text-luxe-gold transition-colors">
                <ShoppingCart size={20} />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
