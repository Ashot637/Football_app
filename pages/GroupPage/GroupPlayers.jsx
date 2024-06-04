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
import jwt from "expo-jwt";

import CrossIcon from "../../assets/images/cross.svg";
import { BASE_URL } from "../../axios/axios";
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice/authSlice";
import avatarImg from "../../assets/images/avatar.png";

const GroupPlayers = ({ route }) => {
  const { t } = useTranslation();
  const { id, title, players, isViewMode } = route.params;
  const { user } = useSelector(selectAuth);

  const currentUser = players.find((player) => player.id === user?.id);

  const onShare = async () => {
    try {
      const token = jwt.encode(
        { groupId: id, type: "GROUP" },
        "You never can guess this k3y"
      );
      const shareOptions = {
        message: BASE_URL + `ip?token=${token}`,
      };
      await Share.share(shareOptions);
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <>
      <ScrollView style={{ backgroundColor: COLORS.background_blue, flex: 1 }}>
        <Heading
          align="center"
          title={title + " " + t("common.players")}
          goBackButton
        />
        <View style={{ rowGap: 10, paddingHorizontal: 16, paddingBottom: 16 }}>
          {currentUser && (
            <View style={styles.player}>
              <View style={[styles.avatarView, styles.myAvatar]}>
                <Image
                  style={styles.avatar}
                  source={
                    currentUser.img ? { uri: BASE_URL + player.img } : avatarImg
                  }
                />
              </View>
              <View style={[styles.nameView, styles.me]}>
                <View style={styles.userInfo}>
                  <PrimaryText style={styles.name}>
                    {currentUser.name.length > 24
                      ? currentUser.name.slice(0, 24) + "..."
                      : currentUser.name}{" "}
                    ({t("common.me")})
                  </PrimaryText>
                </View>
              </View>
            </View>
          )}
          {players.map((player) => {
            if (player.id === user?.id) {
              return null;
            }
            return (
              <View style={styles.player} key={player.id}>
                <View
                  style={[
                    styles.avatarView,
                    player.id === user?.id && styles.myAvatar,
                  ]}
                >
                  <Image
                    style={styles.avatar}
                    source={
                      player.img ? { uri: BASE_URL + player.img } : avatarImg
                    }
                  />
                </View>
                <View
                  style={[styles.nameView, player.id === user?.id && styles.me]}
                >
                  <View style={styles.userInfo}>
                    <PrimaryText style={styles.name}>
                      {player.name.length > 28
                        ? player.name.slice(0, 28) + "..."
                        : player.name}{" "}
                    </PrimaryText>
                  </View>
                </View>
              </View>
            );
          })}
          {!players.length && (
            <PrimaryText style={{ fontSize: 18, color: COLORS.grey }}>
              {t("game.empty_players")}
            </PrimaryText>
          )}
        </View>
      </ScrollView>
      {!isViewMode && (
        <TouchableOpacity
          testID="invite-players-button"
          onPress={onShare}
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
              {t("game.invite_a_player")}
            </PrimaryText>
          </LinearGradient>
        </TouchableOpacity>
      )}
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

export default GroupPlayers;
