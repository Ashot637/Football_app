import {
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import PrimaryText from "../../components/PrimaryText";
import { COLORS } from "../../helpers/colors";
import Heading from "../../components/Heading";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "../../axios/axios";
import CrossIcon from "../../assets/images/cross.svg";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import { selectAuth } from "../../redux/authSlice/authSlice";

const TeamPage = ({ navigation, route }) => {
  const { teamName, teamId, userId, invitation, fromNotification } =
    route.params;
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector(selectAuth);
  const [team, setTeaam] = useState(null);

  const isCreator = user.id === userId;

  useEffect(() => {
    console.log(
      `TeamPage Loaded with Name: ${teamName}, ID: ${teamId}, UserID: ${userId},`
    );
  }, [teamName, teamId, userId]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(`/team/getUsers?teamId=${teamId}`);
        console.log("Fetched players data:", response.data);
        // const playerNames = response.data.users.map(user => user.user.name);
        // console.log("Player Names:", playerNames);
        setTeaam(response.data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    if (teamId) {
      fetchPlayers();
    }
  }, [teamId]);

  useEffect(() => {
    console.log("Updated team state:", team);
  }, [team]);
  const onConfirm = async () => {
    try {
      const response = await axios.post("/team/accept", {
        id: invitation.id,
        teamId: teamId,
      });

      console.log("Response from /team/accept:", response.data);

      navigation.navigate("team-players", { id, refresh: Math.random() });
    } catch (error) {
      console.error("Error while accepting team invitation:", error);
    }
  };

  const onCancel = () => {
    if (!fromNotification) {
      axios.post("/team/invitation/decline", { id: invitation.id });
    }
    navigation.navigate("home");
  };

  const onDeleteTeam = async () => {
    try {
      const response = await axios.delete(`/team/delete/${teamId}`);
      console.log("Team deleted successfully:", response.data);
      navigation.reset({
        index: 0,
        routes: [{ name: "home" }],
      });
    } catch (error) {
      console.error(
        "Error deleting team:",
        error.response?.data || error.message
      );
    }
  };

  const onLeaveTeam = async () => {
    try {
      const response = await axios.post(`/team/leave/${teamId}`);
      console.log("Successfully left the team:", response.data);
      navigation.goBack();
    } catch (error) {
      console.error(
        "Error leaving team:",
        error.response?.data || error.message
      );
    }
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
            <Heading title={teamName || team?.name}  align="center" />
            <View style={{ paddingVertical: 10, paddingHorizontal: 16 }}>
              <TouchableOpacity
                testID="games"
                onPress={() => {
                  if (team?.users) {
                    navigation.navigate("team-players", {
                      title: teamName,
                      teamId: teamId,
                      userId: userId,
                      players: team.users,
                      isViewMode: !!invitation,
                    });
                  } else {
                    console.error("Team data or users are not yet loaded.");
                  }
                }}
                // onPress={goToTeamPlayers}
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
            {isCreator && (
              <TouchableOpacity
                // onPress={() =>
                //   navigation.navigate("create-game", {
                //     title: teamName,
                //     teamId: teamId,
                //     userId: userId,
                //   })
                // }
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
            )}
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
          onPress={onCancel}
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
          onPress={onConfirm}
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
      ) : (  */}
        <TouchableOpacity
          style={{
            height: 120,
            alignSelf: "center",
            // marginTop: 20,
            // paddingHorizontal: 14,
            paddingVertical: 5,
            // borderRadius: 8, // Rounded corners for the button
          }}
          /*  // onPress={async () => {
          //   console.log("Attempting to delete team with ID:", teamId);
          //   try {
          //     const response = await axios.delete(`/team/delete/${teamId}`);
          //     console.log("Team deleted successfully:", response.data);

          //     navigation.reset({
          //       index: 0,
          //       routes: [{ name: "home" }],
          //     });
          //   } catch (error) {
          //     // console.error("Error deleting team:", error.response?.data || error.message);
          //     console.error("Request Error:", {
          //       message: error.message,
          //       config: error.config,
          //       response: error.response?.data,
          //     });
          //   }
          // }}*/
          onPress={isCreator ? onDeleteTeam : onLeaveTeam}
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
            {isCreator ? t("team.delete") : () => {}}
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


