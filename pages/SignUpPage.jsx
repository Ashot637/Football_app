import { useState, useEffect } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchSignup,
  resetIsSignUpDataValid,
  selectAuth,
} from "../redux/authSlice/authSlice";

import BackgroundImageLayout from "../components/BackgroundImageLayout";
import PrimaryButton from "../components/PrimaryButton";
import Input from "../components/Input";

import BackIcon from "../assets/images/Arrow - Right.svg";
import ProfileIcon from "../assets/images/Profile_Grey.svg";
import PhoneIcon from "../assets/images/Call.svg";
import PrimaryText from "../components/PrimaryText";

import { useTranslation } from "react-i18next";
import i18n from "../languages/i18n";

const SignUpPage = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isSignUpDataValid, errorMessage } = useSelector(selectAuth);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (isSignUpDataValid) {
      navigation.navigate("create-password");
      dispatch(resetIsSignUpDataValid());
    }
  }, [isSignUpDataValid, navigation]);

  const onSignup = () => {
    dispatch(fetchSignup({ name: name.trim(), phone: phone.trim() })).then(
      () => {
        setName("");
        setPhone("");
      }
    );
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <BackgroundImageLayout>
          <View style={styles.top}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              {/* <Image source={backIcon} width={24} height={24} /> */}
              <BackIcon/>
            </TouchableOpacity>
            <PrimaryText
              style={[styles.title, i18n.language === "en" && styles.titleBig]}
              weight={600}
            >
              {t("form.signup")}
            </PrimaryText>
            <View style={{ width: 42 }} />
          </View>
          <View style={styles.inputs}>
            <Input
              value={name}
              setValue={(str) => {
                if (!/[\d.@#$^&*!]/.test(str)) {
                  setName(str);
                }
              }}
              img={<ProfileIcon/>}
              placeholder={t("user.name")}
            />
            <Input
              type="phone-pad"
              value={phone}
              setValue={setPhone}
              img={<PhoneIcon/>}
              placeholder={t("user.phone")}
              maxLength={13}
            />
          </View>
          {errorMessage && (
            <PrimaryText style={styles.error}>
              {t(`errors.${errorMessage}`)}
            </PrimaryText>
          )}
          <PrimaryButton
            title={t("form.signup")}
            onPress={() => onSignup()}
            disabled={phone.trim().length < 9 || !name.trim().length}
          />
        </BackgroundImageLayout>
      </TouchableWithoutFeedback>
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

export default SignUpPage;
