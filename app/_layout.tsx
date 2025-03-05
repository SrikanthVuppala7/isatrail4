import { Stack } from 'expo-router';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react-native';
import config from '../src/amplifyconfiguration.json';
import { CartProvider } from './context/cartcontext'; // Adjust the path to where CartContext.tsx is located

Amplify.configure(config);

function RootLayout() {
  return (
    <CartProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </CartProvider>
  );
}

export default (RootLayout);