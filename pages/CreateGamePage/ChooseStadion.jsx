import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Accordion from '../../components/Accordion';
import PrimaryText from '../../components/PrimaryText';
import { COLORS } from '../../helpers/colors';
import { useDispatch, useSelector } from 'react-redux';
import { selectCreateGame, setStadion } from '../../redux/createGameSlice/createGameSlice';

const ChooseStadion = ({ accordionId, toggleAccordion, isActive, stadions }) => {
  const dispatch = useDispatch();
  const { stadion: selectedStadion } = useSelector(selectCreateGame);

  return (
    <Accordion
      title={selectedStadion?.title}
      toggleIsOpen={() => toggleAccordion(accordionId)}
      isOpen={isActive}>
      <ScrollView style={styles.stadions} scrollIndicatorInsets={{ right: 9 }}>
        {stadions.map((stadion, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                dispatch(setStadion(stadion));
                toggleAccordion(accordionId);
              }}
              key={stadion.id}
              style={[styles.stadion, index === stadions.length - 1 && { borderBottomWidth: 0 }]}>
              <PrimaryText style={{ color: COLORS.grey }} weight={600}>
                {stadion.title}
              </PrimaryText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Accordion>
  );
};

const styles = StyleSheet.create({
  stadions: {
    maxHeight: 230,
    paddingHorizontal: 9,
    backgroundColor: '#2F4131',
    borderRadius: 16,
  },
  stadion: {
    paddingHorizontal: 7,
    paddingVertical: 18,
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 1,
  },
});

export default ChooseStadion;
