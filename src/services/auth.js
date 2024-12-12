import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {APP_CONSTANTS} from '../constants/APP_CONSTANTS';
import createAPI from './api';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem(APP_CONSTANTS.TOKEN);
      setIsLoggedIn(!!token);
    };

    checkLoginStatus().then(r => console.log('checkLoginStatus', r));
  }, []);

  const login = async (token) => {
    await AsyncStorage.setItem(APP_CONSTANTS.TOKEN, token);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem(APP_CONSTANTS.TOKEN);
    setIsLoggedIn(false);
  };
  const API = createAPI(logout);
  return (
    <AuthContext.Provider value={{isLoggedIn,setIsLoggedIn, login, logout,API}}>
      {children}
    </AuthContext.Provider>
  );
};
