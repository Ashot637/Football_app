import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import PrimaryText from "./PrimaryText";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFirstInvitation,
  selectAuth,
  setUser,
} from "../redux/authSlice/authSlice";
import { COLORS } from "../helpers/colors";
import { useTranslation } from "react-i18next";

import axios from "../axios/axios";
import { format } from "date-fns";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const Invitation = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuth);

  const onConfirm = () => {
    navigation.navigate("main", {
      screen: "game",
      params: {
        id: user.invitations[0].gameId,
        invitation: user?.invitations[0],
      },
    });
    dispatch(deleteFirstInvitation());
  };

  const onCancel = () => {
    axios.post("/game/declineInvitation", { id: user.invitations[0].id });
    dispatch(deleteFirstInvitation());
  };

  useEffect(() => {
    if (user?.invitations) {
      if (user?.invitations[0]?.type === "GROUP") {
        if (user?.invitations[0]?.hasGroup) {
          navigation.navigate("group", {
            id: user.invitations[0].groupId,
          });
          axios.post("/game/declineInvitation", { id: user.invitations[0].id });
        } else {
          navigation.navigate("group", {
            id: user.invitations[0].groupId,
            invitation: user.invitations[0],
          });
        }
      } else if (user?.invitations[0]?.hasGame) {
        navigation.navigate("main", {
          screen: "game",
          params: { id: user.invitations[0].gameId },
        });
        axios.post("/game/declineInvitation", { id: user.invitations[0].id });
      }
      dispatch(deleteFirstInvitation());
    }
  }, [user?.invitations?.[0]]);

  return (
    !!user?.invitations?.length &&
    user?.invitations?.[0]?.startTime && (
      <Modal visible transparent>
        <View style={styles.overlay}>
          <View style={styles.content}>
            <PrimaryText style={styles.title}>
              {t("invitation.title")}
            </PrimaryText>
            <PrimaryText style={styles.info} weight={600}>
              {t("invitation.info", {
                name: user.name,
                from: user.invitations[0].from,
                date: format(
                  user.invitations[0]?.startTime,
                  "dd.MM.yyyy HH:hh"
                ),
                stadion: user.invitations[0]?.stadion,
              })}
            </PrimaryText>
            <View style={styles.modalBtns}>
              <TouchableOpacity onPress={onCancel} style={{ flex: 6 }}>
                <View style={styles.cancelBtn}>
                  <PrimaryText style={styles.btnText} weight={600}>
                    {t("common.cancel")}
                  </PrimaryText>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={onConfirm} style={{ flex: 8 }}>
                <View style={styles.submitbtn}>
                  <PrimaryText
                    style={[styles.btnText, { color: "#fff" }]}
                    weight={600}
                  >
                    {t("common.see_more")}
                  </PrimaryText>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  );
};

const styles = StyleSheet.create({
  overlay: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    width: "100%",
    backgroundColor: COLORS.black,
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: COLORS.yellow,
    paddingVertical: 32,
    paddingHorizontal: 10,
  },
  title: {
    marginBottom: 24,
    color: "#fff",
    fontSize: 22,
    textAlign: "center",
  },
  info: {
    fontSize: 16,
    color: COLORS.lightWhite,
    textAlign: "center",
    marginHorizontal: 5,
    marginBottom: 34,
  },
  modalBtns: {
    flexDirection: "row",
    columnGap: 15,
    marginHorizontal: 20,
  },
  cancelBtn: {
    backgroundColor: COLORS.darkgrey,
    borderRadius: 15,
    paddingVertical: 9,
    borderColor: COLORS.lightWhite,
    borderWidth: 1,
  },
  submitbtn: {
    backgroundColor: "#0968CA",
    borderRadius: 15,
    paddingVertical: 10,
  },
  btnText: {
    fontSize: 16,
    textAlign: "center",
    color: COLORS.lightWhite,
  },
});

export default Invitation;
