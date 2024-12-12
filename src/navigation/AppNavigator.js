import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import '../locales/i18n';
import {useColorScheme} from 'react-native';
import {PaperProvider  } from 'react-native-paper';
import {darkTheme, lightTheme} from '../themes/theme';
import {AuthContext} from '../services/auth';
import HomeTab from '../screens/HomeTab';

const Stack = createStackNavigator();


export default function AppNavigator() {
  const {isLoggedIn} = useContext(AuthContext);
  const {i18n} = useTranslation();
  const systemTheme = useColorScheme();

  useEffect(() => {
    // const checkLanguage = async () => {
    //   const savedLanguage = await AsyncStorage.getItem('language');
    //   if (savedLanguage) {
    //     i18n.changeLanguage(savedLanguage);
    //   } else {
    //     i18n.changeLanguage('en');
    //   }
    // };

    // checkLanguage();
  }, [i18n]);
  const theme = systemTheme === 'dark' ? darkTheme : lightTheme;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {!isLoggedIn ? (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
            </>
          ) : (
            <Stack.Screen name="HomeTab" component={HomeTab} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
