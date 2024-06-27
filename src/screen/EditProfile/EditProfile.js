//import : react components
import React, {useRef, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  Platform,
  FlatList,
  Keyboard,
} from 'react-native';
//custom components
import SimpleHeader from '../../components/SimpleHeader/SimpleHeader';
import TextInputArea from '../../components/TextInputArea/TextInputArea';
import MyButton from '../../components/MyButton/MyButton';
import GenderWithIcon from '../../components/GenderWithIcon/GenderWithIcon';
import CustomLoader from '../../components/CustomLoader/CustomLoader';
//third parties
import ImagePicker from 'react-native-image-crop-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {PERMISSIONS, check, RESULTS, request} from 'react-native-permissions';
//modal
import HowToMeasure from '../../components/modal/HowToMeasure/HowToMeasure';
//styles
import {styles} from './EditProfileStyle';
//global
import {ScreenNames, Server} from '../../global';
//async storage
import AsyncStorage from '@react-native-async-storage/async-storage';
//svg
import MaleSvg from '../../assets/svg/male.svg';
import FemaleSvg from '../../assets/svg/female.svg';
import CloudUploadSvg from '../../assets/svg/cloud-upload.svg';
//redux
import * as UserAction from '../../redux/actions/userActions';
import {connect} from 'react-redux';
import moment from 'moment';
import {CustomAlertAction} from '../../redux/actions/actions';

const EditProfile = ({route, navigation, userToken, dispatch}) => {
  const userInfo = route.params.userInfo;
  console.warn(userInfo);
  //DATA
  const genderData = [
    {
      id: 1,
      name: 'Male',
      svg: <MaleSvg />,
    },
    {
      id: 2,
      name: 'Female',
      svg: <FemaleSvg />,
    },
  ];
  //useRef
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const phoneNumberRef = useRef();
  const birthDateRef = useRef();
  const birthMonthRef = useRef();
  const birthYearRef = useRef();
  const heightFeetRef = useRef();
  const heightInchRef = useRef();
  const waistMeasurementRef = useRef();
  const currentWeightRef = useRef();
  const goalWeightRef = useRef();
  const currentWaistMeasurementRef = useRef();
  const goalWaistMeasurementRef = useRef();
  const startWeightRef = useRef();

  //states
  const [showLoader, setshowLoader] = useState(false);
  const [firstName, setfirstName] = useState(userInfo?.first_name);
  const [lastName, setlastName] = useState(userInfo?.last_name);
  const [email, setemail] = useState(userInfo?.email);
  const [phoneNumber, setphoneNumber] = useState(userInfo?.phone);
  const [birthDate, setbirthDate] = useState(moment(userInfo.dob).format('DD'));
  const [birthMonth, setbirthMonth] = useState(
    moment(userInfo.dob).format('MM'),
  );
  const [birthYear, setbirthYear] = useState(
    moment(userInfo.dob).format('YYYY'),
  );
  const [heightInFeet, setheightInFeet] = useState(userInfo?.height_feet);
  const [heightInInches, setheightInInches] = useState(userInfo?.height_inch);
  const [waistMeasurement, setwaistMeasurement] = useState(
    userInfo?.waist_measurement,
  );
  const [currentWeight, setcurrentWeight] = useState(
    userInfo?.today_current_weight,
  );
  const [goalWeight, setgoalWeight] = useState(userInfo?.goal_weight);
  const [selectedIndex, setSelectedIndex] = useState(
    userInfo?.gender == 'Male' ? 0 : 1,
  );
  const [howToMeasureModal, sethowToMeasureModal] = useState(false);
  const [Image, setImage] = useState();
  const [currentWaistMeasurement, setcurrentWaistMeasurement] = useState(
    userInfo.today_waist_measurement,
  );
  const [goalWaistMeasurement, setgoalWaistMeasurement] = useState(
    userInfo.goal_waist_measurement,
  );
  const [startWeight, setstartWeight] = useState(userInfo?.current_weight);
  //function : imp function
  const CheckGalleryPermission = async () => {
    if (Platform.OS === 'android') {
      openLibrary();
    } else {
      const res = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
      if (res === RESULTS.GRANTED) {
        openLibrary();
      } else if (res === RESULTS.DENIED) {
        const res2 = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
        res2 === RESULTS.GRANTED ? openLibrary() : CheckGalleryPermission();
      } else if (res === RESULTS.BLOCKED) {
        dispatch(
          CustomAlertAction.showToast(
            'To continue, Brand NUE needs your permission to access Photos.\nGo to Settings>> Brand Nue>>Photos.',
          ),
        );
      }
    }
  };
  const openLibrary = async () => {
    try {
      let value = await ImagePicker.openPicker({
        width: 1080,
        height: 1080,
        cropping: true,
        mediaType: 'photo',
        compressImageQuality: 1,
        compressImageMaxHeight: 1080 / 2,
        compressImageMaxWidth: 1080 / 2,
      }).then(image => {
        setImage(image);
      });
    } catch (error) {
      console.log('error in openLibrary', error);
    }
  };
  const Validation = () => {
    var EmailReg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var nameReg = /[^a-zA-Z- ]/g;
    var OneDecimalPoint = /^(\d*)\.{0,1}(\d){0,1}$/;
    if (firstName != '') {
      if (!nameReg.test(firstName)) {
        if (lastName != '') {
          if (!nameReg.test(lastName)) {
            if (email != '') {
              if (EmailReg.test(email)) {
                if (phoneNumber != '') {
                  if (phoneNumber.trim().length >= 10) {
                    if (
                      birthDate != '' &&
                      birthMonth != '' &&
                      birthYear != ''
                    ) {
                      if (OneDecimalPoint.test(currentWeight)) {
                        if (OneDecimalPoint.test(startWeight)) {
                          if (OneDecimalPoint.test(goalWeight)) {
                            if (heightInFeet != '') {
                              if (heightInInches != '') {
                                return true;
                              } else
                                dispatch(
                                  CustomAlertAction.showToast(
                                    'Enter Height(inches)',
                                  ),
                                );
                            } else
                              dispatch(
                                CustomAlertAction.showToast(
                                  'Enter Height(feet)',
                                ),
                              );
                          } else
                            dispatch(
                              CustomAlertAction.showToast(
                                'Enter valid goal weight',
                              ),
                            );
                        } else
                          dispatch(
                            CustomAlertAction.showToast(
                              'Enter valid start weight',
                            ),
                          );
                      } else
                        dispatch(
                          CustomAlertAction.showToast(
                            'Enter valid current weight',
                          ),
                        );
                    } else
                      dispatch(
                        CustomAlertAction.showToast('Enter date of birth'),
                      );
                  } else
                    dispatch(
                      CustomAlertAction.showToast(
                        'contact number length must be 10',
                      ),
                    );
                } else
                  dispatch(CustomAlertAction.showToast('Enter contact number'));
              } else
                dispatch(
                  CustomAlertAction.showToast('Enter valid email address'),
                );
            } else dispatch(CustomAlertAction.showToast('Enter email address'));
          } else dispatch(CustomAlertAction.showToast('Enter valid last name'));
        } else dispatch(CustomAlertAction.showToast('Enter last name'));
      } else dispatch(CustomAlertAction.showToast('Enter valid first name'));
    } else dispatch(CustomAlertAction.showToast('Enter first name'));
  };
  //function : service function
  const EditUser = async () => {
    if (Validation()) {
      const formData = new FormData();
      if (Image) {
        const imageName = Image.path.slice(
          Image.path.lastIndexOf('/'),
          Image.path.length,
        );
        formData.append('profile_image', {
          name: imageName,
          type: Image.mime,
          uri: Image.path,
        });
      }
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('email', email);
      formData.append('phone', phoneNumber);
      formData.append('gender', genderData[selectedIndex].name);
      formData.append('dob', `${birthMonth}/${birthDate}/${birthYear}`);
      formData.append('height_feet', heightInFeet);
      formData.append('height_inch', heightInInches);
      formData.append('waist_measurement', waistMeasurement);
      formData.append('today_waist_measurement', currentWaistMeasurement);
      formData.append('goal_waist_measurement', goalWaistMeasurement);
      formData.append('start_weight', startWeight);
      formData.append('current_weight', currentWeight);
      formData.append('goal_weight', goalWeight);
      try {
        setshowLoader(true);
        const resp = await Server.postApiWithToken(
          userToken,
          Server.UPDATE_PROFILE,
          formData,
        );
        if (resp.data.status) {
          const jsonValue = JSON.stringify(resp.data.data);
          await AsyncStorage.setItem('userInfo', jsonValue);
          dispatch(
            CustomAlertAction.showToast(
              'Profile has been updated successfully',
            ),
          );
          dispatch(UserAction.setUser(resp.data.data));
          setshowLoader(false);
          navigation.navigate(ScreenNames.MY_PROFILE);
        } else {
          dispatch(CustomAlertAction.showToast(resp.data.msg));
          setshowLoader(false);
        }
      } catch (error) {
        dispatch(CustomAlertAction.showToast(error.response.data));
        console.log('error in EditUser', error.response.data);
      }
    }
  };
  //function : render function
  const genderRenderFuncion = ({item, index}) => (
    <GenderWithIcon
      key={item.id}
      item={item}
      index={index}
      selectedIndex={selectedIndex}
      setSelectedIndex={setSelectedIndex}
    />
  );

  //UI
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.container}>
        <SimpleHeader headerName={'Edit Profile'} />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={styles.mainView}>
          <TextInputArea
            textInputTitle="First Name"
            placeholderTextColor="gray"
            value={firstName}
            setValue={setfirstName}
            required={true}
            myTextInputRef={firstNameRef}
            onSubmitEditing={() => lastNameRef.current.focus()}
            placeholder={'First Name'}
          />
          <TextInputArea
            textInputTitle="Last Name"
            value={lastName}
            setValue={setlastName}
            required={true}
            myTextInputRef={lastNameRef}
            onSubmitEditing={() => emailRef.current.focus()}
            placeholder={'Last Name'}
            placeholderTextColor="gray"
          />
          <TextInputArea
            textInputTitle="Email Address"
            value={email}
            setValue={setemail}
            required={true}
            keyboardType="email-address"
            myTextInputRef={emailRef}
            onSubmitEditing={() => phoneNumberRef.current.focus()}
            placeholder={'Email Address'}
            placeholderTextColor="gray"
          />
          <TextInputArea
            textInputTitle="Contact Number"
            required={true}
            value={phoneNumber}
            setValue={setphoneNumber}
            myTextInputRef={phoneNumberRef}
            onSubmitEditing={() => Keyboard.dismiss()}
            keyboardType="phone-pad"
            maxLength={10}
            placeholder={'Contact Number'}
            placeholderTextColor="gray"
          />

          <View style={styles.GenderView}>
            <Text style={styles.textStyle}>Gender</Text>
            <FlatList
              horizontal={true}
              data={genderData}
              renderItem={genderRenderFuncion}
              keyExtractor={item => item.id}
            />
          </View>

          <Text style={styles.textStyle}>Date of Birth *</Text>
          <View style={styles.primaryView}>
            <TextInputArea
              myTextInputRef={birthMonthRef}
              onSubmitEditing={() => birthDateRef.current.focus()}
              placeholder="Month"
              placeholderTextColor="gray"
              TextInputWidth="28%"
              value={birthMonth}
              setValue={setbirthMonth}
              keyboardType="number-pad"
              maxLength={2}
            />
            <TextInputArea
              myTextInputRef={birthDateRef}
              onSubmitEditing={() => birthYearRef.current.focus()}
              placeholder="Day"
              placeholderTextColor="gray"
              TextInputWidth="28%"
              value={birthDate}
              setValue={setbirthDate}
              keyboardType="number-pad"
              maxLength={2}
            />
            <TextInputArea
              myTextInputRef={birthYearRef}
              onSubmitEditing={() => heightFeetRef.current.focus()}
              placeholder="Year"
              placeholderTextColor="gray"
              TextInputWidth="28%"
              value={birthYear}
              setValue={setbirthYear}
              keyboardType="number-pad"
              maxLength={4}
            />
          </View>
          <Text style={styles.textStyle}>Height *</Text>
          <View style={styles.primaryView}>
            <TextInputArea
              myTextInputRef={heightFeetRef}
              onSubmitEditing={() => heightInchRef.current.focus()}
              placeholder="0 Feet"
              placeholderTextColor="gray"
              TextInputWidth="46%"
              value={heightInFeet}
              setValue={setheightInFeet}
              keyboardType="number-pad"
              maxLength={2}
            />
            <TextInputArea
              myTextInputRef={heightInchRef}
              onSubmitEditing={() => waistMeasurementRef.current.focus()}
              placeholder="0 Inches"
              placeholderTextColor="gray"
              TextInputWidth="46%"
              value={heightInInches}
              setValue={setheightInInches}
              keyboardType="number-pad"
              maxLength={2}
            />
          </View>
          <TextInputArea
            myTextInputRef={waistMeasurementRef}
            onSubmitEditing={() => currentWeightRef.current.focus()}
            textInputTitle={'Start Waist Measurement'}
            placeholder={'0.00'}
            required={true}
            keyboardType="numeric"
            placeholderTextColor="gray"
            value={waistMeasurement}
            setValue={setwaistMeasurement}
          />
          <TextInputArea
            textInputTitle="Current Waist Measurment"
            placeholder="0.00"
            placeholderTextColor="gray"
            myTextInputRef={currentWaistMeasurementRef}
            onSubmitEditing={() => goalWaistMeasurementRef.current.focus()}
            keyboardType="numeric"
            value={currentWaistMeasurement}
            setValue={setcurrentWaistMeasurement}
          />

          <TextInputArea
            textInputTitle="Goal Waist Measurment"
            placeholder="0.00"
            placeholderTextColor="gray"
            required={true}
            myTextInputRef={goalWaistMeasurementRef}
            onSubmitEditing={() => startWeightRef.current.focus()}
            keyboardType="numeric"
            value={goalWaistMeasurement}
            setValue={setgoalWaistMeasurement}
          />

          <TextInputArea
            textInputTitle="Start Weight"
            placeholder="0"
            placeholderTextColor="gray"
            textInputBottomText="Number in Pounds/ounces with two decimal points(125.02)"
            myTextInputRef={startWeightRef}
            onSubmitEditing={() => currentWeightRef.current.focus()}
            keyboardType="numeric"
            value={startWeight}
            setValue={setstartWeight}
          />

          <TextInputArea
            myTextInputRef={currentWeightRef}
            onSubmitEditing={() => goalWeightRef.current.focus()}
            textInputTitle="Current Weight"
            placeholder="00.0"
            placeholderTextColor="gray"
            required={true}
            textInputBottomText="Number in pounds with one decimal point for ounce(300.1)"
            keyboardType="numeric"
            value={currentWeight}
            setValue={setcurrentWeight}
          />
          <TextInputArea
            myTextInputRef={goalWeightRef}
            onSubmitEditing={() => {
              goalWeightRef.current.focus();
              Keyboard.dismiss();
            }}
            textInputTitle="Goal Weight"
            placeholder="00.0"
            placeholderTextColor="gray"
            keyboardType="numeric"
            required={true}
            value={goalWeight}
            setValue={setgoalWeight}
            textInputBottomText="Number in pounds with one decimal point for ounce(300.1)"
          />
          <TouchableOpacity
            onPress={() => CheckGalleryPermission()}
            style={styles.uploadPictureView}>
            <Text style={styles.uploadPictureText}>
              {Image?.mime ? Image?.path : 'Upload Profile Picture'}{' '}
            </Text>
            {Image?.mime ? null : <CloudUploadSvg />}
          </TouchableOpacity>

          <MyButton
            ButtonTitle={'Save'}
            onPress={EditUser}
            disabled={showLoader}
          />
          <View style={{height: 30}} />
        </KeyboardAwareScrollView>
        <HowToMeasure
          visible={howToMeasureModal}
          setVisibility={sethowToMeasureModal}
        />
        <CustomLoader showLoader={showLoader} />
      </View>
    </KeyboardAvoidingView>
  );
};
const mapStateToProps = state => ({
  userToken: state.user.userToken,
});
const mapDispatchToProps = dispatch => ({dispatch});
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
