//import : react components
import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
//import : custom components
import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';
import SignUpTracker from '../../../components/SignUpTracker/SignUpTracker';
import TextInputArea from '../../../components/TextInputArea/TextInputArea';
import MyButton from '../../../components/MyButton/MyButton';
//import : third parties
import Toast from 'react-native-simple-toast';
//import : utils
import {Colors, ScreenNames, Server} from '../../../global/index';
//import : styles
import {styles} from './WaistSignUpStyle';
import HowToMeasure from '../../../components/modal/HowToMeasure/HowToMeasure';
//import : redux
import {useDispatch, useSelector} from 'react-redux';
import {CustomAlertAction, UserAction} from '../../../redux/actions/actions';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomLoader from '../../../components/CustomLoader/CustomLoader';

const WaistSignUp = ({navigation, route}) => {
  //variables
  const {data} = route.params;
  const dispatch = useDispatch();
  const signUpUser = useSelector(state => state.user.signUpUser);
  const step = useSelector(state => state.user.step);
  //hook : states
  const [currentWaist, setCurrentWaist] = useState('');
  const [goalWaist, setGoalWaist] = useState('');
  //hook : modal states
  const [showLoader, setShowLoader] = useState(false);
  const [showHowToMeasure, setShowHowToMeasure] = useState(false);
  //function : nav func
  const gotoCurrentStatus = data =>
    navigation.navigate(ScreenNames.CURRENT_STATUS_SIGNUP, {data});
  //function : imp func
  const validation = () => {
    if (currentWaist.trim().length == 0) {
      dispatch(CustomAlertAction.showToast('Please Enter Current Waist.'));
    } else if (goalWaist.trim().length == 0) {
      dispatch(CustomAlertAction.showToast('Please Enter Goal Waist.'));
    } else return true;
  };
  const nextHandle = async () => {
    if (validation()) {
      setShowLoader(true);
      try {
        const formData = new FormData();
        formData.append('user_id', data.user);
        formData.append('waist_measurement', currentWaist);
        formData.append('goal_waist_measurement', goalWaist);
        const {response, status} = await Server.postAPI(
          Server.THIRD_REGISTER,
          formData,
        );
        if (status) {
          Toast.show('Step Completed.', Toast.LONG);
          gotoCurrentStatus(response.data);
        }
      } catch (error) {
        console.error('error in nextHandle', error);
      }
      setShowLoader(false);
    }
  };
  //UI
  return (
    <View style={styles.container}>
      <SimpleHeader />
      <SignUpTracker value={2} />
      <KeyboardAwareScrollView style={styles.mainView}>
        <View>
          <Image
            source={require('../../../assets/Images/waist_signup.png')}
            style={{alignSelf: 'center'}}
          />
          <TouchableOpacity onPress={() => setShowHowToMeasure(true)}>
            <Text style={styles.title}>How to Measure</Text>
          </TouchableOpacity>
          <TextInputArea
            value={currentWaist}
            setValue={setCurrentWaist}
            placeholder={'Current Waist Measurement'}
            placeholderTextColor="gray"
            keyboardType="numeric"
            hasViewBorder
          />
          <TextInputArea
            value={goalWaist}
            setValue={setGoalWaist}
            placeholder={'Goal Waist Measurement'}
            placeholderTextColor="gray"
            keyboardType="numeric"
            hasViewBorder
          />
          <View style={{flexDirection: 'row', marginVertical: 10}}>
            <Text style={styles.noteText}>Note:</Text>
            <Text> *To start, estimation of waist measurement is okay.</Text>
          </View>
          <View style={styles.bottomSection}>
            <MyButton
              ButtonTitle={'Next'}
              backgroundColor={Colors.ORANGE}
              onPress={() => nextHandle()}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
      <HowToMeasure
        visible={showHowToMeasure}
        setVisibility={setShowHowToMeasure}
      />
      <CustomLoader showLoader={showLoader} />
    </View>
  );
};

export default WaistSignUp;
