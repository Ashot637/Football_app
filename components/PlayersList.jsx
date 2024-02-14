import { StyleSheet, View, Image } from 'react-native';

import PrimaryText from './PrimaryText';

import { COLORS } from '../helpers/colors';

import { BASE_URL } from '../axios/axios';

import avatarImg from '../assets/images/avatar.png';

import { useTranslation } from 'react-i18next';

import redUniformIcon from '../assets/images/uniform-red.png';
import blueUniformIcon from '../assets/images/uniform-blue.png';
import blackUniformIcon from '../assets/images/uniform-black.png';
import whiteUniformIcon from '../assets/images/uniform-white.png';

const PlayersList = ({ players, guests, maxPlayersCount, title }) => {
  const { t } = useTranslation();

  return (
    <>
      <PrimaryText style={styles.title} weight={600}>
        {t(title)}
      </PrimaryText>
      <View style={styles.players}>
        {players.map((player) => {
          return (
            <View style={styles.player} key={player.id}>
              <View style={styles.avatarView}>
                <Image
                  style={styles.avatar}
                  source={player.img ? { uri: BASE_URL + player.img } : avatarImg}
                />
              </View>
              <View style={styles.nameView}>
                <PrimaryText style={styles.name}>{player.name}</PrimaryText>
                <View style={styles.uniforms}>
                  <Image source={blackUniformIcon} style={styles.uniform} />
                  <Image source={whiteUniformIcon} style={styles.uniform} />
                </View>
              </View>
            </View>
          );
        })}
      </View>
      {guests && (
        <>
          <PrimaryText style={styles.guests}>{t('game.guests')}</PrimaryText>
          <View style={styles.players}>
            {guests.map((guest) => {
              return (
                <View style={styles.player} key={guest.id}>
                  <View style={styles.avatarView}>
                    <Image style={styles.avatar} source={require('../assets/images/avatar.png')} />
                  </View>
                  <View style={styles.nameView}>
                    <PrimaryText style={styles.name}>{guest.name}</PrimaryText>
                  </View>
                </View>
              );
            })}
          </View>
        </>
      )}
      <PrimaryText style={styles.playersLeft}>
        {t('game.only_x_players_left', { count: maxPlayersCount - players.length - guests.length })}
      </PrimaryText>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 24,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
    color: COLORS.lightWhite,
  },
  players: {
    rowGap: 14,
    marginBottom: 14,
  },
  player: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  avatarView: {
    borderWidth: 3,
    borderRadius: 32,
    borderColor: '#2F4F4F',
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
  },
  nameView: {
    backgroundColor: '#2F4F4F',
    borderRadius: 14,
    paddingVertical: 8,
    width: '90%',
    right: 0,
    paddingLeft: 53,
    zIndex: -1,
    position: 'absolute',
    flexDirection: 'row',
  },
  name: {
    fontSize: 20,
    color: COLORS.lightblue,
  },
  guests: {
    color: '#F0FFF0',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 14,
  },
  playersLeft: {
    fontStyle: 'italic',
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 14,
  },
  uniforms: {
    marginLeft: 'auto',
    marginRight: 12,
    flexDirection: 'row',
    columnGap: 12,
  },
  uniform: {
    width: 24,
    height: 24,
  },
});

export default PlayersList;
