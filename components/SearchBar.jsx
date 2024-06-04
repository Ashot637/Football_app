import { useCallback, useEffect, useRef, useState } from "react";
import {
  BackHandler,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import { useDebounce } from "use-debounce";

import { LinearGradient } from "expo-linear-gradient";

import { COLORS } from "../helpers/colors";

import searchIcon from "../assets/images/search.png";

import { useTranslation } from "react-i18next";
import axios from "../axios/axios";
import { Dimensions } from "react-native";

import PrimaryText from "./PrimaryText";
const { height } = Dimensions.get("window");

import Arrow from "../assets/images/Arrow.svg";
import Game from "./Game";

const SearchBar = ({ setOpen, navigation }) => {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);
  const [selectedStadionId, setSelectedStadionId] = useState(null);
  const [games, setGames] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [value] = useDebounce(searchValue, 500);

  // useFocusEffect(
  //   useCallback(() => {
  //     const onBackPress = () => {
  //       setSearchValue("");
  //       setOpen(false);

  //       return true;
  //     };

  //     BackHandler.addEventListener("hardwareBackPress", onBackPress);

  //     return () => {
  //       BackHandler.removeEventListener("hardwareBackPress", onBackPress);
  //     };
  //   })
  // );

  useEffect(() => {
    if (value.trim().length) {
      axios
        .get("/stadion/search", { params: { term: value } })
        .then(({ data }) => {
          setData(data);
        });
    } else {
      setData([]);
    }
  }, [value]);

  useEffect(() => {
    if (selectedStadionId) {
      axios
        .get("/game/getByStadionId/" + selectedStadionId)
        .then(({ data }) => setGames(data));
    } else {
      setGames([]);
    }
  }, [selectedStadionId]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <LinearGradient colors={["#041443", "#032176"]} style={styles.gradient}>
        <View style={styles.header}>
          <View style={styles.container}>
            <TextInput
              testID="stadiums-search-input"
              ref={inputRef}
              value={searchValue}
              onChangeText={(value) => {
                setSearchValue(value);
                setIsSearched(false);
              }}
              placeholder={t("common.search")}
              style={styles.input}
              placeholderTextColor={COLORS.lightblue}
              selectionColor={COLORS.lightblue}
              maxLength={50}
            />
            <Image source={searchIcon} />
          </View>
        </View>
      </LinearGradient>
      <ScrollView
        nestedScrollEnabled
        keyboardShouldPersistTaps="handled"
        style={styles.list}
      >
        {isSearched ? (
          <View style={{ rowGap: 12 }}>
            {games.map((item) => {
              return <Game game={item} key={item.id} />;
            })}
          </View>
        ) : (
          data.map((item) => {
            return <Item navigation={navigation} item={item} key={item.id} />;
          })
        )}
      </ScrollView>
    </>
  );
};

const Item = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("stadium_details", { id: item.id });
      }}
    >
      <View
        style={{
          paddingVertical: 15,
          borderBottomColor: "#032176",
          borderBottomWidth: 1,
          flexDirection: "row",
          columnGap: 7,
        }}
      >
        <PrimaryText style={styles.itemText} weight={600} numberOfLines={1}>
          {item.title}
        </PrimaryText>
        <Arrow />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gradient: {
    paddingTop: 46,
    paddingBottom: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 12,
    paddingTop: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: COLORS.lightblue,
    columnGap: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.lightblue,
  },
  list: {
    zIndex: -1,
    backgroundColor: COLORS.background_blue,
    width: "100%",
    paddingHorizontal: 16,
  },
  itemText: {
    color: "#fff",
    fontSize: 20,
    width: "90%",
  },
});

export default SearchBar;
