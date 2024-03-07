import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Accordion from '../../components/Accordion';
import PrimaryText from '../../components/PrimaryText';
import { COLORS } from '../../helpers/colors';
import { useTranslation } from 'react-i18next';
import {
  addDays,
  addMonths,
  addYears,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isBefore,
  isSameDay,
  isSameMonth,
  setHours,
  setMinutes,
  startOfMonth,
  subDays,
  subMonths,
  subYears,
} from 'date-fns';

import arrowIcon from '../../assets/images/arrow.png';
import { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCreateGame, setDate } from '../../redux/createGameSlice/createGameSlice';

import icon from '../../assets/images/calendar.png';

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const ChooseDate = memo(({ accordionId, toggleAccordion, isActive }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState(new Date());
  const { date, time } = useSelector(selectCreateGame);

  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  const daysInMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });

  const startingDayIndex = getDay(firstDayOfMonth);
  const endingDayIndex = getDay(lastDayOfMonth);

  const lastDayOfPrevMonth = endOfMonth(subMonths(currentDate, 1));
  let previusMonthDays = [];

  if (startingDayIndex !== 1) {
    previusMonthDays = eachDayOfInterval({
      start: subDays(lastDayOfPrevMonth, startingDayIndex === 0 ? 5 : startingDayIndex - 2),
      end: lastDayOfPrevMonth,
    });
  }

  const startDayOfNextMonth = startOfMonth(addMonths(currentDate, 1));

  let nextMonthDays = [];
  if (endingDayIndex !== 0) {
    nextMonthDays = eachDayOfInterval({
      start: startDayOfNextMonth,
      end: addDays(startDayOfNextMonth, 7 - endingDayIndex - 1),
    });
  }

  const onPrevMonth = () => {
    setCurrentDate((currentDate) => subMonths(currentDate, 1));
  };

  const onNextMonth = () => {
    setCurrentDate((currentDate) => addMonths(currentDate, 1));
  };

  const onPrevYear = () => {
    setCurrentDate((currentDate) => subYears(currentDate, 1));
  };

  const onNextYear = () => {
    setCurrentDate((currentDate) => addYears(currentDate, 1));
  };

  return (
    <Accordion
      icon={icon}
      title={date ? format(date, 'dd MMMM yyyy') : t('home.choose_date')}
      toggleIsOpen={() => toggleAccordion(accordionId)}
      isOpen={isActive}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.block}>
            <TouchableOpacity onPress={onPrevMonth}>
              <Image source={arrowIcon} style={{ transform: [{ rotate: '180deg' }] }} />
            </TouchableOpacity>
            <PrimaryText style={styles.title} weight={600}>
              {t(`date.month.${format(currentDate, 'MMMM')}`)}
            </PrimaryText>
            <TouchableOpacity onPress={onNextMonth}>
              <Image source={arrowIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.block}>
            <TouchableOpacity onPress={onPrevYear}>
              <Image source={arrowIcon} style={{ transform: [{ rotate: '180deg' }] }} />
            </TouchableOpacity>
            <PrimaryText style={styles.title} weight={600}>
              {format(currentDate, 'yyyy')}
            </PrimaryText>
            <TouchableOpacity onPress={onNextYear}>
              <Image source={arrowIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.weekDays}>
            {weekDays.map((item) => {
              return (
                <PrimaryText key={item} style={styles.weekDay} weight={600}>
                  {t(`date.week.${item}`)}
                </PrimaryText>
              );
            })}
          </View>
          <FlatList
            scrollEnabled={false}
            data={[...previusMonthDays, ...daysInMonth, ...nextMonthDays]}
            columnWrapperStyle={styles.row}
            renderItem={({ item }) => {
              const disabled =
                !isSameMonth(item, currentDate) || isBefore(addDays(item, 1), new Date());
              return (
                <TouchableOpacity
                  disabled={disabled}
                  onPress={() => {
                    dispatch(setDate(String(item)));
                    toggleAccordion(accordionId);
                  }}>
                  <View style={styles.dayBlock}>
                    <PrimaryText
                      key={item}
                      style={[
                        styles.day,
                        isSameDay(item, date) && styles.active,
                        disabled && styles.disabled,
                      ]}
                      weight={600}>
                      {format(item, 'd')}
                    </PrimaryText>
                  </View>
                </TouchableOpacity>
              );
            }}
            numColumns={7}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          />
        </View>
      </View>
    </Accordion>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingVertical: 18,
    paddingHorizontal: 8,
    backgroundColor: '#2F4131',
    borderRadius: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  block: {
    columnGap: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    color: COLORS.lightWhite,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  weekDay: {
    fontSize: 15,
    color: COLORS.lightWhite,
    width: 38,
    textAlign: 'center',
  },
  dayBlock: {
    width: 38,
    height: 38,
    alignItems: 'center',
  },
  day: {
    borderRadius: 5,
    width: 28,
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
  },
  active: {
    backgroundColor: '#4CBB17',
  },
  disabled: {
    color: '#fff',
    opacity: 0.4,
  },
});

export default ChooseDate;
