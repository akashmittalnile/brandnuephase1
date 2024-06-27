//import : react components
import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
//import : custom components
import SimpleHeader from 'components/SimpleHeader/SimpleHeader';
import SignUpTracker from 'components/SignUpTracker/SignUpTracker';
import MyButton from 'components/MyButton/MyButton';
//import : third parties
import Toast from 'react-native-simple-toast';
//import : utils
import {Colors, Fonts, MyIcon, ScreenNames, Server} from 'global/index';
// import : styles
import {styles} from './MetabolismStyle';
import CustomLoader from 'components/CustomLoader/CustomLoader';
import {useDispatch} from 'react-redux';
import {CustomAlertAction} from 'reduxtoolkit/actions/actions';

const Metabolism = ({navigation, route}) => {
  //variables : route
  const {data} = route.params;
  const dispatch = useDispatch();
  //variables
  const QuestionOptions = [
    {id: 1, name: 'Yes'},
    {id: 2, name: 'No'},
  ];
  //hook : states
  const [selectedAns, setSelectedAns] = useState({});
  const [showLoader, setShowLoader] = useState(false);
  //function : nav func
  const gotoLastQuestion = data =>
    navigation.navigate(ScreenNames.LAST_QUESTION, {data});
  //function : imp func
  const validation = () => {
    if (Object.keys(selectedAns).length == 0) {
      dispatch(CustomAlertAction.showToast('Please select Your Answer.'));
    } else return true;
  };
  //function : serv func
  const registerHaveMetabolism = async () => {
    if (validation()) {
      setShowLoader(true);
      try {
        const formData = new FormData();
        formData.append('user_id', data.user);
        formData.append('metabolism', selectedAns.name);
        const {response, status} = await Server.postAPI(
          Server.TENTH_REGISTER,
          formData,
        );
        if (status) {
          Toast.show('Step Completed.', Toast.LONG);
          gotoLastQuestion(response.data);
        }
      } catch (error) {
        console.error('error in registerHaveMetabolism', error);
      }
      setShowLoader(false);
    }
  };
  //UI
  return (
    <View style={styles.container}>
      <SimpleHeader headerName={'Metabolism'} />
      <SignUpTracker value={9} />
      <View style={styles.mainView}>
        <Text style={styles.title}>
          Do you ever feel like losing weight is particularly difficult or that
          you have a “slow metabolism”?
        </Text>
        {QuestionOptions.map((item, index) => {
          return (
            <TouchableOpacity
              key={index.toString()}
              onPress={() => setSelectedAns(item)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 5,
              }}>
              <MyIcon.Ionicons
                name={selectedAns.id == item.id ? 'checkbox' : 'square-outline'}
                color={selectedAns.id == item.id ? Colors.ORANGE : Colors.GREY}
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
            onPress={() => registerHaveMetabolism()}
          />
        </View>
      </View>
      <CustomLoader showLoader={showLoader} />
    </View>
  );
};

export default Metabolism;
