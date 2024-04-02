import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../reducers/cartSlice';
import { ActivityIndicator } from 'react-native';
import { Snackbar } from 'react-native-paper';
import AuthContext from '../Auth/authSlice';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const Cart = () => {
 const cart = useSelector((state) => state.cart);
 const [snackbarVisible, setSnackbarVisible] = useState(false);
 const dispatch = useDispatch();
 const [isLoading, setIsLoading] = useState(false);
 const { authState } = useContext(AuthContext);


  const handleQuantity = (productId, newQuantity) => {
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleCheckout = async (cart) => {
    setIsLoading(true);
    const productName = cart.items ? cart.items.map((item) => item.productname).join(', ') : '';
    const totalPrice = cart.items
      ? cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
      : 0;
    const quantity = cart.items ? cart.items.reduce((acc, item) => acc + item.quantity, 0) : 0;
    const uid = authState.uid;
    const idToken = authState.idToken;
   
    try {
      if (!uid || !idToken) {
        console.error('UID or idToken not found.');
        return;
      }
      const response = await axios.post(process.env.EXPO_PUBLIC_CART_API_URL, {
        productName,
        totalPrice,
        quantity,
        uid,
      });
   
      setIsLoading(false);
   
      if (response.status === 200 || response.status === 201) {
        setSnackbarVisible(true);
        dispatch(clearCart());
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error('API Error:', error.response ? error.response.data : error.message);
      setIsLoading(false);
    }
   };
   
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>
      {cart.items && cart.items.length > 0 ? (
        cart.items.map((item) => (
          <View key={item.productId} style={styles.cartItem}>
            <Image
              source={{ uri: `https://bala-canvas.onrender.com/${item.productimage}` }}
              style={styles.image}
            />
            <Text>{item.productname}</Text>
            <Text>Price: UGX {item.price}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <Text>Size: {item.size}</Text>
            <Button
              title="Remove from Cart"
              onPress={() => handleRemoveItem(item.productId)}
              color="#008080"
            />
            <TextInput
              style={styles.input}
              placeholder="Quantity"
              keyboardType="numeric"
              value={item.quantity.toString()}
              onChangeText={(text) => handleQuantity(item.productId, text)}
            />
          </View>
        ))
      ) : (
        <Text>No items in the cart</Text>
      )}
{/* <TouchableOpacity
  style={styles.addToCartButton}
  onPress={() => navigation.navigate('Momo', { totalAmount: cart.total + 10000, cartItems: cart.items })} 
>
<Text style={styles.CartButtonText}>PAYMENT METHOD:</Text>
  <Text style={styles.addToCartButtonText}>PAY WITH MTN</Text>
  <Text style={styles.ButtonText}>Continue</Text>
</TouchableOpacity> */}
      <View style={styles.totalPriceContainer}>
        <Text style={styles.talPriceText}>Sub Total: UGX {cart.total}</Text>
        <Text style={styles.otalPriceText}>Shipping: UGX 10,000</Text>
        <Text style={styles.totalPriceText}>Total: UGX {cart.total + 10000}</Text>
        {isLoading ? (
          <ActivityIndicator size="large" color="blue" style={styles.loader} />
        ) : (
          <Button title="Order Now" onPress={() => handleCheckout(cart)} color="#008080"/>
        )}
      </View>
      <View style={styles.totalPriceContainer}>
      <View>
      <Ionicons style={styles.icon} name="mail-open-outline"  size={30}></Ionicons>
      <View style={styles.doorContainer}>
      <Text style={styles.door}>Email Us</Text>
      <Text style={styles.expla}>support@bala-canvas.com</Text>
      </View>
      </View>
      <View style={styles.call}>
      <Ionicons style={styles.icon} name="call-outline"  size={30}></Ionicons>
      <View style={styles.doorContainer}>
      <Text style={styles.door}>Phone</Text>
      <Text style={styles.expla}>+256 7625 52004</Text>
      </View>
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
        Order Received Successfully!
      </Snackbar>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  doorContainer:{
    marginLeft: 60,
    marginTop: -30,
  },
  door:{
    fontWeight: 'bold',
  },
  call:{
    marginTop: 30,
  },
  loader: {
    marginTop: 20,
  },
  cartItem: {
    marginBottom: 16,
  },
  totalPriceContainer: {
    marginTop: 20,
    padding: 16,
    borderColor: 'gray',
    borderWidth: 1,
  },
  addToCartButton: {
    backgroundColor: 'beige',
    paddingVertical: 20,
    paddingHorizontal: 100,
    marginTop: 10,
  },
  CartButtonText:{
    textAlign:'left',
    marginLeft: -80,
    marginTop: -10,
    fontWeight: 'bold',
  },
  addToCartButtonText: {
    marginLeft: -80,
  },
  ButtonText:{
    textAlign: 'right',
    marginRight: -80,
    marginTop: -30,
  },
  totalPriceText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  otalPriceText:{
    color:'gray',
    fontWeight:'bold',
  },
  talPriceText:{
    color:'gray',
    fontWeight:'bold',
    fontSize: 18,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

  export default Cart;
