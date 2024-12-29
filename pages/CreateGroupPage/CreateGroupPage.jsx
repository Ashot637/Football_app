import { Image, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import PrimaryText from "../../components/PrimaryText";
import { COLORS } from "../../helpers/colors";
import { useTranslation } from "react-i18next";
import PrimaryButton from "../../components/PrimaryButton";
import Input from "../../components/Input";

import groupIcon from "../../assets/images/group.png";
import Heading from "../../components/Heading";
import axios from "../../axios/axios";
import { useDispatch } from "react-redux";
import { setNeedRefresh } from "../../redux/createGameSlice/createGameSlice";

const CreateGroupPage = ({ navigation, route }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const backUrl = route?.params?.backUrl;

  const onSubmit = () => {
    axios.post("/group/create", { title }).then(({ data }) => {
      console.log("Response from backend:", data);

      setTitle("");
      if (backUrl) {
        return navigation.navigate(backUrl, { groupId: data.id });
      }
      navigation.navigate("group", { id: data.id });
    });
    dispatch(setNeedRefresh());
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Heading title={t("create_group.title")} />
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            paddingHorizontal: 16,
            paddingVertical: 24,
          }}
        >
          <Input
            testId="group-name-input"
            value={title}
            setValue={setTitle}
            img={<Image source={groupIcon} style={{ width: 24, height: 24 }} />}
            placeholder={t("create_group.placeholder")}
            maxLength={70}
          />
          <PrimaryButton
            disabled={!title.trim().length}
            onPress={onSubmit}
            title={t("create_group.title")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background_blue,
  },
  titleView: {
    paddingVertical: 24,
    backgroundColor: COLORS.darkgrey,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#fff",
    paddingLeft: 16,
  },
});

export default CreateGroupPage;
