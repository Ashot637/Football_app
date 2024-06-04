import {
  Image,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import PrimaryText from "./PrimaryText";

import { useTranslation } from "react-i18next";
import CalendarSvg from "../assets/images/calendar.svg";
import closeIcon from "../assets/images/close.png";
import Calendar from "./Calendar";
import PrimaryButton from "./PrimaryButton";

const DateFilterSection = ({ onFilter, events }) => {
  const [date, setDate] = useState(null);
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
                style={{
                  backgroundColor: "#fff",
                  paddingHorizontal: 16,
                  paddingBottom: 32,
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                }}
              >
                <View
                  style={{
                    justifyContent: "space-between",
                    paddingTop: 14,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setDate(null);
                      onFilter(null);
                    }}
                  >
                    <PrimaryText
                      weight={600}
                      style={{ color: date ? "#032176" : "#B2BED7" }}
                    >
                      {t("common.clear")}
                    </PrimaryText>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setIsOpenModal(false)}>
                    <Image source={closeIcon} />
                  </TouchableOpacity>
                </View>
                <Calendar date={date} setDate={setDate} events={events} />
                <PrimaryButton
                  onPress={() => {
                    onFilter(date);
                    setIsOpenModal(false);
                  }}
                  title={t("common.submit")}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default DateFilterSection;
