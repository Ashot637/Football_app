import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { sessionStorage } from "../helpers/sessionStorage";

export const BASE_URL = "http://192.168.11.51:8080/";
// export const BASE_URL = "https://ballhola.app/service/";

// export const BASE_URL = "http://192.168.100.58:8080/";

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
