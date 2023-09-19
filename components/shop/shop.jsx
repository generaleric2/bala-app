import React, { useEffect, useState } from 'react';
import { View, Text, Button,  ScrollView, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../reducers/cartSlice';
import axios from 'axios';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    product: {
      marginBottom: 20,
    },
    productImage: {
      width: 200,
      height: 200,
    },
    productName: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    productPrice: {
      fontSize: 16,
    },
  });

const Shop = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://bala-canvas.onrender.com/shop');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddToCart = (product) => {
    const itemToAdd = {
      productId: product._id,
      quantity: 1,
      price: product.price,
      productimage: product.productimage,
      productname: product.productname,
    };

    dispatch(addToCart(itemToAdd));
  };

  return (
    <ScrollView scrollEnabled={true}>
    <View style={styles.container}>
      <Text style={styles.title}>Your Home Of Premium Sneakers</Text>
      {data.map((product) => (
        <View key={product._id} style={styles.product}>
          <Image
            source={{ uri: `https://bala-canvas.onrender.com/${product.productimage}` }}
            style={styles.productImage}
          />
          <Text style={styles.productName}>{product.productname}</Text>
          <Text style={styles.productPrice}>UGX{product.price}</Text>
          <Button
            title="Add to Cart"
            onPress={() => handleAddToCart(product)}
          />
        </View>
      ))}
    </View>
    </ScrollView>
  );
};


export default Shop;
