import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Input from '../../components/Input';

import ChooseStadion from './ChooseStadion';
import ChooseDate from './ChooseDate';
import PrimaryButton from '../../components/PrimaryButton';
import ChooseTime from './ChooseTime';

import axios from '../../axios/axios';

import priceIcon from '../../assets/images/money-bag-white.png';
import { useDispatch, useSelector } from 'react-redux';
import {
  reset,
  selectCreateGame,
  setPrice,
  setRange,
} from '../../redux/createGameSlice/createGameSlice';
import { selectAuth } from '../../redux/authSlice/authSlice';
import { stringToDate } from '../../helpers/stringToDate';
import { useNavigation } from '@react-navigation/native';
import CheckBox from '../../components/CheckBox';
import ConfirmationModal from '../../components/ConfirmationModal';
import PrimaryText from '../../components/PrimaryText';
import { useTranslation } from 'react-i18next';
import { COLORS } from '../../helpers/colors';

const accordions = [ChooseStadion, ChooseDate, ChooseTime];

const FillInfo = ({ stadions }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [active, setActive] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { stadion, date, time, duration, uniforms, price, range } = useSelector(selectCreateGame);
  const { user } = useSelector(selectAuth);

  const toggleAccordion = (accordionId) => {
    accordionId === active ? setActive(null) : setActive(accordionId);
  };

  const onCreateMatch = () => {
    const startTime = stringToDate(date, time);
    const endTime = stringToDate(date, time, duration, duration === 1.5 ? 30 : 0);
    axios
      .post('/game/organizerCreate', {
        price,
        startTime,
        endTime,
        stadionId: stadion.id,
        uniforms,
        userName: user.name,
        range,
      })
      .then(({ data }) => {
        if (data.success) {
          navigation.navigate('success', { game: data.game, confirmationNumber: data.game.id });
          dispatch(reset());
        } else {
          console.error('Something went wrong');
        }
      });
    setIsOpenModal(false);
  };

  return (
    <View style={styles.container}>
      {isOpenModal && (
        <ConfirmationModal state={isOpenModal} dismiss={() => setIsOpenModal(false)}>
          <PrimaryText style={styles.modalTitle} weight={600}>
            {t('common.dear')} {user.name}!
          </PrimaryText>
          <PrimaryText style={styles.modalSubTitle}>{t('create_game.asking')}</PrimaryText>
          <View style={styles.modalBtns}>
            <TouchableOpacity onPress={() => setIsOpenModal(false)} style={{ flex: 1 }}>
              <View style={styles.cancelBtn}>
                <PrimaryText style={styles.btnText} weight={600}>
                  {t('common.no')}
                </PrimaryText>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={onCreateMatch} style={{ flex: 1 }}>
              <View style={styles.submitbtn}>
                <PrimaryText style={[styles.btnText, { color: COLORS.black }]} weight={600}>
                  {t('common.yes')}
                </PrimaryText>
              </View>
            </TouchableOpacity>
          </View>
        </ConfirmationModal>
      )}
      <View style={{ rowGap: 24, marginBottom: 32 }}>
        {accordions.map((Accordion, index) => {
          return (
            <Accordion
              key={index}
              accordionId={index}
              isActive={active === index}
              stadions={stadions}
              toggleAccordion={toggleAccordion}
            />
          );
        })}
        <Input
          value={price}
          setValue={(p) => dispatch(setPrice(p))}
          img={priceIcon}
          type="phone-pad"
          placeholder={t('common.total_price')}
        />
        <View style={{ paddingLeft: 16, rowGap: 24 }}>
          <CheckBox
            state={range === 1}
            setState={() => dispatch(setRange(1))}
            title={t('create_game.once')}
          />
          <CheckBox
            state={range === 4}
            setState={() => dispatch(setRange(4))}
            title={t('create_game.month')}
          />
        </View>
      </View>
      <PrimaryButton
        disabled={!date || !time || !duration}
        onPress={() => setIsOpenModal(true)}
        title={t('create_game.create')}
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
    color: COLORS.yellow,
  },
  modalSubTitle: {
    fontSize: 16,
    color: COLORS.lightWhite,
    marginBottom: 15,
  },
  modalBtns: {
    flexDirection: 'row',
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
    backgroundColor: COLORS.yellow,
    borderRadius: 15,
    paddingVertical: 10,
  },
  btnText: {
    fontSize: 18,
    textAlign: 'center',
    color: COLORS.lightWhite,
  },
});

export default FillInfo;
