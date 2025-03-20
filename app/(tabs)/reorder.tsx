// app/(tabs)/reorder.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useCart } from '../context/cartcontext'; // Adjust path
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

interface Order {
  id: string;
  items: CartItem[];
  chef: Chef; // Full Chef type
  total: number;
  date: string;
}

const Reorder: React.FC = () => {
  const { orders, addToCart, setBookedChef } = useCart();
  const router = useRouter();

  const handleReorder = (order: Order) => {
    order.items.forEach((item) => addToCart(item));
    setBookedChef(order.chef); // Now matches Chef type
    router.push('/(tabs)/food/payments');
  };

  const renderOrder = ({ item }: { item: Order }) => (
    <View style={styles.orderContainer}>
      <Text style={styles.orderDate}>{item.date}</Text>
      <Text style={styles.orderChef}>Chef: {item.chef.name}</Text>
      <Text style={styles.orderItems}>
        Items: {item.items.map((i) => i.name).join(', ')}
      </Text>
      <Text style={styles.orderTotal}>Total: ${item.total.toFixed(2)}</Text>
      <TouchableOpacity
        style={styles.reorderButton}
        onPress={() => handleReorder(item)}
      >
        <Text style={styles.buttonText}>Reorder</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Past Orders</Text>
      {orders.length === 0 ? (
        <Text style={styles.emptyText}>No past orders yet.</Text>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrder}
          keyExtractor={(item) => item.id}
          style={styles.orderList}
        />
      )}
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
  orderContainer: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  orderDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E2E2E',
    marginBottom: 5,
  },
  orderChef: {
    fontSize: 16,
    color: '#555555',
  },
  orderItems: {
    fontSize: 16,
    color: '#555555',
    marginVertical: 5,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B705C',
    marginBottom: 10,
  },
  reorderButton: {
    backgroundColor: '#6B705C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
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
  orderList: {
    flex: 1,
  },
});

export default Reorder;