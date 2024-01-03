import { StyleSheet, View, ImageBackground } from 'react-native';

import PrimaryButton from '../components/PrimaryButton';
import PrimaryText from '../components/PrimaryText';

import bgImg from '../assets/images/cancel.jpg';

const CancelBookingPage = ({ navigation }) => {
  return (
    <ImageBackground source={bgImg} style={styles.image}>
      <View style={styles.container}>
        <PrimaryText style={styles.title} weight={600}>
          Your booking has been canceled successfully
        </PrimaryText>

        <PrimaryButton title={'Go to homepage'} onPress={() => navigation.navigate('home')} />
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
  container: {
    flex: 1,
    paddingTop: 180,
    paddingHorizontal: 24,
    paddingBottom: 50,
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 32,
  },
});

export default CancelBookingPage;
