// AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
 const [authState, setAuthState] = useState({
    idToken: '',
    uid: '',
 });

 // Load the auth state from storage when the component mounts
 useEffect(() => {
    const loadAuthState = async () => {
      const savedState = await AsyncStorage.getItem('authState');
      if (savedState) {
        setAuthState(JSON.parse(savedState));
      }
    };
    loadAuthState();
 }, []);

 // Save the auth state to storage whenever it changes
 useEffect(() => {
    const saveAuthState = async () => {
      await AsyncStorage.setItem('authState', JSON.stringify(authState));
    };
    saveAuthState();
 }, [authState]);

 const setAuth = (idToken, uid) => {
    setAuthState({ idToken, uid });
 };

 return (
    <AuthContext.Provider value={{ authState, setAuth }}>
      {children}
    </AuthContext.Provider>
 );
};

export default AuthContext;
