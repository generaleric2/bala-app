import React from 'react';
import { Provider } from 'react-redux';
import { store } from './components/store/store'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Shop from './components/shop/shop'; 
import Cart from './components/cart/cart'; 
import ProductDetails from './components/Details/productDetails';


const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Shop" component={Shop} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
          <Stack.Screen name="Cart" component={Cart} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;