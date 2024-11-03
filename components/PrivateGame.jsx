import { TouchableOpacity, View, Share } from "react-native";
import React, { useState } from "react";
import Facilities from "./Facilities";
import { COLORS } from "../helpers/colors";
import PrimaryText from "./PrimaryText";
import { useTranslation } from "react-i18next";
import PlayersList from "./PlayersList";
import jwt from "expo-jwt";
import { BASE_URL } from "../axios/axios";
import CheckBox from "./CheckBox";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/authSlice/authSlice";
import { useNavigation } from "@react-navigation/native";

import axios from "../axios/axios";
import Uniforms from "./Uniforms";
const PrivateGame = ({ game, invitation, fromNotification }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [isGame, setIsGame] = useState(false);
  const { user } = useSelector(selectAuth);

  const onShare = async () => {
    try {
      const token = jwt.encode(
        {
          from: user.name,
          groupId: game.groupId,
          gameId: game.id,
          type: !isGame ? "PRIVATE_GAME" : "GROUP",
        },
        "You never can guess this k3y"
      );
      const shareOptions = {
        message: BASE_URL + `ip?token=${token}`,
      };


//       const shareOptions = {
//   message: `${BASE_URL}ip?token=${token}&gameId=${game.id}`,
// };

      await Share.share(shareOptions);
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const onCancelInvitation = () => {
    if (!fromNotification) {
      axios.post("/game/declineInvitation", { id: invitation.id });
    }
    navigation.navigate("home");
  };

  const onConfirmInvitation = async () => {
    if (fromNotification) {
      await axios.post("/game/joinToPrivateGame", {
        id: game.id,
        withGroup: fromNotification.withGroup,
        notificationId: fromNotification.notificationId,
      });
    } else {
      await axios.post("/game/acceptInvitation", {
        id: invitation.id,
      });
    }
    navigation.navigate("game", { id: game.id, refresh: Math.random() });
  };

  return (
    <View style={{ paddingTop: 32, paddingBottom: 20, paddingHorizontal: 16 }}>
      {!!game.uniforms?.indexes.length && (
        <View
          style={{
            paddingBottom: 32,
            marginBottom: 32,
            borderColor: "#B2BED7",
            borderBottomWidth: 1,
          }}
        >
          <PrimaryText
            weight={600}
            style={{
              color: COLORS.lightWhite,
              marginBottom: 20,
              fontSize: 20,
              textAlign: "center",
            }}
          >
            {t("game.uniforms")}
          </PrimaryText>
          <Uniforms uniforms={game.uniforms.indexes} />
        </View>
      )}
      {!!game.stadion?.facilities.length && (
        <View
          style={{
            paddingBottom: 32,
            marginBottom: 32,
            borderColor: "#B2BED7",
            borderBottomWidth: 1,
          }}
        >
          <PrimaryText
            weight={600}
            style={{
              color: COLORS.lightWhite,
              marginBottom: 12,
              fontSize: 20,
              textAlign: "center",
            }}
          >
            {t("game.facilities")}
          </PrimaryText>
          <Facilities facilities={game.stadion.facilities} />
        </View>
      )}
      <PlayersList
        players={game.users}
        maxPlayersCount={game.maxPlayersCount}
        title={"common.players"}
        organizerId={game.creatorId}
        groupId={game.groupId}
        isPublic={game.isPublic}
        gameId={game.id}
        usersWillPlayCount={game.usersWillPlayCount}
        usersWontPlayCount={game.usersWontPlayCount}
      />
      {invitation || fromNotification ? (
        <View
          style={{
            paddingHorizontal: 16,
            paddingBottom: 20,
            flexDirection: "row",
            alignItems: "stretch",
            columnGap: 20,
          }}
        >
          <TouchableOpacity
            onPress={onCancelInvitation}
            style={{
              flex: 1,
              backgroundColor: "#E1D4F766",
              borderWidth: 1.5,
              borderColor: COLORS.lightWhite,
              borderRadius: 15,
              height: 60,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PrimaryText
              weight={600}
              style={{ fontSize: 20, color: COLORS.lightWhite }}
            >
              {t("common.cancel")}
            </PrimaryText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onConfirmInvitation}
            style={{
              flex: 1,
              backgroundColor: COLORS.cyan,
              borderColor: COLORS.cyan,
              borderRadius: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PrimaryText weight={600} style={{ fontSize: 20 }}>
              {t("common.accept")}
            </PrimaryText>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 24,
            }}
          >
            <PrimaryText style={{ fontSize: 19, color: COLORS.lightWhite }}>
              {t("game.invite_to_group")}
            </PrimaryText>
            <CheckBox
              state={isGame}
              setState={() => setIsGame((prev) => !prev)}
            />
          </View>
          <TouchableOpacity
            style={{
              borderRadius: 15,
              flex: 1,
              borderWidth: 1,
              borderColor: "#E1D4F7",
              paddingVertical: 20,
              background: "#E4CFFF33",
            }}
            onPress={onShare}
          >
            <PrimaryText
              weight={600}
              style={{ color: "#E1D4F7", fontSize: 18, textAlign: "center" }}
            >
              {t("game.invite_players")}
            </PrimaryText>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default PrivateGame;



