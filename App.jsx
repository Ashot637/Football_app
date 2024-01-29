import { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'react-native';
import Navigation from './components/Navigation';

import { useFonts } from 'expo-font';

import * as Notifications from 'expo-notifications';

import AsyncStorage from '@react-native-async-storage/async-storage';

import store from './redux/store';
import { Provider } from 'react-redux';

import { I18nextProvider } from 'react-i18next';
import i18n from './languages/i18n';

// import firebase from '@react-native-firebase/app';
// import { initializeApp } from 'firebase/app';
// import { getMessaging, getToken } from 'firebase/messaging';

// import messaging from '@react-native-firebase/messaging';

// const firebaseConfig = {
//   apiKey: 'AIzaSyCRCIe5BMtOkW8qQ1Fe9NShPW7evp9OWt4',
//   authDomain: 'ballhola.firebaseapp.com',
//   databaseURL: 'https://ballhola.firebaseio.com',
//   projectId: 'ballhola',
//   storageBucket: 'ballhola.appspot.com',
//   messagingSenderId: '1008482763016',
//   appId: '1:1008482763016:android:32a117275a81c8e65eecbd',
// };

// const app = initializeApp(firebaseConfig);

// const messaging = getMessaging(app);

export default function App() {
  const [fontsLoaded] = useFonts({
    'main-reg': require('./assets/fonts/SourceSans3-Regular.ttf'),
    'main-med': require('./assets/fonts/SourceSans3-Medium.ttf'),
    'main-semi': require('./assets/fonts/SourceSans3-SemiBold.ttf'),
    'main-bold': require('./assets/fonts/SourceSans3-Bold.ttf'),
  });

  useEffect(() => {
    const setLanguage = async () => {
      try {
        const language = await AsyncStorage.getItem('language');
        if (language) {
          i18n.changeLanguage(language);
        }
      } catch (error) {
        console.error('Error getting language from AsyncStorage:', error);
      }
    };

    setLanguage();
  }, []);

  useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.log('Permission to receive push notifications was denied');
        return;
      }

      const expoPushToken = (await Notifications.getExpoPushTokenAsync()).data;
      AsyncStorage.setItem('expoPushToken', expoPushToken);
    };

    registerForPushNotificationsAsync();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
        <Navigation></Navigation>
      </I18nextProvider>
    </Provider>
  );
}
