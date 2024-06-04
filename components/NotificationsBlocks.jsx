import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Notification from "../assets/images/Notification_blue.svg";
import { format } from "date-fns";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/authSlice/authSlice";

const NotificationsBlocks = ({ data }) => {
  const navigation = useNavigation();
  const { user } = useSelector(selectAuth);
  return (
    <TouchableOpacity
      onPress={() =>
        user?.id === data.game.creatorId
          ? navigation.navigate("game_details", { id: data.game.id, title: "" })
          : navigation.navigate("main", {
              screen: "game",
              params: { id: data.game.id },
            })
      }
    >
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
          <Text style={{ color: "white", fontSize: 20 }}>
            Ազատ տեղի առկայություն
          </Text>
          <Text style={styles.text}>
            {`${format(data.game.startTime, "dd.MM.yyyy")}թ․-ի, ${format(
              data.game.startTime,
              "mm:HH"
            )}-${format(data.game.endTime, "mm:HH")}-ին ${
              data.game.stadion.title
            } մարզադահլիճում կայանալիք խաղում ազատվել է 1 տեղ։`}
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.text}>
              {format(data.createdAt, "dd.MM.yyyy")}
            </Text>
            <Text style={[styles.text, data.isNew && { color: "#0968CA" }]}>
              {!data.isNew ? t("common.readed") : t("common.not_readed")}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationsBlocks;

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
    color: "white",
    fontSize: 16,
  },
});
