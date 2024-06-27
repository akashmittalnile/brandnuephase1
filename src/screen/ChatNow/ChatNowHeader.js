//react components
import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/core';
// globals
import {Colors, Fonts} from '../../global';
//svg
import BackSvg from '../../assets/svg/arrow-left';

const ChatNowHeader = ({headerName}) => {
  //States
  const navigation = useNavigation();
  //function : navigation function
  const goBack = () => navigation.goBack();

  //UI
  return (
    <View style={styles.headerView}>
      <View style={styles.headerIconStyle}>
        <TouchableOpacity onPress={() => goBack()}>
          <BackSvg />
        </TouchableOpacity>
      </View>
      <Image
        source={require('../../assets/Images/logo.png')}
        style={styles.ImageStyle}
      />
      <Text style={styles.headerTextStyle}>{headerName}</Text>
    </View>
  );
};
export default ChatNowHeader;

const styles = StyleSheet.create({
  headerView: {
    height: 50,
    elevation: 20,
    backgroundColor: Colors.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerTextStyle: {
    fontSize: 16,
    fontFamily: Fonts.SEMI_BOLD,
    textAlign: 'center',
  },
  ImageStyle: {
    width: 30,
    height: 30,
    borderWidth: 1.5,
    resizeMode: 'cover',
    borderColor: Colors.GREY,
    borderRadius: 100,
    marginHorizontal: 10,
  },
});
