// app/(tabs)/delivery/ChefSelection.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useCart } from '../../context/cartcontext';

interface Item {
  id: string;
  name: string;
  price: string;
  image: string;
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

const ChefSelection: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { setBookedChef, bookedChef } = useCart(); // Updated to use bookedChef
  const dish = JSON.parse(params.dish as string) as Item;
  const chefs = JSON.parse(params.chefs as string) as Chef[];

  const availableChefs = chefs.filter(chef => chef.dishes.includes(dish.id));

  console.log('ChefSelection - Booked Chef on render:', bookedChef);

  const handleBookChef = (chef: Chef) => {
    console.log('ChefSelection - Booking chef:', chef.name);
    setBookedChef(chef); // Set full chef object
    router.back();
  };

  const renderChefItem = ({ item }: { item: Chef }) => (
    <View style={styles.chefContainer}>
      <Image source={{ uri: item.image }} style={styles.chefImage} />
      <View style={styles.chefInfo}>
        <Text style={styles.chefName}>{item.name}</Text>
        <Text style={styles.chefPrice}>{item.price}</Text>
        <Text style={styles.chefRating}>Rating: {item.rating}</Text>
        <TouchableOpacity
          style={[
            styles.bookButton,
            bookedChef?.id === item.id && styles.bookedButton,
            (bookedChef !== null && bookedChef?.id !== item.id) && styles.disabledButton
          ]}
          onPress={() => handleBookChef(item)}
          disabled={bookedChef !== null && bookedChef?.id !== item.id}
        >
          <Text style={styles.buttonText}>
            {bookedChef?.id === item.id ? 'Booked' : 'Book'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Chef for {dish.name}</Text>
      <FlatList
        data={availableChefs}
        renderItem={renderChefItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No chefs available for this dish</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chefContainer: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    alignItems: 'center',
  },
  chefImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  chefInfo: {
    flex: 1,
  },
  chefName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  chefPrice: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  chefRating: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  bookButton: {
    backgroundColor: '#5c5be3',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  bookedButton: {
    backgroundColor: '#888',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default ChefSelection;