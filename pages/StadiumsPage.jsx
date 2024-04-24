import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../helpers/colors";
import PrimaryText from "../components/PrimaryText";
import axios from "../axios/axios";
import { useEffect, useState } from "react";

import stadiumIcon from "../assets/images/stadium.png";
import SearchIcon from "../assets/images/Search.svg";

const StadiumsPage = ({ navigation }) => {
  const [stadiums, setStadiums] = useState([]);

  useEffect(() => {
    axios.get("/stadion/search").then(({ data }) => {
      setStadiums(data);
    });
  }, []);

  return (
    <>
      <ScrollView style={styles.background}>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 22,
            fontWeight: 500,
            marginBottom: 20,
          }}
        >
          Դաշտեր
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("stadiums_search");
            }}
          >
            <SearchIcon />
          </TouchableOpacity>
        </View>
        {stadiums.map((item) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("stadium_details", { id: item.id });
              }}
              key={item.id}
            >
              <View style={styles.block}>
                <Image
                  source={stadiumIcon}
                  style={{
                    width: 25,
                    height: 25,
                    transform: [{ rotate: "90deg" }],
                  }}
                />
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: 500,
                    width: "90%",
                  }}
                >
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
        <View style={{ height: 50 }}></View>
      </ScrollView>
    </>
  );
};

export default StadiumsPage;

const styles = StyleSheet.create({
  background: {
    backgroundColor: COLORS.background_blue,
    width: "100%",
    height: "100%",
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
  },

  block: {
    width: "100%",
    backgroundColor: "#032176",
    height: 80,
    marginTop: 20,
    borderRadius: 6,
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
    gap: 15,
    borderColor: "#0CF9DD",
    borderWidth: 1,
  },
});
