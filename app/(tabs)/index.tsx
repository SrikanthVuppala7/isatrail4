import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

export default function home() {
  const descriptions = [
    "Hire top chefs for your restaurant or home",
    "Find skilled culinary experts with ease",
    "Book professional chefs for any occasion",
    "Connect with talented chefs in your area",
    "Upgrade your kitchen with expert hands"
  ];

  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentText = descriptions[currentIndex] || '';

    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      timeout = setTimeout(() => {
        if (charIndex > 0) {
          setDisplayText(currentText.slice(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % descriptions.length);
        }
      }, 50);
    } else {
      timeout = setTimeout(() => {
        if (charIndex < currentText.length) {
          setDisplayText(currentText.slice(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
        } else {
          timeout = setTimeout(() => setIsDeleting(true), 1500);
        }
      }, 100);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentIndex]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={require('@/assets/images/image.png')} style={styles.image} />
        <Text style={styles.title}>SimplChefs</Text>
        <Text style={styles.description}>{displayText}<Text style={styles.cursor}>|</Text></Text>
      </View>

 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingBottom: 40, 
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  cursor: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6360DF',
  },
  buttonContainer: {
    width: '50%',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#6360DF',
    paddingVertical: 12,
    borderRadius: 25, 
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'none', 
  },
});