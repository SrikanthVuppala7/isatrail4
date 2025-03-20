// app/delivery/_layout.tsx
import { Stack } from 'expo-router';
import { Amplify } from 'aws-amplify';
import config from '../../../src/amplifyconfiguration.json';
import { withAuthenticator } from '@aws-amplify/ui-react-native';
Amplify.configure(config);
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

export default (DeliveryLayout);