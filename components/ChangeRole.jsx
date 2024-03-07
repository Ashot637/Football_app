import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';

import { COLORS } from '../helpers/colors';

import languageIcon from '../assets/images/lang.png';
import arrowIcon from '../assets/images/arrow.png';
import doneIcon from '../assets/images/done.png';

import { useTranslation } from 'react-i18next';
import PrimaryText from './PrimaryText';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth, setUser } from '../redux/authSlice/authSlice';
import axios from '../axios/axios';

const ChangeRole = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector(selectAuth);
  const dispatch = useDispatch();

  const onChangeRole = (isOrganizer) => {
    axios.post('/user/updateStatus', { isOrganizer });
    dispatch(setUser({ ...user, isOrganizer }));
  };

  return (
    <>
      <TouchableOpacity onPress={() => setIsOpen((prev) => !prev)}>
        <View style={styles.item}>
          <View style={styles.icon}>
            <Image source={languageIcon} width={24} height={24} />
          </View>
          <View style={styles.text}>
            <PrimaryText style={styles.title} weight={600}>
              {t('roles.title')}
            </PrimaryText>
            <View style={[styles.line, { bottom: isOpen ? -138 : -10 }]} />
          </View>
          <View>
            <Image
              source={arrowIcon}
              style={[isOpen && { transform: [{ rotate: '90deg' }] }]}
              width={18}
              height={18}
            />
          </View>
        </View>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.options}>
          <TouchableOpacity
            onPress={() => onChangeRole(false)}
            disabled={!user?.isOrganizer}
            styles={styles}>
            <View style={styles.row}>
              <PrimaryText
                style={[styles.option, !user?.isOrganizer && styles.active]}
                weight={700}>
                {t(`roles.player`)}
              </PrimaryText>
              {!user?.isOrganizer && <Image source={doneIcon} />}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onChangeRole(true)} disabled={user?.isOrganizer}>
            <View style={styles.row}>
              <PrimaryText style={[styles.option, user?.isOrganizer && styles.active]} weight={700}>
                {t(`roles.organizer`)}
              </PrimaryText>
              {user?.isOrganizer && <Image source={doneIcon} />}
            </View>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: 20,
    paddingLeft: 18,
  },
  icon: {
    width: 32,
    aspectRatio: 1,
    borderRadius: 16,
    backgroundColor: COLORS.darkgrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flex: 1,
    position: 'relative',
  },
  title: {
    color: '#fff',
    fontWeight: '600',
    marginBottom: 5,
    fontSize: 16,
    textTransform: 'capitalize',
  },
  desc: {
    fontWeight: '600',
    color: COLORS.grey,
  },
  line: {
    backgroundColor: COLORS.darkgrey,
    height: 1,
    position: 'absolute',
    width: '100%',
  },
  options: {
    backgroundColor: COLORS.darkgrey,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 23,
    rowGap: 23,
    marginLeft: 50,
  },
  option: {
    color: COLORS.grey,
    fontWeight: '700',
  },
  active: {
    color: COLORS.yellow,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ChangeRole;
