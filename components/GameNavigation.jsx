import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { COLORS } from '../helpers/colors';

import BookNow from './BookNow';
import Uniforms from './Uniforms';
import Facilities from './Facilities';
import GamePlayersList from './GamePlayersList';

import bookIcon from '../assets/images/ball.png';
import uniformIcon from '../assets/images/uniform.png';
import facilitiesIcon from '../assets/images/facilities.png';
import playersIcon from '../assets/images/players.png';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useLayoutEffect } from 'react';

const items = [
  {
    icon: bookIcon,
  },
  {
    icon: playersIcon,
  },
  {
    icon: uniformIcon,
  },
  {
    icon: facilitiesIcon,
  },
];

const GameNavigation = ({ children, activeIndex, setActiveIndex, hideIndex }) => {
  useLayoutEffect(() => {
    if (hideIndex === 0) {
      setActiveIndex(1);
    }
  }, [hideIndex]);
  return (
    <View>
      <LinearGradient colors={[COLORS.black, COLORS.darkgrey]}>
        <View style={styles.container}>
          {items.map(({ icon }, index) => {
            if ([0, 1, 2, 3].includes(hideIndex) && index === hideIndex) return null;
            return (
              <TouchableOpacity key={index} onPress={() => setActiveIndex(index)}>
                <View style={[styles.item, activeIndex === index && styles.itemActive]}>
                  <Image source={icon} width={32} height={32} />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </LinearGradient>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderTopLeftRadius: 220,
    borderTopRightRadius: 220,
  },
  itemActive: {
    backgroundColor: '#2F4131',
  },
});

export default GameNavigation;
