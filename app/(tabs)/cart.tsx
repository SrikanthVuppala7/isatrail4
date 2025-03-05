import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useCart } from '../context/cartcontext';

const cart = () => {
    const { cartItems, removeFromCart } = useCart();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Cart</Text>
            {cartItems.length === 0 ? (
                <Text>Your cart is empty</Text>
            ) : (
                <FlatList
                    data={cartItems}
                    renderItem={({ item }) => (
                        <View style={styles.cartItem}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <View style={styles.itemDetails}>
                                <Text>{item.name}</Text>
                                <Text>{item.price}</Text>
                            </View>
                            <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                                <Text style={styles.removeText}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={item => item.id}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 10,
    },
    itemDetails: {
        flex: 1,
    },
    removeText: {
        color: 'red',
    },
});

export default cart;