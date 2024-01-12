import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { fetchAuthMe } from '../redux/authSlice/authSlice';

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

import HomePage from '../pages/HomePage';
import Stadions from '../pages/Stadions';
import SingleGame from '../pages/SingleGame';
import MyActivityPage from '../pages/MyActivityPage';
import ProfilePage from '../pages/ProfilePage';
import SearchBar from './SearchBar';
import Notifications from '../pages/Notifications';
import SuccessBookingPage from '../pages/SuccessBookingPage';
import CancelBookingPage from '../pages/CancelBookingPage';
import Chat from './Chat/Chat';

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
      <Tab.Screen name="game" component={SingleGame} />
      <Tab.Screen name="stadiums" component={Stadions} options={{ header: () => <SearchBar /> }} />
      <Tab.Screen name="my_activity" component={MyActivityPage} />
      <Tab.Screen name="profile" component={ProfilePage} />
      <Tab.Screen name="notifications" component={Notifications} />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="landing"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name="landing" component={LandingPage} />
        <Stack.Screen name="login" component={LoginPage} />
        <Stack.Screen name="signup" component={SignUpPage} />
        <Stack.Screen name="create-password" component={CreatePasswordPage} />
        <Stack.Screen name="verify" component={VerifyAccount} />
        <Stack.Screen name="main" component={HomeStack} />
        <Stack.Screen name="success" component={SuccessBookingPage} />
        <Stack.Screen name="cancel" component={CancelBookingPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
