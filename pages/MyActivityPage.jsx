import { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import PrimaryText from '../components/PrimaryText';

import YourActivity from '../components/YourActivity';
import UpcomingBookings from '../components/UpcomingBookings';

import { COLORS } from '../helpers/colors';

import { useTranslation } from 'react-i18next';

const items = [
  {
    title: 'activity.your_activity',
    Element: YourActivity,
  },
  // {
  //   title: 'activity.upcoming_bookings',
  //   Element: UpcomingBookings,
  // },
];

const MyActivityPage = () => {
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const Component = items[selectedIndex].Element;

  return (
    <ScrollView style={styles.container}>
      {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.items}>
          {items.map((item, index) => {
            return (
              <TouchableOpacity
                key={item.title}
                onPress={() => selectedIndex !== index && setSelectedIndex(index)}>
                <View
                  style={[
                    styles.itemView,
                    selectedIndex === index && styles.itemViewActive,
                    !index && { marginLeft: 16 },
                  ]}>
                  <PrimaryText
                    weight={600}
                    style={[styles.itemText, selectedIndex === index && styles.itemTextActive]}>
                    {t(item.title)}
                  </PrimaryText>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView> */}
      <Component />
      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
    paddingVertical: 24,
  },
  items: {
    flexDirection: 'row',
    columnGap: 8,
    marginBottom: 32,
  },
  itemView: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 40,
    height: 'auto',
  },
  itemText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  itemViewActive: {
    borderColor: COLORS.lightblue,
    backgroundColor: COLORS.darkgrey,
  },
  itemTextActive: {
    color: COLORS.lightblue,
  },
});
export default MyActivityPage;
