import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import PrimaryText from './PrimaryText';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFirstInvitation, selectAuth, setUser } from '../redux/authSlice/authSlice';
import { COLORS } from '../helpers/colors';
import { useTranslation } from 'react-i18next';

import axios from '../axios/axios';
import { format } from 'date-fns';

const Invitation = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuth);

  const onConfirm = () => {
    axios.post('/game/acceptInvitation', {
      id: user.invitations[0].id,
      groupId: user.invitations[0].groupId,
    });
    dispatch(deleteFirstInvitation());
  };

  const onCancel = () => {
    axios.post('/game/declineInvitation', { id: user.invitations[0].id });
    dispatch(deleteFirstInvitation());
  };

  return (
    !!user?.invitations?.length &&
    user?.invitations?.[0]?.startTime && (
      <Modal visible transparent>
        <View style={styles.overlay}>
          <View style={styles.content}>
            <PrimaryText style={styles.title}>{t('invitation.title')}</PrimaryText>
            <PrimaryText style={styles.info} weight={600}>
              {t('common.dear')} {user.name}, {t('invitation.subtitle')} {user.invitations[0].from},{' '}
              {t('common.for')} {format(user.invitations[0]?.startTime, 'dd.MM.yyyy HH:hh')},{' '}
              {'common.at_the'} {user.invitations[0]?.stadion}
            </PrimaryText>
            <View style={styles.modalBtns}>
              <TouchableOpacity onPress={onCancel} style={{ flex: 1 }}>
                <View style={styles.cancelBtn}>
                  <PrimaryText style={styles.btnText} weight={600}>
                    {t('common.cancel')}
                  </PrimaryText>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={onConfirm} style={{ flex: 1 }}>
                <View style={styles.submitbtn}>
                  <PrimaryText style={[styles.btnText, { color: COLORS.black }]} weight={600}>
                    {t('common.accept')}
                  </PrimaryText>
                </View>
              </TouchableOpacity>
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
  info: {
    fontSize: 16,
    color: COLORS.lightWhite,
    textAlign: 'center',
    marginHorizontal: 5,
    marginBottom: 34,
  },
  modalBtns: {
    flexDirection: 'row',
    columnGap: 25,
    marginHorizontal: 20,
  },
  cancelBtn: {
    backgroundColor: COLORS.darkgrey,
    borderRadius: 15,
    paddingVertical: 9,
    borderColor: COLORS.lightWhite,
    borderWidth: 1,
  },
  submitbtn: {
    backgroundColor: COLORS.yellow,
    borderRadius: 15,
    paddingVertical: 10,
  },
  btnText: {
    fontSize: 18,
    textAlign: 'center',
    color: COLORS.lightWhite,
  },
});

export default Invitation;
