// Categories.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Categories = () => {
  const navigation = useNavigation();


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MenCategory')}>
        <View style={styles.categoryItem}>
          <Text style={styles.name}>Men</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('WomenCategory')}>
        <View style={styles.categoryItem}>
          <Text style={styles.name}>Women</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ChildrenCategory')}>
        <View style={styles.categoryItem}>
          <Text style={styles.name}>Children</Text>
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
  categoryItem: {
    padding: 20,
    margin: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 8,
  },
  button: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
 },
 name:{
  color:"#008080",
  fontWeight: 'bold',
  fontSize: 18
 }
});

export default Categories;
