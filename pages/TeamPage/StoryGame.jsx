import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Share,
} from "react-native";
import React from "react";
import Heading from "../../components/Heading";
import { useTranslation } from "react-i18next";
import { COLORS } from "../../helpers/colors";
import { LinearGradient } from "expo-linear-gradient";
import PrimaryText from "../../components/PrimaryText";
// import jwt from "expo-jwt";

import CrossIcon from "../../assets/images/cross.svg";
import { BASE_URL } from "../../axios/axios";
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice/authSlice";
import avatarImg from "../../assets/images/avatar.png";

const StoryGame = () => {
  const { t } = useTranslation();
  return (
    <>
      <ScrollView style={{ backgroundColor: COLORS.background_blue, flex: 1 }}>
        <Heading align="center" title={t("team.story_game")} goBackButton />
        <View style={{ rowGap: 16, paddingHorizontal: 16, paddingBottom: 16 }}>
          <PrimaryText style={{ fontSize: 18, color: COLORS.grey }}>
            {t("team.opposing_team")}
          </PrimaryText>
        </View>
        {/* <View style={styles.player}> */}
        {/* <View style={[styles.avatarView, styles.myAvatar]}>
            <Image style={styles.avatar} source={avatarImg} />
          </View> */}
        {/* <View style={[styles.nameView, styles.me]}>
            <View style={styles.userInfo}>
              <PrimaryText style={styles.name}>Player Name</PrimaryText>
            </View>
          </View> */}
        {/* </View> */}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  players: {
    rowGap: 14,
    marginBottom: 14,
  },
  player: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  me: {
    backgroundColor: "#0D5454",
  },
  avatarView: {
    borderWidth: 3,
    borderRadius: 32,
    borderColor: "#2F4F4F",
  },
  myAvatar: {
    borderColor: "#0D5454",
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
  },
  nameView: {
    backgroundColor: "#2F4F4F",
    paddingVertical: 16,
    borderRadius: 30,
    width: "100%",
    right: 0,
    paddingLeft: 80,
    paddingRight: 12,
    zIndex: -1,
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfo: {
    rowGap: 2,
  },
  name: {
    fontSize: 18,
    color: COLORS.lightblue,
  },
});

export default StoryGame;
