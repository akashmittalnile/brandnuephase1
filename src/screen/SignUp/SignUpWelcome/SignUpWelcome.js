//import : react components
import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
//import : styles
import {styles} from './SignUpWelcomeStyle';
import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';
import SizedBox from '../../../components/SizedBox/SizedBox';
import MyButton from '../../../components/MyButton/MyButton';
import {Colors, ScreenNames} from '../../../global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {CustomAlertAction, UserAction} from '../../../redux/actions/actions';

const SignUpWelcome = ({navigation}) => {
  //variables : redux
  const dispatch = useDispatch();
  //function : nav func
  const gotoBasicSignUp = () => navigation.navigate(ScreenNames.BASIC_SIGNUP);
  const gotoStep2 = () => navigation.navigate(ScreenNames.METRIC_SIGNUP);
  const gotoStep3 = () => navigation.navigate(ScreenNames.WAIST_SIGNUP);
  const gotoStep4 = () =>
    navigation.navigate(ScreenNames.CURRENT_STATUS_SIGNUP);
  const gotoStep5 = () =>
    navigation.navigate(ScreenNames.HEALTH_CONCERN_SIGNUP);
  const gotoMemberShipSignUp = () =>
    navigation.navigate(ScreenNames.CHOOSE_PLAN);
  //function : imp func
  const checkPreSignUp = async () => {
    const signUpUser = await AsyncStorage.getItem('signUpUser');
    const step = await AsyncStorage.getItem('step');
    console.log(step);
    const userData = JSON.parse(signUpUser);
    if (userData) {
      dispatch(UserAction.setSignupUser(userData));
      dispatch(
        CustomAlertAction.showToast('You already have previously sign up data'),
      );
      if (step == '1') {
        gotoStep2();
      } else if (step == '2') {
        gotoStep3();
      } else if (step == '3') {
        gotoStep4();
      } else if (step == '4') {
        gotoStep5();
      }
    } else {
      gotoBasicSignUp();
    }
  };
  //hook : useEffect
  useEffect(() => {
    return () => {};
  }, []);

  //ui
  return (
    <View style={styles.container}>
      <SimpleHeader headerName={'Sign Up'} />
      <View style={styles.mainView}>
        <Image source={require('../../../assets/Images/signup_welcome.png')} />
        <SizedBox height={50} />
        <Text style={styles.title}>Let’s get started</Text>
        <Text style={styles.subTitle}>
          We need some information to determine your eligibility
        </Text>
        <SizedBox height={50} />
        <MyButton
          ButtonTitle={'Begin 03:00 min questionnaire'}
          backgroundColor={Colors.ORANGE}
          width={'100%'}
          onPress={() => {
            checkPreSignUp();
          }}
        />
      </View>
    </View>
  );
};

export default SignUpWelcome;
