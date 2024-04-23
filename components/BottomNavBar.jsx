import { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { COLORS } from '../helpers/colors';
import { getFocusedRouteNameFromRoute, useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectNotification } from '../redux/notificationSlice/notificationSlice';

import Home from '../assets/images/Home-1.svg';
import HomeActive from '../assets/images/Home.svg'
import Shop from '../assets/images/shop.svg';
import ShopActive from '../assets/images/shop-1.svg'
import Profile from '../assets/images/Profile-1.svg';
import ProfileActive from '../assets/images/ProfileCyan.svg'

import { useTranslation } from "react-i18next";

const items = [
  {    title: 'home',
    routes: ['home', 'game', 'create'],
    icon: <Home/>,
    iconActive: <HomeActive/>
  },
  {
    title: 'store',
    routes: ['shop'],
    icon: <Shop/>,
    iconActive: <ShopActive/>
  },
  {
    title: 'profile',
    routes: ['profile'],
    icon: <Profile/>,
    iconActive: <ProfileActive/>
  },
];

const BottomNavBar = () => {
  const { t } = useTranslation();
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
            key={item.title}
            onPress={() => navigation.navigate(item.routes[0])}
          >
            <View style={styles.item}>
              {item.routes.includes(activeRoute) ? (
                <>
                  <PrimaryText style={styles.title}>
                    {t(`navigation.${item.title}`)}
                  </PrimaryText>
                  <View style={styles.dot}></View>
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
    width: '100%',
    backgroundColor: COLORS.navyBlue,
    paddingHorizontal: 30,
    paddingVertical: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  item: {
    alignItems: "center",
    rowGap: 5,
    width:100
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
