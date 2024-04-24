import { useReducer, useState } from "react";
import {
  Image,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import PrimaryText from "../components/PrimaryText";
import ProfileItem from "../components/ProfileItem";
import PrimaryButton from "../components/PrimaryButton";
import LanguageSelect from "../components/LanguageSelect";
import ContactUs from "../components/ContactUs";

import { useDispatch, useSelector } from "react-redux";
import { logout, selectAuth, setUser } from "../redux/authSlice/authSlice";

import * as ImagePicker from "expo-image-picker";

import axios, { BASE_URL } from "../axios/axios";

import { COLORS } from "../helpers/colors";

import avatarImg from "../assets/images/avatar.png";
import EditIcon from "../assets/images/Edit.svg";
import closeIcon from "../assets/images/close.png";
import ProfileIcon from "../assets/images/Profile.svg";
import ProfileIcon2 from "../assets/images/Profile-1.svg";
import MessageIcon from "../assets/images/Message.svg";
import MessageIcon2 from "../assets/images/Message-1.svg";
import CallIcon from "../assets/images/Call.svg";
import CallIcon2 from "../assets/images/Call-1.svg";
import LocationIcon from "../assets/images/Location.svg";
import LocationIcon2 from "../assets/images/Location-1.svg";
import LogoutIcon from "../assets/images/log out.svg";

import { useTranslation } from "react-i18next";
import DeleteAccount from "../components/DeleteAccount";
import ChangeRole from "../components/ChangeRole";

const items = [
  {
    icon: <ProfileIcon />,
    openIcon: <ProfileIcon2 />,
    title: "name",
  },
  {
    icon: <MessageIcon />,
    openIcon: <MessageIcon2 />,
    title: "email",
  },
  {
    icon: <CallIcon />,
    openIcon: <CallIcon2 />,
    title: "phone",
  },
  {
    icon: <LocationIcon />,
    openIcon: <LocationIcon2 />,
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

const PersonalDetails = ({ navigation, onLogout }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuth);
  const [selectedImg, setSelectedImg] = useState(null);
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

  return (
    <ScrollView style={styles.container}>
      {user && (
        <>
          <View style={styles.avatarView}>
            <Image
              source={
                selectedImg?.uri
                  ? { uri: selectedImg.uri }
                  : user.img
                  ? { uri: BASE_URL + user.img }
                  : avatarImg
              }
              style={styles.avatar}
              width={100}
              height={100}
            />
            <TouchableOpacity onPress={pickImage}>
              <View style={styles.editView}>
                <EditIcon />
              </View>
            </TouchableOpacity>
            {selectedImg && (
              <View style={styles.removeView}>
                <TouchableOpacity onPress={onRemoveSelectedImg}>
                  <Image source={closeIcon} style={styles.icon} />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={styles.items}>
            {items.map(({ title, icon, openIcon }, index) => {
              return (
                <ProfileItem
                  openIcon={openIcon}
                  key={index}
                  title={`user.${title}`}
                  icon={icon}
                  value={profileData[title]}
                  initialValue={user[title]}
                  setValue={(value) => handleValueChange(title, value)}
                />
              );
            })}
            <LanguageSelect />
            <DeleteAccount />
            <TouchableOpacity
              style={{ alignSelf: "flex-start" }}
              onPress={() => onLogout()}
            >
              <View style={styles.item}>
                <View style={styles.icon}>
                  <LogoutIcon />
                </View>
                <PrimaryText style={styles.logout} weight={600}>
                  {t("user.logout")}
                </PrimaryText>
              </View>
            </TouchableOpacity>
            <PrimaryButton
              title={t("common.save")}
              onPress={() => onUpdateData()}
              disabled={
                (user["name"] === profileData["name"] &&
                  user["phone"] === profileData["phone"] &&
                  user["email"] === profileData["email"] &&
                  user["address"] === profileData["address"] &&
                  !selectedImg) ||
                !profileData["name"].trim() ||
                profileData["phone"].trim().length < 9
              }
            />
          </View>
          <View style={{ height: 50 }} />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#041440",
    paddingVertical: 24,
  },
  avatarView: {
    width: 100,
    height: 100,
    alignSelf: "center",
    // marginLeft: 30,
    position: "relative",
    marginBottom: 32,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editView: {
    width: 32,
    aspectRatio: 1,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5E00F9",
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  removeView: {
    width: 32,
    aspectRatio: 1,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.blue,
    position: "absolute",
    right: 0,
  },
  items: {
    paddingHorizontal: 16,
    rowGap: 20,
  },
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
  logout: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  addCard: {
    color: COLORS.yellow,
    fontSize: 20,
    textAlign: "center",
  },
});

export default PersonalDetails;
