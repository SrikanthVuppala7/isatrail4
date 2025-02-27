import { Stack } from 'expo-router';
import { Amplify } from 'aws-amplify';
import {
    withAuthenticator,
    useAuthenticator
  } from '@aws-amplify/ui-react-native';
import config from '../src/amplifyconfiguration.json';
Amplify.configure(config);

export default (function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
    </Stack>
  );
});
