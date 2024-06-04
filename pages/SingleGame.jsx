import { useCallback, useLayoutEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  Image,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import PrimaryText from "../components/PrimaryText";

import axios, { BASE_URL } from "../axios/axios";

import { COLORS } from "../helpers/colors";

import locationIcon from "../assets/images/location.png";

import { useTranslation } from "react-i18next";

import BookNow from "../components/BookNow";
import Uniforms from "../components/Uniforms";
import Facilities from "../components/Facilities";
import GamePlayersList from "../components/GamePlayersList";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/authSlice/authSlice";
import PublicGame from "../components/PublicGame";
import PrivateGame from "../components/PrivateGame";

import InfoIcon from "../assets/images/info.svg";

const { width } = Dimensions.get("screen");

const SingleGame = ({ route, navigation }) => {
  const { t } = useTranslation();
  const { id, invitation, fromNotification } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [game, setGame] = useState(null);
  const { user } = useSelector(selectAuth);
  const [isOpenInfo, setIsOpenInfo] = useState(false);

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
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  paddingRight: 10,
                  width: "100%",
                  position: "absolute",
                  top: 10,
                }}
              >
                {userAlreadyBooked && isOpenInfo && (
                  <View
                    style={{
                      position: "absolute",
                      backgroundColor: "#0968CA",
                      left: 23,
                      top: -5,
                      width: width * 0.75,
                      borderRadius: 15,
                      padding: 10,
                      zIndex: 1,
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <View style={{ width: "100%" }}>
                      <PrimaryText
                        style={{
                          fontSize: 12,
                          color: "#fff",
                          textAlign: "center",
                        }}
                        weight={600}
                      >
                        {t("common.booking_number")}
                      </PrimaryText>
                      <PrimaryText
                        style={{
                          fontSize: 12,
                          color: "#fff",
                          textAlign: "center",
                        }}
                        weight={600}
                      >
                        {game.users.find((u) => u.id === user.id).UserGame.id}
                      </PrimaryText>
                    </View>
                    <View style={styles.triangle}></View>
                  </View>
                )}
                {userAlreadyBooked && (
                  <TouchableOpacity
                    onPress={() => setIsOpenInfo((prev) => !prev)}
                  >
                    <InfoIcon width={36} height={36} />
                  </TouchableOpacity>
                )}
              </View>
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
            {game.isPublic ? (
              <PublicGame game={game} invitation={invitation} />
            ) : (
              <PrivateGame
                game={game}
                invitation={invitation}
                fromNotification={fromNotification}
              />
            )}
          </ScrollView>
          {(userAlreadyBooked || !game.isPublic) && (
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 14,
                bottom: 9,
                alignItems: "flex-end",
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: "#B2BED7",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() =>
                navigation.navigate("chat", {
                  groupId: game.groupId,
                  groupTitle: game.group?.title,
                })
              }
            >
              <Image
                source={require("../assets/images/chat-icon.png")}
                style={{ width: 36, height: 36 }}
              />
            </TouchableOpacity>
          )}
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background_blue,
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
    backgroundColor: "#0968CA",
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
    backgroundColor: COLORS.background_blue,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    right: -10,
    transform: [
      {
        rotate: "90deg",
      },
    ],
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#0968CA",
  },
});

export default SingleGame;
