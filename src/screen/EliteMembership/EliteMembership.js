//react components
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
//custom components
import SimpleHeader from '../../components/SimpleHeader/SimpleHeader';
import ItemHeadar from '../../components/ItemHeader/ItemHeader';
import TextInputArea from '../../components/TextInputArea/TextInputArea';
import MyButton from '../../components/MyButton/MyButton';
//third parties
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
//styles
import {styles} from './EliteMembershipStyle';
//global
import {ScreenNames, Server} from '../../global';
//svg
import DropDownSvg from '../../assets/svg/dropdown-arrow.svg';
//redux
import {connect} from 'react-redux';
import * as UserAction from '../../redux/actions/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/core';
import {CustomAlertAction} from '../../redux/actions/actions';

const EliteMembership = ({navigation, userToken, route, dispatch}) => {
  //variables : route variables
  const data =
    route.params.flag == 0 ? route?.params?.userInfo : route.params.data;
  //variables : common actions
  const resetIndexGotoBottom = CommonActions.reset({
    index: 1,
    routes: [{name: ScreenNames.BOTTOM_TAB}],
  });

  //useRef
  const NameRef = useRef();
  const PhoneNumberRef = useRef();
  const EmailRef = useRef();
  const StateRef = useRef();
  const CityRef = useRef();
  const MessageRef = useRef();

  //states
  const [Name, setName] = useState(data.name);
  const [PhoneNumber, setPhoneNumber] = useState(data.phone);
  const [Email, setEmail] = useState(data.email);
  const [State, setState] = useState('');
  const [City, setCity] = useState('');
  const [Message, setMessage] = useState('');
  const [showLoader, setshowLoader] = useState(false);

  useEffect(() => {}, []);

  //function : imp function
  const clearState = () => {
    setName('');
    setPhoneNumber('');
    setEmail('');
    setState('');
    setCity('');
    setMessage('');
  };
  const Validation = () => {
    var EmailReg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var nameReg = /[^a-zA-Z- ]/g;
    var phoneNumberReg = /[^0-9]/g;
    if (Name == '') {
      dispatch(CustomAlertAction.showToast("Name can't be empty"));
    } else if (nameReg.test(Name)) {
      dispatch(CustomAlertAction.showToast('Enter valid name'));
    } else if (PhoneNumber == '') {
      dispatch(CustomAlertAction.showToast("Phone number can't be empty"));
    } else if (phoneNumberReg.test(PhoneNumber)) {
      dispatch(CustomAlertAction.showToast('Enter valid phone number'));
    } else if (Email == '') {
      dispatch(CustomAlertAction.showToast("Email address can't be empty"));
    } else if (!EmailReg.test(Email)) {
      dispatch(CustomAlertAction.showToast('Enter valid email address'));
    } else if (State == '') {
      dispatch(CustomAlertAction.showToast("State can't be empty"));
    } else if (City == '') {
      dispatch(CustomAlertAction.showToast("City can't be empty"));
    } else if (Message == '') {
      dispatch(CustomAlertAction.showToast("Message can't be empty"));
    } else return true;
  };

  //function : service function
  const submitEliteMember = async () => {
    console.log(' submitEliteMember');
    if (Validation()) {
      console.log(' submitEliteMember');
      try {
        setshowLoader(true);
        const data = {
          name: Name,
          email: Email,
          phone: PhoneNumber,
          state: State,
          city: City,
          message: Message,
          plan_id: route.params.plan_id,
        };
        const resp = await Server.postApiWithToken(
          userToken,
          Server.ELITE_MEMBERSHIP_REQUEST,
          data,
        );
        console.log(' submitEliteMember',resp.data);
        if (resp.data.status) {
          dispatch(CustomAlertAction.showToast(resp.data.msg));
          const jsonValue = JSON.stringify(resp.data.data);
          await AsyncStorage.setItem('userInfo', jsonValue);
          dispatch(UserAction.setUser(resp.data.data));
          clearState();
          navigation.dispatch(resetIndexGotoBottom);
          setshowLoader(false);
        } else {
          Alert.alert(resp.data.msg)
          // dispatch(CustomAlertAction.showToast(resp.data.msg));
          setshowLoader(false);
        }
      } catch (error) {
        console.error('error in submitEliteMember', error?.response?.data);
        setshowLoader(false);
      }
    }
  };

  //UI
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.container}>
        <SimpleHeader headerName="Elite Membership" />
        <KeyboardAwareScrollView>
          <View style={styles.mainView}>
            <View style={styles.registrationCard}>
              <ItemHeadar HeaderTitle="Please fill the form" />
              <View style={styles.registrationBody}>
                <TextInputArea
                  myTextInputRef={NameRef}
                  value={Name}
                  setValue={setName}
                  placeholder="Name"
                  placeholderTextColor="gray"
                  TextInputBorder={true}
                  onSubmitEditing={() => PhoneNumberRef.current.focus()}
                />
                <TextInputArea
                  myTextInputRef={PhoneNumberRef}
                  value={PhoneNumber}
                  setValue={setPhoneNumber}
                  placeholder="Phone Number"
                  placeholderTextColor="gray"
                  TextInputBorder={true}
                  keyboardType="number-pad"
                  maxLength={10}
                  onSubmitEditing={() => EmailRef.current.focus()}
                />
                <TextInputArea
                  myTextInputRef={EmailRef}
                  value={Email}
                  setValue={setEmail}
                  placeholder="Email Address"
                  placeholderTextColor="gray"
                  TextInputBorder={true}
                  onSubmitEditing={() => StateRef.current.focus()}
                />

                {/* <TouchableOpacity
                            style={styles.DropDownView}>
                            <Text style={styles.dropDownText}>Select State</Text>
                            <DropDownSvg />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.DropDownView}>
                            <Text style={styles.dropDownText}>Select City</Text>
                            <DropDownSvg />
                        </TouchableOpacity> */}
                <TextInputArea
                  myTextInputRef={StateRef}
                  value={State}
                  setValue={setState}
                  placeholder="Enter State"
                  placeholderTextColor="gray"
                  TextInputBorder={true}
                  onSubmitEditing={() => CityRef.current.focus()}
                />
                <TextInputArea
                  myTextInputRef={CityRef}
                  value={City}
                  setValue={setCity}
                  placeholder="Enter City"
                  placeholderTextColor="gray"
                  TextInputBorder={true}
                  onSubmitEditing={() => MessageRef.current.focus()}
                />
                <TextInputArea
                  myTextInputRef={MessageRef}
                  value={Message}
                  setValue={setMessage}
                  placeholder="Write Message"
                  placeholderTextColor="gray"
                  TextInputBorder={true}
                  numberOfLines={5}
                  multiline={true}
                  textInputHeight={100}
                  onSubmitEditing={() => MessageRef.current.focus()}
                />
              </View>
            </View>
            {showLoader ? (
              <ActivityIndicator
                animating={showLoader}
                size="large"
                color="#f39322"
              />
            ) : null}

            <View style={styles.buttonView}>
              <MyButton
                onPress={() => submitEliteMember()}
                ButtonTitle="Submit"
                disabled={showLoader}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = state => ({
  userToken: state.user.userToken,
});

const mapDispatchToProps = dispatch => ({dispatch});
export default connect(mapStateToProps, mapDispatchToProps)(EliteMembership);
