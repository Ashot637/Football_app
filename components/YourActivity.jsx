import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import PrimaryText from "./PrimaryText";

import { COLORS } from "../helpers/colors";

import axios from "../axios/axios";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

import i18n from "../languages/i18n";

const YourActivity = () => {
  const { t } = useTranslation();
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get("game/getActivity").then(({ data }) => setGames(data));
  }, [i18n.language]);

  return (
    <View style={styles.container}>
      <PrimaryText weight={600} style={styles.title}>
        {t("activity.individual_activity")}
      </PrimaryText>
      {games.length == 0 ? (
        <PrimaryText style={{ color: "#B2BED7", fontSize: 18 }}>
          Դուք ներկայումս որևէ ակտիվություն չունեք:
        </PrimaryText>
      ) : (
        <View style={styles.blocks}>
          {games?.map((game) => {
            return (
              <View style={styles.block} key={game.id}>
                <PrimaryText weight={700} style={styles.blockTitle}>
                  {game.stadion.title}
                </PrimaryText>
                <PrimaryText style={styles.subtitle}>
                  {format(game.startTime, "dd.MM.yyyy")}
                </PrimaryText>
                <PrimaryText style={styles.subtitle}>{`${format(
                  game.startTime,
                  "HH:mm"
                )} - ${format(game.endTime, "HH:mm")}`}</PrimaryText>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    marginBottom: 20,
  },
  blocks: {
    rowGap: 20,
  },
  block: {
    paddingVertical: 18,
    backgroundColor: COLORS.darkgrey,
    paddingHorizontal: 16,
    rowGap: 10,
    borderRadius: 16,
  },
  blockTitle: {
    color: COLORS.yellow,
    fontSize: 20,
  },
  subtitle: {
    fontSize: 20,
    color: "#fff",
  },
});

export default YourActivity;
