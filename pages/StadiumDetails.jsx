import {
  Button,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { COLORS } from "../helpers/colors";
import { useCallback, useLayoutEffect, useState } from "react";
import axios, { BASE_URL } from "../axios/axios";
import LocationIcon from "../assets/images/Location-1.svg";
import Facilities from "../components/Facilities";
import PrimaryButton from "../components/PrimaryButton";
import { useTranslation } from "react-i18next";

const StadiumDetails = ({ route, navigation }) => {
  const { id } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [stadium, setStadium] = useState([]);
  const { t, i18n  } = useTranslation();
  useLayoutEffect(() => {
    onRefresh();
  }, [route]);

  const onRefresh = useCallback(() => {
    setIsLoading(true);
    axios.get("/stadion/getOne/" + id).then(({ data }) => {
      setStadium(data);
      setIsLoading(false);
    });
  }, [id]);

  const getStadiumAddress = () => {
    switch (i18n.language) {
      case "am": 
        return stadium.address_am;
      case "ru": 
        return stadium.address_ru;
      case "en": 
      default:
        return stadium.address_en;
    }
  };

  const getStadiumTitle = () => {
    switch (i18n.language) {
      case "am": 
        return stadium.title_am;
      case "ru": 
        return stadium.title_ru;
      case "en": 
      default:
        return stadium.title_en;
    }
  };


  const getFacilityTitle = (item) => {
    switch (i18n.language) {
      case "am": 
        return item.title_am;
      case "ru": 
        return item.title_ru;
      case "en": 
      default:
        return item.title_en;
    }
  };

  return (
    <>
      <ScrollView style={styles.background}>
        <ImageBackground
          imageStyle={{ opacity: 0.5 }}
          source={{ uri: BASE_URL + stadium.img }}
          style={styles.image}
        >
          <Text
            style={{
              color: "white",
              fontSize: 22,
              fontWeight: 500,
              textAlign: "center",
              marginBottom: 15,
            }}
          >
            {/* {stadium.title_am} */}
            {getStadiumTitle()}
          </Text>
          <LocationIcon width={25} height={25} />
          <Text
            style={{
              marginTop: 5,
              width: "60%",
              color: "white",
              fontSize: 16,
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            {/* {stadium.address_am}*/}

          {getStadiumAddress()} 
          </Text>
        </ImageBackground>
        {stadium?.facilities && (
          <View>
            <Text
              style={{
                color: "white",
                fontSize: 22,
                marginTop: 25,
                fontWeight: 500,
                textAlign: "center",
                marginBottom: 25,
              }}
            >
              {t("game.facilities")}
            </Text>
            {stadium.facilities.map((item) => {
              return (
                <View
                  key={item.id}
                  style={{
                    flexDirection: "row",
                    gap: 20,
                    alignItems: "center",
                    paddingLeft: 20,
                    marginBottom: 15,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#031852",
                      height: 45,
                      width: 45,
                      borderRadius: 30,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={{ uri: BASE_URL + item.img }}
                      style={{ width: 30, height: 30, resizeMode: "contain" }}
                      
                    ></Image>
                  </View>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                    }}
                  >
                    {/* {item.title_en} */}
                    {getFacilityTitle(item)} 
                  </Text>
                </View>
              );
            })}
          </View>
        )}
        <View style={{ padding: 20 }}>
          <PrimaryButton
            onPress={() => {
              navigation.navigate("create-game", { stadumId: id });
            }}
            title={t("game.book_now")}
          ></PrimaryButton>
        </View>
      </ScrollView>
    </>
  );
};

export default StadiumDetails;

const styles = StyleSheet.create({
  background: {
    backgroundColor: COLORS.background_blue,
    width: "100%",
    height: "100%",
  },
  image: {
    aspectRatio: 16 / 9,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 15,
  },
  priceBlock: {
    backgroundColor: "#0CF9DD",
    height: 25,
    width: 170,
    marginTop: 20,
    borderRadius: 20,
  },
});
