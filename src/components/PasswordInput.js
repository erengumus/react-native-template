import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

const PasswordInput = ({ label, value, onChangeText, onBlur, error, touched, ...props }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <TextInput
        label={label}
        mode="outlined"
        secureTextEntry={!visible}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        error={touched && error}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="default"
        textContentType="none"
        autoComplete="off"
        right={
          <TextInput.Icon
            icon={visible ? 'eye-off' : 'eye'}
            onPress={() => setVisible(!visible)}
          />
        }
        {...props}
      />
      {touched && error && (
        <Text style={[styles.error, { color: '#f44336' }]}>{error}</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  input: { marginBottom: 10 },
  error: { marginBottom: 5 },
});

export default PasswordInput;
