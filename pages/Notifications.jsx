import { useCallback } from 'react';
import { BackHandler, ScrollView, StyleSheet, View } from 'react-native';

import { useSelector } from 'react-redux';
import { selectNotification } from '../redux/notificationSlice/notificationSlice';

import { useFocusEffect } from '@react-navigation/native';

import { COLORS } from '../helpers/colors';
import PrimaryText from '../components/PrimaryText';

import { useTranslation } from 'react-i18next';

const NotificationsPage = ({ navigation }) => {
  const { t } = useTranslation();

  const { from } = useSelector(selectNotification);
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate(from === 'game' ? 'home' : from);

        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }),
  );

  return (
    <ScrollView style={styles.container}>
      <PrimaryText style={styles.tilte} weight={600}>
        {t('notifications.title')}
      </PrimaryText>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  tilte: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
  },
});

export default NotificationsPage;
