import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Nav from "../navbar/Navbar";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  productContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  product: {
    flex: 0.48,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'white',
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  productPrice: {
    fontSize: 14,
    padding: 8,
  },
});

const Shop = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.EXPO_PUBLIC_SHOP_API_URL);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleProductPress = (productId) => {
    navigation.navigate('ProductDetails', { productId: productId });
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.product} onPress={() => handleProductPress(item._id)}>
      <Image source={{ uri: `https://bala-canvas.onrender.com/${item.productimage}` }} style={styles.productImage} />
      <Text style={styles.productName}>{item.productname}</Text>
      <Text style={styles.productPrice}>UGX: {item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <>
    <Nav />
    <View style={styles.container}>
    <Text style={styles.title}>Your Home Of Premium Shoes</Text>
      <FlatList
        data={data}
        renderItem={renderProductItem}
        keyExtractor={(item) => item._id}
        numColumns={2} // Display 2 items per row
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
    </>
  );
};

export default Shop;
