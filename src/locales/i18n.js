import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'react-native-localize';
import en from './en.json';
import tr from './tr.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {translation: en},
      tr: {translation: tr},
    },
    lng: Localization.getLocales()[0].languageTag.split('-')[0], // Get phone language with React Native Localize
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  }).then(r => console.log(r));

 export default i18n;
