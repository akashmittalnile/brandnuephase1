//react components
import React, {useState, useRef, useCallback, useEffect, Fragment} from 'react';
import {View, FlatList, Alert, Platform} from 'react-native';
import {CommonActions} from '@react-navigation/core';
//custom components
import SimpleHeader from '../../components/SimpleHeader/SimpleHeader';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
import MemberShipCard from '../../components/MemberShipCard/MemberShipCard';
//third parties
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as IAP from 'react-native-iap';
//global
import {Colors, ScreenNames, Server} from '../../global';
//styles
import {styles} from './MembershipPlanStyle';
//redux
import {connect} from 'react-redux';
import * as UserAction from '../../redux/actions/userActions';
import {CustomAlertAction} from '../../redux/actions/actions';

const MembershipPlan = ({navigation, route, userToken, dispatch}) => {
  //data : subscription data
  const items = Platform.select({
    ios: [
      'Premium_Monthly_Plan',
      'Premium_Yearly_Plan',
      'Elite_Monthly_Plan',
      'Elite_Yearly_Plan',
    ],
    android: [''],
  });
  //variables : route variables
  const data = route.params.data;
  //variables : common actions
  const resetIndexGotoBottom = CommonActions.reset({
    index: 1,
    routes: [{name: ScreenNames.BOTTOM_TAB}],
  });
  //states
  const [MemberShipData, setMemberShipData] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  //function : navigation function
  const gotoPlanPayment = (url, id) =>
    navigation.navigate(ScreenNames.PLAN_PAYMENT, {
      paymentUrl: url,
      planId: id,
    });
  const gotoEliteForm = id => {
    navigation.navigate(ScreenNames.ELITE_MEMBERSHIP, {
      flag: 1,
      data: data,
      plan_id: id,
    });
  };

  //function : service function
  const getAllMemberShipPlan = async () => {
    try {
      const resp = await Server.getApiWithToken(
        userToken,
        Server.SUBSCRIPTION_PLANS,
      );
      if (resp.data.status) {
        setMemberShipData(resp.data.data);
      }
    } catch (error) {
      console.log('error in getAllMemberShipPlan', error);
    }
  };

  const freeUserSelected = async item => {
    setShowLoader(true);
    try {
      const endPoint = `${Server.SUBSCRIBE_PLAN}${item.id}`;
      const resp = await Server.postApiWithToken(userToken, endPoint, {});
      if (resp.data.status) {
        dispatch(CustomAlertAction.showToast(resp.data.msg));
        const jsonValue = JSON.stringify(resp.data.data);
        await AsyncStorage.setItem('userInfo', jsonValue);
        dispatch(UserAction.setUser(resp.data.data));
        navigation.dispatch(resetIndexGotoBottom);
      }
    } catch (error) {
      console.log('error in freeUserSelected', error);
    }
    setShowLoader(false);
  };

  const premiumUserSelected = async item => {
    setShowLoader(true);
    try {
      const endPoint = `${Server.SQUARE_PAYMENT_URL}${item.id}`;
      const resp = await Server.getApi(endPoint);
      if (resp.data.status) {
        gotoPlanPayment(resp.data.url, item.id);
      }
    } catch (error) {
      console.log('error in premiumUserSelected', error);
    }
    setShowLoader(false);
  };

  const BuySubscription = async item => {
    if (item?.name?.includes('Standard')) {
      freeUserSelected(item);
    } else if (item?.name?.includes('Premium')) {
      if (Platform.OS === 'android') {
        premiumUserSelected(item);
      } else {
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
                console.log('got product', res);
                setShowLoader(false);
                purchasePlanInIos(res, item);
                // SetSubscriptionData(res);
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
    } else if (item?.name?.includes('Elite')) {
      gotoEliteForm(item.id);
    }
  };
  const purchasePlanInIos = async (data, item) => {
    setShowLoader(true);
    const index = data.findIndex(e => e.title == item.name);
    if (index > -1) {
      try {
        var data = await IAP.requestSubscription(data[index].productId);
        if (data.transactionReceipt) {
          setShowLoader(false);
          console.log('recipt', data.transactionReceipt);
          buyPlanInIos(item, data.transactionReceipt);
        }
      } catch (error) {
        setShowLoader(false);
        console.error('error in purchasePlan', error);
        // SetshowLoder(false);
      }
    } else {
      dispatch(CustomAlertAction.showToast('This plan does not exist'));
      setShowLoader(false);
    }
  };
  const buyPlanInIos = async (item, token) => {
    setShowLoader(true);
    try {
      const data = {
        subscription_token: token,
        device: 'Apple',
      };
      const endPoint = `${Server.APPLE_PLAN}${item.id}`;
      const resp = await Server.postApiWithToken(userToken, endPoint, data);
      if (resp?.data?.status) {
        const jsonValue = JSON.stringify(resp.data.data);
        await AsyncStorage.setItem('userInfo', jsonValue);
        dispatch(UserAction.setUser(resp.data.data));
        navigation.dispatch(resetIndexGotoBottom);
      } else {
        // dispatch(CustomAlertAction.showToast(resp.data.msg));
      }
    } catch (error) {
      console.log('error in buyPlanInIos', error);
    }
    setShowLoader(false);
  };
  //function : render function
  const slidableRenderFunction = ({item, index}) => (
    <MemberShipCard
      key={index}
      item={item}
      index={item.id}
      onPress={() => BuySubscription(item)}
    />
  );
  //useEffect
  useEffect(() => {
    getAllMemberShipPlan();
    return () => {};
  }, [userToken]);
  //UI
  if (showLoader) {
    return <CustomLoader showLoader={true} />;
  } else {
    return (
      <View style={styles.container}>
        <SimpleHeader headerName="MEMBERSHIP PLAN" />
        <FlatList
          data={MemberShipData}
          renderItem={slidableRenderFunction}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 20}}
        />
      </View>
    );
  }
};

const mapStateToProps = state => ({
  userToken: state.user.userToken,
});
const mapDispatchToProps = dispatch => ({
  dispatch,
});
export default connect(mapStateToProps, mapDispatchToProps)(MembershipPlan);
