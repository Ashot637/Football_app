import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { COLORS } from "../helpers/colors";
import PrimaryText from "../components/PrimaryText";

import footballBallImg from "../assets/images/football.png";
import basketballBallImg from "../assets/images/basketball.png";
import tenisBallImg from "../assets/images/tenis.png";
import volleyBallImg from "../assets/images/volley.png";

const sports = [
  {
    img: footballBallImg,
    title: "Football",
    active: true,
  },
  {
    img: basketballBallImg,
    title: "Basketball",
    active: false,
  },
  {
    img: tenisBallImg,
    title: "Tennis",
    active: false,
  },
  {
    img: volleyBallImg,
    title: "Volleyball",
    active: false,
  },
];

const SelectSport = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.blocks}>
        {sports.map((sport) => {
          if (!sport.active) {
            return (
              <View style={styles.block} key={sport.title}>
                <Image source={sport.img} style={styles.img} />
                <PrimaryText style={styles.text}>{sport.title}</PrimaryText>
              </View>
            );
          }
          return (
            <TouchableOpacity
              key={sport.title}
              onPress={() => navigation.navigate("main")}
              style={[styles.block, styles.active]}
            >
              <Image source={sport.img} style={styles.img} />
              <PrimaryText style={styles.text}>Football</PrimaryText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
    paddingHorizontal: 30,
    justifyContent: "center",
  },
  blocks: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  block: {
    height: 150,
    flexBasis: "46.5%",
    alignItems: "center",
    backgroundColor: COLORS.darkgrey,
    borderRadius: 24,
    opacity: 0.4,
  },
  active: {
    height: 148,
    flexBasis: "46%",
    opacity: 1,
    borderWidth: 1,
    borderColor: COLORS.green,
  },
  img: {
    width: 100,
    height: 100,
    marginTop: 6,
  },
  text: {
    fontSize: 20,
    color: COLORS.lightWhite,
  },
});

export default SelectSport;
