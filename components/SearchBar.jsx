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

import icon from "../assets/images/call.png";
import Game from "./Game";

const SearchBar = ({ setOpen }) => {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);
  const [selectedStadionId, setSelectedStadionId] = useState(null);
  const [games, setGames] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [value] = useDebounce(searchValue, 500);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        setSearchValue("");
        setOpen(false);

        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    })
  );

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

  const onClick = (id, title) => {
    setSearchValue(title);
    setSelectedStadionId(id);
    setIsSearched(true);
    inputRef.current.blur();
  };

  return (
    <>
      <LinearGradient
        colors={[COLORS.darkgrey, "rgba(32, 44, 34, 0.92)"]}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <View style={styles.container}>
            <TextInput
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
            return (
              <Item
                item={item}
                key={item.id}
                onClick={() => onClick(item.id, item.title)}
              />
            );
          })
        )}
      </ScrollView>
    </>
  );
};

const Item = ({ item, onClick }) => {
  return (
    <TouchableOpacity onPress={onClick}>
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
        <Image source={icon} style={{ marginLeft: "auto" }} />
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
    paddingTop: 100,
    zIndex: -1,
    backgroundColor: COLORS.black,
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
