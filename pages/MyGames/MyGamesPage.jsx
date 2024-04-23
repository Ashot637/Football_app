import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../helpers/colors";
import Heading from "../../components/Heading";
import { useTranslation } from "react-i18next";
import DateFilterSection from "../../components/DateFilterSection";

const MyGamesPage = () => {
  const { t } = useTranslation();
  return (
    <ScrollView style={{ backgroundColor: COLORS.background_blue }}>
      <View style={{ paddingHorizontal: 16 }}>
        <Heading title={t("home.my_games")} align="center" />
        <DateFilterSection />
      </View>
    </ScrollView>
  );
};

export default MyGamesPage;

const styles = StyleSheet.create({});
