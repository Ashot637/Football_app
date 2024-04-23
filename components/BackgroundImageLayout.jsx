import { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { resetErrorMessage, selectAuth } from '../redux/authSlice/authSlice';

import { useIsFocused, useNavigation } from '@react-navigation/native';

import { COLORS } from '../helpers/colors';

import bgImg from '../assets/images/bg.jpg';

const BackgroundImageLayout = ({ children, padding = 15, route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user } = useSelector(selectAuth);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (user && isFocused) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'main' }],
      });
    }
  }, [user, isFocused, navigation]);

  useEffect(() => {
    dispatch(resetErrorMessage());
  }, [route]);

  return (
    <View>
      <Image source={bgImg} style={styles.image} />

      <View style={[styles.block, { padding }]}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transform: [{ translateY: -150 }],
  },
  block: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#041440',
    borderTopLeftRadius: 42,
    borderTopRightRadius: 42,
    paddingTop: 40,
    paddingBottom: 50,
  },
});

export default BackgroundImageLayout;
