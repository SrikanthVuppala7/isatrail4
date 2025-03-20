// context/cartcontext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: string;
  image: string;
}

interface Chef {
  id: string;
  name: string;
  price: string;
  image: string;
  rating: number;
  dishes: string[];
}

interface Order {
  id: string;
  items: CartItem[];
  chef: Chef;
  total: number;
  date: string;
}

interface CartContextType {
  cartItems: CartItem[];
  bookedChef: Chef | null;
  orders: Order[];
  addToCart: (item: CartItem) => void;
  setBookedChef: (chef: Chef | null) => void;
  clearCart: () => void;
  addOrder: (order: Order) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [bookedChef, setBookedChef] = useState<Chef | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => [...prev, item]);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addOrder = (order: Order) => {
    setOrders((prev) => [...prev, order]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, bookedChef, orders, addToCart, setBookedChef, clearCart, addOrder }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};