import { Image, StyleSheet, View } from "react-native";

import PrimaryText from "./PrimaryText";

import { COLORS } from "../helpers/colors";

import { BASE_URL } from "../axios/axios";

const Facilities = ({ facilities }) => {
  return (
    <View style={styles.items}>
      {facilities.map((item) => {
        return (
          <View style={styles.item} key={item.id}>
            <View style={styles.icon}>
              <Image
                source={{ uri: BASE_URL + item.img }}
                style={{ width: 30, height: 30, resizeMode: "contain" }}
              />
            </View>
            <PrimaryText style={styles.facilitie}>{item.title}</PrimaryText>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  items: {
    rowGap: 16,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  icon: {
    width: 48,
    aspectRatio: 1,
    borderRadius: 24,
    backgroundColor: "#031852",
    alignItems: "center",
    justifyContent: "center",
  },
  facilitie: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Facilities;
