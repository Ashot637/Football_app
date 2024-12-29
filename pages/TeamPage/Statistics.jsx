
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import React from "react";
import Heading from "../../components/Heading";
import { useTranslation } from "react-i18next";
import { COLORS } from "../../helpers/colors";
import { LinearGradient } from "expo-linear-gradient";
import PrimaryText from "../../components/PrimaryText";



const Statistics = ({ navigation, route }) => {
  const { t } = useTranslation();

  return (
    <>
      <ScrollView style={{ backgroundColor: COLORS.background_blue, flex: 1 }}>
        <Heading align="center" title={t("team.statistics")} goBackButton />
        <View style={{ rowGap: 16, paddingHorizontal: 16, paddingBottom: 16 }}>
          <PrimaryText style={{ fontSize: 18, color: COLORS.grey }}>
            {t("team.empty_statistics")}
          </PrimaryText>
         
        </View>
      </ScrollView>
  
    </>
  );
};

export default Statistics;
