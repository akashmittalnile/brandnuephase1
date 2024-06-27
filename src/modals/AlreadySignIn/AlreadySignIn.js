//import : react components
import React from 'react';
import {View, Text, TouchableOpacity, Modal, Image} from 'react-native';
import {useNavigation} from '@react-navigation/core';
//import : custom components
import MyButton from 'components/MyButton/MyButton';
//import : utils
import {Colors, Fonts, ScreenNames} from 'global/index';
//import : styles
import {styles} from './AlreadySignInStyle';

const AlreadySignIn = ({visible, setVisibility}) => {
  //variables
  const navigation = useNavigation();
  //function : nav func
  const gotoSignIn = () => {
    closeModal();
    navigation.navigate(ScreenNames.SIGNIN);
  };
  //function : modal func
  const closeModal = () => {
    setVisibility(false);
  };

  //UI
  return (
    <Modal
      visible={visible}
      onRequestClose={closeModal}
      animationType="fade"
      transparent>
      <View style={styles.container}>
        <View style={styles.blurView} />
        <View style={styles.mainView}>
          <Image
            source={require('assets/Images/mailplane.png')}
            style={{alignSelf: 'center'}}
          />
          <Text style={styles.title}>Uh-Oh!!! It seems</Text>
          <Text style={styles.subText}>
            This email is already registered, please go back and{' '}
            <Text
              style={{
                textDecorationLine: 'underline',
                fontFamily: Fonts.SEMI_BOLD,
                color: Colors.LITEGREEN,
              }}
              onPress={() => gotoSignIn()}>
              Sign In
            </Text>
          </Text>
          <MyButton
            ButtonTitle={'Close'}
            backgroundColor={Colors.ORANGE}
            width={'70%'}
            onPress={closeModal}
          />
        </View>
      </View>
    </Modal>
  );
};

export default AlreadySignIn;
