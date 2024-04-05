import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { sessionStorage } from "../helpers/sessionStorage";

// export const BASE_URL = 'http://192.168.11.55:8080/';
// export const BASE_URL = 'http://192.168.11.55:8080/';
export const BASE_URL = "http://146.190.127.106/service/";

const instance = axios.create({
  baseURL: BASE_URL + "api/v2",
});

instance.interceptors.request.use((config) => {
  const getToken = async () => {
    const accessToken =
      (await AsyncStorage.getItem("accessToken")) || sessionStorage.token;
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
    const language = (await AsyncStorage.getItem("language")) || "en";
    config.params = {
      ...config.params,
      language,
    };
    return config;
  };
  return getToken();
});

export default instance;
