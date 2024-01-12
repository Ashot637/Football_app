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
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import BackgroundImageLayout from '../components/BackgroundImageLayout';
import PrimaryButton from '../components/PrimaryButton';

import { COLORS } from '../helpers/colors';

import { fetchCode, selectAuth } from '../redux/authSlice/authSlice';
import { useDispatch, useSelector } from 'react-redux';

import backIcon from '../assets/images/back.png';

import { useTranslation } from 'react-i18next';
import i18n from '../languages/i18n';
import ResendCode from '../components/ResendCode';

const VerifyAccount = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isInvalidCode, phone, name, password } = useSelector(selectAuth);
  const [value, setValue] = useState('');

  const ref = useBlurOnFulfill({ value, cellCount: 4 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const onVerify = () => {
    dispatch(fetchCode({ code: value, name, phone, password }));
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
            {t('verify.verify_your_account')}
          </PrimaryText>
          <View style={{ width: 42 }} />
        </View>
        <PrimaryText style={styles.enterOTP} weight={600}>
          {t('verify.enter_otp', { number: phone })}
        </PrimaryText>
        <View style={styles.pinView}>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={4}
            rootStyle={styles.codeFieldRoot}
            keyboardType="phone-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <PrimaryText
                weight={600}
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </PrimaryText>
            )}
          />
        </View>
        {isInvalidCode && <PrimaryText style={styles.error}>{t('errors.INVALID_OTP')}</PrimaryText>}
        <View style={{ marginBottom: 24 }}>
          <PrimaryButton title={t('verify.verify_and_continue')} onPress={() => onVerify()} />
        </View>
        <View style={styles.bottomTextView}>
          <PrimaryText style={styles.leftText} weight={600}>
            {t('verify.didnt_receive_otp')}
          </PrimaryText>
          <ResendCode />
        </View>
      </BackgroundImageLayout>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  top: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 18,
    textAlign: 'center',
    marginBottom: 37,
  },
  title: {
    color: '#fff',
    fontSize: 21,
    fontWeight: '600',
  },
  titleBig: {
    fontSize: 24,
  },
  enterOTP: {
    fontWeight: '600',
    color: COLORS.grey,
    marginBottom: 24,
    textAlign: 'center',
  },
  pinView: {
    marginBottom: 40,
    paddingLeft: 12,
    paddingRight: 12,
  },
  cell: {
    width: 64,
    height: 80,
    backgroundColor: COLORS.darkgrey,
    overflow: 'hidden',
    color: '#fff',
    borderRadius: 16,
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 16,
  },
  focusCell: {
    borderColor: COLORS.green,
    borderWidth: 1,
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
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default VerifyAccount;
