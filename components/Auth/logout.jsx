import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Logout = ({ onLogout }) => {
  const handleLogout = async () => {
    await AsyncStorage.removeItem('uid');
    try {
      await axios.post(process.env.EXPO_PUBLIC_LOGOUT_API_URL, null);
      } catch (err) {}
      onLogout();
      };
  return (
    <View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 50,
    marginLeft: 130,
    marginRight: 150,
  },
  text: {
    color: '#008080',
    fontWeight:"bold",
    fontSize: 20,
  },
});

export default Logout;
