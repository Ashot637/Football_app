import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import PrimaryText from "../../components/PrimaryText";
import Heading from "../../components/Heading";
import { useTranslation } from "react-i18next";
import { COLORS } from "../../helpers/colors";

import { useEffect, useState } from "react";
import axios from "../../axios/axios";

import icon from "../../assets/images/call.png";
import { LinearGradient } from "expo-linear-gradient";
import Invitation from "../../components/Invitation";

const GroupsPage = ({ navigation }) => {
  const { t } = useTranslation();
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = () => {
    axios.get("/group/getAll").then(({ data }) => setGroups(data));
  };

  return (
    <>
      <Invitation />
      <ScrollView
        style={{ backgroundColor: COLORS.black, flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
      >
        <Heading title={t("groups.my")} align="center" />
        <View style={{ rowGap: 16, paddingHorizontal: 16, paddingBottom: 16 }}>
          {groups &&
            groups.map((group) => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate("group", { id: group.id })}
                  key={group.id}
                  style={{
                    borderRadius: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: 12,
                    paddingVertical: 14,
                    paddingHorizontal: 20,
                    backgroundColor: COLORS.green,
                    borderWidth: 1,
                    borderColor: "#0CF9DD",
                  }}
                >
                  <Image source={icon} style={{ width: 40, height: 40 }} />
                  <PrimaryText
                    weight={600}
                    style={{ color: COLORS.lightWhite, fontSize: 16 }}
                  >
                    {group.title}
                  </PrimaryText>
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate("create-group")}
        style={{
          position: "absolute",
          right: 14,
          bottom: 17,
        }}
      >
        <LinearGradient
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          colors={["#0DDDD5", "#68F4E4"]}
          style={{
            flexDirection: "row",
            alignItems: "center",
            columnGap: 10,
            paddingVertical: 14,
            paddingHorizontal: 19,
            borderRadius: 40,
          }}
        >
          <Image source={icon} />
          <PrimaryText style={{ color: COLORS.darkgrey }}>
            {t("group.create")}
          </PrimaryText>
        </LinearGradient>
      </TouchableOpacity>
    </>
  );
};

export default GroupsPage;
