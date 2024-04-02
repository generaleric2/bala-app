import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../components/Auth/authSlice';
import Logout from '../../components/Auth/logout';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = () => {
 const navigation = useNavigation();
 const { authState, setAuth } = useContext(AuthContext);
 const [customerDetails, setCustomerDetails] = useState(null);

 useEffect(() => {
    if (authState.uid) {
      axios.get(`https://bala-canvas.onrender.com/customers/${authState.uid}`)
        .then(response => setCustomerDetails(response.data))
        .catch(error => console.error('Failed to fetch customer:', error));
    }
 }, [authState.uid]);

 const handleLogout = () => {
  setAuth({ uid: '', idToken: '' });
  AsyncStorage.removeItem('uid');
};

 return (
  <View>
  {authState.uid ? (
    <View style={styles.container}>
      <Text style={styles.header}>USERNAME</Text>
      <Text style={styles.info}>{customerDetails?.username}</Text>
      <Text style={styles.header}>EMAIL</Text>
      <Text style={styles.info}>{customerDetails?.email}</Text>
      <Text style={styles.header}>ADDRESS</Text>
      <Text style={styles.info}>{customerDetails?.address}</Text>
      <Text style={styles.header}>PHONENUMBER</Text>
      <Text style={styles.info}>{customerDetails?.phonenumber}</Text>
      <Logout onLogout={handleLogout} />
    </View>
  ) : (
    <TouchableOpacity
      style={styles.addToCartButton}
      onPress={() => navigation.navigate('Login')}
    >
      <Text style={styles.text}>LOGIN</Text>
    </TouchableOpacity>
  )}
</View>
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
 header:{
  fontWeight: 'bold',
  marginTop: 20,
  marginLeft: 10,
  fontSize: 15,
  color: '#008080',
 },
 info:{
  marginLeft: 25,
  fontWeight: 'bold',
 },
 container:{
  marginTop: 30,
 },
});

export default Settings;
