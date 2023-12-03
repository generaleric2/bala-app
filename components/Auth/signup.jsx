import React, { useState } from 'react';
import { ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const Signup = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSignup = async () => {
    try {
      const response = await fetch('https://bala-canvas.onrender.com/customersignup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          address,
          phonenumber,
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Signup successful:', data);
        navigation.navigate('Login');
      } else {
        const errorData = await response.json();
        console.error('Signup failed:', errorData);
        Alert.alert('Signup Failed', errorData.message || 'Unknown error occurred');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      Alert.alert('Error while signing up', error.message || 'Unknown error occurred');
    }
  };
  return (
    <ScrollView className="container">
      <Image source={require('../../assets/logo.png')} style={styles.logoImage} />
      <Text style={styles.login}>Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        onChangeText={(text) => setAddress(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phonenumber"
        onChangeText={(text) => setPhoneNumber(text)}
      />
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
      <TouchableOpacity style={styles.addToCartButton} onPress={handleSignup}>
        <Text style={styles.text}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.signupLink}>Have an account? Login</Text>
      </TouchableOpacity>
    </ScrollView>
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
    marginTop: 60,
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
export default Signup;