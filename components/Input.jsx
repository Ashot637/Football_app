import { Image, StyleSheet, TextInput, View } from 'react-native';

import { COLORS } from '../helpers/colors';

const Input = ({ img, placeholder, value, setValue, type = 'default', secureTextEntry }) => {
  return (
    <View style={styles.inputView}>
      <Image source={img} height={24} width={24} />
      <TextInput
        value={value}
        onChangeText={setValue}
        keyboardType={type}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        placeholderTextColor={COLORS.grey}
        selectionColor={'#fff'}
        maxLength={30}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    width: '100%',
    backgroundColor: COLORS.darkgrey,
    borderRadius: 16,
    paddingLeft: 16,
    height: 64,
    display: 'flex',
    alignItems: 'center',
    columnGap: 8,
    flexDirection: 'row',
  },
  input: {
    width: '100%',
    color: '#fff',
    fontWeight: '600',
    height: '100%',
  },
});

export default Input;
