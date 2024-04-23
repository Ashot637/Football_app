import { useReducer, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import PrimaryText from "../components/PrimaryText";

import { useDispatch, useSelector } from "react-redux";
import { logout, selectAuth, setUser } from "../redux/authSlice/authSlice";

import * as ImagePicker from "expo-image-picker";

import axios, { BASE_URL } from "../axios/axios";

import ProfileIcon from "../assets/images/Profile.svg";
import MessageIcon from "../assets/images/Message.svg";
import CallIcon from "../assets/images/Call.svg";
import LocationIcon from "../assets/images/Location.svg";

import { useTranslation } from "react-i18next";
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
  const [selectedImg, setSelectedImg] = useState(null);
  const [tab, setTab] = useState(0);
  const [profileData, dispatchData] = useReducer(reducer, {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    address: user?.address,
  });

  const handleValueChange = (title, value) => {
    dispatchData({ type: "UPDATE_VALUE", payload: { title, value } });
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.75,
      });

      if (!result.canceled) {
        setSelectedImg(result.assets[0]);
      }
    }
  };

  const onUpdateData = () => {
    const formData = new FormData();
    items.forEach(({ title }) => formData.append(title, profileData[title]));
    formData.append("prevImg", user.img);
    if (selectedImg) {
      const uriParts = selectedImg.uri.split(".");
      const fileType = uriParts[uriParts.length - 1];

      formData.append("img", {
        uri: selectedImg.uri,
        type: `image/${fileType}`,
        name: `photo.${fileType}`,
      });
    }
    axios
      .patch("/user/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data }) => {
        dispatch(setUser(data));
        onRemoveSelectedImg();
      });
  };

  const onRemoveSelectedImg = () => {
    setSelectedImg(null);
  };


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
      {tab == 0 ? <PersonalDetails onLogout={onLogout} /> : <MyActivityPage/>}
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
