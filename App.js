import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import {store} from './components/store/store';
import Nav from "./components/navbar/Navbar";
import Account from './MicroComponents/Account/account';
import Categories from './MicroComponents/Categories/categories';
import Settings from './MicroComponents/Account/settings';
import Vouchers from './MicroComponents/vouchers';
import Inbox from './MicroComponents/inbox';
import Orders from './MicroComponents/Orders/orders';
import Login from './components/Auth/login';
import Signup from './components/Auth/signup';
import Shop from './components/shop/shop'; 
import Cart from './components/cart/cart';
import MenCategory from "./MicroComponents/Categories/mens"
import WomenCategory from "./MicroComponents/Categories/women"
import ChildrenCategory from "./MicroComponents/Categories/children"
import { SearchProvider } from "./components/navbar/search"
import Momo from './MicroComponents/Payments/momo' 
import ProductDetails from './components/Details/productDetails';
import { AuthProvider } from './components/Auth/authSlice';
import SearchResults from './components/navbar/search.jsx';



const Stack = createStackNavigator();
const App = () => {



 return (
  <AuthProvider>
    <Provider store={store}>
    <SearchProvider>
      <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen options={{
            header: (props) => <Nav {...props} />,
          }} name="Shop" component={Shop} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Momo" component={Momo} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Account" component={Account} />
          <Stack.Screen name="Vouchers" component={Vouchers} />
          <Stack.Screen name="Inbox" component={Inbox} />
          <Stack.Screen name="Categories" component={Categories} />
          <Stack.Screen name="MenCategory" component={MenCategory} />
          <Stack.Screen name="WomenCategory" component={WomenCategory} />
          <Stack.Screen name="ChildrenCategory" component={ChildrenCategory} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Orders" component={Orders} />
          <Stack.Screen name="SearchResults" component={SearchResults} />
        </Stack.Navigator>
      </NavigationContainer>
      </SearchProvider>
    </Provider>
    </AuthProvider>
 );
}
const GestureHandlerRootViewGestureHandlerRootView = gestureHandlerRootHOC(App);
export default GestureHandlerRootViewGestureHandlerRootView;