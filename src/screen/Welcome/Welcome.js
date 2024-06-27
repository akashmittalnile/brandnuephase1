//react components
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import {useDispatch} from 'react-redux';
//custom components
import MyButton from '../../components/MyButton/MyButton';
//global
import {Colors, ScreenNames, Server} from '../../global';
import {CustomAlertAction} from '../../redux/actions/actions';
//styles
import {styles} from './WelcomeStyle';

const Welcome = ({navigation}) => {
  const dispatch = useDispatch();
  //function : navigation function
  const gotoSignInPage = () => {
    navigation.navigate(ScreenNames.SIGNIN);
  };
  const gotoSignUpPage = () => {
    navigation.navigate(ScreenNames.SIGNUP, {flag: 0});
  };
  const gotoSingupWelcome = () => {
    navigation.navigate(ScreenNames.SIGNUP_WELCOME);
  };
  //function : imp func
  const gotoTC = async () => {
    const termOfUseLink = `${Server.BASE_URL}${Server.TERM_AND_CONDITION}`;
    try {
      const supported = await Linking.canOpenURL(termOfUseLink);
      if (supported) {
        await Linking.openURL(termOfUseLink);
      } else
        dispatch(
          CustomAlertAction.showToast(`unsupported URL: ${termOfUseLink}`),
        );
    } catch (error) {
      console.log('error in getTCLink', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainView}>
        <Image
          source={require('../../assets/Images/logo.png')}
          style={styles.logoStyle}
        />
      </View>
      <View style={styles.bottomView}>
        <MyButton ButtonTitle="Sign In" onPress={() => gotoSignInPage()} />
        <MyButton
          ButtonTitle="Sign Up"
          backgroundColor={Colors.ORANGE}
           onPress={() => gotoSignUpPage()}
          // onPress={() => gotoSingupWelcome()}
        />
        <TouchableOpacity onPress={() => gotoTC()}>
          <Text style={styles.tcTextStyles}>Terms and Conditions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Welcome;
