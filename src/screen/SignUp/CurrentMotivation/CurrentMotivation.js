//import : react components
import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
//import : custom components
import SimpleHeader from 'components/SimpleHeader/SimpleHeader';
import CustomSlider from 'components/CustomSlider/CustomSlider';
import MyButton from 'components/MyButton/MyButton';
import SignUpTracker from 'components/SignUpTracker/SignUpTracker';
import CustomLoader from 'components/CustomLoader/CustomLoader';
//import : third parties
import Toast from 'react-native-simple-toast';
//import : utils
import {Colors, ScreenNames, Server} from 'global/index';
//import : styles
import {styles} from './CurrentMotivationStyle';
import {useDispatch} from 'react-redux';
import {CustomAlertAction} from 'reduxtoolkit/actions/actions';

const CurrentMotivation = ({navigation, route}) => {
  //variables : route
  const {data} = route.params;
  const dispatch = useDispatch();
  //hook : states
  const [currentStatus, setCurrentStatus] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  //function : nav func
  const gotoPreDiet = data => navigation.navigate(ScreenNames.PRE_DIET, {data});
  //function : imp func
  const validation = () => {
    if (String(currentStatus).trim().length == 0) {
      dispatch(
        CustomAlertAction.showToast('Please Select Current Motivation Level.'),
      );
    } else return true;
  };
  //function : serv func
  const registerCurrentMotivation = async () => {
    if (validation()) {
      setShowLoader(true);
      try {
        const formData = new FormData();
        formData.append('user_id', data.user);
        formData.append('current_motivation', currentStatus);
        const {response, status} = await Server.postAPI(
          Server.SIXTH_REGISTER,
          formData,
        );
        if (status) {
          Toast.show('Step Completed.', Toast.LONG);
          gotoPreDiet(response.data);
        }
      } catch (error) {
        console.error('error in registerCurrentMotivation', error);
      }
      setShowLoader(false);
    }
  };
  //UI
  return (
    <View style={styles.container}>
      <SimpleHeader headerName={'Current Motivation'} />
      <SignUpTracker value={5} />
      <View style={styles.mainView}>
        <Text style={styles.title}>How badly do you want to lose weight?</Text>
        <Image
          source={require('assets/Images/currentMotivation.png')}
          style={{alignSelf: 'center'}}
        />
        <CustomSlider
          title={'Slide the pointer to select'}
          unit=""
          value={currentStatus}
          setValue={setCurrentStatus}
          maxValue={10}
          pointValue={0}
        />
        <View style={styles.bottomSection}>
          <MyButton
            ButtonTitle={'Next'}
            backgroundColor={Colors.ORANGE}
            onPress={() => registerCurrentMotivation()}
          />
        </View>
      </View>
      <CustomLoader showLoader={showLoader} />
    </View>
  );
};

export default CurrentMotivation;
