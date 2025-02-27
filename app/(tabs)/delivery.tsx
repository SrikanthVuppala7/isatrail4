import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';

const delivery = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setData] = useState([
        { id: '1', name: 'Pasta', price: '$12.99', image: 'path_to_image' },
        { id: '2', name: 'Pizza', price: '$10.99', image: 'path_to_image' },
    ]);

    const filteredData = data.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search for food, chefs, or offers..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <View style={styles.offersSection}>
                <Text style={styles.offersTitle}>Special Offers</Text>
                <Text>Get 20% off on your first order!</Text>
            </View>
            <FlatList
                data={filteredData}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.gridItem}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <Text>{item.name}</Text>
                        <Text>{item.price}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
                numColumns={2}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    searchBar: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    offersSection: {
        backgroundColor: '#f8f8f8',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    offersTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    gridItem: {
        flex: 1,
        margin: 5,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 5,
    },
});

export default delivery;