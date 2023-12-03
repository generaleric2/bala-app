import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';
import axios from "axios"

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState(''); 

    const saveData = async () => {
      try {
        await AsyncStorage.setItem('username', username);
        await AsyncStorage.setItem('password', password);
      } catch (error) {
        console.log('Error saving data:', error);
      }
   };
  
   const getData = async () => {
      try {
        const values = await AsyncStorage.multiGet(['username', 'password']);
        values.forEach((value, index, array) => {
          if (value[0] === 'username') {
            setUsername(value[1]);
          } else if (value[0] === 'password') {
            setPassword(value[1]);
          }
        });
      } catch (error) {
        console.log('Error fetching data:', error);
      }
   };
  
   useEffect(() => {
      getData();
  
      return () => {
        setIsLoading(false);
      };
   }, []);
  
   const handleLogin = async () => {
    setIsLoading(true);
  
    try {
      const response = await axios.post(
        'https://bala-canvas.onrender.com/customerlogin',
        {
          username: username,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 200) {
        const data = response.data;
        console.log('Login successful:');
        navigation.navigate('Shop');
      } else {
        if (response.status === 401) {
          Alert.alert('Invalid credentials');
        } else {
          console.error('Login failed:', response.status);
          Alert.alert('Login Failed');
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Error during Login');
    } finally {
      setIsLoading(false);
    }
  }; 
    return (
      <View className="container">
        <Image source={require('../../assets/logo.png')} style={styles.logoImage} />
        <Text style={styles.login}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
<TouchableOpacity style={styles.addToCartButton} onPress={handleLogin}>
 {isLoading ? (
    <ActivityIndicator size="small" color="#fff" />
 ) : (
    <Text style={styles.text}>Submit</Text>
 )}
</TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupLink}>Don't have an account? Sign up here</Text>
        </TouchableOpacity>
      </View>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    marginLeft: 30,
    marginRight: 30,
  },
  addToCartButton: {
    backgroundColor: '#008080',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 150,
    marginTop: 40,
    marginLeft: 30,
    marginRight: 30,
  },
  logoImage: {
    width: 100,
    height: 100,
    marginLeft: 150,
    marginTop: 100,
  },
  login: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 30,
    marginBottom: 16,
  },
  text: {
    color: 'white',
  },
  signupLink: {
    color: '#008080',
    textAlign: 'center',
    marginTop: 20,
  },
});
export default Login;