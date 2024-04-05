// import { ImageBackground, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
// import PrimaryText from './PrimaryText';

// import { BASE_URL } from '../axios/axios';
// import { COLORS } from '../helpers/colors';

// import { useNavigation } from '@react-navigation/native';
// import { format } from 'date-fns';

// import playersIcon from '../assets/images/players.png';

// import { useTranslation } from 'react-i18next';

// const Game = ({ game }) => {
//   const { t } = useTranslation();
//   const navigation = useNavigation();

//   return (
//     <TouchableOpacity onPress={() => navigation.navigate('game', { id: game.id })}>
//       <ImageBackground source={{ uri: BASE_URL + game.stadion.img }} style={styles.image}>
//         <View style={styles.container}>
//           <View style={styles.info}>
//             {!!game.price && (
//               <View style={styles.infoView}>
//                 <PrimaryText style={styles.infoText} weight={600}>
//                   {game.price} {t('common.amd')}
//                 </PrimaryText>
//               </View>
//             )}
//             <View style={[styles.infoView, styles.infoViewDark]}>
//               <PrimaryText style={styles.infoText}>{`${format(game.startTime, 'HH:mm')} - ${format(
//                 game.endTime,
//                 'HH:mm',
//               )}`}</PrimaryText>
//             </View>

//             <View style={[styles.infoView, styles.infoViewDark, styles.players]}>
//               <Image source={playersIcon} style={styles.playersIcon} />
//               <PrimaryText style={styles.infoText} weight={600}>
//                 {game.playersCount} {game.maxPlayersCount < 50 ? '/ ' + game.maxPlayersCount : ''}
//               </PrimaryText>
//             </View>
//           </View>
//           <PrimaryText style={styles.title} weight={600}>
//             {game.stadion.title}
//           </PrimaryText>
//         </View>
//       </ImageBackground>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   image: {
//     aspectRatio: 16 / 9,
//     borderRadius: 15,
//   },
//   container: {
//     height: '100%',
//     justifyContent: 'space-between',
//     paddingHorizontal: 18,
//     paddingVertical: 16,
//   },
//   info: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     height: 25,
//   },
//   infoView: {
//     backgroundColor: COLORS.green,
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 20,
//   },
//   infoViewDark: {
//     backgroundColor: '#008000',
//   },
//   infoText: {
//     color: '#fff',
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   players: {
//     flexDirection: 'row',
//     columnGap: 10,
//   },
//   playersIcon: {
//     width: 20,
//     aspectRatio: 1,
//   },
//   title: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default Game;
import { ImageBackground, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import PrimaryText from './PrimaryText';

import { BASE_URL } from '../axios/axios';
import { COLORS } from '../helpers/colors';

import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';

import playersIcon from '../assets/images/players.png';

import { useTranslation } from 'react-i18next';

const Game = ({ game }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('game', { id: game.id })}>
      <View style={styles.container}>
        <ImageBackground source={{ uri: BASE_URL + game.stadion.img }} style={styles.image}>
          <View style={styles.overlay}>
            <View style={styles.info}>
              {!!game.price && (
                <View style={styles.infoView}>
                  <PrimaryText style={styles.infoText} weight={600}>
                    {game.price} {t('common.amd')}
                  </PrimaryText>
                </View>
              )}
              <View style={[styles.infoView, styles.infoViewDark]}>
                <PrimaryText style={styles.infoText}>{`${format(
                  game.startTime,
                  'HH:mm',
                )} - ${format(game.endTime, 'HH:mm')}`}</PrimaryText>
              </View>

              <View style={[styles.infoView, styles.infoViewDark, styles.players]}>
                <Image source={playersIcon} style={styles.playersIcon} />
                <PrimaryText style={styles.infoText} weight={600}>
                  {game.playersCount} {game.maxPlayersCount < 50 ? '/ ' + game.maxPlayersCount : ''}
                </PrimaryText>
              </View>
            </View>
            <PrimaryText style={styles.title} weight={600}>
              {game.stadion.title}
            </PrimaryText>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    aspectRatio: 16 / 9,
    borderRadius: 6,
    overflow: 'hidden',
  },
  container: {
    borderRadius: 15,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 25,
  },
  infoView: {
    backgroundColor: COLORS.green,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  infoViewDark: {
    backgroundColor: '#008000',
  },
  infoText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  players: {
    flexDirection: 'row',
    columnGap: 10,
  },
  playersIcon: {
    width: 20,
    aspectRatio: 1,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Game;
