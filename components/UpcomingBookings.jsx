import { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import PrimaryText from './PrimaryText';

import { format } from 'date-fns';
import { minutesDifference } from '../helpers/minutesDifference';

import { COLORS } from '../helpers/colors';

import axios from '../axios/axios';

import stadionIcon from '../assets/images/stadium.png';
import locationIcon from '../assets/images/location.png';

import { useNavigation } from '@react-navigation/native';

import { useTranslation } from 'react-i18next';
import i18n from '../languages/i18n';

const UpcomingBookings = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get('/game/getUpcomings').then(({ data }) => setGames(data));
  }, [i18n.language]);

  const onCancelBooking = (id) => {
    axios.post('/game/cancel/' + id).then(() => {
      setGames(games.filter((game) => game.id !== id));
      navigation.navigate('cancel');
    });
  };

  return (
    <View style={styles.container}>
      <PrimaryText weight={600} style={styles.title}>
        {t('activity.upcoming_bookings')}
      </PrimaryText>
      <View style={styles.blocks}>
        {!!games.length &&
          games?.map((game) => {
            return (
              <View style={styles.block} key={game.id}>
                <PrimaryText weight={700} style={styles.blockTitle}>
                  {game.stadion.title}
                </PrimaryText>
                <View style={styles.stadionInfoView}>
                  <View style={styles.stadionInfoRow}>
                    <Image source={stadionIcon} />
                    <PrimaryText style={styles.stadionInfoText}>{game.stadion.title}</PrimaryText>
                  </View>
                  <View style={styles.stadionInfoRow}>
                    <Image source={locationIcon} />
                    <PrimaryText style={styles.stadionInfoText}>{game.stadion.address}</PrimaryText>
                  </View>
                </View>
                <View style={styles.gameInfoContainer}>
                  <View style={styles.gameInfo}>
                    <PrimaryText style={styles.gameInfoTopText}>
                      {game.price} {t('common.amd')}
                    </PrimaryText>
                    <PrimaryText
                      style={[
                        styles.gameInfoBottomText,
                        i18n.language === 'am' && styles.gameInfoBottomTextSmall,
                      ]}
                      weight={600}>
                      {t('common.total_price')}
                    </PrimaryText>
                  </View>
                  <View style={[styles.gameInfo, styles.gameInfoMiddle]}>
                    <PrimaryText style={styles.gameInfoTopText}>
                      {minutesDifference(game.startTime, game.endTime)}
                    </PrimaryText>
                    <PrimaryText
                      style={[
                        styles.gameInfoBottomText,
                        i18n.language === 'am' && styles.gameInfoBottomTextSmall,
                      ]}
                      weight={600}>
                      {t('common.duration')}
                    </PrimaryText>
                  </View>
                  <View style={styles.gameInfo}>
                    <PrimaryText style={styles.gameInfoTopText}>
                      {format(game.startTime, 'dd.MM.yyyy')}
                    </PrimaryText>
                    <PrimaryText
                      style={[
                        styles.gameInfoBottomText,
                        i18n.language === 'am' && styles.gameInfoBottomTextSmall,
                      ]}
                      weight={600}>
                      {t('common.date')}
                    </PrimaryText>
                  </View>
                </View>
                <PrimaryText style={styles.bookingNumber} weight={600}>
                  {t('success.your_booking_number')}
                </PrimaryText>
                <PrimaryText style={styles.number} weight={600}>
                  {game.users[0].UserGame.id}
                </PrimaryText>
                <View style={styles.line} />
                <View style={{ alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => onCancelBooking(game.id)}>
                    <PrimaryText style={styles.cancel} weight={600}>
                      {t('common.cancel')}
                    </PrimaryText>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    marginBottom: 20,
  },
  blocks: {
    rowGap: 20,
  },
  block: {
    paddingVertical: 18,
    backgroundColor: COLORS.darkgrey,
    paddingHorizontal: 16,
    rowGap: 10,
    borderRadius: 16,
    overflow: 'hidden',
  },
  blockTitle: {
    color: COLORS.yellow,
    fontSize: 20,
  },
  subtitle: {
    fontSize: 20,
    color: '#fff',
  },
  stadionInfoView: {
    marginBottom: 16,
    rowGap: 8,
  },
  stadionInfoRow: {
    flexDirection: 'row',
    columnGap: 8,
  },
  stadionInfoText: {
    fontSize: 16,
    color: COLORS.lightWhite,
    flexShrink: 1,
  },
  gameInfoContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  gameInfo: {
    textAlign: 'center',
    flex: 3,
    rowGap: 3,
  },
  gameInfoMiddle: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#fff',
    paddingHorizontal: 5,
    paddingVertical: 7,
    flex: 4,
  },
  gameInfoTopText: {
    color: '#fff',
    textAlign: 'center',
  },
  gameInfoBottomText: {
    color: COLORS.lightWhite,
    fontSize: 16,
    textAlign: 'center',
  },
  gameInfoBottomTextSmall: {
    fontSize: 14,
  },
  bookingNumber: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  number: {
    fontSize: 22,
    color: COLORS.lightWhite,
    textAlign: 'center',
  },
  line: {
    height: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 18,
  },
  cancel: {
    fontSize: 16,
    color: COLORS.lightWhite,
    textAlign: 'center',
  },
});

export default UpcomingBookings;
