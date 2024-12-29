import {
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Share,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import { useTranslation } from "react-i18next";
import { COLORS } from "../../helpers/colors";
import Game from "../../components/Game";
import { LinearGradient } from "expo-linear-gradient";
import PrimaryText from "../../components/PrimaryText";
import jwt from "expo-jwt";
import { BASE_URL } from "../../axios/axios";
import CrossIcon from "../../assets/images/cross.svg";
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice/authSlice";
import avatarImg from "../../assets/images/avatar.png";
import InvitationModal from "./InvitationTeam";
import axios from "../../axios/axios";

const TeamPlayers = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { user } = useSelector(selectAuth);
  const [isOpenActions, setisOpenActions] = useState(false);
  const { title, userId, teamId, isViewMode } = route.params;
  const [showInvitationModal, setShowInvitationModal] = useState(false);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // const isTeamBuilder = userId === user?.id;
  //   const currentUser = players.find((player) => player.id === user?.id);
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(`/team/getUsers?teamId=${teamId}`);
        console.log("Fetched players data:", response.data);
        setPlayers(response.data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    if (teamId) {
      fetchPlayers();
    }
  }, [teamId]);

  const currentUser = {
    name: user?.name || "Guest User",
    img: user?.img || avatarImg,
  };

  // console.log("TeamPlayers Route Params:", { teamId, title, userId });
  const onShare = async () => {
    try {
      const token = jwt.encode(
        { teamId: teamId, type: "TEAM" },

        "You never can guess this k3y"
      );
      console.log("link:", { teamId, title });

      // console.log("Generated Token:", token);

      const shareOptions = {
        message: BASE_URL + `team-invite?token=${token}`,
      };
      console.log(" invite link:", shareOptions);
      await Share.share(shareOptions);
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <>
      <ScrollView style={{ backgroundColor: COLORS.background_blue, flex: 1 }}>
        <Heading align="center" title={t("common.players")} goBackButton />
        <View style={{ rowGap: 16, paddingHorizontal: 16, paddingBottom: 16 }}>
          {/* <PrimaryText style={{ fontSize: 18, color: COLORS.grey }}>
            {t("team.game")}
          </PrimaryText> */}

          <View
            style={{ rowGap: 10, paddingHorizontal: 16, paddingBottom: 16 }}
          >
            <View style={styles.player}>
              <View style={[styles.avatarView, styles.myAvatar]}>
                <Image style={styles.avatar} source={avatarImg} />
              </View>
              <View style={[styles.nameView, styles.me]}>
                <View style={styles.userInfo}>
                  <PrimaryText style={styles.name}>
                    {currentUser.name}({t("common.me")})
                    {/* {currentUser.name.length > 24
                      ? currentUser.name.slice(0, 24) + "..."
                      : currentUser.name}{" "}
                    ({t("common.me")}) */}
                    {/* {isTeamBuilder ? players : t("common.me")} */}
                  </PrimaryText>
                </View>
              </View>
            </View>
          </View>
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
export default TeamPlayers;
