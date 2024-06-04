import { useState, useEffect } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import BackgroundImageLayout from "../../components/BackgroundImageLayout";
import PrimaryButton from "../../components/PrimaryButton";
import Input from "../../components/Input";

import backIcon from "../../assets/images/back.png";
import phoneIcon from "../../assets/images/call.png";
import PrimaryText from "../../components/PrimaryText";

import axios, { BASE_URL } from "../../axios/axios";

import { useTranslation } from "react-i18next";
import i18n from "../../languages/i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ForgotPasswordPage = ({ navigation }) => {
  const { t } = useTranslation();
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSignup = async () => {
    const expoPushToken = await AsyncStorage.getItem("expoPushToken");
    const { data } = await axios.get(BASE_URL + "ip");
    axios
      .post("/auth/checkPhone", {
        phone: "374" + phone,
        expoPushToken,
        ip: data,
      })
      .then(() => {
        setErrorMessage("");
        navigation.navigate("forgot-password-phone", { phone: "374" + phone });
      })
      .catch(() => {
        setErrorMessage(t("errors.INVALID_PHONE"));
      });
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"}>
      <BackgroundImageLayout>
        <View style={styles.top}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={backIcon} width={24} height={24} />
          </TouchableOpacity>
          <PrimaryText
            style={[styles.title, i18n.language === "en" && styles.titleBig]}
            weight={600}
          >
            {t("forgot_password.title")}
          </PrimaryText>
          <View style={{ width: 42 }} />
        </View>
        <View style={styles.inputs}>
          <Input
            value={phone}
            setValue={setPhone}
            type="phone-pad"
            img={<Image source={phoneIcon} />}
            isPhoneNumber
            maxLength={8}
          />
        </View>
        {errorMessage && (
          <PrimaryText style={styles.error}>{errorMessage}</PrimaryText>
        )}
        <PrimaryButton
          title={t("verify.verify_and_continue")}
          onPress={() => onSignup()}
          disabled={phone.length < 8}
        />
      </BackgroundImageLayout>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  top: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 18,
    textAlign: "center",
    marginBottom: 32,
    columnGap: 10,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  titleBig: {
    fontSize: 26,
  },
  inputs: {
    display: "flex",
    rowGap: 24,
    marginBottom: 30,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default ForgotPasswordPage;
