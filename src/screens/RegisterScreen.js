import React, {useContext, useState} from 'react';
import {Text, StyleSheet, ScrollView, View, KeyboardAvoidingView, Platform} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Button, TextInput, useTheme } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { showMessage } from 'react-native-flash-message';
import BackButton from '../components/BackButton';
import PasswordInput from '../components/PasswordInput';
import {AuthContext} from '../services/auth';

const RegisterScreen = ({ navigation }) => {
  const { t ,i18n} = useTranslation();
  const { colors } = useTheme();
  const {API} = useContext(AuthContext);

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const locale = i18n.language;


  const registerSchema = Yup.object().shape({
    username: Yup.string().required(t('usernameRequired')),
    name: Yup.string().required(t('nameRequired')),
    surname: Yup.string().required(t('surnameRequired')),
    email: Yup.string().email(t('invalidEmail')).required(t('emailRequired')),
    birthdate: Yup.string().required(t('birthdateRequired')),
    gender: Yup.string().required(t('genderRequired')),
    password: Yup.string()
      .min(8, t('passwordTooShort'))
      .required(t('passwordRequired')),
    repassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('passwordsDoNotMatch'))
      .required(t('repasswordRequired')),
  });

  const handleRegister = async (values) => {
    try {
      await API.post('/auth/register', values);
      showMessage({
        message: t('registerSuccess'),
        type: 'success',
      });
      navigation.navigate('Login');
    } catch (error) {
      showMessage({
        message: error.response?.data?.message || t('registerFailed'),
        type: 'danger',
      });
    }
  };



  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.headerContainer}>
        <View style={styles.backButtonWrapper}>
          <BackButton goTo={'Login'} textHidden={true} mode={'text'} />
        </View>
        <Text style={[styles.title, { color: colors.primary }]}>{t('register')}</Text>
      </View>

      <Formik
        initialValues={{
          username: '',
          name: '',
          surname: '',
          email: '',
          birthdate: '',
          password: '',
          repassword: '',
          gender:'',
        }}
        validationSchema={registerSchema}
        onSubmit={handleRegister}
      >
        {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
          <>
            <TextInput
              label={t('username')}
              mode="outlined"
              value={values.username}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              error={touched.username && !!errors.username}
              style={styles.input}
              autoCapitalize="none"
              keyboardType="default"
            />
            {touched.username && errors.username && (
              <Text style={[styles.error, { color: colors.error }]}>{errors.username}</Text>
            )}

            <TextInput
              label={t('name')}
              mode="outlined"
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              error={touched.name && !!errors.name}
              style={styles.input}
            />
            {touched.name && errors.name && (
              <Text style={[styles.error, { color: colors.error }]}>{errors.name}</Text>
            )}

            <TextInput
              label={t('surname')}
              mode="outlined"
              value={values.surname}
              onChangeText={handleChange('surname')}
              onBlur={handleBlur('surname')}
              error={touched.surname && !!errors.surname}
              style={styles.input}
            />
            {touched.surname && errors.surname && (
              <Text style={[styles.error, { color: colors.error }]}>{errors.surname}</Text>
            )}

            <TextInput
              label={t('email')}
              mode="outlined"
              keyboardType="email-address"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              error={touched.email && !!errors.email}
              style={styles.input}
              autoCapitalize="none"
            />
            {touched.email && errors.email && (
              <Text style={[styles.error, { color: colors.error }]}>{errors.email}</Text>
            )}
            <TextInput
              label={t('birthdate')}
              mode="outlined"
              value={values.birthdate || ''}
              onFocus={() => setOpen(true)}
              style={styles.input}
            />
            <DatePicker
              modal
              open={open}
              date={date}
              locale={locale}
              mode="date"
              onConfirm={(value) => {
                setOpen(false);
                setDate(date);
                handleChange('birthdate')(dayjs(value).format('YYYY-MM-DD'));
              }}
              onCancel={() => setOpen(false)}
            />
            {touched.birthdate && errors.birthdate && (
              <Text style={[styles.error, { color: colors.error }]}>{errors.birthdate}</Text>
            )}


            <Text style={styles.label}>{t('gender')}</Text>
            <View style={styles.selectBox}>
              <Text
                onPress={() => handleChange('gender')('male')}
                style={[
                  styles.option,
                  { backgroundColor: values.gender === 'male' ? colors.primary : colors.surface },
                ]}
              >
                {t('male')}
              </Text>
              <Text
                onPress={() => handleChange('gender')('female')}
                style={[
                  styles.option,
                  { backgroundColor: values.gender === 'female' ? colors.primary : colors.surface },
                ]}
              >
                {t('female')}
              </Text>
            </View>
            {touched.gender && errors.gender && (
              <Text style={[styles.error, { color: colors.error }]}>{errors.gender}</Text>
            )}
            <PasswordInput
              label={t('password')}
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              error={errors.password}
              touched={touched.password}
            />
            <PasswordInput
              label={t('repassword')}
              value={values.repassword}
              onChangeText={handleChange('repassword')}
              onBlur={handleBlur('repassword')}
              error={errors.repassword}
              touched={touched.repassword}
            />
            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.button}
              labelStyle={{ color: colors.onPrimary }}
            >
              {t('registerButton')}
            </Button>
          </>
        )}
      </Formik>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: { flex: 1,padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold'},
  input: { marginBottom: 10 },
  button: { marginTop: 10 },
  error: { marginBottom: 5 },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  backButtonWrapper: {
    position: 'absolute',
    left: 0,
  },
  label: { fontSize: 16, marginBottom: 5 , color: 'gray' },
  selectBox: { flexDirection: 'row', marginBottom: 10 },
  option: {
    flex: 1,
    textAlign: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default RegisterScreen;
