// app/(tabs)/delivery/Payments.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useCart } from '../../context/cartcontext';
import { useRouter } from 'expo-router';

interface CartItem {
  id: string;
  name: string;
  price: string;
  image: string;
}

interface Chef {
  id: string;
  name: string;
  price: string;
  image: string;
  rating: number;
  dishes: string[];
}

const payments: React.FC = () => {
  const { cartItems, bookedChef } = useCart();
  const router = useRouter();

  const calculateTotal = () => {
    if (!bookedChef) return 0;

    const itemsTotal = cartItems.reduce((sum, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return sum + price;
    }, 0);

    const chefRate = parseFloat(bookedChef.price.replace('$', '').replace('/hr', ''));
    return itemsTotal + chefRate;
  };

  const total = calculateTotal();

  const handlePayment = () => {
    Alert.alert(
      'Confirm Payment',
      `Total: $${total.toFixed(2)}\nProceed with payment?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Pay',
          onPress: () => {
            Alert.alert('Success', 'Payment processed successfully!');
            router.push('/(tabs)/food/delivery');
          },
        },
      ]
    );
  };

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>{item.price}</Text>
    </View>
  );

  if (!bookedChef || cartItems.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>
          {bookedChef ? 'Your cart is empty.' : 'No chef booked.'}
        </Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push('/(tabs)/food/delivery')}
        >
          <Text style={styles.buttonText}>Back to Delivery</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Summary</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Booked Chef</Text>
        <Text style={styles.detailText}>Name: {bookedChef.name}</Text>
        <Text style={styles.detailText}>Rate: {bookedChef.price}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cart Items</Text>
        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id}
          style={styles.cartList}
        />
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.buttonText}>Pay Now</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push('/(tabs)/food/delivery')}
      >
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  itemName: {
    fontSize: 16,
    color: '#333',
  },
  itemPrice: {
    fontSize: 16,
    color: '#666',
  },
  cartList: {
    maxHeight: 200,
  },
  totalContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5c5be3',
  },
  payButton: {
    backgroundColor: '#5c5be3',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  backButton: {
    backgroundColor: '#e35b5b',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
    color: '#666',
  },
});

export default payments;