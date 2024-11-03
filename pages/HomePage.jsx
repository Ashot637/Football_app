import { useEffect, useState } from "react";

import {
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import PrimaryText from "../components/PrimaryText";

import { COLORS } from "../helpers/colors";

import { useNavigation } from "@react-navigation/native";

import myGamesImg from "../assets/images/my-games2.png";
import myGroupsImg from "../assets/images/my-groups2.png";
import openGamesImg from "../assets/images/public-games2.png";
import stadiumsImg from "../assets/images/stadiums2.png";
import { LinearGradient } from "expo-linear-gradient";

import CrossIcon from "../assets/images/cross.svg";
import Invitation from "../components/Invitation";
// import { useTranslation } from "react-i18next";
import axios from "axios";
import { useTranslation } from "react-i18next";

const blocks = [
  {
    img: myGamesImg,
    title: "home.my_games",
    link: "my-games",
    testId: "my-games",
  },
  {
    img: myGroupsImg,
    title: "home.my_groups",
    link: "groups",
    testId: "my-groups",
  },
  {
    img: openGamesImg,
    title: "home.open_games",
    link: "open-games",
    testId: "public-games",
  },
  {
    img: stadiumsImg,
    title: "common.stadiums",
    link: "stadiums_main",
    testId: "stadiums",
  },
];

const HomePage = () => {
  const { t } = useTranslation();
  const [isOpenActions, setisOpenActions] = useState(false);
  const navigation = useNavigation();

  return (
    <>
      <Invitation />
      <View style={styles.container}>
        <View style={styles.blocks}>
          {blocks.map((block, index) => {
            return (
              <LinearGradient
                colors={["#EF09A1", "rgba(239, 78, 9, 0)"]}
                start={[1, 1]}
                end={[0, 0.5]}
                style={styles.bg}
                key={block.title}
              >
                <TouchableWithoutFeedback
                  // testID={block.testId}
                  onPress={() => navigation.navigate(block.link)}
                >
                  <View style={styles.block}>
                    <View
                      style={{
                        width: 117,
                        height: 90,
                        marginTop: 16,
                        marginBottom: 2,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Image
                        source={block.img}
                        // resizeMode="contain"
                        style={{
                          width: index === 3 ? 117 : 90,
                          height: index === 3 ? 71 : 90,
                        }}
                      />
                    </View>
                    <PrimaryText style={styles.text} weight={600}>
                      {t(block.title)}
                    </PrimaryText>
                  </View>
                </TouchableWithoutFeedback>
              </LinearGradient>
            );
          })}
        </View>
      </View>
      {isOpenActions && (
        <TouchableWithoutFeedback onPress={() => setisOpenActions(false)}>
          <LinearGradient
            colors={["rgba(11, 230, 204, 0.3)", "rgba(3, 24, 82, 0.1)"]}
            start={[0, 0]}
            end={[0.65, 0.65]}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              top: 0,
              backfaceVisibility: "hidden",
              transform: [{ rotate: "180deg" }],
            }}
          ></LinearGradient>
        </TouchableWithoutFeedback>
      )}
      <View
        style={{
          position: "absolute",
          right: 14,
          bottom: 17,
          alignItems: "flex-end",
        }}
      >
        {isOpenActions && (
          <View style={{ rowGap: 15, marginBottom: 13 }}>
            <TouchableOpacity
              testID="create-game"
              onPress={() => navigation.navigate("create-game")}
            >
              <LinearGradient
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                colors={["#0DDDD5", "#68F4E4"]}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 42,
                  paddingHorizontal: 19,
                  borderRadius: 40,
                }}
              >
                <PrimaryText
                  weight={600}
                  style={{ color: "#0C2544", fontSize: 16 }}
                >
                  {t("create_game.create")}
                </PrimaryText>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              testID="create-group"
              onPress={() => navigation.navigate("create-group")}
            >
              <LinearGradient
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                colors={["#0DDDD5", "#68F4E4"]}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 42,
                  paddingHorizontal: 19,
                  borderRadius: 40,
                }}
              >
                <PrimaryText
                  weight={600}
                  style={{ color: "#0C2544", fontSize: 16 }}
                >
                  {t("group.create")}
                </PrimaryText>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
        <LinearGradient
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          colors={["#0DDDD5", "#68F4E4"]}
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
          }}
        >
          <TouchableOpacity
            testID="add-button"
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
            onPress={() => setisOpenActions((prev) => !prev)}
          >
            <CrossIcon width={20} height={20} />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background_blue,
    paddingHorizontal: 30,
    paddingTop: 44,
  },
  blocks: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  bg: {
    height: 151,
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
  },
  block: {
    height: 150,
    width: "99.7%",
    alignItems: "center",
    backgroundColor: "#031852",
    borderRadius: 24,
    opacity: 1,
  },
  img: {
    marginTop: 15,
    marginBottom: 10,
  },
  text: {
    fontSize: 15,
    color: COLORS.lightWhite,
  },
});

export default HomePage;
