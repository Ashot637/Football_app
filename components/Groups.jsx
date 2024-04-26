import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  BackHandler,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import PrimaryText from "./PrimaryText";

import { COLORS } from "../helpers/colors";

import axios from "../axios/axios";

import { format } from "date-fns";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { changeNewMessagesStatus } from "../redux/authSlice/authSlice";
import { selectNotification } from "../redux/notificationSlice/notificationSlice";

import { socket } from "../hooks/useSocket";

import calendarIcon from "../assets/images/calendar.png";
import clockIcon from "../assets/images/clock.png";

import { useTranslation } from "react-i18next";

const Groups = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { from } = useSelector(selectNotification);
  const isMounted = useRef(false);
  const { t } = useTranslation();

  useEffect(() => {
    onRefresh();
    socket.on("group-new-message", (groupId) => {
      setChats((chats) => {
        const array = [...chats];
        const index = array.findIndex((obj) => obj.id === groupId);

        const obj = array.splice(index, 1)[0];

        array.unshift({
          ...obj,
          isNewMessage: true,
        });

        return array;
      });
    });
  }, []);

  useEffect(() => {
    if (chats.length) {
      const chatsWithNewMessages = chats.filter(
        (chat) => chat.isNewMessage
      ).length;
      if (!chatsWithNewMessages) {
        dispatch(changeNewMessagesStatus(false));
        axios.post("/message/markUserMessagesRead");
      }
    }
  }, [chats]);

  const onRefresh = () => {
    setIsLoading(true);
    axios
      .get("/message/getAllGroups")
      .then(({ data }) => setChats(data))
      .finally(() => {
        setIsLoading(false);
        isMounted.current = true;
      });
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate(
          from === "game" || from === "notifications" ? "home" : from
        );

        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    })
  );

  useEffect(() => {
    socket.on("read-message-in-group", (groupId) => {
      setChats((chats) =>
        chats.map((chat) => {
          if (chat.id === groupId) {
            return {
              ...chat,
              isNewMessage: false,
            };
          }
          return chat;
        })
      );
    });
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={isLoading && isMounted.current}
          onRefresh={onRefresh}
        />
      }
    >
      {!isLoading && (
        <>
          <PrimaryText style={styles.tilte} weight={600}>
            {t("chat.title")}
          </PrimaryText>
          <View style={styles.blocks}>
            {chats.map(({ id, isNewMessage, title }) => {
              return (
                <TouchableOpacity
                  key={id}
                  onPress={() => {
                    setChats((chats) =>
                      chats.map((chat) => {
                        if (chat.id === id) {
                          return {
                            ...chat,
                            isNewMessage: false,
                          };
                        }
                        return chat;
                      })
                    );
                    navigation.navigate("chat", {
                      groupId: id,
                      groupTitle: title,
                    });
                  }}
                >
                  <View style={styles.block}>
                    {isNewMessage && <View style={styles.newMessage} />}
                    <PrimaryText weight={700} style={styles.blockTitle}>
                      {title}
                    </PrimaryText>
                    {/* <View style={styles.infoRow}>
                      <View style={styles.infoRowBlock}>
                        <Image source={calendarIcon} style={styles.icon} />
                        <PrimaryText style={styles.subtitle}>
                          {format(game.startTime, "dd.MM.yyyy")}
                        </PrimaryText>
                      </View>
                      <View style={styles.infoRowBlock}>
                        <Image source={clockIcon} style={styles.icon} />
                        <PrimaryText
                          style={styles.subtitle}
                          weight={600}
                        >{`${format(game.startTime, "HH:mm")} - ${format(
                          game.endTime,
                          "HH:mm"
                        )}`}</PrimaryText>
                      </View>
                    </View> */}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={{ height: 30 }} />
        </>
      )}
    </ScrollView>
  );
};

export default Groups;

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
    marginBottom: 20,
  },
  blocks: {
    rowGap: 20,
  },
  block: {
    paddingVertical: 18,
    backgroundColor: "#031852",
    paddingHorizontal: 20,
    rowGap: 12,
    borderRadius: 16,
  },
  newMessage: {
    position: "absolute",
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#1A82ED",
    right: 2,
    top: -5,
  },
  infoRowBlock: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    width: 24,
    height: 24,
  },
  blockTitle: {
    color: "#1A82ED",
    fontSize: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
  },
});
