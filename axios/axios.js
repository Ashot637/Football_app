import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

// export const BASE_URL = 'http://192.168.100.29:8080/';
// export const BASE_URL = 'http://192.168.11.55:8080/';
export const BASE_URL = 'https://0rd1vskf-8080.euw.devtunnels.ms/';

const instance = axios.create({
  baseURL: BASE_URL + 'api/v2',
});

instance.interceptors.request.use((config) => {
  const getToken = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
    const language = (await AsyncStorage.getItem('language')) || 'en';
    config.params = {
      ...config.params,
      language,
    };
    return config;
  };
  return getToken();
});

export default instance;