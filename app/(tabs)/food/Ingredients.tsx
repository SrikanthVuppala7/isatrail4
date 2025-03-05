// app/(tabs)/delivery/Ingredients.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

interface Item {
  id: string;
  name: string;
  price: string;
  image: string;
  ingredients: string[];
  quantity?: number;
}

interface Chef {
  id: string;
  name: string;
  price: string;
  image: string;
  rating: number;
  dishes: string[];
}

const Ingredients: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const item = JSON.parse(params.item as string) as Item;
  const chefs = JSON.parse(params.chefs as string) as Chef[];
  const bookedChef = params.bookedChef ? JSON.parse(params.bookedChef as string) as Chef : null;

  const handleSelectChef = () => {
    router.push({
      pathname: '/(tabs)/food/ChefSelection',
      params: {
        dish: JSON.stringify(item),
        chefs: JSON.stringify(chefs),
        bookedChef: JSON.stringify(bookedChef),
      },
    });
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.name}</Text>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.ingredientsContainer}>
        <Text style={styles.ingredientsTitle}>Ingredients:</Text>
        {item.ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.ingredientText}>- {ingredient}</Text>
        ))}
      </View>
      <TouchableOpacity style={styles.selectChefButton} onPress={handleSelectChef}>
        <Text style={styles.buttonText}>Select Chef</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
  },
  ingredientsContainer: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    marginBottom: 20,
  },
  ingredientsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ingredientText: {
    fontSize: 16,
    color: '#333',
  },
  selectChefButton: {
    backgroundColor: '#5c5be3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '80%',
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: '#e35b5b',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Ingredients;