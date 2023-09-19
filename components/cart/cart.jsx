import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from '../reducers/cartSlice';



const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [address, setAddress] = useState('');

  const handleQuantity = (productId, newQuantity) => {
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleCheckout = () => {
    // Implement your checkout logic here
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>
      {cart.items.map((item) => (
        <View key={item.productId} style={styles.cartItem}>
          {/* Display cart item details here */}
        </View>
      ))}
      <View style={styles.totalPriceContainer}>
        <Text style={styles.totalPriceText}>
          Sub Total: UGX{cart.total}
        </Text>
        {/* Add other price details here */}
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phonenumber}
          onChangeText={(text) => setPhonenumber(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <Button
          title="Order Now"
          onPress={handleCheckout}
        />
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
    container: {
      padding: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    cartItem: {
      // Styling for each item in the cart
    },
    totalPriceContainer: {
      marginTop: 20,
      padding: 16,
      borderColor: 'gray',
      borderWidth: 1,
    },
    totalPriceText: {
      fontSize: 18,
      fontWeight: 'bold',
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
