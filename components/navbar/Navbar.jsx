import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import SearchBar from "../../MicroComponents/searchbar" 

const Nav = () => {
  const navigation = useNavigation();
  const cart = useSelector((state) => state.cart);
  const totalQuantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearchSubmit = (searchQuery) => {
    navigation.navigate('SearchResults', { searchQuery });
   };

  return (
    <View style={styles.navbar}>
      <SearchBar onSearch={handleSearchSubmit} />
      <View style={styles.links}>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <View style={styles.iconContainer}>
            {totalQuantity > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{totalQuantity}</Text>
              </View>
            )}
            <Ionicons style={styles.cart} name="ios-cart" size={28} color="#008080" />
          </View>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    position: 'sticky',
    top: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 5,
    zIndex: 1,
    marginBottom: 20,
  },
  links: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cart:{
    marginRight: 20,
  },
  iconContainer: {
    position: 'relative',
  },
  logoImage: {
    width: 90, 
    height: 40,
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
});

export default Nav;
