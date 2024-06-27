//import : react components
import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
//import : react navigation
import {
  CommonActions,
  DrawerActions,
  useNavigation,
} from '@react-navigation/core';
//global
import {ScreenNames, Server} from '../../global';
//styles
import {styles} from './SimpleHeaderStyle';
//svg
import BackSvg from '../../assets/svg/arrow-left';
import NotificationSvg from '../../assets/svg/notification.svg';
import DrawerSvg from '../../assets/svg/menu.svg';
import NotiSvg from '../../assets/svg/bell.svg';
//redux
import {connect} from 'react-redux';
import * as UserAction from '../../redux/actions/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CustomAlertAction} from '../../redux/actions/actions';
import * as RNIap from 'react-native-iap';

const SimpleHeader = ({
  headerName,
  IsNotification,
  IsDrawer,
  userToken,
  dispatch,
}) => {
  //variables
  const navigation = useNavigation();
  const resetIndexGoWelcom = CommonActions.reset({
    index: 1,
    routes: [{name: ScreenNames.WELCOME}],
  });
  //states
  const [UnreadCount, setUnreadCount] = useState(0);
  //function : navigation function
  const openDrawer = () => navigation.dispatch(DrawerActions.openDrawer());
  const goBack = () =>
    navigation.canGoBack() ? navigation.goBack() : console.log("can't go back");
  const gotoNotification = () => navigation.navigate(ScreenNames.NOTIFICATION);
  //function : service function

  const changePlanInIos = async plan => {
    try {
      const data = {
        subscription_id: plan?.square_payment_subscription_id,
      };
      const {response, status} = await Server.postAPI(
        Server.CHANGE_APPLE_SUBSCRIPTION,
        data,
        userToken,
      );
      if (status) {
        const jsonValue = JSON.stringify(response.data.data);
        await AsyncStorage.setItem('userInfo', jsonValue);
        dispatch(UserAction.setUser(response.data.data));
      }
      console.log(response, status);
    } catch (error) {
      console.error('error in changePlanInIos', error);
    }
  };
  useFocusEffect(
    useCallback(() => {
      const getCount = async () => {
        console.error('==token*********', userToken);
        try {
          const {response, status} = await Server.getAPI(
            Server.CHAT_NOTIFICATION_COUNT,
            userToken,
          );
          if (status) {
             console.error(' your plan has expired plz upgra===========>>>>>>>>>>*********response.data?.is_plan_expired', response.data?.is_plan_expired);
            setUnreadCount(response.data?.notification_unread_count);
            dispatch(
              UserAction.setChatCount(response?.data?.chat_unread_count),
            );
            if (response.data?.is_plan_expired && headerName != 'Payment') {
              dispatch(
                CustomAlertAction.showToast(
                  `${response.data.is_plan_expired_msg}`,
                ),
              );
              if(headerName!='Elite Membership'){
              navigation.navigate(ScreenNames.VIEW_PLAN)
              }
               
              const jsonValue = JSON.stringify(response.data.data);
              await AsyncStorage.setItem('userInfo', jsonValue);
              dispatch(UserAction.setUser(response.data.data));
            } else if (response?.data?.status == 'N') {
              dispatch(
                CustomAlertAction.showToast(
                  `Your account is temporary inactive please contact the owner for same.`,
                ),
              );

              await AsyncStorage.clear();
              dispatch(UserAction.logOutUser());
              navigation.dispatch(resetIndexGoWelcom);
            }
          } else {
            if (response?.msg == 'User not found') {
              dispatch(
                CustomAlertAction.showToast(
                  `Your account has been deleted please contact the owner for same.`,
                ),
              );

              await AsyncStorage.clear();
              dispatch(UserAction.logOutUser());
              navigation.dispatch(resetIndexGoWelcom);
            }
            setUnreadCount(0);
          }
        } catch (error) {
          console.error('error in getCount', error);
          setUnreadCount(0);
        }
      };
      const checkExpiration = async () => {
        try {
          const {response, status} = await Server.getAPI(
            Server.GET_USER_DETAIL,
            userToken,
          );
        
          if (status) {
            const plan = response?.data?.plan;
            if (plan.name != 'Standard') {
              const receipt =
                response?.data?.plan?.square_payment_subscription_id;

              if (receipt) {
                const receiptBody = {
                  'receipt-data': receipt,
                  password: 'f5802c2403f5474a91278e6cca6b65a0', //fc0726ba1b9f4dcb9ca9bf61e9e50291   app shared secret, can be found in App Store Connect
                };
                await RNIap.validateReceiptIos(receiptBody, true).then(
                  receipt => {

                    //latest_receipt_info returns an array of objects each representing a renewal of the most
                    //recently purchased item. Kinda confusing terminology
                    const renewalHistory = receipt.latest_receipt_info;
                    console.log('====================================receipt',receipt);
                    //This returns the expiration date of the latest renewal of the latest purchase
                    const expiration = renewalHistory[0].expires_date_ms;
                    console.log(renewalHistory[0]);
                    //Boolean for whether it has expired. Can use in your app to enable/disable subscription
                    const isExpired = expiration < Date.now();
                    console.log('====================================expiration',Date.now());
                    console.log(expiration);
                    console.log('====================================',isExpired);
         
                    if (isExpired) {
                      changePlanInIos(response?.data?.plan);
                      Alert.alert(
                        'Your current subscription is expired',
                      );
                    }
                  }
                ) 
                .catch((e) => {
                  console.error(e); 
                })
                console.log(result)
              }
            }
          }
        } catch (error) {
        
        }
      };
      if (userToken == null || userToken == '') {
      } else {
        getCount();
        checkExpiration();
      }
      return () => {};
    }, [UnreadCount]),
  );
  //UI
  return (
    <View style={styles.headerView}>
      <View style={styles.headerIconStyle}>
        {IsDrawer ? (
          <TouchableOpacity onPress={() => openDrawer()}>
            <DrawerSvg />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
            onPress={() => goBack()}>
            <BackSvg />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.headerTextStyle}>{headerName}</Text>
      {IsNotification ? (
        <TouchableOpacity onPress={() => gotoNotification()}>
          {UnreadCount > 0 ? (
            <View style={styles.countViewStyle}>
              <Text style={styles.notificationCountStyle}>{UnreadCount}</Text>
            </View>
          ) : null}
          {UnreadCount > 0 ? <NotiSvg /> : <NotificationSvg />}
        </TouchableOpacity>
      ) : (
        <View style={{width: '5%'}} />
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  userToken: state.user.userToken,
});
const mapDispatchToProps = dispatch => ({dispatch});
export default connect(mapStateToProps, mapDispatchToProps)(SimpleHeader);
