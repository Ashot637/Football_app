import { StyleSheet, Text, View } from "react-native";
import Notification from "../assets/images/Notification_blue.svg";
import { format } from "date-fns";

const NotificationsBlocks = ({ data }) => {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          gap: 20,
          marginTop: 30,
          paddingRight: 10,
        }}
      >
        <View style={styles.notificationIcon}>
          <Notification width={30} height={30} />
        </View>
        <View style={{width: '85%'}}>
          <Text style={{ color: "white", fontSize: 20 }}>
            Ազատ տեղի առկայություն
          </Text>
          <Text style={styles.text}>
            {`25.05.24թ․-ի, 14։00-16։00-ին Դինամո մարզադահլիճում կայանալիք խաղում ազատվել է 1 տեղ։`}
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.text}>21 րոպե առաջ</Text>
            <Text style={styles.text}>Չկարդացված</Text>
          </View>
        </View>
      </View>
    </>
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
