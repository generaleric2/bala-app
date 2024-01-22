// MenCategory.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import BottomBar from '../bottombar';

const MenCategory = () => {
    const [data, setData] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("https://bala-canvas.onrender.com/category/men");
            setData(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

      const handleProductPress = (productId) => {
        navigation.navigate('ProductDetails', { productId: productId });
      };
  

  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.product} onPress={() => handleProductPress(item._id)}>
      <Image source={{ uri: `https://bala-canvas.onrender.com/${item.productimage}` }} style={styles.productImage} />
      <Text style={styles.productName}>{item.productname}</Text>
      <Text style={styles.productPrice}>UGX: {item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <> 
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderProductItem}
        keyExtractor={(item) => item._id}
        numColumns={2} // Display 2 items per row
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
    <BottomBar/>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productItem: {
    padding: 20,
    margin: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 8,
  },
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
});

export default MenCategory;
