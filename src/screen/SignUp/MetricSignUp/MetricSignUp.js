//import : react components
import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
//import : custom components
import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';
import SignUpTracker from '../../../components/SignUpTracker/SignUpTracker';
import CustomSlider from '../../../components/CustomSlider/CustomSlider';
import MyButton from '../../../components/MyButton/MyButton';
import CustomLoader from '../../../components/CustomLoader/CustomLoader';
//import : third parties
import Toast from 'react-native-simple-toast';
//import : utils
import {Colors, Constant, MyIcon, ScreenNames, Server} from '../../../global/index';
//import : styles
import {styles} from './MetricSignUpStyle';
//import : redux
import {useDispatch, useSelector} from 'react-redux';
import {CustomAlertAction} from '../../../redux/actions/actions';

const MetricSignUp = ({navigation, route}) => {
  //variables : redux
  const {data} = route.params;
  const dispatch = useDispatch();
  //variables
  const genderData = [
    {
      id: 1,
      name: 'Male',
      img: require('../../../assets/Images/male.png')
    },
    {
      id: 2,
      name: 'Female',
      img: require('../../../assets/Images/female.png')
    },
  ];
  //hook : states
  const [selectedGender, setSelectedGender] = useState({
    id: 1,
    name: 'Male',
    img: require('assets/Images/male.png'),
  });
  const [height, setHeight] = useState('');
  const [currentWeight, setCurrentWeight] = useState('');
  const [goalWeight, setGoalWeight] = useState('');
  //hook : modal states
  const [showLoader, setShowLoader] = useState(false);
  //function : nav func
  const gotoWaistSignUp = data =>
    navigation.navigate(ScreenNames.WAIST_SIGNUP, {data});
  //function : imp func
  const validation = () => {
    if (String(height).trim().length == 0) {
      dispatch(CustomAlertAction.showToast('Please Select Your Height'));
    } else if (String(currentWeight).trim().length == 0) {
      dispatch(
        CustomAlertAction.showToast('Please Select Your Current Weight.'),
      );
    } else if (String(goalWeight).trim().length == 0) {
      dispatch(CustomAlertAction.showToast('Please Select Your Goal Weight.'));
    } else return true;
  };
  //function : serv func
  const nextHandle = async () => {
    if (validation()) {
      setShowLoader(true);
      try {
        const formData = new FormData();
        formData.append('user_id', data.user);
        formData.append('gender', selectedGender.name);
        formData.append('height_feet', Constant.cmToFeet(height));
        formData.append('height_inch', Constant.cmToInches(height));
        formData.append('current_weight', currentWeight);
        formData.append('goal_weight', goalWeight);
        console.log('formData', formData);
        const {response, status} = await Server.postAPI(
          Server.SECOND_REGISTER,
          formData,
        );
        if (status) {
          Toast.show('Step Completed.', Toast.LONG);
          gotoWaistSignUp(response.data);
        } else {
        }
        console.log(response, status);
      } catch (error) {
        console.error('error in nextHandle', error);
      }
      setShowLoader(false);
    }
  };

  //UI
  return (
    <View style={styles.container}>
      <SimpleHeader headerName={'Basic Metrics'} />
      <SignUpTracker value={1} />
      <ScrollView style={styles.mainView}>
        <Text style={styles.title}>Gender</Text>
        <FlatList
          horizontal
          data={genderData}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => setSelectedGender(item)}
                style={{
                  alignItems: 'center',
                  marginRight: 10,
                }}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor:
                      selectedGender.id == item.id
                        ? Colors.LITEGREEN
                        : Colors.GREY,
                    padding: 20,
                    paddingHorizontal: 40,
                    borderRadius: 15,
                    margin: 2,
                  }}>
                  <Image source={item.img} />
                  {selectedGender.id == item.id && (
                    <View style={{position: 'absolute', top: 10, right: 10}}>
                      <MyIcon.AntDesign
                        name="checkcircle"
                        size={20}
                        color={Colors.LITEGREEN}
                      />
                    </View>
                  )}
                </View>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item.id.toString()}
        />
        <CustomSlider
          value={height}
          setValue={setHeight}
          title={'Height'}
          maxValue={500}
          unit="cm"
        />
        <CustomSlider
          value={currentWeight}
          setValue={setCurrentWeight}
          title={'Current Weight'}
          maxValue={500}
          unit="kg"
        />
        <CustomSlider
          value={goalWeight}
          setValue={setGoalWeight}
          title={'Goal Weight'}
          maxValue={500}
          unit="kg"
        />
        <MyButton
          ButtonTitle={'Next'}
          backgroundColor={Colors.ORANGE}
          onPress={() => nextHandle()}
        />
      </ScrollView>
      <CustomLoader showLoader={showLoader} />
    </View>
  );
};

export default MetricSignUp;
