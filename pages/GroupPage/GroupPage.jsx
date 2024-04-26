import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import PrimaryText from "../../components/PrimaryText";
import { COLORS } from "../../helpers/colors";
import { useTranslation } from "react-i18next";

import Heading from "../../components/Heading";

import { useEffect, useState } from "react";
import axios from "../../axios/axios";
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice/authSlice";

const GroupPage = ({ navigation, route }) => {
  const { id, invitation, refresh } = route.params;
  const { t } = useTranslation();
  const { user } = useSelector(selectAuth);
  const [isLoading, setIsLoading] = useState(true);
  const [group, setGroup] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios.get("/group/getOne/" + id).then(({ data }) => {
      setGroup(data);
      setIsLoading(false);
    });
  }, [id, refresh]);

  const onConfirm = () => {
    axios.post("/game/acceptInvitation", {
      id: invitation.id,
    });
    navigation.navigate("group", { id, refresh: Math.random() });
  };

  const onCancel = () => {
    axios.post("/game/declineInvitation", { id: invitation.id });
    navigation.navigate("main");
  };

  return (
    <>
      <View style={[styles.container, { justifyContent: "space-between" }]}>
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
                    {t("group.matches")}
                  </PrimaryText>
                </TouchableOpacity>
                <TouchableOpacity
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
                    {t("group.players")}
                  </PrimaryText>
                </TouchableOpacity>
                {!invitation && (
                  <TouchableOpacity
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
                      {t("chat.title")}
                    </PrimaryText>
                  </TouchableOpacity>
                )}
              </View>
            </>
          )}
        </View>
        {isLoading ? null : invitation ? (
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
                backgroundColor: "#acad28",
                borderWidth: 1.5,
                borderColor: COLORS.yellow,
                borderRadius: 15,
                height: 60,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PrimaryText weight={600} style={{ fontSize: 20 }}>
                {t("common.decline")}
              </PrimaryText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onConfirm}
              style={{
                flex: 1,
                backgroundColor: "#acad28",
                borderColor: COLORS.yellow,
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
          group?.ownerId !== user?.id && (
            <TouchableOpacity
              onPress={() => {
                axios.delete("/group/leave/" + id);
                navigation.reset({
                  index: 0,
                  routes: [{ name: "select" }, { name: "main" }],
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
                {t("group.leave")}
              </PrimaryText>
            </TouchableOpacity>
          )
        )}
      </View>
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
