//react components
import React, {useState} from 'react';
import {
  Modal,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
  Alert,
  TextInput,
} from 'react-native';
//custom components
import MyButton from '../../MyButton/MyButton';
import CustomLoader from '../../CustomLoader/CustomLoader';
//global
import {Colors, Server} from '../../../global';
// styles
import {styles} from './ForgotPasswordStyle';
//svg
import MailSvg from '../../../assets/svg/email.svg';

const ForgotPassword = ({
  visible = false,
  setshowVerifyCodeModal,
  setVisibility = () => {},
  onButtonPress = () => {},
}) => {
  //States
  const [email, setemail] = useState('');
  const [showLoader, setshowLoader] = useState(false);
  //function : modal function
  const closeModal = () => {
    setVisibility(false);
  };
  //function : service function
  const forgotPasswordByEmail = async () => {
    if (email != '') {
      const data = {
        email: email,
      };
      try {
        setshowLoader(true);
        const resp = await Server.postApi(Server.RESET_PASSWORD, data);
        if (resp.data.status) {
          closeModal();
          setshowVerifyCodeModal(true);
          setemail('');
          setshowLoader(false);
        } else {
          setshowLoader(false);
          Alert.alert(`${resp.data.msg}`);
        }
      } catch (error) {
        setshowLoader(false);
        console.error('error in forgotPasswordByEmail', error);
      }
    } else {
      Alert.alert('', 'Email is Mandatory Feild');
    }
  };
  //UI
  return (
    <Modal
      onRequestClose={closeModal}
      visible={visible}
      animationType="fade"
      transparent={true}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.container}>
          <TouchableOpacity onPress={closeModal} style={styles.blurView} />
          <View style={styles.mainView}>
            <Text style={styles.modalTitle}>
              Please enter your registration email
            </Text>
            <Text style={styles.textInputHeader}>Email Address</Text>
            <View style={styles.textInputView}>
              <MailSvg />
              <TextInput
                placeholder="Enter email address"
                keyboardType="email-address"
                onChangeText={text => setemail(text)}
                allowFontScaling={false}
                style={styles.textInputStyle}
                placeholderTextColor={Colors.BLACK}
              />
            </View>
            {showLoader ? <CustomLoader showLoader={showLoader} /> : null}
            <MyButton
              onPress={() => forgotPasswordByEmail()}
              ButtonTitle="Reset Password"
              disabled={showLoader ? true : false}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default React.memo(ForgotPassword);
