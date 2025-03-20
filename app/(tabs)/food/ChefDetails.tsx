// app/(tabs)/delivery/ChefDetails.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useCart } from '../../context/cartcontext';

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

const ChefDetails: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { setBookedChef, bookedChef } = useCart();
  const chef = JSON.parse(params.chef as string) as Chef;
  const allDishes = JSON.parse(params.allDishes as string) as Item[];
  const bookedChefParam = params.bookedChef ? JSON.parse(params.bookedChef as string) as Chef : null;

  const handleBookChef = () => {
    setBookedChef(chef);
    Alert.alert('Success', `${chef.name} has been booked!`);
    router.back();
  };

  const handleBack = () => {
    router.back();
  };

  // Explicitly handle null to return boolean | undefined
  const isBookButtonDisabled = bookedChef !== null && bookedChef.id !== chef.id;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{chef.name}</Text>
      <Image source={{ uri: chef.image }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>Hourly Rate: {chef.price}</Text>
        <Text style={styles.detailText}>Rating: {chef.rating}</Text>
        <Text style={styles.detailText}>Specialties:</Text>
        {chef.dishes.map((dishId, index) => {
          const dishName = allDishes.find(item => item.id === dishId)?.name || 'Unknown';
          return <Text key={index} style={styles.dishText}>- {dishName}</Text>;
        })}
      </View>

      <TouchableOpacity
        style={[
          styles.bookButton,
          bookedChef?.id === chef.id && styles.bookedButton,
          isBookButtonDisabled && styles.disabledButton,
        ]}
        onPress={handleBookChef}
        disabled={isBookButtonDisabled}
      >
        <Text style={styles.buttonText}>
          {bookedChef?.id === chef.id ? 'Booked' : 'Book Chef'}
        </Text>
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
    borderRadius: 75,
    marginBottom: 20,
  },
  detailsContainer: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    marginBottom: 20,
  },
  detailText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  dishText: {
    fontSize: 16,
    color: '#333',
  },
  bookButton: {
    backgroundColor: '#5c5be3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '80%',
    marginBottom: 10,
  },
  bookedButton: {
    backgroundColor: '#888',
  },
  disabledButton: {
    backgroundColor: '#ccc',
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

export default ChefDetails;