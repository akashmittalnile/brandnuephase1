//import : react components
import React, {useState, useEffect} from 'react';
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
import {styles} from './PreDietStyle';
//import : redux
import {useDispatch} from 'react-redux';
import {CustomAlertAction} from 'reduxtoolkit/actions/actions';

const PreDiet = ({navigation, route}) => {
  //variables : route
  const {data} = route.params;
  const dispatch = useDispatch();
  //variables
  const preDietData = [
    {id: 1, name: 'Keto'},
    {id: 2, name: 'Weight Watchers'},
    {id: 3, name: 'HCG'},
    {id: 4, name: 'Diet Pills / Medication'},
    {id: 5, name: 'Nutri System'},
    {id: 6, name: 'Exercise'},
    {id: 7, name: 'Other'},
  ];
  //hook : states
  const [previousDietData, setPreviousDietData] = useState([]);
  const [selectedDiets, setSelectedDiets] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  //function : nav func
  const gotoDidNotWork = data =>
    navigation.navigate(ScreenNames.DID_NOT_WORK, {data});
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
      dispatch(CustomAlertAction.showToast('Please Select Previous Diets.'));
    } else return true;
  };
  //function : serv func
  const getPreviousDiet = async () => {
    setShowLoader(true);
    try {
      const endPoint = `${Server.GET_FORMS_DATA}${data.user}`;
      const {response, status} = await Server.getAPI(endPoint);
      if (status) {
        setPreviousDietData(response?.data?.seven_step);
      }
    } catch (error) {
      console.log('error in getStatus', error);
    }
    setShowLoader(false);
  };
  const registerPreviousDiet = async () => {
    if (validation()) {
      setShowLoader(true);
      try {
        const formData = new FormData();
        formData.append('user_id', data.user);
        selectedDiets.map((item, index) => {
          formData.append(`past_diet[${index}]`, item.title);
        });
        const {response, status} = await Server.postAPI(
          Server.SEVENTH_REGISTER,
          formData,
        );
        if (status) {
          Toast.show('Step Completed.', Toast.LONG);
          gotoDidNotWork(response.data);
        }
        console.log(response, status);
      } catch (error) {
        console.error('error in registerPreviousDiet', error);
      }
      setShowLoader(false);
    }
  };
  //hook : useEffect
  useEffect(() => {
    getPreviousDiet();

    return () => {};
  }, []);

  //UI
  return (
    <View style={styles.container}>
      <SimpleHeader headerName={'Previous “Diets”'} />
      <SignUpTracker value={6} />
      <View style={styles.mainView}>
        <Text style={styles.title}>What have you tried in the past?</Text>
        <Text>Select all that apply.</Text>
        <SizedBox height={20} />
        {previousDietData.map((item, index) => {
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
            onPress={() => registerPreviousDiet()}
          />
        </View>
      </View>
      <CustomLoader showLoader={showLoader} />
    </View>
  );
};

export default PreDiet;
