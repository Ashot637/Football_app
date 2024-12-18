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
import ChooseGroup from "./ChooseGroup";


const SelectTeamOrGroup = () => {
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
        {t("create_game.invite_an_opponent")}
      </PrimaryText>
      <View style={{ paddingLeft: 16, rowGap: 24,flexDirection: "row",columnGap: 100 }}
      >
        <CheckBox
            title={t("create_game.group")}
            
            />
          <CheckBox
          
            title={t("create_game.team")}
            
          />
        </View>
        {/* <ChooseGroup /> */}
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
});

export default SelectTeamOrGroup;
