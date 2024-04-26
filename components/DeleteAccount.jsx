import { useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";

import PrimaryText from "./PrimaryText";
import ConfirmationModal from "./ConfirmationModal";

import { COLORS } from "../helpers/colors";

import { useTranslation } from "react-i18next";

import DeleteAccountIcon from "../assets/images/delete account.svg";

import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice/authSlice";
import axios from "../axios/axios";
import { useNavigation } from "@react-navigation/native";

const DeleteAccount = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const onSubmit = async () => {
    await axios.delete("/user/remove");
    await dispatch(logout());
    navigation.reset({
      index: 0,
      routes: [{ name: "landing" }, { name: "login" }],
    });
  };

  return (
    <TouchableOpacity
      style={{ alignSelf: "flex-start" }}
      onPress={() => setIsOpenModal(true)}
    >
      <View style={styles.item}>
        <View style={styles.icon}>
          <DeleteAccountIcon />
        </View>
        <PrimaryText style={styles.title} weight={600}>
          {t("user.delete_account")}
        </PrimaryText>
      </View>
      <ConfirmationModal
        state={isOpenModal}
        dismiss={() => setIsOpenModal(false)}
      >
        <PrimaryText style={styles.modalTitle}>
          {t("user.delete_account_title")}
        </PrimaryText>
        <View style={styles.modalBtns}>
          <TouchableOpacity
            onPress={() => setIsOpenModal(false)}
            style={{ flex: 1 }}
          >
            <View style={styles.cancelBtn}>
              <PrimaryText style={styles.btnText} weight={600}>
                {t("common.cancel")}
              </PrimaryText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSubmit} style={{ flex: 1 }}>
            <View style={styles.submitbtn}>
              <PrimaryText
                style={[styles.btnText, { color: "#fff" }]}
                weight={600}
              >
                {t("user.yes_delete")}
              </PrimaryText>
            </View>
          </TouchableOpacity>
        </View>
      </ConfirmationModal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
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
  icon24: {
    width: 24,
    height: 24,
  },
  title: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  modalTitle: {
    marginBottom: 24,
    fontSize: 22,
    color: COLORS.lightWhite,
    textAlign: "center",
  },
  modalBtns: {
    flexDirection: "row",
    columnGap: 11,
  },
  cancelBtn: {
    backgroundColor: "#1C2F63",
    borderRadius: 15,
    paddingVertical: 9,
    borderColor: COLORS.lightWhite,
    borderWidth: 1,
  },
  submitbtn: {
    backgroundColor: "#0968CA",
    borderRadius: 15,
    paddingVertical: 10,
  },
  btnText: {
    fontSize: 18,
    textAlign: "center",
    color: COLORS.lightWhite,
  },
});

export default DeleteAccount;
