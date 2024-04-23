import {
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import PrimaryText from "../../components/PrimaryText";
import Heading from "../../components/Heading";
import { useTranslation } from "react-i18next";
import { COLORS } from "../../helpers/colors";

import { useEffect, useState } from "react";
import axios from "../../axios/axios";

import GroupSvg from "../../assets/images/group.svg";
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
        style={{ backgroundColor: COLORS.background_blue, flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
      >
        <Heading title={t("groups.my")} align="center" />
        <View style={{ rowGap: 16, paddingHorizontal: 16, paddingBottom: 16 }}>
          {groups &&
            groups.map((group) => {
              return (
                <LinearGradient
                  key={group.id}
                  colors={["rgba(255, 255, 255, 0)", "rgba(12, 249, 221, 0.8)"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  locations={[0.1564, 0.9972]}
                  style={{
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    height: 70,
                  }}
                >
                  <TouchableWithoutFeedback
                    onPress={() =>
                      navigation.navigate("group", { id: group.id })
                    }
                  >
                    <View
                      style={{
                        borderRadius: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        width: "99.6%",
                        height: 68,
                        columnGap: 12,
                        paddingVertical: 14,
                        paddingHorizontal: 20,
                        backgroundColor: "#032176",
                      }}
                    >
                      <GroupSvg width={40} height={40} />
                      <PrimaryText
                        weight={600}
                        style={{ color: COLORS.lightWhite, fontSize: 16 }}
                      >
                        {group.title}
                      </PrimaryText>
                    </View>
                  </TouchableWithoutFeedback>
                </LinearGradient>
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
          {/* <Image source={icon} /> */}
          <PrimaryText style={{ color: COLORS.darkgrey }}>
            {t("group.create")}
          </PrimaryText>
        </LinearGradient>
      </TouchableOpacity>
    </>
  );
};

export default GroupsPage;
