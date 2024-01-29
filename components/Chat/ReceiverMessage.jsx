import { memo, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import PrimaryText from '../PrimaryText';

import avatarImg from '../../assets/images/avatar.png';
import { COLORS } from '../../helpers/colors';
import { format } from 'date-fns';
import { BASE_URL } from '../../axios/axios';

import likeImg from '../../assets/images/heart.png';

let timer = null;
const TIMEOUT = 250;
const debounce = (onSingle, onDouble) => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
    onDouble();
  } else {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      onSingle();
    }, TIMEOUT);
  }
};

const Message = memo(
  ({ data, isNextUserSame, setOpenMenuMessageId, isOpenMenu, onReactToMessage }) => {
    const onPress = () => {
      debounce(
        () => setOpenMenuMessageId(null),
        () => onReactToMessage(data.id),
      );
    };

    return (
      <View style={{ flex: 1 }}>
        <View style={[styles.container, isOpenMenu && { zIndex: 2 }]}>
          {!isNextUserSame ? (
            <Image
              style={styles.avatar}
              source={data.user.img ? { uri: BASE_URL + data.user.img } : avatarImg}
            />
          ) : (
            <View style={{ width: 46 }} />
          )}
          <View>
            {isOpenMenu && (
              <View style={[styles.emojisMenu]}>
                <TouchableOpacity
                  onPress={(e) => {
                    e.stopPropagation();
                    onReactToMessage(data.id);
                  }}>
                  <Image source={likeImg} />
                </TouchableOpacity>
              </View>
            )}
            <TouchableOpacity
              onPress={onPress}
              onLongPress={(e) => {
                setOpenMenuMessageId(data.id);
              }}>
              <View style={[styles.block]}>
                <PrimaryText style={[styles.message]}>{data.text}</PrimaryText>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    columnGap: 15,
                  }}>
                  <PrimaryText style={[styles.time]}>{format(data.createdAt, 'HH:mm')}</PrimaryText>
                  {!!data.likedUsers?.length && (
                    <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 2 }}>
                      <Image style={styles.reaction} source={likeImg} />
                      <PrimaryText style={styles.reactionCount}>
                        {data.likedUsers.length}
                      </PrimaryText>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
            {!isNextUserSame && (
              <PrimaryText style={[styles.username]}>{data.user.name}</PrimaryText>
            )}
          </View>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    columnGap: 5,
  },
  closeMenu: {
    opacity: 0.1,
  },
  openMenu: {
    zIndex: 1,
  },
  avatar: {
    width: 46,
    height: 46,
    borderWidth: 2,
    borderColor: COLORS.darkBlue,
    borderRadius: 23,
  },
  block: {
    backgroundColor: COLORS.darkBlue,
    paddingBottom: 6,
    paddingTop: 8,
    paddingHorizontal: 13,
    borderRadius: 14,
    marginBottom: 3,
    maxWidth: 220,
  },
  message: {
    fontSize: 18,
    color: COLORS.lightblue,
    marginBottom: 4,
  },
  time: {
    color: COLORS.lightWhite,
    fontSize: 12,
  },
  username: {
    color: COLORS.grey,
    fontStyle: 'italic',
    marginBottom: 5,
  },
  containerFromUser: {
    flexDirection: 'row-reverse',
  },
  fromUserTextAlign: {
    textAlign: 'right',
  },
  overlay: {
    backgroundColor: 'rgba(17, 22, 19, 0.9)',
    height: '100%',
  },
  actionsMenu: {
    position: 'absolute',
    backgroundColor: '#2F4131',
    paddingVertical: 14,
    borderRadius: 15,
    flex: 1,
    top: '100%',
    width: 230,
    left: 0,
    zIndex: 2,
  },
  inTopOfMessage: {
    top: '-100%',
  },
  inTopOfMenu: {
    bottom: '205%',
  },
  emojisMenu: {
    position: 'absolute',
    backgroundColor: '#2F4131',
    paddingVertical: 6,
    paddingHorizontal: 9,
    borderRadius: 15,
    bottom: '100%',
    marginBottom: 2,
    flex: 1,
    zIndex: 2,
    left: 0,
  },
  overUserName: {
    top: '75%',
  },
  action: {
    fontSize: 22,
    color: COLORS.lightWhite,
    textAlign: 'center',
  },
  reaction: {
    width: 18,
    height: 18,
  },
  reactionCount: {
    color: COLORS.grey,
  },
});

export default Message;
