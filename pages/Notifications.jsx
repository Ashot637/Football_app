import { useCallback, useEffect, useState } from "react";
import { BackHandler, ScrollView, StyleSheet, Text, View } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { selectNotification } from "../redux/notificationSlice/notificationSlice";

import { useFocusEffect } from "@react-navigation/native";
import i18n from '../languages/i18n';


import { COLORS } from "../helpers/colors";
import PrimaryText from "../components/PrimaryText";

import { useTranslation } from "react-i18next";
import NotificationsBlocks from "../components/NotificationsBlocks";
import axios from "../axios/axios";
import { changeNotificationsCount } from "../redux/authSlice/authSlice";
import InvitationNotification from "../components/InvitationNotification";

const NotificationsPage = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios.get(`/notifications/getAll?language=${i18n.language}`)
    .then(({ data }) => {
      setNotifications(data);
      dispatch(changeNotificationsCount(0));
    })
    .catch(error => {
      console.error("Error fetching notifications:", error);
    });
  }, []);


  

  // const { from } = useSelector(selectNotification);

  // useFocusEffect(
  //   useCallback(() => {
  //     const onBackPress = () => {
  //       navigation.navigate(from === "game" ? "home" : from);

  //       return true;
  //     };

  //     BackHandler.addEventListener("hardwareBackPress", onBackPress);

  //     return () => {
  //       BackHandler.removeEventListener("hardwareBackPress", onBackPress);
  //     };
  //   })
  // );

  return (
    <ScrollView style={styles.container}>
      <PrimaryText style={styles.tilte} weight={600}>
        {t("notifications.title")}
      </PrimaryText>
      {notifications.map((notification) => {
        return <InvitationNotification data={notification} />;
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background_blue,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  tilte: {
    fontSize: 22,
    fontWeight: "600",
    color: "#fff",
  },
});

export default NotificationsPage;
