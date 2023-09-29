import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../reducers/cartSlice';
import { ActivityIndicator } from 'react-native';
import axios from 'axios'


const Cart = () =>{
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

    const productName = cart.items.map((item) => item.productname).join(', ');
    const size = cart.items.map((item) => item.size).join(', ');
    const totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const quantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);

    axios
      .post('https://bala-canvas.onrender.com/checkout', {
        productName,
        totalPrice,
        quantity,
        size,
        username,
        phonenumber,
        address,
      })
      .then((response) => {
        setIsLoading(false);

        if (response.status === 200) {
          alert('Your order has been received successfully!');
          dispatch(clearCart());
        } else {
          console.log(response);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>
      {cart.items.map((item) => (
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
          />
          <TextInput
            style={styles.input}
            placeholder="Quantity"
            keyboardType="numeric"
            value={item.quantity.toString()}
            onChangeText={(text) => handleQuantity(item.productId, text)}
          />
        </View>
      ))}
      <View style={styles.totalPriceContainer}>
        <Text style={styles.totalPriceText}>
          Sub Total: UGX {cart.total}
        </Text>
        <Text>Shipping: UGX 10,000</Text>
        <Text style={styles.totalPriceText}>
          Total: UGX {cart.total + 10000}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phonenumber"
          value={phonenumber}
          onChangeText={(text) => setPhonenumber(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        {isLoading ? (
          <ActivityIndicator size="large" color="blue" style={styles.loader} />
        ) : (
          <Button title="Order Now" onPress={handleCheckout} />
        )}
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
  totalPriceText: {
    fontSize: 18,
    fontWeight: 'bold',
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
