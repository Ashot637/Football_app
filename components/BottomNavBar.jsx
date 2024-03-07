import { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import PrimaryText from './PrimaryText';

import { COLORS } from '../helpers/colors';
import { getFocusedRouteNameFromRoute, useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectNotification } from '../redux/notificationSlice/notificationSlice';

import homeIcon from '../assets/images/home.png';
import stadiumIcon from '../assets/images/stadium.png';
import shopIcon from '../assets/images/shop.png';
import chartIcon from '../assets/images/chart.png';
import profileIcon from '../assets/images/profile_bottom.png';

import { useTranslation } from 'react-i18next';

const items = [
  {
    title: 'home',
    routes: ['home', 'game', 'create'],
    icon: homeIcon,
  },
  {
    title: 'stadiums',
    routes: ['stadiums'],
    icon: stadiumIcon,
  },
  {
    title: 'store',
    route: ['store'],
    icon: shopIcon,
  },
  {
    title: 'my_activity',
    routes: ['my_activity'],
    icon: chartIcon,
  },
  {
    title: 'profile',
    routes: ['profile'],
    icon: profileIcon,
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
      setActiveRoute(['chat', 'chats', 'notifications'].includes(routeName) ? from : routeName);
    }
  }, [route]);

  return (
    <View style={styles.nav}>
      {items.map((item) => {
        if (item.title === 'store') {
          return (
            <Image source={item.icon} key={item.title} style={[styles.icon]} resizeMode="contain" />
          );
        }
        return (
          <TouchableOpacity key={item.title} onPress={() => navigation.navigate(item.routes[0])}>
            <View style={styles.item}>
              {item.routes.includes(activeRoute) ? (
                <>
                  <PrimaryText style={styles.title}>{t(`navigation.${item.title}`)}</PrimaryText>
                  <View style={styles.dot}></View>
                </>
              ) : (
                <Image source={item.icon} style={styles.icon} />
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
    width: '100%',
    backgroundColor: COLORS.darkgrey,
    paddingHorizontal: 30,
    paddingVertical: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    alignItems: 'center',
    rowGap: 5,
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
