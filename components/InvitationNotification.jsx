import { StyleSheet, TouchableOpacity, View } from "react-native";
import Notification from "../assets/images/Notification_blue.svg";
import { format } from "date-fns";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/authSlice/authSlice";
import PrimaryText from "./PrimaryText";
import { COLORS } from "../helpers/colors";
import { useTranslation } from "react-i18next";

const InvitationNotification = ({ data }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const onNavigate = () => {
    if (data.type === "GAME") {
      navigation.navigate("main", {
        screen: "game",
        params: { id: data.game.id },
      });
    } else if (data.type === "PRIVATE_GAME") {
      navigation.navigate("main", {
        screen: "game",
        params: {
          id: data.game.id,
          fromNotification: { withGroup: false, notificationId: data.id },
        },
      });
    } else if (data.type === "GROUP") {
      if (data.game) {
        navigation.navigate("main", {
          screen: "game",
          params: {
            id: data.game.id,
            fromNotification: { withGroup: true, notificationId: data.id },
          },
        });
      } else {
        navigation.navigate("main", {
          screen: "group",
          params: {
            id: data.groupId,
            fromNotification: { notificationId: data.id },
          },
        });
      }
    }
  };

  return (
    <TouchableOpacity onPress={onNavigate} disabled={data.disabled}>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          marginTop: 30,
          paddingRight: 10,
        }}
      >
        <View style={styles.notificationIcon}>
          <Notification width={30} height={30} />
        </View>
        <View style={{ width: "85%" }}>
          {data.type !== "GROUP" ? (
            <>
              <PrimaryText
                weight={600}
                style={{ color: "white", fontSize: 18 }}
              >
                {t("invitation.game")}
              </PrimaryText>
              <PrimaryText style={styles.text}>
                {t("invitation.game_info", {
                  date: format(data.game.startTime, "dd.MM.yyyy"),
                  startTime: format(data.game.startTime, "mm:HH"),
                  endTime: format(data.game.endTime, "mm:HH"),
                  title: data.game.stadion.title,
                })}
              </PrimaryText>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <PrimaryText style={{ color: "#fff", marginTop: 10 }}>
                  {format(data.createdAt, "dd.MM.yyyy")}
                </PrimaryText>
                <PrimaryText
                  style={[styles.text, data.isNew && { color: "#0968CA" }]}
                >
                  {!data.isNew ? t("common.readed") : t("common.not_readed")}
                </PrimaryText>
              </View>
            </>
          ) : (
            <>
              <PrimaryText
                weight={600}
                style={{ color: "white", fontSize: 18 }}
              >
                {t("invitation.group")}
              </PrimaryText>
              <PrimaryText style={styles.text}>
                {t("invitation.group_info", { title: data.group.title })}
              </PrimaryText>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <PrimaryText style={{ color: "#fff", marginTop: 10 }}>
                  {format(data.createdAt, "dd.MM.yyyy")}
                </PrimaryText>
                <PrimaryText
                  style={[styles.text, data.isNew && { color: "#0968CA" }]}
                >
                  {!data.isNew ? t("common.readed") : t("common.not_readed")}
                </PrimaryText>
              </View>
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default InvitationNotification;

const styles = StyleSheet.create({
  notificationIcon: {
    height: 40,
    width: 40,
    backgroundColor: "#031852",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },

  text: {
    marginTop: 10,
    color: COLORS.grey,
  },
});
