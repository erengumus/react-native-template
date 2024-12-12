import axios from 'axios';
import {APP_CONSTANTS} from '../constants/APP_CONSTANTS';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import {showMessage} from 'react-native-flash-message';

const createAPI = (logoutCallback) => {
  const API = axios.create({
    baseURL: APP_CONSTANTS.BASE_URL,
  });

  API.interceptors.request.use(
    async (config) => {
      const token = await AsyncStorage.getItem(APP_CONSTANTS.TOKEN);

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      config.headers['Accept-Language'] = i18n.language || 'en';
      config.headers.Accept = 'application/json';

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  API.interceptors.response.use(
    (response) => response,
    async (error) => {
      const {response} = error;

      if (response) {
        const {status} = response;

        switch (status) {
          case 401:
            // Session expired: clear token and call logout
            await AsyncStorage.removeItem(APP_CONSTANTS.TOKEN);
            showMessage({
              message: i18n.t('errors.sessionExpired.title'),
              description: i18n.t('errors.sessionExpired.description'),
              type: 'warning',
            });
            if (logoutCallback) {
              logoutCallback();
            }
            break;

          case 403:
            showMessage({
              message: i18n.t('errors.accessDenied.title'),
              description: i18n.t('errors.accessDenied.description'),
              type: 'danger',
            });
            break;

          case 500:
            showMessage({
              message: i18n.t('errors.serverError.title'),
              description: i18n.t('errors.serverError.description'),
              type: 'danger',
            });
            break;

          default:
            showMessage({
              message: i18n.t('errors.genericError.title'),
              description: i18n.t('errors.genericError.description', {
                statusText: response.statusText,
              }),
              type: 'danger',
            });
            break;
        }
      } else {
        showMessage({
          message: i18n.t('errors.networkError.title'),
          description: i18n.t('errors.networkError.description'),
          type: 'danger',
        });
      }

      return Promise.reject(error);
    }
  );

  return API;
};

export default createAPI;

