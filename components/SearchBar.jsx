import { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, TextInput, View } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { selectSearch, setFromSearchIcon, setTerm } from '../redux/searchSlice/searchSlice';

import { useDebounce } from 'use-debounce';
import { useIsFocused } from '@react-navigation/native';

import { LinearGradient } from 'expo-linear-gradient';

import { COLORS } from '../helpers/colors';

import searchIcon from '../assets/images/search.png';

import { useTranslation } from 'react-i18next';

const SearchBar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { fromSearchIcon } = useSelector(selectSearch);
  const inputRef = useRef(null);
  const isFocused = useIsFocused();
  const [searchValue, setSearchValue] = useState('');
  const [value] = useDebounce(searchValue, 500);

  useEffect(() => {
    if (fromSearchIcon) {
      inputRef.current.focus();
    }

    return () => {
      dispatch(setFromSearchIcon(false));
    };
  }, [isFocused, fromSearchIcon]);

  useEffect(() => {
    dispatch(setTerm(value));
  }, [value]);

  return (
    <LinearGradient colors={[COLORS.darkgrey, 'rgba(32, 44, 34, 0.92)']} style={styles.gradient}>
      <View style={styles.header}>
        <View style={styles.container}>
          <TextInput
            ref={inputRef}
            value={searchValue}
            onChangeText={setSearchValue}
            placeholder={t('common.search')}
            style={styles.input}
            placeholderTextColor={COLORS.lightblue}
            selectionColor={COLORS.lightblue}
            maxLength={50}
          />
          <Image source={searchIcon} />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    paddingTop: 46,
    paddingBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 12,
    paddingTop: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: COLORS.lightblue,
    columnGap: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.lightblue,
  },
});

export default SearchBar;
