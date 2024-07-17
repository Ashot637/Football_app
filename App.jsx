import { useEffect } from "react";
import { StatusBar } from "react-native";
import Navigation from "./components/Navigation";

import { useFonts } from "expo-font";

import AsyncStorage from "@react-native-async-storage/async-storage";

import store from "./redux/store";
import { Provider } from "react-redux";

import { I18nextProvider } from "react-i18next";
import i18n from "./languages/i18n";
import {Settings} from "react-native-fbsdk-next";

export default function App() {
  const [fontsLoaded] = useFonts({
    "main-reg": require("./assets/fonts/SourceSans3-Regular.ttf"),
    "main-med": require("./assets/fonts/SourceSans3-Medium.ttf"),
    "main-semi": require("./assets/fonts/SourceSans3-SemiBold.ttf"),
    "main-bold": require("./assets/fonts/SourceSans3-Bold.ttf"),
  });

  useEffect(() => {
    const setLanguage = async () => {
      try {
        const language = await AsyncStorage.getItem("language");
        if (language) {
          i18n.changeLanguage(language);
        }
      } catch (error) {
        console.error("Error getting language from AsyncStorage:", error);
      }
    };

    setLanguage();
  }, []);

  useEffect(() => {
    Settings.initializeSDK();
  }, []);


  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <Navigation></Navigation>
      </I18nextProvider>
    </Provider>
  );
}
