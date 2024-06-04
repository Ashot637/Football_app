import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import PrimaryText from "../../components/PrimaryText";
import { COLORS } from "../../helpers/colors";
import { useCallback, useEffect, useState } from "react";
import axios from "../../axios/axios";
import {
  selectCreateGame,
  setGroup,
  setStadion,
} from "../../redux/createGameSlice/createGameSlice";
import { useTranslation } from "react-i18next";
import FillInfo from "./FillInfo";
import { useDispatch } from "react-redux";

import InfoIcon from "../../assets/images/info.svg";
import { useFocusEffect } from "@react-navigation/native";

const { width } = Dimensions.get("screen");

const CreateGamePage = ({ route }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isOpenInfo, setIsOpenInfo] = useState(true);
  const [stadions, setStadions] = useState([]);
  const [groups, setGroups] = useState([]);
  const groupId = route?.params?.groupId;
  const stadumId = route?.params?.stadumId;

  useFocusEffect(
    useCallback(() => {
      axios.get("/stadion/getAllForUser").then(({ data }) => {
        setStadions(data);
        let index = 0;
        if (stadumId) {
          index = data.findIndex((stadium) => stadium.id === stadumId);
        }
        dispatch(setStadion(data[index]));
      });
      axios.get("/group/getAllThatUserOwnes").then(({ data }) => {
        setGroups(data);
        let index = 0;
        if (groupId) {
          index = data.findIndex((group) => group.id === groupId);
        }
        dispatch(setGroup(data[index]));
      });
    }, [groupId, stadumId, route])
  );

  // const displayView = (index) => {
  //   switch (index) {
  //     case 0:
  //       return <FillInfo stadions={stadions} />;
  //     // case 1:
  //     //   return <ChoosePlayers />;
  //     case 2:
  //       return <ChooseUniform />;
  //     case 3:
  //       return <Facilities facilities={stadion?.facilities || []} />;
  //   }
  // };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingTop: 24,
            position: "relative",
          }}
        >
          <PrimaryText weight={600} style={styles.title}>
            {t("create_game.title")}
          </PrimaryText>
          {!!stadions.length && (
            <>
              {isOpenInfo && (
                <View
                  style={{
                    position: "absolute",
                    backgroundColor: "#0968CA",
                    left: 23,
                    top: 10,
                    width: width * 0.75,
                    borderRadius: 15,
                    padding: 10,
                    zIndex: 1,
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <PrimaryText
                    style={{ fontSize: 12, color: "#fff" }}
                    weight={600}
                  >
                    {t("create_game.info")}
                  </PrimaryText>
                  <View style={styles.triangle}></View>
                </View>
              )}
              <TouchableOpacity onPress={() => setIsOpenInfo((prev) => !prev)}>
                <InfoIcon width={36} height={36} />
              </TouchableOpacity>
            </>
          )}
        </View>
        {!!stadions.length && (
          // <GameNavigation activeIndex={activeIndex} setActiveIndex={setActiveIndex} hideIndex={1}>
          //   {displayView(activeIndex)}
          // </GameNavigation>
          <FillInfo
            stadions={stadions}
            groups={groups}
            cantChangeStadium={!!stadumId}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background_blue,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#fff",
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    right: -10,
    transform: [
      {
        rotate: "90deg",
      },
    ],
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#0968CA",
  },
});

export default CreateGamePage;
