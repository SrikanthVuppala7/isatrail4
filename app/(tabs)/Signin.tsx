import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { Amplify } from 'aws-amplify';
import { signIn } from 'aws-amplify/auth'; // Correct import
import config from '../../src/amplifyconfiguration.json';

Amplify.configure(config);

const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password.');
      return;
    }

    try {
      setLoading(true);
      console.log('Sending sign-in request for:', username);
      
      const user = await signIn({ username, password }); // Corrected method call
      
      console.log('Sign-in successful:', user);
      Alert.alert('Success', 'You are now signed in!');
    } catch (error: any) {
      console.error('Sign-in error:', error);
      Alert.alert('Sign-in failed', error.message || 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable onPress={handleSignIn} style={styles.button} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Signing in...' : 'Sign In'}</Text>
      </Pressable>
    </View>
  );
};

export default Signin;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { width: '90%', padding: 10, borderWidth: 1, borderRadius: 5, marginBottom: 10 },
  button: { backgroundColor: 'black', padding: 12, borderRadius: 5, marginTop: 10 },
  buttonText: { color: 'white', fontSize: 18 },
});
