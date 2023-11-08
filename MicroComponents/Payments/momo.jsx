import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';

const momoHost = "sandbox.momodeveloper.mtn.com"
const momoTokenUrl = `https://${momoHost}/collection/token/`
const momoRequestToPayUrl = `https://${momoHost}/collection/v1_0/requesttopay`

const Momo = ({ route }) => {
  const { totalAmount: initialTotalAmount, cartItems } = route.params;
  const [total, setTotal] = useState(initialTotalAmount);
  const [totalAmount, setTotalAmount] = useState(initialTotalAmount);  
  const [phone, setPhone] = useState('');
  const [momoResponse, setMomoResponse] = useState(null);
  const [momoToken, setMomoToken] = useState(null);

  const getMomoToken = async () => {
    const token = await axios({
      method: 'post',
      url: momoTokenUrl,
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': '5b158c87ce9b495fb64dcac1852d745b',
      },
    });
    console.log(token)
    setMomoToken(token.data.access_token);
  }

  useEffect(() => {
    getMomoToken();
  }, []);

  useEffect(() => {
    let totalAmount = 0;
    cartItems.forEach(item => {
      totalAmount += item.price;
    });
    totalAmount += totalAmount * 0.1;
    setTotal(totalAmount); // Update the total using setTotal function
  }, [cartItems]);

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
      externalId: 'c8f060db-5126-47a7-a67b-2fee08c0f30d',
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
          'Ocp-Apim-Subscription-Key': '5b158c87ce9b495fb64dcac1852d745b',
          'X-Reference-Id': '123456789',
          'X-Target-Environment': 'sandbox',
          'X-Callback-Url': 'http://localhost:3000/callback',
          'X-Callback-Host': 'http://localhost:3000',
          Authorization: `Bearer ${momoToken}`,
        },
        data: body,
      });
      setMomoResponse(momoResponse.data);
    } catch (error) {
      console.error('Error processing momo payment:', error);
    }
  };


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




