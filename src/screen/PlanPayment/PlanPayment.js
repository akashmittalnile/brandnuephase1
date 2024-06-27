//react components
import React, {useState} from 'react';
import {View, Alert} from 'react-native';
import {CommonActions} from '@react-navigation/core';
//custom components
import SimpleHeader from '../../components/SimpleHeader/SimpleHeader';
import MyButton from '../../components/MyButton/MyButton';
//third parties
import {WebView} from 'react-native-webview';
//global
import {Constant, ScreenNames, Server} from '../../global';
//styles
import {styles} from './PlanPaymentStyle';
//svg
import CrownSvg from '../../assets/svg/membership.svg';
import CardSvg from '../../assets/svg/credit_card.svg';
//modal
import PaymentSuccess from '../../components/modal/PaymentSuccess/PaymentSuccess';
//redux
import {connect} from 'react-redux';
import * as UserAction from '../../redux/actions/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CustomAlertAction} from '../../redux/actions/actions';

const PlanPayment = ({route, userToken, dispatch, navigation}) => {
  //variables
  const PaymentUrl = route.params.paymentUrl;
  console.log(PaymentUrl);
  const planId = route.params.planId;
  const resetIndexGotoBottom = CommonActions.reset({
    index: 1,
    routes: [{name: ScreenNames.BOTTOM_TAB}],
  });
  //states
  const [showPaymentSuccess, setshowPaymentSuccess] = useState(false);
  //   const [showLoader, setshowLoader] = useState(false);
  //function : navigation function
  const goToBottomTab = () => navigation.navigate(ScreenNames.BOTTOM_TAB);
  //function : service function
  const confirmPayment = () => {
    setshowPaymentSuccess(true);
  };
  const onNavigationStateChange = webViewState => {};
  const debugging = `
  const consoleLog = (type, log) => window.ReactNativeWebView.postMessage(JSON.stringify({'type': 'Console', 'data': {'type': type, 'log': log}}));
  console = {
      log: (log) => consoleLog('log', log),
      debug: (log) => consoleLog('debug', log),
      info: (log) => consoleLog('info', log),
      warn: (log) => consoleLog('warn', log),
      error: (log) => consoleLog('error', log),
    };
`;

  const onMessage = async payload => {
    let dataPayload;
    try {
      dataPayload = JSON.parse(payload.nativeEvent.data);
    } catch (e) {}
    if (dataPayload) {
      if (dataPayload?.type === 'Console') {
        console.info(`[Console] ${JSON.stringify(dataPayload.data)}`);
        try {
          const data = new FormData();
          data.append('payment_token', dataPayload.data.log);
          console.log(userToken);
          const endPoint = `${Server.SUBSCRIBE_PLAN}${planId}`;
          const {response, status} = await Server.postPayAPI(
            endPoint,
            data,
            userToken,
          );
          console.log('API RESPONSE', response);
          if (status) {
            dispatch(CustomAlertAction.showToast(response.msg));
            const jsonValue = JSON.stringify(response.data);
            await AsyncStorage.setItem('userInfo', jsonValue);
            dispatch(UserAction.setUser(response.data));
            navigation.dispatch(resetIndexGotoBottom);
          } else {
            dispatch(CustomAlertAction.showToast(response?.msg));
          }
        } catch (error) {
          console.log('error in payment', error);
        }
      } else {
        console.log(dataPayload);
      }
    }
  };
  //UI
  return (
    <View style={styles.container}>
      <SimpleHeader headerName="Payment" />
      {/* <View style={styles.mainView}> */}
      <WebView
        // source={{uri:`https://www.youtube.com/`}}
        source={{uri: `${PaymentUrl}`}}
        javaScriptEnabled={true}
        onNavigationStateChange={onNavigationStateChange}
        injectedJavaScript={debugging}
        onMessage={onMessage}
      />
      <PaymentSuccess
        visible={showPaymentSuccess}
        setVisibility={setshowPaymentSuccess}
      />
    </View>
  );
};

const mapStateToProps = state => ({
  userToken: state.user.userToken,
});
const mapDispatchToProps = dispatch => ({dispatch});
export default connect(mapStateToProps, mapDispatchToProps)(PlanPayment);
