import { useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";

import ConfirmationModal from "./ConfirmationModal";
import PrimaryText from "./PrimaryText";

import { COLORS } from "../helpers/colors";

import { BASE_URL } from "../axios/axios";
import { format } from "date-fns";
import avatarImg from "../assets/images/avatar.png";

import axios from "../axios/axios";

import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/authSlice/authSlice";

import yesIcon from "../assets/images/yes.png";
import noIcon from "../assets/images/no.png";

const PlayersList = ({
  players,
  maxPlayersCount,
  title,
  organizerId,
  isPublic,
  gameId,
  usersWillPlayCount: propsUsersWillPlayCount,
  usersWontPlayCount: propsUsersWontPlayCount,
}) => {
  const { t } = useTranslation();
  const { user } = useSelector(selectAuth);
  // const [isOpenModal, setIsOpenModal] = useState(false);
  // const [extendedGame, setExtendedGame] = useState();
  const [status, setStatus] = useState("");
  const [usersWillPlayCount, setUsersWillPlayCount] = useState(
    propsUsersWillPlayCount
  );
  const [usersWontPlayCount, setUsersWontPlayCount] = useState(
    propsUsersWontPlayCount
  );
  const currentUser = players.find((player) => player.id === user?.id);
  const willPlay = currentUser ? currentUser.UserGame.willPlay : false;

  const onChangeWillPlayGameStatus = (changeTo) => {
    if (changeTo === null) {
      const prevStatus = typeof status === "string" ? willPlay : status;
      axios.patch("/game/changeWillPlayGameStatus", {
        status: changeTo,
        id: gameId,
        prevStatus,
      });
      if (prevStatus) {
        setUsersWillPlayCount((prev) => --prev);
      } else {
        setUsersWontPlayCount((prev) => --prev);
      }
    } else {
      axios.patch("/game/changeWillPlayGameStatus", {
        status: changeTo,
        id: gameId,
      });
      if (changeTo) {
        setUsersWillPlayCount((prev) => ++prev);
      } else {
        setUsersWontPlayCount((prev) => ++prev);
      }
    }
    setStatus(changeTo);
  };

  const getIconsView = (player) => {
    let willPlay = player.UserGame.willPlay;
    if (typeof status !== "string" && player.id === user?.id) {
      willPlay = status;
    }

    if (willPlay === null && player.id === user?.id) {
      return (
        <View style={{ flexDirection: "row", columnGap: 10 }}>
          <TouchableOpacity onPress={() => onChangeWillPlayGameStatus(true)}>
            <Image source={yesIcon} style={{ width: 36, height: 36 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onChangeWillPlayGameStatus(false)}>
            <Image source={noIcon} style={{ width: 36, height: 36 }} />
          </TouchableOpacity>
        </View>
      );
    }
    if (willPlay === null) {
      return null;
    }
    if (willPlay) {
      return <Image source={yesIcon} style={{ width: 36, height: 36 }} />;
    }
    return <Image source={noIcon} style={{ width: 36, height: 36 }} />;
  };

  return (
    <>
      {/* {isOpenModal && (
        <ConfirmationModal
          state={isOpenModal}
          dismiss={() => setIsOpenModal(false)}
        >
          <PrimaryText style={styles.modalTitle}>
            {t("game.extended_successfully")}
          </PrimaryText>
          <PrimaryText style={styles.modalSubTitle} weight={600}>
            {t("common.dear") + " " + user.name} {t("game.extended_title")}{" "}
            {extendedGame && format(extendedGame.startTime, "dd.MM.yyyy")}
          </PrimaryText>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity onPress={() => setIsOpenModal(false)}>
              <View style={styles.modalButton}>
                <PrimaryText style={styles.btnText} weight={600}>
                  {t("common.understand")}
                </PrimaryText>
              </View>
            </TouchableOpacity>
          </View>
        </ConfirmationModal>
      )} */}
      <PrimaryText style={styles.title} weight={600}>
        {t(title)}
      </PrimaryText>
      <View style={styles.players}>
        {currentUser && (
          <View>
            <View style={styles.player}>
              <View style={[styles.avatarView, styles.myAvatar]}>
                <Image
                  style={styles.avatar}
                  source={
                    currentUser.img
                      ? { uri: BASE_URL + currentUser.img }
                      : avatarImg
                  }
                />
              </View>
              <View style={[styles.nameView, styles.me]}>
                <View style={styles.userInfo}>
                  <PrimaryText style={styles.name}>
                    {currentUser.name.length > 12
                      ? currentUser.name.slice(
                          0,
                          (typeof status === "string" ? willPlay : status) !==
                            null
                            ? 12
                            : 10
                        ) + "..."
                      : currentUser.name}{" "}
                    ({t("common.me")})
                  </PrimaryText>
                  {user?.id === organizerId && (
                    <PrimaryText style={styles.phone}>
                      {currentUser.phone}
                    </PrimaryText>
                  )}
                </View>
                {getIconsView(currentUser)}
              </View>
            </View>
            {(typeof status === "string" ? willPlay : status) !== null && (
              <View style={{ alignItems: "flex-end" }}>
                <TouchableOpacity
                  onPress={() => onChangeWillPlayGameStatus(null)}
                >
                  <PrimaryText weight={600} style={styles.retract}>
                    {t("poll.retract")}
                  </PrimaryText>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
        {players.map((player) => {
          if (player.id === user?.id) return null;
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
                    {player.name.length > 24
                      ? player.name.slice(0, 24) + "..."
                      : player.name}{" "}
                  </PrimaryText>
                  {user?.id === organizerId && (
                    <PrimaryText style={styles.phone}>
                      {player.phone}
                    </PrimaryText>
                  )}
                </View>
                {getIconsView(player)}
              </View>
            </View>
          );
        })}
      </View>
      {maxPlayersCount < 30 && (
        <PrimaryText style={styles.playersLeft}>
          {t("game.only_x_players_left", {
            count: maxPlayersCount - players.length,
          })}
        </PrimaryText>
      )}
      {!isPublic && (
        <View
          style={{
            paddingVertical: 32,
            marginTop: 10,
            marginBottom: 32,
            borderColor: "#B2BED7",
            borderBottomWidth: 1,
            borderTopWidth: 1,
          }}
        >
          <PrimaryText style={styles.pollTitle} weight={600}>
            {t("poll.title")}
          </PrimaryText>
          <View style={styles.poll}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 4,
              }}
            >
              <View style={[styles.barBg, { backgroundColor: "#0968CA80" }]}>
                <View
                  style={[
                    styles.bar,
                    {
                      backgroundColor: "#0968CA",
                      width: `${(usersWillPlayCount / players.length) * 100}%`,
                    },
                  ]}
                ></View>

                <PrimaryText
                  weight={600}
                  style={{ fontSize: 20, position: "absolute", left: 15 }}
                >
                  {t("common.yes")}
                </PrimaryText>
                <PrimaryText weight={600} style={styles.votes}>
                  {usersWillPlayCount} {t("poll.votes")}
                </PrimaryText>
              </View>
              <PrimaryText
                weight={600}
                style={{
                  fontSize: 20,
                  color: COLORS.lightWhite,
                  width: 55,
                  textAlign: "right",
                }}
              >
                {((usersWillPlayCount / players.length || 0) * 100).toFixed(0)}{" "}
                %
              </PrimaryText>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 4,
              }}
            >
              <View style={[styles.barBg, { backgroundColor: "#F8EEFF80" }]}>
                <View
                  style={[
                    styles.bar,
                    {
                      backgroundColor: "#F8EEFF",
                      width: `${
                        (usersWontPlayCount / players.length || 0) * 100
                      }%`,
                    },
                  ]}
                ></View>
                <PrimaryText weight={600} style={styles.votes}>
                  {usersWontPlayCount} {t("poll.votes")}
                </PrimaryText>
              </View>
              <PrimaryText
                weight={600}
                style={{ fontSize: 20, position: "absolute", left: 15 }}
              >
                {t("common.no")}
              </PrimaryText>
              <PrimaryText
                style={{
                  fontSize: 20,
                  color: COLORS.lightWhite,
                  width: 55,
                  textAlign: "right",
                }}
              >
                {((usersWontPlayCount / players.length) * 100).toFixed(0)} %
              </PrimaryText>
            </View>
          </View>
        </View>
      )}
      {/* <View style={styles.buttons}>
        {organizerId === user?.id && (
          <TouchableOpacity onPress={onExtendGame} style={styles.extend}>
            <PrimaryText style={styles.extendTitle} weight={400}>
              {t("game.extend")}
            </PrimaryText>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[
            styles.inviteButton,
            organizerId !== user?.id && { width: "100%" },
          ]}
          onPress={onShare}
        >
          <PrimaryText weight={400} style={styles.invite}>
            {t("game.invite_players")}
          </PrimaryText>
        </TouchableOpacity>
      </View> */}
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 12,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "600",
    color: COLORS.lightWhite,
  },
  pollTitle: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "600",
    color: COLORS.lightWhite,
  },
  retract: {
    color: COLORS.lightblue,
    fontSize: 16,
  },
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
    backgroundColor: "#4606AF",
  },
  avatarView: {
    borderWidth: 3,
    borderRadius: 32,
    borderColor: "#4606AF",
  },
  myAvatar: {
    borderColor: "#4606AF",
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
  },
  nameView: {
    backgroundColor: "#2F4F4F",
    borderRadius: 14,
    paddingVertical: 8,
    width: "90%",
    right: 0,
    paddingLeft: 45,
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
  phone: {
    fontSize: 14,
    color: COLORS.lightWhite,
  },
  guests: {
    color: "#F0FFF0",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 14,
  },
  playersLeft: {
    fontStyle: "italic",
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 14,
  },
  uniforms: {
    marginLeft: "auto",
    marginRight: 12,
    flexDirection: "row",
    columnGap: 12,
  },
  uniform: {
    width: 24,
    height: 24,
  },
  modalTitle: {
    fontSize: 18,
    textAlign: "center",
    color: COLORS.lightWhite,
    marginBottom: 10,
  },
  modalSubTitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
    marginBottom: 16,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.lightYellow,
    borderRadius: 15,
  },
  btnText: {
    color: COLORS.black,
    fontSize: 18,
  },
  inviteButton: {
    width: "48%",
    backgroundColor: "#acad28",
    borderWidth: 1.5,
    borderColor: COLORS.yellow,
    borderRadius: 15,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  invite: {
    fontSize: 18,
    color: COLORS.yellow,
  },
  extend: {
    width: "48%",
    backgroundColor: COLORS.green,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  extendTitle: {
    fontSize: 18,
    color: "#fff",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  poll: {
    borderRadius: 30,
    backgroundColor: "#031852",
    paddingVertical: 20,
    paddingHorizontal: 14,
    rowGap: 12,
    marginBottom: 10,
  },
  barBg: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 38,
    borderRadius: 50,
    position: "relative",
  },
  bar: {
    borderRadius: 150,
    height: 38,
    justifyContent: "center",
    width: "50%",
  },
  votes: {
    position: "absolute",
    right: 15,
    fontSize: 12,
  },
});

export default PlayersList;
