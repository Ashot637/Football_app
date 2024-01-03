import { useState } from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import PrimaryText from './PrimaryText';
import Input from './Input';

import { COLORS } from '../helpers/colors';

import closeIcon from '../assets/images/close.png';
import profileIcon from '../assets/images/profile.png';
import phoneIcon from '../assets/images/call.png';

import { useTranslation } from 'react-i18next';

const PrimaryModal = ({ state, dismiss, onSubmit }) => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <Modal transparent={true} onBackdropPress={dismiss} visible={state} onRequestClose={dismiss}>
      <TouchableWithoutFeedback onPress={dismiss}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <View style={styles.modalHolder}>
        <View style={styles.modal}>
          <View style={styles.close}>
            <TouchableOpacity onPress={dismiss}>
              <Image source={closeIcon} />
            </TouchableOpacity>
          </View>
          <PrimaryText style={styles.title}>Add a new guest</PrimaryText>
          <View style={styles.inputs}>
            <Input value={name} setValue={setName} img={profileIcon} placeholder={t('user.name')} />
            <Input
              value={phone}
              setValue={setPhone}
              img={phoneIcon}
              placeholder={t('user.phone')}
            />
          </View>
          <View style={styles.btns}>
            <TouchableOpacity onPress={dismiss}>
              <View style={styles.cancelBtn}>
                <PrimaryText style={styles.btnText} weight={600}>
                  Cancel
                </PrimaryText>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onSubmit(name, phone)}
              disabled={!name.trim().length || !phone.trim().length}>
              <View
                style={[
                  styles.submitbtn,
                  (!name.trim().length || !phone.trim().length) && styles.disabled,
                ]}>
                <PrimaryText style={[styles.btnText, { color: COLORS.black }]} weight={600}>
                  Add
                </PrimaryText>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalHolder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  modal: {
    backgroundColor: COLORS.black,
    marginHorizontal: 16,
    position: 'relative',
    paddingVertical: 32,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.yellow,
  },
  close: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  title: {
    fontSize: 22,
    color: COLORS.lightWhite,
    textAlign: 'center',
    marginBottom: 32,
  },
  inputs: {
    rowGap: 24,
    marginBottom: 32,
  },
  btns: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  cancelBtn: {
    width: 98,
    backgroundColor: COLORS.darkgrey,
    borderRadius: 15,
    paddingVertical: 9,
    borderColor: COLORS.lightWhite,
    borderWidth: 1,
  },
  submitbtn: {
    width: 100,
    backgroundColor: COLORS.yellow,
    borderRadius: 15,
    paddingVertical: 10,
  },
  disabled: {
    opacity: 0.8,
  },
  btnText: {
    fontSize: 18,
    textAlign: 'center',
    color: COLORS.lightWhite,
  },
});

export default PrimaryModal;
