
import {
  Image,
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

import groupIcon from "../../assets/images/group.png";
import CrossIcon from "../../assets/images/cross.svg";
import { LinearGradient } from "expo-linear-gradient";
import Invitation from "../../components/Invitation";
import { useSelector } from "react-redux";
import teamIcon from "../../assets/images/teams_img.png";

import { selectCreateGame } from "../../redux/createGameSlice/createGameSlice";
import { useNavigation } from "@react-navigation/native";

const AllTeams = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [teams, setTeams] = useState([]);
  const { needRefresh } = useSelector(selectCreateGame);

  useEffect(() => {
    onRefresh();
  }, [needRefresh]);

  const onRefresh = () => {
    axios.get("/team").then(({ data }) => {
      console.log("my teams name:", data.teams);
      setTeams(data.teams);
    });
  };

  return (
    <>
      {/* <Invitation /> */}
      <ScrollView
        style={{ backgroundColor: COLORS.background_blue, flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
      >
        <Heading title={t("team.my")} align="center" />
        {/* <View style={{ rowGap: 16, paddingHorizontal: 16, paddingBottom: 16 }}>
          {teams &&
            teams.map((teams) => {
              return (
                <LinearGradient
                  key={teams.id}
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
                    // onPress={() =>
                    //   navigation.navigate("team", { teamId: teams.id, teamName: teams.name })
                    //   // navigation.navigate("group", { id: group.id })
                    //   // navigation.navigate("team", { id: data.team.id})
                    // }
                    onPress={() =>
                      navigation.navigate("team", { 
                        teamId: teams.id, 
                        teamName: teams.name 
                      })
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
                      <Image
                        source={teamIcon}
                        style={{ width: 40, height: 40 }}
                      />
                      <PrimaryText
                        weight={600}
                        style={{ color: COLORS.lightWhite, fontSize: 16 }}
                      >
                        {teams.name}
                      </PrimaryText>
                    </View>
                  </TouchableWithoutFeedback>
                </LinearGradient>
              );
            })}
        </View> */}
        <View style={{ rowGap: 16, paddingHorizontal: 16, paddingBottom: 16 }}>
          {teams.length === 0 ? (
            <PrimaryText
              style={{
                fontSize: 18,
                color: COLORS.grey,
              }}
            >
              {t("team.other_team")}
            </PrimaryText>
          ) : (
            teams.map((team) => (
              <LinearGradient
                key={team.id}
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
                    navigation.navigate("team", {
                      teamId: team.id,
                      teamName: team.name,
                    })
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
                    <Image
                      source={teamIcon}
                      style={{ width: 40, height: 40 }}
                    />
                    <PrimaryText
                      weight={600}
                      style={{ color: COLORS.lightWhite, fontSize: 16 }}
                    >
                      {team.name}
                    </PrimaryText>
                  </View>
                </TouchableWithoutFeedback>
              </LinearGradient>
            ))
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default AllTeams;
