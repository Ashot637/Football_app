import { StyleSheet, Text } from 'react-native';

const PrimaryText = ({ children, style, weight = 400 }) => {
  return <Text style={[style, styles[`text${weight}`]]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text400: {
    fontWeight: '400',
    fontFamily: 'main-reg',
  },
  text500: {
    fontWeight: '500',
    fontFamily: 'main-med',
  },
  text600: {
    fontWeight: '600',
    fontFamily: 'main-semi',
  },
  text700: {
    fontWeight: '700',
    fontFamily: 'main-bold',
  },
});

export default PrimaryText;
