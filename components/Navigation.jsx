import { useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthMe, selectAuth } from '../redux/authSlice/authSlice';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomNavBar from './BottomNavBar';
import Header from './Header';

import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import CreatePasswordPage from '../pages/CreatePasswordPage';
import VerifyAccount from '../pages/VerifyAccount';

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

import HomePage from '../pages/HomePage';
import Stadions from '../pages/Stadions';
import SingleGame from '../pages/SingleGame';
import MyActivityPage from '../pages/MyActivityPage';
import ProfilePage from '../pages/ProfilePage';
import SearchBar from './SearchBar';
import NotificationsPage from '../pages/Notifications';
import SuccessBookingPage from '../pages/SuccessBookingPage';
import CancelBookingPage from '../pages/CancelBookingPage';
import Chat from './Chat/Chat';
import SplashScreen from './SplashScreen';
import useSocket from '../hooks/useSocket';
import Groups from './Groups';
import CreateGamePage from '../pages/CreateGamePage/CreateGamePage';
import SelectSport from '../pages/SelectSport';
import axios from 'axios';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Tab.Navigator
      tabBar={() => <BottomNavBar />}
      screenOptions={{
        header: () => <Header />,
      }}>
      <Tab.Screen name="home" component={HomePage} />
      <Tab.Screen name="create" component={CreateGamePage} />
      <Tab.Screen name="game" component={SingleGame} />
      <Tab.Screen name="stadiums" component={Stadions} options={{ header: () => <SearchBar /> }} />
      <Tab.Screen name="my_activity" component={MyActivityPage} />
      <Tab.Screen name="profile" component={ProfilePage} />
      <Tab.Screen name="notifications" component={NotificationsPage} />
      <Tab.Screen name="chats" component={Groups} />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  const dispatch = useDispatch();
  const { status, user } = useSelector(selectAuth);

  useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }

      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Please enable notifications permission to receive chat alerts.');
          return;
        }
        let token = (
          await Notifications.getExpoPushTokenAsync({
            projectId: Constants.expoConfig.extra.eas.projectId,
          })
        ).data;
        await AsyncStorage.setItem('expoPushToken', token);
      } else {
        alert('Must use physical device for Push Notifications');
      }
    };

    registerForPushNotificationsAsync();
    (async () => {
      const expoPushToken = await AsyncStorage.getItem('expoPushToken');
      const { data } = await axios.get('http://146.190.127.106/ip');
      dispatch(fetchAuthMe({ expoPushToken, ip: data }));
    })();
  }, []);

  useSocket(user);

  if (status === 'loading' || status === 'waiting') {
    return <SplashScreen />;
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={status === 'success' ? 'select' : 'landing'}
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}>
          <Stack.Screen name="landing" component={LandingPage} />
          <Stack.Screen name="login" component={LoginPage} />
          <Stack.Screen name="signup" component={SignUpPage} />
          <Stack.Screen name="create-password" component={CreatePasswordPage} />
          <Stack.Screen name="verify" component={VerifyAccount} />
          <Stack.Screen name="select" component={SelectSport} />
          <Stack.Screen name="main" component={HomeStack} />
          <Stack.Screen
            name="chat"
            component={Chat}
            options={{
              headerShown: true,
              header: () => <Header />,
            }}
          />
          <Stack.Screen name="success" component={SuccessBookingPage} />
          <Stack.Screen name="cancel" component={CancelBookingPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Navigation;
