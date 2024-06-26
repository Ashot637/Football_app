import { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import PrimaryText from "./PrimaryText";

import { useSelector } from "react-redux";
import { selectAuth } from "../redux/authSlice/authSlice";

import { format } from "date-fns";

import axios from "../axios/axios";

import { COLORS } from "../helpers/colors";

import CheckBox from "./CheckBox";
import PrimaryButton from "./PrimaryButton";

import redUniformIcon from "../assets/images/uniform-red.png";
import blueUniformIcon from "../assets/images/uniform-blue.png";
import blackUniformIcon from "../assets/images/uniform-black.png";
import whiteUniformIcon from "../assets/images/uniform-white.png";
import { useNavigation } from "@react-navigation/native";

import { useTranslation } from "react-i18next";
import PrimaryModal from "./PrimaryModal";

const icons = [
  redUniformIcon,
  blueUniformIcon,
  blackUniformIcon,
  whiteUniformIcon,
];

const BookNow = ({ game }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { user } = useSelector(selectAuth);
  const [isIndividual, setIsIndividual] = useState(true);
  const [selectedUniforms, setSelectedUniforms] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [guests, setGuests] = useState([]);

  const userAlreadyBooked =
    game.users.findIndex((gameUser) => gameUser.id === user?.id) > -1;

  const onSubmitBooking = () => {
    axios
      .post("/game/register/" + game.id, {
        uniforms: selectedUniforms,
        guests: guests.length ? JSON.stringify(guests) : null,
        userName: user.name,
      })
      .then(({ data }) => {
        if (data.success) {
          navigation.navigate("success", {
            game,
            confirmationNumber: data.userGame.id,
          });
        } else {
          console.error("Something went wrong");
        }
      });
  };

  const onAddGuest = (name, phone) => {
    setGuests((prev) => [...prev, { name, phone }]);
    setIsOpenModal(false);
  };

  const onRemoveGuest = (index) => {
    setGuests(guests.filter((_, i) => i !== index));
  };

  const onSelectUniform = (index) => {
    if (selectedUniforms.length === 2 && !selectedUniforms.includes(index)) {
      setSelectedUniforms((prev) => [prev[1], index]);
    } else {
      selectedUniforms.includes(index)
        ? setSelectedUniforms((prev) => prev.filter((i) => i !== index))
        : setSelectedUniforms((prev) => [...prev, index]);
    }
  };

  return (
    <View style={styles.container}>
      <PrimaryText style={styles.title} weight={600}>
        {t("game.book_now")}
      </PrimaryText>
      {/* <View style={styles.block}> */}
      {/* <PrimaryText style={styles.subtitle} weight={700}>
          {t('game.personal_info')}
        </PrimaryText>
        <View style={styles.checkboxes}>
          <CheckBox
            title={t('game.individual_game')}
            state={isIndividual}
            setState={() => setIsIndividual(true)}
          />
          <CheckBox
            title={t('game.with_guests')}
            state={!isIndividual}
            setState={() => setIsIndividual(false)}
          />
        </View> */}
      {/* <View style={styles.infoView}>
          {isIndividual ? (
            <>
              <PrimaryText style={styles.infoText}>{user?.name}</PrimaryText>
              <PrimaryText style={styles.infoText}>{user?.phone}</PrimaryText>
              {user?.email && <PrimaryText style={styles.infoText}>{user.email}</PrimaryText>}
            </>
          ) : (
            <>
              <PrimaryText style={styles.guestsViewTitle} weight={600}>
                {t('game.maximum_guests_count')}
              </PrimaryText>
              {guests.map((guest, index) => {
                return (
                  <View style={styles.guest} key={guest.phone}>
                    <PrimaryText style={styles.infoText}>{guest.name}</PrimaryText>
                    <TouchableOpacity onPress={() => onRemoveGuest(index)}>
                      <Image source={closeIcon} />
                    </TouchableOpacity>
                  </View>
                );
              })}
              {guests.length < 2 && (
                <TouchableOpacity onPress={() => setIsOpenModal(true)}>
                  <PrimaryText style={styles.guestsViewBtn}>{t('game.add_new_guest')}</PrimaryText>
                </TouchableOpacity>
              )}
            </>
          )}
        </View> */}
      {/* </View> */}
      <View style={styles.block}>
        <PrimaryText style={styles.subtitle} weight={700}>
          {t("game.booking_details")}
        </PrimaryText>
        <View style={styles.infoView}>
          <PrimaryText style={styles.infoText}>
            {game.stadion.title}
          </PrimaryText>
          <PrimaryText style={styles.infoText}>
            {format(game.startTime, "dd.MM.yyyy")}
          </PrimaryText>
          <PrimaryText style={styles.infoText}>{`${format(
            game.startTime,
            "HH:mm"
          )} - ${format(game.endTime, "HH:mm")}`}</PrimaryText>
        </View>
      </View>
      <View style={styles.block}>
        <PrimaryText style={styles.subtitle} weight={700}>
          {t("game.uniform_color")}
        </PrimaryText>
        <View style={styles.uniforms}>
          {game?.uniforms?.map((uniformChoseUsersCount, index) => {
            return (
              <View style={styles.uniformView} key={index}>
                <Image source={icons[index]} style={styles.uniformIcon} />
                <View style={styles.bar}>
                  <View
                    style={[
                      styles.barActive,
                      {
                        width: `${
                          uniformChoseUsersCount &&
                          (uniformChoseUsersCount / game.playersCount) * 100
                        }%`,
                      },
                    ]}
                  />
                </View>
                <CheckBox
                  state={selectedUniforms.includes(index)}
                  setState={() => onSelectUniform(index)}
                />
              </View>
            );
          })}
        </View>
      </View>
      <View style={styles.block}>
        <PrimaryText style={styles.subtitle} weight={700}>
          {t("game.stadium_info")}
        </PrimaryText>
        <View style={styles.infoView}>
          <PrimaryText style={styles.infoText}>
            {game.stadion.title}
          </PrimaryText>
          <PrimaryText style={styles.infoText}>
            {game.stadion.address}
          </PrimaryText>
        </View>
      </View>
      <View style={styles.block}>
        <PrimaryText style={styles.subtitle} weight={700}>
          {t("game.cancellation_policy")}
        </PrimaryText>
        <PrimaryText style={styles.infoText}>
          {t("game.cancellation_policy_info")}
        </PrimaryText>
      </View>
      <PrimaryButton
        title={
          userAlreadyBooked
            ? t("game.already_booked")
            : game.maxPlayersCount === game.playersCount
            ? t("game.maximum_players")
            : t("game.book_now")
        }
        onPress={() => onSubmitBooking()}
        disabled={
          userAlreadyBooked ||
          game.playersCount === game.maxPlayersCount ||
          (!guests.length && !isIndividual) ||
          (!isIndividual &&
            game.maxPlayersCount < game.playersCount + guests.length + 1)
        }
      />
      {isOpenModal && (
        <PrimaryModal
          state={isOpenModal}
          dismiss={() => setIsOpenModal(false)}
          onSubmit={onAddGuest}
          title={t("game.add_new_guest")}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  block: {
    backgroundColor: COLORS.darkgrey,
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 20,
  },
  title: {
    color: COLORS.lightWhite,
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 24,
    textAlign: "center",
  },
  subtitle: {
    color: "#EFFFC8",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  },
  checkboxes: {
    rowGap: 20,
  },
  infoView: {
    rowGap: 5,
    marginVertical: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: COLORS.black,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  infoText: {
    fontSize: 20,
    color: "#fff",
  },
  uniforms: {
    rowGap: 10,
  },
  uniformView: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 12,
  },
  uniformIcon: {
    width: 48,
    height: 48,
  },
  bar: {
    flex: 1,
    height: 10,
    backgroundColor: "#405742",
    borderRadius: 10,
    position: "relative",
  },
  barActive: {
    position: "absolute",
    height: 10,
    backgroundColor: COLORS.yellow,
    borderRadius: 10,
  },
  guest: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  guestsViewTitle: {
    color: "#fff",
    fontSize: 20,
  },
  guestsViewBtn: {
    color: COLORS.yellow,
    fontSize: 20,
  },
});

export default BookNow;
