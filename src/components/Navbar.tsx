import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, Search, ShoppingCart, Trash2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { formatCurrency } from '@/lib/data';
import { vehicles } from '@/lib/vehicles';
import LanguageSelector from './LanguageSelector';
import { useGoogleTranslate } from '@/hooks/useGoogleTranslate';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { cartItems, removeFromCart } = useCart();
  const { currentLang, changeLanguage } = useGoogleTranslate();

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

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      setSearchQuery('');
    }
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const handleSearchSelect = (value: string) => {
    setSearchOpen(false);
    setSearchQuery('');
    navigate(value);
  };

  console.log('Total vehicles in search:', vehicles.length);
  console.log('Search query:', searchQuery);

  // Filtrer les véhicules selon la recherche
  const filteredVehicles = vehicles.filter(vehicle => {
    if (searchQuery.length === 0) return false;
    
    const query = searchQuery.toLowerCase();
    const brandMatch = vehicle.brand.toLowerCase().includes(query);
    const modelMatch = vehicle.model.toLowerCase().includes(query);
    const fullNameMatch = `${vehicle.brand} ${vehicle.model}`.toLowerCase().includes(query);
    const yearMatch = vehicle.year.toString().includes(query);
    const colorMatch = vehicle.exteriorColor.toLowerCase().includes(query);
    
    const matches = brandMatch || modelMatch || fullNameMatch || yearMatch || colorMatch;
    
    if (query === 'bmw' && vehicle.brand.toLowerCase() === 'bmw') {
      console.log('BMW vehicle found:', vehicle.brand, vehicle.model, vehicle.id);
    }
    
    return matches;
  }).slice(0, 8); // Augmenter de 5 à 8 pour voir plus de résultats

  const totalVehiclesFound = vehicles.filter(vehicle => {
    if (searchQuery.length === 0) return false;
    
    const query = searchQuery.toLowerCase();
    return (
      vehicle.brand.toLowerCase().includes(query) ||
      vehicle.model.toLowerCase().includes(query) ||
      `${vehicle.brand} ${vehicle.model}`.toLowerCase().includes(query) ||
      vehicle.year.toString().includes(query) ||
      vehicle.exteriorColor.toLowerCase().includes(query)
    );
  }).length;

  console.log('Filtered vehicles count:', filteredVehicles.length);
  console.log('Total vehicles found:', totalVehiclesFound);

  const handleViewCars = () => {
    setCartOpen(false);
    navigate('/vehicles');
  };

  const handleCheckout = () => {
    setCartOpen(false);
    if (cartItems.length === 1) {
      navigate('/payment', { state: { vehicle: cartItems[0] } });
    } else {
      navigate('/payment');
    }
  };

  const handleViewVehicle = (id: string) => {
    setCartOpen(false);
    navigate(`/vehicles/${id}`);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'glass-panel py-4 md:py-5' 
          : 'bg-transparent py-6 md:py-8'
      }`}
    >
      <div className="container-age">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link 
            to="/" 
            className="flex items-center space-x-4 flex-shrink-0"
          >
            <img 
              src="/lovable-uploads/247a02f1-6984-4daa-a408-03f1a88c0a4d.png" 
              alt="Auto Germany Export Logo" 
              className="h-10 md:h-12 lg:h-14 mix-blend-screen"
            />
            <div className={`flex flex-col transition-colors duration-300 ${!scrolled ? 'text-white' : 'text-age-black'}`}>
              <span className="text-lg md:text-xl lg:text-2xl font-bold tracking-tight leading-tight">AUTO GERMANY</span>
              <span className="text-xs md:text-sm lg:text-base tracking-widest text-age-red uppercase font-medium">EXPORT</span>
            </div>
          </Link>
          
          {/* Navigation principale - Desktop */}
          {!isMobile ? (
            <nav className="hidden lg:flex items-center space-x-8 xl:space-x-12">
              <Link 
                to="/" 
                className={`text-sm xl:text-base font-medium hover:text-age-red transition-colors duration-300 py-2 px-1 ${!scrolled ? 'text-white' : 'text-age-black'}`}
              >
                Accueil
              </Link>
              <Link 
                to="/vehicles" 
                className={`text-sm xl:text-base font-medium hover:text-age-red transition-colors duration-300 py-2 px-1 ${!scrolled ? 'text-white' : 'text-age-black'}`}
              >
                Véhicules
              </Link>
              <Link 
                to="/about" 
                className={`text-sm xl:text-base font-medium hover:text-age-red transition-colors duration-300 py-2 px-1 ${!scrolled ? 'text-white' : 'text-age-black'}`}
              >
                À Propos
              </Link>
              <Link 
                to="/contact" 
                className={`text-sm xl:text-base font-medium hover:text-age-red transition-colors duration-300 py-2 px-1 ${!scrolled ? 'text-white' : 'text-age-black'}`}
              >
                Contact
              </Link>
            </nav>
          ) : null}
          
          {/* Actions du header */}
          <div className="flex items-center space-x-3 md:space-x-4 lg:space-x-6">
            {/* Sélecteur de langue */}
            <div className={`hidden md:block transition-colors duration-300 ${!scrolled ? 'text-white' : 'text-age-black'}`}>
              <LanguageSelector 
                currentLang={currentLang} 
                onLanguageChange={changeLanguage} 
              />
            </div>
            
            {/* Bouton de recherche */}
            <button 
              className={`p-2 hover:text-age-red transition-colors duration-300 hover:bg-white/10 rounded-md ${!scrolled ? 'text-white' : 'text-age-black'}`}
              onClick={toggleSearch}
              aria-label="Rechercher"
            >
              <Search size={20} className="md:w-5 md:h-5" />
            </button>
            
            {/* Bouton utilisateur - Desktop uniquement */}
            <button 
              className={`hidden lg:block p-2 hover:text-age-red transition-colors duration-300 hover:bg-white/10 rounded-md ${!scrolled ? 'text-white' : 'text-age-black'}`}
              aria-label="Compte utilisateur"
            >
              <User size={20} className="md:w-5 md:h-5" />
            </button>
            
            {/* Panier */}
            <Drawer open={cartOpen} onOpenChange={setCartOpen}>
              <DrawerTrigger asChild>
                <button 
                  className={`p-2 hover:text-age-red transition-colors duration-300 hover:bg-white/10 rounded-md relative ${!scrolled ? 'text-white' : 'text-age-black'}`}
                  onClick={toggleCart}
                  aria-label="Panier"
                >
                  <ShoppingCart size={20} className="md:w-5 md:h-5" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-age-red text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
                      {cartItems.length}
                    </span>
                  )}
                </button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerTitle className="text-center">Votre panier</DrawerTitle>
                  </DrawerHeader>
                  <div className="p-4 pb-0 max-h-[70vh] overflow-auto">
                    {cartItems.length === 0 ? (
                      <div className="flex flex-col items-center justify-center space-y-4 py-8">
                        <ShoppingCart className="h-12 w-12 text-muted-foreground" />
                        <div className="text-center">
                          <h3 className="text-lg font-medium">Votre panier est vide</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Découvrez notre sélection de véhicules premium pour ajouter à votre panier
                          </p>
                        </div>
                        <Button onClick={handleViewCars} className="w-full bg-age-red hover:bg-age-darkred text-white">
                          Voir les véhicules
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex items-start border-b border-gray-200 pb-4 gap-3">
                            <img 
                              src={item.mainImage} 
                              alt={`${item.brand} ${item.model}`} 
                              className="w-20 h-16 object-cover rounded-sm"
                            />
                            <div className="flex-grow">
                              <div className="flex justify-between">
                                <h4 className="font-medium">
                                  {item.brand} {item.model}
                                </h4>
                                <button 
                                  onClick={() => removeFromCart(item.id)}
                                  className="text-gray-400 hover:text-age-red transition-colors"
                                  aria-label="Supprimer du panier"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {item.year} • {item.exteriorColor}
                              </p>
                              <div className="flex justify-between items-center mt-1">
                                <span className="font-semibold">{formatCurrency(item.price)}</span>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => handleViewVehicle(item.id)}
                                  className="text-xs h-7 px-2"
                                >
                                  Voir
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        <div className="border-t border-gray-200 pt-4">
                          <div className="flex justify-between mb-2">
                            <span>Sous-total</span>
                            <span className="font-semibold">
                              {formatCurrency(cartItems.reduce((total, item) => total + item.price, 0))}
                            </span>
                          </div>
                          <Button 
                            onClick={handleCheckout} 
                            className="w-full bg-age-red hover:bg-age-darkred text-white"
                          >
                            Passer à la caisse
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={handleViewCars} 
                            className="w-full mt-2"
                          >
                            Continuer vos achats
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="outline">Fermer</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
            
            {/* Menu mobile */}
            {isMobile && (
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <button 
                    onClick={toggleMobileMenu} 
                    className={`p-2 hover:text-age-red transition-colors duration-300 hover:bg-white/10 rounded-md ${!scrolled ? 'text-white' : 'text-age-black'}`}
                    aria-label="Menu"
                  >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-white/95 backdrop-blur-md border-l border-age-red/20 pt-20 w-80">
                  <div className="flex flex-col space-y-8">
                    {/* Navigation mobile */}
                    <div className="space-y-6">
                      <Link 
                        to="/" 
                        className="block text-xl font-medium hover:text-age-red transition-colors py-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Accueil
                      </Link>
                      <Link 
                        to="/vehicles" 
                        className="block text-xl font-medium hover:text-age-red transition-colors py-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Véhicules
                      </Link>
                      <Link 
                        to="/about" 
                        className="block text-xl font-medium hover:text-age-red transition-colors py-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        À Propos
                      </Link>
                      <Link 
                        to="/contact" 
                        className="block text-xl font-medium hover:text-age-red transition-colors py-2" 
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Contact
                      </Link>
                    </div>
                    
                    {/* Actions mobiles */}
                    <div className="pt-6 border-t border-gray-200 space-y-6">
                      <div>
                        <LanguageSelector 
                          currentLang={currentLang} 
                          onLanguageChange={changeLanguage} 
                        />
                      </div>
                      <button className="flex items-center space-x-3 text-lg hover:text-age-red transition-colors py-2 w-full">
                        <User size={20} />
                        <span>Compte</span>
                      </button>
                      <button 
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setCartOpen(true);
                        }}
                        className="flex items-center space-x-3 text-lg hover:text-age-red transition-colors py-2 w-full"
                      >
                        <ShoppingCart size={20} />
                        <span>Panier {cartItems.length > 0 && `(${cartItems.length})`}</span>
                      </button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>

      {/* Dialog de recherche avec recherche de véhicules */}
      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <CommandInput 
          placeholder="Rechercher par marque, modèle, année ou couleur..." 
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          <CommandEmpty>
            {searchQuery.length > 0 ? 'Aucun véhicule trouvé pour cette recherche.' : 'Commencez à taper pour rechercher des véhicules...'}
          </CommandEmpty>
          
          {searchQuery.length === 0 && (
            <CommandGroup heading="Navigation">
              <CommandItem onSelect={() => handleSearchSelect("/")}>
                🏠 Accueil
              </CommandItem>
              <CommandItem onSelect={() => handleSearchSelect("/vehicles")}>
                🚗 Tous les véhicules
              </CommandItem>
              <CommandItem onSelect={() => handleSearchSelect("/about")}>
                ℹ️ À Propos
              </CommandItem>
              <CommandItem onSelect={() => handleSearchSelect("/contact")}>
                📧 Contact
              </CommandItem>
            </CommandGroup>
          )}
          
          {filteredVehicles.length > 0 && (
            <CommandGroup heading={`Véhicules trouvés (${totalVehiclesFound})`}>
              {filteredVehicles.map((vehicle) => (
                <CommandItem 
                  key={vehicle.id} 
                  onSelect={() => handleSearchSelect(`/vehicles/${vehicle.id}`)}
                  className="flex items-center space-x-3"
                >
                  <img 
                    src={vehicle.mainImage} 
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    className="w-12 h-8 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="font-medium">
                      {vehicle.brand} {vehicle.model}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {vehicle.year} • {formatCurrency(vehicle.price)}
                    </div>
                  </div>
                </CommandItem>
              ))}
              {totalVehiclesFound > 5 && (
                <CommandItem onSelect={() => handleSearchSelect(`/vehicles?search=${encodeURIComponent(searchQuery)}`)}>
                  <div className="text-center w-full text-age-red font-medium">
                    Voir tous les résultats ({totalVehiclesFound} véhicules)
                  </div>
                </CommandItem>
              )}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </header>
  );
};

export default Navbar;
