import { Image, StyleSheet, View } from 'react-native';

import PrimaryText from './PrimaryText';

import { COLORS } from '../helpers/colors';

import { BASE_URL } from '../axios/axios';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectCreateGame } from '../redux/createGameSlice/createGameSlice';

const Facilities = () => {
  const { t } = useTranslation();
  const {
    stadion: { facilities },
  } = useSelector(selectCreateGame);

  return (
    <View style={styles.container}>
      <PrimaryText style={styles.title} weight={600}>
        {t('game.facilities')}
      </PrimaryText>
      <View style={styles.items}>
        {facilities.map((item) => {
          return (
            <View style={styles.item} key={item.id}>
              <View style={styles.icon}>
                <Image source={{ uri: BASE_URL + item.img }} width={32} height={32} />
              </View>
              <PrimaryText style={styles.facilitie}>{item.title}</PrimaryText>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  title: {
    color: COLORS.lightWhite,
    fontSize: 22,
    marginBottom: 12,
    textAlign: 'center',
  },
  items: {
    rowGap: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  icon: {
    width: 48,
    aspectRatio: 1,
    borderRadius: 24,
    backgroundColor: COLORS.darkgrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  facilitie: {
    color: '#fff',
    fontSize: 20,
  },
});

export default Facilities;
