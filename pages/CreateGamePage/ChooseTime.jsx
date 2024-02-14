import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Accordion from '../../components/Accordion';
import PrimaryText from '../../components/PrimaryText';
import { COLORS } from '../../helpers/colors';
import { selectCreateGame, setTime } from '../../redux/createGameSlice/createGameSlice';
import { useDispatch, useSelector } from 'react-redux';

const times = ['12:00 - 15:00', '19:00 - 21:00', '01:00 - 03:00'];

const ChooseTime = ({ accordionId, toggleAccordion, isActive }) => {
  const dispatch = useDispatch();
  const { time } = useSelector(selectCreateGame);

  return (
    <Accordion
      title={time || 'Choose Time'}
      toggleIsOpen={() => toggleAccordion(accordionId)}
      isOpen={isActive}>
      <ScrollView style={styles.times} scrollIndicatorInsets={{ right: 9 }}>
        {times.map((time, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                dispatch(setTime(time));
                toggleAccordion(accordionId);
              }}
              key={time}
              style={[styles.time, index === times.length - 1 && { borderBottomWidth: 0 }]}>
              <PrimaryText style={{ color: COLORS.grey }} weight={600}>
                {time}
              </PrimaryText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Accordion>
  );
};

const styles = StyleSheet.create({
  times: {
    maxHeight: 230,
    paddingHorizontal: 9,
    backgroundColor: '#2F4131',
    borderRadius: 16,
  },
  time: {
    paddingHorizontal: 7,
    paddingVertical: 18,
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 1,
  },
});

export default ChooseTime;
