import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import PrimaryText from '../components/PrimaryText';
import ActionButton from 'react-native-action-button';

import { COLORS } from '../helpers/colors';

import FavoriteGames from './FavoriteGames/FavoriteGames';
import { useNavigation } from '@react-navigation/native';
import AveilableGames from './AveilableGames';
import { useTranslation } from 'react-i18next';
import Invitation from '../components/Invitation';

const HomePage = () => {
  const { t } = useTranslation();
  const [selectedStadiumsType, setSelectedStadiumsType] = useState(0);
  const navigation = useNavigation();

  return (
    <>
      <Invitation />
      {/* <ChooseRole /> */}
      <View style={[styles.dates]}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => setSelectedStadiumsType(0)}>
            <View
              style={[
                styles.dateView,
                !selectedStadiumsType && {
                  borderColor: COLORS.yellow,
                  backgroundColor: COLORS.darkgrey,
                },
                { marginLeft: 16 },
                { marginRight: 8 },
              ]}>
              <PrimaryText
                style={[styles.dateText, !selectedStadiumsType && { color: COLORS.yellow }]}
                weight={600}>
                {t('game.available_games')}
              </PrimaryText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => setSelectedStadiumsType(1)}>
            <View
              style={[
                styles.dateView,
                selectedStadiumsType && {
                  borderColor: COLORS.yellow,
                  backgroundColor: COLORS.darkgrey,
                },
              ]}>
              <PrimaryText
                style={[styles.dateText, selectedStadiumsType && { color: COLORS.yellow }]}
                weight={600}>
                {t('game.favorite_games')}
              </PrimaryText>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {!selectedStadiumsType ? <AveilableGames /> : <FavoriteGames />}
      {!!selectedStadiumsType && (
        <ActionButton
          buttonColor={COLORS.green}
          style={{ borderRadius: 30 }}
          onPress={() => navigation.navigate('create')}></ActionButton>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
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
    backgroundColor: COLORS.black,
    paddingBottom: 32,
    paddingTop: 24,
  },
  dateView: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 40,
  },
  dateText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
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
