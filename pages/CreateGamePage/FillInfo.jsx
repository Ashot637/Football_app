// import { useState } from "react";
// import { StyleSheet, TouchableOpacity, View } from "react-native";
// import Input from "../../components/Input";

// import ChooseStadion from "./ChooseStadion";
// import ChooseDate from "./ChooseDate";
// import PrimaryButton from "../../components/PrimaryButton";
// import ChooseTime from "./ChooseTime";

// import axios from "../../axios/axios";

// import PriceIcon from "../../assets/images/money bag.svg";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   reset,
//   selectCreateGame,
//   setNeedRefresh,
//   setPrice,
//   setRange,
// } from "../../redux/createGameSlice/createGameSlice";
// import { selectAuth } from "../../redux/authSlice/authSlice";
// import { stringToDate } from "../../helpers/stringToDate";
// import { useNavigation } from "@react-navigation/native";
// import ConfirmationModal from "../../components/ConfirmationModal";
// import PrimaryText from "../../components/PrimaryText";
// import { useTranslation } from "react-i18next";
// import { COLORS } from "../../helpers/colors";
// import ChooseGroup from "./ChooseGroup";
// import RadioButton from "../../components/RadioButton";
// import ChooseUniform from "./ChooseUniform";
// import CheckBox from "../../components/CheckBox";

// const accordions = [ChooseGroup, ChooseStadion, ChooseDate, ChooseTime];

// const FillInfo = ({ stadions, groups, cantChangeStadium }) => {
//   const { t } = useTranslation();
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   const [active, setActive] = useState(null);
//   const { group, stadion, date, time, duration, uniforms, price, range } =
//     useSelector(selectCreateGame);
//   const { user } = useSelector(selectAuth);

//   const toggleAccordion = (accordionId) => {
//     accordionId === active ? setActive(null) : setActive(accordionId);
//   };

//   const onCreateMatch = () => {
//     const startTime = stringToDate(date, time);
//     const endTime = stringToDate(
//       date,
//       time,
//       duration,
//       duration === 1.5 ? 30 : 0
//     );
//     axios
//       .post("/game/organizerCreate", {
//         groupId: group.id,
//         price,
//         startTime,
//         endTime,
//         stadionId: stadion.id,
//         uniforms,
//         userName: user.name,
//         range,
//       })
//       .then(({ data }) => {
//         if (data.success) {
//           navigation.navigate("success", {
//             game: data.game,
//             confirmationNumber: data.game.id,
//           });
//           dispatch(reset());
//           dispatch(setNeedRefresh());
//         } else {
//           console.error("Something went wrong");
//         }
//       });
//     // setIsOpenModal(false);
//   };

//   return (
//     <View style={styles.container}>
//       {/* {isOpenModal && (
//         <ConfirmationModal
//           state={isOpenModal}
//           dismiss={() => setIsOpenModal(false)}
//         >
//           <PrimaryText style={styles.modalTitle} weight={600}>
//             {t("common.dear")} {user.name}!
//           </PrimaryText>
//           <PrimaryText style={styles.modalSubTitle}>
//             {t("create_game.asking")}
//           </PrimaryText>
//           <View style={styles.modalBtns}>
//             <TouchableOpacity
//               testID="yes"
//               onPress={() => setIsOpenModal(false)}
//               style={{ flex: 1 }}
//             >
//               <View style={styles.cancelBtn}>
//                 <PrimaryText style={styles.btnText} weight={600}>
//                   {t("common.no")}
//                 </PrimaryText>
//               </View>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={onCreateMatch}
//               style={{ flex: 1 }}
//               testID="no"
//             >
//               <View style={styles.submitbtn}>
//                 <PrimaryText
//                   style={[styles.btnText, { color: "#fff" }]}
//                   weight={600}
//                 >
//                   {t("common.yes")}
//                 </PrimaryText>
//               </View>
//             </TouchableOpacity>
//           </View>
//         </ConfirmationModal>
//       )} */}
    
//       <View style={{ rowGap: 24, marginBottom: 10 }}>
//         {accordions.map((Accordion, index) => {
//           // if (!index) {
//           //   return (
//           //     <Fragment key={index}>
//           //       <Accordion
//           //         accordionId={index}
//           //         isActive={active === index}
//           //         stadions={stadions}
//           //         toggleAccordion={toggleAccordion}
//           //       />

//           //       {!!stadion?.facilities.length && (
//           //         <PrimaryText style={styles.title} weight={600}>
//           //           {t("game.facilities")}
//           //         </PrimaryText>
//           //       )}
//           //       {!!stadion?.facilities.length && (
//           //         <View style={styles.items}>
//           //           {stadion?.facilities?.map((item) => {
//           //             return (
//           //               <View style={styles.item} key={item.id}>
//           //                 <View style={styles.icon}>
//           //                   <Image
//           //                     source={{ uri: BASE_URL + item.img }}
//           //                     width={32}
//           //                     height={32}
//           //                   />
//           //                 </View>
//           //                 <PrimaryText style={styles.facilitie}>
//           //                   {item.title}
//           //                 </PrimaryText>
//           //               </View>
//           //             );
//           //           })}
//           //         </View>
//           //       )}
//           //     </Fragment>
//           //   );
//           // }
//           return (
//             <Accordion
//               key={index}
//               accordionId={index}
//               cantChange={cantChangeStadium}
//               isActive={active === index}
//               {...(index ? { stadions } : { groups })}
//               toggleAccordion={toggleAccordion}
//             />
//           );
//         })}
//         <View style={{ rowGap: 10 }}>
//           <Input
//             value={price}
//             testId="game-price"
//             setValue={(p) => dispatch(setPrice(p))}
//             img={<PriceIcon />}
//             type="phone-pad"
//             placeholder={
//               t("common.total_price") +
//               " " +
//               t("common.amd") +
//               t("game.per_person")
//             }
//           />
//           {/* <PrimaryText style={{ color: "#B2BED7", fontSize: 13 }}>
//             {t("create_game.price_info")}
//           </PrimaryText> */}
//         </View>
        
//         <View style={{ paddingLeft: 16, rowGap: 24 }}>
//         <CheckBox
//             testId="price_info-checkbox"
//             title={t("create_game.price_info")}
//             />
            
//           <CheckBox
//             testId="repeat-checkbox"
//             state={range === 4}
//             title={t("common.repeatable")}
//             setState={() => {
//               if (range === 1) {
//                 dispatch(setRange(4));
//               } else {
//                 dispatch(setRange(1));
//               }
//             }}
//           />
//         </View>
//       </View>
//       <ChooseUniform />
//       <PrimaryButton
//         disabled={!date || !time || !duration || !group}
//         onPress={onCreateMatch}
//         title={t("create_game.create")}
//       />
//     </View>
//   );
// };


/*հիմնական կոդ*/
// import { useState } from "react";
// import { StyleSheet, TouchableOpacity, View } from "react-native";
// import Input from "../../components/Input";

// import ChooseStadion from "./ChooseStadion";
// import ChooseDate from "./ChooseDate";
// import PrimaryButton from "../../components/PrimaryButton";
// import ChooseTime from "./ChooseTime";

// import axios from "../../axios/axios";

// import PriceIcon from "../../assets/images/money bag.svg";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   reset,
//   selectCreateGame,
//   setNeedRefresh,
//   setPrice,
//   setRange,
// } from "../../redux/createGameSlice/createGameSlice";
// import { selectAuth } from "../../redux/authSlice/authSlice";
// import { stringToDate } from "../../helpers/stringToDate";
// import { useNavigation } from "@react-navigation/native";
// import ConfirmationModal from "../../components/ConfirmationModal";
// import PrimaryText from "../../components/PrimaryText";
// import { useTranslation } from "react-i18next";
// import { COLORS } from "../../helpers/colors";
// import ChooseGroup from "./ChooseGroup";
// import RadioButton from "../../components/RadioButton";
// import ChooseUniform from "./ChooseUniform";
// import CheckBox from "../../components/CheckBox";
// import SelectTeamOrGroup from "./SelectTeamOrGroup";

// // const accordions = [ChooseGroup, ChooseStadion, ChooseDate, ChooseTime];
// const accordions = [ChooseGroup, ChooseStadion, ChooseDate, ChooseTime];


// const FillInfo = ({ stadions, groups, cantChangeStadium }) => {
//   const { t } = useTranslation();
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   const [active, setActive] = useState(null);
//   const { group, stadion, date, time, duration, uniforms, price, range } =
//     useSelector(selectCreateGame);
//   const { user } = useSelector(selectAuth);

//   const toggleAccordion = (accordionId) => {
//     accordionId === active ? setActive(null) : setActive(accordionId);
//   };
//   const [priceInfoChecked, setPriceInfoChecked] = useState(false);

//   const onCreateMatch = () => {
//     const startTime = stringToDate(date, time);
//     const endTime = stringToDate(
//       date,
//       time,
//       duration,
//       duration === 1.5 ? 30 : 0
//     );
//     axios
//       .post("/game/organizerCreate", {
//         groupId: group.id,
//         price,
//         startTime,
//         endTime,
//         stadionId: stadion.id,
//         uniforms,
//         userName: user.name,
//         range,
//         priceInfoChecked
//       })
//       .then(({ data }) => {
//         if (data.success) {
//           navigation.navigate("success", {
//             game: data.game,
//             confirmationNumber: data.game.id,
//           });
//           dispatch(reset());
//           dispatch(setNeedRefresh());
//         } else {
//           console.error("Something went wrong");
//         }
//       });
//     // setIsOpenModal(false);
//   };

//   return (
//     <View style={styles.container}>
//       {/* {isOpenModal && (
//         <ConfirmationModal
//           state={isOpenModal}
//           dismiss={() => setIsOpenModal(false)}
//         >
//           <PrimaryText style={styles.modalTitle} weight={600}>
//             {t("common.dear")} {user.name}!
//           </PrimaryText>
//           <PrimaryText style={styles.modalSubTitle}>
//             {t("create_game.asking")}
//           </PrimaryText>
//           <View style={styles.modalBtns}>
//             <TouchableOpacity
//               testID="yes"
//               onPress={() => setIsOpenModal(false)}
//               style={{ flex: 1 }}
//             >
//               <View style={styles.cancelBtn}>
//                 <PrimaryText style={styles.btnText} weight={600}>
//                   {t("common.no")}
//                 </PrimaryText>
//               </View>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={onCreateMatch}
//               style={{ flex: 1 }}
//               testID="no"
//             >
//               <View style={styles.submitbtn}>
//                 <PrimaryText
//                   style={[styles.btnText, { color: "#fff" }]}
//                   weight={600}
//                 >
//                   {t("common.yes")}
//                 </PrimaryText>
//               </View>
//             </TouchableOpacity>
//           </View>
//         </ConfirmationModal>
//       )} */}
    
//       <View style={{ rowGap: 24, marginBottom: 10 }}>
//         {accordions.map((Accordion, index) => {
//           // if (!index) {
//           //   return (
//           //     <Fragment key={index}>
//           //       <Accordion
//           //         accordionId={index}
//           //         isActive={active === index}
//           //         stadions={stadions}
//           //         toggleAccordion={toggleAccordion}
//           //       />

//           //       {!!stadion?.facilities.length && (
//           //         <PrimaryText style={styles.title} weight={600}>
//           //           {t("game.facilities")}
//           //         </PrimaryText>
//           //       )}
//           //       {!!stadion?.facilities.length && (
//           //         <View style={styles.items}>
//           //           {stadion?.facilities?.map((item) => {
//           //             return (
//           //               <View style={styles.item} key={item.id}>
//           //                 <View style={styles.icon}>
//           //                   <Image
//           //                     source={{ uri: BASE_URL + item.img }}
//           //                     width={32}
//           //                     height={32}
//           //                   />
//           //                 </View>
//           //                 <PrimaryText style={styles.facilitie}>
//           //                   {item.title}
//           //                 </PrimaryText>
//           //               </View>
//           //             );
//           //           })}
//           //         </View>
//           //       )}
//           //     </Fragment>
//           //   );
//           // }
//           return (
//             <Accordion
//               key={index}
//               accordionId={index}
//               cantChange={cantChangeStadium}
//               isActive={active === index}
//               {...(index ? { stadions } : { groups })}
//               toggleAccordion={toggleAccordion}
//             />
//           );
//         })}
//         <View style={{ rowGap: 10 }}>
//           <Input
//             value={price}
//             testId="game-price"
//             setValue={(p) => dispatch(setPrice(p))}
//             img={<PriceIcon />}
//             type="phone-pad"
//             placeholder={
//               t("common.total_price") +
//               " " +
//               t("common.amd") +
//               t("game.per_person")
//             }
//           />
//           {/* <PrimaryText style={{ color: "#B2BED7", fontSize: 13 }}>
//             {t("create_game.price_info")}
//           </PrimaryText> */}
//         </View>
        
//         <View style={{ paddingLeft: 16, rowGap: 24 }}>
//         <CheckBox
//             testId="price_info-checkbox"
//             title={t("create_game.price_info")}
//             // textStyle={{ fontSize: 14 }}
//             state={priceInfoChecked}
//             setState={() => setPriceInfoChecked(!priceInfoChecked)}
//             />
//           <CheckBox
//             testId="repeat-checkbox"
//             state={range === 4}
//             title={t("common.repeatable")}
//             setState={() => {
//               if (range === 1) {
//                 dispatch(setRange(4));
//               } else {
//                 dispatch(setRange(1));
//               }
//             }}
//           />
//         </View>
//       </View>
//       <SelectTeamOrGroup />

//       <ChooseUniform />
//       <PrimaryButton
//         disabled={!date || !time || !duration || !group}
//         onPress={onCreateMatch}
//         title={t("create_game.create")}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingTop: 24,
//     paddingHorizontal: 16,
//     paddingBottom: 48,
//   },
//   modalTitle: {
//     fontSize: 18,
//     color: COLORS.cyan,
//   },
//   modalSubTitle: {
//     fontSize: 16,
//     color: COLORS.lightWhite,
//     marginBottom: 15,
//   },
//   modalBtns: {
//     flexDirection: "row",
//     columnGap: 11,
//   },
//   cancelBtn: {
//     backgroundColor: COLORS.darkgrey,
//     borderRadius: 15,
//     paddingVertical: 9,
//     borderColor: COLORS.lightWhite,
//     borderWidth: 1,
//   },
//   submitbtn: {
//     backgroundColor: "#0968CA",
//     borderRadius: 15,
//     paddingVertical: 10,
//   },
//   btnText: {
//     fontSize: 18,
//     textAlign: "center",
//     color: COLORS.lightWhite,
//   },
//   title: {
//     color: COLORS.lightWhite,
//     fontSize: 22,
//     marginBottom: 12,
//     textAlign: "center",
//   },
//   items: {
//     rowGap: 16,
//   },
//   item: {
//     flexDirection: "row",
//     alignItems: "center",
//     columnGap: 10,
//   },
//   icon: {
//     width: 48,
//     aspectRatio: 1,
//     borderRadius: 24,
//     backgroundColor: COLORS.darkgrey,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   facilitie: {
//     color: "#fff",
//     fontSize: 20,
//   },
// });

// export default FillInfo;

/*նոր կոդ*/
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Input from "../../components/Input";

import ChooseStadion from "./ChooseStadion";
import ChooseDate from "./ChooseDate";
import PrimaryButton from "../../components/PrimaryButton";
import ChooseTime from "./ChooseTime";

import axios from "../../axios/axios";

import PriceIcon from "../../assets/images/money bag.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  reset,
  selectCreateGame,
  setNeedRefresh,
  setPrice,
  setRange,
} from "../../redux/createGameSlice/createGameSlice";
import { selectAuth } from "../../redux/authSlice/authSlice";
import { stringToDate } from "../../helpers/stringToDate";
import { useNavigation } from "@react-navigation/native";
import ConfirmationModal from "../../components/ConfirmationModal";
import PrimaryText from "../../components/PrimaryText";
import { useTranslation } from "react-i18next";
import { COLORS } from "../../helpers/colors";
import ChooseGroup from "./ChooseGroup";
import RadioButton from "../../components/RadioButton";
import ChooseUniform from "./ChooseUniform";
import CheckBox from "../../components/CheckBox";
import SelectTeamOrGroup from "./SelectTeamOrGroup";

// const accordions = [ChooseGroup, ChooseStadion, ChooseDate, ChooseTime];
const accordions = [ ChooseStadion, ChooseDate, ChooseTime];


const FillInfo = ({ stadions, cantChangeStadium }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [active, setActive] = useState(null);
  const { stadion, date, time, duration, uniforms, price, range } =
    useSelector(selectCreateGame);
  const { user } = useSelector(selectAuth);

  const toggleAccordion = (accordionId) => {
    accordionId === active ? setActive(null) : setActive(accordionId);
  };
  const [priceInfoChecked, setPriceInfoChecked] = useState(false);

  const onCreateMatch = () => {
    const startTime = stringToDate(date, time);
    const endTime = stringToDate(
      date,
      time,
      duration,
      duration === 1.5 ? 30 : 0
    );
    axios
      .post("/game/organizerCreate", {
        groupId: group.id,
        price,
        startTime,
        endTime,
        stadionId: stadion.id,
        uniforms,
        userName: user.name,
        range,
        priceInfoChecked
      })
      .then(({ data }) => {
        if (data.success) {
          navigation.navigate("success", {
            game: data.game,
            confirmationNumber: data.game.id,
          });
          dispatch(reset());
          dispatch(setNeedRefresh());
        } else {
          console.error("Something went wrong");
        }
      });
    // setIsOpenModal(false);
  };

  return (
    <View style={styles.container}>
      {/* {isOpenModal && (
        <ConfirmationModal
          state={isOpenModal}
          dismiss={() => setIsOpenModal(false)}
        >
          <PrimaryText style={styles.modalTitle} weight={600}>
            {t("common.dear")} {user.name}!
          </PrimaryText>
          <PrimaryText style={styles.modalSubTitle}>
            {t("create_game.asking")}
          </PrimaryText>
          <View style={styles.modalBtns}>
            <TouchableOpacity
              testID="yes"
              onPress={() => setIsOpenModal(false)}
              style={{ flex: 1 }}
            >
              <View style={styles.cancelBtn}>
                <PrimaryText style={styles.btnText} weight={600}>
                  {t("common.no")}
                </PrimaryText>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onCreateMatch}
              style={{ flex: 1 }}
              testID="no"
            >
              <View style={styles.submitbtn}>
                <PrimaryText
                  style={[styles.btnText, { color: "#fff" }]}
                  weight={600}
                >
                  {t("common.yes")}
                </PrimaryText>
              </View>
            </TouchableOpacity>
          </View>
        </ConfirmationModal>
      )} */}
    
      <View style={{ rowGap: 24, marginBottom: 10 }}>
        {accordions.map((Accordion, index) => {
          // if (!index) {
          //   return (
          //     <Fragment key={index}>
          //       <Accordion
          //         accordionId={index}
          //         isActive={active === index}
          //         stadions={stadions}
          //         toggleAccordion={toggleAccordion}
          //       />

          //       {!!stadion?.facilities.length && (
          //         <PrimaryText style={styles.title} weight={600}>
          //           {t("game.facilities")}
          //         </PrimaryText>
          //       )}
          //       {!!stadion?.facilities.length && (
          //         <View style={styles.items}>
          //           {stadion?.facilities?.map((item) => {
          //             return (
          //               <View style={styles.item} key={item.id}>
          //                 <View style={styles.icon}>
          //                   <Image
          //                     source={{ uri: BASE_URL + item.img }}
          //                     width={32}
          //                     height={32}
          //                   />
          //                 </View>
          //                 <PrimaryText style={styles.facilitie}>
          //                   {item.title}
          //                 </PrimaryText>
          //               </View>
          //             );
          //           })}
          //         </View>
          //       )}
          //     </Fragment>
          //   );
          // }
          return (
            <Accordion
              key={index}
              accordionId={index}
              cantChange={cantChangeStadium}
              isActive={active === index}
              stadions={stadions}
              // {...(index ? { stadions } : { groups })}
              toggleAccordion={toggleAccordion}
            />
          );
        })}
        <View style={{ rowGap: 10 }}>
          <Input
            value={price}
            testId="game-price"
            setValue={(p) => dispatch(setPrice(p))}
            img={<PriceIcon />}
            type="phone-pad"
            placeholder={
              t("common.total_price") +
              " " +
              t("common.amd") +
              t("game.per_person")
            }
          />
          {/* <PrimaryText style={{ color: "#B2BED7", fontSize: 13 }}>
            {t("create_game.price_info")}
          </PrimaryText> */}
        </View>
        
        <View style={{ paddingLeft: 16, rowGap: 24 }}>
        <CheckBox
            testId="price_info-checkbox"
            title={t("create_game.price_info")}
            // textStyle={{ fontSize: 14 }}
            state={priceInfoChecked}
            setState={() => setPriceInfoChecked(!priceInfoChecked)}
            />
          <CheckBox
            testId="repeat-checkbox"
            state={range === 4}
            title={t("common.repeatable")}
            setState={() => {
              if (range === 1) {
                dispatch(setRange(4));
              } else {
                dispatch(setRange(1));
              }
            }}
          />
        </View>
      </View>
      <SelectTeamOrGroup />

      <ChooseUniform />
      <PrimaryButton
        disabled={!date || !time || !duration || !group}
        onPress={onCreateMatch}
        title={t("create_game.create")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 48,
  },
  modalTitle: {
    fontSize: 18,
    color: COLORS.cyan,
  },
  modalSubTitle: {
    fontSize: 16,
    color: COLORS.lightWhite,
    marginBottom: 15,
  },
  modalBtns: {
    flexDirection: "row",
    columnGap: 11,
  },
  cancelBtn: {
    backgroundColor: COLORS.darkgrey,
    borderRadius: 15,
    paddingVertical: 9,
    borderColor: COLORS.lightWhite,
    borderWidth: 1,
  },
  submitbtn: {
    backgroundColor: "#0968CA",
    borderRadius: 15,
    paddingVertical: 10,
  },
  btnText: {
    fontSize: 18,
    textAlign: "center",
    color: COLORS.lightWhite,
  },
  title: {
    color: COLORS.lightWhite,
    fontSize: 22,
    marginBottom: 12,
    textAlign: "center",
  },
  items: {
    rowGap: 16,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  icon: {
    width: 48,
    aspectRatio: 1,
    borderRadius: 24,
    backgroundColor: COLORS.darkgrey,
    alignItems: "center",
    justifyContent: "center",
  },
  facilitie: {
    color: "#fff",
    fontSize: 20,
  },
});

export default FillInfo;
