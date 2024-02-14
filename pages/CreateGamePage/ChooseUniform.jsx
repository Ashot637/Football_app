import { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import redUniformIcon from '../../assets/images/uniform-red.png';
import blueUniformIcon from '../../assets/images/uniform-blue.png';
import blackUniformIcon from '../../assets/images/uniform-black.png';
import whiteUniformIcon from '../../assets/images/uniform-white.png';

import PrimaryText from '../../components/PrimaryText';
import { COLORS } from '../../helpers/colors';
import CheckBox from '../../components/CheckBox';

const icons = [redUniformIcon, blueUniformIcon, blackUniformIcon, whiteUniformIcon];

const ChooseUniform = () => {
  const [selectedUnifroms, setSelectedUniforms] = useState([]);

  const onSelectUniform = (index) => {
    selectedUnifroms.includes(index);
    if (selectedUnifroms.length === 2 && !selectedUnifroms.includes(index)) {
      setSelectedUniforms((prev) => [prev[1], index]);
    } else {
      selectedUnifroms.includes(index)
        ? setSelectedUniforms((prev) => prev.filter((i) => i !== index))
        : setSelectedUniforms((prev) => [...prev, index]);
    }
  };
  return (
    <View style={styles.container}>
      <PrimaryText style={styles.title} weight={600}>
        Choose your uniform
      </PrimaryText>
      {icons.map((icon, index) => {
        return (
          <View style={styles.uniformView} key={index}>
            <Image source={icon} style={styles.icon} />
            <View style={styles.bar}>
              <View style={[styles.bar]} />
            </View>
            <CheckBox
              state={selectedUnifroms.includes(index)}
              setState={() => onSelectUniform(index)}
            />
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
