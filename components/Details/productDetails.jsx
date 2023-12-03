import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Snackbar } from 'react-native-paper';
import Nav from "../navbar/Navbar";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../reducers/cartSlice';
import { ActivityIndicator } from 'react-native'


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
    marginLeft: 165,
    marginTop: -150,
  },
  productPrice: {
    fontSize: 16,
    marginLeft: 190,
    marginBottom: 8,
    color: '#000000',
  },
  description: {
    marginTop: 70,
  },
  size: {
    marginHorizontal: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
 },
 selectedSize: {
    backgroundColor: '#008080',
    borderColor: '#008080',
    paddingHorizontal: 20,
    paddingVertical: 10,
 },
 sizesContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 20,
  marginRight: 150,
  marginLeft: 150,
},
  addToCartButton: {
    backgroundColor: '#008080',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 100,
    marginBottom: 200,
    marginTop: 40,
    marginLeft: -40,
  },
  addToCartButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const ProductDetails = ({ route }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const { productId } = route.params;
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
const [isLoading, setIsLoading] = useState(true);


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
    if (product && selectedSize) {
      const itemToAdd = {
        productId: product._id,
        quantity: 1,
        price: product.price,
        productimage: product.productimage,
        productname: product.productname,
        size: selectedSize,
      };
      dispatch(addToCart(itemToAdd));
      setSnackbarVisible(true);
    }
   };

  if (!product) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
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
            <Text style={styles.description}>{product.description}</Text>
            <View style={styles.sizesContainer}>
              {product?.sizes.map((size, index) => (
                <TouchableOpacity
                 key={index}
                 onPress={() => setSelectedSize(size)}
                 style={
                    selectedSize === size
                      ? styles.selectedSize
                      : styles.size
                 }
                >
                 <Text>{size}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.addToCartButton} onPress={() => handleAddToCart(product)}>
              <Text style={styles.addToCartButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </>
        ) : (
          <ActivityIndicator size="large" color="#0000ff" />
        )}
      </View>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: 'OK',
          onPress: () => {
            setSnackbarVisible(false);
          },
        }}
      >
        Product added to cart!
      </Snackbar>
    </>
 );
};

export default ProductDetails;
