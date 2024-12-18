import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { COLORS } from "../helpers/colors";
import PhEyeIcon from "../assets/images/ph_eye.png";
import { useState } from "react";
const Input = ({
  img,
  placeholder,
  value,
  setValue,
  type = "default",
  secureTextEntry,
  maxLength = 30,
  isPhoneNumber,
  isPassword, 
  testId,
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);
  return (
    <View style={styles.inputView}>
      <View>{img}</View>
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1  }}>
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
          style={[styles.input,isPhoneNumber && { marginLeft: 5 }]}
          secureTextEntry={isPassword ? isSecure : secureTextEntry}
          placeholder={placeholder}
          placeholderTextColor={COLORS.grey}
          selectionColor={"#fff"}
          maxLength={maxLength}
        />
         {isPassword && (
          <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
            <Image source={PhEyeIcon} style={styles.iconSize} />
          </TouchableOpacity>
        )}
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
    flex: 1,
    width: "100%",
    color: "#fff",
    fontWeight: "600",
    height: "100%",
  },
  icon: {
    width: 24,
    height: 24,
  },
  iconSize: {
    width: 24,
    height: 24,
    marginRight: 15, 
  },
});

export default Input;
