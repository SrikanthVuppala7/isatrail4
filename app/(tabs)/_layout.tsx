// app/_layout.tsx
import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router'; // Import Stack from expo-router
import { CartProvider } from '../context/cartcontext'; // Adjust path as needed
import { Amplify } from 'aws-amplify';
import config from '../../src/amplifyconfiguration.json';
Amplify.configure(config);

const RootLayout: React.FC = () => {
  return (
    <CartProvider>
      <Tabs>
        <Tabs.Screen 
          name="index" 
          options={{ 
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
            tabBarActiveTintColor: '#5c5be3'
          }} 
        />
        <Tabs.Screen 
          name="food" // This will now be a stack navigator
          options={{ 
            title: "Delivery",
            headerShown: false,
            tabBarIcon: ({ color, size }) => <Ionicons name="bicycle-outline" size={size} color={color} />,
            tabBarActiveTintColor: '#5c5be3'
          }} 
        />
        <Tabs.Screen 
          name="cart" 
          options={{ 
            title: "Cart",
            headerShown: false,
            tabBarIcon: ({ color, size }) => <Ionicons name="cart-outline" size={size} color={color} />,
            tabBarActiveTintColor: '#5c5be3'
          }} 
        />
        <Tabs.Screen 
          name="reorder" 
          options={{ 
            title: "Reorder",
            headerShown: false,
            tabBarIcon: ({ color, size }) => <Ionicons name="refresh-outline" size={size} color={color} />,
            tabBarActiveTintColor: '#5c5be3'
          }} 
        />
      </Tabs>
    </CartProvider>
  );
};

export default (RootLayout);