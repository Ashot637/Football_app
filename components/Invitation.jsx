//նախնական կոդ

// import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
// import PrimaryText from "./PrimaryText";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   deleteFirstInvitation,
//   selectAuth,
//   setUser,
// } from "../redux/authSlice/authSlice";
// import { COLORS } from "../helpers/colors";
// import { useTranslation } from "react-i18next";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import i18n from "../languages/i18n";
// import axios from "../axios/axios";
// import { format } from "date-fns";
// import { useEffect, useState } from "react";
// import { useNavigation } from "@react-navigation/native";

// const Invitation = () => {
//   const navigation = useNavigation();
//   const { t } = useTranslation();
//   const dispatch = useDispatch();
//   const { user } = useSelector(selectAuth);
//   const [invitations, setInvitations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedInvitationIndex, setSelectedInvitationIndex] = useState(null);

//   // useEffect(() => {
//   //   const fetchInvitations = async () => {
//   //     console.log("Fetching invitations...");
//   //     try {
//   //       const accessToken = await AsyncStorage.getItem("accessToken");
//   //       if (!accessToken) {
//   //         console.error("Access token is missing.");
//   //         setLoading(false);
//   //         return;
//   //       }
//   //       console.log("Access token retrieved:", accessToken);
//   //       console.log("Language being sent to backend:", i18n.language);
//   //       const response = await axios.get(
//   //         `https://ballhola.app/service/api/v2/invitations/getAll`,
//   //         {
//   //           headers: {
//   //             Authorization: `Bearer ${accessToken}`,
//   //           },
//   //         }
//   //       );
//   //       console.log("Response data:", response.data);
//   //       setInvitations(response.data);
//   //       setLoading(false);
//   //       if (response.data.length === 0) {
//   //         console.log("No invitations found.");
//   //       }
//   //     } catch (error) {
//   //       console.error("Error fetching invitations:", error);
//   //       if (error.response) {
//   //         console.error("Response data:", error.response.data);
//   //         setLoading(false);
//   //       }
//   //     }
//   //   };

//   //   fetchInvitations();
//   // }, []);

  // useEffect(() => {
  //   const fetchInvitations = async () => {
  //     console.log("Fetching invitations...");
  //     try {
  //       const accessToken = await AsyncStorage.getItem("accessToken");
  //       if (!accessToken) {
  //         console.error("Access token is missing.");
  //         setLoading(false);
  //         return;
  //       }
  //       const response = await axios.get(
  //         `https://ballhola.app/service/api/v2/invitations/getAll`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         }
  //       );
  //       console.log("Response data:", response.data);
  //       setInvitations(response.data);
  //       setLoading(false);

  //       // Check if there is an invitation and if the user is the invitee, not the inviter
  //       if (response.data.length > 0 && response.data[0].from !== user.id) {
  //         setShowModal(true);
  //       }
  //     } catch (error) {
  //       setLoading(false);
  //       console.error("Error fetching invitations:", error);
  //     }
  //   };

  //   fetchInvitations();
  // }, []);

//   useEffect(() => {
//     const checkIfSenderAndNavigate = async () => {
//       if (user?.invitations?.length > 0) {
//         const invitation = user.invitations[0];
//         console.log("Current invitation:", invitation);

//         if (invitation.from === user.id) {
//           console.log("User is the inviter.");
//           if (invitation.hasGame) {
//             console.log("Navigating to game with ID:", invitation.gameId);
//             await AsyncStorage.setItem(
//               "invitationGameId",
//               String(invitation.gameId)
//             );
//             navigation.navigate("main", {
//               screen: "game",
//               params: { id: invitation.gameId, invitation },
//             });
//           } else if (invitation.type === "GROUP") {
//             console.log("Navigating to group with ID:", invitation.groupId);
//             navigation.navigate("group", { id: invitation.groupId });
//           }
//           dispatch(deleteFirstInvitation());
//           setShowModal(false);
//         } else {
//           console.log("User is not the inviter, showing modal.");
//           setShowModal(true);
//         }
//       } else {
//         setShowModal(false);
//       }
//     };

//     checkIfSenderAndNavigate();
//   }, [user?.invitations]);

//   // const onConfirm = async () => {
//   //   const invitation = user?.invitations[0];
//   //   console.log("onConfirm function called", invitation);

//   //   if (invitation?.type === "GROUP") {
//   //     navigation.navigate("group", { id: invitation.groupId });
//   //   } else if (invitation?.hasGame) {
//   //     await AsyncStorage.setItem('invitationGameId', String(invitation.gameId));
//   //     navigation.navigate("main", {
//   //       screen: "game",
//   //       params: { id: invitation.gameId, invitation },
//   //     });
//   //     console.log("Navigating to game with ID:", invitation.gameId);
//   //   }
//   //   dispatch(deleteFirstInvitation());
//   //   setShowModal(false);
//   // };

//   const onConfirm = async () => {
//     try {
//       const invitation = user?.invitations[0];
//       console.log("onConfirm function called", invitation);

//       setShowModal(false);

//       if (invitation?.gameId) {
//         await AsyncStorage.setItem(
//           "invitationGameId",
//           String(invitation.gameId)
//         );
//         navigation.navigate("main", {
//           screen: "game",
//           params: { id: invitation.gameId, invitation },
//         });
//         console.log("Navigating to game with ID:", invitation.gameId);
//       } else if (invitation?.groupId) {
//         navigation.navigate("group", { id: invitation.groupId });
//         console.log("Navigating to group with ID:", invitation.groupId);
//       } else {
//         console.warn("No valid game or group ID found in the invitation.");
//       }

//       setTimeout(() => {
//         dispatch(deleteFirstInvitation());
//       }, 100);
//     } catch (error) {
//       console.error("Error handling invitation confirmation:", error);
//     }
//   };

//   const onCancel = () => {
//     const invitationId = user?.invitations[0]?.id;

//     axios.post("/game/declineInvitation", { id: invitationId });
//     dispatch(deleteFirstInvitation());
//     setShowModal(false);
//   };

//   return (
//     showModal &&
//     user?.invitations?.length > 0 &&
//     user.invitations[0] &&
//     user.invitations[0].from && (
//       // showModal && user?.invitations?.length > 0 && user.invitations[0]?.from &&  (
//       <Modal visible transparent>
//         <View style={styles.overlay}>
//           <View style={styles.content}>
//             <PrimaryText style={styles.title}>
//               {t("invitation.title")}
//             </PrimaryText>
//             <PrimaryText style={styles.info} weight={600}>
//               {t("invitation.info", {
//                 name: user.name,
//                 from: user.invitations[0].from,
//                 // date: format(
//                 //   user.invitations[0]?.startTime,
//                 //   "dd.MM.yyyy HH:hh"
//                 // ),
//                 date: user.invitations[0]?.startTime
//                   ? format(
//                       new Date(user.invitations[0].startTime),
//                       "dd.MM.yyyy HH:mm"
//                     )
//                   : "invalid date",
//                 stadion: user.invitations[0]?.stadion,
//               })}
//             </PrimaryText>
//             <View style={styles.modalBtns}>
//               <TouchableOpacity onPress={onCancel} style={{ flex: 6 }}>
//                 <View style={styles.cancelBtn}>
//                   <PrimaryText style={styles.btnText} weight={600}>
//                     {t("common.cancel")}
//                   </PrimaryText>
//                 </View>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={onConfirm} style={{ flex: 8 }}>
//                 <View style={styles.submitbtn}>
//                   <PrimaryText
//                     style={[styles.btnText, { color: "#fff" }]}
//                     weight={600}
//                   >
//                     {t("common.see_more")}
//                   </PrimaryText>
//                 </View>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     )
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     alignItems: "center",
//     justifyContent: "center",
//     flex: 1,
//     paddingHorizontal: 16,
//     backgroundColor: "rgba(0,0,0,0.5)",
//   },
//   content: {
//     width: "100%",
//     backgroundColor: "#041440",
//     borderRadius: 25,
//     borderWidth: 0.5,
//     borderColor: "#007EFF",
//     paddingVertical: 32,
//     paddingHorizontal: 10,
//   },
//   title: {
//     marginBottom: 24,
//     color: "#fff",
//     fontSize: 22,
//     textAlign: "center",
//   },
//   info: {
//     fontSize: 16,
//     color: COLORS.lightWhite,
//     textAlign: "center",
//     marginHorizontal: 5,
//     marginBottom: 34,
//   },
//   modalBtns: {
//     flexDirection: "row",
//     columnGap: 15,
//     marginHorizontal: 20,
//   },
//   cancelBtn: {
//     backgroundColor: "#031852B2",
//     borderRadius: 15,
//     paddingVertical: 9,
//     borderColor: COLORS.lightWhite,
//     borderWidth: 1,
//   },
//   submitbtn: {
//     backgroundColor: "#0968CA",
//     borderRadius: 15,
//     paddingVertical: 10,
//   },
//   btnText: {
//     fontSize: 16,
//     textAlign: "center",
//     color: COLORS.lightWhite,
//   },
// });

// export default Invitation;
/*************************************************************************************************************** */


//թիմի հատվածն եմ ավելացրել

import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import PrimaryText from "./PrimaryText";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFirstInvitation,
  selectAuth,
} from "../redux/authSlice/authSlice";
import { COLORS } from "../helpers/colors";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "../axios/axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const Invitation = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuth);
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentInvitation, setCurrentInvitation] = useState(null);

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        if (!accessToken) {
          console.error("Access token is missing.");
          setLoading(false);
          return;
        }
        const response = await axios.get(
          `https://ballhola.app/service/api/v2/invitations/getAll`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log("Fetched invitations:", response.data);
        setInvitations(response.data);
        setLoading(false);

        if (response.data.length > 0) {
          const firstInvitation = response.data[0];
          console.log("First invitation data:", firstInvitation);
          setCurrentInvitation(firstInvitation);

          if (firstInvitation.from !== user.id) {
            setShowModal(true);
          }
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching invitations:", error);
      }
    };

    fetchInvitations();
  }, []);

  const onConfirm = async () => {
    try {
      const invitation = currentInvitation;
      console.log("Confirmed invitation data:", invitation);
      setShowModal(false);

      if (invitation?.gameId) {
        console.log("Navigating to game:", invitation.gameId);
        await AsyncStorage.setItem(
          "invitationGameId",
          String(invitation.gameId)
        );
        navigation.navigate("main", {
          screen: "game",
          params: { id: invitation.gameId, invitation },
        });
      } else if (invitation?.groupId) {
        console.log("Navigating to group:", invitation.groupId);
        navigation.navigate("group", { id: invitation.groupId });
      } else if (invitation?.teamId) {
        if (!invitation.teamId) {
          console.error("Missing teamId for TEAM invitation.");
          return;
      }
        console.log("Navigating to team:", invitation.teamId);
        navigation.navigate("team", { id: invitation.teamId });
      } else {
        console.warn(
          "No valid game, group, or team ID found in the invitation."
        );
      }

      setTimeout(() => {
        dispatch(deleteFirstInvitation());
      }, 100);
    } catch (error) {
      console.error("Error handling invitation confirmation:", error);
    }
  };

  const onCancel = () => {
    const invitationId = currentInvitation?.id;

    axios.post("/game/declineInvitation", { id: invitationId });
    dispatch(deleteFirstInvitation());
    setShowModal(false);
  };

  return (
    showModal &&
    currentInvitation && (
      <Modal visible transparent>
        <View style={styles.overlay}>
          <View style={styles.content}>
            <PrimaryText style={styles.title}>
              {currentInvitation.type === "TEAM"
                ? t("invitation-team.title")
                : t("invitation.title")}
            </PrimaryText>
            <PrimaryText style={styles.info} weight={600}>
              {currentInvitation.type === "TEAM"
                ? t("invitation-team.info", {
                    name: user.name,
                    
                    title: currentInvitation?.team?.name
                    // from: currentInvitation?.from,
                    // date: currentInvitation?.startTime
                    //     ? format(new Date(currentInvitation.startTime), "dd.MM.yyyy HH:mm")
                    //     : "invalid date",
                
                    // from: currentInvitation.from
                    // date: currentInvitation?.startTime

                      ? format(
                          new Date(currentInvitation.startTime),
                          "dd.MM.yyyy HH:mm"
                        )
                      : "invalid date",
                    title: currentInvitation?.title,
                  })
                : t("invitation.info", {
                    name: user.name,
                    from: currentInvitation.from,
                    date: currentInvitation?.startTime
                      ? format(
                          new Date(currentInvitation.startTime),
                          "dd.MM.yyyy HH:mm"
                        )
                      : "invalid date",
                    stadion: currentInvitation?.stadion,
                  })}
            </PrimaryText>
            <View style={styles.modalBtns}>
              <TouchableOpacity onPress={onCancel} style={{ flex: 6 }}>
                <View style={styles.cancelBtn}>
                  <PrimaryText style={styles.btnText} weight={600}>
                    {t("common.cancel")}
                  </PrimaryText>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={onConfirm} style={{ flex: 8 }}>
                <View style={styles.submitbtn}>
                  <PrimaryText
                    style={[styles.btnText, { color: "#fff" }]}
                    weight={600}
                  >
                    {t("common.see_more")}
                  </PrimaryText>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  );
};




const styles = StyleSheet.create({
  overlay: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    width: "100%",
    backgroundColor: "#041440",
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: "#007EFF",
    paddingVertical: 32,
    paddingHorizontal: 10,
  },
  title: {
    marginBottom: 24,
    color: "#fff",
    fontSize: 22,
    textAlign: "center",
  },
  info: {
    fontSize: 16,
    color: COLORS.lightWhite,
    textAlign: "center",
    marginHorizontal: 5,
    marginBottom: 34,
  },
  modalBtns: {
    flexDirection: "row",
    columnGap: 15,
    marginHorizontal: 20,
  },
  cancelBtn: {
    backgroundColor: "#031852B2",
    borderRadius: 15,
    paddingVertical: 9,
    borderColor: COLORS.lightWhite,
    borderWidth: 1,
  },
  submitbtn: {
    backgroundColor: "#0968CA",
    borderRadius: 15,
    paddingVertical: 10,
  },
  btnText: {
    fontSize: 16,
    textAlign: "center",
    color: COLORS.lightWhite,
  },
});

export default Invitation;


/*************************************************************************************************************** */
//հին կոդնա, խաղացող հրավիրելը ճիշտա աշխատում, բայց ամեն անգամ հավելված մտնելուց հարցնումա, իսկ խաղի հարվերը լինկը տանումա միանգամից խաղի էջ

// import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
// import PrimaryText from "./PrimaryText";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   deleteFirstInvitation,
//   selectAuth,
//   setUser,
// } from "../redux/authSlice/authSlice";
// import { COLORS } from "../helpers/colors";
// import { useTranslation } from "react-i18next";

// import axios from "../axios/axios";
// import { format } from "date-fns";
// import { useEffect, useState } from "react";
// import { useNavigation } from "@react-navigation/native";

// const Invitation = () => {
//   const navigation = useNavigation();
//   const { t } = useTranslation();
//   const dispatch = useDispatch();
//   const { user } = useSelector(selectAuth);
//   const [invitations, setInvitations] = useState([]);

//   useEffect(() => {
//     const fetchInvitations = async () => {
//       console.log("Fetching invitations...");
//       try {
//         const accessToken = await AsyncStorage.getItem("accessToken");
//         if (!accessToken) {
//           console.error("Access token is missing.");
//           setLoading(false);
//           return;
//         }
//         const response = await axios.get(
//           `https://ballhola.app/service/api/v2/invitations/getAll`,
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           }
//         );
//         console.log("Response data:", response.data);
//         setInvitations(response.data);
//         setLoading(false);

//         if (response.data.length > 0 && response.data[0].from !== user.id) {
//           setShowModal(true);
//         }
//       } catch (error) {
//         setLoading(false);
//         console.error("Error fetching invitations:", error);
//       }
//     };

//     fetchInvitations();
//   }, []);

//   const onConfirm = () => {
//     navigation.navigate("main", {
//       screen: "game",
//       params: {
//         id: user.invitations[0].gameId,
//         invitation: user?.invitations[0],
//       },
//     });
//     dispatch(deleteFirstInvitation());
//   };

//   const onCancel = () => {
//     axios.post("/game/declineInvitation", { id: user.invitations[0].id });
//     dispatch(deleteFirstInvitation());
//   };

//   useEffect(() => {
//     if (user?.invitations) {
//       if (user?.invitations[0]?.type === "GROUP") {
//         if (user?.invitations[0]?.hasGroup) {
//           navigation.navigate("group", {
//             id: user.invitations[0].groupId,
//           });
//           axios.post("/game/declineInvitation", { id: user.invitations[0].id });
//         } else {
//           navigation.navigate("group", {
//             id: user.invitations[0].groupId,
//             invitation: user.invitations[0],
//           });
//         }
//       } else if (user?.invitations[0]?.hasGame) {
//         navigation.navigate("main", {
//           screen: "game",
//           params: { id: user.invitations[0].gameId },
//         });
//         axios.post("/game/declineInvitation", { id: user.invitations[0].id });
//       }
//       dispatch(deleteFirstInvitation());
//     }
//   }, [user?.invitations?.[0]]);

//   return (
//     !!user?.invitations?.length &&
//     user?.invitations?.[0]?.startTime && (
//       <Modal visible transparent>
//         <View style={styles.overlay}>
//           <View style={styles.content}>
//             <PrimaryText style={styles.title}>
//               {t("invitation.title")}
//             </PrimaryText>
//             <PrimaryText style={styles.info} weight={600}>
//               {t("invitation.info", {
//                 name: user.name,
//                 from: user.invitations[0].from,
//                 date: format(
//                   user.invitations[0]?.startTime,
//                   "dd.MM.yyyy HH:hh"
//                 ),
//                 stadion: user.invitations[0]?.stadion,
//               })}
//             </PrimaryText>
//             <View style={styles.modalBtns}>
//               <TouchableOpacity onPress={onCancel} style={{ flex: 6 }}>
//                 <View style={styles.cancelBtn}>
//                   <PrimaryText style={styles.btnText} weight={600}>
//                     {t("common.cancel")}
//                   </PrimaryText>
//                 </View>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={onConfirm} style={{ flex: 8 }}>
//                 <View style={styles.submitbtn}>
//                   <PrimaryText
//                     style={[styles.btnText, { color: "#fff" }]}
//                     weight={600}
//                   >
//                     {t("common.see_more")}
//                   </PrimaryText>
//                 </View>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     )
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     alignItems: "center",
//     justifyContent: "center",
//     flex: 1,
//     paddingHorizontal: 16,
//     backgroundColor: "rgba(0,0,0,0.5)",
//   },
//   content: {
//     width: "100%",
//     backgroundColor: COLORS.black,
//     borderRadius: 25,
//     borderWidth: 0.5,
//     borderColor: COLORS.yellow,
//     paddingVertical: 32,
//     paddingHorizontal: 10,
//   },
//   title: {
//     marginBottom: 24,
//     color: "#fff",
//     fontSize: 22,
//     textAlign: "center",
//   },
//   info: {
//     fontSize: 16,
//     color: COLORS.lightWhite,
//     textAlign: "center",
//     marginHorizontal: 5,
//     marginBottom: 34,
//   },
//   modalBtns: {
//     flexDirection: "row",
//     columnGap: 15,
//     marginHorizontal: 20,
//   },
//   cancelBtn: {
//     backgroundColor: COLORS.darkgrey,
//     borderRadius: 15,
//     paddingVertical: 9,
//     borderColor: COLORS.lightWhite,
//     borderWidth: 1,
//   },
//   submitbtn: {
//     backgroundColor: "#0968CA",
//     borderRadius: 15,
//     paddingVertical: 10,
//   },
//   btnText: {
//     fontSize: 16,
//     textAlign: "center",
//     color: COLORS.lightWhite,
//   },
// });

// export default Invitation;



//թիմ

// import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
// import PrimaryText from "./PrimaryText";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   deleteFirstInvitation,
//   selectAuth,
// } from "../redux/authSlice/authSlice";
// import { COLORS } from "../helpers/colors";
// import { useTranslation } from "react-i18next";
// import axios from "../axios/axios";
// import { format } from "date-fns";
// import { useEffect, useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useNavigation } from "@react-navigation/native";

// const Invitation = () => {
//   const navigation = useNavigation();
//   const { t } = useTranslation();
//   const dispatch = useDispatch();
//   const { user } = useSelector(selectAuth);
//   const [invitations, setInvitations] = useState([]);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     const fetchInvitations = async () => {
//       try {
//         const accessToken = await AsyncStorage.getItem("accessToken");
//         if (!accessToken) {
//           console.error("Access token is missing.");
//           return;
//         }
//         const response = await axios.get(
//           `https://ballhola.app/service/api/v2/invitations/getAll`,
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           }
//         );
//         setInvitations(response.data);

//         if (response.data.length > 0 && response.data[0].from !== user.id) {
//           setShowModal(true);
//         }
//       } catch (error) {
//         console.error("Error fetching invitations:", error);
//       }
//     };

//     fetchInvitations();
//   }, []);

//   const onConfirm = () => {
//     const invitation = invitations[0];
//     if (invitation.type === "GROUP") {
//       navigation.navigate("group", { id: invitation.groupId });
//     } else if (invitation.type === "GAME") {
//       navigation.navigate("main", {
//         screen: "game",
//         params: { id: invitation.gameId },
//       });
//     } else if (invitation.type === "TEAM") {
//       navigation.navigate("team", {
//         id: invitation.teamId,
//         name: invitation.teamName,
//       });
//     }
//     setShowModal(false);
//     dispatch(deleteFirstInvitation());
//   };

//   const onCancel = () => {
//     if (invitations.length > 0) {
//       axios.post("/game/declineInvitation", { id: invitations[0].id });
//     }
//     setShowModal(false);
//     dispatch(deleteFirstInvitation());
//   };

//   useEffect(() => {
//     if (user?.invitations?.[0]?.type === "TEAM") {
//       navigation.navigate("team", {
//         id: user.invitations[0].teamId,
//         name: user.invitations[0].teamName,
//       });
//       axios.post("/game/declineInvitation", { id: user.invitations[0].id });
//       dispatch(deleteFirstInvitation());
//     }
//   }, [user?.invitations?.[0]]);

//   return (
//     showModal &&
//     !!invitations.length &&
//     invitations[0].startTime && (
//       <Modal visible transparent>
//         <View style={styles.overlay}>
//           <View style={styles.content}>
//             <PrimaryText style={styles.title}>
//               {t("invitation-team.title")}
//             </PrimaryText>
//             <PrimaryText style={styles.info} weight={600}>
//               {t("invitation-team.info", {
//                 name: user.name,
//                 from: invitations[0].from,
//                 date: format(invitations[0]?.startTime, "dd.MM.yyyy HH:mm"),
//                 stadion: invitations[0]?.stadion,
//                 teamName: invitations[0]?.teamName,
//               })}
//             </PrimaryText>
//             <View style={styles.modalBtns}>
//               <TouchableOpacity onPress={onCancel} style={{ flex: 6 }}>
//                 <View style={styles.cancelBtn}>
//                   <PrimaryText style={styles.btnText} weight={600}>
//                     {t("common.cancel")}
//                   </PrimaryText>
//                 </View>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={onConfirm} style={{ flex: 8 }}>
//                 <View style={styles.submitbtn}>
//                   <PrimaryText
//                     style={[styles.btnText, { color: "#fff" }]}
//                     weight={600}
//                   >
//                     {t("common.see_more")}
//                   </PrimaryText>
//                 </View>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     )
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     alignItems: "center",
//     justifyContent: "center",
//     flex: 1,
//     paddingHorizontal: 16,
//     backgroundColor: "rgba(0,0,0,0.5)",
//   },
//   content: {
//     width: "100%",
//     backgroundColor: COLORS.black,
//     borderRadius: 25,
//     borderWidth: 0.5,
//     borderColor: COLORS.yellow,
//     paddingVertical: 32,
//     paddingHorizontal: 10,
//   },
//   title: {
//     marginBottom: 24,
//     color: "#fff",
//     fontSize: 22,
//     textAlign: "center",
//   },
//   info: {
//     fontSize: 16,
//     color: COLORS.lightWhite,
//     textAlign: "center",
//     marginHorizontal: 5,
//     marginBottom: 34,
//   },
//   modalBtns: {
//     flexDirection: "row",
//     columnGap: 15,
//     marginHorizontal: 20,
//   },
//   cancelBtn: {
//     backgroundColor: COLORS.darkgrey,
//     borderRadius: 15,
//     paddingVertical: 9,
//     borderColor: COLORS.lightWhite,
//     borderWidth: 1,
//   },
//   submitbtn: {
//     backgroundColor: "#0968CA",
//     borderRadius: 15,
//     paddingVertical: 10,
//   },
//   btnText: {
//     fontSize: 16,
//     textAlign: "center",
//     color: COLORS.lightWhite,
//   },
// });

// export default Invitation;
