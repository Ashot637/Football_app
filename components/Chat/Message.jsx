import { Image, StyleSheet, View } from 'react-native';
import PrimaryText from '../PrimaryText';

import avatarImg from '../../assets/images/avatar.png';
import { COLORS } from '../../helpers/colors';

const Message = ({ user, me }) => {
  return (
    <View style={[styles.container, me && styles.containerFromUser]}>
      <Image style={styles.avatar} source={user.img ? { uri: BASE_URL + user.img } : avatarImg} />
      <View>
        <View style={styles.block}>
          <PrimaryText style={[styles.message, me && styles.fromUserTextAlign]}>
            {user.text}
          </PrimaryText>
          <PrimaryText style={[styles.time, me && styles.fromUserTextAlign]}>09:24</PrimaryText>
        </View>
        <PrimaryText style={[styles.username, me && styles.fromUserTextAlign]}>
          {user.name}
        </PrimaryText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    columnGap: 5,
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
    paddingVertical: 6,
    paddingHorizontal: 13,
    borderRadius: 14,
    marginBottom: 3,
  },
  message: {
    fontSize: 20,
    color: COLORS.lightblue,
    marginBottom: 2,
  },
  time: {
    color: COLORS.lightWhite,
    fontSize: 12,
  },
  username: {
    color: COLORS.grey,
    fontStyle: 'italic',
  },
  containerFromUser: {
    flexDirection: 'row-reverse',
  },
  fromUserTextAlign: {
    textAlign: 'right',
  },
});

export default Message;
