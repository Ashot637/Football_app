import { useReducer, useState } from 'react';
import { Image, ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';

import PrimaryText from '../components/PrimaryText';
import ProfileItem from '../components/ProfileItem';
import PrimaryButton from '../components/PrimaryButton';
import LanguageSelect from '../components/LanguageSelect';

import { useDispatch, useSelector } from 'react-redux';
import { logout, selectAuth, setUser } from '../redux/authSlice/authSlice';

import * as ImagePicker from 'expo-image-picker';

import axios, { BASE_URL } from '../axios/axios';

import { COLORS } from '../helpers/colors';

import avatarImg from '../assets/images/avatar.png';
import editIcon from '../assets/images/edit.png';
import closeIcon from '../assets/images/close.png';
import profileYellowIcon from '../assets/images/profile_yellow.png';
import messageIcon from '../assets/images/message.png';
import callYellowIcon from '../assets/images/call_yellow.png';
import locationYellowIcon from '../assets/images/location_yellow.png';
import logoutIcon from '../assets/images/logout.png';

import { useTranslation } from 'react-i18next';
import DeleteAccount from '../components/DeleteAccount';

const items = [
  {
    icon: profileYellowIcon,
    title: 'name',
  },
  {
    icon: messageIcon,
    title: 'email',
  },
  {
    icon: callYellowIcon,
    title: 'phone',
  },
  {
    icon: locationYellowIcon,
    title: 'address',
  },
];

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_VALUE':
      return { ...state, [action.payload.title]: action.payload.value };
    default:
      return state;
  }
};

const ProfilePage = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuth);
  const [selectedImg, setSelectedImg] = useState(null);
  const [profileData, dispatchData] = useReducer(reducer, {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    address: user?.address,
  });

  const handleValueChange = (title, value) => {
    dispatchData({ type: 'UPDATE_VALUE', payload: { title, value } });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.75,
    });

    if (!result.canceled) {
      setSelectedImg(result.assets[0]);
    }
  };

  const onUpdateData = () => {
    const formData = new FormData();
    items.forEach(({ title }) => formData.append(title, profileData[title]));
    formData.append('prevImg', user.img);
    if (selectedImg) {
      const uriParts = selectedImg.uri.split('.');
      const fileType = uriParts[uriParts.length - 1];

      formData.append('img', {
        uri: selectedImg.uri,
        type: `image/${fileType}`,
        name: `photo.${fileType}`,
      });
    }
    axios
      .patch('/user/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(({ data }) => {
        dispatch(setUser(data));
        onRemoveSelectedImg();
      });
  };

  const onRemoveSelectedImg = () => {
    setSelectedImg(null);
  };

  const onLogout = () => {
    dispatch(logout());
    navigation.reset({
      index: 0,
      routes: [{ name: 'landing' }, { name: 'login' }],
    });
  };

  return (
    <ScrollView style={styles.container}>
      {user && (
        <>
          <View style={styles.avatarView}>
            <Image
              source={
                selectedImg?.uri
                  ? { uri: selectedImg.uri }
                  : user.img
                  ? { uri: BASE_URL + user.img }
                  : avatarImg
              }
              style={styles.avatar}
              width={100}
              height={100}
            />
            <TouchableOpacity onPress={pickImage}>
              <View style={styles.editView}>
                <Image source={editIcon} style={styles.icon} />
              </View>
            </TouchableOpacity>
            {selectedImg && (
              <View style={styles.removeView}>
                <TouchableOpacity onPress={onRemoveSelectedImg}>
                  <Image source={closeIcon} style={styles.icon} />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={styles.items}>
            {items.map(({ title, icon }, index) => {
              return (
                <ProfileItem
                  key={index}
                  title={`user.${title}`}
                  icon={icon}
                  value={profileData[title]}
                  initialValue={user[title]}
                  setValue={(value) => handleValueChange(title, value)}
                />
              );
            })}
            <LanguageSelect />
            <DeleteAccount />
            <TouchableOpacity style={{ alignSelf: 'flex-start' }} onPress={() => onLogout()}>
              <View style={styles.item}>
                <View style={styles.icon}>
                  <Image source={logoutIcon} style={styles.icon24} />
                </View>
                <PrimaryText style={styles.logout} weight={600}>
                  {t('user.logout')}
                </PrimaryText>
              </View>
            </TouchableOpacity>
            <PrimaryButton
              title={'Save'}
              onPress={() => onUpdateData()}
              disabled={
                (user['name'] === profileData['name'] &&
                  user['phone'] === profileData['phone'] &&
                  user['email'] === profileData['email'] &&
                  user['address'] === profileData['address'] &&
                  !selectedImg) ||
                !profileData['name'].trim() ||
                profileData['phone'].trim().length < 9
              }
            />
          </View>
          <View style={{ height: 50 }} />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
    paddingVertical: 24,
  },
  avatarView: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    position: 'relative',
    marginBottom: 32,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editView: {
    width: 32,
    aspectRatio: 1,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.darkgrey,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  removeView: {
    width: 32,
    aspectRatio: 1,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.darkgrey,
    position: 'absolute',
    right: 0,
  },
  items: {
    paddingHorizontal: 16,
    rowGap: 20,
  },
  item: {
    flexDirection: 'row',
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
  icon24: {
    width: 24,
    height: 24,
  },
  logout: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  addCard: {
    color: COLORS.yellow,
    fontSize: 20,
    textAlign: 'center',
  },
});

export default ProfilePage;
