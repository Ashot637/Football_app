import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import PrimaryText from "../../components/PrimaryText";
import { COLORS } from "../../helpers/colors";
import { useTranslation } from "react-i18next";
import PrimaryButton from "../../components/PrimaryButton";
import Input from "../../components/Input";

import phoneIcon from "../../assets/images/call.png";
import Heading from "../../components/Heading";
import axios from "../../axios/axios";

const CreateGroupPage = ({ navigation }) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");

  const onSubmit = () => {
    axios.post("/group/create", { title }).then(({ data }) => {
      setTitle("");
      navigation.navigate("group", { id: data.id });
    });
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
            value={title}
            setValue={setTitle}
            img={phoneIcon}
            placeholder={t("create_group.placeholder")}
          />
          <PrimaryButton
            disabled={!title.trim().length}
            onPress={onSubmit}
            title={t("create_group.create")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
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
