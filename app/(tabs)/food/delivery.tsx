// app/(tabs)/delivery/index.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useCart } from '../../context/cartcontext';
import { useRouter } from 'expo-router';

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

const Delivery: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { addToCart, bookedChef, setBookedChef, cartItems } = useCart();
  const [confirmItemId, setConfirmItemId] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const router = useRouter();

  console.log('Delivery - Booked Chef on render:', bookedChef);

  const dishesData: Item[] = [
    { id: '1', name: 'Pasta', price: '$12.99', image: 'path_to_image', ingredients: ['Pasta', 'Tomato Sauce', 'Parmesan'] },
    { id: '2', name: 'Pizza', price: '$10.99', image: 'path_to_image', ingredients: ['Dough', 'Mozzarella', 'Pepperoni'] },
    { id: '3', name: 'Burger', price: '$8.99', image: 'path_to_image', ingredients: ['Bun', 'Beef Patty', 'Lettuce'] },
  ];

  const recommendedData: Item[] = [
    { id: '4', name: 'Sushi', price: '$15.99', image: 'path_to_image', ingredients: ['Rice', 'Salmon', 'Seaweed'] },
    { id: '5', name: 'Salad', price: '$9.99', image: 'path_to_image', ingredients: ['Lettuce', 'Tomato', 'Cucumber'] },
    { id: '6', name: 'Steak', price: '$18.99', image: 'path_to_image', ingredients: ['Beef', 'Salt', 'Pepper'] },
  ];

  const chefsData: Chef[] = [
    { id: '7', name: 'Chef John', price: '$25/hr', image: 'path_to_image', rating: 4.5, dishes: ['1', '4'] },
    { id: '8', name: 'Chef Maria', price: '$30/hr', image: 'path_to_image', rating: 4.8, dishes: ['2', '5'] },
    { id: '9', name: 'Chef Alex', price: '$28/hr', image: 'path_to_image', rating: 4.2, dishes: ['3', '6'] },
  ];

  const filteredDishes = dishesData.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDishPress = (item: Item) => {
    router.push({
      pathname: '/(tabs)/food/Ingredients',
      params: { item: JSON.stringify(item), chefs: JSON.stringify(chefsData), bookedChef: JSON.stringify(bookedChef) },
    });
  };

  const handleQuantityChange = (id: string, change: number) => {
    setQuantities(prev => {
      const currentQty = prev[id] || 1;
      const newQty = Math.max(1, currentQty + change);
      return { ...prev, [id]: newQty };
    });
  };

  const handleAddToCart = (item: Item) => {
    if (!bookedChef) {
      alert('Please book a chef first!');
      return;
    }
    if (!bookedChef.dishes.includes(item.id)) {
      alert(`This item is not provided by ${bookedChef.name}.`);
      return;
    }
    const quantity = quantities[item.id] || 1;
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
      });
    }
    setConfirmItemId(null);
  };

  const handleCancel = () => {
    setConfirmItemId(null);
  };

  const handleAddToCartPress = (id: string) => {
    if (!bookedChef) {
      alert('Please book a chef first!');
      return;
    }
    setConfirmItemId(confirmItemId === id ? null : id);
    if (!quantities[id]) {
      setQuantities(prev => ({ ...prev, [id]: 1 }));
    }
  };

  const handleResetBooking = () => {
    console.log('Delivery - Resetting booked chef');
    setBookedChef(null);
  };

  const renderFoodItem = ({ item }: { item: Item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => handleDishPress(item)}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.itemName}>{item.name}</Text>
      </TouchableOpacity>
      {confirmItemId === item.id && (
        <View style={styles.confirmationContainer}>
          <Text style={styles.confirmText}>Add to Cart?</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(item.id, -1)}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantities[item.id] || 1}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(item.id, 1)}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.confirmButton, styles.yesButton]}
              onPress={() => handleAddToCart(item)}
            >
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.confirmButton, styles.noButton]}
              onPress={handleCancel}
            >
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {confirmItemId !== item.id && (
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => handleAddToCartPress(item.id)}
        >
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderChefItem = ({ item }: { item: Chef }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => {}}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
        <Text style={styles.ratingText}>Rating: {item.rating}</Text>
      </TouchableOpacity>
      {bookedChef?.id === item.id && (
        <Text style={styles.bookedText}>Currently Booked</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for food, chefs, or offers..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dishes</Text>
          <FlatList
            data={filteredDishes}
            renderItem={renderFoodItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended For You</Text>
          <FlatList
            data={recommendedData}
            renderItem={renderFoodItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chefs</Text>
          <FlatList
            data={chefsData}
            renderItem={renderChefItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {bookedChef && (
          <TouchableOpacity onPress={handleResetBooking} style={styles.resetButton}>
            <Text style={styles.resetButtonText}>Reset Chef Booking</Text>
          </TouchableOpacity>
        )}

        {bookedChef && cartItems.length > 0 && (
          <TouchableOpacity
            style={styles.proceedButton}
            onPress={() => router.push('/(tabs)/food/payments')}
          >
            <Text style={styles.proceedButtonText}>Proceed to Payment</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flex: 1,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  itemContainer: {
    width: 150,
    marginRight: 15,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  itemPrice: {
    fontSize: 12,
    color: '#666',
  },
  ratingText: {
    fontSize: 12,
    color: '#888',
  },
  bookedText: {
    fontSize: 12,
    color: '#5c5be3',
    marginTop: 5,
  },
  confirmationContainer: {
    marginTop: 5,
    alignItems: 'center',
  },
  confirmText: {
    fontSize: 14,
    marginBottom: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  quantityButton: {
    backgroundColor: '#ddd',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityText: {
    marginHorizontal: 12,
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
  },
  confirmButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    width: '45%',
    alignItems: 'center',
  },
  addToCartButton: {
    backgroundColor: '#5c5be3',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginTop: 5,
  },
  yesButton: {
    backgroundColor: '#5c5be3',
  },
  noButton: {
    backgroundColor: '#e35b5b',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  resetButton: {
    backgroundColor: '#e35b5b',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  proceedButton: {
    backgroundColor: '#5c5be3',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  proceedButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Delivery;