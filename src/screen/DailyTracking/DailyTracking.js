//react components
import React from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
//custom components
import Simpleheader from '../../components/SimpleHeader/SimpleHeader';
//globals
import {Colors, ScreenNames} from '../../global';
//styles
import {styles} from './DailyTrackingStyle';

const DailyTracking = ({navigation}) => {
  //function : navigation function
  const viewDailyTracking = () =>
    navigation.navigate(ScreenNames.TRACKER_REPORT);
  //UI
  return (
    <View style={styles.container}>
      <Simpleheader
        headerName="Daily Tracking"
        IsDrawer={true}
        IsNotification={true}
      />
      <View style={styles.mainView}>
        <Image
          resizeMode="contain"
          source={require('../../assets/Images/tracking-infographic.png')}
          style={styles.imageStyle}
        />
        <Text style={styles.dailyTrackingText}>Daily Tracking</Text>
        <View style={{height: 20}} />
        <TouchableOpacity
          onPress={viewDailyTracking}
          style={styles.ButtonStyle}>
          <Text style={styles.buttonText}>Submit Daily Tracking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DailyTracking;
