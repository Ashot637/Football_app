import { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import PrimaryText from '../components/PrimaryText';

import { useSelector } from 'react-redux';
import { selectSearch } from '../redux/searchSlice/searchSlice';

import axios from '../axios/axios';

import { COLORS } from '../helpers/colors';
import Game from '../components/Game';

const Stadions = () => {
  const { term } = useSelector(selectSearch);
  const [stadions, setStadions] = useState([]);
  const [selectedStadionId, setSelectedStadionId] = useState(null);
  const [games, setGames] = useState([]);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    axios.get('/stadion/search', { params: { term } }).then(({ data }) => {
      setStadions(data);
      setSelectedStadionId(null);
      scrollViewRef.current.scrollTo({ x: 0, y: 0 });
    });
  }, [term]);

  useEffect(() => {
    if (selectedStadionId) {
      axios.get('/game/getByStadionId/' + selectedStadionId).then(({ data }) => setGames(data));
    } else {
      setGames([]);
    }
  }, [selectedStadionId]);

  return (
    <ScrollView style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} ref={scrollViewRef}>
        <View style={styles.stadions}>
          {stadions.map((stadion, index) => {
            return (
              <TouchableOpacity
                key={stadion.id}
                onPress={() =>
                  selectedStadionId === stadion.id
                    ? setSelectedStadionId(null)
                    : setSelectedStadionId(stadion.id)
                }>
                <View
                  style={[
                    styles.stadionView,
                    selectedStadionId === stadion.id && styles.stadionViewActive,
                    !index && { marginLeft: 16 },
                  ]}>
                  <PrimaryText
                    weight={600}
                    style={[
                      styles.stadionText,
                      selectedStadionId === stadion.id && styles.stadionTextActive,
                    ]}>
                    {stadion.title}
                  </PrimaryText>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      <View style={styles.games}>
        {games?.map((game) => {
          return <Game key={game.id} game={game} />;
        })}
      </View>
      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
    paddingVertical: 24,
  },
  stadions: {
    flexDirection: 'row',
    columnGap: 8,
    marginBottom: 24,
  },
  stadionView: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 40,
    height: 'auto',
  },
  stadionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  stadionViewActive: {
    borderColor: COLORS.lightblue,
    backgroundColor: COLORS.darkgrey,
  },
  stadionTextActive: {
    color: COLORS.lightblue,
  },
  games: {
    paddingHorizontal: 16,
    rowGap: 16,
  },
});

export default Stadions;
