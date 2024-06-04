import { StyleSheet, Text, View } from "react-native";

import MoneyIcon from "../assets/images/money bag.svg";
import StadiumIcon from "../assets/images/stadium2.svg";
import ClockIcon from "../assets/images/clock.svg";
import CalendarIcon from "../assets/images/calendar.svg";
import DurationIcon from "../assets/images/timer.svg";

import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  format,
} from "date-fns";

const GameFixedDetails = ({ game }) => {
  return (
    <View style={{ paddingHorizontal: 16 }}>
      <View style={[styles.block, { height: "auto" }]}>
        <StadiumIcon />
        <Text style={styles.text}>{game?.stadion?.title}</Text>
      </View>
      <View style={styles.block}>
        <CalendarIcon />
        <Text style={styles.text}>
          {new Date(game.startTime).toLocaleDateString(
            "hy-AM",
            (options = { month: "2-digit", day: "2-digit", year: "numeric" })
          )}
        </Text>
      </View>
      <View style={{ flexDirection: "row", gap: 15 }}>
        <View style={[styles.block, { width: "48%" }]}>
          <ClockIcon />
          <Text style={styles.text}>{`${format(
            game?.startTime,
            "HH:mm"
          )}`}</Text>
        </View>
        <View style={[styles.block, { width: "48%" }]}>
          <DurationIcon />
          <Text style={styles.text}>
            {`${
              differenceInMinutes(game?.endTime, game?.startTime) == 90
                ? 1.5
                : differenceInMinutes(game?.endTime, game?.startTime) == 60
                ? 1
                : 2
            } ժամ`}
          </Text>
        </View>
      </View>
      <View style={styles.block}>
        <MoneyIcon />
        <Text style={styles.text}>{`${game.price} AMD`}</Text>
      </View>
    </View>
  );
};

export default GameFixedDetails;

const styles = StyleSheet.create({
  block: {
    backgroundColor: "#031852",
    height: 80,
    borderRadius: 16,
    marginBottom: 15,
    alignItems: "center",
    gap: 20,
    padding: 15,
    flexDirection: "row",
  },
  text: {
    color: "white",
    fontSize: 16,
    width: "80%",
  },
});
