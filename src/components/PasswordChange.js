import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, Portal, Button, useTheme, Subheading } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import PasswordInput from './PasswordInput';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {showMessage} from 'react-native-flash-message';

const PasswordChange = () => {
  const [visible, setVisible] = useState(false);
  const theme = useTheme();
  const { t } = useTranslation();

  const changePasswordSchema = Yup.object().shape({
    currentPassword: Yup.string().required(t('errors.required')),
    newPassword: Yup.string()
      .min(8, t('passwordTooShort'))
      .required(t('passwordRequired')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], t('passwordsDoNotMatch'))
      .required(t('repasswordRequired')),
  });
  const handleChangePassword = () => {
    //if you want to add password change API request here
    console.log('Password changed successfully!');
    showMessage({
      message: t('passwordChangeSuccess'),
      type: 'success',
    });
      setVisible(false);
  };

  return (
    <>
      <View style={styles.detailRow}>
        <Subheading style={[styles.subheading, { color: theme.colors.primary }]}>********</Subheading>
        <Button
          mode="text"
          onPress={() => setVisible(true)}
          labelStyle={{ color: theme.colors.primary }}
        >
          {t('buttons.change')}
        </Button>
      </View>

      <Portal>
        <Modal visible={visible} onDismiss={() => setVisible(false)} contentContainerStyle={styles.modalContainer}>
          <Subheading style={[styles.modalTitle, { color: theme.colors.primary }]}>
            {t('passwordChange.changeTitle')}
          </Subheading>
          <Formik
            initialValues={{
              currentPassword: '',
              newPassword: '',
              confirmPassword: '',
            }}
            validationSchema={changePasswordSchema}
            onSubmit={handleChangePassword}
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
                  <PasswordInput
                    label={t('passwordChange.current')}
                    value={values.currentPassword}
                    onChangeText={handleChange('currentPassword')}
                    onBlur={handleBlur('currentPassword')}
                    error={errors.currentPassword}
                    touched={touched.currentPassword}
                  />
                  <PasswordInput
                    label={t('passwordChange.new')}
                    value={values.newPassword}
                    onChangeText={handleChange('newPassword')}
                    onBlur={handleBlur('newPassword')}
                    error={errors.newPassword}
                    touched={touched.newPassword}
                  />
                  <PasswordInput
                    label={t('passwordChange.confirm')}
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    error={errors.confirmPassword}
                    touched={touched.confirmPassword}
                  />
                  <Button mode="contained" onPress={handleSubmit} style={styles.changeButton}>
                    {t('buttons.save')}
                  </Button>
                </>
          )}
        </Formik>
        </Modal>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  subheading: {
    fontSize: 16,
  },
  modalContainer: {
    padding: 20,
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  changeButton: {
    marginTop: 10,
  },
});

export default PasswordChange;
