import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Accordion from '../../components/Accordion';
import PrimaryText from '../../components/PrimaryText';
import { COLORS } from '../../helpers/colors';
import { useDispatch, useSelector } from 'react-redux';
import { selectCreateGame, setStadion } from '../../redux/createGameSlice/createGameSlice';

import icon from '../../assets/images/stadium.png';

const ChooseStadion = ({ accordionId, toggleAccordion, isActive, stadions }) => {
  const dispatch = useDispatch();
  const { stadion: selectedStadion } = useSelector(selectCreateGame);

  return (
    <Accordion
      icon={icon}
      iconInverted
      title={selectedStadion?.title}
      toggleIsOpen={() => toggleAccordion(accordionId)}
      isOpen={isActive}>
      <View style={styles.stadions}>
        <ScrollView nestedScrollEnabled>
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
      </View>
    </Accordion>
  );
};

const styles = StyleSheet.create({
  stadions: {
    height: 230,
    paddingHorizontal: 9,
    paddingRight: 5,
    backgroundColor: COLORS.blue,
    borderRadius: 16,
  },
  stadion: {
    paddingHorizontal: 7,
    paddingVertical: 18,
    borderBottomColor: COLORS.background_blue,
    borderBottomWidth: 1,
    marginRight: 6,
  },
});

export default ChooseStadion;
