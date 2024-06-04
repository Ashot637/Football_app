import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../helpers/colors";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCreateGame,
  setGameData,
  setStadion,
  setRange,
  setPrice,
  reset,
} from "../redux/createGameSlice/createGameSlice";

import ChooseTime from "./CreateGamePage/ChooseTime";
import PriceIcon from "../assets/images/money bag.svg";

import ChooseDate from "./CreateGamePage/ChooseDate";
import ChooseStadion from "./CreateGamePage/ChooseStadion";
import axios from "../axios/axios";
import RadioButton from "../components/RadioButton";
import PrimaryButton from "../components/PrimaryButton";
import { stringToDate } from "../helpers/stringToDate";
import { differenceInMinutes, format } from "date-fns";
import Input from "../components/Input";
import ConfirmationModal from "../components/ConfirmationModal";
import ChooseUniform from "./CreateGamePage/ChooseUniform";

const EditGame = ({ route, navigation }) => {
  const accordions = [ChooseStadion, ChooseDate, ChooseTime];
  const { title } = route?.params;
  const { game } = route?.params;
  const stadumId = route?.params?.stadumId;

  const [active, setActive] = useState(null);
  const [stadions, setStadions] = useState([]);
  const [successPopup, setSuccessPopup] = useState(false);

  const { group, stadion, date, time, duration, uniforms, price, range } =
    useSelector(selectCreateGame);

  const toggleAccordion = (accordionId) => {
    accordionId === active ? setActive(null) : setActive(accordionId);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const timeDifferenceMs = new Date(game.endTime) - new Date(game.startTime);
    dispatch(
      setGameData({
        date: game.startTime,
        time: format(game.startTime, "HH:mm"),
        price: game.price || "0",
        stadion: game.stadion.id,
        duration: timeDifferenceMs / (1000 * 60 * 60),
        uniforms: game.uniforms.indexes ?? [],
      })
    );
    axios.get("/stadion/getAllForUser").then(({ data }) => {
      setStadions(data);
      let index = 0;
      if (game.stadion.id) {
        index = data.findIndex((stadium) => stadium.id === game.stadion.id);
      }
      dispatch(setStadion(data[index]));
    });

    return () => {
      dispatch(reset());
    };
  }, []);

  const onEditMatch = () => {
    const startTime = stringToDate(date, time);
    const endTime = stringToDate(
      date,
      time,
      duration,
      duration === 1.5 ? 30 : 0
    );
    axios
      .patch(`/game/update/${game.id}`, {
        price: price,
        startTime: startTime,
        endTime: endTime,
        stadionId: stadion.id,
        maxPlayersCount: game.maxPlayersCount,
        uniforms,
      })
      .then(() => {
        setSuccessPopup(true);
        setTimeout(() => {
          setSuccessPopup(false);
          navigation.reset({
            index: 0,
            routes: [{ name: "home" }],
          });
        }, 2000);
      });
  };

  return (
    <>
      {successPopup && (
        <ConfirmationModal>
          <>
            <Text
              style={{
                color: "white",
                fontSize: 17,
                width: "100%",
                textAlign: "center",
              }}
            >
              Փոփոխությունները հաջողությամբ կատարված են։
            </Text>
            <View style={{ alignItems: "center", marginTop: 20 }}></View>
          </>
        </ConfirmationModal>
      )}

      <ScrollView style={styles.background}>
        <Text
          style={{
            color: "white",
            fontSize: 22,
            textAlign: "center",
            fontWeight: 600,
          }}
        >
          Խմբագրել տվյալները
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            marginTop: 20,
          }}
        >
          {title}
        </Text>
        {stadions &&
          !!stadions.length &&
          accordions.map((Accordion, index) => {
            return (
              <View key={index} style={{ marginTop: 20 }}>
                <Accordion
                  key={index}
                  accordionId={index}
                  isActive={active === index}
                  {...{ stadions }}
                  toggleAccordion={toggleAccordion}
                />
              </View>
            );
          })}
        <View style={{ height: 20 }}></View>
        <Input
          value={price?.toString()}
          setValue={(p) => dispatch(setPrice(p))}
          img={<PriceIcon />}
          type="phone-pad"
          placeholder={"price"}
        />
        <ChooseUniform />
        <View style={{ height: 30 }}></View>
        <PrimaryButton title={"Պահպանել"} onPress={onEditMatch} />
        <View style={{ height: 50 }} />
      </ScrollView>
    </>
  );
};

export default EditGame;

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.background_blue,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  cancelButton: {
    width: 120,
    backgroundColor: "#FFFFFF1A",
    height: 40,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#B2BED7",
  },
  acceptButton: {
    width: 120,
    backgroundColor: "#0968CA",
    height: 40,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
