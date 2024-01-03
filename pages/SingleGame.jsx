import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, View, Image, RefreshControl } from 'react-native';
import PrimaryText from '../components/PrimaryText';

import axios, { BASE_URL } from '../axios/axios';

import { COLORS } from '../helpers/colors';

import locationIcon from '../assets/images/location.png';
import GameNavigation from '../components/GameNavigation';

import loader from '../assets/images/loader.gif';

import { useTranslation } from 'react-i18next';

const SingleGame = ({ route }) => {
  const { t } = useTranslation();
  const { id } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [game, setGame] = useState(null);

  useLayoutEffect(() => {
    onRefresh();
  }, [id]);

  const onRefresh = useCallback(() => {
    setIsLoading(true);
    axios.get('/game/getOne/' + id).then(({ data }) => {
      setGame(data);
      setIsLoading(false);
    });
  }, [id]);

  return (
    <>
      {isLoading && (
        <View style={styles.loader}>
          <Image source={loader} />
        </View>
      )}
      {!isLoading && game && (
        <ScrollView
          style={styles.container}
          refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}>
          <ImageBackground source={{ uri: BASE_URL + game.stadion.img }} style={styles.image}>
            <View style={styles.info}>
              <View style={styles.priceView}>
                <PrimaryText style={styles.priceText} weight={600}>
                  {game.price} {t('common.amd')}
                  {t('game.per_person')}
                </PrimaryText>
              </View>
              <PrimaryText style={styles.title} weight={600}>
                {game.stadion.title}
              </PrimaryText>
              <View style={styles.addressView}>
                <Image source={locationIcon} width={24} height={24} />
                <PrimaryText style={styles.addressText}>{game.stadion.address}</PrimaryText>
              </View>
            </View>
          </ImageBackground>
          <GameNavigation game={game} />
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
  },
  image: {
    aspectRatio: 16 / 10,
    paddingTop: 16,
    paddingBottom: 14,
    position: 'relative',
  },
  info: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
  priceView: {
    backgroundColor: COLORS.green,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  priceText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    paddingVertical: 20,
    textAlign: 'center',
  },
  addressView: {
    alignItems: 'center',
    rowGap: 7,
  },
  addressText: {
    maxWidth: 180,
    textAlign: 'center',
    color: COLORS.lightWhite,
    fontSize: 16,
  },
  loader: {
    backgroundColor: COLORS.black,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SingleGame;
