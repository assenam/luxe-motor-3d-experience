
import { createContext, useContext, useState, ReactNode } from 'react';
import { Vehicle } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

type CartContextType = {
  cartItems: Vehicle[];
  addToCart: (vehicle: Vehicle) => void;
  removeFromCart: (vehicleId: string) => void;
  clearCart: () => void;
  isInCart: (vehicleId: string) => boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Vehicle[]>([]);
  const { toast } = useToast();

  const addToCart = (vehicle: Vehicle) => {
    // Check if vehicle is already in cart
    if (cartItems.some(item => item.id === vehicle.id)) {
      toast({
        title: "Déjà dans votre panier",
        description: "Ce véhicule est déjà dans votre panier",
      });
      return;
    }
    
    setCartItems([...cartItems, vehicle]);
    toast({
      title: "Ajouté au panier",
      description: `${vehicle.brand} ${vehicle.model} ajouté à votre panier`,
    });
  };

  const removeFromCart = (vehicleId: string) => {
    setCartItems(cartItems.filter(item => item.id !== vehicleId));
    toast({
      title: "Retiré du panier",
      description: "Le véhicule a été retiré de votre panier",
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const isInCart = (vehicleId: string) => {
    return cartItems.some(item => item.id === vehicleId);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, isInCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
