// import { memo, useState } from "react";
// import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
// import PrimaryText from "../PrimaryText";

// import avatarImg from "../../assets/images/avatar.png";
// import { COLORS } from "../../helpers/colors";
// import { format } from "date-fns";
// import { BASE_URL } from "../../axios/axios";

// import likeImg from "../../assets/images/heart.png";
// import { useTranslation } from "react-i18next";

// let timer = null;
// const TIMEOUT = 250;
// const debounce = (onSingle, onDouble) => {
//   if (timer) {
//     clearTimeout(timer);
//     timer = null;
//     onDouble();
//   } else {
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       timer = null;
//       onSingle();
//     }, TIMEOUT);
//   }
// };

// const SenderMessage = memo(
//   ({
//     data,
//     setOpenMenuMessageId,
//     isOpenMenu,
//     onDeleteMessage,
//     onReactToMessage,
//   }) => {
//     const { t } = useTranslation();
//     const onPress = () => {
//       debounce(
//         () => setOpenMenuMessageId(null),
//         () => onReactToMessage(data.id, data.userId)
//       );
//     };

//     return (
//       <View style={{ flex: 1 }}>
//         <View style={[styles.container, isOpenMenu && styles.openMenu]}>
//           {/* {!isNextUserSame ? (
//             <Image
//               style={styles.avatar}
//               source={data.user.img ? { uri: BASE_URL + data.user.img } : avatarImg}
//             />
//           ) : (
//             <View style={{ width: 46 }} />
//           )} */}
//           <View>
//             {isOpenMenu && (
//               <>
//                 <View style={styles.emojisMenu}>
//                   <TouchableOpacity
//                     onPress={(e) => {
//                       e.stopPropagation();
//                       onReactToMessage(data.id, data.userId);
//                     }}
//                   >
//                     <Image source={likeImg} />
//                   </TouchableOpacity>
//                 </View>
//                 <View style={styles.actionsMenu}>
//                   <TouchableOpacity
//                     onPress={(e) => {
//                       e.stopPropagation();
//                       onDeleteMessage(data.id, data.userId);
//                     }}
//                   >
//                     <PrimaryText style={styles.action}>
//                       {t("chat.delete_from_everyone")}
//                     </PrimaryText>
//                   </TouchableOpacity>
//                 </View>
//               </>
//             )}
//             <TouchableOpacity
//               onPress={onPress}
//               onLongPress={(e) => {
//                 setOpenMenuMessageId(data.id);
//               }}
//             >
//             {/* {!isNextUserSame && <PrimaryText style={styles.username}>You</PrimaryText>} */}

//              <PrimaryText style={styles.username}>You</PrimaryText>
//               <View style={styles.block}>
//                 <PrimaryText
//                   style={[
//                     styles.message,
//                     data.text.length < 5 &&
//                       !data?.likedUsers?.length && { textAlign: "right" },
//                   ]}
//                 >
//                   {data.text}
//                 </PrimaryText>
//                 <View
//                   style={{
//                     flexDirection: "row-reverse",
//                     justifyContent: "space-between",
//                     columnGap: 15,
//                   }}
//                 >
//                   {!!data.likedUsers?.length && (
//                     <View
//                       style={{
//                         flexDirection: "row",
//                         alignItems: "center",
//                         columnGap: 2,
//                       }}
//                     >
//                       <Image style={styles.reaction} source={likeImg} />
//                       <PrimaryText style={styles.reactionCount}>
//                         {data.likedUsers.length}
//                       </PrimaryText>
//                     </View>
//                   )}
//                 </View>
          
//               </View>
//               <PrimaryText style={styles.time}>
//                     {format(data.createdAt, "HH:mm")}
//                   </PrimaryText>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     );
//   }
// );

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row-reverse",
//     columnGap: 5,
//   },
//   closeMenu: {
//     opacity: 0.1,
//   },
//   openMenu: {
//     zIndex: 1,
//   },
//   avatar: {
//     width: 46,
//     height: 46,
//     borderWidth: 2,
//     borderColor: COLORS.darkBlue,
//     borderRadius: 23,
//   },
//   block: {
//     backgroundColor: "#2A59D2",
//     paddingBottom: 6,
//     paddingTop: 8,
//     paddingHorizontal: 13,
//     borderRadius: 14,
//     marginBottom: 3,
//     maxWidth: 220,
//   },
//   message: {
//     fontSize: 18,
//     color: COLORS.lightWhite,
//     marginBottom: 4,
//   },
//   time: {
//     color: COLORS.lightWhite,
//     fontSize: 12,
//     textAlign: "right",
//   },
//   username: {
//     color: COLORS.grey,
//     fontStyle: "italic",
//     marginBottom: 5,
//     textAlign: "right",
//   },
//   overlay: {
//     backgroundColor: "rgba(17, 22, 19, 0.9)",
//     height: "100%",
//   },
//   actionsMenu: {
//     position: "absolute",
//     backgroundColor: "#032176",
//     paddingVertical: 14,
//     borderRadius: 15,
//     flex: 1,
//     bottom: "100%",
//     marginBottom: 2,
//     width: 240,
//     right: 0,
//     zIndex: 2,
//   },
//   emojisMenu: {
//     position: "absolute",
//     backgroundColor: "#032176",
//     paddingVertical: 6,
//     paddingHorizontal: 9,
//     borderRadius: 15,
//     bottom: "100%",
//     marginBottom: 59,
//     flex: 1,
//     zIndex: 2,
//     right: 0,
//   },
//   action: {
//     fontSize: 22,
//     color: COLORS.lightWhite,
//     textAlign: "center",
//   },
//   reaction: {
//     width: 18,
//     height: 18,
//   },
//   reactionCount: {
//     color: COLORS.grey,
//   },
// });

// export default SenderMessage;



import { memo, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import PrimaryText from "../PrimaryText";

import avatarImg from "../../assets/images/avatar.png";
import { COLORS } from "../../helpers/colors";
import { format } from "date-fns";
import { BASE_URL } from "../../axios/axios";

import likeImg from "../../assets/images/heart.png";
import { useTranslation } from "react-i18next";

let timer = null;
const TIMEOUT = 250;
const debounce = (onSingle, onDouble) => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
    onDouble();
  } else {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      onSingle();
    }, TIMEOUT);
  }
};

const SenderMessage = memo(
  ({
    data,
    setOpenMenuMessageId,
    isOpenMenu,
    onDeleteMessage,
    onReactToMessage,
  }) => {
    const { t, i18n} = useTranslation();
    const onPress = () => {
      debounce(
        () => setOpenMenuMessageId(null),
        () => onReactToMessage(data.id, data.userId)
      );
    };

    const isCurrentUser = data.currentUserId === data.userId; 
    // const displayName = isCurrentUser ? t("chat.currentUser") : data.user.name;

    return (
      <View style={{ flex: 1 }}>
        <View style={[styles.container, isOpenMenu && styles.openMenu]}>
          {/* {!isNextUserSame ? (
            <Image
              style={styles.avatar}
              source={data.user.img ? { uri: BASE_URL + data.user.img } : avatarImg}
            />
          ) : (
            <View style={{ width: 46 }} />
          )} */}
          <View>
            {isOpenMenu && (
              <>
                <View style={styles.emojisMenu}>
                  <TouchableOpacity
                    onPress={(e) => {
                      e.stopPropagation();
                      onReactToMessage(data.id, data.userId);
                    }}
                  >
                    <Image source={likeImg} />
                  </TouchableOpacity>
                </View>
                <View style={styles.actionsMenu}>
                  <TouchableOpacity
                    onPress={(e) => {
                      e.stopPropagation();
                      onDeleteMessage(data.id, data.userId);
                    }}
                  >
                    <PrimaryText style={styles.action}>
                      {t("chat.delete_from_everyone")}
                    </PrimaryText>
                  </TouchableOpacity>
                </View>
              </>
            )}
            <TouchableOpacity
              onPress={onPress}
              onLongPress={(e) => {
                setOpenMenuMessageId(data.id);
              }}
            >
            {/* {!isCurrentUser && <PrimaryText style={styles.username}>{t('chat.currentUser')}</PrimaryText>} */}

             {/* <PrimaryText style={styles.username}>{data.user.name}</PrimaryText> */}
             
             {!isCurrentUser && (
                <PrimaryText style={styles.username}>
                  {data.user.name}  
                </PrimaryText>
              )}

            {/* <PrimaryText style={styles.username}>
                {isCurrentUser ? t('chat.currentUser') : data.user.name}
              </PrimaryText> */}



              <View style={styles.block}>
                <PrimaryText
                  style={[
                    styles.message,
                    data.text.length < 5 &&
                      !data?.likedUsers?.length && { textAlign: "right" },
                  ]}
                >
                  {data.text}
                </PrimaryText>
                <View
                  style={{
                    flexDirection: "row-reverse",
                    justifyContent: "space-between",
                    columnGap: 15,
                  }}
                >
                  {!!data.likedUsers?.length && (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        columnGap: 2,
                      }}
                    >
                      <Image style={styles.reaction} source={likeImg} />
                      <PrimaryText style={styles.reactionCount}>
                        {data.likedUsers.length}
                      </PrimaryText>
                    </View>
                  )}
                </View>
          
              </View>
              <PrimaryText style={styles.time}>
                    {format(data.createdAt, "HH:mm")}
                  </PrimaryText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
    columnGap: 5,
  },
  closeMenu: {
    opacity: 0.1,
  },
  openMenu: {
    zIndex: 1,
  },
  avatar: {
    width: 46,
    height: 46,
    borderWidth: 2,
    borderColor: COLORS.darkBlue,
    borderRadius: 23,
  },
  block: {
    backgroundColor: "#2A59D2",
    paddingBottom: 6,
    paddingTop: 8,
    paddingHorizontal: 13,
    borderRadius: 14,
    marginBottom: 3,
    maxWidth: 220,
  },
  message: {
    fontSize: 18,
    color: COLORS.lightWhite,
    marginBottom: 4,
  },
  time: {
    color: COLORS.lightWhite,
    fontSize: 12,
    textAlign: "right",
  },
  username: {
    color: COLORS.grey,
    fontStyle: "italic",
    marginBottom: 5,
    textAlign: "right",
  },
  overlay: {
    backgroundColor: "rgba(17, 22, 19, 0.9)",
    height: "100%",
  },
  actionsMenu: {
    position: "absolute",
    backgroundColor: "#032176",
    paddingVertical: 14,
    borderRadius: 15,
    flex: 1,
    bottom: "100%",
    marginBottom: 2,
    width: 240,
    right: 0,
    zIndex: 2,
  },
  emojisMenu: {
    position: "absolute",
    backgroundColor: "#032176",
    paddingVertical: 6,
    paddingHorizontal: 9,
    borderRadius: 15,
    bottom: "100%",
    marginBottom: 59,
    flex: 1,
    zIndex: 2,
    right: 0,
  },
  action: {
    fontSize: 22,
    color: COLORS.lightWhite,
    textAlign: "center",
  },
  reaction: {
    width: 18,
    height: 18,
  },
  reactionCount: {
    color: COLORS.grey,
  },
});

export default SenderMessage;
