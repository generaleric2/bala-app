import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import AuthContext from './authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuth } = useContext(AuthContext);

  const handleLogin = async () => {
    setIsLoading(true);

    try {
      // Basic validation (optional)
      // if (!validateEmail(email)) {
      //   Alert.alert('Invalid Email', 'Please enter a valid email address.');
      //   return;
      // }

      const response = await axios.post(process.env.EXPO_PUBLIC_LOGIN_API_URL, {
        email,
        password,
      });

      const idToken = response.data.idToken;
      const uid = response.data.uid;

      if (!uid) {
        console.error('Missing UID.');
        Alert.alert('Login Failed', 'An unexpected error occurred. Please try again later.');
        return;
      }

      // Use setAuth to update the authentication state
      setAuth(idToken, uid);
      await AsyncStorage.setItem('@idToken', idToken);
      await AsyncStorage.setItem('uid', uid);

      console.log('Login Successful:', { idToken, uid });

      Alert.alert('Login Successful', 'Welcome back!');
      navigation.navigate('Shop');
    } catch (error) {
      console.error('Login failed:', error.message);

      const errorMessage = error.response?.data?.error || 'An unexpected error occurred.';
      Alert.alert('Login Failed', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // const validateEmail = (email) => {
  //   // Implement basic email validation logic here (optional)
  //   return true; // Replace with your validation logic
  // };

  return (
    <View className="container">
      <Image source={require('../../assets/logo.png')} style={styles.logoImage} />
      <Text style={styles.login}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
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
