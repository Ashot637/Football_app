import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import PrimaryText from '../components/PrimaryText';

import { useDispatch, useSelector } from 'react-redux';
import { selectAuth, fetchLogin, toggleRememberMe } from '../redux/authSlice/authSlice';

import BackgroundImageLayout from '../components/BackgroundImageLayout';
import PrimaryButton from '../components/PrimaryButton';
import Input from '../components/Input';

import { COLORS } from '../helpers/colors';

import backIcon from '../assets/images/back.png';
import passwordIcon from '../assets/images/password.png';
import phoneIcon from '../assets/images/call.png';
import doneIcon from '../assets/images/done.png';

import { useTranslation } from 'react-i18next';
import i18n from '../languages/i18n';

const LoginPage = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { errorMessage, rememberMe } = useSelector(selectAuth);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    dispatch(fetchLogin({ password, phone })).then(() => {
      setPhone('');
      setPassword('');
    });
  };

  const onRemember = () => {
    dispatch(toggleRememberMe());
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' && 'padding'}>
      <BackgroundImageLayout>
        <View style={styles.top}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={backIcon} width={24} height={24} />
          </TouchableOpacity>
          <PrimaryText
            style={[styles.title, i18n.language === 'en' && styles.titleBig]}
            weight={600}>
            {t('form.login')}
          </PrimaryText>
          <View style={{ width: 42 }} />
        </View>
        <View style={styles.inputs}>
          <Input
            type="phone-pad"
            value={phone}
            setValue={setPhone}
            img={phoneIcon}
            placeholder={t('user.phone')}
          />
          <Input
            secureTextEntry
            value={password}
            setValue={setPassword}
            img={passwordIcon}
            placeholder={t('user.password')}
          />
        </View>
        <TouchableOpacity onPress={onRemember}>
          <View style={styles.rememberView}>
            <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
              {rememberMe && <Image source={doneIcon} style={styles.done} />}
            </View>
            <PrimaryText style={styles.remember}>{t('form.remember_me')}</PrimaryText>
          </View>
        </TouchableOpacity>
        {errorMessage && (
          <PrimaryText style={styles.error}>{t(`errors.${errorMessage}`)}</PrimaryText>
        )}
        <View style={{ marginBottom: 24 }}>
          <PrimaryButton
            title={t('form.login')}
            onPress={() => onLogin()}
            disabled={phone.trim().length < 9 || !password.length}
          />
        </View>
        <View style={styles.bottomTextView}>
          <PrimaryText style={styles.leftText} weight={600}>
            {t('form.dont_have_account')}
          </PrimaryText>
          <TouchableOpacity onPress={() => navigation.navigate('signup')}>
            <PrimaryText style={styles.rightText} weight={600}>
              {t('form.signup')}
            </PrimaryText>
          </TouchableOpacity>
        </View>
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
    fontSize: 21,
    fontWeight: '600',
  },
  titleBig: {
    fontSize: 28,
  },
  inputs: {
    display: 'flex',
    rowGap: 24,
    marginBottom: 30,
  },
  rememberView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 12,
    paddingLeft: 13,
    marginBottom: 40,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 4,
  },
  checkboxActive: {
    borderColor: COLORS.lightYellow,
  },
  done: {
    width: 15,
    height: 15,
  },
  remember: {
    color: COLORS.grey,
  },
  bottomTextView: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    columnGap: 5,
  },
  leftText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.grey,
  },
  rightText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.lightblue,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginHorizontal: 15,
    marginBottom: 10,
  },
});

export default LoginPage;
