import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import ChooseStadion from './ChooseStadion';
import ChooseDate from './ChooseDate';
import PrimaryButton from '../../components/PrimaryButton';
import ChooseTime from './ChooseTime';

const accordions = [ChooseStadion, ChooseDate, ChooseTime];

const FillInfo = ({ stadions }) => {
  const [active, setActive] = useState(null);

  const toggleAccordion = (accordionId) => {
    accordionId === active ? setActive(null) : setActive(accordionId);
  };

  return (
    <View style={styles.container}>
      <View style={{ rowGap: 24, marginBottom: 32 }}>
        {accordions.map((Accordion, index) => {
          return (
            <Accordion
              key={index}
              accordionId={index}
              isActive={active === index}
              stadions={stadions}
              toggleAccordion={toggleAccordion}
            />
          );
        })}
      </View>
      <PrimaryButton title={'Create a match'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 48,
  },
});

export default FillInfo;
