import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import BottomBar from "../../MicroComponents/bottombar";
import Skeleton from "./skeleton"

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

const Shop = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(process.env.EXPO_PUBLIC_SHOP_API_URL);
        setData(response.data);
        setLoading(false);
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
      <Image 
        source={{ uri: `https://bala-canvas.onrender.com/${item.productimage}` }}
        style={styles.productImage}
      />
      <Text style={styles.productName}>{item.productname}</Text>
      <Text style={styles.productPrice}>UGX: {item.price}</Text>
    </TouchableOpacity>
  );

  const renderFooter = () =>
  loading && <Skeleton />;;



  return (
    <>
      <View style={styles.container}>
      <FlatList
          data={data}
          renderItem={renderProductItem}
          keyExtractor={(item) => item._id}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: 16 }}
          initialNumToRender={6}
          maxToRenderPerBatch={2}
          windowSize={5}
          ListFooterComponent={renderFooter}
        />
      </View>
      <BottomBar />
    </>
  );
};

export default Shop;
