import {
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../../helpers/colors";
import Heading from "../../components/Heading";
import { useTranslation } from "react-i18next";
import DateFilterSection from "../../components/DateFilterSection";
import axios from "../../axios/axios";
import Game from "../../components/Game";
import PrimaryText from "../../components/PrimaryText";
import { LinearGradient } from "expo-linear-gradient";

import CrossIcon from "../../assets/images/cross.svg";
const MyGamesPage = ({ navigation }) => {
  const { t } = useTranslation();
  const [games, setGames] = useState([]);
  const [date, setDate] = useState(null);
  const [events, setEvents] = useState(null);

  useEffect(() => {
    onRefresh();
  }, [date]);

  const onRefresh = () => {
    if (date) {
      axios.get("/game/myGames?date=" + date).then(({ data }) => {
        setGames(data);
      });
    } else {
      axios.get("/game/myGames").then(({ data }) => {
        setGames(data);
        if (!events) {
          setEvents(data.map((game) => game.startTime));
        }
      });
    }
  };

  return (
    <>
      <ScrollView
        style={{ backgroundColor: COLORS.background_blue }}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
      >
        <View style={{ paddingHorizontal: 16 }}>
          <Heading title={t("home.my_games")} align="center" />
          <DateFilterSection onFilter={setDate} events={events} />
          <View style={{ rowGap: 16, addingBottom: 16 }}>
            {games.map((game) => {
              return <Game key={game.id} game={game} />;
            })}
            {!games.length && (
              <PrimaryText style={{ fontSize: 18, color: COLORS.grey }}>
                {t("game.empty_games")}
              </PrimaryText>
            )}
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate("create-game")}
        style={{
          position: "absolute",
          right: 14,
          bottom: 17,
        }}
      >
        <LinearGradient
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          colors={["#0DDDD5", "#68F4E4"]}
          style={{
            flexDirection: "row",
            alignItems: "center",
            columnGap: 10,
            paddingVertical: 14,
            paddingHorizontal: 19,
            borderRadius: 40,
          }}
        >
          <CrossIcon width={20} height={20} />
          <PrimaryText style={{ color: COLORS.darkgrey }}>
            {t("create_game.create")}
          </PrimaryText>
        </LinearGradient>
      </TouchableOpacity>
    </>
  );
};

export default MyGamesPage;
