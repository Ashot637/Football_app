import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import PrimaryText from '../components/PrimaryText';

import { addDays, format } from 'date-fns';

import { COLORS } from '../helpers/colors';

import axios from '../axios/axios';
import Game from '../components/Game';

import { useTranslation } from 'react-i18next';
import i18n from '../languages/i18n';

const currentDate = new Date();

const formatDate = (date) => ({
  date,
  weekDay: format(date, 'EEEE'),
  month: format(date, 'MMMM'),
  day: format(date, 'dd'),
});

const dates = [
  {
    title: 'date.today',
    date: currentDate,
  },
  {
    title: 'date.tomorrow',
    date: addDays(currentDate, 1),
  },
  formatDate(addDays(currentDate, 2)),
  formatDate(addDays(currentDate, 3)),
  formatDate(addDays(currentDate, 4)),
  formatDate(addDays(currentDate, 5)),
  formatDate(addDays(currentDate, 6)),
];

const HomePage = ({ route }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    onRefresh();
  }, [selectedDate, i18n.language]);

  useEffect(() => {
    if (route.params?.refresh) {
      onRefresh();
    }
  }, [route.params?.refresh]);

  const onRefresh = useCallback(() => {
    setIsLoading(true);
    axios.get('/game/getAll', { params: { date: selectedDate || null } }).then(({ data }) => {
      setGames(data);
      setIsLoading(false);
    });
  });

  return (
    <>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={isLoading && !selectedDate} onRefresh={onRefresh} />
        }>
        <PrimaryText style={styles.title} weight={600}>
          {t('home.choose_date')}
        </PrimaryText>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.dates}>
            {dates.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    selectedDate === item.date ? setSelectedDate(null) : setSelectedDate(item.date)
                  }>
                  <View
                    style={[
                      styles.dateView,
                      selectedDate === item.date && styles.dateViewActive,
                      !index && { marginLeft: 16 },
                    ]}>
                    <PrimaryText
                      style={[styles.dateText, selectedDate === item.date && styles.dateTextActive]}
                      weight={600}>
                      {item.title
                        ? t(item.title)
                        : t(`date.week.${item.weekDay}`) +
                          ' ' +
                          item.day +
                          ' ' +
                          t(`date.month.${item.month}`)}
                    </PrimaryText>
                  </View>
                </TouchableOpacity>
              );
            })}
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
    </>
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
    backgroundColor: COLORS.darkgrey,
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
});

export default HomePage;
