import { TouchableOpacity, View, Share } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import PrimaryText from "./PrimaryText";
import { useTranslation } from "react-i18next";
import Uniforms from "./Uniforms";
import Facilities from "./Facilities";
import { COLORS } from "../helpers/colors";
import PlayersList from "./PlayersList";
import PrimaryButton from "./PrimaryButton";
import axios, { BASE_URL } from "../axios/axios";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/authSlice/authSlice";
import jwt from "expo-jwt";

const PublicGame = ({ game, invitation }) => {
  const { t } = useTranslation();
  const { user } = useSelector(selectAuth);
  // const [uniforms, setUniforms] = useState([]);
  const bookedUser = useMemo(() => {
    return game.users.find((player) => player.id === user?.id);
  }, [game, user]);
  const navigation = useNavigation();

  // useEffect(() => {
  //   if (bookedUser) {
  //     setUniforms(bookedUser.UserGame.uniforms);
  //   }
  // }, [bookedUser]);

  const onBook = () => {
    axios
      // .post("/game/register/" + game.id, {
      //   uniforms: uniforms,
      // })
      .post("/game/register/" + game.id)
      .then(({ data }) => {
        if (data.success) {
          navigation.navigate("success", {
            game,
            confirmationNumber: data.userGame.id,
          });
        } else {
          console.error("Something went wrong");
        }
      });
  };

  const onLeave = () => {
    axios.post("/game/cancel/" + game.id).then(() => {
      navigation.navigate("cancel");
    });
  };

  const onShare = async () => {
    try {
      const token = jwt.encode(
        {
          from: user.name,
          groupId: game.groupId,
          gameId: game.id,
          type: "GAME",
        },
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

  const onCancelInvitation = () => {
    axios.post("/game/declineInvitation", { id: invitation.id });
    navigation.navigate("home");
  };

  const onConfirmInvitation = async () => {
    await axios.post("/game/acceptInvitation", {
      id: invitation.id,
    });
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
              marginBottom: 12,
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
      {invitation ? (
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
      ) : bookedUser ? (
        <>
          <TouchableOpacity onPress={onLeave}>
            <PrimaryText
              style={{
                color: COLORS.cyan,
                fontSize: 18,
                textAlign: "center",
                marginBottom: 24,
              }}
            >
              {t("game.leave")}
            </PrimaryText>
          </TouchableOpacity>
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
      ) : (
        <PrimaryButton
          disabled={game.playersCount === game.maxPlayersCount}
          onPress={onBook}
          title={t("game.book_now")}
        />
      )}
    </View>
  );
};

export default PublicGame;
