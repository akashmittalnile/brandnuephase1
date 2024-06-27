//import : react components
import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
//import : custom components
import SimpleHeader from 'components/SimpleHeader/SimpleHeader';
import SignUpTracker from 'components/SignUpTracker/SignUpTracker';
import SizedBox from 'components/SizedBox/SizedBox';
import MyButton from 'components/MyButton/MyButton';
import CustomLoader from 'components/CustomLoader/CustomLoader';
//import : third parties
import Toast from 'react-native-simple-toast';
//import : utils
import {Colors, Fonts, MyIcon, ScreenNames, Server} from 'global/index';
// import : styles
import {styles} from './LastQuestionStyle';
import {useDispatch} from 'react-redux';
import {CustomAlertAction} from 'reduxtoolkit/actions/actions';

const LastQuestion = ({navigation, route}) => {
  //variables : route
  const {data} = route.params;
  const dispatch = useDispatch();
  //variables
  const preDietData = [
    {id: 1, name: 'Easy to follow plan'},
    {id: 2, name: 'Natural way to control cravings'},
    {id: 3, name: 'Support/Coaching'},
    {id: 4, name: 'Simple recipes/meal plans'},
    {id: 5, name: 'Dining out guides'},
  ];
  //hook : states
  const [selectedItems, setSelectedItems] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  //function : nav func
  const gotoSignUpSuccess = data =>
    navigation.navigate(ScreenNames.SIGN_UP_SUCCESS, {data});
  //function : imp func
  const addItemIntoSelected = item => {
    const index = selectedItems.findIndex(e => e.id == item.id);

    if (index > -1) {
      const filteredArr = selectedItems.filter(e => e.id != item.id);
      console.log(filteredArr);
      setSelectedItems(filteredArr);
    } else {
      setSelectedItems(prevState => {
        return [...prevState, item];
      });
    }
  };
  const validation = () => {
    if (selectedItems.length == 0) {
      dispatch(
        CustomAlertAction.showToast(
          'Please select what are most important to you?',
        ),
      );
    } else return true;
  };
  //function : serv func
  const registerLastQuestion = async () => {
    if (validation()) {
      setShowLoader(true);
      try {
        const formData = new FormData();
        formData.append('user_id', data.user);
        selectedItems.map((item, index) => {
          formData.append(`important[${index}]`, item.name);
        });
        const {response, status} = await Server.postAPI(
          Server.ELEVENTH_REGISTER,
          formData,
        );
        if (status) {
          Toast.show('Step Completed.', Toast.LONG);
          gotoSignUpSuccess(response.data);
        }
      } catch (error) {
        console.error('error in registerLastQuestion', error);
      }
      setShowLoader(false);
    }
  };
  //UI
  return (
    <View style={styles.container}>
      <SimpleHeader headerName={'Last Question!!!'} />
      <SignUpTracker value={10} />
      <View style={styles.mainView}>
        <Text style={styles.title}>What are most Important to you ?</Text>
        <Text>Select all that apply.</Text>
        <SizedBox height={20} />
        {preDietData.map((item, index) => {
          const isSelected = selectedItems.findIndex(e => e.id == item.id);
          return (
            <TouchableOpacity
              key={index.toString()}
              onPress={() => addItemIntoSelected(item)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 5,
              }}>
              <MyIcon.Ionicons
                name={isSelected > -1 ? 'checkbox' : 'square-outline'}
                color={isSelected > -1 ? Colors.ORANGE : Colors.GREY}
                size={20}
              />
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 16,
                  fontFamily: Fonts.REGULAR,
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
        <View style={styles.bottomSection}>
          <MyButton
            ButtonTitle={'Check Eligibility'}
            backgroundColor={Colors.ORANGE}
            onPress={() => registerLastQuestion()}
          />
        </View>
      </View>
      <CustomLoader showLoader={showLoader} />
    </View>
  );
};

export default LastQuestion;
