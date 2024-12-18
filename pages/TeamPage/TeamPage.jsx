// import {
//     ActivityIndicator,
//     ScrollView,
//     StyleSheet,
//     TouchableOpacity,
//     View,
//   } from "react-native";
//   import PrimaryText from "../../components/PrimaryText";
//   import { COLORS } from "../../helpers/colors";
//   import { useTranslation } from "react-i18next";

//   import Heading from "../../components/Heading";

//   import { useEffect, useLayoutEffect, useState } from "react";
//   import axios from "../../axios/axios";
//   import { useSelector } from "react-redux";
//   import { selectAuth } from "../../redux/authSlice/authSlice";
//   import { selectCreateGame } from "../../redux/createGameSlice/createGameSlice";

//   const TeamPage = ({ navigation, route }) => {
//     const { id, invitation, refresh, fromNotification } = route.params;
//     const { t } = useTranslation();
//     const { user } = useSelector(selectAuth);
//     const { needRefresh } = useSelector(selectCreateGame);
//     const [isLoading, setIsLoading] = useState(true);
//     const [group, setGroup] = useState(null);

//     useLayoutEffect(() => {
//       setIsLoading(true);
//       axios.get("/group/getOne/" + id).then(({ data }) => {
//         setGroup(data);
//         setIsLoading(false);
//       });
//     }, [id, refresh, needRefresh]);

//     const onConfirm = async () => {
//       if (fromNotification) {
//         await axios.post("/group/joinToGroup", {
//           id: group.id,
//           notificationId: fromNotification.notificationId,
//         });
//       } else {
//         await axios.post("/game/acceptInvitation", {
//           id: invitation.id,
//         });
//       }
//       navigation.navigate("group", { id, refresh: Math.random() });
//     };

//     const onCancel = () => {
//       if (!fromNotification) {
//         axios.post("/game/declineInvitation", { id: invitation.id });
//       }
//       navigation.navigate("home");
//     };

//     return (
//       <>
//         <ScrollView style={[styles.container]}>
//           <View style={{ flex: 1 }}>
//             {isLoading && (
//               <View
//                 style={{
//                   flex: 1,
//                   height: 200,
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <ActivityIndicator
//                   size={"large"}
//                   style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
//                   color={COLORS.yellow}
//                 />
//               </View>
//             )}
//             {!isLoading && group && (
//               <>
//                 <Heading title={group.title} align="center" />
//                 <View style={{ paddingVertical: 24, paddingHorizontal: 16 }}>
//                   <TouchableOpacity
//                     testID="games"
//                     onPress={() =>
//                       navigation.navigate("team-matches", {
//                         games: group.game,
//                         title: group.title,
//                         id: group.id,
//                         ownerId: group.ownerId,
//                         isViewMode: !!invitation,
//                       })
//                     }
//                     style={styles.block}
//                   >
//                     <PrimaryText
//                       weight={600}
//                       style={{
//                         fontSize: 20,
//                         color: COLORS.lightWhite,
//                         textAlign: "center",
//                       }}
//                     >
//                       {t("common.games")}
//                     </PrimaryText>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     testID="players"
//                     onPress={() =>
//                       navigation.navigate("all-temas", {
//                         players: group.Users,
//                         title: group.title,
//                         id: group.id,
//                         isViewMode: !!invitation,
//                       })
//                     }
//                     style={styles.block}
//                   >
//                     <PrimaryText
//                       weight={600}
//                       style={{
//                         fontSize: 20,
//                         color: COLORS.lightWhite,
//                         textAlign: "center",
//                       }}
//                     >
//                       {t("team.teams")}
//                     </PrimaryText>
//                   </TouchableOpacity>
//                   {!invitation && (
//                     <TouchableOpacity
//                       testID="chat"
//                       style={styles.block}
//                       onPress={() => {
//                         navigation.navigate("chat", {
//                         // navigation.navigate("team-statistics", {

//                           groupId: group.id,
//                           groupTitle: group.title,
//                         });
//                       }}
//                     >
//                       <PrimaryText
//                         weight={600}
//                         style={{
//                           fontSize: 20,
//                           color: COLORS.lightWhite,
//                           textAlign: "center",
//                         }}
//                       >
//                         {t("team.statistics")}
//                       </PrimaryText>
//                     </TouchableOpacity>
//                   )}

//                 </View>
//               </>
//             )}
//           </View>
//           {isLoading ? null : invitation || fromNotification ? (
//             <View
//               style={{
//                 paddingHorizontal: 16,
//                 paddingBottom: 20,
//                 flexDirection: "row",
//                 alignItems: "stretch",
//                 columnGap: 20,
//               }}
//             >
//               <TouchableOpacity
//                 onPress={onCancel}
//                 style={{
//                   flex: 1,
//                   backgroundColor: "#E1D4F766",
//                   borderWidth: 1.5,
//                   borderColor: COLORS.lightWhite,
//                   borderRadius: 15,
//                   height: 60,
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <PrimaryText
//                   weight={600}
//                   style={{ fontSize: 20, color: COLORS.lightWhite }}
//                 >
//                   {t("common.cancel")}
//                 </PrimaryText>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={onConfirm}
//                 style={{
//                   flex: 1,
//                   backgroundColor: COLORS.cyan,
//                   borderColor: COLORS.cyan,
//                   borderRadius: 15,
//                   alignItems: "center",
//                   justifyContent: "center",
//                 }}
//               >
//                 <PrimaryText weight={600} style={{ fontSize: 20 }}>
//                   {t("common.accept")}
//                 </PrimaryText>
//               </TouchableOpacity>
//             </View>
//           ) : (
//             <TouchableOpacity
//               onPress={() => {
//                 if (group?.ownerId === user?.id) {
//                   axios.delete("/group/delete/" + id);
//                 } else {
//                   axios.delete("/group/leave/" + id);
//                 }
//                 navigation.reset({
//                   index: 0,
//                   routes: [{ name: "home" }],
//                 });
//               }}
//             >
//               <PrimaryText
//                 style={{
//                   fontSize: 17,
//                   color: "#68F4E4",
//                   textAlign: "center",
//                   marginBottom: 23,
//                 }}
//               >
//                 {group?.ownerId === user?.id
//                   ? t("team.delete")
//                   : t("team.leave")}
//               </PrimaryText>
//             </TouchableOpacity>
//           )}
//         </ScrollView>
//       </>
//     );
//   };

//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: COLORS.background_blue,
//     },
//     block: {
//       backgroundColor: "#032176",
//       paddingVertical: 33,
//       borderRadius: 24,
//       marginBottom: 30,
//     },
//   });

//   export default TeamPage;

/**********************************նախնական  */
// import {
//   ActivityIndicator,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import PrimaryText from "../../components/PrimaryText";
// import { COLORS } from "../../helpers/colors";
// import { useTranslation } from "react-i18next";

// import Heading from "../../components/Heading";

// import { useEffect, useLayoutEffect, useState } from "react";
// import axios from "../../axios/axios";
// import { useSelector } from "react-redux";
// import { selectAuth } from "../../redux/authSlice/authSlice";
// import { selectCreateGame } from "../../redux/createGameSlice/createGameSlice";

// const TeamPage = ({ navigation, route }) => {
//   const { id, invitation, refresh, fromNotification, teamName } = route.params;
//   const { t } = useTranslation();
//   // const { user } = useSelector(selectAuth);
//   const { needRefresh } = useSelector(selectCreateGame);
//   const [isLoading, setIsLoading] = useState(true);
//   // const [team, setTeam] = useState(null);
//   const [team, setTeam] = useState({ name: teamName });

//   // useEffect(() => {
//   //   setIsLoading(true);
//   //   axios
//   //     .get(`/team/${id}`)
//   //     .then(({ data }) => {
//   //       console.log(" ----------------------------------------------");
//   //       console.log("Fetched team data:", data);
//   //       // setTeam(data.team);
//   //       setTeam({ name: data.team?.name || "Unknown Team" });
//   //       setIsLoading(false);
//   //     })
//   //     .catch(() => {
//   //       // console.error("Error fetching team data:", error);
//   //       setIsLoading(false);
//   //     });
//   // }, [id, refresh, needRefresh]);
//   useEffect(() => {
//     // Update the team name when route params change
//     setTeam({ name: teamName });
//     setIsLoading(true);

//     // Fetch team details using the ID
//     axios
//       .get(`/team/${id}`)
//       .then(({ data }) => {
//         setTeam({ name: data.team?.name || "Unknown Team" });
//         setIsLoading(false);
//       })
//       .catch(() => {
//         setIsLoading(false);
//       });
//   }, [id, teamName]);

//   // const onConfirm = async () => {
//   //   if (fromNotification) {
//   //     await axios.post("/group/joinToGroup", {
//   //       id: group.id,
//   //       notificationId: fromNotification.notificationId,
//   //     });
//   //   } else {
//   //     await axios.post("/game/acceptInvitation", {
//   //       id: invitation.id,
//   //     });
//   //   }
//   //   navigation.navigate("group", { id, refresh: Math.random() });
//   // };

//   // const onCancel = () => {
//   //   if (!fromNotification) {
//   //     axios.post("/game/declineInvitation", { id: invitation.id });
//   //   }
//   //   navigation.navigate("home");
//   // };

//   return (
//     <>
//       <ScrollView style={[styles.container]}>
//         <View style={{ flex: 1 }}>
//           {isLoading ? (
//             <View
//               style={{
//                 flex: 1,
//                 height: 200,
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <ActivityIndicator
//                 size={"large"}
//                 style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
//                 color={COLORS.yellow}
//               />
//             </View>
//           ) : (
//             // {!isLoading && team && (
//             <>
//               <Heading title={team.name} align="center" />
//               <View style={{ paddingVertical: 24, paddingHorizontal: 16 }}>
//                 <TouchableOpacity
//                   testID="games"
//                   onPress={() =>
//                     navigation.navigate("team-players", {
//                       title: team.name,
//                       // isViewMode: !!invitation,
//                     })
//                   }
//                   style={styles.block}
//                 >
//                   <PrimaryText
//                     weight={600}
//                     style={{
//                       fontSize: 20,
//                       color: COLORS.lightWhite,
//                       textAlign: "center",
//                     }}
//                   >
//                     {t("team.players")}
//                   </PrimaryText>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   testID="teams"
//                   onPress={() =>
//                     navigation.navigate("team-statistics", {
//                       title: team.name,

//                       // isViewMode: !!invitation,
//                     })
//                   }
//                   style={styles.block}
//                 >
//                   <PrimaryText
//                     weight={600}
//                     style={{
//                       fontSize: 20,
//                       color: COLORS.lightWhite,
//                       textAlign: "center",
//                     }}
//                   >
//                     {/* {t("team.teams")} */}
//                     {t("team.statistics")}
//                   </PrimaryText>
//                 </TouchableOpacity>
//                 {!invitation && (
//                   <TouchableOpacity
//                     testID="chat"
//                     style={styles.block}
//                     onPress={() => {
//                       // navigation.navigate("chat", {
//                       navigation.navigate("story_game", {
//                         title: team.name,
//                       });
//                     }}
//                   >
//                     <PrimaryText
//                       weight={600}
//                       style={{
//                         fontSize: 20,
//                         color: COLORS.lightWhite,
//                         textAlign: "center",
//                       }}
//                     >
//                       {t("team.story_game")}
//                     </PrimaryText>
//                   </TouchableOpacity>
//                 )}
//               </View>
//             </>
//           )}
//         </View>
//         {isLoading ? null : invitation || fromNotification ? (
//           <View
//             style={{
//               paddingHorizontal: 16,
//               paddingBottom: 20,
//               flexDirection: "row",
//               alignItems: "stretch",
//               columnGap: 20,
//             }}
//           >
//             <TouchableOpacity
//               onPress={onCancel}
//               style={{
//                 flex: 1,
//                 backgroundColor: "#E1D4F766",
//                 borderWidth: 1.5,
//                 borderColor: COLORS.lightWhite,
//                 borderRadius: 15,
//                 height: 60,
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <PrimaryText
//                 weight={600}
//                 style={{ fontSize: 20, color: COLORS.lightWhite }}
//               >
//                 {t("common.cancel")}
//               </PrimaryText>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={onConfirm}
//               style={{
//                 flex: 1,
//                 backgroundColor: COLORS.cyan,
//                 borderColor: COLORS.cyan,
//                 borderRadius: 15,
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <PrimaryText weight={600} style={{ fontSize: 20 }}>
//                 {t("common.accept")}
//               </PrimaryText>
//             </TouchableOpacity>
//           </View>
//         ) : (
//           <TouchableOpacity
//             // onPress={() => {
//             //  axios.delete(`/team/delete/id`);
//             //  console.log(`Team with ID: ${id} has been successfully deleted.`);
//             //   navigation.reset({
//             //     index: 0,
//             //     routes: [{ name: "home" }],
//             //   });
//             // }}
            // onPress={async () => {
            //   try {
            //     setIsLoading(true);
            //     const response = await axios.delete(`/team/delete/id`);
            //     if (!response.data.success) {
            //       throw new Error(response.data.message || "Deletion failed.");
            //     }
            //     console.log(
            //       `Team with ID: ${id} has been successfully deleted.`
            //     );
            //     navigation.reset({
            //       index: 0,
            //       routes: [{ name: "home" }],
            //     });
            //   } catch (error) {
            //     console.error("Error deleting the team:", error.message);
            //     console.log(`Failed to delete the team: ${error.message}`);
            //   } finally {
            //     setIsLoading(false);
            //   }
            // }}
//           >
//             <PrimaryText
//               style={{
//                 fontSize: 17,
//                 color: "#68F4E4",
//                 textAlign: "center",
//                 marginBottom: 23,
//               }}
//             >
//               {t("team.delete")}
//             </PrimaryText>
//           </TouchableOpacity>
//         )}
//       </ScrollView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background_blue,
//   },
//   block: {
//     backgroundColor: "#032176",
//     paddingVertical: 33,
//     borderRadius: 24,
//     marginBottom: 30,
//   },
// });

// export default TeamPage;









import { StyleSheet,ActivityIndicator, ScrollView, TouchableOpacity, View } from "react-native";
import PrimaryText from "../../components/PrimaryText";
import { COLORS } from "../../helpers/colors";
import Heading from "../../components/Heading";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";
import CrossIcon from "../../assets/images/cross.svg";
import { LinearGradient } from "expo-linear-gradient";



const TeamPage = ({ navigation, route }) => {
  const { teamName, teamId, userId, invitation, fromNotification } = route.params;
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(`TeamPage Loaded with Name: ${teamName}, ID: ${teamId}, UserID: ${userId},`);
  }, [teamName, teamId, userId ]);


  // const onConfirm = async () => {
  //   if (fromNotification) {
  //     await axios.post("/group/joinToGroup", {
  //       teamId: team.teamId,
  //       notificationId: fromNotification.notificationId,
  //     });
  //   } else {
  //     await axios.post("/team/accept", {
  //       id: invitation.id,
  //     });
  //   }
  //   navigation.navigate("team-players", { id, refresh: Math.random() });
  // };
  const onConfirm = async () => {
    await axios.post("/team/accept", {
      id: invitation.id, 
      teamId: teamId,  
    });
    navigation.navigate("team-players", { id, refresh: Math.random() });
  };


  const onCancel = () => {
    // if (!fromNotification) {
    //   axios.post("/team/declineInvitation", { id: invitation.id });
    // }
    navigation.navigate("home");
  };

  return (
    <>
    <ScrollView style={[styles.container]}>
      <View style={{ flex: 1 }}>
      {/* {isLoading && (
            <View
              style={{
                flex: 1,
                height: 200,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator
                size={"large"}
                style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
                color={COLORS.yellow}
              />
            </View>
          )}
          {!isLoading && group && ( */}
            <>
        <Heading title={teamName} align="center" />
        <View style={{ paddingVertical: 10, paddingHorizontal: 16 }}>
          <TouchableOpacity
            testID="games"
            onPress={() =>
              navigation.navigate("team-players", {
                title: teamName,
                teamId: teamId,
                userId: userId,
                isViewMode: !!invitation,
              })
            }
            style={styles.block}
          >
            <PrimaryText
              weight={600}
              // colors={["rgba(255, 255, 255, 0)", "rgba(12, 249, 221, 0.8)"]}
              // start={{ x: 0, y: 0 }}
              // end={{ x: 1, y: 1 }}
              // locations={[0.1564, 0.9972]}
              style={{
                
                fontSize: 20,
                color: COLORS.lightWhite,
                textAlign: "center",
              }}
            >
               {t("team.players")}
            </PrimaryText>
          </TouchableOpacity>
          <TouchableOpacity
            testID="teams"
            onPress={() =>
              navigation.navigate("team-statistics", {
                title: teamName,
              })
            }
            style={styles.block}
          >
            <PrimaryText
              weight={600}
              style={{
                fontSize: 20,
                color: COLORS.lightWhite,
                textAlign: "center",
              }}
            >
             {t("team.statistics")}
            </PrimaryText>
          </TouchableOpacity>
          {!invitation && (
            <TouchableOpacity
              testID="chat"
              style={styles.block}
              onPress={() => {
                navigation.navigate("story_game", {
                  title: teamName,
                });
              }}
            >
              <PrimaryText
                weight={600}
                style={{
                  fontSize: 20,
                  color: COLORS.lightWhite,
                  textAlign: "center",
                }}
              >
                {t("team.story_game")}
              </PrimaryText>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
        onPress={() => navigation.navigate("create-game")}
        style={{
          position: "absolute",
          right: 14,
          bottom: -25,
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
            {t("create_game.create")}
          </PrimaryText>
        </LinearGradient>
      </TouchableOpacity>
        </>
        
          {/* )} */}
          
      </View>
      
     
      {/* {isLoading ? null : invitation || fromNotification ? (
        <View
          style={{
            paddingHorizontal: 16,
            paddingBottom: 20,
            flexDirection: "row",
            alignItems: "stretch",
            columnGap: 20,
          }}
        >
          <TouchableOpacity
          // onPress={onCancel}
            style={{
              flex: 1,
              backgroundColor: "#E1D4F766",
              borderWidth: 1.5,
              borderColor: COLORS.lightWhite,
              borderRadius: 15,
              height: 60,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PrimaryText
              weight={600}
              style={{ fontSize: 20, color: COLORS.lightWhite }}
            >
             {t("common.cancel")}
            </PrimaryText>
          </TouchableOpacity>
          <TouchableOpacity
          // onPress={onConfirm}
            style={{
              flex: 1,
              backgroundColor: COLORS.cyan,
              borderColor: COLORS.cyan,
              borderRadius: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PrimaryText weight={600} style={{ fontSize: 20 }}>
            {t("common.accept")}
            </PrimaryText>
          </TouchableOpacity>
        </View>
      ) : ( */}
        <TouchableOpacity
        style={{
          height: 120,  
          alignSelf: "center",
          // marginTop: 20,
          // paddingHorizontal: 14,
          paddingVertical: 5,
          // borderRadius: 8, // Rounded corners for the button
        }}
          // onPress={() => {
          //   console.log("Attempting to delete team...");
          //    axios.delete(`/team/delete/id`  );
              
          //    navigation.reset({
          //       index: 0,
          //       routes: [{ name: "home" }],
          //     });
          //   }}

          // onPress={() => {
          //   // console.log("Attempting to delete team with ID:", );
          //   axios
          //     .delete(`/team/delete/id`) 
          //     .then((response) => {
          //       console.log("Team deleted successfully:", response.data);
          //       navigation.reset({
          //         index: 0,
          //         routes: [{ name: "home" }], 
          //       });
          //     })
          //     .catch((error) => {
          //       console.error("Error deleting team:", error.response?.data || error.message);
          //     });
          // }}
            // onPress={() => {
            //       axios.delete("/team/delete/" + teamId);
                
            //     navigation.reset({
            //       index: 0,
            //       routes: [{ name: "home" }],
            //     });
            //   }}
          
            onPress={() => {
              console.log("Attempting to delete team with ID:", teamId);
            
              axios
                .delete(`/team/delete/id`)
                .then((response) => {
                  console.log("Team deleted successfully:", response.data);
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "home" }],
                  });
                })
                .catch((error) => {
                  console.error("Error deleting team:", error.response?.data || error.message);
                });
            }}
            
            // onPress={() => {
            //   console.log("Attempting to delete team with ID:", teamId);
            //   axios
            //     .delete(`/team/delete`, { id: teamId })  
            //     .then((response) => {
            //       console.log("Team deleted successfully:", response.data);
            //       navigation.reset({
            //         index: 0,
            //         routes: [{ name: "home" }],
            //       });
            //     })
            //     .catch((error) => {
            //       console.error("Error deleting team:", error.response?.data || error.message);
            //     });
            // }}
            
        >
          <PrimaryText
            style={{
              fontSize: 17,
              color: "#68F4E4",
              textAlign: "center",
              marginBottom: 25,
              marginTop: 50,
            }}
            
          >
             {/* {team?.userId === user?.id
                ? t("team.delete")
                : t("team.leave")} */}
            {t("team.delete")}
          </PrimaryText>
        </TouchableOpacity>
      {/* )} */}
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background_blue,
  },
  block: {
    backgroundColor: "#032176",
    paddingVertical: 30,
    borderRadius: 24,
    marginBottom: 25,
  },
});

export default TeamPage;

