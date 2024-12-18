// import {
//   Image,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
//   View,
//   Share,
//   TouchableWithoutFeedback,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import teamIcon from "../../assets/images/teams_img.png";

// import { COLORS } from "../../helpers/colors";

// import Heading from "../../components/Heading";
// import { useTranslation } from "react-i18next";
// import PrimaryText from "../../components/PrimaryText";
// import { useDispatch, useSelector } from "react-redux";
// import { LinearGradient } from "expo-linear-gradient";
// import ThereIsNoTeam from "./ThereIsNoTeam";
// import CrossIcon from "../../assets/images/cross.svg";
// import axios from "axios";
// // import { useSelector } from "react-redux";
// // import { selectCreateGame } from "../../redux/createGameSlice/createGameSlice";
// import { addTeam } from "../../redux/createTeamSlice/createTeamSlice";

// const All_Teams = ({navigation}) => {

// const { t } = useTranslation();
// const [tab, setTab] = useState(0);
// const dispatch = useDispatch();
// // const [teams, setTeams] = useState([]);
// const [isLoading, setIsLoading] = useState(true);

// const teams = useSelector((state) => state.createTeam.teams);

// // useEffect(() => {
// //   if (needRefresh) {
// //     setIsLoading(true);
// //     axios
// //       .get("/team/my") // Replace with your actual API endpoint if necessary
// //       .then((response) => {
// //         dispatch(setNeedRefresh(false)); // Reset refresh flag after fetching
// //         console.log("Response from /team/my:", response.data);
// //         // Assuming response.data is an array of teams
// //         dispatch(addTeam(response.data)); // Update Redux store with the new list of teams
// //         setIsLoading(false); // Set loading to false once the data is fetched
// //       })
// //       .catch((error) => {
// //         console.error("Error fetching teams:", error.response ? error.response.data : error);
// //         setIsLoading(false);
// //       });
// //   }
// // }, [needRefresh, dispatch]);

// useEffect(() => {
//     // Fetch teams from the backend and update the Redux store
//     axios
//       .get("/team/my")
//       .then((response) => {
//         dispatch(addTeam(response.data)); // Dispatch to store fetched teams
//         setIsLoading(false); // Set loading to false after fetching data
//       })
//       .catch((error) => {
//         console.error("Error fetching teams:", error.response ? error.response.data : error);
//         setIsLoading(false); // Set loading to false on error as well
//       });
//   }, [dispatch]);

// return (
//   <>
//   <ScrollView style={styles.container}>
//    <Heading title={t("team.my_team")} align="center" />
//       <View style={{ rowGap: 16, paddingHorizontal: 16, paddingBottom: 16 }}>
//       {teams.length > 0 ? (
//             teams.map((teams) => (
//                 <LinearGradient
//                 key={teams.id}
//                   colors={["#0CF9DD99", "#EF09A1CC"]}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 1 }}
//                   locations={[0.1564, 0.9972]}
//                   style={{
//                     borderRadius: 10,
//                     alignItems: "center",
//                     justifyContent: "center",
//                     height: 70,
//                   }}
//                 >

//                   <TouchableWithoutFeedback
//                     // onPress={() =>
//                     //   // navigation.navigate("group", { id: group.id })
//                     // }
//                   >
//                     <View
//                       style={{
//                         borderRadius: 10,
//                         flexDirection: "row",
//                         alignItems: "center",
//                         width: "99.6%",
//                         height: 68,
//                         columnGap: 12,
//                         paddingVertical: 14,
//                         paddingHorizontal: 20,
//                         backgroundColor: "#032176",
//                       }}
//                     >
//                       <Image
//                         source={teamIcon}
//                         style={{ width: 40, height: 40 }}
//                       />

//                       <PrimaryText
//                         weight={600}
//                         style={{ color: COLORS.lightWhite, fontSize: 16 }}
//                       >
//                        {teams.name}
//                        {/* {"BallHola team"} */}

//                       </PrimaryText>
//                     </View>
//                   </TouchableWithoutFeedback>
//                 </LinearGradient>
//      ))
//       ) : (

//         <PrimaryText style={{ fontSize: 18, color: COLORS.grey, margin:20 }}>
//                   {t("team.there_is_no_team")}
//         </PrimaryText>
//       )}
//         </View>

//     </ScrollView>

//     </>

// );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#041440",
//     paddingVertical: 24,
//   },
//   option: {
//     borderWidth: 1,
//     color: "#F0F4FF",
//     height: 45,
//     alignItems: "center",
//     justifyContent: "center",
//     margin: 15,
//     borderRadius: 30,
//     borderColor: "#F0F4FF",
//   },

//   optionActive: {
//     borderColor: "#1A82ED",
//     backgroundColor: "#B2BED733",
//   },
// });

// export default All_Teams;

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
import InvitationTeam from "./InvitationTeam";

const MyTeams = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [teams, setTeams] = useState([]);
  const { needRefresh } = useSelector(selectCreateGame);

  useEffect(() => {
    onRefresh();
  }, [needRefresh]);

  const onRefresh = () => {
    axios.get("/team/my").then(({ data }) => {
      // console.log("my teams name:", data.teams);
      setTeams(data.teams);
    });
  };

  return (
    <>
      <Invitation />
      {/* <InvitationTeam /> */}
     
      <ScrollView
        style={{ backgroundColor: COLORS.background_blue, flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
      >
        <Heading title={t("team.my_team")} align="center" />
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
              {t("team.there_is_no_team")}
            </PrimaryText>
          ) : (
            teams.map((teams) => (
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
                  //   navigation.navigate("team", {
                  //     teamId: team.id,
                  //     teamName: team.name,
                  //   })
                  // }
                  onPress={() => {
                    console.log(`Team clicked: Name = ${teams.name}, ID = ${teams.id}, ID = ${teams.userId}`);
                    navigation.navigate("team", {
                      teamId: teams.id,
                      teamName: teams.name,
                       userId: teams.userId,

                    });
                  }}
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
            ))
          )}
        </View>
      </ScrollView>
      {/* <TouchableOpacity
        testID="create-team"
        onPress={() => navigation.navigate("create-team")}
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
          <CrossIcon width={20} height={20} />
          <PrimaryText style={{ color: COLORS.darkgrey }}>
            {t("team.create")}
          </PrimaryText>
        </LinearGradient>
      </TouchableOpacity> */}
    </>
  );
};

export default MyTeams;
