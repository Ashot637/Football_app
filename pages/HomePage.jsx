import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { COLORS } from "../helpers/colors";

import { useNavigation } from "@react-navigation/native";
import Stadiums from "../assets/images/stadiums.svg";
import Groups from "../assets/images/groups.svg";
import MyGames from "../assets/images/my_games.svg";
import PublicGames from "../assets/images/public.svg";
import PrimaryText from "../components/PrimaryText";

const HomePage = () => {
  const navigation = useNavigation();

  const items = [
    { icon: <MyGames />, title: "Իմ խաղերը", route: "" },
    { icon: <Groups />, title: "Իմ խմբերը", route: "" },
    { icon: <PublicGames />, title: "Բաց խաղեր", route: "" },
    { icon: <Stadiums />, title: "Դաշտեր", route: "" },
  ];

  return (
    <>
      {/* <View style={styles.container}>
        {items.map((item) => {
          return (
            <View style={styles.itemBlock}>
              <View>{item.icon}</View>
              <Text style={{color: "#F0F4FF", fontSize: 18, marginTop:10}}>{item.title}</Text>
            </View>
          );
        })}
      </View> */}
      <Invitation />
      <View style={[styles.dates]}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => setSelectedStadiumsType(0)}
          >
            <View
              style={[
                styles.dateView,
                !selectedStadiumsType && {
                  backgroundColor: COLORS.blue,
                },
                { marginLeft: 16 },
                { marginRight: 8 },
              ]}
            >
              <PrimaryText
                style={[
                  styles.dateText,
                ]}
                weight={600}
              >
                {t("game.favorite_games")}
              </PrimaryText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => setSelectedStadiumsType(1)}
          >
            <View
              style={[
                styles.dateView,
                selectedStadiumsType && {
                  backgroundColor: COLORS.blue,
                },
              ]}
            >
              <PrimaryText
                style={[
                  styles.dateText,
                  selectedStadiumsType && { color: COLORS.yellow },
                  styles.dateText
                ]}
                weight={600}
              >
                {t("game.available_games")}
              </PrimaryText>
            </View> 
          </TouchableOpacity>
        </ScrollView>
      </View>

      {selectedStadiumsType ? <AveilableGames /> : <FavoriteGames />}
      <ActionButton
        buttonColor={COLORS.green}
        style={{ borderRadius: 30 }}
        onPress={() => navigation.navigate("create")}
      ></ActionButton>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background_blue,
    width: "100%",
    height: "100%",
    justifyContent: 'center',
    paddingTop:100,
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 25,
  },

  itemBlock: {
    backgroundColor: '#031852',
    width: 160,
    height:170,
    borderRadius: 25,
    paddingTop:20,
    alignItems: 'center'
  },

  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 16,
    paddingLeft: 16,
  },
  dates: {
    flexDirection: "row",
    alignItems: "flex-start",
    columnGap: 8,
    backgroundColor: COLORS.background_blue,
    paddingBottom: 32,
    paddingTop: 24,
  },
  dateView: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 40,
  },
  dateText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  dateViewActive: {
    borderColor: COLORS.lightblue,
    backgroundColor: COLORS.blue,
  },
  dateTextActive: {
    color: COLORS.lightblue,
  },
  games: {
    paddingHorizontal: 16,
    rowGap: 16,
  },
  loader: {
    flex: 1,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomePage;
