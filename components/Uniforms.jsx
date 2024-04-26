import { Image, StyleSheet, View } from "react-native";
import { COLORS } from "../helpers/colors";

import redUniformIcon from "../assets/images/uniform-red.png";
import blueUniformIcon from "../assets/images/uniform-blue.png";
import blackUniformIcon from "../assets/images/uniform-black.png";
import whiteUniformIcon from "../assets/images/uniform-white.png";

import CheckBox from "./CheckBox";

const icons = [
  redUniformIcon,
  blueUniformIcon,
  blackUniformIcon,
  whiteUniformIcon,
];

const Uniforms = ({ uniforms }) => {
  return (
    <View style={styles.uniforms}>
      {/* {(game.isPublic ? game.uniforms : [0, 0, 0, 0]).map(
        (uniformChoseUsersCount, index) => {
          return (
            <View style={styles.uniformView} key={"firstGroup-" + index}>
              <Image source={icons[index]} style={styles.uniformIcon} />
              <View style={styles.bar}>
                <View
                  style={[
                    styles.barActive,
                    {
                      width: `${
                        uniformChoseUsersCount &&
                        (uniformChoseUsersCount / game.playersCount) * 100
                      }%`,
                    },
                  ]}
                />
              </View>
              {!cantSelect && (
                <CheckBox
                  state={selectedUniforms.includes(index)}
                  setState={() => onSelectUniform(index)}
                />
              )}
            </View>
          );
        }
      )} */}
      {uniforms.map((index) => {
        return (
          <View
            key={index}
            style={{
              backgroundColor: COLORS.background_blue,
              width: 60,
              height: 60,
              alignItems: "center",
              justifyContent: "center",
              borderColor: "#0968CA",
              borderWidth: 1,
              borderRadius: 10,
            }}
          >
            <Image source={icons[index]} style={{ width: 48, height: 48 }} />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  uniforms: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 24,
  },
  // info: {
  //   color: COLORS.lightblue,
  //   fontSize: 16,
  //   fontWeight: "600",
  //   textAlign: "center",
  //   marginBottom: 32,
  // },
  // title: {
  //   color: COLORS.lightWhite,
  //   fontSize: 22,
  //   fontWeight: "600",
  //   textAlign: "center",
  //   marginBottom: 24,
  // },
  // uniforms: {
  //   rowGap: 10,
  //   marginBottom: 7,
  // },
  // uniformView: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   columnGap: 12,
  // },
  // uniformIcon: {
  //   width: 48,
  //   height: 48,
  // },
  // bar: {
  //   flex: 1,
  //   height: 10,
  //   backgroundColor: "#405742",
  //   borderRadius: 10,
  //   position: "relative",
  // },
  // barActive: {
  //   position: "absolute",
  //   height: 10,
  //   backgroundColor: COLORS.yellow,
  //   borderRadius: 10,
  // },
});

export default Uniforms;
