import { Stack } from 'expo-router';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react-native';
import config from '../src/amplifyconfiguration.json';
import { CartProvider } from './context/cartcontext'; // Adjust the path as needed
import 'react-native-gesture-handler';

// Configure Amplify with the generated config (Cognito User Pools)
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

// Wrap RootLayout with withAuthenticator to enforce sign-in/sign-up
// export default withAuthenticator(RootLayout, {
//   signUpAttributes: ['email'], // Match your Cognito setup
// });
export default (RootLayout);