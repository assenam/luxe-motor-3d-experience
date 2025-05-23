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

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { cartItems, removeFromCart } = useCart();

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
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const handleSearchSelect = (value: string) => {
    setSearchOpen(false);
    navigate(value);
  };

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
            className="h-12 md:h-14 mix-blend-screen"
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
          <button 
            className={`hover:text-age-red transition-colors ${!scrolled ? 'text-white' : 'text-age-black'}`}
            onClick={toggleSearch}
          >
            <Search size={20} />
          </button>
          <button className={`hover:text-age-red transition-colors hidden md:block ${!scrolled ? 'text-white' : 'text-age-black'}`}>
            <User size={20} />
          </button>
          
          <Drawer open={cartOpen} onOpenChange={setCartOpen}>
            <DrawerTrigger asChild>
              <button 
                className={`hover:text-age-red transition-colors relative ${!scrolled ? 'text-white' : 'text-age-black'}`}
                onClick={toggleCart}
              >
                <ShoppingCart size={20} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-age-red text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
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
          
          {isMobile && (
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button 
                  onClick={toggleMobileMenu} 
                  className={`hover:text-age-red transition-colors ${!scrolled ? 'text-white' : 'text-age-black'}`}
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white/95 backdrop-blur-md border-l border-age-red/20 pt-16">
                <div className="flex flex-col space-y-6">
                  <Link 
                    to="/" 
                    className="text-xl font-medium hover:text-age-red transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Accueil
                  </Link>
                  <Link 
                    to="/vehicles" 
                    className="text-xl font-medium hover:text-age-red transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Véhicules
                  </Link>
                  <Link 
                    to="/about" 
                    className="text-xl font-medium hover:text-age-red transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    À Propos
                  </Link>
                  <Link 
                    to="/contact" 
                    className="text-xl font-medium hover:text-age-red transition-colors" 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                  
                  <div className="pt-6 border-t border-gray-200">
                    <div className="flex items-center space-x-4 mt-4">
                      <button className="flex items-center space-x-2 text-base hover:text-age-red transition-colors">
                        <User size={18} />
                        <span>Compte</span>
                      </button>
                    </div>
                    <div className="flex items-center space-x-4 mt-4">
                      <button 
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setCartOpen(true);
                        }}
                        className="flex items-center space-x-2 text-base hover:text-age-red transition-colors">
                        <ShoppingCart size={18} />
                        <span>Panier</span>
                      </button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>

      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <CommandInput placeholder="Rechercher..." />
        <CommandList>
          <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
          <CommandGroup heading="Pages">
            <CommandItem onSelect={() => handleSearchSelect("/")}>
              Accueil
            </CommandItem>
            <CommandItem onSelect={() => handleSearchSelect("/vehicles")}>
              Véhicules
            </CommandItem>
            <CommandItem onSelect={() => handleSearchSelect("/about")}>
              À Propos
            </CommandItem>
            <CommandItem onSelect={() => handleSearchSelect("/contact")}>
              Contact
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Véhicules populaires">
            <CommandItem onSelect={() => handleSearchSelect("/vehicles/1")}>
              Mercedes-Benz S-Class
            </CommandItem>
            <CommandItem onSelect={() => handleSearchSelect("/vehicles/2")}>
              BMW Série 7
            </CommandItem>
            <CommandItem onSelect={() => handleSearchSelect("/vehicles/3")}>
              Audi A8
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
};

export default Navbar;
