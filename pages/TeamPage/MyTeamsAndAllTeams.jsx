
import {
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
    TouchableWithoutFeedback,
  } from "react-native";
  import React, { useState } from "react";
  import teamIcon from "../../assets/images/teams_img.png";
  import { COLORS } from "../../helpers/colors";
  
  import Heading from "../../components/Heading";
  import { useTranslation } from "react-i18next";
  import PrimaryText from "../../components/PrimaryText";
  import { useSelector } from "react-redux";
  import { LinearGradient } from "expo-linear-gradient";
  // import ThereIsNoTeam from "./ThereIsNoTeam";
    import MyTeams from "./MyTeams";
    import AllTeams from "./AllTeams";
  
  
  const MyTeamsAndAllTeams = ({navigation}) => {
  
  const { t } = useTranslation();
  const [tab, setTab] = useState(0); 
  return (
    <>
    <ScrollView style={styles.container}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity style={{ flex: 1 }} onPress={() => setTab(0)}>
            <View
              style={[
                styles.option,
                tab == 1 ? styles.option : styles.optionActive,
              ]}
            >
              <PrimaryText
                style={[
                  { fontSize: 18 },
                  tab == 1 ? { color: "#F0F4FF" } : { color: "#1A82ED" },
                ]}
              >
                {t("team.my_team")}
              </PrimaryText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1 }} onPress={() => setTab(1)}>
            <View
              style={[
                styles.option,
                tab == 0 ? styles.option : styles.optionActive,
              ]}
            >
              <PrimaryText
                style={[
                  { fontSize: 18 },
                  tab == 0 ? { color: "#F0F4FF" } : { color: "#1A82ED" },
                ]}
              >
                {t("team.my")}
              </PrimaryText>
            </View>
          </TouchableOpacity>
        </View>
         {tab === 0 ? <MyTeams /> : <AllTeams />}
      </ScrollView>
      </>
  
  );
  };
  
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#041440",
      paddingVertical: 24,
    },
    option: {
      borderWidth: 1,
      color: "#F0F4FF",
      height: 45,
      alignItems: "center",
      justifyContent: "center",
      margin: 15,
      borderRadius: 30,
      borderColor: "#F0F4FF",
    },
  
    optionActive: {
      borderColor: "#1A82ED",
      backgroundColor: "#B2BED733",
    },
  });
  
  export default MyTeamsAndAllTeams;
  
  
  