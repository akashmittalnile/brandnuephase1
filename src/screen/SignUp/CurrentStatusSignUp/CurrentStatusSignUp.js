//import : react components
import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
//import : custom components
import SimpleHeader from 'components/SimpleHeader/SimpleHeader';
import SignUpTracker from 'components/SignUpTracker/SignUpTracker';
import MyButton from 'components/MyButton/MyButton';
import CustomLoader from 'components/CustomLoader/CustomLoader';
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
} from 'global/index';
//import : styles
import {styles} from './CurrentStatusSignUpStyle';
//import : redux
import {useDispatch} from 'react-redux';
import {CustomAlertAction} from 'reduxtoolkit/actions/actions';

const CurrentStatusSignUp = ({navigation, route}) => {
  //variables
  const {data} = route.params;
  const dispatch = useDispatch();
  //hook : states
  const [statusData, setStatusData] = useState([]);
  const [selectedCurrentStatus, setSelectedCurrentStatus] = useState({});
  const [showLoader, setShowLoader] = useState(false);
  //function : nav func
  const gotoHealthConcern = data =>
    navigation.navigate(ScreenNames.HEALTH_CONCERN_SIGNUP, {data});
  //function : imp func
  const validation = () => {
    if (Object.keys(selectedCurrentStatus).length == 0) {
      dispatch(CustomAlertAction.showToast('Please Select Current Status.'));
    } else return true;
  };
  //function : serv func
  const getStatus = async () => {
    setShowLoader(true);
    try {
      const endPoint = `${Server.GET_FORMS_DATA}${data.user}`;
      const {response, status} = await Server.getAPI(endPoint);
      if (status) {
        setStatusData(response?.data?.four_step);
      }
    } catch (error) {
      console.error('error in getStatus', error);
    }
    setShowLoader(false);
  };
  const nextHandle = async () => {
    if (validation()) {
      setShowLoader(true);
      try {
        const formData = new FormData();
        formData.append('user_id', data.user);
        formData.append('current_status', selectedCurrentStatus.title);
        const {response, status} = await Server.postAPI(
          Server.FORTH_REGISTER,
          formData,
        );
        if (status) {
          Toast.show('Step Completed.', Toast.LONG);
          gotoHealthConcern(response.data);
        }
      } catch (error) {
        console.error('error in nextHandle', error);
      }
      setShowLoader(false);
    }
  };
  //hook : useEffect
  useEffect(() => {
    getStatus();

    return () => {};
  }, []);

  //UI
  return (
    <View style={styles.container}>
      <SimpleHeader headerName={'Current Status '} />
      <SignUpTracker value={3} />
      <View style={styles.mainView}>
        <Text style={styles.title}>Tap image(s) if you are…</Text>
        <FlatList
          horizontal
          data={statusData}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => setSelectedCurrentStatus(item)}
                style={{
                  padding: 20,
                  borderWidth: 1,
                  marginRight: 10,
                  borderRadius: 15,
                  margin: 2,
                  borderColor:
                    selectedCurrentStatus.title == item.title
                      ? Colors.LITEGREEN
                      : Colors.GREY,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: Constant.windowWidth / 2 - 30,
                  width: Constant.windowWidth / 2 - 30,
                }}>
                {selectedCurrentStatus.title == item.title && (
                  <View
                    style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      zIndex: 100,
                    }}>
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
                    height: '100%',
                    width: '100%',
                  }}
                />
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: Fonts.SEMI_BOLD,
                  }}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={styles.bottomSection}>
          <MyButton
            ButtonTitle={'Next'}
            backgroundColor={Colors.ORANGE}
            onPress={() => nextHandle()}
          />
        </View>
      </View>
      <CustomLoader showLoader={showLoader} />
    </View>
  );
};

export default CurrentStatusSignUp;
