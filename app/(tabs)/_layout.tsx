import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const RootLayout: React.FC = () => {
  return (
    <Tabs>
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
          tabBarActiveTintColor:'#5c5be3'
        }} 
        />
      <Tabs.Screen 
        name="Signin" 
        options={{ 
          title: "tympass",
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
          tabBarActiveTintColor:'#5c5be3'
        }} 
        />
      <Tabs.Screen 
        name="delivery" 
        options={{ 
          title: "Delivery",
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="bicycle-outline" size={size} color={color} />,
          tabBarActiveTintColor:'#5c5be3'
        }} 
      />
      <Tabs.Screen 
        name="cart" 
        options={{ 
          title: "Cart",
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="cart-outline" size={size} color={color} />,
          tabBarActiveTintColor:'#5c5be3'
        }} 
      />
      <Tabs.Screen 
        name="reorder" 
        options={{ 
          title: "Reorder",
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="refresh-outline" size={size} color={color} />,
          tabBarActiveTintColor:'#5c5be3'
        }} 
      />
    </Tabs>
  );
};

export default RootLayout;
