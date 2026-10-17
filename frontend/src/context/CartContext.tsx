import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { CartItem, Produit } from '../types';

interface CartContextValue {
  items: CartItem[];
  addToCart: (produit: Produit) => void;
  removeFromCart: (id: number) => void;
  updateQuantite: (id: number, quantite: number) => void;
  clearCart: () => void;
  total: number;
  nbArticles: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (produit: Produit): void => {
    setItems((prev) => {
      const existant = prev.find((item) => item.id === produit.id);
      if (existant) {
        return prev.map((item) =>
          item.id === produit.id ? { ...item, quantite: item.quantite + 1 } : item
        );
      }
      return [...prev, { ...produit, quantite: 1 }];
    });
  };

  const removeFromCart = (id: number): void => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantite = (id: number, quantite: number): void => {
    if (quantite < 1) return;
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantite } : item)));
  };

  const clearCart = (): void => setItems([]);

  const total = items.reduce((sum, item) => sum + item.prix * item.quantite, 0);
  const nbArticles = items.reduce((sum, item) => sum + item.quantite, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantite, clearCart, total, nbArticles }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart doit être utilisé à l\'intérieur de CartProvider');
  }
  return context;
}
