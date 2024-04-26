import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import React from "react";
import Heading from "../../components/Heading";
import { useTranslation } from "react-i18next";
import { COLORS } from "../../helpers/colors";
import Game from "../../components/Game";
import { LinearGradient } from "expo-linear-gradient";
import PrimaryText from "../../components/PrimaryText";

import icon from "../../assets/images/call.png";
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice/authSlice";

const GroupGames = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { user } = useSelector(selectAuth);

  const { id, title, games, isViewMode, ownerId } = route.params;
  return (
    <>
      <ScrollView style={{ backgroundColor: COLORS.background_blue, flex: 1 }}>
        <Heading align="center" title={title + " " + t("common.games")} />
        <View style={{ rowGap: 16, paddingHorizontal: 16, paddingBottom: 16 }}>
          {games.map((game) => {
            return <Game title={title} key={game.id} game={game} disabled={isViewMode} />;
          })}
          {!games.length && (
            <PrimaryText style={{ fontSize: 18, color: COLORS.grey }}>
              {t("game.empty_games")}
            </PrimaryText>
          )}
        </View>
      </ScrollView>
      {!isViewMode && user?.id === ownerId && (
        <TouchableOpacity
          onPress={() => navigation.navigate("create-game", { groupId: id })}
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
            <Image source={icon} />
            <PrimaryText style={{ color: COLORS.darkgrey }}>
              {t("create_game.create")}
            </PrimaryText>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </>
  );
};

export default GroupGames;
