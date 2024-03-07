import { StyleSheet, View, Image, TouchableOpacity, Share, ScrollView } from 'react-native';

import PrimaryText from './PrimaryText';
import PrimaryButton from './PrimaryButton';

import { COLORS } from '../helpers/colors';

import { BASE_URL } from '../axios/axios';
import { format } from 'date-fns';
import avatarImg from '../assets/images/avatar.png';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectAuth } from '../redux/authSlice/authSlice';
import redUniformIcon from '../assets/images/uniform-red.png';
import blueUniformIcon from '../assets/images/uniform-blue.png';
import blackUniformIcon from '../assets/images/uniform-black.png';
import whiteUniformIcon from '../assets/images/uniform-white.png';
import axios from '../axios/axios';
import { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';

const icons = [redUniformIcon, blueUniformIcon, blackUniformIcon, whiteUniformIcon];

const PlayersList = ({ players, maxPlayersCount, title, organizerId, groupId }) => {
  const { t } = useTranslation();
  const { user } = useSelector(selectAuth);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [extendedGame, setExtendedGame] = useState();

  const onShare = async () => {
    try {
      const shareOptions = {
        message: `http://146.190.127.106/ip?groupId=${groupId}&from=${user.name}`,
      };
      await Share.share(shareOptions);
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const onExtendGame = () => {
    axios.post('/game/extendGame', { groupId }).then(({ data }) => {
      setExtendedGame(data);
      setIsOpenModal(true);
    });
  };

  return (
    <>
      {isOpenModal && (
        <ConfirmationModal state={isOpenModal} dismiss={() => setIsOpenModal(false)}>
          <PrimaryText style={styles.modalTitle}>{t('game.extended_successfully')}</PrimaryText>
          <PrimaryText style={styles.modalSubTitle} weight={600}>
            {/* {t('create_game.asking')} */}
            {t('common.dear') + ' ' + user.name} {t('game.extended_title')}{' '}
            {extendedGame && format(extendedGame.startTime, 'dd.MM.yyyy')}
          </PrimaryText>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity onPress={() => setIsOpenModal(false)}>
              <View style={styles.modalButton}>
                <PrimaryText style={styles.btnText} weight={600}>
                  {t('common.understand')}
                </PrimaryText>
              </View>
            </TouchableOpacity>
          </View>
        </ConfirmationModal>
      )}
      {/* <View style={{ height: '40$' }}>
        <ScrollView nestedScrollEnabled> */}
      <PrimaryText style={styles.title} weight={600}>
        {t(title)}
      </PrimaryText>
      <View style={styles.players}>
        {players.map((player) => {
          return (
            <View style={styles.player} key={player.id}>
              <View style={[styles.avatarView, player.id === user?.id && styles.myAvatar]}>
                <Image
                  style={styles.avatar}
                  source={player.img ? { uri: BASE_URL + player.img } : avatarImg}
                />
              </View>
              <View style={[styles.nameView, player.id === user?.id && styles.me]}>
                <View style={styles.userInfo}>
                  <PrimaryText style={styles.name}>
                    {player.name} {player.id === user?.id && `(${t('common.me')})`}
                  </PrimaryText>
                  {user?.id === organizerId && (
                    <PrimaryText style={styles.phone}>{player.phone}</PrimaryText>
                  )}
                </View>
                <View style={styles.uniforms}>
                  {player.UserGame.uniforms.map((uniformIndex) => {
                    return (
                      <Image
                        source={icons[uniformIndex]}
                        key={`${player.id}-${uniformIndex}`}
                        style={styles.uniform}
                      />
                    );
                  })}
                </View>
              </View>
            </View>
          );
        })}
      </View>
      {maxPlayersCount < 30 && (
        <PrimaryText style={styles.playersLeft}>
          {t('game.only_x_players_left', {
            count: maxPlayersCount - players.length,
          })}
        </PrimaryText>
      )}
      {/* </ScrollView>
      </View> */}
      <View style={styles.buttons}>
        {organizerId === user?.id && (
          <TouchableOpacity onPress={onExtendGame} style={styles.extend}>
            <PrimaryText style={styles.extendTitle} weight={400}>
              {t('game.extend')}
            </PrimaryText>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.inviteButton, organizerId !== user?.id && { width: '100%' }]}
          onPress={onShare}>
          <PrimaryText weight={400} style={styles.invite}>
            {t('game.invite_players')}
          </PrimaryText>
        </TouchableOpacity>
      </View>
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
  me: {
    backgroundColor: '#0D5454',
  },
  avatarView: {
    borderWidth: 3,
    borderRadius: 32,
    borderColor: '#2F4F4F',
  },
  myAvatar: {
    borderColor: '#0D5454',
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
  userInfo: {
    rowGap: 2,
  },
  name: {
    fontSize: 20,
    color: COLORS.lightblue,
  },
  phone: {
    fontSize: 14,
    color: COLORS.lightWhite,
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
  modalTitle: {
    fontSize: 18,
    textAlign: 'center',
    color: COLORS.lightWhite,
    marginBottom: 10,
  },
  modalSubTitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 16,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.lightYellow,
    borderRadius: 15,
  },
  btnText: {
    color: COLORS.black,
    fontSize: 18,
  },
  inviteButton: {
    width: '48%',
    backgroundColor: '#acad28',
    borderWidth: 1.5,
    borderColor: COLORS.yellow,
    borderRadius: 15,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  invite: {
    fontSize: 18,
    color: COLORS.yellow,
  },
  extend: {
    width: '48%',
    backgroundColor: COLORS.green,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  extendTitle: {
    fontSize: 18,
    color: '#fff',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // position: 'absolute',
    // bottom: 0,
    // left: 16,
  },
});

export default PlayersList;
