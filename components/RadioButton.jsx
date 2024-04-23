import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import PrimaryText from "./PrimaryText";
import { COLORS } from "../helpers/colors";

const RadioButton = ({ title, state, setState }) => {
  return (
    <View style={{ alignItems: "flex-start" }}>
      <TouchableOpacity onPress={setState}>
        <View style={styles.container}>
          <View style={[styles.button, state && styles.buttonActive]}>
            {state && (
              <View
                style={{
                  borderRadius: 8,
                  width: 16,
                  height: 16,
                  backgroundColor: COLORS.cyan,
                }}
              />
            )}
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
  button: {
    width: 24,
    height: 24,
    borderColor: COLORS.grey,
    borderWidth: 1,
    borderRadius: 12,
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonActive: {
    borderColor: COLORS.cyan,
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

export default RadioButton;
