import { RefreshControl, ScrollView, View } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../../helpers/colors";
import Heading from "../../components/Heading";
import { useTranslation } from "react-i18next";
import DateFilterSection from "../../components/DateFilterSection";
import axios from "../../axios/axios";
import Game from "../../components/Game";
import PrimaryText from "../../components/PrimaryText";

const OpenGamesPage = () => {
  const { t } = useTranslation();
  const [games, setGames] = useState([]);
  const [date, setDate] = useState(null);

  useEffect(() => {
    onRefresh();
  }, [date]);

  const onRefresh = () => {
    if (date) {
      axios.get("/game/openGames?date=" + date).then(({ data }) => {
        setGames(data);
      });
    } else {
      axios.get("/game/openGames").then(({ data }) => {
        setGames(data);
      });
    }
  };

  return (
    <ScrollView
      style={{ backgroundColor: COLORS.background_blue }}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={onRefresh} />
      }
    >
      <View style={{ paddingHorizontal: 16 }}>
        <Heading title={t("home.open_games")} align="center" />
        <DateFilterSection onFilter={setDate} />
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
  );
};

export default OpenGamesPage;
