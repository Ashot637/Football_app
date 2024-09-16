import React from "react";
import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity,Linking } from "react-native";
import Header from "../../components/Header";
import BottomNavBar from "../../components/BottomNavBar";


const TermsAndConditionsPage = () => {
  const { t } = useTranslation();
  const handlePress = async () => {
    const url = 'contact@ballhola.app';
    await Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
        {/* <Header /> */}

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{t("terms_and_conditions.title")}</Text>
          <Text style={styles.p}>{t("terms_and_conditions.p")}</Text>
          <Text style={styles.title}>{t("terms_and_conditions.title2")}</Text>


        <Text style={styles.p}>
            <Text style={styles.boldText}>1. {t("terms_and_conditions.p1").split(":")[0]}:</Text>
            {t("terms_and_conditions.p1").split(":")[1]}
          </Text>

          <Text style={styles.p}>
            <Text style={styles.boldText}>2. {t("terms_and_conditions.p2").split(":")[0]}:</Text>
            {t("terms_and_conditions.p2").split(":")[1]}
          </Text>

          <Text style={styles.p}>
            <Text style={styles.boldText}>3. {t("terms_and_conditions.p3").split(":")[0]}:</Text>
            {t("terms_and_conditions.p3").split(":")[1]}
          </Text>
      <View style={styles.p3Container}>
      <Text style={styles.p3Item}>{t("terms_and_conditions.p3-1")}</Text>
      <Text style={styles.p3Item}>{t("terms_and_conditions.p3-2")}</Text>
      <Text style={styles.p3Item}>{t("terms_and_conditions.p3-3")}</Text>
      </View>
      <Text style={styles.title}>{t("terms_and_conditions.title3")}</Text>
      <Text style={styles.p}>{t("terms_and_conditions.title3-item")}</Text>
      <Text style={styles.title}>{t("terms_and_conditions.title4")}</Text>
      <Text style={styles.p}>{t("terms_and_conditions.title4-item")}</Text>
      <Text style={styles.title}>{t("terms_and_conditions.title5")}</Text>
      <Text style={styles.p}>{t("terms_and_conditions.title5-item")}</Text>
      <Text style={styles.title}>{t("terms_and_conditions.title6")}</Text>
      <Text style={styles.p}>{t("terms_and_conditions.title6-item")}</Text>
      <Text style={styles.title}>{t("terms_and_conditions.title7")}</Text>
      <Text style={styles.p}>{t("terms_and_conditions.title7-item")}</Text>
      <Text style={styles.title}>{t("terms_and_conditions.title8")}</Text>
      <Text style={styles.p}>{t("terms_and_conditions.title8-item")}</Text>
      <Text style={styles.title}>{t("terms_and_conditions.title9")}</Text>
      <Text style={styles.p}>{t("terms_and_conditions.title9-item")}</Text>
      <Text style={styles.title}>{t("terms_and_conditions.title10")}</Text>
      <Text style={styles.p}>{t("terms_and_conditions.title10-item")}
      <TouchableOpacity onPress={handlePress}>
              <Text style={styles.link}>contact@ballhola.app</Text>
            </TouchableOpacity>
      </Text>
        </View>
      </ScrollView>
      
      <View style={styles.bottomNavBar}>
        {/* <BottomNavBar /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#041440",
  },
  contentContainer: {
    paddingBottom: 80, 
  },
  textContainer: {
    marginHorizontal: 20, 
    marginTop: 20,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "600",
    fontFamily: "main-bold",
    // marginBottom: 10, 
  },
  p3Container: {
    marginLeft: 20, 
    // marginTop: -10, 
    marginBottom:20,
  },
  p3Item: {
    color: "#FFFFFF",
    fontSize: 15,
    marginVertical: 6, 
    
  },
  p: {
    color: "#FFFFFF",
    fontSize: 16,
    marginVertical: 10,
    lineHeight: 25,
  },
  boldText: {
    fontWeight: "bold",

  },
  link: {
    color: "#1E90FF", 
    textDecorationLine: 'underline', 
  },
  bottomNavBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start', 
    marginBottom: 10,
  },
});

export default TermsAndConditionsPage;