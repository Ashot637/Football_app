import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { setFromSearchIcon } from '../redux/searchSlice/searchSlice';
import { setFrom } from '../redux/notificationSlice/notificationSlice';

import { useNavigation, useRoute } from '@react-navigation/native';

import { LinearGradient } from 'expo-linear-gradient';

import { COLORS } from '../helpers/colors';

import logoImg from '../assets/images/logo.png';
import searchIcon from '../assets/images/search.png';
import notificationIcon from '../assets/images/notification.png';
import { changeNewMessagesStatus, selectAuth } from '../redux/authSlice/authSlice';
import { useEffect } from 'react';
import { socket } from '../hooks/useSocket';

const Header = () => {
  const { user } = useSelector(selectAuth);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();

  useEffect(() => {
    socket.on('user-new-message', () => {
      dispatch(changeNewMessagesStatus(true));
    });
  }, []);

  const onOpenSearch = () => {
    dispatch(setFromSearchIcon(true));
    navigation.navigate('stadiums');
  };

  const onOpenNotifcations = () => {
    if (!'chats'.includes(route.name)) {
      dispatch(setFrom(route.name));
      navigation.navigate('chats');
    }
  };

  return (
    <LinearGradient colors={[COLORS.darkgrey, 'rgba(32, 44, 34, 0.92)']} style={styles.gradient}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('home')}>
          <Image source={logoImg} style={styles.logo} />
        </TouchableOpacity>
        <View style={styles.actions}>
          <TouchableOpacity onPress={onOpenSearch}>
            <Image source={searchIcon} height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onOpenNotifcations}>
            <Image source={notificationIcon} height={24} width={24} />
            {user.hasMessage && <View style={styles.newMessage} />}
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
    height: 48,
    borderRadius: 24,
  },
  actions: {
    flexDirection: 'row',
    columnGap: 24,
  },
  newMessage: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.yellow,
    position: 'absolute',
    right: 3,
    top: 1,
  },
});

export default Header;
