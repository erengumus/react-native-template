import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

const BackButton = ({ goTo , mode, textHidden = false}) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { t } = useTranslation();

  const handlePress = () => {
    if (goTo) {
      navigation.navigate(goTo);
    } else {
      navigation.goBack();
    }
  };

  return (
    <Button
      icon="arrow-left"
      mode= {mode || 'contained'}
      onPress={handlePress}
      style={styles.button}
      labelStyle= {{ color: mode === 'text' ? colors.primary : colors.onPrimary }}
    >
      {!textHidden && t('back')}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    alignSelf: 'center',
  },
});

export default BackButton;
