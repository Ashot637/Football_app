import { Image, Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import PrimaryText from './PrimaryText';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth, setUser } from '../redux/authSlice/authSlice';
import { COLORS } from '../helpers/colors';
import { useTranslation } from 'react-i18next';

import playerIcon from '../assets/images/role-player.png';
import organizerIcon from '../assets/images/role-organizer.png';
import { useState } from 'react';
import axios from '../axios/axios';

const ChooseRole = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuth);
  const [isOrganizer, setIsOrganizer] = useState(false);

  const onConfirm = () => {
    axios.post('/user/updateStatus', { isOrganizer });
    dispatch(setUser({ ...user, isOrganizer }));
  };

  return (
    user?.isOrganizer === null && (
      <Modal visible transparent>
        <View style={styles.overlay}>
          <View style={styles.content}>
            <PrimaryText style={styles.title}>Choose your role</PrimaryText>
            <View style={styles.options}>
              <TouchableWithoutFeedback onPress={() => setIsOrganizer(false)}>
                <View style={[styles.option, !isOrganizer && styles.optionActive]}>
                  <Image source={playerIcon} style={styles.icon} />
                  <PrimaryText weight={600} style={styles.optionText}>
                    {t('roles.player')}
                  </PrimaryText>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => setIsOrganizer(true)}>
                <View style={[styles.option, isOrganizer && styles.optionActive]}>
                  <Image source={organizerIcon} style={styles.icon} />
                  <PrimaryText weight={600} style={styles.optionText}>
                    {t('roles.organizer')}
                  </PrimaryText>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <PrimaryText style={styles.subtitle}>You can change your position later.</PrimaryText>
            <View style={{ alignItems: 'center' }}>
              <TouchableWithoutFeedback onPress={onConfirm}>
                <View style={styles.btn}>
                  <PrimaryText style={{ fontSize: 18 }} weight={600}>
                    Confirm
                  </PrimaryText>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </View>
      </Modal>
    )
  );
};

const styles = StyleSheet.create({
  overlay: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    width: '100%',
    backgroundColor: COLORS.black,
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: COLORS.yellow,
    paddingVertical: 32,
    paddingHorizontal: 10,
  },
  title: {
    marginBottom: 24,
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
  },
  options: {
    marginBottom: 24,
    rowGap: 32,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.darkgrey,
    borderRadius: 16,
    columnGap: 12,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderWidth: 0.5,
    borderColor: COLORS.darkgrey,
  },
  optionActive: {
    borderColor: COLORS.yellow,
  },
  icon: {
    width: 54,
    height: 54,
  },
  optionText: {
    fontSize: 20,
    color: COLORS.lightWhite,
  },
  subtitle: {
    marginBottom: 24,
    color: COLORS.grey,
    fontSize: 12,
    textAlign: 'center',
  },
  btn: {
    borderRadius: 15,
    backgroundColor: COLORS.lightYellow,
    paddingHorizontal: 60,
    paddingVertical: 10,
  },
});

export default ChooseRole;
