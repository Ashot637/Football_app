import { ScrollView, StyleSheet, View } from "react-native";
import PrimaryText from "../../components/PrimaryText";
import { COLORS } from "../../helpers/colors";
import { useEffect, useState } from "react";
import axios from "../../axios/axios";
import {
  selectCreateGame,
  setGroup,
  setStadion,
} from "../../redux/createGameSlice/createGameSlice";
import { useTranslation } from "react-i18next";
import FillInfo from './FillInfo';
import { useDispatch, useSelector } from 'react-redux';
import Invitation from '../../components/Invitation';

const CreateGamePage = ({ route }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [stadions, setStadions] = useState([]);
  const [groups, setGroups] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const { stadion } = useSelector(selectCreateGame);
  const groupId = route?.params?.groupId;
  const stadumId = route?.params?.stadumId;

  useEffect(() => {
    axios.get("/stadion/getAllForUser").then(({ data }) => {
      setStadions(data);
      let index = 0;
      if (stadumId) {
        index = data.findIndex((stadium) => stadium.id === stadumId);
      }
      dispatch(setStadion(data[index]));
    });
    axios.get("/group/getAll").then(({ data }) => {
      setGroups(data);
      let index = 0;
      if (groupId) {
        index = data.findIndex((group) => group.id === groupId);
      }
      dispatch(setGroup(data[index]));
    });
  }, [groupId, stadumId]);

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
        <PrimaryText weight={600} style={styles.title}>
          {t("create_game.title")}
        </PrimaryText>
        {!!stadions.length && (
          // <GameNavigation activeIndex={activeIndex} setActiveIndex={setActiveIndex} hideIndex={1}>
          //   {displayView(activeIndex)}
          // </GameNavigation>
          <FillInfo stadions={stadions} groups={groups} />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background_blue,
    paddingTop: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 16,
    paddingLeft: 16,
  },
});

export default CreateGamePage;
