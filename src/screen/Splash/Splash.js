//react components
import React, {useEffect} from 'react';
import {View, Image} from 'react-native';
//styles
import {styles} from './SplashStyle';
//async storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScreenNames} from '../../global';
//redux
import * as UserAction from '../../redux/actions/userActions';
import {useDispatch} from 'react-redux';

const Splash = ({navigation}) => {
  const dispatch = useDispatch();
  //states
  //function : imp function
  const CheckFunction = async () => {
    const userInfo = await AsyncStorage.getItem('userInfo');
    const userToken = await AsyncStorage.getItem('userToken');
    const userData = JSON.parse(userInfo);
    if (userData) {
      dispatch(UserAction.setUser(userData));
      dispatch(UserAction.setUserToken(userToken));
      {
        userData.role == 'ADMIN'
          ? navigation.replace(ScreenNames.DASHBOARD)
          : navigation.replace(ScreenNames.BOTTOM_TAB);
      }
    } else {
      navigation.replace(ScreenNames.WELCOME);
    }
  };
  //useEffect
  useEffect(() => {
    setTimeout(() => {
      CheckFunction();
    }, 1000);
    return () => {};
  }, []);
  //UI
  return (
    <View style={styles.container}>
      <View style={styles.FirstBorder}>
        <View style={styles.secondBorder}>
          <View style={styles.thirdBorder}>
            <Image
              source={require('../../assets/Images/logo.png')}
              style={styles.logoStyle}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Splash;
