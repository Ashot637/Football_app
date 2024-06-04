import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import PrimaryText from "../components/PrimaryText";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useDispatch, useSelector } from "react-redux";
import {
  selectAuth,
  fetchLogin,
  toggleRememberMe,
} from "../redux/authSlice/authSlice";

import BackgroundImageLayout from "../components/BackgroundImageLayout";
import PrimaryButton from "../components/PrimaryButton";
import Input from "../components/Input";

import { COLORS } from "../helpers/colors";

import BackIcon from "../assets/images/Arrow - Right.svg";
import PasswordIcon from "../assets/images/lock.svg";
import phoneIcon from "../assets/images/call.png";
import DoneIcon from "../assets/images/Vector.svg";

import { useTranslation } from "react-i18next";
import i18n from "../languages/i18n";
import { Colors } from "react-native/Libraries/NewAppScreen";

const LoginPage = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { errorMessage, rememberMe } = useSelector(selectAuth);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async () => {
    const expoPushToken = await AsyncStorage.getItem("expoPushToken");
    dispatch(
      fetchLogin({ password, phone: "374" + phone, expoPushToken })
    ).then(() => {
      setPhone("");
      setPassword("");
    });
  };

  const onRemember = () => {
    dispatch(toggleRememberMe());
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"}>
      <BackgroundImageLayout>
        <View style={styles.top}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon />
          </TouchableOpacity>
          <PrimaryText
            style={[styles.title, i18n.language === "en" && styles.titleBig]}
            weight={600}
          >
            {t("form.login")}
          </PrimaryText>
          <View style={{ width: 42 }} />
        </View>
        <View style={styles.inputs}>
          <Input
            type="phone-pad"
            testId="phone-input"
            value={phone}
            setValue={setPhone}
            isPhoneNumber
            img={<Image source={phoneIcon} />}
            maxLength={8}
          />
          <Input
            secureTextEntry
            testId="password-input"
            value={password}
            setValue={setPassword}
            img={<PasswordIcon />}
            placeholder={t("user.password")}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity onPress={onRemember} testID="remember-checkbox">
            <View style={styles.rememberView}>
              <View
                style={[styles.checkbox, rememberMe && styles.checkboxActive]}
              >
                {rememberMe && <DoneIcon width={10} height={10} />}
              </View>
              <PrimaryText style={styles.remember}>
                {t("form.remember_me")}
              </PrimaryText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            testID="forgot-password"
            onPress={() => navigation.navigate("forgot-password")}
          >
            <PrimaryText weight={600} style={{ color: "#0968CA" }}>
              {t("forgot_password.title")}
            </PrimaryText>
          </TouchableOpacity>
        </View>
        {errorMessage && (
          <PrimaryText style={styles.error}>
            {t(`errors.${errorMessage}`)}
          </PrimaryText>
        )}
        <View style={{ marginBottom: 24 }}>
          <PrimaryButton
            title={t("form.login")}
            onPress={() => onLogin()}
            disabled={phone.trim().length < 8 || password.length < 8}
          />
        </View>
        <View style={styles.bottomTextView}>
          <PrimaryText style={styles.leftText} weight={600}>
            {t("form.dont_have_account")}
          </PrimaryText>
          <TouchableOpacity
            testID="do-not-have-account-link"
            onPress={() => navigation.navigate("signup")}
          >
            <PrimaryText style={styles.rightText} weight={600}>
              {t("form.signup")}
            </PrimaryText>
          </TouchableOpacity>
        </View>
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
    marginBottom: 30,
  },
  rememberView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 12,
    paddingLeft: 13,
    marginBottom: 40,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxActive: {
    borderColor: "#0968CA",
  },
  done: {
    width: 15,
    height: 15,
  },
  remember: {
    color: COLORS.grey,
  },
  bottomTextView: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    columnGap: 5,
  },
  leftText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.grey,
  },
  rightText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0968CA",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginHorizontal: 15,
    marginBottom: 10,
  },
});

export default LoginPage;
