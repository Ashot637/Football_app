import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import PrimaryText from "./PrimaryText";
import { COLORS } from "../helpers/colors";

import BackIcon from "../assets/images/Arrow - Right.svg";
import { useNavigation } from "@react-navigation/native";

const Heading = ({ title, align = "left", goBackButton }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.titleView}>
      {goBackButton && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon />
        </TouchableOpacity>
      )}
      <View style={{ flex: 1, paddingRight: 16 }}>
        <PrimaryText weight={600} style={{ ...styles.title, textAlign: align }}>
          {title}
        </PrimaryText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleView: {
    paddingVertical: 24,
    backgroundColor: COLORS.background_blue,
    paddingHorizontal: 16,
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#fff",
  },
});

export default Heading;
