import { MD3LightTheme as DefaultTheme, MD3DarkTheme as DarkTheme } from 'react-native-paper';

// Light tema tanımlanıyor
export const lightTheme = {
  ...DefaultTheme, // React Native Paper'ın varsayılan light temasını temel alıyoruz.
  colors: {
    ...DefaultTheme.colors, // Varsayılan renkleri koruyoruz.
    primary: '#6200ee', // Birincil renk (örneğin buton renkleri).
    background: '#ffffff', // Arka plan rengi beyaz.
    text: '#000000', // Metin rengi siyah.
  },
};

// Dark tema tanımlanıyor
export const darkTheme = {
  ...DarkTheme, // React Native Paper'ın varsayılan dark temasını temel alıyoruz.
  colors: {
    ...DarkTheme.colors, // Varsayılan renkleri koruyoruz.
    primary: '#bb86fc', // Birincil renk (örneğin buton renkleri).
    background: '#121212', // Arka plan rengi siyah.
    text: '#ffffff', // Metin rengi beyaz.
  },
  dark: true,
  roundness: 2,
};
