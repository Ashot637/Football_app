import { Image, StyleSheet, View } from 'react-native';
import { COLORS } from '../helpers/colors';

import redUniformIcon from '../assets/images/uniform-red.png';
import blueUniformIcon from '../assets/images/uniform-blue.png';
import blackUniformIcon from '../assets/images/uniform-black.png';
import whiteUniformIcon from '../assets/images/uniform-white.png';

import PrimaryText from './PrimaryText';

import { useTranslation } from 'react-i18next';

const icons = [redUniformIcon, blueUniformIcon, blackUniformIcon, whiteUniformIcon];

const Uniforms = ({ game }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <PrimaryText style={styles.info} weight={600}>
        {t('game.info_uniforms')}
      </PrimaryText>
      {/* <PrimaryText style={styles.title} weight={600}>
        {t('game.player_from_first_group')}
      </PrimaryText> */}
      <View style={styles.uniforms}>
        {game.uniforms.map((uniformChoseUsersCount, index) => {
          return (
            <View style={styles.uniformView} key={'firstGroup-' + index}>
              <Image source={icons[index]} style={styles.uniformIcon} />
              <View style={styles.bar}>
                <View
                  style={[
                    styles.barActive,
                    {
                      width: `${
                        uniformChoseUsersCount && (uniformChoseUsersCount / game.playersCount) * 100
                      }%`,
                    },
                  ]}
                />
              </View>
            </View>
          );
        })}
      </View>
      {/* <PrimaryText style={styles.title} weight={600}>
        {t('game.player_from_second_group')}
      </PrimaryText> */}
      {/* <View style={styles.uniforms}>
        {game.uniformsSecondGroup.map((uniformChoseUsersCount, index) => {
          return (
            <View style={styles.uniformView} key={'secondGroup-' + index}>
              <Image source={icons[index]} style={styles.uniformIcon} />
              <View style={styles.bar}>
                <View
                  style={[
                    styles.barActive,
                    {
                      width: `${
                        uniformChoseUsersCount &&
                        (uniformChoseUsersCount / game.playersCountSecondGroup) * 100
                      }%`,
                    },
                  ]}
                />
              </View>
            </View>
          );
        })}
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  info: {
    color: COLORS.lightblue,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 32,
  },
  title: {
    color: COLORS.lightWhite,
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
  },
  uniforms: {
    rowGap: 10,
    marginBottom: 7,
  },
  uniformView: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 12,
  },
  uniformIcon: {
    width: 48,
    height: 48,
  },
  bar: {
    flex: 1,
    height: 10,
    backgroundColor: '#405742',
    borderRadius: 10,
    position: 'relative',
  },
  barActive: {
    position: 'absolute',
    height: 10,
    backgroundColor: COLORS.yellow,
    borderRadius: 10,
  },
});

export default Uniforms;
