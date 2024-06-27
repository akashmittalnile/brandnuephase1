//react components
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
  Alert,
  Platform,
  ActivityIndicator,
  Linking,
} from 'react-native';
import {CommonActions} from '@react-navigation/core';
//custom components
import SimpleHeader from '../../components/SimpleHeader/SimpleHeader';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import MyButton from '../../components/MyButton/MyButton';
//third parties
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as IAP from 'react-native-iap';
//global
import {Colors, Constant, ScreenNames, Server} from '../../global';
//styles
import {styles} from './ViewPlanStyle';
//svg
import CheckSvg from '../../assets/svg/check_all.svg';
import CrownSvg from '../../assets/svg/premium-icon.svg';
//redux
import {connect} from 'react-redux';
import * as UserAction from '../../redux/actions/userActions';
import CancelSubscription from '../../components/modal/CancelSubscription/CancelSubscription';
import {CustomAlertAction} from '../../redux/actions/actions';

const ViewPlan = ({navigation, userToken, dispatch}) => {
  //data : subscription data
  const items = Platform.select({
    ios: [
      'Premium_Monthly_Plan',
      'Premium_Yearly_Plan',
      'week',
      'Elite_Monthly_Plan',
      'Elite_Yearly_Plan',
      
    ],
    android: [''],
  });
  //variables : common actions
  const resetIndexGotoBottom = CommonActions.reset({
    index: 1,
    routes: [{name: ScreenNames.BOTTOM_TAB}],
  });
  //hook : states
  const [userInfo, setUserInfo] = useState({});
  const [planType, setplanType] = useState(0);
  const [MyPlanData, setMyPlanData] = useState([]);
  const [EliteRequestStatus, setEliteRequestStatus] = useState(undefined);
  const [subscriptionData, SetSubscriptionData] = useState([]);
  const [showLoder, SetshowLoder] = useState(false);
  const [isPurchasable, setIsPurchasable] = useState(true);
  //hook : modal states
  const [showCancelSubscription, setShowCancelSubscription] = useState(false);
  const [loginTime,setloginTime]=useState('')
  //function : imp function
  const validate = async user => {
   // SetshowLoder(true);
    const purchases = await IAP.getPurchaseHistory();
    if (purchases.length > 0) {
      await IAP.validateReceiptIos({
        'receipt-data': purchases[purchases.length - 1].transactionReceipt,
        password: 'f5802c2403f5474a91278e6cca6b65a0',
      }).then(receipt => {
        //latest_receipt_info returns an array of objects each representing a renewal of the most
        //recently purchased item. Kinda confusing terminology
        const renewalHistory = receipt.latest_receipt_info;
        //This returns the expiration date of the latest renewal of the latest purchase
        const expiration =
          renewalHistory[renewalHistory.length - 1].expires_date_ms;
        console.log(renewalHistory[renewalHistory.length - 1]);
        //Boolean for whether it has expired. Can use in your app to enable/disable subscription
        const isExpired = expiration < Date.now();
        console.log('isExpiration', isExpired);
        // if (
        //   String(user?.plan?.square_payment_subscription_id).trim().length > 0
        // ) {
        //   setIsPurchasable(false);
        // } else {
        //   setIsPurchasable(isExpired);
        // }
      });
    }
    SetshowLoder(false); 
  };

  //function : service function
  const getAllMemberShipPlan = async () => {
    try {
      const resp = await Server.getApiWithToken(
        userToken,
        Server.SUBSCRIPTION_PLANS,
      );
      if (resp.data.status) {
        // console.warn("resp------>",resp.data.data);
        setMyPlanData(resp.data.data);
      }
    } catch (error) {
      console.log('error in getAllMemberShipPlan', error);
    }
  };

  const getUserDetail = async () => {
    try {
      const resp = await Server.getApiWithToken(
        userToken,
        Server.GET_USER_DETAIL,
      );
      console.info('user=======>elite_member_request_status', resp?.data);
      if (resp?.data?.status) {
        setUserInfo(resp?.data?.data);
        if (Platform.OS === 'ios') {
          validate(resp?.data?.data);
        }
      }
    } catch (error) {
      console.log('error in getUserDetail', error);
    }
  };

  const ActivateEliteMember = async () => {
    try {
      const resp = await Server.putApiWithToken(
        userToken,
        Server.ELITE_MEMBERSHIP_REQUEST,
        {},
      );
      if (resp.data.status) {
        dispatch(CustomAlertAction.showToast(resp.data.msg));
        const jsonValue = JSON.stringify(resp.data.data);
        await AsyncStorage.setItem('userInfo', jsonValue);
        dispatch(UserAction.setUser(resp.data.data));
      } else {
        dispatch(CustomAlertAction.showToast(resp.data.msg));
      }
    } catch (error) {
      console.log('error in ActivateEliteMember', error);
    }
  };

  const getEliteMemberRequestStatus = async () => {
    try {
      const resp = await Server.getApiWithToken(
        userToken,
        Server.ELITE_MEMBERSHIP_REQUEST,
      );
      setEliteRequestStatus(resp.data);
    } catch (error) {
      console.log('error in getEliteMemberRequestStatus', error);
    }
  };

  const BuyPlan = async item => {
    if (item?.name?.includes('Elite')) {
      if (userInfo?.elite_member_request == 0 && 
        typeof userInfo?.plan === 'object' && !Array.isArray(userInfo?.plan)) {
        navigation.navigate(ScreenNames.ELITE_MEMBERSHIP, {
          flag: 0,
          userInfo: userInfo,
          plan_id: item.id,
        });
      } else {
        const endPoint = `${Server.SQUARE_PAYMENT_URL}${item.id}`;
        const resp = await Server.getApi(endPoint);
        if (resp.data.status) {
          navigation.navigate(ScreenNames.PLAN_PAYMENT, {
            paymentUrl: resp.data.url,
            planId: item.id,
          });
        }
      }
    } else {
      if (item?.name?.includes('Standard')) {
        try {
          const endPoint = `${Server.SUBSCRIBE_PLAN}${item.id}`;
          const resp = await Server.postApiWithToken(userToken, endPoint, {});
          if (resp.data.status) {
            dispatch(CustomAlertAction.showToast(resp.data.msg));
            const jsonValue = JSON.stringify(resp.data.data);
            await AsyncStorage.setItem('userInfo', jsonValue);
            dispatch(UserAction.setUser(resp.data.data));
            navigation.dispatch(resetIndexGotoBottom);
          } else {
            dispatch(CustomAlertAction.showToast(resp.data.msg));
          }
        } catch (error) {
          console.log('error in freeUserSelected', error);
        }
      } else {
        const endPoint = `${Server.SQUARE_PAYMENT_URL}${item.id}`;
        const resp = await Server.getApi(endPoint);
        if (resp.data.status) {
          navigation.navigate(ScreenNames.PLAN_PAYMENT, {
            paymentUrl: resp.data.url,
            planId: item.id,
          });
        }
      }
    }
  };
  const getCount = async () => {
    console.error('==token*********', userToken);
    try {
      const {response, status} = await Server.getAPI(
        Server.CHAT_NOTIFICATION_COUNT,
        userToken,
      );
      if (status) {
         console.error(' your plan has expired plz upgra===========>>>>>>>>>>*********response.data?.is_plan_expired0000000', response.data);
         setloginTime(response.data)
       
      } else {
       
      }
    } catch (error) {
      console.error('error in getCount', error);
    
    }
  };
  const buyPlanInIos = async (item, token) => {
    const data = {
      subscription_token: token,
      device: 'Apple',
    };
    console.log('====================================userToken',userToken);
    console.log('================================token====',token);
    // console.log(item);
    const endPoint = `${Server.APPLE_PLAN}${item.id}`;
     console.log('====================================endPoint',endPoint);
    const {response, status} = await Server.postAPI(endPoint, data, userToken);
   
    console.log(response);
    console.log('====================================');
    
    if (status) {
      SetshowLoder(false);
      const jsonValue = JSON.stringify(response.data);
      await AsyncStorage.setItem('userInfo', jsonValue);
      dispatch(UserAction.setUser(response.data));
      navigation.dispatch(resetIndexGotoBottom);
    } else {
        SetshowLoder(false);
        dispatch(CustomAlertAction.showToast(response.msg));
       // Alert.alert(response.msg)
    }
  };

  const purchasePlan = async item => {
  
    SetshowLoder(true);
    if (item?.name?.includes('Standard')) {
      try {
        const endPoint = `${Server.SUBSCRIBE_PLAN}${item.id}`;
        const resp = await Server.postApiWithToken(userToken, endPoint, {});
        if (resp.data.status) {
          SetshowLoder(false);
          dispatch(CustomAlertAction.showToast(resp.data.msg));
          const jsonValue = JSON.stringify(resp.data.data);
          await AsyncStorage.setItem('userInfo', jsonValue);
          dispatch(UserAction.setUser(resp.data.data));
          navigation.dispatch(resetIndexGotoBottom);
        } else {
          SetshowLoder(false);
          dispatch(CustomAlertAction.showToast(resp.data.msg));
        }
      } catch (error) {
        SetshowLoder(false);
        console.log('error in freeUserSelected', error);
      }
    }else if (
      item?.name?.includes('Elite') &&
      userInfo.elite_member_request == 0 && !userInfo.elite_member_request_status
      //  && loginTime.is_plan_expired_msg== 'Please select a membership plan.'
      // && 
      // typeof userInfo?.plan === 'object' && !Array.isArray(userInfo?.plan)
    ) {
      navigation.navigate(ScreenNames.ELITE_MEMBERSHIP, {
        flag: 0,
        userInfo: userInfo,
        plan_id: item.id,
      });
      SetshowLoder(false);
    } 
    // else if (item?.name?.includes('Elite')) {
    //   navigation.navigate(ScreenNames.ELITE_MEMBERSHIP, {
    //     flag: 0,
    //     userInfo: userInfo,
    //     plan_id: item.id,
    //   });
    //   SetshowLoder(false);
    // }
     else {
      
      const index = subscriptionData.findIndex(e => e.title == item.name);
      console.log('====================================....',index);
      console.log(item.name);
      console.log('====================================',subscriptionData[index].productId);
      if (index > -1) {
        try {
          var data = await IAP.requestSubscription(
            subscriptionData[index].productId,
          );
          console.log('data in purchasePlan',data);
          const receipt = data.transactionReceipt;
          if (receipt) {
            buyPlanInIos(item, data.transactionReceipt);
          }
        } catch (error) {
          console.error('error in purchasePlan', error);
          SetshowLoder(false);
        }
        // }
      } else {
        dispatch(CustomAlertAction.showToast('This plan does not exist'));
        SetshowLoder(false);
      }
    }
  };
  const cancelMemberShip = async () => {
    try {
      const data = {
        subscription_id: userInfo?.plan?.square_payment_subscription_id,
      };
      const resp = await Server.postApiWithToken(
        userToken,
        Server.CANCEL_SUBSCRIPTION,
        data,
      );
      if (resp.data.status) {
        const jsonValue = JSON.stringify(resp.data.data);
        await AsyncStorage.setItem('userInfo', jsonValue);
        dispatch(UserAction.setUser(resp.data.data));
        dispatch(CustomAlertAction.showToast(resp.data.msg));
        getUserDetail();
      } else {
        dispatch(CustomAlertAction.showToast(resp.data.msg));
      }
    } catch (error) {
      console.log('error in cancelMemberShip', error);
    }
  };
  const cancelMemberShipIos = () => {
    setShowCancelSubscription(true);
    // Linking.openURL('https://apps.apple.com/account/subscriptions');
  };


  // function : render function
  const planRenderFunction = ({item, index}) => {
    return (
      <PlanCard
        key={index.toString()}
        userInfo={userInfo}
        item={item}
        index={index}
        onPress={() => {
          if (userInfo.plan.id != 1 &&  typeof userInfo?.plan === 'object' && !Array.isArray(userInfo?.plan)) {
            dispatch(
              CustomAlertAction.showToast(
                'Please cancel your previous subscription.',
              ),
            );
          } else {
            if(item.id==3 || item.id==4)
              {
                if(!userInfo.elite_request_status){
                  Platform.OS === 'android' ? BuyPlan(item) : purchasePlan(item);
                }else{
                  dispatch(
                  CustomAlertAction.showToast(
                    'You have already sent a request for Elite plan please wait for admin to respond on the same.',
                  ) );
                }
              }else{
                Platform.OS === 'android' ? BuyPlan(item) : purchasePlan(item);
              }
          }
        }}
      />
    );
  };
  //hook : useEffect
  useEffect(() => {
    console.log('====================================userToken',userToken);
    getCount()
    getAllMemberShipPlan();
    getEliteMemberRequestStatus();
    getUserDetail();
    return () => {};
  }, []);
  useEffect(() => {
    if (Platform.OS === 'ios') {
      let purchaseUpdatedListener;
      let purchaseErrorListener;
      IAP.initConnection()
        .catch(() => {
          console.error('error connecting to store..');
        })
        .then(() => {
          IAP.getSubscriptions(items)
            .catch(function (error) {
              console.error('error finding purchases', error);
            })
            .then(function (res) {
              console.log('====================================IAP.getSubscriptions(items)');
              console.log(res);
              console.log('====================================');
              SetSubscriptionData(res);
            });
        });
      purchaseErrorListener = IAP.purchaseErrorListener(error => {
        if (error['responseCode'] === '2') {
        } else {
          dispatch(
            CustomAlertAction.showToast(
              `There has been an error with your purchase ,error code = ${error['code']}`,
            ),
          );
        }
      });
      purchaseUpdatedListener = IAP.purchaseUpdatedListener(purchase => {
        try {
          const receipt = purchase.transactionReceipt;
        } catch (error) {
          console.log('error', error);
        }
      });
    }
    return () => {};
  }, []);

  //UI
  return (
    <View style={styles.container}>
      <SimpleHeader headerName={

        typeof userInfo?.plan === 'object' && !Array.isArray(userInfo?.plan)
        // userInfo?.plan?.length>0
        
        ? "My MEMBERSHIP PLAN" :"MEMBERSHIP PLAN"} />
      {
      //userInfo?.plan?.length>0 ?
      typeof userInfo?.plan === 'object' && !Array.isArray(userInfo?.plan) ?
      <View style={styles.upperView}>
        <Text style={styles.myPlanText}>My Plan</Text>
        <View style={styles.myCurrentPlan}>
          <View style={styles.flexRowStyle}>
            <View style={styles.iconTextView}>
              <View style={styles.iconView}>
                <CrownSvg />
              </View>
              <View style={styles.textView}>
                <Text style={styles.planNameText}>{userInfo?.plan?.name}</Text>
                <Text style={styles.planPriceText}>
                  {userInfo?.plan?.price}
                </Text>
              </View>
            </View>
            <View>
            </View>
          </View>
          {userInfo?.plan?.name == 'Standard' ? null : (
            <MyButton
              ButtonTitle="Cancel Membership"
              backgroundColor={Colors.RED}
              onPress={() =>
                Platform.OS === 'android'
                  ? cancelMemberShip()
                  : cancelMemberShipIos()
              }
            />
          )}
        </View>
        {EliteRequestStatus?.is_requested &&
        userInfo.elite_member_request == 0 ? (
          <View style={styles.EliteMembershipStatus}>
            <View>
              <Text style={{...styles.planNameText}}>
                Elite Membership Status
              </Text>
              <Text style={{...styles.planPriceText, fontSize: 12}}>
                {EliteRequestStatus.current_status_msg}
              </Text>
            </View>
            {EliteRequestStatus?.current_status_key ==
            EliteRequestStatus?.elite_member_activate_key ? (
              
              <Text></Text>
            ) : null}
          </View>
        ) : null}
        <Text style={styles.myPlanText}>
          Would like to change your current Plan?
        </Text>
      </View>
       :null
      }
      {MyPlanData.length > 0 ? (
        <FlatList
          data={MyPlanData}
          renderItem={planRenderFunction}
          keyExtractor={item => item.id.toString()}
        />
      ) : (
        <CustomLoader showLoader={true} />
      )}
      {showLoder ? (
        <View style={styles.loaderView}>
          <ActivityIndicator
            animating={true}
            size="large"
            color={Colors.WHITE}
          />
        </View>
      ) : null}
      <CancelSubscription
        visible={showCancelSubscription}
        setVisibility={setShowCancelSubscription}
      />
    </View>
  );
};
const mapStateToProps = state => ({
  userToken: state.user.userToken,
});
const mapDispatchToProps = dispatch => ({dispatch});
export default connect(mapStateToProps, mapDispatchToProps)(ViewPlan);

//custom components
const PlanCard = ({item, index, userInfo, onPress = () => {}}) => {
  return (
    <View key={item.id} style={styles.mainView}>
      <View style={styles.parentView}>
        <Text style={styles.planTitle}>
          {
          item.name.includes('Premium/week') ?
          'Premium/week (Weekly)'
          :
          item.name == 'Standard'
            ? item.name
            : `${item.name} (${
                item.subscription_interval == 1 ? 'Monthly' : 'Yearly'
              })`}
        </Text>
        <View style={styles.childView}>
          <View style={styles.priceView}> 
            {item.name.includes('Elite') ? (
              <>
              
                {userInfo?.elite_member_request == 1 || userInfo?.elite_member_request_status == true ? (
                  <>
                    <Text style={styles.dollarText}>$</Text>
                    <Text style={styles.priceText}>
                      {parseFloat(item.price).toFixed(2)}
                    </Text>
                  </>
                ) : (
                  <Text style={styles.priceText}>Contact us</Text>
                )}
              </>
            ) : (
              <>
                <Text style={styles.dollarText}>$</Text>
                <Text style={styles.priceText}>
                  {item.name == 'Standard'
                    ? 'Free'
                    : parseFloat(item.price).toFixed(2)}
                </Text>
              </>
            )}
          </View>
          <View style={styles.lineStyle} />
          <View style={styles.descView}>
            {item?.description?.map((e, i) => {
              return (
                <View
                  key={i.toString()}
                  style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                  <CheckSvg />
                  <Text style={styles.planDisc}>{e}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <TouchableOpacity
          onPress={onPress}
          style={{...styles.buttonView, marginTop: -20, marginHorizontal: 0}}>
          <Text style={styles.buttonText}>Select</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
