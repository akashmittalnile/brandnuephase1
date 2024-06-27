//import : react components
import React from 'react';
import {View, Text, Image} from 'react-native';
//import : custom components
import SimpleHeader from 'components/SimpleHeader/SimpleHeader';
import MyButton from 'components/MyButton/MyButton';
import SizedBox from 'components/SizedBox/SizedBox';
//import : utils
import {Colors, Fonts, ScreenNames} from 'global/index';
//import : styles
import {styles} from './SignUpSuccessStyle';

const SignUpSuccess = ({navigation}) => {
  //function : nav func
  const gotoMembershipSignUp = () =>
    navigation.navigate(ScreenNames.MEMBERSHIP_SIGNUP);
  //UI
  return (
    <View style={styles.container}>
      <SimpleHeader />
      <View style={styles.mainView}>
        <Image source={require('assets/Images/signup_success.png')} />
        <Text style={styles.title}>Congratulations!</Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: Fonts.REGULAR,
            textAlign: 'center',
          }}>
          You qualify for our{' '}
          <Text
            onPress={() => gotoMembershipSignUp()}
            style={{color: Colors.LITEGREEN, textDecorationLine: 'underline'}}>
            Elite program!
          </Text>{' '}
          Please call the office now to get started.
        </Text>
        <SizedBox height={20} />
        <MyButton
          ButtonTitle={' Call Now'}
          backgroundColor={Colors.ORANGE}
          width={'100%'}
          onPress={() => gotoMembershipSignUp()}
        />
      </View>
    </View>
  );
};

export default SignUpSuccess;
