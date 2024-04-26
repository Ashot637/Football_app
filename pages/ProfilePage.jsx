import { useReducer, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";

import PrimaryText from "../components/PrimaryText";

import { useDispatch, useSelector } from "react-redux";
import { logout, selectAuth, setUser } from "../redux/authSlice/authSlice";

import * as ImagePicker from "expo-image-picker";

import axios, { BASE_URL } from "../axios/axios";
import { COLORS } from "../helpers/colors";

import avatarImg from "../assets/images/avatar.png";
import EditIcon from "../assets/images/Edit.svg";
import closeIcon from "../assets/images/close.png";
import ProfileIcon from "../assets/images/Profile.svg";
import MessageIcon from "../assets/images/Message.svg";
import CallIcon from "../assets/images/Call.svg";
import LocationIcon from "../assets/images/Location.svg";

import { useTranslation } from "react-i18next";
import LogoutIcon from "../assets/images/log out.svg";

import DeleteAccount from "../components/DeleteAccount";
import ChangeRole from "../components/ChangeRole";
import PersonalDetails from "./PersonalDetails";
import MyActivityPage from "./MyActivityPage";

const items = [
  {
    icon: <ProfileIcon />,
    title: "name",
  },
  {
    icon: <MessageIcon />,
    title: "email",
  },
  {
    icon: <CallIcon />,
    title: "phone",
  },
  {
    icon: <LocationIcon />,
    title: "address",
  },
];

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_VALUE":
      return { ...state, [action.payload.title]: action.payload.value };
    default:
      return state;
  }
};

const ProfilePage = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuth);
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
              Անձնական
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
              Պատմություն
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
