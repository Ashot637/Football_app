import { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';

import PrimaryText from './PrimaryText';
import Input from './Input';

import { useSelector } from 'react-redux';
import { selectAuth } from '../redux/authSlice/authSlice';

import { COLORS } from '../helpers/colors';

import arrowIcon from '../assets/images/arrow.png';

import { useTranslation } from 'react-i18next';

const ProfileItem = ({ icon, title, initialValue, value, setValue, openIcon }) => {
  const { user } = useSelector(selectAuth);
  const [isOpen, setIsOpen] = useState(false);
  const isMounted = useRef(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (isMounted.current) {
      setIsOpen(false);
    }
    isMounted.current = true;
  }, [user]);

  return (
    <TouchableOpacity onPress={() => setIsOpen((prev) => !prev)}>
      <View style={[styles.item, isOpen && { marginBottom: 20 }]}>
        <View style={styles.icon}>
          <View>{icon}</View>
        </View>
        <View style={styles.text}>
          <PrimaryText style={styles.title} weight={600}>
            {t(title)}
          </PrimaryText>
          <PrimaryText style={styles.desc} weight={600}>
            {initialValue}
          </PrimaryText>
          <View style={[styles.line, { bottom: isOpen ? -94 : -10 }]} />
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
      {isOpen && (
        <Input
          img={openIcon}
          value={value}
          setValue={setValue}
          type={title !== 'user.phone' ? 'default' : 'phone-pad'}
        />
      )}
    </TouchableOpacity>
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
    backgroundColor: COLORS.blue,
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
    backgroundColor: COLORS.blue,
    height: 1,
    position: 'absolute',
    width: '100%',
  },
});

export default ProfileItem;
