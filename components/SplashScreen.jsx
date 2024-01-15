import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
import React from 'react';

import splashIcon from '../assets/images/icon1024.png';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={splashIcon} style={styles.icon} />
      <ActivityIndicator
        color={'#405742'}
        size={'large'}
        style={{ position: 'absolute', bottom: 100 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    paddingBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 150,
    height: 150,
    marginBottom: 25,
  },
});

export default SplashScreen;
