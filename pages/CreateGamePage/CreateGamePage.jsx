import { ScrollView, StyleSheet } from 'react-native';
import PrimaryText from '../../components/PrimaryText';
import { COLORS } from '../../helpers/colors';
import GameNavigation from '../../components/GameNavigation';
import { useEffect, useState } from 'react';
import axios from '../../axios/axios';
import Facilities from '../../components/Facilities';
import ChooseUniform from './ChooseUniform';
import FillInfo from './FillInfo';
import { useDispatch } from 'react-redux';
import { setStadion } from '../../redux/createGameSlice/createGameSlice';

const CreateGamePage = () => {
  const dispatch = useDispatch();
  const [stadions, setStadions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    axios.get('/stadion/getAllForUser').then(({ data }) => {
      setStadions(data);
      dispatch(setStadion(data[0]));
    });
  }, []);

  const displayView = (index) => {
    switch (index) {
      case 0:
        return <FillInfo stadions={stadions} />;
      case 1:
        return <ChooseUniform />;
      case 2:
        return <Facilities />;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <PrimaryText weight={600} style={styles.title}>
        Let's create a game
      </PrimaryText>
      {!!stadions.length && (
        <GameNavigation activeIndex={activeIndex} setActiveIndex={setActiveIndex}>
          {displayView(activeIndex)}
        </GameNavigation>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
    paddingTop: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
    paddingLeft: 16,
  },
});

export default CreateGamePage;
