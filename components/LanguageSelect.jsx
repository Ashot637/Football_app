import { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { COLORS } from "../helpers/colors";

import LanguageIcon from "../assets/images/lang.svg";
import arrowIcon from "../assets/images/arrow.png";

import i18n from "../languages/i18n";
import { useTranslation } from "react-i18next";
import PrimaryText from "./PrimaryText";

const langauges = ["en", "ru", "am"];

const LanguageSelect = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const onChangeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    AsyncStorage.setItem("language", lang);
    setIsOpen(false);
  };

  return (
    <>
      <TouchableOpacity onPress={() => setIsOpen((prev) => !prev)}>
        <View style={styles.item}>
          <View style={styles.icon}>
            <LanguageIcon />
          </View>
          <View style={styles.text}>
            <PrimaryText style={styles.title} weight={600}>
              {t("language.choose")}
            </PrimaryText>
            <PrimaryText style={styles.desc} weight={600}>
              {t(`language.${i18n.language}`)}
            </PrimaryText>
            <View style={[styles.line, { bottom: isOpen ? -138 : -10 }]} />
          </View>
          <View>
            <Image
              source={arrowIcon}
              style={[isOpen && { transform: [{ rotate: "90deg" }] }]}
              width={18}
              height={18}
            />
          </View>
        </View>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.options}>
          {langauges.map((lang) => {
            if (lang === i18n.language) return null;
            return (
              <TouchableOpacity
                key={lang}
                onPress={() => onChangeLanguage(lang)}
              >
                <PrimaryText style={styles.option} weight={700}>
                  {t(`language.${lang}`)}
                </PrimaryText>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    columnGap: 20,
    paddingLeft: 18,
  },
  icon: {
    width: 32,
    aspectRatio: 1,
    borderRadius: 16,
    backgroundColor: COLORS.blue,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    flex: 1,
    position: "relative",
  },
  title: {
    color: "#fff",
    fontWeight: "600",
    marginBottom: 5,
    fontSize: 16,
    textTransform: "capitalize",
  },
  desc: {
    fontWeight: "600",
    color: COLORS.grey,
  },
  line: {
    backgroundColor: COLORS.blue,
    height: 1,
    position: "absolute",
    width: "100%",
  },
  options: {
    backgroundColor: COLORS.blue,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 23,
    rowGap: 23,
    marginLeft: 50,
  },
  option: {
    color: COLORS.grey,
    fontWeight: "700",
  },
});

export default LanguageSelect;
