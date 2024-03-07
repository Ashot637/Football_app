// import { StyleSheet, TouchableOpacity, View } from 'react-native';
// import PrimaryText from '../../components/PrimaryText';
// import { COLORS } from '../../helpers/colors';
// import { useState } from 'react';
// import PrimaryModal from '../../components/PrimaryModal';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   addPlayer,
//   removePlayer,
//   selectCreateGame,
// } from '../../redux/createGameSlice/createGameSlice';

// const ChoosePlayers = () => {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   const dispatch = useDispatch();
//   const { players } = useSelector(selectCreateGame);

//   const onAddPlayer = (name, phone) => {
//     dispatch(addPlayer({ name, phone }));
//     setIsOpenModal(false);
//   };

//   const onRemovePlayer = (index) => {
//     dispatch(removePlayer(index));
//   };

//   return (
//     <View style={styles.container}>
//       {/* <PrimaryText style={styles.title}>
//         You must send an invitation link to the phone numbers of up to 12 users. If the receiving
//         party does not open the link within 24 hours, it will become invalid.
//       </PrimaryText> */}
//       <View style={styles.players}>
//         {players.map((player, index) => {
//           return (
//             <View style={styles.player} key={player.name}>
//               <View>
//                 <PrimaryText style={[styles.info, styles.infoTitle]}>
//                   Player {index + 1}
//                 </PrimaryText>
//                 <PrimaryText style={styles.info}>Name</PrimaryText>
//                 <PrimaryText style={styles.info}>{player.name}</PrimaryText>
//               </View>
//               <View>
//                 <TouchableOpacity onPress={() => onRemovePlayer(index)}>
//                   <PrimaryText style={[styles.info, styles.delete]}>Delete a player</PrimaryText>
//                 </TouchableOpacity>
//                 <PrimaryText style={styles.info}>Phone number</PrimaryText>
//                 <PrimaryText style={styles.info}>{player.phone}</PrimaryText>
//               </View>
//             </View>
//           );
//         })}
//       </View>
//       <View style={{ alignItems: 'center' }}>
//         <TouchableOpacity onPress={() => setIsOpenModal(true)}>
//           <PrimaryText style={styles.add}>Add a new player</PrimaryText>
//         </TouchableOpacity>
//       </View>
//       {isOpenModal && (
//         <PrimaryModal
//           state={isOpenModal}
//           dismiss={() => setIsOpenModal(false)}
//           onSubmit={onAddPlayer}
//           title={'Add a new player'}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingVertical: 24,
//     paddingHorizontal: 16,
//   },
//   title: {
//     color: '#fff',
//     fontSize: 16,
//     marginBottom: 24,
//   },
//   players: {},
//   player: {
//     marginBottom: 16,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingBottom: 12,
//     borderBottomWidth: 0.5,
//     borderBottomColor: COLORS.grey,
//     paddingHorizontal: 5,
//   },
//   add: {
//     fontSize: 20,
//     color: COLORS.yellow,
//     textAlign: 'center',
//   },
//   infoTitle: {
//     fontSize: 22,
//     color: COLORS.lightblue,
//   },
//   info: {
//     color: COLORS.lightWhite,
//     fontSize: 18,
//   },
//   delete: {
//     textDecorationLine: 'underline',
//   },
// });

// export default ChoosePlayers;
