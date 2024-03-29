import { ScrollView, StyleSheet, View } from 'react-native';
import PrimaryText from '../../components/PrimaryText';
import { COLORS } from '../../helpers/colors';
import GameNavigation from '../../components/GameNavigation';
import { useEffect, useState } from 'react';
import axios from '../../axios/axios';
import Facilities from '../../components/Facilities';
import ChooseUniform from './ChooseUniform';
import FillInfo from './FillInfo';
import { useDispatch, useSelector } from 'react-redux';
import { selectCreateGame, setStadion } from '../../redux/createGameSlice/createGameSlice';
// import ChoosePlayers from './ChoosePlayers';
import Invitation from '../../components/Invitation';
import { useTranslation } from 'react-i18next';

const CreateGamePage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [stadions, setStadions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const { stadion } = useSelector(selectCreateGame);

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
      // case 1:
      //   return <ChoosePlayers />;
      case 2:
        return <ChooseUniform />;
      case 3:
        return <Facilities facilities={stadion?.facilities || []} />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* <Invitation /> */}
      <ScrollView style={styles.container}>
        <PrimaryText weight={600} style={styles.title}>
          {t('create_game.title')}
        </PrimaryText>
        {!!stadions.length && (
          <GameNavigation activeIndex={activeIndex} setActiveIndex={setActiveIndex} hideIndex={1}>
            {displayView(activeIndex)}
          </GameNavigation>
        )}
      </ScrollView>
    </View>
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
