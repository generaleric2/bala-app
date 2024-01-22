import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Logout from '../../components/Auth/logout';

const Account = () => {
   const navigation = useNavigation();
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [userId, setUserId] = useState(null);
   const [customerDetails, setCustomerDetails] = useState(null);
  
   useEffect(() => {
     checkLoginStatus();
   }, []);
  
   const checkLoginStatus = async () => {
     const uid = await AsyncStorage.getItem('uid');
     setIsLoggedIn(!!uid);
     setUserId(uid);
   };
  
   useEffect(() => {
     if (isLoggedIn && userId) {
       axios.get(`https://bala-canvas.onrender.com/customers/${userId}`)
         .then(response => setCustomerDetails(response.data))
         .catch(error => console.error('Failed to fetch customer:', error));
     }
   }, [isLoggedIn, userId]);
  
 return (
    <View style={styles.container}>
          <Image 
          style={styles.image}
          source={require('../../assets/ggh.jpeg')}
        />
             {isLoggedIn && userId ? (
       <View style={styles.container2}>
         <Text style={styles.info}>{customerDetails?.username}</Text>
         <Text style={styles.info}>{customerDetails?.email}</Text>
       </View>
     ) : (
       <TouchableOpacity
         style={styles.addToCartButton}
         onPress={() => navigation.navigate('Login')}
       >
         <Text style={styles.text}>LOGIN</Text>
       </TouchableOpacity>
     )}

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Orders')}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Ionicons name="albums-outline" size={22} color="black" />
        <Text style={styles.buttonText}>Orders</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Vouchers')}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Ionicons name="receipt-outline" size={22} color="black" />
        <Text style={styles.buttonText}>Vouchers</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Inbox')}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Ionicons name="mail-outline" size={22} color="black" />
        <Text style={styles.buttonText}>Inbox</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings')}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Ionicons name="finger-print-outline" size={22} color="black" />
        <Text style={styles.buttonText}>Account Settings</Text>
        </View>
      </TouchableOpacity>
    </View>
 );
};

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
 },
 title: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 20,
 },
 button: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
 },
 buttonText: {
    color: 'black',
    marginLeft: 10,
 },
 image:{
  width: 90,
  height: 90, 
  marginBottom: 15,
  borderRadius: 10,
  marginTop: 10,
  marginLeft: 10,
 },
 info:{
  marginLeft: 115,
  fontWeight: 'bold',
  marginTop: -55,
 },
});

export default Account;