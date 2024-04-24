import { StyleSheet, View } from "react-native";

import PlayersList from "./PlayersList";

import { COLORS } from "../helpers/colors";

const GamePlayersList = ({ game }) => {
  return (
    <View style={styles.container}>
      <PlayersList
        players={game.users}
        maxPlayersCount={game.maxPlayersCount}
        title={"common.players"}
        organizerId={game.creatorId}
        groupId={game.groupId}
        isPublic={game.isPublic}
        gameId={game.id}
        usersWillPlayCount={game.usersWillPlayCount}
        usersWontPlayCount={game.usersWontPlayCount}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  divider: {
    height: 1,
    flex: 1,
    marginBottom: 14,
    backgroundColor: COLORS.darkgrey,
  },
});

export default GamePlayersList;
