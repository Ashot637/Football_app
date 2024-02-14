import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../helpers/colors';
import PrimaryText from './PrimaryText';

import arrowIcon from '../assets/images/arrow.png';
import stadionIcon from '../assets/images/stadium.png';

const Accordion = ({ title, children, isOpen, toggleIsOpen }) => {
  return (
    <View>
      <TouchableOpacity onPress={() => toggleIsOpen()}>
        <View style={styles.container}>
          <Image
            source={stadionIcon}
            style={{ width: 24, height: 24, transform: [{ rotate: '90deg' }] }}
          />
          <PrimaryText style={styles.title} weight={600}>
            {title}
          </PrimaryText>
          <Image
            source={arrowIcon}
            style={{ transform: [{ rotate: isOpen ? '90deg' : '270deg' }] }}
          />
        </View>
      </TouchableOpacity>
      {isOpen && <View style={{ marginTop: 10 }}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.darkgrey,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 16,
    flexDirection: 'row',
    columnGap: 8,
    alignItems: 'center',
  },
  title: {
    flex: 1,
    color: COLORS.lightWhite,
  },
});

export default Accordion;
