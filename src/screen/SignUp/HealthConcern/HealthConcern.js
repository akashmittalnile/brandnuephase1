//import : react components
import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
//import : custom components
import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';
import MyButton from '../../../components/MyButton/MyButton';
import CustomLoader from '../../../components/CustomLoader/CustomLoader';
import SignUpTracker from '../../../components/SignUpTracker/SignUpTracker';
//import : third parties
import Toast from 'react-native-simple-toast';
//import : utils
import {
  Colors,
  Constant,
  Fonts,
  MyIcon,
  ScreenNames,
  Server,
} from '../../../global/index';
//import : styles
import {styles} from './HealthConcernStyle';
import {useDispatch} from 'react-redux';
import {CustomAlertAction} from '../../../redux/actions/actions';

const HealthConcern = ({navigation, route}) => {
  //variables : route data
  const {data} = route.params;
  const dispatch = useDispatch();
  //variables
  // const healthConcernData = [
  //   {
  //     id: 1,
  //     name: 'Diabetes',
  //     img: require('assets/Images/Diabetes.png'),
  //   },
  //   {
  //     id: 2,
  //     name: 'High Blood Pressure',
  //     img: require('assets/Images/bp.png'),
  //   },
  //   {
  //     id: 3,
  //     name: 'High Cholesterol',
  //     img: require('assets/Images/cholesterol.png'),
  //   },
  //   {
  //     id: 4,
  //     name: 'High Stress Levels',
  //     img: require('assets/Images/stress.png'),
  //   },
  // ];
  //hook : states
  const [healthConcernData, setHealthConcernData] = useState([]);
  const [selectedHealthConcern, setSelectedHealthConcern] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  //function : nav func
  const gotoCurrentMotivation = data =>
    navigation.navigate(ScreenNames.CURRENT_MOTIVATION_SIGNUP, {data});
  //function : imp func
  const addItems = item => {
    const findIndex = selectedHealthConcern.findIndex(
      e => e.title == item.title,
    );
    if (findIndex > -1) {
      const filterArray = selectedHealthConcern.filter(
        e => e.title !== item.title,
      );
      setSelectedHealthConcern(filterArray);
    } else {
      setSelectedHealthConcern(prevState => [...prevState, item]);
    }
    console.log(findIndex);
  };
  const validation = () => {
    if (selectedHealthConcern.length == 0) {
      dispatch(CustomAlertAction.showToast('Please Select Health Concern'));
    } else return true;
  };
  //function : serv func
  const getHealthConcerns = async () => {
    setShowLoader(true);
    try {
      const endPoint = `${Server.GET_FORMS_DATA}${data.user}`;
      const {response, status} = await Server.getAPI(endPoint);
      if (status) {
        setHealthConcernData(response?.data?.five_step);
      }
      console.log(response, status);
    } catch (error) {
      console.log('error in getStatus', error);
    }
    setShowLoader(false);
  };
  const registerHealthConcern = async () => {
    if (validation()) {
      setShowLoader(true);
      try {
        const formData = new FormData();
        formData.append('user_id', data.user);
        selectedHealthConcern.map((ele, index) => {
          formData.append(`health_concerns[${index}]`, ele.title);
        });
        const {response, status} = await Server.postAPI(
          Server.FIFTH_REGISTER,
          formData,
        );
        if (status) {
          Toast.show('Step Completed.', Toast.LONG);
          gotoCurrentMotivation(response.data);
        }
        console.log(response, status);
      } catch (error) {
        console.error('error in registerHealthConcern', error);
      }
      setShowLoader(false);
    }
  };
  //hook : useEFfect
  useEffect(() => {
    getHealthConcerns();
    return () => {};
  }, []);

  //UI
  return (
    <View style={styles.container}>
      <SimpleHeader headerName={'Health Concerns'} />
      <SignUpTracker value={4} />
      <View style={styles.mainView}>
        <Text style={styles.title}>
          Tap any of the following of which you are concerned.
        </Text>
        <Text>Select all that apply</Text>
        <FlatList
          numColumns={2}
          data={healthConcernData}
          renderItem={({item, index}) => {
            const selectionIndex = selectedHealthConcern.findIndex(
              e => e.title == item.title,
            );
            console.log(item);
            return (
              <TouchableOpacity
                onPress={() => addItems(item)}
                style={{
                  padding: 20,
                  borderWidth: 1,
                  marginRight: 10,
                  borderRadius: 15,
                  margin: 2,
                  borderColor:
                    selectionIndex > -1 ? Colors.LITEGREEN : Colors.GREY,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: 10,
                  height: Constant.windowWidth / 2 - 30,
                  width: Constant.windowWidth / 2 - 30,
                }}>
                {selectionIndex > -1 && (
                  <View style={{position: 'absolute', top: 10, right: 10}}>
                    <MyIcon.AntDesign
                      name="checkcircle"
                      size={20}
                      color={Colors.LITEGREEN}
                    />
                  </View>
                )}
                <Image
                  source={{uri: item.image_src}}
                  resizeMode="contain"
                  style={{
                    height: '70%',
                    width: '70%',
                  }}
                />
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: Fonts.SEMI_BOLD,
                    fontSize: 13,
                    marginTop: 20,
                  }}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
        <MyButton
          ButtonTitle={'Next'}
          backgroundColor={Colors.ORANGE}
          onPress={() => registerHealthConcern()}
        />
      </View>
      <CustomLoader showLoader={showLoader} />
    </View>
  );
};

export default HealthConcern;
