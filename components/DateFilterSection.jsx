import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import PrimaryText from "./PrimaryText";

import { useTranslation } from "react-i18next";
import CalendarSvg from "../assets/images/calendar.svg";
import { COLORS } from "../helpers/colors";
const DateFilterSection = () => {
  const { t } = useTranslation();
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <View
      style={{
        marginBottom: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <PrimaryText style={{ color: "#fff", fontSize: 20 }}>
        {t("home.choose_date")}
      </PrimaryText>
      <TouchableOpacity onPress={() => setIsOpenModal(true)}>
        <CalendarSvg width={28} height={28} />
      </TouchableOpacity>
      <Modal
        visible={isOpenModal}
        animationType="slide"
        tom
        transparent={true}
        onRequestClose={() => setIsOpenModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsOpenModal(false)}>
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <TouchableWithoutFeedback>
              <View
                style={{ backgroundColor: COLORS.lightWhite, height: "50%" }}
              >
                <PrimaryText style={styles.modalContent}>
                  Modal Content
                </PrimaryText>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default DateFilterSection;

const styles = StyleSheet.create({});
