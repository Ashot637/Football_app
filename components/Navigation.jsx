import { useEffect, useState } from "react";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchAuthMe,
  selectAuth,
  setExpoPushToken,
} from "../redux/authSlice/authSlice";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomNavBar from "./BottomNavBar";
import Header from "./Header";

import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import CreatePasswordPage from "../pages/CreatePasswordPage";
import VerifyAccount from "../pages/VerifyAccount";

import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";

import HomePage from "../pages/HomePage";
import StadiumsSearch from "../pages/StadiumsSearch";
import SingleGame from "../pages/SingleGame";
import MyActivityPage from "../pages/MyActivityPage";
import ProfilePage from "../pages/ProfilePage";
import SearchBar from "./SearchBar";
import NotificationsPage from "../pages/Notifications";
import SuccessBookingPage from "../pages/SuccessBookingPage";
import CancelBookingPage from "../pages/CancelBookingPage";
import Chat from "./Chat/Chat";
import SplashScreen from "./SplashScreen";
import useSocket from "../hooks/useSocket";
import Groups from "./Groups";
import CreateGamePage from "../pages/CreateGamePage/CreateGamePage";
import SelectSport from "../pages/SelectSport";
import axios from "axios";
import ForgotPasswordPage from "../pages/ForgotPassword/ForgotPassword";
import VerifyPhone from "../pages/ForgotPassword/VerifyPhone";
import NewPasswordPage from "../pages/ForgotPassword/NewPassword";
import { BASE_URL } from "../axios/axios";
import CreateGroupPage from "../pages/CreateGroupPage/CreateGroupPage";
import GroupPage from "../pages/GroupPage/GroupPage";
import GroupsPage from "../pages/GroupPage/GroupsPage";
import GroupGames from "../pages/GroupPage/GroupGames";
import GroupPlayers from "../pages/GroupPage/GroupPlayers";
import ShopPage from "../pages/ShopPage";
import PersonalDetails from "../pages/PersonalDetails";
import MyGamesPage from "../pages/MyGames/MyGamesPage";
import StadiumsPage from "../pages/StadiumsPage";
import StadiumDetails from "../pages/StadiumDetails";
import OpenGamesPage from "../pages/OpenGames/OpenGames";
import MyGameDetails from "../pages/MyGameDetails";
import TermsAndConditionsPage from "../pages/PPandTC/TermsAndConditionsPage"; 
import PrivacyPolicyPage from "../pages/PPandTC/PrivacyPolicyPage";




// import * as Linking from "expo-linking";

import EditGame from "../pages/EditGame";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Tab.Navigator
      backBehavior="history"
      tabBar={() => <BottomNavBar />}
      screenOptions={{
        header: () => <Header />,
      }}
    >
      <Tab.Screen name="home" component={HomePage} />
      <Tab.Screen name="my-games" component={MyGamesPage} />
      <Tab.Screen name="open-games" component={OpenGamesPage} />
      <Tab.Screen name="game" component={SingleGame} />
      <Tab.Screen name="my_activity" component={MyActivityPage} />
      <Tab.Screen name="personal_details" component={PersonalDetails} />
      <Tab.Screen name="profile" component={ProfilePage} />
      <Tab.Screen name="shop" component={ShopPage} />
      <Tab.Screen name="game_details" component={MyGameDetails} />
      <Tab.Screen name="notifications" component={NotificationsPage} />
      <Tab.Screen name="groups" component={GroupsPage} />
      <Tab.Screen name="group" component={GroupPage} />
      <Tab.Screen name="create-game" component={CreateGamePage} />
      <Tab.Screen name="create-group" component={CreateGroupPage} />
      <Tab.Screen name="group-matches" component={GroupGames} />
      <Tab.Screen name="edit_game" component={EditGame} />
      <Tab.Screen name="group-players" component={GroupPlayers} />
      <Tab.Screen name="stadiums_main" component={StadiumsPage} />
      <Tab.Screen name="stadiums_search" component={StadiumsSearch} />
      <Tab.Screen name="stadium_details" component={StadiumDetails} />
      <Tab.Screen name="chats" component={Groups} />
      <Tab.Screen name="terms_and_conditions" component={TermsAndConditionsPage} />
      <Tab.Screen name="privacy_policy" component={PrivacyPolicyPage} />


    </Tab.Navigator>
  );
};

// const NavigateTo = () => {
//   const navigation = useNavigation();
//   const { user } = useSelector(selectAuth);

//   useEffect(() => {
//     const handleDynamicLink = async () => {
//       const initialUrl = await Linking.getInitialURL();
//       if (initialUrl) {
//         const urlParts = initialUrl.split("?");

//         const queryString = urlParts[1];

//         const queryParams = queryString.split("&");

//         const params = {};

//         queryParams.forEach((param) => {
//           const [key, value] = param.split("=");

//           const decodedKey = decodeURIComponent(key);
//           const decodedValue = decodeURIComponent(value);

//           params[decodedKey] = decodedValue;
//         });

//         const page = params["page"];
//         const id = params["id"];
//         // const invitation = params["invitation"];

//         navigation.replace(
//           "main",
//           { screen: page },
//           {
//             id,
//             // invitation: invitation && JSON.parse(invitation),
//           }
//         );
//       }
//     };
//     if (user) {
//       handleDynamicLink();

//       Linking.addEventListener?.("url", handleDynamicLink);
//     }

//     return () => {
//       Linking.removeEventListener?.("url", handleDynamicLink);
//     };
//   }, [user]);

//   return null;
// };

const Navigation = () => {
  const dispatch = useDispatch();
  const { status, user } = useSelector(selectAuth);
  // const [navigateTo, setNavigateTo] = useState(false);

  useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }

      if (Device.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          alert(
            "Please enable notifications permission to receive chat alerts."
          );
          return;
        }
        let token = (
          await Notifications.getExpoPushTokenAsync({
            projectId: Constants.expoConfig.extra.eas.projectId,
          })
        )?.data;
        await AsyncStorage.setItem("expoPushToken", token);
      } else {
        alert("Must use physical device for Push Notifications");
      }
    };

    registerForPushNotificationsAsync();
    (async () => {
      const expoPushToken = await AsyncStorage.getItem("expoPushToken");
      dispatch(setExpoPushToken(expoPushToken));
      const { data } = await axios
        .get(BASE_URL + "ip")
        .catch((err) => console.log(err));
      dispatch(fetchAuthMe({ expoPushToken, ip: data }));
    })();
  }, []);

  // useEffect(() => {
  //   const handleDynamicLink = async () => {
  //     const initialUrl = await Linking.getInitialURL();
  //     console.log("====================================");
  //     console.log(initialUrl);
  //     console.log("====================================");
  //     if (initialUrl) {
  //       const urlParts = initialUrl.split("?");

  //       const queryString = urlParts[1];

  //       const queryParams = queryString.split("&");

  //       const params = {};

  //       queryParams.forEach((param) => {
  //         const [key, value] = param.split("=");

  //         const decodedKey = decodeURIComponent(key);
  //         const decodedValue = decodeURIComponent(value);

  //         params[decodedKey] = decodedValue;
  //       });

  //       const page = params["page"];

  //       setNavigateTo(page);
  //     }
  //   };
  //   if (user) {
  //     handleDynamicLink();

  //     Linking.addEventListener?.("url", handleDynamicLink);
  //   }

  //   return () => {
  //     Linking.removeEventListener?.("url", handleDynamicLink);
  //   };
  // }, [user]);

  useSocket(user);

  if (status === "loading" || status === "waiting") {
    return <SplashScreen />;
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={status === "success" ? "home" : "landing"}
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        >
          <Stack.Screen name="landing" component={LandingPage} />
          {/* <Stack.Screen name="navigate-to" component={NavigateTo} /> */}
          <Stack.Screen name="login" component={LoginPage} />
          <Stack.Screen name="signup" component={SignUpPage} />
          <Stack.Screen name="create-password" component={CreatePasswordPage} />
          <Stack.Screen name="verify" component={VerifyAccount} />
          <Stack.Screen name="forgot-password" component={ForgotPasswordPage} />
          <Stack.Screen name="forgot-password-phone" component={VerifyPhone} />
          <Stack.Screen name="terms_and_conditions" component={TermsAndConditionsPage} />
        <Stack.Screen name="privacy_policy" component={PrivacyPolicyPage} />
        
          <Stack.Screen
            name="forgot-password-new-password"
            component={NewPasswordPage}
          />

          {/* <Stack.Screen name="select" component={SelectSport} /> */}
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
