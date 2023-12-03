import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../reducers/cartSlice';
import userReducer from '../reducers/userSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer, 
  },
});