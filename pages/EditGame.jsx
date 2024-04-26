import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../helpers/colors";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCreateGame,
  setGameData,
  setStadion,
  setRange,
  setPrice,
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

  console.log(game);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setGameData({
        date: game.startTime,
        time: format(game.startTime, "HH:mm"),
        price: game.price,
        stadion: game.stadion.id,
        duration: duration,
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
        uniforms: [],
        maxPlayersCount: game.maxPlayersCount,
      })
      .then(() => {
        setSuccessPopup(true);
        setTimeout(() => {
          setSuccessPopup(false);
          navigation.reset({
            index: 0,
            routes: [{ name: "main" }],
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

      <View style={styles.background}>
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
        <View style={{ height: 30 }}></View>
        <PrimaryButton title={"Պահպանել"} onPress={onEditMatch} />
      </View>
    </>
  );
};

export default EditGame;

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.background_blue,
    padding: 20,
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
