import { Image, StyleSheet, View } from "react-native";

import redUniformIcon from "../../assets/images/uniform-red.png";
import blueUniformIcon from "../../assets/images/uniform-blue.png";
import blackUniformIcon from "../../assets/images/uniform-black.png";
import whiteUniformIcon from "../../assets/images/uniform-white.png";

import PrimaryText from "../../components/PrimaryText";
import { COLORS } from "../../helpers/colors";
import CheckBox from "../../components/CheckBox";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCreateGame,
  setUniforms,
} from "../../redux/createGameSlice/createGameSlice";
import { useTranslation } from "react-i18next";
import Accordion from "../../components/Accordion";
import icon from "../../assets/images/choose-uniform.png";
import { useState } from "react";

const icons = [
  {
    img: redUniformIcon,
    title: "colors.red",
  },
  {
    img: blueUniformIcon,
    title: "colors.blue",
  },
  {
    img: blackUniformIcon,
    title: "colors.black",
  },
  {
    img: whiteUniformIcon,
    title: "colors.white",
  },
];
const ChooseUniform = () => {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);
  const { t } = useTranslation();
  const { uniforms } = useSelector(selectCreateGame);

  const onSelectUniform = (index) => {
    dispatch(setUniforms(index));
  };

  return (
    <View style={styles.container}>
      <PrimaryText style={styles.title} weight={600}>
        {t("game.uniform_color")}
      </PrimaryText>
      <Accordion
        icon={icon}
        title={
          !uniforms.length
            ? t("game.choose_uniform_color")
            : uniforms.map((index) => t(icons[index].title)).join(", ")
        }
        toggleIsOpen={() => setIsActive((prev) => !prev)}
        isOpen={isActive}
      >
        <View
          style={{
            borderRadius: 16,
            backgroundColor: COLORS.blue,
            paddingHorizontal: 9,
          }}
        >
          {icons.map((icon, index) => {
            return (
              <View
                key={index}
                style={{
                  paddingVertical: 9,
                  borderBottomColor: "#F0F4FF",
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomWidth: index === icons.length - 1 ? 0 : 0.5,
                }}
              >
                <Image source={icon.img} style={{ width: 36, height: 36 }} />
                <PrimaryText
                  weight={600}
                  style={{ color: COLORS.lightWhite, marginLeft: 10 }}
                >
                  {t(icon.title)}
                </PrimaryText>
                <View style={{ marginLeft: "auto" }}>
                  <CheckBox
                    state={uniforms.includes(index)}
                    setState={() => onSelectUniform(index)}
                  />
                </View>
              </View>
            );
          })}
        </View>
      </Accordion>
      {/* {icons.map((icon, index) => {
        return (
          <View style={styles.uniformView} key={index}>
            <Image source={icon} style={styles.icon} />
            <View style={styles.bar}>
              <View style={[styles.bar]} />
            </View>
            <CheckBox
              state={uniforms.includes(index)}
              setState={() => onSelectUniform(index)}
            />
          </View>
        );
      })} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
  },
  title: {
    color: COLORS.lightWhite,
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 24,
    textAlign: "center",
  },
  uniformView: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 12,
    marginBottom: 10,
  },
  bar: {
    flex: 1,
    height: 10,
    backgroundColor: "#405742",
    borderRadius: 10,
    position: "relative",
  },
  icon: {
    width: 48,
    height: 48,
  },
});

export default ChooseUniform;
