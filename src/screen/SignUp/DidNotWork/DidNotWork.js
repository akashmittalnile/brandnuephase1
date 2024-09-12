//import : react components
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
//import : custom components
import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';
import SignUpTracker from '../../../components/SignUpTracker/SignUpTracker';
import SizedBox from '../../../components/SizedBox/SizedBox';
import MyButton from '../../../components/MyButton/MyButton';
import CustomLoader from '../../../components/CustomLoader/CustomLoader';
//import : third parties
import Toast from 'react-native-simple-toast';
//import : utils
import {Colors, Fonts, MyIcon, ScreenNames, Server} from 'global/index';
// import : styles
import {styles} from './DidNotWorkStyle';
//import : redux
import {useDispatch} from 'react-redux';
import {CustomAlertAction} from 'reduxtoolkit/actions/actions';

const DidNotWork = ({route, navigation}) => {
  //variables : route
  const {data} = route.params;
  const dispatch = useDispatch();
  //hook : states
  const [preDietData, setPreDietData] = useState([]);
  const [selectedDiets, setSelectedDiets] = useState([]);
  //hook : modal states
  const [showLoader, setShowLoader] = useState(false);
  //function : nav func
  const gotoPersonalNeed = data =>
    navigation.navigate(ScreenNames.PERSONAL_NEED, {data});
  //function : imp func
  const addItemIntoSelected = item => {
    const index = selectedDiets.findIndex(e => e.title == item.title);

    if (index > -1) {
      const filteredArr = selectedDiets.filter(e => e.title != item.title);
      console.log(filteredArr);
      setSelectedDiets(filteredArr);
    } else {
      setSelectedDiets(prevState => {
        return [...prevState, item];
      });
    }
  };
  const validation = () => {
    if (selectedDiets.length == 0) {
      dispatch(
        CustomAlertAction.showToast('Please select what did not work for you?'),
      );
    } else return true;
  };
  //function : serv func
  const getDidNotWorks = async () => {
    setShowLoader(true);
    try {
      const endPoint = `${Server.GET_FORMS_DATA}${data.user}`;
      const {response, status} = await Server.getAPI(endPoint);
      if (status) {
        setPreDietData(response?.data?.eight_step);
      }
    } catch (error) {
      console.log('error in getDidNotWorks', error);
    }
    setShowLoader(false);
  };
  const registerPastProgram = async () => {
    if (validation()) {
      setShowLoader(true);
      try {
        const formData = new FormData();
        formData.append('user_id', data.user);
        selectedDiets.map((item, index) => {
          formData.append(`past_program[${index}]`, item.title);
        });
        const {response, status} = await Server.postAPI(
          Server.EIGHTH_REGISTER,
          formData,
        );
        if (status) {
          Toast.show('Step Completed.', Toast.LONG);
          gotoPersonalNeed(response.data);
        }
        console.log(response, status);
      } catch (error) {
        console.error('error in registerPastProgram', error);
      }
      setShowLoader(false);
    }
  };
  //hook : useEffect
  useEffect(() => {
    getDidNotWorks();

    return () => {};
  }, []);

  //UI
  return (
    <View style={styles.container}>
      <SimpleHeader headerName={'What Didn’t Work for You?'} />
      <SignUpTracker value={7} />
      <View style={styles.mainView}>
        <Text style={styles.title}>
          What didn’t you like about previous programs?
        </Text>
        <Text>Select all that apply.</Text>
        <SizedBox height={20} />
        {preDietData.map((item, index) => {
          const isSelected = selectedDiets.findIndex(
            e => e.title == item.title,
          );
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
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
        <View style={styles.bottomSection}>
          <MyButton
            ButtonTitle={'Next'}
            backgroundColor={Colors.ORANGE}
            onPress={() => registerPastProgram()}
          />
        </View>
      </View>
      <CustomLoader showLoader={showLoader} />
    </View>
  );
};

export default DidNotWork;
