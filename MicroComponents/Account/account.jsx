import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Account = () => {
   const navigation = useNavigation();
 return (
    <View style={styles.container}>
      <Text style={styles.title}>My Account</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Orders')}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Ionicons name="albums-outline" size={22} color="black" />
        <Text style={styles.buttonText}>Orders</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => console.log('Vouchers')}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Ionicons name="receipt-outline" size={22} color="black" />
        <Text style={styles.buttonText}>Vouchers</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => console.log('Inbox')}>
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
});

export default Account;