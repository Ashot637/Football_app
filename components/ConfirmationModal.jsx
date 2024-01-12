import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
} from 'react-native';

import PrimaryText from './PrimaryText';

import { COLORS } from '../helpers/colors';

import closeIcon from '../assets/images/close.png';
import { useTranslation } from 'react-i18next';

const ConfirmationModal = ({ state, dismiss, children }) => {
  const { t } = useTranslation();
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
          {children}
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
    paddingHorizontal: 22,
    width: '100%',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.yellow,
  },
  close: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});

export default ConfirmationModal;
