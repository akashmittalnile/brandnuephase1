//import : react components
import React, {useState, useRef} from 'react';
import {View, Text, TouchableOpacity, Alert, Keyboard} from 'react-native';
import {CommonActions} from '@react-navigation/core';
//import : custom components
import SimpleHeader from '../../components/SimpleHeader/SimpleHeader';
import MyButton from '../../components/MyButton/MyButton';
import TextInputArea from '../../components/TextInputArea/TextInputArea';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
//import : third parties
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import : global
import {ScreenNames, Server} from '../../global';
//import : styles
import {styles} from './SignInStyle';
//import : modal
import ForgotPassModal from '../../components/modal/ForgotPassModal/ForgotPassModal';
import VerifyCode from '../../components/modal/VerifyCode/VerifyCode';
import ChangePassword from '../../components/modal/ChangePassword/ChangePassword';
//import : redux
import * as UserAction from '../../redux/actions/userActions';
import {connect} from 'react-redux';
import {CustomAlertAction} from '../../redux/actions/actions';

const SignIn = ({navigation, dispatch}) => {
  //variables : useRef
  const emailRef = useRef([]);
  const passwordRef = useRef([]);
  //hook : states
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [otpCode, setotpCode] = useState('');
  const [showChangePassword, setshowChangePassword] = useState(false);
  const [showForgotPassModal, setShowForgotPassModal] = useState(false);
  const [showVerifyCodeModal, setshowVerifyCodeModal] = useState(false);
  const [showLoader, setshowLoader] = useState(false);
  //function :imp function
  const validation = () => {
    var EmailReg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email == '') {
      dispatch(CustomAlertAction.showToast('Enter email address'));
    } else if (!EmailReg.test(email)) {
      dispatch(CustomAlertAction.showToast('Enter valid email'));
    } else if (password == '') {
      dispatch(CustomAlertAction.showToast('Enter password'));
    } else {
      return true;
    }
  };
  //function : nav func
  const resetIndexGotoBottom = CommonActions.reset({
    index: 1,
    routes: [{name: ScreenNames.BOTTOM_TAB}],
  });
  const gotoStep1 = () => navigation.navigate(ScreenNames.BASIC_SIGNUP);
  const gotoStep2 = data =>
    navigation.navigate(ScreenNames.METRIC_SIGNUP, {data});
  const gotoStep3 = data =>
    navigation.navigate(ScreenNames.WAIST_SIGNUP, {data});
  const gotoStep4 = data =>
    navigation.navigate(ScreenNames.CURRENT_STATUS_SIGNUP, {data});
  const gotoStep5 = data =>
    navigation.navigate(ScreenNames.HEALTH_CONCERN_SIGNUP, {data});
  const gotoStep6 = data =>
    navigation.navigate(ScreenNames.CURRENT_MOTIVATION_SIGNUP, {data});
  const gotoStep7 = data => navigation.navigate(ScreenNames.PRE_DIET, {data});
  const gotoStep8 = data =>
    navigation.navigate(ScreenNames.DID_NOT_WORK, {data});
  const gotoStep9 = data =>
    navigation.navigate(ScreenNames.PERSONAL_NEED, {data});
  const gotoStep10 = data =>
    navigation.navigate(ScreenNames.METABOLISM, {data});
  const gotoStep11 = data =>
    navigation.navigate(ScreenNames.LAST_QUESTION, {data});
  //function : service function
  const SignInUser = async () => {
    if (validation()) {
      setshowLoader(true);
      const token = await messaging().getToken();
      const dataForSignIn = {
        email: email,
        password: password,
        fcm_token: token,
      };
      try {
        const {response, status} = await Server.postAPI(
          Server.LOGIN,
          dataForSignIn,
        );
        console.log(response, status);
        if (status) {
          const data = {
            user: response.data.id,
          };
          if (response.data.first_step == 0) {
            gotoStep1(data);
          } else if (response.data.second_step == 0) {
            gotoStep2(data);
          } else if (response.data.third_step == 0) {
            gotoStep3(data);
          } else if (response.data.four_step == 0) {
            gotoStep4(data);
          } else if (response.data.five_step == 0) {
            gotoStep5(data);
          } else if (response.data.six_step == 0) {
            gotoStep6(data);
          } else if (response.data.seven_step == 0) {
            gotoStep7(data);
          } else if (response.data.eight_step == 0) {
            gotoStep8(data);
          } else if (response.data.nine_step == 0) {
            gotoStep9(data);
          } else if (response.data.ten_step == 0) {
            gotoStep10(data);
          } else if (response.data.eleven_step == 0) {
            gotoStep11(data);
          } else {
            dispatch(UserAction.setUserToken(response.access_token));
            await AsyncStorage.setItem('userToken', response.access_token);
            await auth()
              .signInAnonymously()
              .then(() => {
                console.log('User signed in anonymously');
              })
              .catch(error => {
                if (error.code === 'auth/operation-not-allowed') {
                  console.log('Enable anonymous in your firebase console.');
                }
                console.error('error in signInAnonymously', error);
              });
            if (response.data.role == 'CUSTOMER') {
              if (Array.isArray(response?.data?.plan)) {
                navigation.replace(ScreenNames.MEMBERSHIP_PLAN, {
                  data: response.data,
                });
              } else {
                const jsonValue = JSON.stringify(response.data);
                await AsyncStorage.setItem('userInfo', jsonValue);
                dispatch(UserAction.setUser(response.data));
                navigation.dispatch(resetIndexGotoBottom);
              }
            } else {
              const jsonValue = JSON.stringify(response.data);
              await AsyncStorage.setItem('userInfo', jsonValue);
              dispatch(UserAction.setUser(response.data));
              navigation.replace(ScreenNames.DASHBOARD);
            }
          }
        } else {
          if (response?.token) {
            Alert.alert('', `${response.msg}`, [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'Reset', onPress: () => resetUser(response?.token)},
            ]);
          } else {
            dispatch(CustomAlertAction.showToast(response.msg));
          }
        }
      } catch (error) {
        console.log('error in SignInUser', error);
      }
      // } else {
      //   Alert.alert(
      //     'To continue, Brand NUE needs your permission to access Notifications.',
      //     'Go to Settings>> Brand Nue>> Allow Notification',
      //   );
      // }
      setshowLoader(false);
    }
  };

  const resetUser = async token => {
    try {
      const resp = await Server.getApiWithToken(token, Server.LOGOUT);
      if (resp.data.status) {
        dispatch(CustomAlertAction.showToast(resp.data.msg));
      } else {
        dispatch(CustomAlertAction.showToast(resp.data.msg));
      }
    } catch (error) {
      console.log('error in resetUser', error);
    }
  };

  //UI
  return (
    <View style={styles.container}>
      <SimpleHeader headerName="Sign In" />
      <View style={styles.mainView}>
        <TextInputArea
          textInputTitle="Email Address"
          placeholder="Email"
          placeholderTextColor="gray"
          value={email}
          required={true}
          setValue={setEmail}
          myTextInputRef={emailRef}
          onSubmitEditing={() => passwordRef.current.focus()}
          textInputBottomText="example@email.com"
          TextInputBorder={true}
          keyboardType="email-address"
        />
        <TextInputArea
          textInputTitle="Password"
          placeholder="Password"
          placeholderTextColor="gray"
          value={password}
          required={true}
          setValue={setpassword}
          myTextInputRef={passwordRef}
          onSubmitEditing={() => passwordRef.current.focus()}
          onChangeText={text => setEmail(text)}
          TextInputBorder={true}
          isSecure={true}
        />
        <MyButton
          onPress={() => {
            Keyboard.dismiss();
            SignInUser();
          }}
          ButtonTitle="Sign In"
          disabled={showLoader ? true : false}
        />
        <TouchableOpacity onPress={() => setShowForgotPassModal(true)}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <CustomLoader showLoader={showLoader} />
      <ForgotPassModal
        visible={showForgotPassModal}
        setVisibility={setShowForgotPassModal}
        setshowVerifyCodeModal={setshowVerifyCodeModal}
      />
      <VerifyCode
        visible={showVerifyCodeModal}
        setVisibility={setshowVerifyCodeModal}
        setotpCode={setotpCode}
        setshowChangePassword={setshowChangePassword}
      />
      <ChangePassword
        otpCode={otpCode}
        visible={showChangePassword}
        setVisible={setshowChangePassword}
      />
    </View>
  );
};
const mapDispatchToProps = dispatch => ({dispatch});

export default connect(null, mapDispatchToProps)(SignIn);
