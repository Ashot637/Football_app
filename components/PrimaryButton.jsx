import { StyleSheet, TouchableOpacity } from 'react-native';

import { COLORS } from '../helpers/colors';
import PrimaryText from './PrimaryText';

const PrimaryButton = ({ title, onPress, disabled }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.button, disabled && styles.disabled]}>
      <PrimaryText style={styles.title} weight={600}>
        {title}
      </PrimaryText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: COLORS.cyan,
    borderRadius: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
});

export default PrimaryButton;
