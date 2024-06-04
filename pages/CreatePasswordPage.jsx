import { useState, useEffect } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import {
  setPassword as dispatchUserPassword,
  resetIsWaitingCode,
  selectAuth,
} from "../redux/authSlice/authSlice";

import BackgroundImageLayout from "../components/BackgroundImageLayout";
import PrimaryButton from "../components/PrimaryButton";
import Input from "../components/Input";

import backIcon from "../assets/images/back.png";
import PasswordIcon from "../assets/images/lock.svg";
import PrimaryText from "../components/PrimaryText";

import axios from "../axios/axios";

import { useTranslation } from "react-i18next";
import i18n from "../languages/i18n";

const CreatePasswordPage = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isWaitingCode, errorMessage, phone } = useSelector(selectAuth);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  useEffect(() => {
    if (isWaitingCode) {
      navigation.navigate("verify");
      dispatch(resetIsWaitingCode());
    }
  }, [isWaitingCode, navigation]);

  const onSignup = () => {
    dispatch(dispatchUserPassword(password));
    axios.post("/auth/generateCode", { phone });
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
            {t("form.create_password")}
          </PrimaryText>
          <View style={{ width: 42 }} />
        </View>
        <View style={styles.inputs}>
          <Input
            testId="create-password"
            value={password}
            setValue={setPassword}
            img={<PasswordIcon />}
            secureTextEntry
            placeholder={t("form.create_password")}
          />
          <Input
            testId="repeat-password"
            value={repeatPassword}
            setValue={setRepeatPassword}
            img={<PasswordIcon />}
            secureTextEntry
            placeholder={t("form.repeat_password")}
          />
        </View>
        {errorMessage && (
          <PrimaryText style={styles.error}>{errorMessage}</PrimaryText>
        )}
        <PrimaryButton
          title={t("form.signup")}
          onPress={() => onSignup()}
          disabled={
            password !== repeatPassword ||
            !password.trim().length ||
            password.length < 8
          }
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
  },
  title: {
    color: "#fff",
    fontSize: 21,
    fontWeight: "600",
  },
  titleBig: {
    fontSize: 28,
  },
  inputs: {
    display: "flex",
    rowGap: 24,
    marginBottom: 40,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default CreatePasswordPage;
