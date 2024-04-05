import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import BackgroundImageLayout from '../../components/BackgroundImageLayout';
import PrimaryButton from '../../components/PrimaryButton';
import Input from '../../components/Input';

import backIcon from '../../assets/images/back.png';
import passwordIcon from '../../assets/images/password.png';
import PrimaryText from '../../components/PrimaryText';

import axios from '../../axios/axios';

import { useTranslation } from 'react-i18next';
import i18n from '../../languages/i18n';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/authSlice/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewPasswordPage = ({ navigation, route }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const { phone, code } = route.params;

  const onSubmit = () => {
    axios.post('/auth/changePassword', { phone, password, code }).then(({ data }) => {
      dispatch(setUser(data));
      AsyncStorage.setItem('accessToken', data.accessToken);
    });
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
            {t('form.create_password')}
          </PrimaryText>
          <View style={{ width: 42 }} />
        </View>
        <View style={styles.inputs}>
          <Input
            value={password}
            setValue={setPassword}
            img={passwordIcon}
            secureTextEntry
            placeholder={t('form.create_password')}
          />
          <Input
            value={repeatPassword}
            setValue={setRepeatPassword}
            img={passwordIcon}
            secureTextEntry
            placeholder={t('form.repeat_password')}
          />
        </View>
        <PrimaryButton
          title={t('common.save')}
          onPress={onSubmit}
          disabled={password !== repeatPassword || !password.trim().length || password.length < 8}
        />
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
    marginBottom: 40,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default NewPasswordPage;
