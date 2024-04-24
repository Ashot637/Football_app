import {
  Button,
  Image,
  ImageBackground,
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

const StadiumDetails = ({ route, navigation }) => {
  const { id } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [stadium, setStadium] = useState([]);
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

    return (
    <>
      <View style={styles.background}>
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
            {stadium.title_am}
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
            {stadium.address_am}
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
              Հարմարություններ
            </Text>
            {stadium.facilities.map((item) => {
              return (
                <View
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
                      height: 50,
                      width: 50,
                      borderRadius: 30,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={{ uri: BASE_URL + item.img }}
                      width={35}
                      height={35}
                    ></Image>
                  </View>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                    }}
                  >
                    {item.title_am}
                  </Text>
                </View>
              );
            })}
          </View>
        )}
        <View style={{ padding: 20 }}>
          <PrimaryButton onPress={()=>{navigation.navigate('create-game', {stadumId: id})}} title={"Ամրագրել հիմա"}></PrimaryButton>
        </View>
      </View>
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
