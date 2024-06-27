//react components
import React from 'react';
import {Modal, Text, TouchableOpacity, View, TextInput} from 'react-native';
// styles
import {styles} from './PaymentSuccessStyle';
//svg
import SuccessSvg from '../../../assets/svg/success.svg';
import {globalStyles} from 'global/GlobalStyle';
const PaymentSuccess = ({
  visible = false,
  setVisibility = () => {},
  headerTitle = '',
  description = '',
  buttonTitle = '',
  onButtonPress = () => {},
}) => {
  const closeModal = () => {
    setVisibility(false);
  };

  // const handleOnRequestClose = () => {
  //     if (!Constants.isIOS) {
  //         closeModal();
  //     }
  // };

  return (
    <Modal
      onRequestClose={closeModal}
      visible={visible}
      animationType="fade"
      transparent={true}>
      <View style={styles.container}>
        <TouchableOpacity onPress={closeModal} style={styles.blurView} />
        <View
          style={[
            styles.childContainer,
            {
              // paddingBottom: Constants.isIOS ? bottom : 0
            },
          ]}>
          {/* header */}
          <View style={styles.headerContainer}>
            <View style={styles.iconStyle}>
              <SuccessSvg />
            </View>
            <Text style={styles.modalTitle}>
              Subscription Payment successfully
            </Text>
          </View>
          <TouchableOpacity
            style={{
              ...globalStyles.buttonStyle,
              marginHorizontal: 0,
              borderRadius: 5,
            }}>
            <Text style={globalStyles.buttonTextStyle}>Go to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(PaymentSuccess);
