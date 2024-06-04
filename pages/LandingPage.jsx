import { StyleSheet, TouchableOpacity, View } from "react-native";

import PrimaryButton from "../components/PrimaryButton";
import BackgroundImageLayout from "../components/BackgroundImageLayout";

import { COLORS } from "../helpers/colors";
import PrimaryText from "../components/PrimaryText";
import { useTranslation } from "react-i18next";
import i18n from "../languages/i18n";

const LandingPage = ({ navigation }) => {
  const { t } = useTranslation();

  return (
    <BackgroundImageLayout padding={40}>
      <PrimaryText
        style={[styles.title, i18n.language === "am" && styles.titleSmall]}
        weight={600}
      >
        {t("landing.title")}
      </PrimaryText>
      <PrimaryText style={styles.subtitle}>{t("landing.desc")}</PrimaryText>
      <View
        style={[
          styles.buttons,
          i18n.language === "ru" && styles.buttonsWithGap,
        ]}
      >
        <View style={{ width: i18n.language === "ru" ? "50%" : "60%" }}>
          <PrimaryButton
            testID="auth-button"
            title={t("form.login")}
            onPress={() => {
              navigation.navigate("login");
            }}
          />
        </View>
        <TouchableOpacity
          testID="register-button"
          onPress={() => navigation.navigate("signup")}
        >
          <PrimaryText style={styles.signup} weight={600}>
            {t("form.signup")}
          </PrimaryText>
        </TouchableOpacity>
      </View>
    </BackgroundImageLayout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    color: "#fff",
    marginBottom: 18,
    lineHeight: 55,
  },
  titleSmall: {
    fontSize: 32,
  },
  subtitle: {
    color: COLORS.grey,
    marginBottom: 40,
    lineHeight: 22,
  },
  buttons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingRight: 30,
  },
  buttonsWithGap: {
    columnGap: 15,
  },
  signup: {
    fontSize: 16,
    color: COLORS.lightblue,
    fontWeight: "600",
  },
});

export default LandingPage;
