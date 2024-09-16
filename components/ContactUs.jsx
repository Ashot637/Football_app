import { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";

import { COLORS } from "../helpers/colors";

import feedbackIcon from "../assets/images/feedback.png";
import arrowIcon from "../assets/images/arrow.png";

import { useTranslation } from "react-i18next";
import PrimaryText from "./PrimaryText";

import { Linking } from "react-native";

import CallIcon from "../assets/images/Call.svg";
import MessageIcon from "../assets/images/Message.svg";
import ProfileIcon from "../assets/images/Profile.svg";

const ContactUs = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <TouchableOpacity onPress={() => setIsOpen((prev) => !prev)}>
        <View style={styles.item}>
          <View style={styles.icon}>
            <ProfileIcon />
          </View>
          <View style={styles.text}>
            <PrimaryText style={styles.title} weight={600}>
              {t("contact-us.title")}
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
          <TouchableOpacity
            style={styles.option}
            onPress={() => Linking.openURL("tel:+37496882308")}
          >
            <CallIcon width={32} height={32} />
            <PrimaryText weight={700} style={{ color: COLORS.lightWhite }}>
              {t("contact-us.call")}
            </PrimaryText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => Linking.openURL("mailto:contact@ballhola.app")}
          >
            <MessageIcon width={32} height={32} />
            <PrimaryText weight={700} style={{ color: COLORS.lightWhite }}>
              {t("contact-us.mail")}
            </PrimaryText>
          </TouchableOpacity>
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
    // textTransform: "capitalize",
  },
  desc: {
    fontWeight: "600",
    color: COLORS.lightWhite,
  },
  line: {
    backgroundColor: COLORS.blue,
    height: 1,
    position: "absolute",
    width: "100%",
  },
  options: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: 20,
    paddingRight: 20,
    marginLeft: 50,
    borderRadius: 16,
  },
  option: {
    width: "50%",
    display: "flex",
    alignItems: "center",
    rowGap: 12,
    backgroundColor: COLORS.blue,
    paddingVertical: 15,
    borderRadius: 16,
  },
});

export default ContactUs;
