// app/(tabs)/food/delivery/Payments.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useCart } from '../../context/cartcontext'; // Adjust path
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

const Payments: React.FC = () => {
  const { cartItems, bookedChef, clearCart, addOrder } = useCart();
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
    if (!bookedChef || cartItems.length === 0) return;

    Alert.alert(
      'Confirm Payment',
      `Total: $${total.toFixed(2)}\nProceed with payment?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Pay',
          onPress: () => {
            const order = {
              id: Date.now().toString(),
              items: [...cartItems],
              chef: { ...bookedChef }, // Save full Chef object
              total,
              date: new Date().toLocaleString(),
            };
            addOrder(order);
            clearCart();
            Alert.alert('Success', 'Payment processed successfully!', [
              {
                text: 'OK',
                onPress: () => router.push('/(tabs)/food/delivery'),
              },
            ]);
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
    backgroundColor: '#F8EDEB',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2E2E2E',
    marginBottom: 25,
    textAlign: 'center',
  },
  section: {
    marginBottom: 25,
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2E2E2E',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#555555',
    lineHeight: 22,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  itemName: {
    fontSize: 16,
    color: '#2E2E2E',
    fontWeight: '500',
  },
  itemPrice: {
    fontSize: 16,
    color: '#6B705C',
  },
  cartList: {
    maxHeight: 220,
  },
  totalContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#6B705C',
  },
  payButton: {
    backgroundColor: '#6B705C',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  backButton: {
    backgroundColor: '#FF6F61',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
    color: '#555555',
  },
});

export default Payments;