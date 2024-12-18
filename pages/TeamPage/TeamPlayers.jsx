// import {
//   Image,
//   ScrollView,
//   TouchableOpacity,
//   View,
//   TouchableWithoutFeedback,
//   Share,
// } from "react-native";
// import React, { useState } from "react";
// import Heading from "../../components/Heading";
// import { useTranslation } from "react-i18next";
// import { COLORS } from "../../helpers/colors";
// import Game from "../../components/Game";
// import { LinearGradient } from "expo-linear-gradient";
// import PrimaryText from "../../components/PrimaryText";
// import jwt from "expo-jwt";
// import { BASE_URL } from "../../axios/axios";
// import CrossIcon from "../../assets/images/cross.svg";
// import { useSelector } from "react-redux";
// import { selectAuth } from "../../redux/authSlice/authSlice";
// import avatarImg from "../../assets/images/avatar.png";
// import InvitationModal from "./InvitationTeam";

// const TeamPlayers = ({ navigation, route }) => {
//   const { t } = useTranslation();
//   const { user } = useSelector(selectAuth);
//   const [isOpenActions, setisOpenActions] = useState(false);
//   // const navigation = useNavigation();
//   const { id, title, games, isViewMode, ownerId } = route.params;
//   const [showInvitationModal, setShowInvitationModal] = useState(false);
//   // const currentUser = players.find((player) => player.id === user?.id);

//   const onShare = async () => {
//     try {
//       const token = jwt.encode(
//         { teamId: id, type: "TEAM" },
//         "You never can guess this k3y"
//       );
//       // console.log("Generated Token:", token);
//       const shareOptions = {
//         message: BASE_URL + `team-invite?token=${token}`,
//       };
//       console.log(" invite link:", shareOptions);
//       await Share.share(shareOptions);
//     } catch (error) {
//       console.error("Error sharing:", error);
//     }
//   };

//   const onShareTeam = async () => {
//     try {
//       const token = jwt.encode(
//         { teamId: id, type: "TEAM" },
//         "You never can guess this k3y"
//       );
//       // console.log("Generated Token:", token);
//       const shareOptions = {
//         message: BASE_URL + `team/inviteToGame=${token}`,
//       };
//       console.log("team invite link:", shareOptions);
//       await Share.share(shareOptions);
//     } catch (error) {
//       console.error("Error sharing:", error);
//     }
//   };

//   return (
//     <>
//       <ScrollView style={{ backgroundColor: COLORS.background_blue, flex: 1 }}>
//         <Heading align="center" title={t("common.players")} goBackButton />
//         <View style={{ rowGap: 16, paddingHorizontal: 16, paddingBottom: 16 }}>

//           <PrimaryText style={{ fontSize: 18, color: COLORS.grey }}>
//             {t("team.game")}
//           </PrimaryText>
//         </View>
//       </ScrollView>
//       {isOpenActions && (
//         <TouchableWithoutFeedback onPress={() => setisOpenActions(false)}>
//           <LinearGradient
//             colors={["rgba(11, 230, 204, 0.3)", "rgba(3, 24, 82, 0.1)"]}
//             start={[0, 0]}
//             end={[0.65, 0.65]}
//             style={{
//               position: "absolute",
//               bottom: 0,
//               left: 0,
//               right: 0,
//               top: 0,
//               backfaceVisibility: "hidden",
//               transform: [{ rotate: "180deg" }],
//             }}
//           ></LinearGradient>
//         </TouchableWithoutFeedback>
//       )}

//       <View
//         style={{
//           position: "absolute",
//           right: 14,
//           bottom: 17,
//           alignItems: "flex-end",
//         }}
//       >
//         {isOpenActions && (
//           <View style={{ rowGap: 15, marginBottom: 13 }}>
//             <TouchableOpacity
//             onPress={onShareTeam}
//             // testID="create-group"
//             // onPress={() => navigation.navigate("create-team")}
//             >
//               <LinearGradient
//                 start={{ x: 0, y: 0.5 }}
//                 end={{ x: 1, y: 0.5 }}
//                 colors={["#0DDDD5", "#68F4E4"]}
//                 style={{
//                   flexDirection: "row",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   height: 42,
//                   paddingHorizontal: 19,
//                   borderRadius: 40,
//                 }}
//               >
//                 <PrimaryText
//                   weight={600}
//                   style={{ color: "#0C2544", fontSize: 16 }}
//                 >
//                   {t("team.invite_team")}
//                 </PrimaryText>
//               </LinearGradient>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={onShare}>
//               <LinearGradient
//                 start={{ x: 0, y: 0.5 }}
//                 end={{ x: 1, y: 0.5 }}
//                 colors={["#0DDDD5", "#68F4E4"]}
//                 style={{
//                   flexDirection: "row",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   height: 42,
//                   paddingHorizontal: 19,
//                   borderRadius: 40,
//                 }}
//               >
//                 <PrimaryText
//                   weight={600}
//                   style={{ color: "#0C2544", fontSize: 16 }}
//                 >
//                   {t("team.invite_player")}
//                 </PrimaryText>
//               </LinearGradient>
//             </TouchableOpacity>
//           </View>
//         )}
//         <LinearGradient
//           start={{ x: 0, y: 0.5 }}
//           end={{ x: 1, y: 0.5 }}
//           colors={["#0DDDD5", "#68F4E4"]}
//           style={{
//             width: 60,
//             height: 60,
//             borderRadius: 30,
//           }}
//         >
//           <TouchableOpacity
//             testID="add-button"
//             style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
//             onPress={() => setisOpenActions((prev) => !prev)}
//           >
//             <CrossIcon width={20} height={20} />
//           </TouchableOpacity>
//         </LinearGradient>
//       </View>
//     </>
//   );
// };

// export default TeamPlayers;

//հիմնական կոդ

import {
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Share,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import { useTranslation } from "react-i18next";
import { COLORS } from "../../helpers/colors";
import Game from "../../components/Game";
import { LinearGradient } from "expo-linear-gradient";
import PrimaryText from "../../components/PrimaryText";
import jwt from "expo-jwt";
import { BASE_URL } from "../../axios/axios";
import CrossIcon from "../../assets/images/cross.svg";
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice/authSlice";
import avatarImg from "../../assets/images/avatar.png";
import InvitationModal from "./InvitationTeam";
import axios from "axios";

const TeamPlayers = ({ navigation, route }) => {
  const { t } = useTranslation();
  const { user } = useSelector(selectAuth);
  const [isOpenActions, setisOpenActions] = useState(false);
  const { title, userId, teamId, isViewMode } = route.params;
  const [showInvitationModal, setShowInvitationModal] = useState(false);
  // const currentUser = players.find((player) => player.id === user?.id);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // const currentUser = {
  //   name: user?.name || "Guest User",
  //   img: user?.img || avatarImg,
  // };

  // useEffect(() => {
  //   const fetchPlayers = async () => {
  //     setLoading(true);
  //     setError(""); 
  //     try {
  //       const response = await axios.get("/team/getUsers?teamId=288");
  //       // const response = await axios.get(`/team/getUsers?teamId=${teamId}`);
  //       setPlayers(response.data); 
  //     } catch (err) {
  //       console.error("Error fetching players:", err);
  //       setError("Failed to fetch players. Please try again later.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchPlayers(); 
  // }, [[teamId]]);
  

  const currentUser = {
    name: user?.name || "Guest User",
    img: user?.img || avatarImg,
  };

  // const currentUser = players.find((player) => player.id === user?.id);
  console.log("TeamPlayers Route Params:", { teamId, title, userId });
  const onShare = async () => {
    try {
      const token = jwt.encode(
        { teamId: teamId, type: "TEAM" },

        "You never can guess this k3y"
      );
      console.log("link:", { teamId, title });

      // console.log("Generated Token:", token);
      const shareOptions = {
        message: BASE_URL + `team-invite?token=${token}`,
      };
      console.log(" invite link:", shareOptions);
      await Share.share(shareOptions);
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <>
      <ScrollView style={{ backgroundColor: COLORS.background_blue, flex: 1 }}>
        <Heading align="center" title={t("common.players")} goBackButton />
        <View style={{ rowGap: 16, paddingHorizontal: 16, paddingBottom: 16 }}>
          {/* <PrimaryText style={{ fontSize: 18, color: COLORS.grey }}>
            {t("team.game")}
          </PrimaryText> */}

          <View
            style={{ rowGap: 10, paddingHorizontal: 16, paddingBottom: 16 }}
          >
            <View style={styles.player}>
              <View style={[styles.avatarView, styles.myAvatar]}>
                <Image style={styles.avatar} source={avatarImg} />
              </View>
              <View style={[styles.nameView, styles.me]}>
                <View style={styles.userInfo}>
                  <PrimaryText style={styles.name}>
                    {currentUser.name}({t("common.me")})
                  </PrimaryText>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {!isViewMode && (
        <TouchableOpacity
          testID="invite-players-button"
          onPress={onShare}
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
              {t("game.invite_a_player")}
            </PrimaryText>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  players: {
    rowGap: 14,
    marginBottom: 14,
  },
  player: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  me: {
    backgroundColor: "#0D5454",
  },
  avatarView: {
    borderWidth: 3,
    borderRadius: 32,
    borderColor: "#2F4F4F",
  },
  myAvatar: {
    borderColor: "#0D5454",
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
  },
  nameView: {
    backgroundColor: "#2F4F4F",
    paddingVertical: 16,
    borderRadius: 30,
    width: "100%",
    right: 0,
    paddingLeft: 80,
    paddingRight: 12,
    zIndex: -1,
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfo: {
    rowGap: 2,
  },
  name: {
    fontSize: 18,
    color: COLORS.lightblue,
  },
});
export default TeamPlayers;
