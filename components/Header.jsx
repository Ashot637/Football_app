import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { setFrom } from "../redux/notificationSlice/notificationSlice";

import { useNavigation, useRoute } from "@react-navigation/native";

import { COLORS } from "../helpers/colors";

// import LogoImg from "../assets/images/Logo.svg";
// const BollHolaLogo = require('../assets/images/bollHola_logo.png');
import BollHolaLogo from "../assets/images/BallHola.jpg";
// import BollHolaLogo from "../assets/images/ballhola_logo.png";

import NotificationIcon from "../assets/images/Notification.svg";
import MessangerIcon from "../assets/images/Chat.svg";

import {
  changeNewMessagesStatus,
  selectAuth,
} from "../redux/authSlice/authSlice";
import { useEffect, useState } from "react";
import { socket } from "../hooks/useSocket";

const Header = () => {
  const { user } = useSelector(selectAuth);
  const [isOpenSeach, setIsOpenSearch] = useState(false);
  const [value, setValue] = useState("false");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();

  useEffect(() => {
    socket.on("user-new-message", () => {
      dispatch(changeNewMessagesStatus(true));
    });
  }, []);

  // const onOpenSearch = () => {
  //   dispatch(setFromSearchIcon(true));
  //   navigation.navigate('stadiums');
  // };

  const onOpenNotifcations = () => {
    if (!["chats", "chat", "notifications"].includes(route.name)) {
      dispatch(setFrom(route.name));
    }
    navigation.navigate("notifications");
  };

  const onOpenChats = () => {
    if (!["chats", "chat", "notifications"].includes(route.name)) {
      dispatch(setFrom(route.name));
    }
    navigation.navigate("chats");
  };

  return (
    <>
      <View style={styles.background}>
        <View style={styles.header}>
          <TouchableOpacity
            testID="home-page"
            onPress={() => navigation.navigate("home")}
          >
            {/* <LogoImg width={60} height={60} /> */}
            <Image source={BollHolaLogo} style={styles.logo} />
          </TouchableOpacity>
          <View style={styles.actions}>
            {/* <TouchableOpacity onPress={onOpenSearch}>
              <Image source={searchIcon} style={styles.icon} />
            </TouchableOpacity> */}
            <View>
              {user?.notifications > 0 && (
                <View style={styles.count}>
                  <Text style={{ color: "white", fontSize: 9 }}>
                    {user.notifications}
                  </Text>
                </View>
              )}
              <TouchableOpacity
                testID="notifications"
                onPress={onOpenNotifcations}
              >
                <NotificationIcon width={30} height={30} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity testID="chat" onPress={onOpenChats}>
              <MessangerIcon width={30} height={30} />
              {user?.hasMessage && <View style={styles.newMessage} />}
            </TouchableOpacity>
            {/* <View style={styles.actions}>
              <TouchableOpacity onPress={onOpenNotifcations}>
                <NotificationIcon width={24} height={24} />
              </TouchableOpacity>
              <TouchableOpacity onPress={onOpenChats}>
                <Image source={messangerIcon} style={styles.icon} />
                {user?.hasMessage && <View style={styles.newMessage} />}
              </TouchableOpacity>
            </View> */}
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#041648",
    paddingTop: 46,
    paddingBottom: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 28,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  actions: {
    flexDirection: "row",
    columnGap: 24,
  },
  newMessage: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#1A82ED",
    position: "absolute",
    right: 0,
    top: -3,
  },

  count: {
    zIndex: 3,
    position: "absolute",
    width: 15,
    height: 15,
    left: 15,
    top: -3,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#F8EEFF",
    backgroundColor: "#0968CA",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Header;
