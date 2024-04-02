// SearchResults.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import { ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
      },
      productContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
      },
      product: {
        flex: 0.48,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: 'white',
        overflow: 'hidden',
      },
      productImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
      },
      productName: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 8,
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 40,
      },
      productPrice: {
        fontSize: 14,
        padding: 8,
      },
      activityIndicator: {
        margin: 16,
      },
});

const SearchResults = ({ route }) => {
 const { searchQuery } = route.params;
 const [product, setProduct] = useState(null);
 const [loading, setLoading] = useState(false);
 const navigation = useNavigation();

 useEffect(() => {
    const fetchProduct = async () => {
        try {
           setLoading(true);
           const response = await axios.get(`${process.env.EXPO_PUBLIC_SHOP_API_URL}/search?searchTerm=${searchQuery}`);
           if (Array.isArray(response.data)) {
             setProduct(response.data);
           } else {
             console.error('Unexpected response format:', response.data);
             setProduct([]);
           }
           setLoading(false);
        } catch (error) {
           console.error('Error fetching product:', error);
           setProduct([]);
        }
       };
    if (searchQuery) {
      fetchProduct();
    }
 }, [searchQuery]);

 if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
 }

 const handleProductPress = (productId) => {
    navigation.navigate('ProductDetails', { productId: productId });
  };


  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.product} onPress={() => handleProductPress(item._id)}>
       <Image 
         source={{ uri: `https://bala-canvas.onrender.com/${item.productimage}` }}
         style={styles.productImage}
       />
       <Text style={styles.productName}>{item.productname}</Text>
       <Text style={styles.productPrice}>UGX: {item.price}</Text>
    </TouchableOpacity>
   );
   return (
    <>
       <View style={styles.container}>
         {product && product.length > 0 ? (
           <FlatList
             data={product}
             renderItem={renderProductItem}
             keyExtractor={(item) => item._id.toString()}
             numColumns={2}
             contentContainerStyle={{ paddingBottom: 16 }}
             initialNumToRender={6}
             maxToRenderPerBatch={2}
             windowSize={5}
           />
         ) : (
           <Text>No product found</Text>
         )}
       </View>
    </>
   );
};

export default SearchResults;
