import {
  ActivityIndicator,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../helpers/colors";
import Heading from "../components/Heading";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import axios from "../axios/axios";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCreateGame,
  setGroup,
  setStadion,
} from "../redux/createGameSlice/createGameSlice";
import GameFixedDetails from "../components/GameFixedDetails";
import PrivateGame from "../components/PrivateGame";

import EditIcon from "../assets/images/Edit_game.svg";
import DeleteIcon from "../assets/images/delete.svg";
import ConfirmationModal from "../components/ConfirmationModal";

const MyGameDetails = ({ route, navigation }) => {
  const { id } = route?.params;
  const { title } = route?.params;

  const dispatch = useDispatch();

  const [game, setGame] = useState([]);
  const [stadions, setStadions] = useState([]);
  const { stadion } = useSelector(selectCreateGame);
  const [groups, setGroups] = useState([]);
  const groupId = route?.params?.groupId;
  const stadumId = route?.params?.stadumId;
  const [isLoading, setIsLoading] = useState(true);
  const [deleteGamePopup, setDeleteGamePopup] = useState(false);

  useLayoutEffect(() => {
    onRefresh();
  }, [route]);

  const onRefresh = useCallback(() => {
    setIsLoading(true);
    axios.get("/game/getOne/" + id).then(({ data }) => {
      setGame(data);
      setIsLoading(false);
    });
  }, [id]);

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

  const deleteGame = () => {
    console.log(id);
    axios.delete("/game/delete", {
      data: {
        ids: [id],
      },
    }).then(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "main" }],
      });
    });
  };

  return (
    <>
      {deleteGamePopup && (
        <ConfirmationModal dismiss={() => setDeleteGamePopup(false)}>
          <>
            <Text
              style={{
                color: "white",
                fontSize: 17,
                width: "100%",
                textAlign: "center",
              }}
            >{`Դուք համոզվա՞ծ եք, որ ցանկանում եք ջնջել խաղը։`}</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => setDeleteGamePopup(false)}
                style={styles.cancelButton}
              >
                <Text style={{ color: "white", fontSize: 18 }}>Ոչ</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={deleteGame} style={styles.acceptButton}>
                <Text style={{ color: "white", fontSize: 18 }}>Այո</Text>
              </TouchableOpacity>
            </View>
          </>
        </ConfirmationModal>
      )}
      {isLoading && (
        <View style={styles.loader}>
          <ActivityIndicator
            size={"large"}
            style={styles.loader}
            color={COLORS.yellow}
          />
        </View>
      )}
      {!isLoading && game && (
        <>
          <ScrollView>
            <View style={styles.background}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Heading title={title} />
                <View style={{ gap: 20, flexDirection: "row" }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("edit_game", {
                        game: game,
                        title: title,
                        stadumId: game.stadion.id,
                      })
                    }
                  >
                    <EditIcon />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setDeleteGamePopup(true)}>
                    <DeleteIcon />
                  </TouchableOpacity>
                </View>
              </View>
              {game.length !== 0 && (
                <>
                  <GameFixedDetails game={game} title={title} />
                  <PrivateGame game={game} />
                </>
              )}
            </View>
          </ScrollView>
        </>
      )}
    </>
  );
};

export default MyGameDetails;

const styles = StyleSheet.create({
  background: {
    backgroundColor: COLORS.background_blue,
    width: "100%",
    height: "100%",
    paddingLeft: 15,
    paddingRight: 15,
  },
  block: {
    width: "100%",
    backgroundColor: "#031852",
    height: 60,
    borderRadius: 16,
    marginBottom: 15,
    textAlign: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
  },
  loader: {
    backgroundColor: COLORS.background_blue,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
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
