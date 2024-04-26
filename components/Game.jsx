// import { ImageBackground, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
// import PrimaryText from './PrimaryText';

// import { BASE_URL } from '../axios/axios';
// import { COLORS } from '../helpers/colors';

// import { useNavigation } from '@react-navigation/native';

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
import {
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import PrimaryText from "./PrimaryText";

import { COLORS } from "../helpers/colors";

import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";

import stadiumIcon from "../assets/images/stadium.png";

import { useTranslation } from "react-i18next";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/authSlice/authSlice";

const Game = ({ game, disabled, title }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { user } = useSelector(selectAuth);

  const data = [
    {
      key: "Date",
      value: new Date(game.startTime).toLocaleDateString(
        "hy-AM",
        (options = { month: "2-digit", day: "2-digit", year: "numeric" })
      ),
    },
    {
      key: "Hour",
      value: `${format(game.startTime, "HH:mm")}-${format(
        game.endTime,
        "HH:mm"
      )}`,
    },
    { key: "Players", value: `${game.playersCount}/${game.maxPlayersCount}` },
    { key: "Price", value: `${game.price} AMD` },
  ];

  return (
    <TouchableOpacity
      onPress={() =>
        !disabled &&
        navigation.navigate("main", { screen: "game", params: { id: game.id } })
      }
    >
      <View style={styles.container}>
        <View style={styles.overlay}>
          <View style={styles.info}>
            <Image
              source={stadiumIcon}
              style={{
                width: 25,
                height: 25,
                transform: [{ rotate: "90deg" }],
              }}
            />
            <PrimaryText style={styles.title} weight={600}>
              {game.stadion.title}
            </PrimaryText>
          </View>
          <View style={styles.redLine}></View>
          {data.map((el, i) => (
            <Fragment key={i}>
              <View style={styles.dataBlock}>
                <PrimaryText
                  weight={i === data.length - 1 ? 700 : 400}
                  style={styles.key}
                >
                  {el.key}
                </PrimaryText>
                <PrimaryText
                  weight={i === data.length - 1 ? 700 : 400}
                  style={[
                    styles.data,
                    i === data.length - 1 ? styles.price : "",
                  ]}
                >
                  {el.value}
                </PrimaryText>
              </View>
              {i != data.length - 1 && <View style={styles.blackLine}></View>}
            </Fragment>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    aspectRatio: 16 / 9,
    borderRadius: 6,
    overflow: "hidden",
  },
  container: {
    borderRadius: 15,
    width: "100%",
    backgroundColor: "rgba(3, 33, 118, 1)",
    borderRadius: 6,
  },
  overlay: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 25,
    gap: 20,
    alignItems: "center",
  },
  redLine: {
    width: "100%",
    height: 0.5,
    backgroundColor: "rgba(239, 9, 161, 1)",
    marginTop: 10,
  },
  blackLine: {
    width: "100%",
    height: 0.5,
    backgroundColor: "rgba(26, 130, 237, 0.6)",
    marginTop: 10,
  },
  dataBlock: {
    marginTop: 5,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  key: {
    color: "rgba(178, 190, 215, 1)",
    fontSize: 18,
  },
  data: {
    color: "rgba(248, 238, 255, 1)",
    fontSize: 18,
  },
  price: {
    color: "rgba(12, 249, 221, 1)",
  },
  key: {
    color: "rgba(178, 190, 215, 1)",
    fontSize: 18,
  },
  data: {
    color: "rgba(248, 238, 255, 1)",
    fontSize: 18,
  },

  price: {
    color: "rgba(12, 249, 221, 1)",
  },

  infoView: {
    backgroundColor: COLORS.green,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  infoViewDark: {
    backgroundColor: "#008000",
  },
  infoText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  players: {
    flexDirection: "row",
    columnGap: 10,
  },
  playersIcon: {
    width: 20,
    aspectRatio: 1,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    flexWrap: "wrap",
  },
});

export default Game;
