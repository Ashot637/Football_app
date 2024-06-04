import { useState } from "react";
import { ScrollView, View, StyleSheet, TouchableOpacity } from "react-native";

import PrimaryText from "../components/PrimaryText";

import { useDispatch, useSelector } from "react-redux";
import { logout, selectAuth } from "../redux/authSlice/authSlice";

import axios from "../axios/axios";

import { useTranslation } from "react-i18next";

import PersonalDetails from "./PersonalDetails";
import MyActivityPage from "./MyActivityPage";

const ProfilePage = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [tab, setTab] = useState(0);

  const onLogout = async () => {
    await axios.post("/auth/logout");
    dispatch(logout());
    navigation.reset({
      index: 0,
      routes: [{ name: "landing" }, { name: "login" }],
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity style={{ flex: 1 }} onPress={() => setTab(0)}>
          <View
            style={[
              styles.option,
              tab == 1 ? styles.option : styles.optionActive,
            ]}
          >
            <PrimaryText
              style={[
                { fontSize: 18 },
                tab == 1 ? { color: "#F0F4FF" } : { color: "#1A82ED" },
              ]}
            >
              {t("common.personal")}
            </PrimaryText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => setTab(1)}>
          <View
            style={[
              styles.option,
              tab == 0 ? styles.option : styles.optionActive,
            ]}
          >
            <PrimaryText
              style={[
                { fontSize: 18 },
                tab == 0 ? { color: "#F0F4FF" } : { color: "#1A82ED" },
              ]}
            >
              {t("common.history")}
            </PrimaryText>
          </View>
        </TouchableOpacity>
      </View>
      {tab == 0 ? <PersonalDetails onLogout={onLogout} /> : <MyActivityPage />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#041440",
    paddingVertical: 24,
  },
  option: {
    borderWidth: 1,
    color: "#F0F4FF",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
    borderRadius: 30,
    borderColor: "#F0F4FF",
  },

  optionActive: {
    borderColor: "#1A82ED",
    backgroundColor: "#B2BED733",
  },
});

export default ProfilePage;
