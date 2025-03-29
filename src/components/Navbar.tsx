
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
      <div className="container-age flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-3"
        >
          <img 
            src="/lovable-uploads/247a02f1-6984-4daa-a408-03f1a88c0a4d.png" 
            alt="Auto Germany Export Logo" 
            className="h-12 md:h-14 mix-blend-difference"
          />
          <div className={`flex flex-col ${!scrolled ? 'text-white' : 'text-age-black'}`}>
            <span className="text-lg md:text-xl font-bold tracking-tight">AUTO GERMANY</span>
            <span className="text-sm md:text-base tracking-widest text-age-red uppercase">EXPORT</span>
          </div>
        </Link>
        
        {!isMobile ? (
          <nav className="hidden md:flex items-center space-x-12">
            <Link to="/" className={`hover:text-age-red transition-colors duration-300 ${!scrolled ? 'text-white' : 'text-age-black'}`}>
              Accueil
            </Link>
            <Link to="/vehicles" className={`hover:text-age-red transition-colors duration-300 ${!scrolled ? 'text-white' : 'text-age-black'}`}>
              Véhicules
            </Link>
            <Link to="/about" className={`hover:text-age-red transition-colors duration-300 ${!scrolled ? 'text-white' : 'text-age-black'}`}>
              À Propos
            </Link>
            <Link to="/contact" className={`hover:text-age-red transition-colors duration-300 ${!scrolled ? 'text-white' : 'text-age-black'}`}>
              Contact
            </Link>
          </nav>
        ) : null}
        
        <div className="flex items-center space-x-4">
          <button className={`hover:text-age-red transition-colors ${!scrolled ? 'text-white' : 'text-age-black'}`}>
            <Search size={20} />
          </button>
          <button className={`hover:text-age-red transition-colors hidden md:block ${!scrolled ? 'text-white' : 'text-age-black'}`}>
            <User size={20} />
          </button>
          <button className={`hover:text-age-red transition-colors hidden md:block ${!scrolled ? 'text-white' : 'text-age-black'}`}>
            <ShoppingCart size={20} />
          </button>
          
          {isMobile && (
            <button 
              onClick={toggleMobileMenu} 
              className={`hover:text-age-red transition-colors ${!scrolled ? 'text-white' : 'text-age-black'}`}
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
              className="text-age-black hover:text-age-red transition-colors font-medium text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link 
              to="/vehicles" 
              className="text-age-black hover:text-age-red transition-colors font-medium text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Véhicules
            </Link>
            <Link 
              to="/about" 
              className="text-age-black hover:text-age-red transition-colors font-medium text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              À Propos
            </Link>
            <Link 
              to="/contact" 
              className="text-age-black hover:text-age-red transition-colors font-medium text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex space-x-6 pt-4">
              <button className="text-age-black hover:text-age-red transition-colors">
                <User size={20} />
              </button>
              <button className="text-age-black hover:text-age-red transition-colors">
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
