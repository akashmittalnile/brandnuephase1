//import : react components
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Linking, Image,Platform} from 'react-native';
//import : custom components
import TextInputArea from 'components/TextInputArea/TextInputArea';
import SimpleHeader from 'components/SimpleHeader/SimpleHeader';
import MyButton from 'components/MyButton/MyButton';
import CustomLoader from 'components/CustomLoader/CustomLoader';
//import : third parties
import DatePicker from 'react-native-date-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
//import : utils
import {Colors, Constant, MyIcon, ScreenNames, Server} from 'global/index';
//import : styles
import {styles} from './BasicSignUpStyle';
//import : modal
import AlreadySignIn from 'modals/AlreadySignIn/AlreadySignIn';
//import : redux
import {useDispatch} from 'react-redux';
import {CustomAlertAction, UserAction} from 'reduxtoolkit/actions/actions';
import DateTimePicker from '@react-native-community/datetimepicker';

const BasicSignUp = ({navigation}) => {
  //variables
  const dispatch = useDispatch();
  //hook : states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setemail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dob, setDob] = useState('');
  const [state, setState] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  //hook : modal states
  const [showLoader, setShowLoader] = useState(false);
  const [showAlreadySignIn, setShowAlreadySignIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  //function : nav func
  const gotoMetricSignUp = data =>
    navigation.replace(ScreenNames.METRIC_SIGNUP, {data});
  //function : imp func
  const validation = () => {
    if (firstName.trim().length == 0) {
      dispatch(CustomAlertAction.showToast('Please Enter First Name'));
    } else if (lastName.trim().length == 0) {
      dispatch(CustomAlertAction.showToast('Please Enter Last Name'));
    } else if (email.trim().length == 0) {
      dispatch(CustomAlertAction.showToast('Please Enter Email'));
    } else if (!Constant.EmailReg.test(email)) {
      dispatch(CustomAlertAction.showToast('Enter valid email'));
    } else if (phoneNumber.trim().length == 0) {
      dispatch(CustomAlertAction.showToast('Please Enter Phone Number'));
    } else if (phoneNumber.trim().length < 10) {
      dispatch(CustomAlertAction.showToast('Phone number length must be 10.'));
    } else if (String(dob).trim().length == 0) {
      dispatch(CustomAlertAction.showToast('Please Select DOB'));
    } else if (String(state).trim().length == 0) {
      dispatch(CustomAlertAction.showToast('Please Enter state'));
    } else if (password.trim().length == 0) {
      dispatch(CustomAlertAction.showToast('Please Enter Password'));
    } else if (confirmPassword.trim().length == 0) {
      dispatch(CustomAlertAction.showToast('Please Enter Confirm Password'));
    } else return true;
  };
  const gotoTermOfUse = async () => {
    const termOfUseLink = `${Server.BASE_URL}api-page/terms-conditions`;
    try {
      await Linking.openURL(termOfUseLink);
    } catch (error) {
      console.log('error in gotoTermOfUse', error);
    }
  };
  //function : serv func
  const checkUser = async () => {
    if (validation()) {
      setShowLoader(true);
      try {
        const formData = new FormData();
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('password_confirmation', confirmPassword);
        formData.append('state', state);
        formData.append('phone', phoneNumber);
        formData.append('dob', moment(dob).format('l'));
        const {response, status} = await Server.postAPI(
          Server.SIGN_UP,
          formData,
        );
        if (status) {
          Toast.show('Registered Successfully.', Toast.LONG);
          gotoMetricSignUp(response.data);
        } else {
          if (response.msg == 'The email has already been taken.') {
            setShowAlreadySignIn(true);
          } else if (response.msg == 'The phone has already been taken.') {
            setShowAlreadySignIn(true);
          } else {
            dispatch(CustomAlertAction.showToast(response.msg));
          }
        }
      } catch (error) {
        console.error('error in checkUser', error);
      }
      setShowLoader(false);
    }
  };
  //UI
  return (
    <View style={styles.container}>
      <SimpleHeader />
      <KeyboardAwareScrollView>
        <View style={styles.mainView}>
          <Text style={styles.title}>Let’s Start with the Basics!</Text>
          <Text style={styles.subTitle}>Enter details to sign up</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextInputArea
              value={firstName}
              setValue={setFirstName}
              placeholder={'First name'}
              placeholderTextColor="gray"
              TextInputWidth={'48%'}
              hasViewBorder
            />
            <TextInputArea
              value={lastName}
              setValue={setLastName}
              placeholder={'Last name'}
              placeholderTextColor="gray"
              TextInputWidth={'48%'}
              hasViewBorder
            />
          </View>

          <TextInputArea
            value={email}
            setValue={setemail}
            placeholder={'Enter Email Address'}
            placeholderTextColor="gray"
            hasViewBorder
          />
          <TextInputArea
            value={phoneNumber}
            setValue={setPhoneNumber}
            placeholder={'Phone Number'}
            placeholderTextColor="gray"
            maxLength={10}
            keyboardType="number-pad"
            hasViewBorder
          />
          <TouchableOpacity
            onPress={() => setOpen(true)}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: Colors.WHITE,
              padding: 15,
              borderRadius: 10,
              marginVertical: 5,
              borderWidth: 0.5,
              borderColor: Colors.GREY,
            }}>
            <Text style={{color: Colors.GREY}}>
              {dob == '' ? 'DOB' : moment(dob).format('LL')}
            </Text>
            <Image source={require('assets/Images/Calendar.png')} />
          </TouchableOpacity>
          <TextInputArea
            placeholder={'State'}
            placeholderTextColor="gray"
            value={state}
            setValue={setState}
            hasViewBorder
          />
          <TextInputArea
            value={password}
            setValue={setPassword}
            placeholder={'Password'}
            placeholderTextColor="gray"
            hasViewBorder
          />
          <TextInputArea
            value={confirmPassword}
            setValue={setConfirmPassword}
            placeholder={'Confirm password'}
            placeholderTextColor="gray"
            hasViewBorder
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <MyIcon.AntDesign
              name="checksquare"
              size={20}
              color={Colors.ORANGE}
            />
            <Text style={{marginLeft: 10}}>Agree to </Text>
            <Text
              onPress={() => gotoTermOfUse()}
              style={{
                textDecorationLine: 'underline',
                color: Colors.LITEGREEN,
              }}>
              Terms & Conditions
            </Text>
          </View>

          <MyButton
            ButtonTitle={'Continue'}
            backgroundColor={Colors.ORANGE}
            onPress={() => checkUser()}
          />
        </View>
      </KeyboardAwareScrollView>
      {Platform.OS=='ios' ? 
      open ?
      <View>
        <View style={{flexDirection:'row',justifyContent: 'space-between',width:'70%',alignSelf: 'center',}}>
        <Text style={{color:'#000',fontWeight:'600'}} onPress={()=>{
          setOpen(false)
          setDate(new Date());
          }}>Cancle</Text>
         <Text style={{color:'#000',fontWeight:'600'}} onPress={()=>{setOpen(false)}}>Confirm</Text>

          </View>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          display="spinner"
          textColor="#000"
          onChange={
            (event, selectedDate) => {
              const currentDate = selectedDate;
              setDob(currentDate);
              setDate(currentDate);
            }
        }
          
        /> 
        </View>
       
        : 
       null
     
    :
      <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        onConfirm={date => {
          setOpen(false);
          setDate(date);
          setDob(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />}
      <AlreadySignIn
        visible={showAlreadySignIn}
        setVisibility={setShowAlreadySignIn}
      />
      <CustomLoader showLoader={showLoader} />
    </View>
  );
};

export default BasicSignUp;
