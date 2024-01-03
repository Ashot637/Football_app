import { StyleSheet, View } from 'react-native';

import PlayersList from './PlayersList';

import { COLORS } from '../helpers/colors';

const GamePlayersList = ({ game }) => {
  return (
    <View style={styles.container}>
      <PlayersList
        players={game.users.filter(({ UserGame }) => UserGame.team === 1)}
        guests={game.guests.filter(({ team }) => team === 1)}
        maxPlayersCount={game.maxPlayersCount / 2}
        title={'game.player_from_first_group'}
      />
      <View style={styles.divider} />
      <PlayersList
        players={game.users.filter(({ UserGame }) => UserGame.team === 2)}
        guests={game.guests.filter(({ team }) => team === 2)}
        maxPlayersCount={game.maxPlayersCount / 2}
        title={'game.player_from_second_group'}
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
