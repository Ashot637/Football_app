import { Image, StyleSheet, Text, TextInput, View } from "react-native";

import { COLORS } from "../helpers/colors";

const Input = ({
  img,
  placeholder,
  value,
  setValue,
  type = "default",
  secureTextEntry,
  maxLength = 30,
  isPhoneNumber,
  testId,
}) => {
  return (
    <View style={styles.inputView}>
      <View>{img}</View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {isPhoneNumber && (
          <TextInput
            value="+374"
            editable={false}
            style={{ color: "#fff", fontWeight: "600" }}
          />
        )}
        <TextInput
          testID={testId}
          value={value}
          onChangeText={setValue}
          keyboardType={type}
          style={styles.input}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          placeholderTextColor={COLORS.grey}
          selectionColor={"#fff"}
          maxLength={maxLength}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    width: "100%",
    backgroundColor: COLORS.blue,
    borderRadius: 16,
    paddingLeft: 16,
    height: 64,
    display: "flex",
    alignItems: "center",
    columnGap: 15,
    flexDirection: "row",
  },
  input: {
    width: "100%",
    color: "#fff",
    fontWeight: "600",
    height: "100%",
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default Input;
