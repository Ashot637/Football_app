import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import { COLORS } from "../helpers/colors";

import doneIcon from "../assets/images/done.png";
import PrimaryText from "./PrimaryText";

const CheckBox = ({ title, state, setState }) => {
  return (
    <View style={{ alignItems: "flex-start" }}>
      <TouchableOpacity onPress={setState}>
        <View style={styles.container}>
          <View style={[styles.box, state && styles.boxActive]}>
            {state && <Image style={styles.done} source={doneIcon} />}
          </View>
          {title && <PrimaryText style={styles.title}>{title}</PrimaryText>}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
  },
  box: {
    width: 24,
    height: 24,
    borderColor: COLORS.grey,
    borderWidth: 2,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  boxActive: {
    borderColor: "#0968CA",
  },
  done: {
    width: 16,
    height: 16,
  },
  title: {
    color: COLORS.lightWhite,
    fontSize: 18,
  },
});

export default CheckBox;
