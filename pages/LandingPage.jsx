import { StyleSheet, TouchableOpacity, View } from 'react-native';

import PrimaryButton from '../components/PrimaryButton';
import BackgroundImageLayout from '../components/BackgroundImageLayout';

import { COLORS } from '../helpers/colors';
import PrimaryText from '../components/PrimaryText';
import { useTranslation } from 'react-i18next';

const LandingPage = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <BackgroundImageLayout padding={40}>
      <PrimaryText style={styles.title} weight={600}>
        {t('landing.title')}
      </PrimaryText>
      <PrimaryText style={styles.subtitle}>{t('landing.desc')}</PrimaryText>
      <View style={styles.buttons}>
        <View style={{ width: '60%' }}>
          <PrimaryButton
            title={t('form.login')}
            onPress={() => {
              navigation.navigate('login');
            }}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('signup')}>
          <PrimaryText style={styles.signup} weight={600}>
            {t('form.signup')}
          </PrimaryText>
        </TouchableOpacity>
      </View>
    </BackgroundImageLayout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    color: '#fff',
    marginBottom: 18,
    lineHeight: 55,
  },
  subtitle: {
    color: COLORS.grey,
    marginBottom: 40,
    lineHeight: 22,
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingRight: 30,
  },
  signup: {
    fontSize: 16,
    color: COLORS.lightblue,
    fontWeight: '600',
  },
});

export default LandingPage;
