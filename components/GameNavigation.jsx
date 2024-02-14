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

const items = [
  {
    icon: bookIcon,
    Element: BookNow,
  },
  {
    icon: uniformIcon,
    Element: Uniforms,
  },
  {
    icon: facilitiesIcon,
    Element: Facilities,
  },
  {
    icon: playersIcon,
    Element: GamePlayersList,
  },
];

const GameNavigation = ({ children, activeIndex, setActiveIndex }) => {
  return (
    <View>
      <LinearGradient colors={[COLORS.black, COLORS.darkgrey]}>
        <View style={styles.container}>
          {items.map(({ icon }, index) => {
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
