import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import PrimaryText from "../../components/PrimaryText";
import { COLORS } from "../../helpers/colors";
import { useTranslation } from "react-i18next";

import Heading from "../../components/Heading";

import { useEffect, useLayoutEffect, useState } from "react";
import axios from "../../axios/axios";
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice/authSlice";
import { selectCreateGame } from "../../redux/createGameSlice/createGameSlice";

const GroupPage = ({ navigation, route }) => {
  const { id, invitation, refresh, fromNotification } = route.params;
  const { t } = useTranslation();
  const { user } = useSelector(selectAuth);
  const { needRefresh } = useSelector(selectCreateGame);
  const [isLoading, setIsLoading] = useState(true);
  const [group, setGroup] = useState(null);

  useLayoutEffect(() => {
    setIsLoading(true);
    axios.get("/group/getOne/" + id).then(({ data }) => {
      console.log("Group Data:", data);
      console.log("Players:", data.Users);
      console.log("Title:", data.title);
      console.log("ID:", data.id);

      setGroup(data);
      setIsLoading(false);
    });
  }, [id, refresh, needRefresh]);

  const onConfirm = async () => {
    if (fromNotification) {
      await axios.post("/group/joinToGroup", {
        id: group.id,
        notificationId: fromNotification.notificationId,
      });
    } else {
      await axios.post("/game/acceptInvitation", {
        id: invitation.id,
      });
    }
    navigation.navigate("group", { id, refresh: Math.random() });
  };

  const onCancel = () => {
    if (!fromNotification) {
      axios.post("/game/declineInvitation", { id: invitation.id });
    }
    navigation.navigate("home");
  };

  return (
    <>
      <ScrollView style={[styles.container]}>
        <View style={{ flex: 1 }}>
          {isLoading && (
            <View
              style={{
                flex: 1,
                height: 200,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator
                size={"large"}
                style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
                color={COLORS.yellow}
              />
            </View>
          )}
          {!isLoading && group && (
            <>
              <Heading title={group.title} align="center" />
              <View style={{ paddingVertical: 24, paddingHorizontal: 16 }}>
                <TouchableOpacity
                  testID="games"
                  onPress={() =>
                    navigation.navigate("group-matches", {
                      games: group.game,
                      title: group.title,
                      id: group.id,
                      ownerId: group.ownerId,
                      isViewMode: !!invitation,
                    })
                  }
                  style={styles.block}
                >
                  <PrimaryText
                    weight={600}
                    style={{
                      fontSize: 20,
                      color: COLORS.lightWhite,
                      textAlign: "center",
                    }}
                  >
                    {t("common.games")}
                  </PrimaryText>
                </TouchableOpacity>
                <TouchableOpacity
                  testID="players"
                  onPress={() =>
                    navigation.navigate("group-players", {
                      players: group.Users,
                      title: group.title,
                      id: group.id,
                      isViewMode: !!invitation,
                    })
                  }
                  style={styles.block}
                >
                  <PrimaryText
                    weight={600}
                    style={{
                      fontSize: 20,
                      color: COLORS.lightWhite,
                      textAlign: "center",
                    }}
                  >
                    {t("common.players")}
                  </PrimaryText>
                </TouchableOpacity>
                {!invitation && (
                  <TouchableOpacity
                    testID="chat"
                    style={styles.block}
                    onPress={() => {
                      navigation.navigate("chat", {
                        groupId: group.id,
                        groupTitle: group.title,
                      });
                    }}
                  >
                    <PrimaryText
                      weight={600}
                      style={{
                        fontSize: 20,
                        color: COLORS.lightWhite,
                        textAlign: "center",
                      }}
                    >
                      {t("chat.single_title")}
                    </PrimaryText>
                  </TouchableOpacity>
                )}
              </View>
            </>
          )}
        </View>
        {isLoading ? null : invitation || fromNotification ? (
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
              onPress={onCancel}
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
              onPress={onConfirm}
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
          <TouchableOpacity
            onPress={() => {
              if (group?.ownerId === user?.id) {
                axios.delete("/group/delete/" + id);
              } else {
                axios.delete("/group/leave/" + id);
              }
              navigation.reset({
                index: 0,
                routes: [{ name: "home" }],
              });
            }}
          >
            <PrimaryText
              style={{
                fontSize: 17,
                color: "#68F4E4",
                textAlign: "center",
                marginBottom: 23,
              }}
            >
              {group?.ownerId === user?.id
                ? t("group.delete")
                : t("group.leave")}
            </PrimaryText>
          </TouchableOpacity>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background_blue,
  },
  block: {
    backgroundColor: "#032176",
    paddingVertical: 33,
    borderRadius: 24,
    marginBottom: 30,
  },
});

export default GroupPage;
