import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Nav from "../navbar/Navbar";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../reducers/cartSlice';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  productImage: {
    width: 200,
    height: 200,
    marginLeft: -200,
    marginBottom: 16,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft: 190,
    marginTop: -150,
  },
  productPrice: {
    fontSize: 18,
    marginLeft: 190,
    marginBottom: 8,
    color: '#000000',
  },
  addToCartButton: {
    backgroundColor: '#008080',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 100,
    marginBottom: 200,
    marginTop: 40,
    marginLeft: -60,
  },
  addToCartButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const ProductDetails = ({ route }) => {
  const { productId } = route.params;
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://bala-canvas.onrender.com/shop/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      const itemToAdd = {
        productId: product._id,
        quantity: 1,
        price: product.price,
        productimage: product.productimage,
        productname: product.productname,
      };
      dispatch(addToCart(itemToAdd));
      Alert.alert('Product added to cart!');
    }
  };

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <Nav />
      <View style={styles.container}>
        {product ? (
          <>
            <Image source={{ uri: `https://bala-canvas.onrender.com/${product.productimage}` }} style={styles.productImage} />
            <Text style={styles.productName}>{product.productname}</Text>
            <Text style={styles.productPrice}>UGX: {product.price}</Text>
            <Text style={styles.productPrice}>Sizes: {product.size}</Text>
            <TouchableOpacity style={styles.addToCartButton} onPress={() => handleAddToCart(product)}>
              <Text style={styles.addToCartButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </>
  );
};

export default ProductDetails;
