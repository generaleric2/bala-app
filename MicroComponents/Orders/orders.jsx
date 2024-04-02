import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Orders = () => {
 const navigation = useNavigation();
 const [isLoggedIn, setIsLoggedIn] = useState(false);
 const [orders, setOrders] = useState([]);

 useEffect(() => {
  const fetchOrders = async () => {
    try {
      const uid = await AsyncStorage.getItem('uid');
      const response = await axios.get(`https://bala-canvas.onrender.com/customers/${uid}/orders`);
      setIsLoggedIn(true);
      setOrders(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setIsLoggedIn(false);
      }
    }
  };
 
  fetchOrders();
 }, []);

 return (
   <ScrollView >
     {isLoggedIn ? (
       orders.map((order, index) => (
         <View key={index} style={styles.container}>
           <Text style={styles.pdtname}>{order.productName}</Text>
           <Text style={styles.pdtprice}>{order.totalPrice}</Text>
           <Text style={styles.pdtquantity}>{new Date(order.date).toLocaleString()}</Text>
         </View>
       ))
     ) : (
       <TouchableOpacity style={styles.addToCartButton} onPress={() => navigation.navigate('Login')}>
         <Text style={styles.text}>LOGIN</Text>
       </TouchableOpacity>
     )}
   </ScrollView>
 );
};

const styles = StyleSheet.create({
 addToCartButton: {
   backgroundColor: '#008080',
   borderRadius: 10,
   paddingVertical: 15,
   paddingHorizontal: 150,
   marginTop: 300,
   marginLeft: 30,
   marginRight: 30,
 },
 text: {
   color: 'white',
 },
 container: {
  flex: 1,
  padding: 10,
  margin: 10,
  borderRadius: 5,
  padding: 20,
  margin: 10,
  borderWidth: 1,
  borderColor: 'lightgray',
  borderRadius: 8,
},

pdtname:{
  fontSize:16,
  alignSelf:'flex-start',
  marginLeft: 5,
  fontWeight:"bold",
  color: '#008080',
},
pdtprice:{
  fontWeight:"bold",
  fontSize:16,
  alignSelf:'flex-end',
  marginRight:20,
  },
  pdtquantity:{
    fontSize:12,
    marginLeft:70,
    marginBottom:10,
    marginLeft: 10,
    }
});

export default Orders;
