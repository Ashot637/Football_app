import { StyleSheet, View } from "react-native";
import React from "react";
import PrimaryText from "./PrimaryText";
import { COLORS } from "../helpers/colors";

const Heading = ({ title, align = "left" }) => {
  return (
    <View style={styles.titleView}>
      <PrimaryText weight={600} style={{ ...styles.title, textAlign: align }}>
        {title}
      </PrimaryText>
    </View>
  );
};

const styles = StyleSheet.create({
  titleView: {
    paddingVertical: 24,
    backgroundColor: COLORS.background_blue,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#fff",
  },
});

export default Heading;
