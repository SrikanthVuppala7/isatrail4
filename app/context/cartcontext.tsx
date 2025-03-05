// app/context/cartcontext.tsx
import React, { createContext, useContext, useState } from 'react';

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

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    bookedChef: Chef | null;
    setBookedChef: (chef: Chef | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [bookedChef, setBookedChef] = useState<Chef | null>(null);

    const addToCart = (item: CartItem) => {
        setCartItems(prevItems => [...prevItems, item]);
    };

    const removeFromCart = (id: string) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, bookedChef, setBookedChef }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};