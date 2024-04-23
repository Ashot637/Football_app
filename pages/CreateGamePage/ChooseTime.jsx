import { useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Accordion from '../../components/Accordion';
import PrimaryText from '../../components/PrimaryText';
import { COLORS } from '../../helpers/colors';
import {
  selectCreateGame,
  setDuration,
  setTime,
} from '../../redux/createGameSlice/createGameSlice';
import { useDispatch, useSelector } from 'react-redux';

import icon from '../../assets/images/clock.png';
import arrowIcon from '../../assets/images/arrow.png';
import { useTranslation } from 'react-i18next';

const times = [
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
];

const ChooseTime = ({ accordionId, toggleAccordion, isActive }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { time, duration } = useSelector(selectCreateGame);
  const [isOpenDurationPopup, setIsOpenDurationPopup] = useState(false);

  return (
    <View style={{ flexDirection: 'row', columnGap: 15 }}>
      <View style={{ width: '50%' }}>
        <Accordion
          icon={icon}
          title={time || t('common.start_time')}
          toggleIsOpen={() => toggleAccordion(accordionId)}
          isOpen={isActive}>
          <View style={styles.times}>
            <ScrollView nestedScrollEnabled>
              {times.map((time, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(setTime(time));
                      toggleAccordion(accordionId);
                    }}
                    key={time}
                    style={[styles.time, index === times.length - 1 && { borderBottomWidth: 0 }]}>
                    <PrimaryText style={{ color: COLORS.grey }} weight={600}>
                      {time}
                    </PrimaryText>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </Accordion>
      </View>
      <View style={{ width: '45%' }}>
        <TouchableOpacity onPress={() => setIsOpenDurationPopup((prev) => !prev)}>
          <View style={styles.duration}>
            <Image
              source={icon}
              style={{
                width: 24,
                height: 24,
              }}
            />
            <PrimaryText style={styles.title} weight={600}>
              {duration ?? t('common.durat')}
            </PrimaryText>
            <Image
              source={arrowIcon}
              style={{ transform: [{ rotate: isOpenDurationPopup ? '90deg' : '270deg' }] }}
            />
          </View>
        </TouchableOpacity>

        {isOpenDurationPopup && (
          <View style={styles.singleDuration}>
            {[1, 1.5, 2].map((d, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(setDuration(d));
                    setIsOpenDurationPopup(false);
                  }}
                  key={d}
                  style={[styles.time, index === 2 && { borderBottomWidth: 0 }]}>
                  <PrimaryText style={{ color: COLORS.grey }} weight={600}>
                    {d}
                  </PrimaryText>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  duration: {
    backgroundColor: COLORS.blue,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 16,
    flexDirection: 'row',
    columnGap: 8,
    alignItems: 'center',
  },
  title: {
    flex: 1,
    color: COLORS.lightWhite,
  },
  times: {
    height: 230,
    paddingHorizontal: 9,
    paddingRight: 5,
    backgroundColor: COLORS.blue,
    borderRadius: 16,
  },
  singleDuration: {
    paddingHorizontal: 9,
    paddingRight: 5,
    backgroundColor: 'red',
    backgroundColor: COLORS.blue,
    borderRadius: 16,
    marginTop: 10,
  },
  time: {
    paddingHorizontal: 7,
    paddingVertical: 18,
    borderBottomColor: COLORS.grey,
    borderBottomWidth: 1,
    marginRight: 6,
  },
});

export default ChooseTime;
