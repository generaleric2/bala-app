import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';

const momoTokenUrl = `https://sandbox.momodeveloper.mtn.com/collection/token/`
const momoRequestToPayUrl = `https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay`

const Momo = ({ route }) => {
  const { totalAmount: initialTotalAmount, cartItems } = route.params;
  const [total, setTotal] = useState(initialTotalAmount);
  const [totalAmount,] = useState(initialTotalAmount);  
  const [phone, setPhone] = useState('');
  const [ momoResponse, setMomoResponse] = useState(null);
  const [momoToken, setMomoToken] = useState(null);

  const getMomoToken = async () => {
    const token = await axios({
      method: 'post',
      url: momoTokenUrl,
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': '8de9863ee411404ba1a78795731156f8',
      },
    });
    console.log(token)
    setMomoToken(token.data.access_token);
  }

  useEffect(() => {
    getMomoToken();
  }, []);

  const requestToPay = async () => {
    if (!momoToken) {
      alert('Please wait for momo token');
      return;
    }

    if (!phone) {
      alert('Please enter a phone number');
      return;
    }
    const body = {
      amount: total,
      currency: 'EUR',
      externalId: '003455',
      payer: {
        partyIdType: 'MSISDN',
        partyId: phone, // 46733123454
      },
      payerMessage: 'Payment for order',
      payeeNote: 'Payment for order',
    };

    try {
      const momoResponse = await axios({
        method: 'post',
        url: momoRequestToPayUrl,
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': '8de9863ee411404ba1a78795731156f8',
          'X-Reference-Id': 'e236a349-6b3f-4786-9b44-04a5255768f2',
          'X-Target-Environment': 'sandbox',
          Authorization: `Bearer ${momoToken}`,
        },
        data: body,
      });
      setMomoResponse(momoResponse.data);
    } catch (error) {
      console.error('Error processing momo payment:', error);
    }
  };

  useEffect(() => {
    let totalAmount = 0;
    cartItems.forEach(item => {
      totalAmount += item.price;
    });
    totalAmount += totalAmount * 0.1;
    setTotal(totalAmount); // Update the total using setTotal function
  }, [cartItems]);



  return (
    <View style={styles.container}>
      <Text style={styles.totalPriceText}>Total: UGX {totalAmount}</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
      />
      <Button title="Pay with MoMo" onPress={requestToPay} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  totalPriceText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default Momo;




