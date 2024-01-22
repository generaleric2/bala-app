// BottomBar.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

const BottomBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('Shop')}>
        <AntDesign name="home" size={24} color="#008080" />
        <Text style={styles.iconText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('Categories')}>
        <MaterialCommunityIcons name="view-grid" size={24} color="#008080"  />
        <Text style={styles.iconText}>Categories</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconContainer}
       onPress={() => navigation.navigate('Orders')}>
      <Ionicons name="receipt-outline" size={24} color="#008080" />
        <Text style={styles.iconText}>Orders</Text>
      </TouchableOpacity>

      <TouchableOpacity  style={styles.iconContainer} onPress={() => navigation.navigate('Account')}>
        <Ionicons name="person" size={28} color="#008080" />
        <Text style={styles.iconText}>Account</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 2,
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
    bottom: 0,
  },
  badge: {
    backgroundColor: 'red',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -6,
    right: 3,
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconText: {
    marginTop: 5,
  },
});

export default BottomBar;
