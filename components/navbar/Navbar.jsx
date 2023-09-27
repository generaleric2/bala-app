import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Nav = () => {
  const navigation = useNavigation();
  const cart = useSelector((state) => state.cart);
  const totalQuantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <View style={styles.navbar}>
            <Image
        source={require('../../assets/logo.png')}
        style={styles.logoImage}
      />
      <View style={styles.links}>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <View style={styles.iconContainer}>
            {totalQuantity > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{totalQuantity}</Text>
              </View>
            )}
            <Ionicons name="ios-cart" size={32} color="black" />
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
    padding: 10,
    zIndex: 1,
  },
  links: {
    flexDirection: 'row',
    alignItems: 'center',
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
    right: -12,
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default Nav;
