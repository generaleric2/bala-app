import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../reducers/cartSlice';
import { ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native';


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
links: {
  flexDirection: 'row',
  alignItems: 'center',
  marginLeft: 40,
},
cart:{
  marginRight: 10,
},
iconContainer: {
  position: 'relative',
  marginTop: 40,
  marginLeft: 20,
},
badge: {
  backgroundColor: 'red',
  borderRadius: 12,
  width: 24,
  height: 24,
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: -6,
  right: -4,
},
badgeText: {
  color: 'white',
  fontWeight: 'bold',
  fontSize: 14,
},
icon:{
  marginLeft: 20,
  marginTop: 40,
},
doorContainer:{
  marginLeft: 60,
  marginTop: -30,
},
door:{
  fontWeight: 'bold',
},
  addToCartButton: {
    backgroundColor: '#008080',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 100,
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
  const navigation = useNavigation();
const [isLoading, setIsLoading] = useState(true);
const cart = useSelector((state) => state.cart);
const totalQuantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);


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
    < ScrollView>
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
            <View style={styles.links}>
            <TouchableOpacity style={styles.addToCartButton} onPress={() => handleAddToCart(product)}>
              <Text style={styles.addToCartButtonText}>Add to Cart</Text>
            </TouchableOpacity>        
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <View style={styles.iconContainer}>
            {totalQuantity > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{totalQuantity}</Text>
              </View>
            )}
            <Ionicons style={styles.cart} name="ios-cart" size={38} color="#008080" />
          </View>
        </TouchableOpacity>
      </View>
          </>
        ) : (
          <ActivityIndicator size="large" color="#0000ff" />
        )}
      </View>
      <View>
      <Ionicons style={styles.icon} name="bicycle-outline"  size={30}></Ionicons>
      <View style={styles.doorContainer}>
      <Text style={styles.door}>Door Delivery</Text>
      <Text style={styles.expla}>Door delivery costs shs.10,000 for areas around Kampala and it it included on checkout</Text>
      </View>
      </View>
      <View>
      <Ionicons style={styles.icon} name="arrow-undo-circle-outline"  size={30}></Ionicons>
      <View style={styles.doorContainer}>
      <Text style={styles.door}>Return Policy</Text>
      <Text style={styles.expla}>Incase of a return, contact customer support</Text>
      </View>
      </View>
      <View>
      <Ionicons style={styles.icon} name="card-outline"  size={30}></Ionicons>
      <View style={styles.doorContainer}>
      <Text style={styles.door}>Personal Pickup</Text>
      <Text style={styles.expla}>You can arrange a personal pickup for your product by contacting customer support at time of checkout</Text>
      </View>
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
    </ ScrollView>
 );
};

export default ProductDetails;
