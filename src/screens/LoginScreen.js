import React, {useContext} from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput, Text, useTheme } from 'react-native-paper'; // useTheme eklendi
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { showMessage } from 'react-native-flash-message';
import {AuthContext} from '../services/auth';
import PasswordInput from '../components/PasswordInput';
import {APP_CONSTANTS} from '../constants/APP_CONSTANTS';

const LoginScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const {login} = useContext(AuthContext);
  const {API} = useContext(AuthContext);

  const loginSchema = Yup.object().shape({
    email: Yup.string().email(t('invalidEmail')).required(t('emailRequired')),
    password: Yup.string().min(8, t('passwordTooShort')).required(t('passwordRequired')),
  });
  //If you want to log in without making an API request, remove the comment of this method.
  // const handleLogin = async () => {
  //   login('fakeToken');
  //   showMessage({
  //           message: t('loginSuccess'),
  //           type: 'success',
  //           backgroundColor: colors.primary,
  //         });
  //     navigation.replace('Home');
  //
  // };
  const handleLogin = async (values) => {
    try {
      const response = await API.post('/auth/login', {
        email: values.email,
        password: values.password,
      });

      const token  = response.data;
      await AsyncStorage.setItem(APP_CONSTANTS.TOKEN, token);
      login(token);
      showMessage({
        message: t('loginSuccess'),
        type: 'success',
        backgroundColor: colors.primary,
      });

      navigation.replace('Home');
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      showMessage({
        message: error.response?.data?.message || t('loginFailed'),
        type: 'danger',
        backgroundColor: colors.error,
      });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>{t('login')}</Text>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              label={t('email')}
              mode="outlined"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              style={styles.input}
              error={touched.email && errors.email}
              theme={{ colors: { primary: colors.primary } }}
              autoCapitalize="none"
              keyboardType="default"
            />
            <Text style={[styles.error, { color: colors.error }]}>
              {touched.email && errors.email}
            </Text>
            <PasswordInput
              label={t('password')}
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              error={errors.password}
              touched={touched.password}
            />
            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.button}
              color={colors.primary}
            >
              {t('loginButton')}
            </Button>
            <Button onPress={() => navigation.navigate('Register')} textColor={colors.primary}>
              <Text>{t('registerButton')}</Text>
            </Button>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  error: {
    marginBottom: 5,
  },
});

export default LoginScreen;
