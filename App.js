import React, {useState, useEffect} from 'react';
import {useColorScheme} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import AppNavigator from './src/navigation/AppNavigator';
import './src/locales/i18n';
import FlashMessage from 'react-native-flash-message';
import {lightTheme, darkTheme} from './src/themes/theme';
import {AuthProvider} from './src/services/auth';

export default function App() {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState(systemTheme);

  useEffect(() => {
    setTheme(systemTheme);
  }, [systemTheme]);

  return (
    <PaperProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <>
        <AuthProvider>
          <AppNavigator />
          <FlashMessage
            position="top"
            style={{
              backgroundColor:
                theme === 'dark'
                  ? darkTheme.colors.primary
                  : lightTheme.colors.primary,
            }}
            textStyle={{
              color:
                theme === 'dark'
                  ? darkTheme.colors.onPrimary
                  : lightTheme.colors.onPrimary,
            }}
          />
        </AuthProvider>
      </>
    </PaperProvider>
  );
}
