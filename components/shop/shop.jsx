import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity,  ScrollView, StyleSheet, Image } from 'react-native';
import { useDispatch} from 'react-redux';
import Nav from '../navbar/Navbar'
import axios from 'axios';
import { addToCart } from '../reducers/cartSlice';

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
      width: 350,
      height: 350,
    },
    addToCartButton: {
      backgroundColor: '#0b8a6d', 
      borderRadius: 40, 
      padding: 20,
    },
    addToCartButtonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    productName: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 20,
      textAlign: 'center'
    },
    productPrice: {
      fontSize: 20,
      textAlign: 'center'
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
      <Nav/>
    <View style={styles.container}>
      <Text style={styles.title}>Your Home Of Premium Shoes</Text>
      {data.map((product) => (
        <View key={product._id} style={styles.product}>
          <Image
            source={{ uri: `https://bala-canvas.onrender.com/${product.productimage}` }}
            style={styles.productImage}
          />
          <Text style={styles.productName}>{product.productname}</Text>
          <Text style={styles.productPrice}>UGX{product.price}</Text>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCart}
            >
            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
            </TouchableOpacity>
        </View>
      ))}
    </View>
    </ScrollView>
  );
};


export default Shop;
