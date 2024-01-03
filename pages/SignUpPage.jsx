import { useState, useEffect } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { fetchSignup, resetIsWaitingCode, selectAuth } from '../redux/authSlice/authSlice';

import BackgroundImageLayout from '../components/BackgroundImageLayout';
import PrimaryButton from '../components/PrimaryButton';
import Input from '../components/Input';

import backIcon from '../assets/images/back.png';
import profileIcon from '../assets/images/profile.png';
import phoneIcon from '../assets/images/call.png';
import PrimaryText from '../components/PrimaryText';

import { useTranslation } from 'react-i18next';

const SignUpPage = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isWaitingCode, errorMessage } = useSelector(selectAuth);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (isWaitingCode) {
      navigation.navigate('verify');
      dispatch(resetIsWaitingCode());
    }
  }, [isWaitingCode, navigation]);

  const onSignup = () => {
    dispatch(fetchSignup({ name, phone })).then(() => {
      setName('');
      setPhone('');
    });
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <BackgroundImageLayout>
        <View style={styles.top}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={backIcon} width={24} height={24} />
          </TouchableOpacity>
          <PrimaryText style={styles.title} weight={600}>
            {t('form.signup')}
          </PrimaryText>
          <View style={{ width: 42 }} />
        </View>
        <View style={styles.inputs}>
          <Input value={name} setValue={setName} img={profileIcon} placeholder={t('user.name')} />
          <Input value={phone} setValue={setPhone} img={phoneIcon} placeholder={t('user.phone')} />
        </View>
        {errorMessage && <PrimaryText style={styles.error}>{errorMessage}</PrimaryText>}
        <PrimaryButton title={t('form.signup')} onPress={() => onSignup()} />
      </BackgroundImageLayout>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  top: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 18,
    textAlign: 'center',
    marginBottom: 32,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '600',
  },
  inputs: {
    display: 'flex',
    rowGap: 24,
    marginBottom: 40,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default SignUpPage;
