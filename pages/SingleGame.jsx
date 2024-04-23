import { useCallback, useLayoutEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  Image,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import PrimaryText from "../components/PrimaryText";

import axios, { BASE_URL } from "../axios/axios";

import { COLORS } from "../helpers/colors";

import locationIcon from "../assets/images/location.png";
import GameNavigation from "../components/GameNavigation";

import { useTranslation } from "react-i18next";

import BookNow from "../components/BookNow";
import Uniforms from "../components/Uniforms";
import Facilities from "../components/Facilities";
import GamePlayersList from "../components/GamePlayersList";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/authSlice/authSlice";
import ActionButton from "react-native-action-button";

const SingleGame = ({ route, navigation }) => {
  const { t } = useTranslation();
  const { id } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [game, setGame] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { user } = useSelector(selectAuth);

  useLayoutEffect(() => {
    onRefresh();
  }, [route]);

  const onRefresh = useCallback(() => {
    setIsLoading(true);
    axios.get("/game/getOne/" + id).then(({ data }) => {
      setGame(data);
      setIsLoading(false);
    });
  }, [id]);

  const displayView = (index) => {
    switch (index) {
      case 0:
        return <BookNow game={game} />;
      case 1:
        return <GamePlayersList game={game} />;
      case 2:
        return <Uniforms game={game} />;
      case 3:
        return <Facilities facilities={game.stadion.facilities} />;
    }
  };

  const userAlreadyBooked =
    game?.users.findIndex((gameUser) => gameUser.id === user?.id) > -1;

  return (
    <>
      {isLoading && (
        <View style={styles.loader}>
          <ActivityIndicator
            size={"large"}
            style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
            color={COLORS.yellow}
          />
        </View>
      )}
      {!isLoading && game && (
        <>
          <ScrollView
            style={styles.container}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
            }
          >
            <ImageBackground
              source={{ uri: BASE_URL + game.stadion.img }}
              style={styles.image}
            >
              <View style={styles.info}>
                {!!game.price && (
                  <View style={styles.priceView}>
                    <PrimaryText style={styles.priceText} weight={600}>
                      {game.price} {t("common.amd")}
                      {t("game.per_person")}
                    </PrimaryText>
                  </View>
                )}
                <PrimaryText style={styles.title} weight={600}>
                  {game.stadion.title}
                </PrimaryText>
                <View style={styles.addressView}>
                  <Image source={locationIcon} width={24} height={24} />
                  <PrimaryText style={styles.addressText}>
                    {game.stadion.address}
                  </PrimaryText>
                </View>
              </View>
            </ImageBackground>
            <GameNavigation
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              hideIndex={game?.isPublic ? userAlreadyBooked && 0 : 0}
            >
              {displayView(activeIndex)}
            </GameNavigation>
          </ScrollView>
          {(userAlreadyBooked || !game.isPublic) && (
            <ActionButton
              buttonColor={"#A5CBC3"}
              style={{ borderRadius: 30 }}
              renderIcon={() => {
                return (
                  <Image
                    source={require("../assets/images/chat-icon.png")}
                    style={{ width: 36, height: 36 }}
                  />
                );
              }}
              onPress={() =>
                navigation.navigate("chat", {
                  groupId: game.groupId,
                  groupTitle: game.stadion.title_en,
                })
              }
            ></ActionButton>
          )}
        </>
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
    position: "relative",
  },
  info: {
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
  },
  priceView: {
    backgroundColor: COLORS.green,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  priceText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    paddingVertical: 20,
    textAlign: "center",
  },
  addressView: {
    alignItems: "center",
    rowGap: 7,
  },
  addressText: {
    maxWidth: 200,
    textAlign: "center",
    color: COLORS.lightWhite,
    fontSize: 16,
  },
  loader: {
    backgroundColor: COLORS.black,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SingleGame;
