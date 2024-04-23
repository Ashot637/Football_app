import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import PrimaryText from '../../components/PrimaryText';

import i18n from '../../languages/i18n';
import { useTranslation } from 'react-i18next';

import { COLORS } from '../../helpers/colors';

import axios from '../../axios/axios';
import Game from '../../components/Game';
import { useCallback, useEffect, useState } from 'react';

const FavoriteGames = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [selectedType, setSelectedType] = useState(2);

  useEffect(() => {
    onRefresh();
  }, [selectedType, i18n.language]);

  const onRefresh = useCallback(() => {
    setIsLoading(true);
    if (selectedType === 0) {
      axios.get('/game/getAllCreated').then(({ data }) => {
        setGames(data);
        setIsLoading(false);
      });
    } else if (selectedType === 1) {
      axios.get('/game/getUpcomings').then(({ data }) => {
        setGames(data);
        setIsLoading(false);
      });
    } else {
      axios.get('/game/getAllGroupGames').then(({ data }) => {
        setGames(data);
        setIsLoading(false);
      });
    }
  });

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}>
      <PrimaryText style={styles.title} weight={600}>
        {t('home.choose_variant')}
      </PrimaryText>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.dates}>
          <TouchableOpacity onPress={() => setSelectedType(2)}>
            <View
              style={[
                styles.dateView,
                selectedType === 2 && styles.dateViewActive,
                { marginLeft: 16 },
              ]}>
              <PrimaryText
                style={[styles.dateText, selectedType === 2 && styles.dateTextActive]}
                weight={600}>
                {t('game.group_games')}
              </PrimaryText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedType(1)}>
            <View style={[styles.dateView, selectedType === 1 && styles.dateViewActive]}>
              <PrimaryText
                style={[styles.dateText, selectedType === 1 && styles.dateTextActive]}
                weight={600}>
                {t('game.booked_spots')}
              </PrimaryText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedType(0)}>
            <View style={[styles.dateView, selectedType === 0 && styles.dateViewActive]}>
              <PrimaryText
                style={[styles.dateText, selectedType === 0 && styles.dateTextActive]}
                weight={600}>
                {t('game.my_game_creations')}
              </PrimaryText>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <PrimaryText style={styles.title} weight={600}>
        {t('home.available_stadiums')}
      </PrimaryText>
      {isLoading && (
        <View style={styles.loader}>
          <ActivityIndicator
            size={'large'}
            style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
            color={COLORS.yellow}
          />
        </View>
      )}
      <View style={styles.games}>
        {!isLoading &&
          games?.map((game) => {
            return <Game key={game.id} game={game} />;
          })}
      </View>
      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background_blue,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
    paddingLeft: 16,
  },
  dates: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    columnGap: 8,
    marginBottom: 32,
  },
  dateView: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 40,
    height: 'auto',
  },
  dateText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  dateViewActive: {
    borderColor: COLORS.lightblue,
    backgroundColor: COLORS.blue,
  },
  dateTextActive: {
    color: COLORS.lightblue,
  },
  games: {
    paddingHorizontal: 16,
    rowGap: 16,
  },
  loader: {
    flex: 1,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreen: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: COLORS.darkBlue,
  },
  addGame: {
    width: 60,
    height: 60,
    position: 'absolute',
    right: 21,
    // bottom: 24,
    borderRadius: 30,
    backgroundColor: COLORS.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FavoriteGames;
