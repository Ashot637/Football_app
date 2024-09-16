import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import PrimaryText from "./PrimaryText";
import { COLORS } from "../helpers/colors";
import TermsAndConditionsIcon from "../assets/images/TermsAndConditions.png";

import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

const TermsAndConditions = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("terms_and_conditions")}>
        <View style={styles.item}>
        <View style={styles.icon}>
          <Image source={TermsAndConditionsIcon} />
        </View>
        <PrimaryText style={styles.title} weight={600}>
          {t("terms_and_conditions.title")}
        </PrimaryText>
      </View>
        </TouchableOpacity>
    </ScrollView>
     
  );
};

const styles = StyleSheet.create({
    item: {
      flexDirection: "row",
      alignItems: "center",
      columnGap: 20,
      paddingLeft: 18,
    },
    icon: {
      width: 32,
      aspectRatio: 1,
      borderRadius: 16,
      backgroundColor: COLORS.blue,
      alignItems: "center",
      justifyContent: "center",
    },
    icon24: {
      width: 24,
      height: 24,
    },
    title: {
      color: "#fff",
      fontWeight: "600",
      fontSize: 16,
    },
    
  });
  

  
export default TermsAndConditions;
