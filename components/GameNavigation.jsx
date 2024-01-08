import { useState } from 'react';
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

const GameNavigation = ({ game }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const displayView = (index) => {
    switch (index) {
      case 0:
        return <BookNow game={game} />;
      case 1:
        return <Uniforms game={game} />;
      case 2:
        return <Facilities game={game} />;
      case 3:
        return <GamePlayersList game={game} />;
    }
  };

  return (
    <>
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
      {displayView(activeIndex)}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.darkgrey,
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
