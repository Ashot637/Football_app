import { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import redUniformIcon from '../../assets/images/uniform-red.png';
import blueUniformIcon from '../../assets/images/uniform-blue.png';
import blackUniformIcon from '../../assets/images/uniform-black.png';
import whiteUniformIcon from '../../assets/images/uniform-white.png';

import PrimaryText from '../../components/PrimaryText';
import { COLORS } from '../../helpers/colors';
import CheckBox from '../../components/CheckBox';
import { useDispatch, useSelector } from 'react-redux';
import { selectCreateGame, setUniforms } from '../../redux/createGameSlice/createGameSlice';
import { useTranslation } from 'react-i18next';

const icons = [redUniformIcon, blueUniformIcon, blackUniformIcon, whiteUniformIcon];

const ChooseUniform = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { uniforms } = useSelector(selectCreateGame);

  const onSelectUniform = (index) => {
    dispatch(setUniforms(index));
  };

  return (
    <View style={styles.container}>
      <PrimaryText style={styles.title} weight={600}>
        {t('game.uniform_color')}
      </PrimaryText>
      {icons.map((icon, index) => {
        return (
          <View style={styles.uniformView} key={index}>
            <Image source={icon} style={styles.icon} />
            <View style={styles.bar}>
              <View style={[styles.bar]} />
            </View>
            <CheckBox state={uniforms.includes(index)} setState={() => onSelectUniform(index)} />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  title: {
    color: COLORS.lightWhite,
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  uniformView: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 12,
    marginBottom: 10,
  },
  bar: {
    flex: 1,
    height: 10,
    backgroundColor: '#405742',
    borderRadius: 10,
    position: 'relative',
  },
  icon: {
    width: 48,
    height: 48,
  },
});

export default ChooseUniform;
