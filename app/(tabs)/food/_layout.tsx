// app/delivery/_layout.tsx
import { Stack } from 'expo-router';

const DeliveryLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="delivery" options={{ headerShown: false }} /> {/* Delivery screen */}
      <Stack.Screen name="ChefSelection" options={{ headerShown: true, title: 'Select Chef' }} /> {/* ChefSelection screen */}
      <Stack.Screen name="Ingredients" options={{ headerShown: false }} /> {/* ChefSelection screen */}
      <Stack.Screen name="payments" options={{ headerShown: false }} /> {/* ChefSelection screen */}
    </Stack>
  );
};

export default DeliveryLayout;