import { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import PrimaryText from '../components/PrimaryText';

import { useSelector } from 'react-redux';
import { selectSearch } from '../redux/searchSlice/searchSlice';

import axios from '../axios/axios';

import { COLORS } from '../helpers/colors';
import Game from '../components/Game';
import SearchBar from '../components/SearchBar';

const StadiumsSearch = ({navigation}) => {
  // const { term } = useSelector(selectSearch);
  // const [stadions, setStadions] = useState([]);
  // const [selectedStadionId, segtSelectedStadionId] = useState(null);
  // const [games, setGames] = useState([]);
  // const scrollViewRef = useRef(null);

  // useEffect(() => {
  //   axios.get('/stadion/search', { params: { term } }).then(({ data }) => {
  //     setStadions(data);
  //     setSelectedStadionId(null);
  //   });
  // }, [term]);

  // useEffect(() => {
  //   if (selectedStadionId) {
  //     axios.get('/game/getByStadionId/' + selectedStadionId).then(({ data }) => setGames(data));
  //   } else {
  //     setGames([]);
  //   }
  // }, [selectedStadionId]);

  return (
    <ScrollView style={styles.container}>
    <SearchBar navigation={navigation}/>
      {/* <View style={styles.stadions}>
        <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} ref={scrollViewRef}>
          {stadions.map((stadion, index) => {
            return (
              <TouchableOpacity
                key={stadion.id}
                style={[styles.stadion, index === stadions.length - 1 && { borderBottomWidth: 0 }]}
                onPress={() =>
                  selectedStadionId === stadion.id
                    ? setSelectedStadionId(null)
                    : setSelectedStadionId(stadion.id)
                }>
                <View style={[styles.stadionView]}>
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
        </ScrollView>
      </View>
      <View style={styles.games}>
        {games?.map((game) => {
          return <Game key={game.id} game={game} />;
        })}
      </View> */}
      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background_blue,
    paddingBottom: 24,
  },
  stadions: {
    maxHeight: 230,
    paddingHorizontal: 9,
    paddingRight: 5,
    backgroundColor: COLORS.blue,
    borderTopWidth: 1,
    borderColor: COLORS.lightblue,
  },
  stadion: {
    paddingHorizontal: 7,
    paddingVertical: 18,
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 1,
    marginRight: 6,
  },
  stadionView: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  stadionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  stadionTextActive: {
    color: COLORS.lightblue,
  },
  games: {
    paddingHorizontal: 16,
    rowGap: 16,
  },
});

export default StadiumsSearch;
