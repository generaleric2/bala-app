import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Settings = () => {
    const navigation = useNavigation();

 return (
    <View>
   <TouchableOpacity style={styles.addToCartButton} onPress={() => navigation.navigate('Login')}>
    <Text style={styles.text}>LOGIN</Text>
</TouchableOpacity>
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
    });

export default Settings;