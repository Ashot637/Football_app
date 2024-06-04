import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { COLORS } from "../helpers/colors";
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectNotification } from "../redux/notificationSlice/notificationSlice";

import Home from "../assets/images/Home-1.svg";
import HomeActive from "../assets/images/Home.svg";
import Shop from "../assets/images/shop.svg";
import ShopActive from "../assets/images/shop-1.svg";
import Profile from "../assets/images/Profile-1.svg";
import ProfileActive from "../assets/images/ProfileCyan.svg";

const items = [
  {
    title: "home",
    routes: ["home"],
    icon: <Home />,
    iconActive: <HomeActive />,
    testId: "home-page",
  },
  {
    title: "store",
    routes: ["shop"],
    icon: <Shop />,
    iconActive: <ShopActive />,
    testId: "shop-page",
  },
  {
    title: "profile",
    routes: ["profile"],
    icon: <Profile />,
    iconActive: <ProfileActive />,
    testId: "profile-page",
  },
];

const BottomNavBar = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [activeRoute, setActiveRoute] = useState(items[0].routes[0]);
  const { from } = useSelector(selectNotification);

  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName) {
      setActiveRoute(
        ["chat", "chats", "notifications"].includes(routeName)
          ? from
          : routeName
      );
    }
  }, [route]);

  return (
    <View style={styles.nav}>
      {items.map((item) => {
        return (
          <TouchableOpacity
            testID={item.testId}
            key={item.title}
            onPress={() => navigation.navigate(item.routes[0])}
            style={{ flex: 1 }}
          >
            <View style={styles.item}>
              {item.routes.includes(activeRoute) ? (
                <>
                  <View>{item.iconActive}</View>
                </>
              ) : (
                <View>{item.icon}</View>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    width: "100%",
    backgroundColor: COLORS.darkgrey,
    backgroundColor: COLORS.navyBlue,
    paddingHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  item: {
    alignItems: "center",
    rowGap: 5,
    paddingVertical: 24,
    // width: 100,
  },
  title: {
    color: COLORS.yellow,
    fontSize: 13,
  },
  dot: {
    width: 5,
    aspectRatio: 1,
    borderRadius: 2.5,
    backgroundColor: COLORS.yellow,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default BottomNavBar;
