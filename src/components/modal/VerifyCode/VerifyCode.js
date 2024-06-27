//react components
import React, {useRef, useState} from 'react';
import {
  Modal,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
  TextInput,
  Keyboard,
  Alert,
} from 'react-native';
//custom components
import MyButton from '../../MyButton/MyButton';
import CustomLoader from '../../CustomLoader/CustomLoader';
// styles
import {styles} from './VerifyCodeStyle';
import {Server} from '../../../global';

const VerifyCode = ({
  visible = false,
  setVisibility = () => {},
  onButtonPress = () => {},
  setotpCode,
  setshowChangePassword,
}) => {
  //variables : useRef
  const firstCodeRef = useRef();
  const secondCodeRef = useRef();
  const thirdCodeRef = useRef();
  const forthCodeRef = useRef();
  //States
  const [showLoader, setshowLoader] = useState(false);
  const [firstCode, setfirstCode] = useState('');
  const [secondCode, setsecondCode] = useState('');
  const [thirdCode, setthirdCode] = useState('');
  const [forthCode, setforthCode] = useState('');
  //function : modal function
  const closeModal = () => {
    setVisibility(false);
  };
  //function : imp function
  const clearText = () => {
    setfirstCode('');
    setsecondCode('');
    setthirdCode('');
    setforthCode('');
  };
  const Validation = () => {
    const code = firstCode + secondCode + thirdCode + forthCode;
    if (code.length != 4) {
      Alert.alert('Please enter valid OTP number');
    } else return true;
  };
  //function : service function
  const VerifyCode = async () => {
    if (Validation()) {
      setshowLoader(true);
      try {
        const code = firstCode + secondCode + thirdCode + forthCode;
        const data = {
          otp: code,
          status: 'otp',
        };
        const resp = await Server.postApi(Server.CHANGE_PASSWORD, data);
        if (resp.data.status) {
          setotpCode(code);
          setshowLoader(false);
          clearText();
          closeModal();
          setshowChangePassword(true);
        } else {
          Alert.alert(`${resp.data.msg}`);
          setshowLoader(false);
        }
      } catch (error) {
        console.error('error in VerifyCode', error);
        setshowLoader(false);
      }
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
          <View
            style={[
              styles.childContainer,
              {
                // paddingBottom: Constants.isIOS ? bottom : 0
              },
            ]}>
            {/* header */}
            <View style={styles.headerContainer}>
              <Text style={styles.modalTitle}>Verification Code</Text>
              <Text style={styles.TextInputTitle}>
                Please enter verification code received in your registered email
              </Text>
              <View style={styles.TextInputView}>
                <TextInput
                  ref={firstCodeRef}
                  style={styles.textInput}
                  value={firstCode}
                  onChangeText={text => {
                    if (text.length == 1) {
                      secondCodeRef.current.focus();
                    } else {
                      firstCodeRef.current.focus();
                    }
                    setfirstCode(text);
                  }}
                  placeholderTextColor="gray"
                  allowFontScaling={false}
                  maxLength={1}
                  onSubmitEditing={() => secondCodeRef.current.focus()}
                  keyboardType="number-pad"
                />
                <TextInput
                  ref={secondCodeRef}
                  style={styles.textInput}
                  value={secondCode}
                  onChangeText={text => {
                    if (text.length == 1) {
                      thirdCodeRef.current.focus();
                    } else {
                      firstCodeRef.current.focus();
                    }
                    setsecondCode(text);
                  }}
                  placeholderTextColor="gray"
                  allowFontScaling={false}
                  maxLength={1}
                  onSubmitEditing={() => thirdCodeRef.current.focus()}
                  keyboardType="number-pad"
                />
                <TextInput
                  ref={thirdCodeRef}
                  style={styles.textInput}
                  value={thirdCode}
                  onChangeText={text => {
                    if (text.length == 1) {
                      forthCodeRef.current.focus();
                    } else {
                      secondCodeRef.current.focus();
                    }
                    setthirdCode(text);
                  }}
                  placeholderTextColor="gray"
                  allowFontScaling={false}
                  maxLength={1}
                  onSubmitEditing={() => forthCodeRef.current.focus()}
                  keyboardType="number-pad"
                />
                <TextInput
                  ref={forthCodeRef}
                  style={styles.textInput}
                  value={forthCode}
                  onChangeText={text => {
                    if (text.length == 1) {
                      Keyboard.dismiss();
                    } else {
                      thirdCodeRef.current.focus();
                    }
                    setforthCode(text);
                  }}
                  placeholderTextColor="gray"
                  allowFontScaling={false}
                  maxLength={1}
                  onSubmitEditing={() => forthCodeRef.current.focus()}
                  keyboardType="number-pad"
                />
              </View>
            </View>
            <CustomLoader showLoader={showLoader} />
            <MyButton
              ButtonTitle="Reset Password"
              onPress={() => VerifyCode()}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default React.memo(VerifyCode);
