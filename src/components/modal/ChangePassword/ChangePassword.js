//react components
import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
//custom components
import TextInputArea from '../../TextInputArea/TextInputArea';
import MyButton from '../../MyButton/MyButton';
import CustomLoader from '../../CustomLoader/CustomLoader';
//styles
import {styles} from './ChangePasswordStyle';
import {connect} from 'react-redux';
import {Colors, Server} from '../../../global';

const ChangePassword = ({
  visible,
  setVisible = () => {},
  otpCode,
  userToken,
}) => {
  //hook : ref
  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();
  //hook : states
  const [showLoader, setshowLoader] = useState(false);
  const [newPassword, setnewPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [oldPassword, setoldPassword] = useState('');
  //function : imp function
  const Validation = () => {
    if (newPassword != '') {
      if (confirmPassword != '') {
        if (newPassword == confirmPassword) {
          return true;
        } else {
          confirmPasswordRef.current.focus();
          Alert.alert('Password and confirm password does not match');
        }
      } else {
        confirmPasswordRef.current.focus();
        Alert.alert('Enter confirm password');
      }
    } else {
      newPasswordRef.current.focus();
      Alert.alert('Enter new password');
    }
  };
  //function : service function
  const changePassword = async () => {
    if (Validation()) {
      setshowLoader(true);
      try {
        const data = {
          otp: otpCode,
          password: newPassword,
          password_confirmation: confirmPassword,
          status: 'password',
        };
        const resp = await Server.postApi(Server.CHANGE_PASSWORD, data);
        if (resp.data.status) {
          closeModal();
          Alert.alert('Success', `${resp.data.msg}`);
          setshowLoader(false);
          setnewPassword('');
          setconfirmPassword('');
        } else {
          Alert.alert('Error while change password', `${resp.data.msg}`);
          setshowLoader(false);
        }
      } catch (error) {
        console.error('error in SaveNewPassword', error);
        setshowLoader(false);
      }
    }
  };
  const updatePassword = async () => {
    if (Validation()) {
      setshowLoader(true);
      const data = {
        old_password: oldPassword,
        password: newPassword,
        password_confirmation: confirmPassword,
      };
      try {
        const resp = await Server.postApiWithToken(
          userToken,
          Server.UPDATE_PASSWORD,
          data,
        );
        if (resp.data.status) {
          Alert.alert('Success', `${resp.data.msg}`);
          setshowLoader(false);
          closeModal();
          setoldPassword('');
          setnewPassword('');
          setconfirmPassword('');
        } else {
          Alert.alert('Error', `${resp.data.msg}`);
          setshowLoader(false);
        }
      } catch (error) {
        console.error('error in updatePassword', error);
        setshowLoader(false);
      }
    }
  };
  //function : modal function
  const closeModal = () => {
    setVisible(false);
  };

  //UI
  return (
    <Modal
      onRequestClose={closeModal}
      visible={visible}
      animationType="fade"
      transparent={true}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <View style={styles.container}>
          <TouchableOpacity onPress={closeModal} style={styles.blurView} />
          <View style={styles.mainView}>
            <Text style={styles.modalTitle}>Change Password</Text>
            {otpCode ? null : (
              <TextInputArea
                placeholder="Old Password"
                placeholderTextColor={Colors.BLACK}
                TextInputBorder={true}
                value={oldPassword}
                setValue={setoldPassword}
                isSecure={true}
              />
            )}

            <TextInputArea
              myTextInputRef={newPasswordRef}
              placeholder="New Password"
              placeholderTextColor={Colors.BLACK}
              TextInputBorder={true}
              value={newPassword}
              setValue={setnewPassword}
              isSecure={true}
            />
            <TextInputArea
              myTextInputRef={confirmPasswordRef}
              placeholder="Confirm Password"
              placeholderTextColor={Colors.BLACK}
              TextInputBorder={true}
              value={confirmPassword}
              setValue={setconfirmPassword}
              isSecure={true}
            />
            <CustomLoader showLoader={showLoader} />
            <MyButton
              disabled={showLoader}
              ButtonTitle="Save"
              onPress={() => (otpCode ? changePassword() : updatePassword())}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const mapStateToProps = state => ({
  userToken: state.user.userToken,
});
export default connect(mapStateToProps, null)(React.memo(ChangePassword));
