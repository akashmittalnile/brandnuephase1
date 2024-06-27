//import : react components
import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
//import : custom components
import SimpleHeader from 'components/SimpleHeader/SimpleHeader';
import SignUpTracker from 'components/SignUpTracker/SignUpTracker';
import MyButton from 'components/MyButton/MyButton';
import CustomLoader from 'components/CustomLoader/CustomLoader';
//import : third parties
import Toast from 'react-native-simple-toast';
//import : utils
import {Colors, Fonts, MyIcon, ScreenNames, Server} from 'global/index';
// import : styles
import {styles} from './PersonalNeedStyle';
//import : redux
import {useDispatch} from 'react-redux';
import {CustomAlertAction} from 'reduxtoolkit/actions/actions';

const PersonalNeed = ({navigation, route}) => {
  //variables : route
  const {data} = route.params;
  const dispatch = useDispatch();
  //variables
  const personalNeedData = [
    {id: 1, name: 'Not Important'},
    {id: 2, name: 'Somewhat Important'},
    {id: 3, name: 'Very Important'},
  ];
  //hook : states
  const [selectedPersonalNeed, setSelectedPersonalNeed] = useState([]);
  //hook : modal states
  const [showLoader, setShowLoader] = useState(false);
  //function : nav func
  const gotoMetabolism = data =>
    navigation.navigate(ScreenNames.METABOLISM, {data});
  //function : imp func
  const addItems = item => {
    const index = selectedPersonalNeed.findIndex(e => e.id == item.id);
    if (index > -1) {
      const filteredArr = selectedPersonalNeed.filter(e => e.id != item.id);
      setSelectedPersonalNeed(filteredArr);
    } else {
      setSelectedPersonalNeed(prevState => {
        return [...prevState, item];
      });
    }
  };
  const validation = () => {
    if (selectedPersonalNeed.length == 0) {
      dispatch(
        CustomAlertAction.showToast('Please select Your Personal Needs.'),
      );
    } else return true;
  };

  //function : serv func
  const registerPersonalNeed = async () => {
    if (validation()) {
      setShowLoader(true);
      try {
        const formData = new FormData();
        formData.append('user_id', data.user);
        selectedPersonalNeed.map((item, index) => {
          formData.append(`personal_need[${index}]`, item.name);
        });
        const {response, status} = await Server.postAPI(
          Server.NINTH_REGISTER,
          formData,
        );
        if (status) {
          Toast.show('Step Completed.', Toast.LONG);
          gotoMetabolism(response.data);
        }
        console.log(response, status);
      } catch (error) {
        console.error('error in registerPersonalNeed', error);
      }
      setShowLoader(false);
    }
  };
  //UI
  return (
    <View style={styles.container}>
      <SimpleHeader headerName={'Personal Needs'} />
      <SignUpTracker value={8} />
      <View style={styles.mainView}>
        <Text style={styles.title}>
          How important is real-time support, accountibility and coaching ?
        </Text>
        {personalNeedData.map((item, index) => {
          const isSelected = selectedPersonalNeed.findIndex(
            e => e.id == item.id,
          );
          return (
            <TouchableOpacity
              key={index.toString()}
              onPress={() => addItems(item)}
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
            ButtonTitle={'Next'}
            backgroundColor={Colors.ORANGE}
            onPress={() => registerPersonalNeed()}
          />
        </View>
      </View>
      <CustomLoader showLoader={showLoader} />
    </View>
  );
};

export default PersonalNeed;
