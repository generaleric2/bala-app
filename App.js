import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import {store} from './components/store/store';
import Account from './MicroComponents/Account/account';
import Settings from './MicroComponents/Account/settings';
import Orders from './MicroComponents/Orders/orders';
import Login from './components/Auth/login';
import Signup from './components/Auth/signup';
import Shop from './components/shop/shop'; 
import Cart from './components/cart/cart';
import Momo from './MicroComponents/Payments/momo' 
import ProductDetails from './components/Details/productDetails';
const Stack = createStackNavigator();
const App = () => {
 return (
    <Provider store={store}>
      <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitle: '' }}>
          <Stack.Screen name="Shop" component={Shop} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Momo" component={Momo} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Account" component={Account} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Orders" component={Orders} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
 );
}
const GestureHandlerRootViewGestureHandlerRootView = gestureHandlerRootHOC(App);
export default GestureHandlerRootViewGestureHandlerRootView;