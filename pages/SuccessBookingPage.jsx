import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import PrimaryText from '../components/PrimaryText';
import PrimaryButton from '../components/PrimaryButton';

import { COLORS } from '../helpers/colors';
import { minutesDifference } from '../helpers/minutesDifference';

import { format } from 'date-fns';

import bgImg from '../assets/images/bg.jpg';
import stadionIcon from '../assets/images/stadium.png';
import locationIcon from '../assets/images/location.png';

import { useTranslation } from 'react-i18next';
import i18n from '../languages/i18n';

const SuccessBookingPage = ({ route, navigation }) => {
  const { t } = useTranslation();
  const { game, confirmationNumber } = route.params;

  return (
    <ImageBackground source={bgImg} style={styles.image}>
      <View style={styles.info}>
        <View>
          <PrimaryText
            style={[styles.title, i18n.language === 'am' && styles.titleSmall]}
            weight={600}>
            {t('success.title')}
          </PrimaryText>
          <View style={styles.stadionInfoView}>
            <View style={styles.stadionInfoRow}>
              <Image source={stadionIcon} style={styles.icon} />
              <PrimaryText style={styles.stadionInfoText}>{game.stadion.title}</PrimaryText>
            </View>
            <View style={styles.stadionInfoRow}>
              <Image source={locationIcon} style={styles.icon} />
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
          <PrimaryText style={styles.subtitle} weight={600}>
            {t('success.your_booking_number')}
          </PrimaryText>
          <PrimaryText style={styles.number} weight={600}>
            {confirmationNumber}
          </PrimaryText>
        </View>
        <PrimaryButton
          title={t('common.go_to_home')}
          onPress={() => navigation.navigate('home', { refresh: true })}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
  info: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 16,
    paddingBottom: 50,
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 24,
  },
  titleSmall: {
    fontSize: 22,
  },
  stadionInfoView: {
    marginBottom: 42,
    rowGap: 8,
  },
  stadionInfoRow: {
    flexDirection: 'row',
    columnGap: 8,
  },
  stadionInfoText: {
    fontSize: 16,
    color: COLORS.lightWhite,
  },
  gameInfoContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 40,
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
  subtitle: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 6,
  },
  number: {
    color: COLORS.yellow,
    fontSize: 22,
    textAlign: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default SuccessBookingPage;
