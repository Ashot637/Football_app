import { StyleSheet, TouchableOpacity } from 'react-native';
import PrimaryText from './PrimaryText';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { COLORS } from '../helpers/colors';
import axios from '../axios/axios';
import { useSelector } from 'react-redux';
import { selectAuth } from '../redux/authSlice/authSlice';

const TIMER_MAX_VALUE = 60;

const ResendCode = () => {
  const { t } = useTranslation();
  const { phone } = useSelector(selectAuth);
  const [timer, setTimer] = useState(TIMER_MAX_VALUE);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isLoading]);

  useEffect(() => {
    if (timer === 0) {
      setIsLoading(false);
      setTimer(TIMER_MAX_VALUE);
    }
  }, [timer]);

  const onResend = () => {
    setIsLoading(true);
    axios.post('/auth/resend', { phone });
  };

  return (
    <>
      {!isLoading ? (
        <TouchableOpacity onPress={onResend}>
          <PrimaryText style={styles.title} weight={600}>
            {t('verify.resend')}
          </PrimaryText>
        </TouchableOpacity>
      ) : (
        <PrimaryText style={styles.title} weight={600}>
          {timer}
        </PrimaryText>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.lightblue,
  },
});

export default ResendCode;
