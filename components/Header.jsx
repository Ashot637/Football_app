import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { useDispatch } from 'react-redux';
import { setFromSearchIcon } from '../redux/searchSlice/searchSlice';

import { getFocusedRouteNameFromRoute, useNavigation, useRoute } from '@react-navigation/native';

import { LinearGradient } from 'expo-linear-gradient';

import { COLORS } from '../helpers/colors';

import searchIcon from '../assets/images/search.png';
import notificationIcon from '../assets/images/notification.png';
import { setFrom } from '../redux/notificationSlice/notificationSlice';

const Header = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();

  const onOpenSearch = () => {
    dispatch(setFromSearchIcon(true));
    navigation.navigate('stadiums');
  };

  const onOpenNotifcations = () => {
    if (route.name !== 'notifications') {
      dispatch(setFrom(route.name));
      navigation.navigate('notifications');
    }
  };

  return (
    <LinearGradient colors={[COLORS.darkgrey, 'rgba(32, 44, 34, 0.92)']} style={styles.gradient}>
      <View style={styles.header}>
        <TouchableOpacity>
          <View style={styles.logo}></View>
        </TouchableOpacity>
        <View style={styles.actions}>
          <TouchableOpacity onPress={onOpenSearch}>
            <Image source={searchIcon} height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onOpenNotifcations}>
            <Image source={notificationIcon} height={24} width={24} />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    paddingTop: 46,
    paddingBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 28,
  },
  logo: {
    width: 48,
    aspectRatio: 1,
    borderRadius: 24,
    backgroundColor: '#fff',
  },
  actions: {
    flexDirection: 'row',
    columnGap: 24,
  },
});

export default Header;
