import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

const SearchResults = ({ route }) => {
  const { searchText } = route.params;
  const allProducts = useSelector((state) => state.products) || [];

  const filteredProducts = allProducts.filter((product) =>
    product.productname.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.product} onPress={() => handleProductPress(item._id)}>
      <Image source={{ uri: `https://bala-canvas.onrender.com/${item.productimage}` }} style={styles.productImage} />
      <Text style={styles.productName}>{item.productname}</Text>
      <Text style={styles.productPrice}>UGX: {item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Results for "{searchText}"</Text>
      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  product: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'white',
    overflow: 'hidden',
    marginBottom: 16,
    padding: 16,
  },
});

export default SearchResults;
