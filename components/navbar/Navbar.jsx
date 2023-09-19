// import React from 'react';
// import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
// import { useSelector } from 'react-redux';
// import { UserPlus, ShoppingCart } from 'phosphor-react';

// // Import any styles or images you need
// // import logoImage from './assets/logo.jpg';

// const Nav = () => {
//   const cart = useSelector((state) => state.cart);
//   const totalQuantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);

//   return (
//     <View style={styles.navbar}>
//       <View style={styles.logo}>
//         {/* Use the Image component for images */}
//         <TouchableOpacity onPress={() => navigation.navigate('Home')}>
//           {/* <Image source={logoImage} style={styles.logoImage} /> */}
//         </TouchableOpacity>
//       </View>
//       <View style={styles.links}>
//         <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
//           <UserPlus size={32} />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
//           <ShoppingCart size={32} />
//           {totalQuantity > 0 && (
//             <View style={styles.badge}>
//               <Text style={styles.badgeText}>{totalQuantity}</Text>
//             </View>
//           )}
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   navbar: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: 'white', // Add your desired background color
//     padding: 10,
//   },
//   logo: {
//     flex: 1,
//   },
//   logoImage: {
//     width: 100,
//     height: 40, // Adjust the dimensions as needed
//   },
//   links: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   badge: {
//     backgroundColor: 'red', // Customize the badge styling
//     borderRadius: 12,
//     width: 24,
//     height: 24,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginLeft: 5,
//   },
//   badgeText: {
//     color: 'white', // Customize the badge text color
//     fontWeight: 'bold',
//     fontSize: 14,
//   },
// });

// export default Nav;
